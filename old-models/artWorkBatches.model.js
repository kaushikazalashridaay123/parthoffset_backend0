const mongoose = require("mongoose");

const artWorkBatchesSchema = new mongoose.Schema(
  {
    batches: { type: String, required: true },
    quantity: { type: String, required: true },

    mfgDate: { type: String, required: true },
    expDate: { type: String, required: true },

    pending: { type: String, default: "0" },

    orderReceiveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderReceived",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
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

const ArtWorkBatches = mongoose.model("ArtWorkBatches", artWorkBatchesSchema);
module.exports = ArtWorkBatches;
