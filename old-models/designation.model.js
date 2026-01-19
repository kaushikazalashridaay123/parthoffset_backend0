const mongoose = require("mongoose");

const DesignationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Designation = mongoose.model("Designation", DesignationSchema);

module.exports = Designation;
