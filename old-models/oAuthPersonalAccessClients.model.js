const mongoose = require("mongoose");

const OAuthPersonalAccessClientSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OAuthClient",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OAuthPersonalAccessClient = mongoose.model(
  "OAuthPersonalAccessClient",
  OAuthPersonalAccessClientSchema
);

module.exports = OAuthPersonalAccessClient;
