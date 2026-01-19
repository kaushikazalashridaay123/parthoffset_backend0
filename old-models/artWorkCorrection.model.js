const mongoose = require("mongoose");

const artWorkCorrectionSchema = new mongoose.Schema(
  {
    dateCorrection: {
      type: Date,
      required: true,
    },
    timeCorrection: {
      type: String,
      required: true,
    },
    designerNameCorrection: {
      type: String,
      required: true,
    },
    revisionCorrection: {
      type: String,
      default: null,
    },
    artWorkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
    salesOrderBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrderBooking",
      required: true,
    },
    orderReceivedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderReceived",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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

const ArtWorkCorrection = mongoose.model(
  "ArtWorkCorrection",
  artWorkCorrectionSchema
);

module.exports = ArtWorkCorrection;
