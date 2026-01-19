const mongoose = require("mongoose");

const OAuthAuthCodeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OAuthClient", // Replace with your actual OAuth client model
      required: true,
    },
    scopes: {
      type: String, // Or Array if scopes are parsed JSON
      default: null,
    },
    revoked: {
      type: Boolean,
      required: true,
    },
    expires_at: {
      type: Date,
      default: null,
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
    _id: false, // Disable default _id since `id` is used as the primary key
  }
);

const OAuthAuthCode = mongoose.model("OAuthAuthCode", OAuthAuthCodeSchema);

module.exports = OAuthAuthCode;
