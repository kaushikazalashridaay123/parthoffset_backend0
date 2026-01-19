// const generateCrudRoutes = require("mongoose-crud-generator");
// const JobCardGenerate = require("../../models/jobCardGenerate.model");
// const JobSheetPreparation = require("../../models/jobSheetPreparation.model");
// const checkPermission = require("../../middlewares/checkPermission");
// const createDeleteLog = require("../../utils/createDeleteLog");

// const JobCardGenerateRouter = generateCrudRoutes({
//   model: JobCardGenerate,
//   modelName: "JobCardGenerate",
//   middlewareOptions: {
//     beforeCreate: (req, res, next) => {
//       checkPermission("jobcardgenerate_create")(req, res, next);
//     },
//     beforeGetAll: (req, res, next) => {
//       checkPermission("jobcardgenerate_read")(req, res, next);
//     },
//     beforeGetById: (req, res, next) => {
//       checkPermission("jobcardgenerate_read")(req, res, next);
//     },
//     beforeUpdate: (req, res, next) => {
//       checkPermission("jobcardgenerate_update")(req, res, next);
//     },
//     beforeSoftDelete: (req, res, next) => {
//       checkPermission("jobcardgenerate_delete")(req, res, next);
//     },
//   },
//   preHooksOptions: {
//     create: async (req, res, next) => {
//       try {
//         req.body.createdBy = req.user;
//         req.body.updatedBy = req.user;

//         if (req.body.printingFront === "Yes") req.body.printingFront = true;
//         else if (req.body.printingFront === "No")
//           req.body.printingFront = false;

//         if (req.body.printingBack === "Yes") req.body.printingBack = true;
//         else if (req.body.printingBack === "No") req.body.printingBack = false;

//         if (req.body.jobSheetQty && req.body.wastage) {
//           req.body.totalSheet =
//             Number(req.body.jobSheetQty) + Number(req.body.wastage);
//         }

//         if (req.body.totalSheet && req.body.paperCut) {
//           req.body.sheetQuantity = Math.ceil(
//             Number(req.body.totalSheet) / Number(req.body.paperCut)
//           );
//         }
//       } catch (error) {
//         console.error("Error in JobCardGenerate create hook:", error);
//         return res
//           .status(500)
//           .json({ message: "Error creating JobCardGenerate." });
//       }
//     },
//     update: async (req, res, next) => {
//       try {
//         req.body.updatedBy = req.user;

//         if (req.body.printingFront === "Yes") req.body.printingFront = true;
//         else if (req.body.printingFront === "No")
//           req.body.printingFront = false;

//         if (req.body.printingBack === "Yes") req.body.printingBack = true;
//         else if (req.body.printingBack === "No") req.body.printingBack = false;

//         if (req.body.jobSheetQty && req.body.wastage) {
//           req.body.totalSheet =
//             Number(req.body.jobSheetQty) + Number(req.body.wastage);
//         }

//         if (req.body.totalSheet && req.body.paperCut) {
//           req.body.sheetQuantity = Math.ceil(
//             Number(req.body.totalSheet) / Number(req.body.paperCut)
//           );
//         }
//       } catch (error) {
//         console.error("Error in JobCardGenerate update hook:", error);
//         return res
//           .status(500)
//           .json({ message: "Error updating JobCardGenerate." });
//       }
//     },
//   },

//   postHooksOptions: {
//     softDelete: async (req, res, response) => {
//       try {
//         console.log("JobCardGenerate soft delete triggered");

//         const { reason } = req.query;
//         const deletedId = response?.data?._id || response?._id;
//         response.message = "JobCardGenerat deleted successfully.";

//         if (!deletedId) {
//           console.warn("No deleted JobCard ID found in response");
//           return;
//         }

//         // Create delete log
//         await createDeleteLog({
//           modulename: "JobCardGenerate",
//           reason,
//           deletedId,
//           userId: req.user,
//         });

//         // Fetch deleted job card details
//         const deletedJobCard = await JobCardGenerate.findById(deletedId);
//         if (!deletedJobCard) {
//           console.warn("Deleted JobCard not found in DB");
//           return;
//         }

//         // Find related JobSheetPreparation
//         const relatedJobSheet = await JobSheetPreparation.findOne({
//           _id: deletedJobCard.jobCardNo,
//         });

//         if (!relatedJobSheet) {
//           console.warn(
//             "No related JobSheetPreparation found for JobCard:",
//             deletedJobCard.jobCardNo
//           );
//           return;
//         }

//         // ✅ Set its status and flag to pending
//         await JobSheetPreparation.findByIdAndUpdate(
//           relatedJobSheet._id,
//           {
//             jobSheetStatus: "pending",
//             jobCardFlag: "pending",
//             updatedBy: req.user,
//             updatedAt: new Date(),
//           },
//           { new: true }
//         );

//         console.log(
//           `✅ JobSheetPreparation ${relatedJobSheet._id} set to "pending" (status + flag)`
//         );
//       } catch (err) {
//         console.error("Error in JobCardGenerate soft delete hook:", err);
//       }
//     },
//   },
// });

// module.exports = JobCardGenerateRouter;

const generateCrudRoutes = require("mongoose-crud-generator");
const JobCardGenerate = require("../../models/jobCardGenerate.model");
const JobSheetPreparation = require("../../models/jobSheetPreparation.model");
const checkPermission = require("../../middlewares/checkPermission");
const createDeleteLog = require("../../utils/createDeleteLog");

const JobCardGenerateRouter = generateCrudRoutes({
  model: JobCardGenerate,
  modelName: "JobCardGenerate",

  middlewareOptions: {
    beforeCreate: (req, res, next) => {
      checkPermission("jobcardgenerate_create")(req, res, next);
    },
    beforeGetAll: (req, res, next) => {
      checkPermission("jobcardgenerate_read")(req, res, next);
    },
    beforeGetById: (req, res, next) => {
      checkPermission("jobcardgenerate_read")(req, res, next);
    },
    beforeUpdate: (req, res, next) => {
      checkPermission("jobcardgenerate_update")(req, res, next);
    },
    beforeSoftDelete: (req, res, next) => {
      checkPermission("jobcardgenerate_delete")(req, res, next);
    },
  },

  preHooksOptions: {
    create: async (req, res, next) => {
      try {
        req.body.createdBy = req.user;
        req.body.updatedBy = req.user;

        req.body.printingFront = req.body.printingFront === "Yes";
        req.body.printingBack = req.body.printingBack === "Yes";

        if (req.body.productInformation) {
          if (typeof req.body.productInformation === "string") {
            try {
              req.body.productInformation = JSON.parse(
                req.body.productInformation
              );
            } catch (err) {
              console.log("Invalid productInformation format");
            }
          }
        }

        if (req.body.jobSheetQty && req.body.wastage) {
          req.body.totalSheet =
            Number(req.body.jobSheetQty) + Number(req.body.wastage);
        }

        if (req.body.totalSheet && req.body.paperCut) {
          req.body.sheetQuantity = Math.ceil(
            Number(req.body.totalSheet) / Number(req.body.paperCut)
          );
        }
      } catch (error) {
        console.error("Error in JobCardGenerate create hook:", error);
        return res
          .status(500)
          .json({ message: "Error creating JobCardGenerate." });
      }
    },

    update: async (req, res, next) => {
      try {
        req.body.updatedBy = req.user;

        req.body.printingFront = req.body.printingFront === "Yes";
        req.body.printingBack = req.body.printingBack === "Yes";

        if (req.body.productInformation) {
          if (typeof req.body.productInformation === "string") {
            try {
              req.body.productInformation = JSON.parse(
                req.body.productInformation
              );
            } catch (err) {
              console.log("Invalid productInformation format");
            }
          }
        }

        if (req.body.jobSheetQty && req.body.wastage) {
          req.body.totalSheet =
            Number(req.body.jobSheetQty) + Number(req.body.wastage);
        }

        if (req.body.totalSheet && req.body.paperCut) {
          req.body.sheetQuantity = Math.ceil(
            Number(req.body.totalSheet) / Number(req.body.paperCut)
          );
        }
      } catch (error) {
        console.error("Error in JobCardGenerate update hook:", error);
        return res
          .status(500)
          .json({ message: "Error updating JobCardGenerate." });
      }
    },
  },

  postHooksOptions: {
    softDelete: async (req, res, response) => {
      try {
        console.log("JobCardGenerate soft delete triggered");

        const { reason } = req.query;
        const deletedId = response?.data?._id || response?._id;
        response.message = "JobCardGenerate deleted successfully.";

        if (!deletedId) {
          console.warn("No deleted JobCard ID found in response");
          return;
        }

        await createDeleteLog({
          modulename: "JobCardGenerate",
          reason,
          deletedId,
          userId: req.user,
        });

        const deletedJobCard = await JobCardGenerate.findById(deletedId);
        if (!deletedJobCard) return;

        const relatedJobSheet = await JobSheetPreparation.findOne({
          _id: deletedJobCard.jobCardNo,
        });

        if (!relatedJobSheet) return;

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
          `JobSheetPreparation ${relatedJobSheet._id} set to pending`
        );
      } catch (err) {
        console.error("Error in JobCardGenerate soft delete hook:", err);
      }
    },
  },
});

module.exports = JobCardGenerateRouter;
