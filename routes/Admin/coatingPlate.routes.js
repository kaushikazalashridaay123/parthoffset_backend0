const generateCrudRoutes = require("mongoose-crud-generator");
const CoatingPlate = require("../../models/coatingPlate.model");
const JobSheetPreparation = require("../../models/jobSheetPreparation.model");
const checkPermission = require("../../middlewares/checkPermission");
const createDeleteLog = require("../../utils/createDeleteLog");

const CoatingPlateRouter = generateCrudRoutes({
  model: CoatingPlate,
  modelName: "CoatingPlate",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("coatingPlate_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("coatingPlate_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("coatingPlate_read")(req, res, next);
    },
    beforeUpdate: (req, res, next) => {
      checkPermission("coatingPlate_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("coatingPlate_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
        console.log("Request body after preHook:", req.body);
      } catch (error) {
        console.error("Error in coatingPlate create hook:", error);
        return res
          .status(500)
          .json({ message: "Error creating coatingPlate." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in coatingPlate update pre-hook:", error);
        return res
          .status(500)
          .json({ message: "Error updating coatingPlate." });
      }
    },
  },

  postHooksOptions: {
    softDelete: async (req, res, response) => {
      try {
        console.log("CoatingPlate soft delete triggered");
        const { reason } = req.query;
        const deletedId = response?.data?._id || response?._id;
        response.message = "CoatingPlate deleted successfully.";

        if (!deletedId) {
          console.warn("No deleted CoatingPlate ID found in response");
          return;
        }

        // Create delete log
        await createDeleteLog({
          modulename: "CoatingPlate",
          reason,
          deletedId,
          userId: req.user,
        });

        // Fetch deleted CoatingPlate document
        const deletedPlate = await CoatingPlate.findById(deletedId);
        if (!deletedPlate) {
          console.warn("Deleted CoatingPlate not found in DB");
          return;
        }

        // Find related JobSheetPreparation
        const relatedJobSheet = await JobSheetPreparation.findOne({
          _id: deletedPlate.jobCardNo,
        });

        if (!relatedJobSheet) {
          console.warn(
            "No related JobSheetPreparation found for CoatingPlate:",
            deletedPlate.jobCardNo
          );
          return;
        }

        // Set JobSheetPreparation status & flag to "pending"
        await JobSheetPreparation.findByIdAndUpdate(
          relatedJobSheet._id,
          {
            jobSheetStatus: "pending",
            jobCardFlag: "pending",
            updatedBy: req.user,
            updatedAt: new Date(),
          },
          { new: true }
        );

        console.log(
          `JobSheetPreparation ${relatedJobSheet._id} set to "pending" (status + flag)`
        );
      } catch (err) {
        console.error("Error in CoatingPlate soft delete hook:", err);
      }
    },
  },
});

module.exports = CoatingPlateRouter;
