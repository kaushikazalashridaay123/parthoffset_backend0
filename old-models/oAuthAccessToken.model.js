const mongoose = require("mongoose");

const OAuthAccessTokenSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OAuthClient", // Replace with your actual client model name
      required: true,
    },
    name: {
      type: String,
      default: null,
    },
    scopes: {
      type: String, // or Array if you use JSON-parsed scopes
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
    _id: false, // Since `id` is provided manually and used as primary
  }
);

const OAuthAccessToken = mongoose.model(
  "OAuthAccessToken",
  OAuthAccessTokenSchema
);

module.exports = OAuthAccessToken;
