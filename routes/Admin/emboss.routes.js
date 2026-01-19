const generateCrudRoutes = require("mongoose-crud-generator");
const Emboss = require("../../models/emboss.model");
const checkPermission = require("../../middlewares/checkPermission");
const createDeleteLog = require("../../utils/createDeleteLog");
const ArtWork = require("../../models/artWork.model");

const EmbossRouter = generateCrudRoutes({
  model: Emboss,
  modelName: "Emboss",

  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("emboss_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("emboss_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("emboss_read")(req, res, next);
    },
    beforeUpdate: (req, res, next) => {
      checkPermission("emboss_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("emboss_delete")(req, res, next);
    },
  },

  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Emboss create hook:", error);
        return res.status(500).json({ message: "Error creating Emboss." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Emboss update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Emboss." });
      }
    },
  },

  postHooksOptions: {
    softDelete: async (req, res, response) => {
      try {
        console.log("Emboss soft delete triggered:", response?.data?._id);

        const { reason } = req.query;
        response.message = "Emboss deleted successfully.";

        // ✅ Create delete log entry
        await createDeleteLog({
          modulename: "Emboss",
          reason,
          deletedId: response.data._id,
          userId: req.user,
        });

        // ✅ Find deleted Emboss record
        const deletedEmboss = await Emboss.findById(response.data._id);
        if (!deletedEmboss) {
          console.warn("No Emboss record found for soft delete post-hook.");
          return;
        }

        // ✅ If linked with ArtWork, revert that ArtWork to pending
        if (deletedEmboss.artWorkId) {
          const relatedArtWork = await ArtWork.findById(
            deletedEmboss.artWorkId
          );
          if (relatedArtWork) {
            relatedArtWork.artWorkStatus = "pending";
            relatedArtWork.updatedBy = req.user;
            relatedArtWork.updatedAt = new Date();
            await relatedArtWork.save();

            console.log(
              `✅ ArtWork (${relatedArtWork._id}) reverted to 'pending' because its Emboss was deleted.`
            );
          } else {
            console.warn(
              `No ArtWork found for deleted Emboss (${deletedEmboss._id}).`
            );
          }
        } else {
          console.warn("Emboss record has no artWorkId linked.");
        }
      } catch (err) {
        console.error("Error in Emboss soft delete hook:", err);
      }
    },
  },
});

module.exports = EmbossRouter;
