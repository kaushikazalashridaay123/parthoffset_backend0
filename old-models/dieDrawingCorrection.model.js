const mongoose = require("mongoose");

const DieDrawingCorrectionSchema = new mongoose.Schema(
  {
    die_drawing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DieDrawing",
      required: true,
    },

    dateCorrection: { type: Date, required: true },
    timeCorrection: { type: String, default: null }, // Keep as string for time-only value like "12:30:00"

    designerNameCorrection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    revisionCorrection: { type: Number, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const DieDrawingCorrection = mongoose.model(
  "DieDrawingCorrection",
  DieDrawingCorrectionSchema
);

module.exports = DieDrawingCorrection;
