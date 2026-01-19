const mongoose = require("mongoose");

const ProductBatchesSchema = new mongoose.Schema(
  {
    batches: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    mfgDate: {
      type: String, // Format: "YYYY-MM", can also use Date if exact date is available
      required: true,
    },
    expDate: {
      type: String, // Format: "YYYY-MM"
      required: true,
    },
    batchStatus: {
      type: String, // Can be converted to Boolean or Enum if needed
      default: "1",
    },
    orderReceiveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderReceive",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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
    versionKey: false,
    timestamps: true,
  }
);

const ProductBatches = mongoose.model("ProductBatches", ProductBatchesSchema);

module.exports = ProductBatches;
