const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['auction', 'tender'],
      required: [true, 'type required'],
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
      required: [true, 'id required'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Favorite', favoriteSchema);
