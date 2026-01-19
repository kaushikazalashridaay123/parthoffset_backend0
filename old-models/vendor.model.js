const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mailingName: { type: String, default: null },
    address1: { type: String, default: null },
    address2: { type: String, default: null },
    address3: { type: String, default: null },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      default: null,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      default: null,
    },
    contryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      default: null,
    },
    pincode: { type: String, default: null },
    phoneNo: { type: String, default: null },
    email: { type: String, default: null },
    website: { type: String, default: null },
    fax: { type: String, default: null },
    pan: { type: String, default: null },
    gstNo: { type: String, default: null },
    concernPersonName: { type: String, default: null },
    concernPersonPhoneNo: { type: String, default: null },
    concernPersonEmail: { type: String, default: null },
    stateTinNo: { type: String, default: null },
    paymentTerms: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;
