const mongoose = require("mongoose");

const deleteLogsSchema = new mongoose.Schema(
    {
        modulename: {
            type: String,
            required: true, // Required since we need to know which module was deleted
            trim: true,
        },
        reason: {
            type: String,
            default: null,
            trim: true,
        },
        deletedId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: Number,
            default: 1
        },
        date: {                 
            type: Date,
            default: Date.now,       
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const DeleteLog = mongoose.model("DeleteLog", deleteLogsSchema);
module.exports = DeleteLog; 
