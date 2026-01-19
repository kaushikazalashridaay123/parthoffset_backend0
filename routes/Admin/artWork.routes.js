const generateCrudRoutes = require("mongoose-crud-generator");
const ArtWork = require("../../models/artWork.model");
const checkPermission = require("../../middlewares/checkPermission");
const Product = require("../../models/product.model");
const Foils = require("../../models/foils.model");
const Emboss = require("../../models/emboss.model");
const SalesOrderBooking = require("../../models/salesOrderBooking.model");
const createDeleteLog = require("../../utils/createDeleteLog");

const ArtWorkRouter = generateCrudRoutes({
  model: ArtWork,
  modelName: "ArtWork",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("artWork_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("artWork_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("artWork_read")(req, res, next);
    },
    beforeUpdate: (req, res, next) => {
      checkPermission("artWork_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("artWork_delete")(req, res, next);
    },
  },

  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in ArtWork creation pre-hook:", error);
        return res.status(500).json({ message: "Error creating ArtWork." });
      }
    },

    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;

        const existingArtWork = await ArtWork.findById(req.params.id);
        if (!existingArtWork) {
          return res.status(404).json({ message: "Artwork not found." });
        }

        const salesOrder = await SalesOrderBooking.findById(
          existingArtWork.salesOrderBookingId
        )
          .select("foilsFrontSide foilsBackSide emboss")
          .lean();

        if (!salesOrder) {
          return res
            .status(404)
            .json({ message: "Sales Order Booking not found." });
        }

        const foilsFront = salesOrder.foilsFrontSide;
        const foilsBack = salesOrder.foilsBackSide;
        const emboss = salesOrder.emboss;

        if (req.body.artWorkStatus === "complete") {
          const hasFoils = foilsFront || foilsBack;

          console.log("hasFoils:", hasFoils);

          if (hasFoils) {
            const foilExists = await Foils.findOne({
              artWorkId: existingArtWork._id,
            });
            if (!foilExists) {
              await Foils.create({
                artWorkId: existingArtWork._id,
                productId: existingArtWork.product,
                foilsFront: foilsFront,
                foilsBack: foilsBack,
                vendorName: req.body.vendorName,
                reference: req.body.reference,
                designerName: req.body.designerName,
                upsFoils: req.body.upsFoils,
                foilsFrontDesc: req.body.foilsFrontDesc,
                foilsBackDesc: req.body.foilsBackDesc,
                date: new Date(),
                status: "1",
                userId: req.user._id,
                createdBy: req.user,
                updatedBy: req.user,
              });
            }
          }

          if (emboss === "yes") {
            const embossExists = await Emboss.findOne({
              artWorkId: existingArtWork._id,
            });

            if (!embossExists) {
              await Emboss.create({
                artWorkId: existingArtWork._id,
                productId: existingArtWork.product,
                mode: req.body.embossMode,
                reference: req.body.reference,
                emboss: req.body.emboss,
                vendorName: req.body.vendorName,
                designerName: req.body.designerName,
                upsEmboss: req.body.upsEmboss,
                sendForBlock: req.body.sendForBlock,
                embossDesc: req.body.embossDesc,
                date: new Date(),
                status: "1",
                userId: req.user._id,
                createdBy: req.user,
                updatedBy: req.user,
              });
            }
          }
        }

        if (req.body.sizeInMm) {
          const product = await Product.findById(existingArtWork.product);
          if (!product) {
            return res.status(404).json({ message: "Product not found." });
          }
          product.size = req.body.sizeInMm;
          await product.save();
        }
      } catch (error) {
        console.error("Error in ArtWork update pre-hook:", error);
        return res.status(500).json({ message: "Error updating ArtWork." });
      }
    },
  },
  postHooksOptions: {
    softDelete: async (req, res, response) => {
      try {
        console.log("ArtWork post-delete hook triggered");
        const { reason } = req.query;

        response.message = "ArtWork deleted successfully.";

        await createDeleteLog({
          modulename: "ArtWork",
          reason,
          deletedId: response.data._id,
          userId: req.user,
        });

        const deletedArtWork = await ArtWork.findById(response.data._id);
        if (!deletedArtWork) {
          console.warn("Deleted ArtWork not found for post-hook update.");
          return;
        }

        const salesOrderBookingId = deletedArtWork.salesOrderBookingId;
        if (salesOrderBookingId) {
          await SalesOrderBooking.findByIdAndUpdate(salesOrderBookingId, {
            salesOrderBookingStatus: "pending",
          });
          console.log(
            `SalesOrderBooking (${salesOrderBookingId}) status reverted to 'pending' due to ArtWork delete.`
          );
        } else {
          console.warn("No related SalesOrderBookingId found on ArtWork.");
        }
      } catch (err) {
        console.error("Error in ArtWork delete post-hook:", err);
      }
    },
  },
});

module.exports = ArtWorkRouter;
