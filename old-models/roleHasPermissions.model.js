const mongoose = require("mongoose");

const RoleHasPermissionsSchema = new mongoose.Schema(
  {
    permission_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
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
    versionKey: false,
    timestamps: true,
  }
);

const RoleHasPermissions = mongoose.model(
  "RoleHasPermissions",
  RoleHasPermissionsSchema
);

module.exports = RoleHasPermissions;
