const generateCrudRoutes = require("mongoose-crud-generator");
const InkAndChemical = require("../../models/inkAndChemical.model");
const checkPermission = require("../../middlewares/checkPermission");
const generateOrderNo = require("../../utils/generateOrderNo");

const InkAndChemicalRouter = generateCrudRoutes({
  model: InkAndChemical,
  modelName: "InkAndChemical",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("inkAndChemical_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("inkAndChemical_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("inkAndChemical_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("inkAndChemical_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("inkAndChemical_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Ink and Chemical creation pre-hook:", error);
        return res
          .status(500)
          .json({ message: "Error creating Ink and Chemical." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Ink and Chemical update pre-hook:", error);
        return res
          .status(500)
          .json({ message: "Error updating Ink and Chemical." });
      }
    },
  },
});

module.exports = InkAndChemicalRouter;
