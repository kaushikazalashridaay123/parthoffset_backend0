const mongoose = require("mongoose");

const DeletionLogSchema = new mongoose.Schema({
  module: { type: String, required: true }, // e.g., "Order Received"
  deleted_id: { type: String, required: true }, // ID of the deleted record (stored as string)
  reason: { type: String, required: true },
  deleted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  deleted_at: { type: Date, default: Date.now },
});

const DeletionLog = mongoose.model("DeletionLog", DeletionLogSchema);

module.exports = DeletionLog;
