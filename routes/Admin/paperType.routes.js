const generateCrudRoutes = require("mongoose-crud-generator");
const PaperType = require("../../models/paperType.model");
const checkPermission = require("../../middlewares/checkPermission");

const PaperTypeRouter = generateCrudRoutes({
  model: PaperType,
  modelName: "PaperType",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("paperType_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("paperType_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("paperType_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("paperType_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("paperType_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Paper Type creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Paper Type." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Paper Type update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Paper Type." });
      }
    },
  },
});

module.exports = PaperTypeRouter;
