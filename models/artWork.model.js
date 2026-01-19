const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  mfgDate: {
    type: Date,
    required: true,
  },
  expDate: {
    type: Date,
    required: true,
  },
});

const artWorkSchema = new mongoose.Schema(
  {
    artWorkNo: {
      type: String,
    },
    sobNo: {
      type: String,
    },
    date: {
      type: Date,
    },
    orderMode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderMode",
    },
    poNo: {
      type: String,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    paperType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaperType",
    },
    gsm: {
      type: Number,
    },
    totalQuantity: {
      type: Number,
    },
    artWork: {
      type: String,
    },
    artWorkNumber: {
      type: String,
    },
    reference: {
      type: String,
    },
    batches: [batchSchema],
    sendForApproval: {
      status: {
        type: String,
      },
      date: {
        type: Date,
      },
      designerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    correctionInformation: {
      correctionRequire: {
        type: String,
      },
      information: [
        {
          date: {
            type: Date,
          },
          designerName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          revisionNo: {
            type: Number,
          },
          reason: {
            type: String,
          },
        },
      ],
      markAsFinalRevision: {
        type: Boolean,
        default: false,
      },
      receivedApprovalDate: {
        type: Date,
      },
      receivedDesinerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    extraNotes: {
      type: String,
    },
    artWorkStatus: {
      type: String,
    },
    salesOrderBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrderBooking",
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

const ArtWork = mongoose.model("ArtWork", artWorkSchema);
module.exports = ArtWork;