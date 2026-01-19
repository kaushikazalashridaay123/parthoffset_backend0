const generateCrudRoutes = require("mongoose-crud-generator");
const Role = require("../../models/role.model");
const checkPermission = require("../../middlewares/checkPermission");

const RoleRouter = generateCrudRoutes({
  model: Role,
  modelName: "Role",
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
        console.error("Error in Role creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating role." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body = req.body || {};
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Role update pre-hook:", error);
        return res.status(500).json({ message: "Error updating role." });
      }
    },
  },
});

module.exports = RoleRouter;
