const mongoose = require('mongoose');
const auctionBidSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user required'],
  },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: [true, 'auction required'],
  },
  amount: {
    type: Number,
    required: true,
    required: [true, 'amount required'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AuctionBid', auctionBidSchema);
