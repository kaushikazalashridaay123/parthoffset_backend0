const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    guard_name: {
      type: String,
      default: "web",
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

const Roles = mongoose.model("Roles", RolesSchema);

module.exports = Roles;
