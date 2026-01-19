const generateCrudRoutes = require("mongoose-crud-generator");
const Coating = require("../../models/coating.model");
const checkPermission = require("../../middlewares/checkPermission");

const CoatingRouter = generateCrudRoutes({
  model: Coating,
  modelName: "Coating",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("coating_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("coating_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("coating_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("coating_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("coating_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Coating creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Coating." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Coating update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Coating." });
      }
    },
  },
});

module.exports = CoatingRouter;
