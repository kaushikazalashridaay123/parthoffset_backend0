const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    orderMode: { type: String, required: true },
    poNo: { type: String, required: true },

    clintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productType: { type: String, required: true },
    paperId: { type: String, required: true },

    salesOrderBookingid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrderBooking",
      required: true,
    },
    gsm: { type: String, required: true },
    quantity: { type: String, required: true },
    pending_qty: { type: String, default: null },

    artwork: { type: String, required: true },
    artworkNo: { type: String, required: true },
    reference: { type: String, default: null },

    sendForApproval: { type: String, required: true },
    correctionDate: { type: Date, default: null },
    correctionTime: { type: String, default: null },
    correctionDesignerName: { type: String, default: null },

    correction2Date: { type: Date, default: null },
    correction2DesignerName: { type: String, default: null },
    correction3Date: { type: Date, default: null },
    correction3DesignerName: { type: String, default: null },

    sendForFinalApproval: { type: String, default: null },
    sendForFinalApprovalDate: { type: Date, default: null },
    sendForFinalApprovalTime: { type: String, default: null },
    sendForFinalApprovalDesignerName: { type: String, default: null },

    receivedApprovalFrom: { type: String, default: null },
    receivedApprovalFromDate: { type: Date, default: null },

    orderReceivedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderReceived",
      required: true,
    },
    extraNotes: { type: String, default: null },

    artWorkStatus: { type: String, required: true },
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

module.exports = mongoose.model("Artwork", ArtworkSchema);
