const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    machineName: {
      type: String,
    },
    plateType: {
      type: String,
    },
    underDepartment: {
      type: String,
    },
    machineSpeed: {
      type: String,
    },
    machineOperator: {
      type: String,
    },
    assistantOperator: {
      type: String,
    },
    gripper: {
      type: String,
    },
    makeReadyTime: {
      type: String,
    },
    jobChangeOverTime: {
      type: String,
    },
    costPerHour: {
      type: String,
    },
    maximumSheetSize: {
      type: String,
    },
    minimumSheetSize: {
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

const Machine = mongoose.model("Machine", machineSchema);
module.exports = Machine;
