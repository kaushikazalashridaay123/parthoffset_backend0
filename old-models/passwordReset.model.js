const mongoose = require("mongoose");

const PasswordResetSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false, // Because created_at is manually managed
  }
);

const PasswordReset = mongoose.model("PasswordReset", PasswordResetSchema);

module.exports = PasswordReset;
