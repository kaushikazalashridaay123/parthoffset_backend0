const mongoose = require('mongoose');

const OAuthRefreshTokenSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  access_token_id: {
    type: String,
    required: true
  },
  revoked: {
    type: Boolean,
    required: true
  },
  expires_at: {
    type: Date,
    default: null
  }
}, {
  _id: false, // Because the ID is a string (not ObjectId), we set _id manually
  timestamps: false
});

const OAuthRefreshToken = mongoose.model('OAuthRefreshToken', OAuthRefreshTokenSchema);

module.exports = OAuthRefreshToken;
