const mongoose = require("mongoose");

const JobCardSchema = new mongoose.Schema(
  {
    category: { type: String },
    date: { type: Date },
    jobNo: { type: String },

    paperId: { type: String },
    gsm: { type: String },
    quality: { type: String, default: null },
    mill: { type: String, default: null },

    sheetSize: { type: String },
    sheetQty: { type: String },
    paperCut: { type: String },
    jobSize: { type: String },
    jobQty: { type: String },
    wastage: { type: String },
    trimWaste: { type: String },

    printingFrontSide: { type: String },
    printingBackend: { type: String },
    frontSideInkChemical: { type: String },
    backSideInkChemical: { type: String },

    totalColourFront: { type: String },
    totalColourFrontBack: { type: String },
    totalPlateFront: { type: String },
    totalPlateFrontBack: { type: String },

    coatingFront: { type: String },
    coatingBack: { type: String },
    laminationFront: { type: String },
    laminationBack: { type: String },

    foilsFront: { type: String },
    foilsBack: { type: String },
    spotUV: { type: String },
    emboss: { type: String },
    corrugation: { type: String, default: null },
    nvz: { type: String },
    pesting: { type: String },
    window: { type: String },
    b2BPesting: { type: String },

    // Cutting process
    cuttingMachine: { type: String, default: null },
    cuttingStartQty: { type: String, default: null },
    cuttingStartDate: { type: Date, default: null },
    cuttingStartTime: { type: String, default: null },
    cuttingEndQty: { type: String, default: null },
    cuttingEndDate: { type: Date, default: null },
    cuttingEndTime: { type: String, default: null },
    cuttingWastage: { type: String, default: null },
    cuttingOperator: { type: String, default: null },

    // Printing process
    printingMachine: { type: String, default: null },
    printingStartQty: { type: String, default: null },
    printingStartDate: { type: Date, default: null },
    printingStartTime: { type: String, default: null },
    printingEndQty: { type: String, default: null },
    printingEndDate: { type: Date, default: null },
    printingEndTime: { type: String, default: null },
    printingWastage: { type: String, default: null },
    printingOperator: { type: String, default: null },

    // Coating process
    coatingMachine: { type: String, default: null },
    coatingStartQty: { type: String, default: null },
    coatingStartDate: { type: Date, default: null },
    coatingStartTime: { type: String, default: null },
    coatingEndQty: { type: String, default: null },
    coatingEndDate: { type: Date, default: null },
    coatingEndTime: { type: String, default: null },
    coatingWastage: { type: String, default: null },
    coatingOperator: { type: String, default: null },

    // Foils process
    foilsMachine: { type: String, default: null },
    foilsStartQty: { type: String, default: null },
    foilsStartDate: { type: Date, default: null },
    foilsStartTime: { type: String, default: null },
    foilsEndQty: { type: String, default: null },
    foilsEndDate: { type: Date, default: null },
    foilsEndTime: { type: String, default: null },
    foilsWastage: { type: String, default: null },
    foilsOperator: { type: String, default: null },

    // Emboss process
    embossMachine: { type: String, default: null },
    embossStartQty: { type: String, default: null },
    embossStartDate: { type: Date, default: null },
    embossStartTime: { type: String, default: null },
    embossEndQty: { type: String, default: null },
    embossEndDate: { type: Date, default: null },
    embossEndTime: { type: String, default: null },
    embossWastage: { type: String, default: null },
    embossOperator: { type: String, default: null },

    // Die cutting
    dieCuttingMachine: { type: String, default: null },
    dieCuttingStartQty: { type: String, default: null },
    dieCuttingStartDate: { type: Date, default: null },
    dieCuttingStartTime: { type: String, default: null },
    dieCuttingEndQty: { type: String, default: null },
    dieCuttingEndDate: { type: Date, default: null },
    dieCuttingEndTime: { type: String, default: null },
    dieCuttingWastage: { type: String, default: null },
    dieCuttingOperator: { type: String, default: null },

    // Pesting
    pestingMachine: { type: String, default: null },
    pestingStartQty: { type: String, default: null },
    pestingStartDate: { type: Date, default: null },
    pestingStartTime: { type: String, default: null },
    pestingEndQty: { type: String, default: null },
    pestingEndDate: { type: Date, default: null },
    pestingEndTime: { type: String, default: null },
    pestingWastage: { type: String, default: null },
    pestingOperator: { type: String, default: null },

    processId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Process",
      default: null,
    },
    jobcardstatus: { type: String, default: "1" },
    status: { type: String, default: "1" },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const JobCard = mongoose.model("Jobcard", JobCardSchema);
module.exports = JobCard;
