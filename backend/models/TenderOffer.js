const mongoose = require('mongoose');
const tenderOfferSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user required'],
  },
  tender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tender',
    required: [true, 'tender required'],
  },
  amount: {
    type: Number,
    required: [true, 'amount required'],
  },
  message: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TenderOffer', tenderOfferSchema); 