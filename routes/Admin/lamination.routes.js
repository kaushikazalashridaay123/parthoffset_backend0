const generateCrudRoutes = require("mongoose-crud-generator");
const Lamination = require("../../models/lamination.model");
const checkPermission = require("../../middlewares/checkPermission");

const LaminationRouter = generateCrudRoutes({
  model: Lamination,
  modelName: "Lamination",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("lamination_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("lamination_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("lamination_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("lamination_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("lamination_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Lamination creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Lamination." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Lamination update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Lamination." });
      }
    },
  },
});

module.exports = LaminationRouter;
