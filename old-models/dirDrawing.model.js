const mongoose = require('mongoose');

const DieDrawingSchema = new mongoose.Schema({
  jobNo: { type: String, required: true },
  ddNewRepeat: { type: String, default: null },       // e.g., 'New' or 'Repeat'
  reference: { type: String, default: null },

  paperSize: { type: String, required: true },

  designerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', default: null },

  sendingDate: { type: Date, default: null },
  receivingDate: { type: Date, default: null },
  approveDate: { type: Date, default: null },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

  flag: { type: String, default: null },
  status: { type: String, default: '1' },

  sendForApproval: { type: String, default: null },

  correctionDate: { type: Date, default: null },
  correctionTime: { type: String, default: null },

  correctionDesignerName: { type: String, default: null },
  correction2DesignerName: { type: String, default: null },
  correction3DesignerName: { type: String, default: null },

  sendForFinalApprovalDate: { type: Date, default: null },
  sendForFinalApprovalTime: { type: String, default: null },
  sendForFinalApprovalDesignerName: { type: String, default: null },


  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, {
  timestamps:true
});

const DieDrawing = mongoose.model('DieDrawing', DieDrawingSchema);
module.exports = DieDrawing;