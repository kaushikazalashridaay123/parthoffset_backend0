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
  },
  {
    timestamps: true,
  }
);



const JobCardGenerateSchema = new mongoose.Schema(
  {
    jobCardNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSheetPreparation",
    },
    artWorkDetails: [artWorkDetailsSchema],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    date: {
      type: Date,
    },
    paperType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaperType",
    },
    gsm: {
      type: Number,
    },
    quality: {
      type: String,
    },
    mill: {
      type: String,
    },
    sheetSize: {
      type: String,
    },
    jobSheetQuantity: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "JobSheetPreparation",
      type: Number,
    },
    wastage: {
      type: Number,
    },
    jobSize: {
      type: String,
    },
    totalSheet: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "JobSheetPreparation",
      type: Number,
    },
    paperCut: {
      type: Number,
    },
    trimWaste: {
      type: Number,
    },
    sheetQuantity: {
      type: Number,
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
    frontColours: {
      type: Number,
    },
    backColours: {
      type: Number,
    },
    frontPlates: {
      type: Number,
    },
    backPlates: {
      type: Number,
    },
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
    frontLamination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrderBooking",
    },
    backLamination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrderBooking",
    },
    frontFoils: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSheetPreparation",
    },
    backFoils: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSheetPreparation",
    },
    frontUv: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSheetPreparation",
    },
    backUv: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSheetPreparation",
    },
    emboss: {
      type: String,
    },
    corrugation: {
      type: String,
    },
    nvz: {
      type: String,
    },
    pesting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pesting",
    },
    backToBackPesting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pesting",
    },
    windowPesting: {
      type: String,
    },
    processDetails: {
      type: String,
    },
    jobCardStatus: {
      type: String,
    },
    productInformation: [
      {
        product: { type: String },
        ups: { type: String },
        orderQty: { type: Number },
        artwork: { type: String },
        soNumber: { type: String },
      },
    ],
    status: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const JobCardGenerate = mongoose.model(
  "JobCardGenerate",
  JobCardGenerateSchema
);

module.exports = JobCardGenerate;
