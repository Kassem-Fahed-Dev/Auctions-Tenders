const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    blockedAmount: {
      type: Number,
      default: 0,
    },
    availableAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Wallet', walletSchema);
