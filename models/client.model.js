const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
    },
    mailingName: {
      type: String,
    },
    companyNumber: {
      type: Number,
    },
    officeAddress: {
      type: String,
    },
    officeCountry: {
      type: Object,
    },
    officeState: {
      type: Object,
    },
    officeCity: {
      type: Object,
    },
    officeDist: {
      type: String,
    },
    officePincode: {
      type: Number,
    },
    factoryAddress: {
      type: String,
    },
    factoryCountry: {
      type: Object,
    },
    factoryState: {
      type: Object,
    },
    factoryCity: {
      type: Object,
    },
    factoryDist: {
      type: String,
    },
    factoryPincode: {
      type: Number,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    profit: {
      type: String,
    },
    pan: {
      type: String,
    },
    gstNo: {
      type: String,
    },
    paperProfitMargin: {
      type: String,
    },
    concernPersonName: {
      type: String,
    },
    concernPersonPhoneNo: {
      type: Number,
    },
    concernPersonEmail: {
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

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
