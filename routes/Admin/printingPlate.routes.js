const generateCrudRoutes = require("mongoose-crud-generator");
const PrintingPlate = require("../../models/printingPlate.model");
const JobSheetPreparation = require("../../models/jobSheetPreparation.model");
const checkPermission = require("../../middlewares/checkPermission");
const createDeleteLog = require("../../utils/createDeleteLog");

const PrintingPlateRouter = generateCrudRoutes({
  model: PrintingPlate,
  modelName: "PrintingPlate",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("printingPlate_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("printingPlate_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("printingPlate_read")(req, res, next);
    },
    beforeUpdate: (req, res, next) => {
      checkPermission("printingPlate_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("printingPlate_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in printingplate create hook:", error);
        return res
          .status(500)
          .json({ message: "Error creating printingplate." });
      }
    },
    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;
      } catch (error) {
        console.error("Error in printingplate update pre-hook:", error);
        return res
          .status(500)
          .json({ message: "Error updating printingplate." });
      }
    },
  },

  postHooksOptions: {
    softDelete: async (req, res, response) => {
      try {
        console.log("Soft delete hook reached for PrintingPlate");
        console.log("Response object:", JSON.stringify(response, null, 2));

        const { reason } = req.query;
        const deletedId = response?._id || response?.data?._id || req.params?.id;
        response.message = "PritingPlate deleted successfully.";

        console.log("Deleted ID captured:", deletedId);

        if (!deletedId) {
          console.warn("No deleted PrintingPlate ID found");
          return;
        }

        await createDeleteLog({
          modulename: "PrintingPlate",
          reason,
          deletedId,
          userId: req.user,
        });
        console.log("Delete log created successfully");

        const deletedPlate = await PrintingPlate.findById(deletedId);
        console.log("Deleted Plate found:", deletedPlate?._id);

        if (!deletedPlate) {
          console.warn("Deleted PrintingPlate not found in DB");
          return;
        }

        const relatedJobSheet = await JobSheetPreparation.findOne({
          _id: deletedPlate.jobCardNo,
        });

        if (!relatedJobSheet) {
          console.warn(
            "No related JobSheetPreparation found for PrintingPlate:",
            deletedPlate.jobCardNo
          );
          return;
        }

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
          `JobSheetPreparation ${relatedJobSheet._id} set to "pending"`
        );
      } catch (err) {
        console.error("Error in PrintingPlate soft delete hook:", err);
      }
    },
  },
});

module.exports = PrintingPlateRouter;
