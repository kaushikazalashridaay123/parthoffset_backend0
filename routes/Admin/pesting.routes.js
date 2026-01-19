const generateCrudRoutes = require("mongoose-crud-generator");
const Pesting = require("../../models/pesting.model");
const checkPermission = require("../../middlewares/checkPermission");

const PestingRouter = generateCrudRoutes({
  model: Pesting,
  modelName: "Pesting",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("pesting_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("pesting_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("pesting_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("pesting_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("pesting_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Pesting creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Pesting." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Pesting update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Pesting." });
      }
    },
  },
});

module.exports = PestingRouter;
