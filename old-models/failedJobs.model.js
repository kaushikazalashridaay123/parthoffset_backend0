const mongoose = require("mongoose");

const FailedJobSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },

  connection: { type: String, required: true },
  queue: { type: String, required: true },

  payload: { type: String, required: true }, // Can be stored as raw JSON string or parsed if needed
  exception: { type: String, required: true }, // Full exception trace or message

  failed_at: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const FailedJob = mongoose.model("FailedJob", FailedJobSchema);

module.exports = FailedJob;
