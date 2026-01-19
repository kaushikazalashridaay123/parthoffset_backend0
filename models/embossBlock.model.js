const mongoose = require("mongoose");

const embossBlockSchema = new mongoose.Schema(
  {
    clientName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    toolCode: {
      type: String,
    },
    toolName: {
      type: String,
    },
    vendorName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    totalUps: {
      type: String,
    },
    jobCardNo: {
      type: String,
    },
    ref: {
      type: String,
    },
    remark: {
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
  { timestamps: true }
);

const EmbossBlock = mongoose.model("EmbossBlock", embossBlockSchema);
module.exports = EmbossBlock;
