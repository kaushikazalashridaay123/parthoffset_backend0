const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    contact_person: { type: String },
    gst: { type: String },
    pan: { type: String },
    companyEmail: { type: String },
    companyPhone: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    country: { type: String }, // Or mongoose.Schema.Types.ObjectId if referencing
    state: { type: String },
    city: { type: String },
    pincode: { type: String },
    companySmallLogo: { type: String, default: null },
    companyLogo: { type: String, default: null },
    companyFavicon: { type: String, default: null },
    primaryColor: { type: String },
    primaryFont: { type: String },
    secondaryColor: { type: String },
    secondaryFont: { type: String },
    hovorColor: { type: String },
    contact_person_mobile: { type: String },
    contact_person_email: { type: String },
    contact_person_username: { type: String },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Setting = mongoose.model("Setting", SettingSchema);

module.exports = Setting;
