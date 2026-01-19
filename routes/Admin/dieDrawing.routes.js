const generateCrudRoutes = require("mongoose-crud-generator");
const DieDrawing = require("../../models/dieDrawing.model");
const JobSheetPreparation = require("../../models/jobSheetPreparation.model");
const checkPermission = require("../../middlewares/checkPermission");
const createDeleteLog = require("../../utils/createDeleteLog");

const DieDrawingRouter = generateCrudRoutes({
  model: DieDrawing,
  modelName: "DieDrawing",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("dieDrawing_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("dieDrawing_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("dieDrawing_read")(req, res, next);
    },
    beforeUpdate: (req, res, next) => {
      checkPermission("dieDrawing_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("dieDrawing_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in DieDrawing create hook:", error);
        return res.status(500).json({ message: "Error creating DieDrawing." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in DieDrawing update pre-hook:", error);
        return res.status(500).json({ message: "Error updating DieDrawing." });
      }
    },
  },

  postHooksOptions: {
    softDelete: async (req, res, response) => {
      try {
        console.log("🗑️ DieDrawing soft delete triggered");

        const { reason } = req.query;
        const deletedId = response?.data?._id || response?._id;
        response.message = "DieDrawing deleted successfully.";

        if (!deletedId) {
          console.warn("No deleted DieDrawing ID found in response");
          return;
        }

        // Create delete log
        await createDeleteLog({
          modulename: "DieDrawing",
          reason,
          deletedId,
          userId: req.user,
        });

        // Fetch deleted DieDrawing
        const deletedDieDrawing = await DieDrawing.findById(deletedId);
        if (!deletedDieDrawing) {
          console.warn("Deleted DieDrawing not found in DB");
          return;
        }

        // Find related JobSheetPreparation
        const relatedJobSheet = await JobSheetPreparation.findOne({
          _id: deletedDieDrawing.jobCardNo,
        });

        if (!relatedJobSheet) {
          console.warn(
            "No related JobSheetPreparation found for DieDrawing:",
            deletedDieDrawing.jobCardNo
          );
          return;
        }

        // Set its status and flag to pending
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
        console.error("Error in DieDrawing soft delete hook:", err);
      }
    },
  },
});

module.exports = DieDrawingRouter;
