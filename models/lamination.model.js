const mongoose = require("mongoose");

const laminationSchema = new mongoose.Schema(
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

const Lamination = mongoose.model("Lamination", laminationSchema);

module.exports = Lamination;
