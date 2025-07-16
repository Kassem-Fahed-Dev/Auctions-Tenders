const mongoose = require('mongoose');
const tenderBidSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenders',
  },
  amount: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TenderBid', tenderBidSchema);
