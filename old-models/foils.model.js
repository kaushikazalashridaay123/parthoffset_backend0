const mongoose = require("mongoose");

const FoilsSchema = new mongoose.Schema(
  {
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
    artWorkNewRepeat: { type: String, enum: ["New", "Repeat"], required: true },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    foilsFront: { type: String, enum: ["Yes", "No"], default: "No" },
    foilsBack: { type: String, enum: ["Yes", "No"], default: "No" },

    frontUps: { type: String, default: null },
    blockMaking: { type: String, default: null },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    },
    date: { type: Date, default: null },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    foilsFrontDesc: { type: String, default: null },
    foilsBackDesc: { type: String, default: null },
    reference: { type: String, default: null },

    status: { type: String, enum: ["0", "1"], default: "1" }, // '1' = active, '0' = inactive

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Foils = mongoose.model("Foils", FoilsSchema);
module.exports = Foils;