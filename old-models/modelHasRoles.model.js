const mongoose = require("mongoose");

const ModelHasRolesSchema = new mongoose.Schema(
  {
    role_id: {
      type: mongoose.Schema.Types.ObjectId, // Assuming this refers to a Role model
      required: true,
      ref: "Role",
    },
    model_type: {
      type: String,
      required: true,
    },
    model_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "model_type", // Dynamic reference based on model_type
    },
  },
  {
    timestamps: true, // No created_at/updated_at present
  }
);

const ModelHasRoles = mongoose.model("ModelHasRoles", ModelHasRolesSchema);

module.exports = ModelHasRoles;
