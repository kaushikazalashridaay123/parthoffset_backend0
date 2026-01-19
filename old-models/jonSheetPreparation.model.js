const mongoose = require("mongoose");

const JobSheetPreparationSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    artWorkNo: { type: String, required: true },
    jobcard_no: { type: String, required: true },

    paperSize: { type: String, default: null },
    sheetQuantity: { type: String, default: null },
    paperType: { type: String, default: null },
    gsm: { type: String, default: null },

    category: { type: String, default: null },
    paper: { type: String, default: null },

    sheet_qty: { type: String, default: null },
    prod_qty: { type: String, default: null },
    pend_qty: { type: String, default: null },
    ups: { type: String, default: null },

    image: { type: String, default: null },
    bimage: { type: String, default: null },

    printingFrontSide: { type: String, default: null },
    printingBackend: { type: String, default: null },

    frontSideInkChemical: { type: String, default: null },
    backSideInkChemical: { type: String, default: null },

    frontSideFoilDetail: { type: String, default: null },
    backSideFoilDetail: { type: String, default: null },

    spotUVBackSide: { type: String, enum: ["Yes", "No"], default: "No" },
    coating: { type: String, default: null },
    backCoating: { type: String, default: null },

    uv: { type: String, enum: ["Yes", "No"], default: "No" },
    emboss: { type: String, enum: ["Yes", "No"], default: "No" },

    color: { type: String, default: null },

    status: { type: String, enum: ["0", "1"], default: "0" },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const JobSheetPreparation = mongoose.model(
  "JobSheetPreparation",
  JobSheetPreparationSchema
);

module.exports = JobSheetPreparation;
