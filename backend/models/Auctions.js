const mongoose = require('mongoose');
const auctionSchema = new mongoose.Schema(
  {
    auction_id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item',
    },
    auctionTtile: {
      type: String,
      required: [true, 'Inter auction title'],
    },
    startTime: {
      type: Date,
      require: [true, 'Please inter start time'],
    },
    endTime: {
      type: Date,
      require: [true, 'Please inter end time'],
    },
    minimumIncrement: {
      type: Number,
      require: [true, 'Enter the minimum increase'],
    },
    startingPrice: {
      type: Number,
      require: true,
      default: 0,
    },
    highestPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['accept', 'regect', 'pinding'],
      default: 'pinding',
    },
    activeStatus: {
      type: String,
      enum: ['active', 'close'],
      default: 'active',
    },
  },
  { timestamps: true },
);
// To set the value of activeStatus based on startTime and endTime
auctionSchema.pre('save', function (next) {
  const now = new Date();
  if (now < this.startTime || now > this.endTime) {
    this.activeStatus = 'close';
  } else {
    this.activeStatus = 'active';
    console.log(this.activeStatus);
  }
  next();
});

module.exports = mongoose.model('Auctions', auctionSchema);
