const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    cityName: { type: String, required: true },

    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
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

const City = mongoose.model("City", CitySchema);
module.exports = City;
