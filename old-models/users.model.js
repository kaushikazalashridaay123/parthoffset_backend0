const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    department: { type: String, default: null },
    designation: { type: String, default: null },
    email_verified_at: { type: Date, default: null },
    number: { type: String },
    password: { type: String, required: true },
    userStatus: { type: String, enum: ["0", "1"], default: "1" }, // active/inactive
    profileImage: { type: String, default: null },
    remember_token: { type: String, default: null },
    last_login: { type: String, default: null }, // or use [Date] if storing timestamps array
    deleted_at: { type: Date, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
