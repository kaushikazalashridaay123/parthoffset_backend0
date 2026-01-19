const mongoose = require("mongoose");

const EmbossSchema = new mongoose.Schema(
    {
        artWorkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ArtWork",
        },
        mode: {
            type: String,
        },
        sendForBlockMaking: {
            type: Boolean,
        },
        reference: {
            type: String,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        emboss: {
            type: String,
        },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
        },
        vendorName: {
            type: String,
        },
        upsEmboss: {
            type: String,
        },
        designerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        designerName: {
            type: String,
        },
        date: {
            type: Date,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        sendForBlock: {
            type: String,
        },
        embossDesc: {
            type: String,
        },
        status: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Emboss = mongoose.model("Emboss", EmbossSchema);

module.exports = Emboss;
