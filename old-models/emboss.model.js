const mongoose = require("mongoose");

const EmbossSchema = new mongoose.Schema(
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

    emboss: { type: String, enum: ["Yes", "No"], default: "No" },
    backUps: { type: String, default: null },
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
    embossDesc: { type: String, default: null },
    reference: { type: String, default: null },

    status: { type: String, enum: ["0", "1"], default: "1" }, // 1 = active, 0 = inactive/deleted

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Emboss = mongoose.model("Emboss", EmbossSchema);
module.exports = Emboss;
