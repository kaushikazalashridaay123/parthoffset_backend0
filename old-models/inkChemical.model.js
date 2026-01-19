const mongoose = require("mongoose");

const InkChemicalSchema = new mongoose.Schema(
  {
    materialName: { type: String, required: true },
    materialGroupName: { type: String, default: null },
    materialQuality: { type: String, default: null },
    packing: { type: String, default: null },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    unitSymbol: { type: String, default: null },
    density: { type: String, default: null },
    itemCode: { type: String, default: null },

    purchaseRate: { type: Number, default: null },
    purchaseunit: { type: String, default: null },
    estimatedRate: { type: Number, default: null },

    reorderQuantity: { type: Number, default: null },
    minimumStockLevel: { type: Number, default: null },

    productGroupName: { type: String, default: null },
    otherStockCode: { type: String, default: null },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const InkChemical = mongoose.model("InkChemical", InkChemicalSchema);

module.exports = InkChemical;
