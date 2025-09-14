const mongoose = require('mongoose');
const auctionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    auctionTitle: {
      type: String,
      required: [true, 'Inter auction title'],
    },
    startTime: {
      type: Date,
      required: [true, 'Please inter start time'],
    },
    endTime: {
      type: Date,
      required: [true, 'Please inter end time'],
    },
    minimumIncrement: {
      type: Number,
      required: [true, 'Enter the minimum increase'],
    },
    startingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    highestPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['مقبول', 'مرفوض', 'قيد الانتظار'],
      default: 'قيد الانتظار',
    },
    activeStatus: {
      type: String,
      enum: ['جاري', 'منتهي', 'قادم'],
      default: 'قادم',
    },
    numberOfItems: Number,
    city: String,
  },
  { timestamps: true },
);
// To set the value of activeStatus based on startTime and endTime
auctionSchema.pre('save', function (next) {
  const now = new Date();
  if(this.highestPrice === 0)
  this.highestPrice=this.startingPrice;
  if (now > this.endTime) {
    this.activeStatus = 'منتهي';
  } else if (now < this.startTime) {
    this.activeStatus = 'قادم';
  } else {
    this.activeStatus = 'جاري';
    console.log(this.activeStatus);
  }
  next();
});

auctionSchema.virtual('linkedItem', {
  ref: 'Item',
  localField: 'item',
  foreignField: '_id',
  justOne: true, // Returns a single document
});

auctionSchema.virtual('auctionBids', {
  ref: 'AuctionBid',
  localField: '_id',
  foreignField: 'auction',
});

module.exports = mongoose.model('Auction', auctionSchema);
