const mongoose = require("mongoose");

const artWorkBatchSchema = new mongoose.Schema(
  {
    batchName: {
      type: String,
    },
    orderQty: {
      type: Number,
    },
    productionQty: {
      type: Number,
    },
    pendingQty: {
      type: Number,
    },
  },
  {
    _id: false,
  }
);

const artWorkDetailsSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    sobNo: {
      type: String,
    },
    artWorkNo: {
      type: String,
    },
    productName: {
      type: String,
    },
    paper: {
      type: String,
    },
    gsm: {
      type: Number,
    },
    ups: {
      type: Number,
    },
    orderQuantity: {
      type: Number,
    },
    productionQty: {
      type: Number,
    },
    pendingQty: {
      type: Number,
    },
    artWorkBatches: [artWorkBatchSchema],
    printingFrontSide: {
      type: Object,
    },
    frontPantoneInkCode: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InkChemical",
      },
    ],
    printingBackSide: {
      type: Object,
    },
    backPantoneInkCode: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InkChemical",
      },
    ],
    frontCoating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coating",
      },
    ],
    backCoating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coating",
      },
    ],
    frontUv: {
      type: String,
    },
    backUv: {
      type: String,
    },
    frontFoils: {
      type: String,
    },
    frontFoilsDetails: {
      type: String,
    },
    backFoils: {
      type: String,
    },
    backFoilsDetails: {
      type: String,
    },
    emboss: {
      type: String,
    },
    artWorkStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const jobSheetPreparationSchema = new mongoose.Schema(
  {
    jobCardNo: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    paperType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaperType",
    },
    artWork: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ArtWork",
      },
    ],
    jobPaperSize: {
      type: String,
    },
    jobSheetQuantity: {
      type: String,
    },
    frontImage: {
      type: String,
    },
    backImage: {
      type: String,
    },
    artWorkDetails: [artWorkDetailsSchema],
    jobSheetStatus: {
      type: String,
    },
    jobCardFlag: {
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

const JobSheetPreparation = mongoose.model(
  "JobSheetPreparation",
  jobSheetPreparationSchema
);

module.exports = JobSheetPreparation;
