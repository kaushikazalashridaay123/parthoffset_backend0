const mongoose = require("mongoose");

const CustomerPasswordResetSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const CustomerPasswordReset = mongoose.model(
  "CustomerPasswordReset",
  CustomerPasswordResetSchema
);

module.exports = CustomerPasswordReset;
