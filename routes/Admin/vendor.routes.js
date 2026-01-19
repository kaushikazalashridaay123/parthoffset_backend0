const generateCrudRoutes = require("mongoose-crud-generator");
const Vendor = require("../../models/vendor.model");
const checkPermission = require("../../middlewares/checkPermission");

const VendorRouter = generateCrudRoutes({
  model: Vendor,
  modelName: "Vendor",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("vendor_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("vendor_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("vendor_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("vendor_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("vendor_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Vendor creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Vendor." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Vendor update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Vendor." });
      }
    },
  },
});

module.exports = VendorRouter;
