const mongoose = require('mongoose');
const auctionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userSchema',
    },
    item: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      unique: true // Ensure one item per auction
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
      enum: ['مقبول', 'مرفوض', 'انتظار'],
      default: 'انتظار',
    },
    activeStatus: {
      type: String,
      enum: ['جاري', 'انتهى', 'قريبا'],
      default: 'قريبا',
    },
  },
  { timestamps: true },
);
// To set the value of activeStatus based on startTime and endTime
auctionSchema.pre('save', function (next) {
  const now = new Date();
  if (now > this.endTime) {
    this.activeStatus = 'close';
  } else if (now < this.startTime) {
    this.activeStatus = 'soon';
  } else {
    this.activeStatus = 'active';
    console.log(this.activeStatus);
  }
  next();
});

auctionSchema.virtual("linkedItem", {
  ref: "Item",
  localField: "item",
  foreignField: "_id",
  justOne: true // Returns a single document
});

module.exports = mongoose.model('Auction', auctionSchema);
