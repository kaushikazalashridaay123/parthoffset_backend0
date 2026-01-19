const mongoose = require("mongoose");

const dieDrawingSchema = new mongoose.Schema(
  {
    jobCardNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSheetPreparation",
    },
    designer: {
      type: String,
    },
    mode: {
      type: String,
    },
    reference: {
      type: String,
    },
    sendingDate: {
      type: Date,
    },
    vendorName: {
      type: String,
    },
    sendForApproval: {
      type: Boolean,
    },
    correctionInformation: {
      correctionRequire: {
        type: String,
      },
      information: [
        {
          date: {
            type: Date,
          },
          designerName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          revisionNo: {
            type: Number,
          },
          reason: {
            type: String,
          },
        },
      ],
      markAsFinalRevision: {
        type: Boolean,
        default: false,
      },
      receivedApprovalDate: {
        type: Date,
      },
      receivedDesinerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    status: {
      type: Number,
      required: true,
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
  { timestamps: true }
);

module.exports = mongoose.model("DieDrawing", dieDrawingSchema);
