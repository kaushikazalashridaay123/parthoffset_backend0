const mongoose = require("mongoose");

const OrderReceiveSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    orderMode: {
      type: String,
      enum: ["Email", "Phone", "Online", "Offline"], // update based on your use case
      required: true,
    },
    poNo: {
      type: String,
      required: true,
    },
    poNoDate: {
      type: Date,
      required: true,
    },
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
    productType: {
      type: String,
      required: true,
    },
    qunatity: {
      type: Number,
      required: true,
    },
    paperId: {
      type: String,
      required: true,
    },
    gsm: {
      type: String,
      required: true,
    },
    noOfBatches: {
      type: Number,
      default: 0,
    },
    deliveryAt: {
      type: String,
      default: null,
    },
    extraNotes: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"], // adjust based on your logic
      default: "Pending",
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

const OrderReceive = mongoose.model("OrderReceive", OrderReceiveSchema);

module.exports = OrderReceive;
