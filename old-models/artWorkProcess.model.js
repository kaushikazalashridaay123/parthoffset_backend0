const mongoose = require("mongoose");

const ArtWorkProcessSchema = new mongoose.Schema(
  {
    foilsEmboss: { type: String, default: null },
    foilsEmbossSendforBlockMaking: { type: String, default: null },
    foilsEmboss3VendorId: { type: String, default: null },
    foilsEmbossDate: { type: Date, default: null },
    foilsEmbossDesignerName: { type: String, default: null },

    DieDrawing: { type: String, default: null },
    dieDrawingSendforApproval: { type: String, default: null },
    dieDrawingVendorId: { type: String, default: null },
    dieDrawing1Date: { type: String, default: null },
    dieDrawingDesignerName: { type: String, default: null },
    dieDrawingapprovedBy: { type: String, default: null },
    dieDrawingOperatorId: { type: String, default: null },
    dieDrawing2Date: { type: String, default: null },

    processJobSheet: { type: String, default: null },
    processSendForPlatePrinting: { type: String, default: null },
    processVendorId: { type: String, default: null },
    processDate: { type: String, default: null },
    processDesignerName: { type: String, default: null },

    productId: { type: String, default: null },
    ups: { type: String, default: null },
    quantity: { type: String, default: null },
    status: { type: String, default: "1" },

    artWorkId: { type: String, default: null },
    orderReceivedId: { type: String, default: null },
    foilsEmbossDescription: { type: String, default: null },

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
const ArtWorkProcess = mongoose.model("ArtWorkProcess", ArtWorkProcessSchema);
module.exports = ArtWorkProcess;
