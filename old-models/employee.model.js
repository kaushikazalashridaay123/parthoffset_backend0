const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    department: { type: String, required: true },
    designation: { type: String, default: null }, // or ref to a Designation model if needed

    status: { type: String, enum: ["0", "1"], default: "1" }, // '1' = active, '0' = inactive

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
