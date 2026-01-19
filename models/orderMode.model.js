const mongoose = require("mongoose");

const orderModeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status:{
      type: Number,
      required: true
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

const OrderMode = mongoose.model("OrderMode", orderModeSchema);

module.exports = OrderMode;
