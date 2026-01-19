const generateCrudRoutes = require("mongoose-crud-generator");
const Supplier = require("../../models/supplier.model");
const checkPermission = require("../../middlewares/checkPermission");

const SupplierRouter = generateCrudRoutes({
  model: Supplier,
  modelName: "Supplier",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("supplier_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("supplier_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("supplier_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("supplier_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("supplier_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Supplier creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Supplier." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Supplier update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Supplier." });
      }
    },
  },
});

module.exports = SupplierRouter;
