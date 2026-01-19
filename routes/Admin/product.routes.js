const generateCrudRoutes = require("mongoose-crud-generator");
const Product = require("../../models/product.model");
const checkPermission = require("../../middlewares/checkPermission");

const ProductRouter = generateCrudRoutes({
  model: Product,
  modelName: "Product",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("product_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("product_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("product_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("product_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("product_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Product creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Product." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Product update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Product." });
      }
    },
  },
});

module.exports = ProductRouter;
