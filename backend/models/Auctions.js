const mongoose = require('mongoose');
const User = require('../models/User');
const auctionsSchema = new mongoose.Schema({
  auction_id: {
    type: mongoose.schema.types.ObjectId,
    auto: true,
  },
  userId: {
    type: mongoose.schema.types.ObjectId,
    ref: 'User',
  },
  itemId: {
    type: mongoose.schema.types.ObjectId,
    ref: 'item',
  },
  auctionTtile: {
    type: String,
    required: [true, 'Inter auction title'],
  },
});
