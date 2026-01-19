const mongoose = require("mongoose");

// Helper function to safely convert "MM/YYYY" to Date
function parseMonthYear(value) {
  if (!value || typeof value !== "string") return undefined;

  const [mm, yyyy] = value.split("/").map(Number);
  if (!mm || !yyyy || mm < 1 || mm > 12) return undefined;

  return new Date(yyyy, mm - 1, 1); // first day of the month
}

const batchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  mfgDate: {
    type: Date,
    required: true,
  },
  expDate: {
    type: Date,
    required: true,
  },
});

const orderReceivedSchema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
    },
    date: {
      type: Date,
    },
    orderMode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderMode",
    },
    poNo: {
      type: String,
    },
    poDate: {
      type: Date,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    paperType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaperType",
    },
    gsm: {
      type: Number,
    },
    noOfBatches: {
      type: Number,
    },
    batches: [batchSchema],
    deliveryAt: {
      type: String,
    },
    deliveryAtAddress: {
      type: String,
    },
    totalQuantity: {
      type: Number,
    },
    extraNotes: {
      type: String,
    },
    orderReceivedStatus: {
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

const OrderReceived = mongoose.model("OrderReceived", orderReceivedSchema);

module.exports = OrderReceived;
