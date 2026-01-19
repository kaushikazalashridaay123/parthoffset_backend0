const mongoose = require("mongoose");

const CustomersSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, default: null }, // Using String to preserve formatting and leading 0s if any

    email_verified_at: { type: Date, default: null },

    password: { type: String, default: null }, // Should be hashed if used in auth
    userStatus: { type: String, enum: ["0", "1"], default: "1" },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    remember_token: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const Customers = mongoose.model("Customers", CustomersSchema);
module.exports = Customers;
