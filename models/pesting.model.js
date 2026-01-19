const mongoose = require("mongoose");

const pestingSchema = new mongoose.Schema(
  {
    name: {
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
  {
    timestamps: true,
  }
);

const Pesting = mongoose.model("Pesting", pestingSchema);

module.exports = Pesting;
