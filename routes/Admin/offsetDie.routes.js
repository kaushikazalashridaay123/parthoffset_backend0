const generateCrudRoutes = require("mongoose-crud-generator");
const OffsetDie = require("../../models/offsetDie.model");
const checkPermission = require("../../middlewares/checkPermission");

const OffsetDieRouter = generateCrudRoutes({
  model: OffsetDie,
  modelName: "OffsetDie",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("offsetDie_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("offsetDie_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("offsetDie_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("offsetDie_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("offsetDie_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Offset Die creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Offset Die." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Offset Die update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Offset Die." });
      }
    },
  },
});

module.exports = OffsetDieRouter;
