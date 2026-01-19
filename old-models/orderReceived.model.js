const mongoose = require("mongoose");

const OrderReceivedSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    orderMode: {
      type: String,
      enum: ["Email", "Phone", "Online", "Offline"],
      required: true,
    },
    poNo: {
      type: String,
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
    item: {
      type: String,
      required: true,
    },
    qunatity: {
      type: Number,
      required: true,
    },
    paper: {
      type: String,
      default: null,
    },
    gsm: {
      type: String,
      default: null,
    },
    frontSideInkChemical: {
      type: String,
      default: "",
    },
    printingFrontSide: {
      type: String,
      default: "",
    },
    printingBackend: {
      type: String,
      default: null,
    },
    backSideInkChemical: {
      type: String,
      default: "",
    },
    lamination: {
      type: String,
      default: "No",
    },
    backlamination: {
      type: String,
      default: "No",
    },
    coating: {
      type: String,
      default: "No",
    },
    backCoating: {
      type: String,
      default: "No",
    },
    dieCut: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    pesting: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    pestingDetails: {
      type: String,
      default: null,
    },
    backTobackPesting: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    folding: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    extraProcess: {
      type: String,
      default: null,
    },
    bNo: {
      type: String,
      default: null,
    },
    mfgDate: {
      type: Date,
      default: null,
    },
    expDate: {
      type: Date,
      default: null,
    },
    deliveryPlace: {
      type: String,
      default: null,
    },
    extraNotes: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["0", "1"],
      default: "0",
    },
    size: {
      type: String,
      default: null,
    },
    foilsFrontSide: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    foilsBackSide: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    spotUVFrontSide: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    spotUVBackSide: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    emboss: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    boxPesting: {
      type: String,
      default: null,
    },
    cutting: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    windowPesting: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    type: {
      type: String,
      default: null,
    },
    pages: {
      type: Number,
      default: null,
    },
    backpages: {
      type: Number,
      default: null,
    },
    binding: {
      type: String,
      default: null,
    },
    orderReceiveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderReceive",
      required: true,
    },
    artwork: {
      type: String,
      enum: ["New", "Repeat"],
      default: "New",
    },
    rate: {
      type: Number,
      default: 0,
    },
    frontSideFoilDetail: {
      type: String,
      default: null,
    },
    backSideFoilDetail: {
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

const OrderReceived = mongoose.model("OrderReceived", OrderReceivedSchema);

module.exports = OrderReceived;
