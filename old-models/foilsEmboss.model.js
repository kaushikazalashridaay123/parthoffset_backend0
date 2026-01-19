const mongoose = require("mongoose");

const FoilsEmbossSchema = new mongoose.Schema(
  {
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      default: null,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    foilsFront: { type: String, enum: ["Yes", "No", null], default: null },
    foilsBack: { type: String, enum: ["Yes", "No", null], default: null },
    emboss: { type: String, enum: ["Yes", "No", null], default: null },

    frontUps: { type: String, default: null },
    backUps: { type: String, default: null },

    artWorkNewRepeat: {
      type: String,
      enum: ["New", "Repeat", null],
      default: null,
    },

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
    embossDesc: { type: String, default: null },

    status: { type: Number, enum: [0, 1], default: 1 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const FoilsEmboss = mongoose.model("FoilsEmboss", FoilsEmbossSchema);

module.exports = FoilsEmboss;
