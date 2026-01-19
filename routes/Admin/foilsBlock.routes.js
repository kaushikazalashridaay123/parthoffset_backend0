const generateCrudRoutes = require("mongoose-crud-generator");
const FoilsBlock = require("../../models/foilsBlock.model");
const checkPermission = require("../../middlewares/checkPermission");

const FoilsBlockRouter = generateCrudRoutes({
  model: FoilsBlock,
  modelName: "FoilsBlock",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("foilsBlock_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("foilsBlock_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("foilsBlock_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("foilsBlock_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("foilsBlock_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Foils Block creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Foils Block." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Foils Block update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Foils Block." });
      }
    },
  },
});

module.exports = FoilsBlockRouter;
