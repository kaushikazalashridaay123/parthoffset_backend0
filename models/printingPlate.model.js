const mongoose = require("mongoose");

const printingPlateSchema = new mongoose.Schema(
  {
    jobCardNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSheetPreparation",
    },
    salesOrderBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrderBooking",
    },
    designerName: {
      type: String,
    },
    plateType: {
      type: String,
    },
    vendorName: {
      type: String,
    },
    printingPlateMachine: {
      type: String,
    },
    date: {
      type: Date,
    },
    printingFrontSide: {
      colors: {
        c: { type: Boolean, default: false },
        m: { type: Boolean, default: false },
        y: { type: Boolean, default: false },
        k: { type: Boolean, default: false },
        pantone: { type: Boolean, default: false },
      },
      pantoneInkCodes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "InkChemical",
        },
      ],
    },
    noOfFrontPlate: {
      type: Number,
    },
    printingBackSide: {
      colors: {
        c: { type: Boolean, default: false },
        m: { type: Boolean, default: false },
        y: { type: Boolean, default: false },
        k: { type: Boolean, default: false },
        pantone: { type: Boolean, default: false },
      },
      pantoneInkCodes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "InkChemical",
        },
      ],
    },
    noOfBackPlate: {
      type: Number,
    },
    extraPlate: {
      type: Boolean,
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
  { timestamps: true }
);

module.exports = mongoose.model("PrintingPlate", printingPlateSchema);
