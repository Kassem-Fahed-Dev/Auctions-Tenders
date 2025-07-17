const mongoose = require('mongoose');

const tendersSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tenderTitle: {
      type: String,
      required: [true, 'Ineter auction title'],
      minlength: [10, 'Title should be at least 10 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    startTime: {
      type: Date,
      required: [true, 'Please inter start time'],
    },
    endTime: {
      type: Date,
      required: [true, 'Please inter end time'],
      validate: {
        validator: function (val) {
          return val > this.startTIme;
        },
        message: 'End time must be after start time',
      },
    },
    startingPrice: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be begative'],
      default: 0,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    status: {
      type: String,
      enum: {
        values: ['accept', 'reject', 'pindding'],
        message: 'Status must be either accepted,rejected, or pinding',
      },
      default: 'pindding',
      lowercase: true,
    },
    activeStatus: {
      type: String,
      enum: ['active', 'colse', 'soon'],
      default: 'soon',
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);
tendersSchema.pre('save', function (next) {
  const now = new Date();
  if (now > this.endTime) {
    this.activeStatus = 'colse';
  } else if (now < this.startTime) {
    this.activeStatus = 'soon';
  } else {
    this.activeStatus = 'active';
    console.log(this.activeStatus);
  }
  next();
});

tendersSchema.virtual('tenderBid', {
  ref: 'tenderBid',
  localField: '_id',
  foreignField: 'tender',
});

module.exports = mongoose.model('Tenders', tendersSchema);
