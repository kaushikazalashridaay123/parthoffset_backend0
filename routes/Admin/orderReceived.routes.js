const generateCrudRoutes = require("mongoose-crud-generator");
const OrderReceived = require("../../models/orderReceived.model");
const SalesOrderBooking = require("../../models/salesOrderBooking.model");
const Product = require("../../models/product.model");
const checkPermission = require("../../middlewares/checkPermission");
const generateOrderNo = require("../../utils/generateOrderNo");
const generateSalesOrderNo = require("../../utils/generateSalesOrderNo");
const createDeleteLog = require("../../utils/createDeleteLog");
const Client = require("../../models/client.model");
const Category = require("../../models/category.model");
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../..", "search_debug.log");
const log = (msg) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `[${timestamp}] ${msg}\n`);
};

const OrderReceivedRouter = generateCrudRoutes({
  model: OrderReceived,
  modelName: "OrderReceived",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("orderReceived_create")(req, res, next);
    },
    beforeGetAll: async (req, res, next) => {
      log(`Incoming request: ${req.url}`);
      checkPermission("orderReceived_read")(req, res, async () => {
        const { search, filter } = req.query;
        if (search && search.trim()) {
          const q = search.trim();
          log(`Search triggered for: "${q}"`);

          try {
            const regex = {
              $regex: q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              $options: "i",
            };

            // Get IDs from joined models
            const [clientIds, productIds, categoryIds] = await Promise.all([
              Client.find({
                $or: [
                  { clientName: regex },
                  { mailingName: regex },
                  { concernPersonName: regex },
                ],
              }).distinct("_id"),
              Product.find({ productName: regex }).distinct("_id"),
              Category.find({ name: regex }).distinct("_id"),
            ]);

            log(`Matched IDs - Clients: ${clientIds.length}, Products: ${productIds.length}, Categories: ${categoryIds.length}`);

            // Build $or array dynamically
            const orConditions = [{ orderNo: regex }, { poNo: regex }];

            // Add Date search if q looks like it might be part of a formatted date
            orConditions.push({
              $expr: {
                $regexMatch: {
                  input: {
                    $dateToString: {
                      format: "%d %b, %Y",
                      date: { $ifNull: ["$date", new Date(0)] },
                    },
                  },
                  regex: q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                  options: "i",
                },
              },
            });

            if (clientIds.length > 0)
              orConditions.push({ client: { $in: clientIds } });
            if (productIds.length > 0)
              orConditions.push({ product: { $in: productIds } });
            if (categoryIds.length > 0)
              orConditions.push({ category: { $in: categoryIds } });

            const advancedFilter = { $or: orConditions };

            // Merge with existing filter
            let currentFilter = {};
            if (filter) {
              try {
                currentFilter =
                  typeof filter === "string" ? JSON.parse(filter) : filter;
                log(`Existing filter found: ${JSON.stringify(currentFilter)}`);
              } catch (e) {
                log(`Filter parse failed: ${e.message}`);
                currentFilter = {};
              }
            }

            // Combine with $and
            const finalFilter =
              Object.keys(currentFilter).length > 0
                ? { $and: [currentFilter, advancedFilter] }
                : advancedFilter;

            req.query.filter = JSON.stringify(finalFilter);
            log(`Final filter applied: ${req.query.filter}`);

            // Clear default search params
            delete req.query.search;
            delete req.query.searchFields;
          } catch (err) {
            log(`Search Error: ${err.message}`);
          }
        }
        next();
      });
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
            extraNotes: existingOrder.extraNotes,
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
