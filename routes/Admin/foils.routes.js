const generateCrudRoutes = require("mongoose-crud-generator");
const Foils = require("../../models/foils.model");
const ArtWork = require("../../models/artWork.model");
const checkPermission = require("../../middlewares/checkPermission");
const createDeleteLog = require("../../utils/createDeleteLog");

const FoilsRouter = generateCrudRoutes({
  model: Foils,
  modelName: "Foils",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("foils_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("foils_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("foils_read")(req, res, next);
    },
    beforeUpdate: (req, res, next) => {
      checkPermission("foils_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("foils_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Foils create hook:", error);
        return res.status(500).json({ message: "Error creating Foils." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in Foils update pre-hook:", error);
        return res.status(500).json({ message: "Error updating Foils." });
      }
    },
  },

  postHooksOptions: {
    softDelete: async (req, res, response) => {
      try {
        console.log("Foils soft delete triggered:", response?.data?._id);

        const { reason } = req.query;
        response.message = 'Foils deleted successfully.'

        // ✅ Create delete log
        await createDeleteLog({
          modulename: "Foils",
          reason,
          deletedId: response.data._id,
          userId: req.user,
        });

        // ✅ Find the deleted Foils record
        const deletedFoil = await Foils.findById(response.data._id);
        if (!deletedFoil) {
          console.warn("No Foils record found for soft delete post-hook.");
          return;
        }

        // ✅ Get linked ArtWork
        if (deletedFoil.artWorkId) {
          const relatedArtWork = await ArtWork.findById(deletedFoil.artWorkId);
          if (relatedArtWork) {
            // 🔁 Revert artwork status to 'pending'
            relatedArtWork.artWorkStatus = "pending";
            relatedArtWork.updatedBy = req.user;
            relatedArtWork.updatedAt = new Date();
            await relatedArtWork.save();

            console.log(
              `✅ ArtWork (${relatedArtWork._id}) reverted to 'pending' because its Foils was deleted.`
            );
          } else {
            console.warn(
              `No ArtWork found for deleted Foils (${deletedFoil._id}).`
            );
          }
        } else {
          console.warn("Foils record has no artWorkId linked.");
        }
      } catch (err) {
        console.error("Error in Foils soft delete hook:", err);
      }
    },
  },
});

module.exports = FoilsRouter;
