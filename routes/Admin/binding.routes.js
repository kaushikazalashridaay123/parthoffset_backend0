const generateCrudRoutes = require("mongoose-crud-generator");
const Binding = require("../../models/binding.model");
const checkPermission = require("../../middlewares/checkPermission");

const BindingRouter = generateCrudRoutes({
  model: Binding,
  modelName: "Binding",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("binding_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("binding_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("binding_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("binding_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("binding_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in binding creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating binding." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in binding update pre-hook:", error);
        return res.status(500).json({ message: "Error updating binding." });
      }
    },
  },
});

module.exports = BindingRouter;
