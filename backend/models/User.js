const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Auctions = require('./Auction');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Inter the user name'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'the email not valid'],
    },
    phone: {
      type: String,
      required: [true, 'phone required'],
    },
    profileImg: String,
    password: {
      type: String,
      required: [true, 'password required'],
      minlength: [8, 'short password'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'plase confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password are not the same!',
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

userSchema.virtual("auctions", {
  ref: "Auction",       // Referencing the "Auction" model
  localField: "_id",    // Field in "User" that matches "foreignField"
  foreignField: "user", // Field in "Auction" that stores the user's ID
  justOne: false        // false = One user can have many auctions
});

userSchema.virtual('auctionBids', {
  ref: 'AuctionBid',
  localField: '_id',
  foreignField: 'user',
});

userSchema.pre('remove', async function (next) {
  try {
    await Auctions.deleteMany({ userId: this._id });
    console.log(`Deleted all auctions for user ${this._id}`);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  // Only run this fun if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctCompare = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    //console.log(JWTTimestamp, changedTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};


userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  console.log(resetToken)
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // 10 munits
  console.log({token:this.passwordResetToken})
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.methods.createPasswordResetCode = async function () {
  
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(resetCode)
  
  this.passwordResetCode = await bcrypt.hash(resetCode, 12);
  // 10 munits
  console.log({token:this.passwordResetCode})
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetCode;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
