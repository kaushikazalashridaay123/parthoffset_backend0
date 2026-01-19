const mongoose = require('mongoose');

const coatingPlateSchema = new mongoose.Schema({
    jobCardNo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobSheetPreparation",
    },
    designerName: {
        type: String,
    },
    plateType: {
        type: String,
    },
    vendorName: {
        type: String,
    },
    coatingPlateMachine: {
        type: String,
    },
    date: {
        type: Date,
    },
    noOfPlate: {
        type: Number,
    },
    extraPlate: {
        type: Boolean,
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
}, { timestamps: true });

const CoatingPlate = mongoose.model("CoatingPlate", coatingPlateSchema);

module.exports = CoatingPlate;

