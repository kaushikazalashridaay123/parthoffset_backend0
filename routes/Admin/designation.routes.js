const generateCrudRoutes = require("mongoose-crud-generator");
const Designation = require("../../models/designation.model");
const checkPermission = require("../../middlewares/checkPermission");

const DesignationRouter = generateCrudRoutes({
  model: Designation,
  modelName: "Designation",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("designation_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("designation_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("designation_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("designation_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("designation_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Designation creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Designation." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Designation update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Designation." });
      }
    },
  },
});

module.exports = DesignationRouter;
