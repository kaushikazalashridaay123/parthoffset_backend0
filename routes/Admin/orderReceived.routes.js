const generateCrudRoutes = require("mongoose-crud-generator");
const OrderReceived = require("../../models/orderReceived.model");
const SalesOrderBooking = require("../../models/salesOrderBooking.model");
const Product = require("../../models/product.model");
const checkPermission = require("../../middlewares/checkPermission");
const generateOrderNo = require("../../utils/generateOrderNo");
const generateSalesOrderNo = require("../../utils/generateSalesOrderNo");
const createDeleteLog = require("../../utils/createDeleteLog");

const OrderReceivedRouter = generateCrudRoutes({
  model: OrderReceived,
  modelName: "OrderReceived",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("orderReceived_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("orderReceived_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("orderReceived_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("orderReceived_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("orderReceived_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
        req.body.orderNo = await generateOrderNo();
        req.body.orderReceivedStatus = "pending";
        console.log(req.body)

        const product = await Product.findById(req.body.product);
        if (!product) {
          return res.status(404).json({ message: "Product not found." });
        }
        product.category = req.body.category;
        await product.save();
      } catch (error) {
        console.error("Error in Order Received creation pre-hook:", error);
        return res
          .status(500)
          .json({ message: "Error creating OrderReceived." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;

        const existingOrder = await OrderReceived.findById(req.params.id);
        if (!existingOrder) {
          return res.status(404).json({ message: "Order not found." });
        }

        const currentStatus = existingOrder.orderReceivedStatus;
        const newStatus = req.body.orderReceivedStatus;

        if (currentStatus === "pending" && newStatus === "complete") {
          const obj = {
            orderNo: existingOrder.orderNo,
            sobNo: await generateSalesOrderNo(),
            date: existingOrder.date,
            orderMode: existingOrder.orderMode,
            poNo: existingOrder.poNo,
            client: existingOrder.client,
            gsm: existingOrder.gsm,
            product: existingOrder.product,
            totalQuantity: existingOrder.totalQuantity,
            paperType: existingOrder.paperType,
            category: existingOrder.category,
            salesOrderBookingStatus: "pending",
            orderReceivedId: existingOrder._id,
            deliveryAt: existingOrder.deliveryAt,
            deliveryAtAddress: existingOrder.deliveryAtAddress,
            batches: existingOrder.batches,
            status: "1",
            createdBy: req.user,
            updatedBy: req.user,
          };
          await SalesOrderBooking.create(obj);
        }

        const product = await Product.findById(req.body.product);
        if (!product) {
          return res.status(404).json({ message: "Product not found." });
        }
        product.category = req.body.category;
        await product.save();
      } catch (error) {
        console.error("Error in Order Receive update pre-hook:", error);
        return res
          .status(500)
          .json({ message: "Error updating OrderReceive." });
      }
    },
  },

  postHooksOptions: {
    softDelete: async (req, res, response) => {
      try {
        console.log("OrderReceived soft delete triggered");

        const { reason } = req.query;
        const deletedId = response?.data?._id || response?._id;

        if (!deletedId) {
          console.warn("No deleted OrderReceived ID found in response");
          return res
            .status(400)
            .json({ message: "No deleted OrderReceived found." });
        }

        // ✅ Log the soft delete
        await createDeleteLog({
          modulename: "OrderReceived",
          reason,
          deletedId,
          userId: req.user,
        });

        // ✅ Send final response with success message
        return res.status(200).json({
          message: "OrderReceived deleted successfully.",
          status: true,
          data: { _id: deletedId },
        });
      } catch (err) {
        console.error("Error in OrderReceived soft delete hook:", err);
        return res.status(500).json({
          message: "Error while soft deleting OrderReceived.",
          status: false,
        });
      }
    },
  },
});

module.exports = OrderReceivedRouter;
