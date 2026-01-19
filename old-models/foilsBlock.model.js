const mongoose = require("mongoose");

const FoilsBlockSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    toolCode: { type: String, default: null },
    toolName: { type: String, default: null },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    totalUps: { type: String, default: null },
    jobcardNo: { type: String, default: null },
    ref: { type: String, default: null },

    remark: { type: String, default: null },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const FoilsBlock = mongoose.model("FoilsBlock", FoilsBlockSchema);

module.exports = FoilsBlock;
