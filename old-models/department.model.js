const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", DepartmentSchema);
