const generateCrudRoutes = require("mongoose-crud-generator");
const EmbossBlock = require("../../models/embossBlock.model");
const checkPermission = require("../../middlewares/checkPermission");

const EmbossBlockRouter = generateCrudRoutes({
  model: EmbossBlock,
  modelName: "EmbossBlock",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("embossBlock_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("embossBlock_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("embossBlock_read")(req, res, next);
    },

    beforeUpdate: (req, res, next) => {
      checkPermission("embossBlock_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("embossBlock_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Emboss Block creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating Emboss Block." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Emboss Block update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Emboss Block." });
      }
    },
  },
});

module.exports = EmbossBlockRouter;
