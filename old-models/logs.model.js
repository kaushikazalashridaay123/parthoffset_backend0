const mongoose = require("mongoose");

const LogsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    route: {
      type: String,
      required: true,
    },
    routeHitTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Logs = mongoose.model("Logs", LogsSchema);

module.exports = Logs;
