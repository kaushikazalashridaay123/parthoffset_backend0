const generateCrudRoutes = require("mongoose-crud-generator");
const Paper = require("../../models/paper.model");
const checkPermission = require("../../middlewares/checkPermission");
const generateOrderNo = require("../../utils/generateOrderNo");

const PaperRouter = generateCrudRoutes({
  model: Paper,
  modelName: "Paper",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("paper_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("paper_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("paper_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("paper_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("paper_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Paper creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Paper." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Paper update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Paper." });
      }
    },
  },
});

module.exports = PaperRouter;
