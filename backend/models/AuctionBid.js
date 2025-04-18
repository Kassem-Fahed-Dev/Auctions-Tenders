const mongoose = require('mongoose');
const auctionBidSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  auction: {
    type: Schema.Types.ObjectId,
    ref: 'Auction',
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

module.exports = mongoose.model('AuctionBid', auctionBidSchema);
