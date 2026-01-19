const mongoose = require("mongoose");

const EmbossBlockSchema = new mongoose.Schema(
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

    totalUps: { type: String, default: null }, // kept as string to match input flexibility
    jobcardNo: { type: String, default: null },
    ref: { type: String, default: null },

    remark: { type: String, default: null }, // longtext in SQL → just a large string in MongoDB

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const EmbossBlock = mongoose.model("EmbossBlock", EmbossBlockSchema);

module.exports = EmbossBlock;
