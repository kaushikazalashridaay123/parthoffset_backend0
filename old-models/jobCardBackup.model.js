const mongoose = require("mongoose");

const JobCardBackupSchema = new mongoose.Schema(
  {
    category: String,
    date: Date,
    jobNo: String,

    paperId: String,
    gsm: String,
    quality: String,
    mill: String,

    sheetSize: String,
    sheetQty: String,
    paperCut: String,
    jobSize: String,
    jobQty: String,
    wastage: String,
    trimWaste: String,

    printingFrontSide: String,
    printingBackend: String,
    frontSideInkChemical: String,
    backSideInkChemical: String,

    totalColourFront: String,
    totalColourFrontBack: String,
    totalPlateFront: String,
    totalPlateFrontBack: String,

    coatingFront: String,
    coatingBack: String,
    laminationFront: String,
    laminationBack: String,

    foilsFront: String,
    foilsBack: String,
    spotUV: String,
    emboss: String,
    corrugation: String,
    nvz: String,
    pesting: String,
    window: String,
    b2BPesting: String,

    // Cutting process
    cuttingMachine: String,
    cuttingStartQty: String,
    cuttingStartDate: Date,
    cuttingStartTime: String,
    cuttingEndQty: String,
    cuttingEndDate: Date,
    cuttingEndTime: String,
    cuttingWastage: String,
    cuttingOperator: String,

    // Printing process
    printingMachine: String,
    printingStartQty: String,
    printingStartDate: Date,
    printingStartTime: String,
    printingEndQty: String,
    printingEndDate: Date,
    printingEndTime: String,
    printingWastage: String,
    printingOperator: String,

    // Coating process
    coatingMachine: String,
    coatingStartQty: String,
    coatingStartDate: Date,
    coatingStartTime: String,
    coatingEndQty: String,
    coatingEndDate: Date,
    coatingEndTime: String,
    coatingWastage: String,
    coatingOperator: String,

    // Foiling process
    foilsMachine: String,
    foilsStartQty: String,
    foilsStartDate: Date,
    foilsStartTime: String,
    foilsEndQty: String,
    foilsEndDate: Date,
    foilsEndTime: String,
    foilsWastage: String,
    foilsOperator: String,

    // Embossing process
    embossMachine: String,
    embossStartQty: String,
    embossStartDate: Date,
    embossStartTime: String,
    embossEndQty: String,
    embossEndDate: Date,
    embossEndTime: String,
    embossWastage: String,
    embossOperator: String,

    // Die cutting process
    dieCuttingMachine: String,
    dieCuttingStartQty: String,
    dieCuttingStartDate: Date,
    dieCuttingStartTime: String,
    dieCuttingEndQty: String,
    dieCuttingEndDate: Date,
    dieCuttingEndTime: String,
    dieCuttingWastage: String,
    dieCuttingOperator: String,

    // Pesting process
    pestingMachine: String,
    pestingStartQty: String,
    pestingStartDate: Date,
    pestingStartTime: String,
    pestingEndQty: String,
    pestingEndDate: Date,
    pestingEndTime: String,
    pestingWastage: String,
    pestingOperator: String,

    processId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Process",
      default: null,
    },

    jobcardstatus: {
      type: String,
      default: "1",
    },
    status: {
      type: String,
      default: "1",
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

const JobCardBackup = mongoose.model("JobCardBackup", JobCardBackupSchema);

module.exports = JobCardBackup;
