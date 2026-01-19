const mongoose = require("mongoose");

const PrintingPlateSchema = new mongoose.Schema(
  {
    jobNo: {
      type: String,
      default: null,
    },
    paperSize: {
      type: String,
      default: null,
    },
    printingPlateMachineId: {
      type: Number,
      default: null,
    },
    plateType: {
      type: String,
      default: null,
    },
    vendorId: {
      type: Number, // Use `mongoose.Schema.Types.ObjectId` with `ref` if referencing another model
      default: null,
    },
    designerId: {
      type: Number, // Same note as above
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
    printingColorCode: {
      type: String,
      default: null,
    },
    noofPlate: {
      type: Number,
      default: null,
    },
    reason: {
      type: String,
      default: null,
    },
    extraPlate: {
      type: Number,
      default: null,
    },
    extraPlateColorCode: {
      type: String,
      default: null,
    },
    extraPlateReason: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "1",
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
    versionKey: false,
    timestamps: true,
  }
);

const PrintingPlate = mongoose.model("PrintingPlate", PrintingPlateSchema);

module.exports = PrintingPlate;
