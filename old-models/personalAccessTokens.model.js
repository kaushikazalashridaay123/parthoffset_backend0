const mongoose = require("mongoose");

const PersonalAccessTokensSchema = new mongoose.Schema(
  {
    tokenable: {
      type: String, // Or a reference to a model, depending on usage
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    abilities: {
      type: String, // or [String] if it's a list of abilities
      default: null,
    },
    last_used_at: {
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
    versionKey: false,
    timestamps: true,
  }
);

const PersonalAccessTokens = mongoose.model(
  "PersonalAccessTokens",
  PersonalAccessTokensSchema
);

module.exports = PersonalAccessTokens;
