const mongoose = require("mongoose");

const offsetDieSchema = new mongoose.Schema(
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
    dieType: {
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

const OffsetDie = mongoose.model("OffsetDie", offsetDieSchema);
module.exports = OffsetDie;
