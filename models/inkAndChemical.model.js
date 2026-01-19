const mongoose = require("mongoose");

const inkAndChemicalSchema = new mongoose.Schema(
  {
    materialName: {
      type: String,
    },
    materialGroupName: {
      type: String,
    },
    materialQuality: {
      type: String,
    },
    packing: {
      type: String,
    },
    unitSymbol: {
      type: String,
    },
    supplierName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    density: {
      type: String,
    },
    itemCode: {
      type: String,
    },
    purchaseRate: {
      type: String,
    },
    purchaseUnit: {
      type: String,
    },
    estimatedRate: {
      type: String,
    },
    reOrderQuantity: {
      type: String,
    },
    minimumStockLevel: {
      type: String,
    },
    productGroupName: {
      type: String,
    },
    otherStockCode: {
      type: String,
    },
    status: {
      type: Number,
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

const InkAndChemical = mongoose.model("InkAndChemical", inkAndChemicalSchema);

module.exports = InkAndChemical;
