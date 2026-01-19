const mongoose = require("mongoose");

const LoginLogoutLogsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Replace with actual user model if named differently
      required: true,
    },
    action: {
      type: String, // e.g., "Login", "Logout"
      required: true,
    },
    type: {
      type: String, // e.g., "Super Admin", "Employee"
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LoginLogoutLogs = mongoose.model(
  "LoginLogoutLogs",
  LoginLogoutLogsSchema
);

module.exports = LoginLogoutLogs;
