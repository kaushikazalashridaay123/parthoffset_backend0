const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema(
  {
    countryName: { type: String, required: true },
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

const Country = mongoose.model("Country", CountrySchema);
module.exports = Country;
