const generateCrudRoutes = require("mongoose-crud-generator");
const OrderMode = require("../../models/orderMode.model");
const checkPermission = require("../../middlewares/checkPermission");

const OrderModeRouter = generateCrudRoutes({
  model: OrderMode,
  modelName: "OrderMode",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("orderMode_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("orderMode_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("orderMode_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("orderMode_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("orderMode_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in OrderMode creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating OrderMode." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in OrderMode update pre-hook:", error);
        return res.status(500).json({ message: "Error updating OrderMode." });
      }
    },
  },

});

module.exports = OrderModeRouter;
