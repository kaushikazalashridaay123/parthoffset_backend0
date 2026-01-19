const mongoose = require("mongoose");

const OAuthClientSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      default: null,
    },
    redirect: {
      type: String, // or type: [String] if you're storing multiple redirects
      required: true,
    },
    personal_access_client: {
      type: Boolean,
      required: true,
    },
    password_client: {
      type: Boolean,
      required: true,
    },
    revoked: {
      type: Boolean,
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

const OAuthClient = mongoose.model("OAuthClient", OAuthClientSchema);

module.exports = OAuthClient;
