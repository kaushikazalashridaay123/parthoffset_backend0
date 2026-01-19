const mongoose = require("mongoose");

const ModelHasPermissionsSchema = new mongoose.Schema(
  {
    permission_id: {
      type: mongoose.Schema.Types.ObjectId, // assuming `permission_id` refers to a document in the permissions collection
      required: true,
      ref: "Permission",
    },
    model_type: {
      type: String,
      required: true,
    },
    model_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "model_type", // dynamically references the model based on model_type
    },
  },
  {
    timestamps: true, // since created_at / updated_at are not in the SQL table
  }
);

const ModelHasPermissions = mongoose.model(
  "ModelHasPermissions",
  ModelHasPermissionsSchema
);

module.exports = ModelHasPermissions;
