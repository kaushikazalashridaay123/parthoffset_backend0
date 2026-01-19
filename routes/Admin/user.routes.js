const generateCrudRoutes = require("mongoose-crud-generator");
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const checkPermission = require("../../middlewares/checkPermission");

const UserRouter = generateCrudRoutes({
  model: User,
  modelName: "User",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("user_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("user_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("user_read")(req, res, next);
    },
    beforeUpdate: (req, res, next) => {
      checkPermission("user_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("user_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        console.error("Error in User creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating user." });
      }
    },
    update: async (req, res, next) => {
      try {
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        }
      } catch (error) {
        console.error("Error in User update pre-hook:", error);
        return res.status(500).json({ message: "Error updating user." });
      }
    },
  },
});

module.exports = UserRouter;
