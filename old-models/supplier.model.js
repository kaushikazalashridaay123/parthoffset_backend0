const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mailingName: { type: String },
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },
    cityId: { type: String }, // or ObjectId if referencing City model
    stateId: { type: String }, // or ObjectId if referencing State model
    contryId: { type: String }, // Typo retained from original data, should be `countryId`
    pincode: { type: String },
    phoneNo: { type: String },
    email: { type: String },
    website: { type: String },
    fax: { type: String },
    pan: { type: String },
    gstNo: { type: String },
    concernPersonName: { type: String },
    concernPersonPhoneNo: { type: String },
    concernPersonEmail: { type: String },
    stateTinNo: { type: String },
    paymentTerms: { type: String },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", SupplierSchema);
module.exports = Supplier;
