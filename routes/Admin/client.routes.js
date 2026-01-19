const generateCrudRoutes = require("mongoose-crud-generator");
const Client = require("../../models/client.model");
const checkPermission = require("../../middlewares/checkPermission");

const ClientRouter = generateCrudRoutes({
  model: Client,
  modelName: "Client",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("client_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("client_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("client_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("client_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("client_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Client creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Client." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Client update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Client." });
      }
    },
  },
});

module.exports = ClientRouter;
