const mongoose = require('mongoose');
const tenderSchema = new mongoose.Schema(
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
    tenderTitle: {
      type: String,
      required: [true, 'Enter tender title'],
    },
    startTime: {
      type: Date,
      required: [true, 'Please enter start time'],
    },
    endTime: {
      type: Date,
      required: [true, 'Please enter end time'],
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
    description: {
      type: String,
    },
    acceptedOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TenderOffer',
      required: false,
    }
  },
  { timestamps: true },
);

tenderSchema.pre('save', function (next) {
  const now = new Date();
  if (now > this.endTime) {
    this.activeStatus = 'منتهي';
  } else if (now < this.startTime) {
    this.activeStatus = 'قادم';
  } else {
    this.activeStatus = 'جاري';
  }
  next();
});

tenderSchema.virtual('linkedItem', {
  ref: 'Item',
  localField: 'item',
  foreignField: '_id',
  justOne: true,
});

tenderSchema.virtual('tenderOffers', {
  ref: 'TenderOffer',
  localField: '_id',
  foreignField: 'tender',
});

module.exports = mongoose.model('Tender', tenderSchema); 