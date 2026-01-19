const mongoose = require("mongoose");

const companyMailSettingsSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    mailer: { type: String, default: "None" },
    host: { type: String, default: null },
    port: { type: String, default: null },

    encryption: { type: String, default: null }, // e.g. 'ssl', 'tls'
    userName: { type: String, default: null },
    password: { type: String, default: null },

    fromAddress: { type: String, default: null },
    fromName: { type: String, default: null },

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
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const CompanyMailSettings = mongoose.model(
  "CompanyMailSettings",
  companyMailSettingsSchema
);

module.exports = CompanyMailSettings;
