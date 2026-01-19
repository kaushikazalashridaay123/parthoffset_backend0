const mongoose = require("mongoose");

const PlateSchema = new mongoose.Schema(
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
    coatingPlateMachineId: {
      type: Number,
      default: null,
    },
    plateType: {
      type: String,
      default: null,
    },
    vendorId: {
      type: Number,
      default: null,
    },
    designerId: {
      type: Number,
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
    coatingDesignerId: {
      type: Number,
      default: null,
    },
    coatingVendorId: {
      type: String,
      default: null,
    },
    coatingDate: {
      type: String, // Could also be Date if it's in `YYYY-MM-DD` format
      default: null,
    },
    coatingnoofPlate: {
      type: String, // Consider changing to Number if always numeric
      default: null,
    },
    coatingReason: {
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

const Plate = mongoose.model("Plate", PlateSchema);
