const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema(
  {
    machineName: {
      type: String,
      required: true,
    },
    plateType: {
      type: String,
      default: null,
    },
    underDepartment: {
      type: String,
      default: null,
    },
    machineSpeed: {
      type: String,
      default: null,
    },
    machineOperator: {
      type: String,
      default: null,
    },
    maximumSheetSize: {
      type: String,
      default: null,
    },
    minimumSheetSize: {
      type: String,
      default: null,
    },
    assOperator: {
      type: String,
      default: null,
    },
    gripper: {
      type: String,
      default: null,
    },
    makeReadyTime: {
      type: String,
      default: null,
    },
    jobChangeOverTime: {
      type: String,
      default: null,
    },
    costPerHour: {
      type: String,
      default: null,
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

const Machine = mongoose.model("Machine", MachineSchema);

module.exports = Machine;
