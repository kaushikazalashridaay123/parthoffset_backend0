const mongoose = require("mongoose");
const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
}, {
  timestamps: true,
});

const Designation = mongoose.model("Designation", designationSchema);

module.exports = Designation;
