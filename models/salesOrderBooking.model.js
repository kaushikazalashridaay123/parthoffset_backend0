const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  mfgDate: {
    type: Date,
    required: true,
  },
  expDate: {
    type: Date,
    required: true,
  },
});

const salesOrderBookingSchema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
    },
    sobNo: {
      type: String,
    },
    date: {
      type: Date,
    },
    orderMode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderMode",
    },
    poNo: {
      type: String,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    gsm: {
      type: Number,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    totalQuantity: {
      type: Number,
    },
    paperType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaperType",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    artWork: {
      type: String,
    },
    rate: {
      type: Number,
    },
    sizeInMm: {
      type: String,
    },
    type: {
      type: String,
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
    frontCoating: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coating",
    }],
    frontLamination: {
      type: String,
    },
    foilsFrontSide: {
      type: String,
    },
    spotUvFrontSide: {
      type: String,
    },
    frontPages: {
      type: String,
    },
    foilsFrontSideDetails: {
      type: String,
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
    backCoating: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coating",
    }],
    backLamination: {
      type: String,
    },
    foilsBackSide: {
      type: String,
    },
    spotUvBackSide: {
      type: String,
    },
    backPages: {
      type: String,
    },
    foilsBackSideDetails: {
      type: String,
    },
    dieCut: {
      type: String,
    },
    emboss: {
      type: String,
    },
    cutting: {
      type: String,
    },
    folding: {
      type: String,
    },
    binding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Binding",
    },
    pesting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pesting",
    },
    backToBackPesting: {
      type: String,
    },
    windowPesting: {
      type: String,
    },
    deliveryAt: {
      type: String,
    },
    deliveryAtAddress: {
      type: String,
    },
    extraNotes: {
      type: String,
    },
    salesOrderBookingStatus: {
      type: String,
    },
    batches: [batchSchema],
    orderReceivedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderReceived",
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

const SalesOrderBooking = mongoose.model(
  "SalesOrderBooking",
  salesOrderBookingSchema
);

module.exports = SalesOrderBooking;
