const mongoose = require("mongoose");

const bindingSchema = new mongoose.Schema({
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
  }
},{
    timestamps: true,
});

const Binding = mongoose.model("Binding", bindingSchema);
module.exports = Binding;