const generateCrudRoutes = require("mongoose-crud-generator");
const Category = require("../../models/category.model");
const checkPermission = require("../../middlewares/checkPermission");

const CategoryRouter = generateCrudRoutes({
  model: Category,
  modelName: "Category",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("category_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("category_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("category_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("category_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("category_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Category creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Category." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Category update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Category." });
      }
    },
  },
});

module.exports = CategoryRouter;
