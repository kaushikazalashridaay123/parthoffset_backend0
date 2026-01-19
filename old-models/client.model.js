const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mailingName: { type: String, required: true },

  address1: { type: String, default: null },
  address2: { type: String, default: null },
  address3: { type: String, default: null },

  cityId: { type: String, default: null }, 
  stateId: { type: String, default: null },
  contryId: { type: String, default: null }, 

  pincode: { type: String, default: null },
  phoneNo: { type: String, default: null },
  email: { type: String, default: null },
  website: { type: String, default: null },

  pan: { type: String, default: null },
  concernPersonName: { type: String, default: null },
  concernPersonPhoneNo: { type: String, default: null },
  concernPersonEmail: { type: String, default: null },

  profit: { type: String, default: null },
  paperProfitMargin: { type: String, default: null },
  gstNo: { type: String, default: null },
  stateTinNo: { type: String, default: null },
  deliveredQTYTolerence: { type: String, default: null },

  companyAdd: { type: String, default: null },
  companyPincode: { type: String, default: null },
  companyDist: { type: String, default: null },
  companyContryId: { type: String, default: null },
  companyStateId: { type: String, default: null },
  companyCityId: { type: String, default: null },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, {
  timestamps: true
});

const Client = mongoose.model('Client', ClientSchema);
