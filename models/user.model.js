const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    userName: {
      type: String,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
    },
    number: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    profileImage: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    tokenVersion: {
      type: Number,
      required: true,
      default: 1,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    extraPermissions: [
      {
        type: String,
      },
    ],
    revokedPermissions: [
      {
        type: String,
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
