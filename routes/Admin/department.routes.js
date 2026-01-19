const generateCrudRoutes = require("mongoose-crud-generator");
const Department = require("../../models/department.model");
const checkPermission = require("../../middlewares/checkPermission");

const DepartmentRouter = generateCrudRoutes({
  model: Department,
  modelName: "Department",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("department_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("department_read")(req, res, next);
    },

    beforeGetById: (req, res, next) => {
      checkPermission("department_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("department_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("department_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Department creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Department." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Department update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Department." });
      }
    },
  },
});

module.exports = DepartmentRouter;
