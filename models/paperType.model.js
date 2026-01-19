const mongoose = require("mongoose");

const paperTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status:{
      type: Number,
      required: true
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

const PaperType = mongoose.model("PaperType", paperTypeSchema);

module.exports = PaperType;
