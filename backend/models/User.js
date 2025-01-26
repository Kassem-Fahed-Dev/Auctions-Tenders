const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
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
    phone: String,
    country: String,
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
  },
  { timeseries: true },
);

UserSchema.pre('save', async function (next) {
  // Only run this fun if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.currectPassword = async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
