const mongoose = require("mongoose");

const ProxyLoginsSchema = new mongoose.Schema(
  {
    proxy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming proxies are users; adjust if there's a separate Proxy model
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    start_at: {
      type: Date,
      default: null,
    },
    expires_at: {
      type: Date,
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
    versionKey: false,
    timestamps: true,
  }
);

const ProxyLogins = mongoose.model("ProxyLogins", ProxyLoginsSchema);

module.exports = ProxyLogins;
