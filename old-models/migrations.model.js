const mongoose = require("mongoose");

const MigrationsSchema = new mongoose.Schema(
  {
    migration: {
      type: String,
      required: true,
    },
    batch: {
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
    timestamps: true, // No createdAt or updatedAt fields
  }
);

const Migrations = mongoose.model("Migrations", MigrationsSchema);

module.exports = Migrations;
