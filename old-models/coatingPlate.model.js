const mongoose = require("mongoose");

const CoatingPlateSchema = new mongoose.Schema(
  {
    jobNo: { type: String, required: true },
    paperSize: { type: String, required: true },

    coatingPlateMachineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
    },
    plateType: { type: String, required: true },

    status: { type: String, default: "0" },

    coatingDesignerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    coatingVendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    },

    coatingDate: { type: Date, default: null },
    coatingnoofPlate: { type: String, default: null },
    coatingReason: { type: String, default: null },

    extraPlate: { type: String, default: null }, // e.g. 'yes'/'no'
    extraPlateColorCode: { type: String, default: null },
    extraPlateReason: { type: String, default: null },

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

const CoatingPlate = mongoose.model("CoatingPlate", CoatingPlateSchema);
module.exports = CoatingPlate;
