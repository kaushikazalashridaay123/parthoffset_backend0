const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleId: {
      type: Number,
      required: true,
      unique: true,
    },
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        type: String,
      },
    ],
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
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
