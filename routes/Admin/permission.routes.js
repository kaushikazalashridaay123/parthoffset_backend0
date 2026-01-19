const generateCrudRoutes = require("mongoose-crud-generator");
const Permission = require("../../models/permission.model");
const checkPermission = require("../../middlewares/checkPermission");

const PermissionRouter = generateCrudRoutes({
  model: Permission,
  modelName: "Permission",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("roleAndPermission_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("roleAndPermission_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("roleAndPermission_read")(req, res, next);
    },
    beforeUpdate: (req, res, next) => {
      checkPermission("roleAndPermission_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("roleAndPermission_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Permission creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating permission." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Permission update pre-hook:", error);
        return res.status(500).json({ message: "Error updating permission." });
      }
    },
  },
});

module.exports = PermissionRouter;
