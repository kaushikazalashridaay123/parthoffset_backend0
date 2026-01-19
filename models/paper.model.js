const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema(
  {
    quality: {
      type: String,
    },
    gsm: {
      type: Number,
    },
    mill: {
      type: String,
    },
    finish: {
      type: String,
    },
    sizeWidth: {
      type: String,
    },
    sizeLength: {
      type: String,
    },
    caliper: {
      type: String,
    },
    packing: {
      type: String,
    },
    unitPerPacking: {
      type: String,
    },
    purchaseRate: {
      type: String,
    },
    purchaseRateType: {
      type: String,
    },
    rateToCharge: {
      type: String,
    },
    otherStockCode: {
      type: String,
    },
    reOrderQty: {
      type: String,
    },
    isStandardPaper: {
      type: String,
    },
    minimumStockLevel: {
      type: String,
    },
    productGroupName: {
      type: String,
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
  {
    timestamps: true,
  }
);

const Paper = mongoose.model("Paper", paperSchema);
module.exports = Paper;
