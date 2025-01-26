const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/User');

const singToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.singUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = singToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.currectPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 400));
  }

  const token = singToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
