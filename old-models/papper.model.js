const mongoose = require("mongoose");

const PapperSchema = new mongoose.Schema(
  {
    quality: {
      type: String,
      default: null,
    },
    gsm: {
      type: String,
      default: null,
    },
    mill: {
      type: String,
      default: null,
    },
    finish: {
      type: String,
      default: null,
    },
    sizeW: {
      type: String,
      default: null,
    },
    sizeL: {
      type: String,
      default: null,
    },
    caliper: {
      type: String,
      default: null,
    },
    packing: {
      type: String,
      default: null,
    },
    unitPerPacking: {
      type: String,
      default: null,
    },
    purchaseRate: {
      type: String,
      default: null,
    },
    purchaseRateType: {
      type: String,
      default: null,
    },
    rateToCharge: {
      type: String,
      default: null,
    },
    rateType: {
      type: String,
      default: null,
    },
    otherStockCode: {
      type: String,
      default: null,
    },
    reOrderQty: {
      type: String,
      default: null,
    },
    isStandardPaper: {
      type: String,
      default: null,
    },
    minimumStockLevel: {
      type: String,
      default: null,
    },
    productGroupName: {
      type: String,
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

const Papper = mongoose.model("Papper", PapperSchema);

module.exports = Papper;
