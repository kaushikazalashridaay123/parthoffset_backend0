const generateCrudRoutes = require("mongoose-crud-generator");
const Machine = require("../../models/machine.model");
const checkPermission = require("../../middlewares/checkPermission");

const MachineRouter = generateCrudRoutes({
  model: Machine,
  modelName: "Machine",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("machine_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("machine_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("machine_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("machine_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("machine_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Machine creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Machine." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Machine update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Machine." });
      }
    },
  },
});

module.exports = MachineRouter;
