// const generateCrudRoutes = require("mongoose-crud-generator");
// const JobSheetPreparation = require("../../models/jobSheetPreparation.model");
// const checkPermission = require("../../middlewares/checkPermission");
// const DieDrawing = require("../../models/dieDrawing.model");
// const PrintingPlate = require("../../models/printingPlate.model");
// const CoatingPlate = require("../../models/coatingPlate.model");
// const JobCardGenerate = require("../../models/jobCardGenerate.model");
// const createDeleteLog = require("../../utils/createDeleteLog");

// const JobSheetPreparationRouter = generateCrudRoutes({
//   model: JobSheetPreparation,
//   modelName: "JobSheetPreparation",
//   middlewareOptions: {
//     beforeCreate: (req, res, next) => {
//       checkPermission("jobSheetPreparation_create")(req, res, next);
//     },
//     beforeGetAll: (req, res, next) => {
//       checkPermission("jobSheetPreparation_read")(req, res, next);
//     },
//     beforeGetById: (req, res, next) => {
//       checkPermission("jobSheetPreparation_read")(req, res, next);
//     },

//     beforeUpdate: (req, res, next) => {
//       checkPermission("jobSheetPreparation_update")(req, res, next);
//     },
//     beforeSoftDelete: (req, res, next) => {
//       checkPermission("jobSheetPreparation_delete")(req, res, next);
//     },
//   },
//   preHooksOptions: {
//     create: async (req, res, next) => {
//       try {
//         req.body.createdBy = req.user;
//         req.body.updatedBy = req.user;
//         req.body.jobSheetStatus = "pending";
//         req.body.jobCardFlag = "pending";
//       } catch (error) {
//         console.error("Error in Job Sheet Preparation pre-hook:", error);
//         return res.status(500).json({ message: "Error creating Job Sheet Preparation." });
//       }
//     },
//     update: async (req, res, next) => {
//       try {
//         req.body.updatedBy = req.user;

//         const jobSheetId = req.params.id;
//         const jobSheet = await JobSheetPreparation.findById(jobSheetId);
//         console.log("jobSheetId", jobSheetId);
//         console.log("Current Job Sheet Data:", jobSheet);

//         if (!jobSheet) {
//           return res.status(404).json({ message: "Job Sheet not found." });
//         }

//         const newStatus = req.body.jobSheetStatus;
//         const jobCardNo = jobSheet._id;
//         const jobPaperSize = req.body.jobPaperSize || jobSheet.jobPaperSize;
//         const userId = req.user;

//         if (newStatus === "complete") {
//           console.log("Job Sheet marked complete Generating dependent records...");

//           const isInsert = (req.body.category || jobSheet.category) === "Insert";
//           let artworkIds = req.body.artWork || jobSheet.artWork || [];
//           if (!Array.isArray(artworkIds)) artworkIds = [artworkIds];

//           console.log("Artwork IDs:", artworkIds);

//           if (!isInsert) {
//             // Die Drawing
//             await DieDrawing.findOneAndUpdate(
//               { jobCardNo },
//               {
//                 jobCardNo,
//                 designer: jobSheet.designer,
//                 mode: "auto",
//                 reference: "JobSheetComplete",
//                 status: 1,
//                 createdBy: userId,
//                 updatedBy: userId,
//               },
//               { upsert: true, new: true, runValidators: true }
//             );
//             console.log("Die Drawing created/updated");
//           }

//           // Printing Plate
//           await PrintingPlate.findOneAndUpdate(
//             { jobCardNo },
//             {
//               jobCardNo,
//               designerName: jobSheet.designer,
//               plateType: "Printing Plate",
//               printingPlateMachine: jobSheet.machineName,
//               jobPaperSize,
//               status: 1,
//               createdBy: userId,
//               updatedBy: userId,
//             },
//             { upsert: true, new: true }
//           );
//           console.log("Printing Plate created/updated");

//           // Coating Plate
//           await CoatingPlate.findOneAndUpdate(
//             { jobCardNo },
//             {
//               jobCardNo,
//               designerName: jobSheet.designer,
//               plateType: "Coating Plate",
//               coatingPlateMachine: jobSheet.machineName,
//               jobPaperSize,
//               status: 1,
//               createdBy: userId,
//               updatedBy: userId,
//             },
//             { upsert: true, new: true }
//           );
//           console.log("Coating Plate created/updated");
//         }
//         // JOB CARD GENERATION
//         await JobCardGenerate.findOneAndUpdate(
//           { jobCardNo },
//           {
//             jobCardNo,
//             category: jobSheet.category,
//             date: new Date(),
//             jobCardNumber: jobCardNo.toString(),
//             paperType: jobSheet.paperType,
//             gsm: jobSheet.gsm,
//             quality: jobSheet.quality,
//             mill: jobSheet.mill,
//             sheetSize: jobPaperSize,
//             jobSheetQty: jobSheet.jobSheetQty,
//             wastage: jobSheet.wastage,
//             jobSize: jobSheet.jobSize,
//             totalSheet: jobSheet.totalSheet,
//             paperCut: jobSheet.paperCut,
//             trimWaste: jobSheet.trimWaste,
//             sheetQuantity: jobSheet.sheetQuantity,
//             frontColours: jobSheet.frontColours,
//             backColours: jobSheet.backColours,
//             coating: jobSheet.coating,
//             lamination: jobSheet.lamination,
//             foils: jobSheet.foils,
//             spotUV: jobSheet.spotUV,
//             emboss: jobSheet.emboss,
//             corrugation: jobSheet.corrugation,
//             nvz: jobSheet.nvz,
//             pasting: jobSheet.pasting,
//             window: jobSheet.window,
//             b2bPasting: jobSheet.b2bPasting,
//             processDetails: jobSheet.processDetails,
//             productInformation: jobSheet.productInformation,
//             status: 1,
//           },
//           { upsert: true, new: true, runValidators: true }
//         );
//       } catch (error) {
//         console.error("Error in Job Sheet Preparation update pre-hook:", error);
//         return res.status(500).json({ message: "Error updating Job Sheet Preparation." });
//       }
//     },
//   },

//   postHooksOptions: {
//     softDelete: async (req, res, response) => {
//       try {
//         console.log("response", response);

//         const { reason } = req.query;

//         await createDeleteLog({
//           modulename: "JobSheetPreparation",
//           reason,
//           deletedId: response.data._id,
//           userId: req.user,
//         });
//       } catch (err) {
//         console.log(err);

//       }
//     }
//   }
// });

// module.exports = JobSheetPreparationRouter;

const generateCrudRoutes = require("mongoose-crud-generator");
const JobSheetPreparation = require("../../models/jobSheetPreparation.model");
const checkPermission = require("../../middlewares/checkPermission");
const DieDrawing = require("../../models/dieDrawing.model");
const PrintingPlate = require("../../models/printingPlate.model");
const CoatingPlate = require("../../models/coatingPlate.model");
const JobCardGenerate = require("../../models/jobCardGenerate.model");
const createDeleteLog = require("../../utils/createDeleteLog");
const ArtWork = require("../../models/artWork.model");
const SalesOrderBooking = require("../../models/salesOrderBooking.model");

const JobSheetPreparationRouter = generateCrudRoutes({
  model: JobSheetPreparation,
  modelName: "JobSheetPreparation",
  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("jobSheetPreparation_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("jobSheetPreparation_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("jobSheetPreparation_read")(req, res, next);
    },
    beforeUpdate: (req, res, next) => {
      checkPermission("jobSheetPreparation_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("jobSheetPreparation_delete")(req, res, next);
    },
  },
  preHooksOptions: {
    create: async (req, res) => {
      // NO next() parameter - just modify req.body and return
      req.body.createdBy = req.user;
      req.body.updatedBy = req.user;
      req.body.jobSheetStatus = "pending";
      req.body.jobCardFlag = "pending";
      // Don't call next() - just return
    },
    update: async (req, res) => {
      // NO next() parameter - just modify req.body and return
      req.body.updatedBy = req.user;
      // Don't call next() - just return
    },
  },
  postHooksOptions: {
    softDelete: async (req, res, response) => {
      try {
        console.log("✅ JobSheetPreparation post-delete hook triggered");

        const { reason } = req.query;
        const deletedId = response?._id || response?.data?._id;

        response.message = "JobSheetPreparation deleted successfully.";

        if (!deletedId) {
          console.warn("⚠️ No deleted Job Sheet ID found in response");
          return;
        }

        // ✅ Log deletion
        await createDeleteLog({
          modulename: "JobSheetPreparation",
          reason,
          deletedId,
          userId: req.user,
        });

        // ✅ Fetch deleted JobSheet
        const deletedJobSheet = await JobSheetPreparation.findById(deletedId);
        if (!deletedJobSheet) {
          console.warn("⚠️ Deleted Job Sheet not found in DB");
          return;
        }

        console.log("🧾 Deleted JobSheet:", deletedJobSheet._id);

        // ✅ Update related ArtWorks → pending
        const relatedArtWorks = await ArtWork.find({
          $or: [
            { jobSheetPreparationId: deletedJobSheet._id },
            { salesOrderBookingId: deletedJobSheet.salesOrderBookingId },
          ],
        });

        if (relatedArtWorks.length > 0) {
          await Promise.all(
            relatedArtWorks.map((artwork) =>
              ArtWork.findByIdAndUpdate(artwork._id, {
                artWorkStatus: "pending",
                updatedBy: req.user,
                updatedAt: new Date(),
              })
            )
          );
          console.log(`🎨 ${relatedArtWorks.length} ArtWorks set to pending.`);
        }

        // ✅ Update related JobCards → pending
        const relatedJobCards = await JobCardGenerate.find({
          jobCardNo: deletedJobSheet._id,
        });

        if (relatedJobCards.length > 0) {
          await Promise.all(
            relatedJobCards.map((card) =>
              JobCardGenerate.findByIdAndUpdate(card._id, {
                status: "pending",
                jobCardFlag: "pending",
                updatedBy: req.user,
                updatedAt: new Date(),
              })
            )
          );
          console.log(`📋 ${relatedJobCards.length} JobCards set to pending.`);
        }

        // ✅ Reset DieDrawing / PrintingPlate / CoatingPlate → pending
        const [dieDrawings, printingPlates, coatingPlates] = await Promise.all([
          DieDrawing.find({ jobCardNo: deletedJobSheet._id }),
          PrintingPlate.find({ jobCardNo: deletedJobSheet._id }),
          CoatingPlate.find({ jobCardNo: deletedJobSheet._id }),
        ]);

        await Promise.all([
          ...dieDrawings.map((item) =>
            DieDrawing.findByIdAndUpdate(item._id, {
              status: "pending",
              updatedBy: req.user,
              updatedAt: new Date(),
            })
          ),
          ...printingPlates.map((item) =>
            PrintingPlate.findByIdAndUpdate(item._id, {
              status: "pending",
              updatedBy: req.user,
              updatedAt: new Date(),
            })
          ),
          ...coatingPlates.map((item) =>
            CoatingPlate.findByIdAndUpdate(item._id, {
              status: "pending",
              updatedBy: req.user,
              updatedAt: new Date(),
            })
          ),
        ]);

        console.log(
          `✅ Reverted related records — ArtWorks: ${relatedArtWorks.length}, JobCards: ${relatedJobCards.length}`
        );
      } catch (err) {
        console.error("❌ Error in JobSheetPreparation delete post-hook:", err);
      }
    },
  },
});

// ========== CUSTOM ENDPOINT: Create Job Card from Job Sheet ==========
JobSheetPreparationRouter.post(
  "/create-job-card/:id",
  checkPermission("jobSheetPreparation_update"),
  async (req, res) => {
    try {
      const jobSheetId = req.params.id;
      const jobSheet = await JobSheetPreparation.findById(jobSheetId);

      if (!jobSheet) {
        return res.status(404).json({
          success: false,
          message: "Job Sheet not found.",
        });
      }

      // Check if already deleted
      if (jobSheet.isDeleted) {
        return res.status(400).json({
          success: false,
          message: "Cannot create Job Card for deleted Job Sheet.",
        });
      }

      // Check job sheet status
      if (jobSheet.jobSheetStatus?.toLowerCase() !== "complete") {
        return res.status(400).json({
          success: false,
          message: "Job Sheet must be complete to create Job Card.",
        });
      }

      // Check if job card already created
      if (jobSheet.jobCardFlag === "done" || jobSheet.jobCardFlag === true) {
        return res.status(400).json({
          success: false,
          message: "Job Card already created for this Job Sheet.",
        });
      }

      const jobCardNo = jobSheet._id;
      const jobPaperSize = jobSheet.jobPaperSize;
      const userId = req.user;
      const isInsert = jobSheet.category === "Insert";

      // Create dependent records only for non-Insert categories
      if (!isInsert) {
        // Die Drawing
        await DieDrawing.findOneAndUpdate(
          { jobCardNo },
          {
            jobCardNo,
            designer: jobSheet.designer,
            mode: "auto",
            reference: "JobSheetComplete",
            status: 1,
            createdBy: userId,
            updatedBy: userId,
          },
          { upsert: true, new: true, runValidators: true }
        );
        console.log("Die Drawing created/updated for Job Card:", jobCardNo);

        // Printing Plate
        await PrintingPlate.findOneAndUpdate(
          { jobCardNo },
          {
            jobCardNo,
            designerName: jobSheet.designer,
            plateType: "Printing Plate",
            printingPlateMachine: jobSheet.machineName,
            jobPaperSize,
            status: 1,
            createdBy: userId,
            updatedBy: userId,
          },
          { upsert: true, new: true, runValidators: true }
        );
        console.log("Printing Plate created/updated for Job Card:", jobCardNo);

        // Coating Plate
        await CoatingPlate.findOneAndUpdate(
          { jobCardNo },
          {
            jobCardNo,
            designerName: jobSheet.designer,
            plateType: "Coating Plate",
            coatingPlateMachine: jobSheet.machineName,
            jobPaperSize,
            status: 1,
            createdBy: userId,
            updatedBy: userId,
          },
          { upsert: true, new: true, runValidators: true }
        );
        console.log("Coating Plate created/updated for Job Card:", jobCardNo);
      }

      // Create Job Card
      console.log("jobSheet", jobSheet);

    let  artWorkDetails = await Promise.all(
        jobSheet.artWorkDetails.map(async (art) => {
          const sobData = await SalesOrderBooking.findOne({
            sobNo: art.sobNo,
          }).lean();
          
          console.log("sobData" , sobData );
          
          return {
            ...art.toObject(),
            pesting: sobData?.pesting ?? null,
            backToBackPesting: sobData?.backToBackPesting ?? null,
            windowPesting: sobData?.windowPesting ?? null,
          };
        })
      );

      const jobCard = await JobCardGenerate.findOneAndUpdate(
        { jobCardNo },
        {
          jobCardNo,
          category: jobSheet.category,
          date: new Date(),
          jobCardNumber: jobCardNo.toString(),
          paperType: jobSheet.paperType,
          gsm: jobSheet.gsm,
          quality: jobSheet.quality,
          mill: jobSheet.mill,
          sheetSize: jobPaperSize,
          jobSheetQty: jobSheet.jobSheetQty,
          wastage: jobSheet.wastage,
          jobSize: jobSheet.jobSize,
          totalSheet: jobSheet.totalSheet,
          paperCut: jobSheet.paperCut,
          trimWaste: jobSheet.trimWaste,
          sheetQuantity: jobSheet.sheetQuantity,
          frontColours: jobSheet.frontColours,
          backColours: jobSheet.backColours,
          coating: jobSheet.coating,
          foils: jobSheet.foils,
          spotUV: jobSheet.spotUV,
          emboss: jobSheet.emboss,
          corrugation: jobSheet.corrugation,
          nvz: jobSheet.nvz,
          pesting: jobSheet.pesting,
          backToBackPesting: jobSheet.backToBackPesting,
          window: jobSheet.window,
          frontLamination: jobSheet.frontLamination,
          backLamination: jobSheet.backLamination,
          processDetails: jobSheet.processDetails,
          productInformation: jobSheet.productInformation,
          status: 1,
          createdBy: userId,
          updatedBy: userId,
          artWorkDetails : artWorkDetails 
        },
        { upsert: true, new: true, runValidators: true }
      );
      console.log("Job Card created/updated:", jobCardNo);

      // Update JobSheet Flag
      await JobSheetPreparation.findByIdAndUpdate(jobSheetId, {
        jobCardFlag: "done",
        updatedBy: userId,
        updatedAt: new Date(),
      });

      return res.status(200).json({
        success: true,
        message: "Job Card created successfully",
        data: {
          jobCard,
          jobSheetId,
          jobCardNo: jobCardNo.toString(),
        },
      });
    } catch (error) {
      console.error("Error creating job card:", error);
      return res.status(500).json({
        success: false,
        message: "Error creating Job Card.",
        error: error.message,
      });
    }
  }
);

module.exports = JobSheetPreparationRouter;
