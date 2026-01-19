const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendorCode: {
      type: String,
    },
    vendorName: {
      type: String,
    },
    mailingName: { type: String },
    phoneNo: { type: Number },
    officeAddress: { type: String },
    factoryAddress: { type: String },
    address: {
      type: String,
    },
    country: {
      type: Object,
    },
    state: {
      type: Object,
    },
    city: {
      type: Object,
    },
    pincode: {
      type: Number,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    pan: {
      type: String,
    },
    gstNo: {
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
    paymentTerms: {
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

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
