const generateCrudRoutes = require("mongoose-crud-generator");
const SalesOrderBooking = require("../../models/salesOrderBooking.model");
const checkPermission = require("../../middlewares/checkPermission");
const ArtWork = require("../../models/artWork.model");
const Product = require("../../models/product.model");
const generateArtWorkNo = require("../../utils/generateArtWorkNo");
const createDeleteLog = require("../../utils/createDeleteLog");

const SalesOrderBookingRouter = generateCrudRoutes({
  model: SalesOrderBooking,
  modelName: "SalesOrderBooking",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("salesOrderBooking_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("salesOrderBooking_read")(req, res, next);
    },

    beforeGetById: (req, res, next) => {
      checkPermission("salesOrderBooking_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("salesOrderBooking_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("salesOrderBooking_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;

        if (req.body.emboss === "yes") {
          const tempSalesOrder = {
            sobNo: req.body.sobNo,
            date: req.body.date,
            client: req.body.client,
            product: req.body.product,
            category: req.body.category,
            paperType: req.body.paperType,
            gsm: req.body.gsm,
            totalQuantity: req.body.totalQuantity,
            _id: null,
          };
          await createEmbossEntry(
            tempSalesOrder,
            req.user,
            req.body.embossFoilsDetails
          );
        }
      } catch (error) {
        console.error("Error in Sales Order Booking creation pre-hook:", error);
        return res
          .status(500)
          .json({ message: "Error creating Sales Order Booking." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;

        const existingSalesOrder = await SalesOrderBooking.findById(
          req.params.id
        );
        if (!existingSalesOrder) {
          return res.status(404).json({ message: "Sales Order not found." });
        }

        const currentStatus = existingSalesOrder.salesOrderBookingStatus;
        const newStatus = req.body.salesOrderBookingStatus;

        if (currentStatus === "pending" && newStatus === "complete") {
          const obj = {
            artWorkNo: await generateArtWorkNo(),
            sobNo: existingSalesOrder.sobNo,
            date: existingSalesOrder.date,
            orderMode: existingSalesOrder.orderMode,
            poNo: existingSalesOrder.poNo,
            client: existingSalesOrder.client,
            product: existingSalesOrder.product,
            category: existingSalesOrder.category,
            paperType: existingSalesOrder.paperType,
            gsm: existingSalesOrder.gsm,
            totalQuantity: existingSalesOrder.totalQuantity,
            artWork: existingSalesOrder.artWork,
            batches: existingSalesOrder.batches,
            artWorkStatus: "pending",
            salesOrderBookingId: existingSalesOrder._id,
            status: "1",
            createdBy: req.user,
            updatedBy: req.user,
          };
          await ArtWork.create(obj);
        }
        const product = await Product.findById(req.body.product);
        if (!product) {
          return res.status(404).json({ message: "Product not found." });
        }
        product.size = req.body.sizeInMm;
        await product.save();
      } catch (error) {
        console.error("Error in Sales Order Booking update pre-hook:", error);
        return res
          .status(500)
          .json({ message: "Error updating Sales Order Booking." });
      }
    },
  },

  postHooksOptions: {
    softDelete: async (req, res, response) => {
      try {
        console.log("SalesOrderBooking soft delete triggered");

        const { reason } = req.query;
        const deletedId = response?.data?._id || response?._id;

        if (!deletedId) {
          console.warn("No deleted SalesOrderBooking ID found in response");
          return res
            .status(400)
            .json({ message: "No deleted SalesOrderBooking found." });
        }

        // ✅ Create delete log
        await createDeleteLog({
          modulename: "SalesOrderBooking",
          reason,
          deletedId,
          userId: req.user,
        });

        // ✅ Fetch deleted SalesOrderBooking for related updates
        const deletedSalesOrder = await SalesOrderBooking.findById(deletedId);
        if (!deletedSalesOrder) {
          console.warn(
            "Deleted SalesOrderBooking not found for post-hook update.",
            deletedSalesOrder
          );
          return res
            .status(404)
            .json({ message: "Deleted SalesOrderBooking not found." });
        }

        // ✅ Revert related OrderReceived status to pending
        const orderReceivedId = deletedSalesOrder.orderReceivedId;
        if (orderReceivedId) {
          const OrderReceived = require("../../models/orderReceived.model");
          await OrderReceived.findByIdAndUpdate(orderReceivedId, {
            orderReceivedStatus: "pending",
          });

          console.log(
            `🔁 OrderReceived (${orderReceivedId}) status reverted to "pending" due to SalesOrderBooking soft delete.`
          );
        }

        // ✅ Send success message response
        return res.status(200).json({
          message: "SalesOrderBooking deleted successfully.",
          status: true,
          data: { _id: deletedId },
        });
      } catch (err) {
        console.error("Error in SalesOrderBooking delete post-hook:", err);
        return res.status(500).json({
          message: "Error while soft deleting SalesOrderBooking.",
          status: false,
        });
      }
    },
  },
});

module.exports = SalesOrderBookingRouter;
