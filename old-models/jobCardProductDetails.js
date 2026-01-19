const mongoose = require("mongoose");

const JobcardProductDetailsSchema = new mongoose.Schema(
  {
    productName: { type: String, default: null },
    ups: { type: String, default: null },
    quantity: { type: String, default: null },

    artWork: { type: String, default: null }, // Can be changed to ObjectId if referencing a document
    soNo: { type: String, default: null },

    processId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Process",
      default: null,
    },
    jobcardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobcard",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const JobcardProductDetails = mongoose.model(
  "JobcardProductDetails",
  JobcardProductDetailsSchema
);

module.exports = JobcardProductDetails;
