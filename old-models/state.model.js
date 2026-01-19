const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema(
  {
    stateName: { type: String, required: true },
    countryId: { type: String, required: true }, // If referencing a Country model, use ObjectId
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const State = mongoose.model("State", StateSchema);
module.exports = State;
