const mongoose = require("mongoose");

const FoilsSchema = new mongoose.Schema(
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
        foilsFront: {
            type: String,
        },
        foilsBack: {
            type: String,
        },
        vendorName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
        },
        designerName: {
            type: String,
        },
        upsFoils: {
            type: String,
        },
        date: {
            type: Date,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        foilsFrontDesc: {
            type: String,
        },
        foilsBackDesc: {
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

const Foils = mongoose.model("Foils", FoilsSchema);

module.exports = Foils;
