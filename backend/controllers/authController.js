const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./../models/User');
const BlacklistToken = require('./../models/BlacklistToken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const sendOTP = require('../utils/sendOtp');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // Remove password from output
  user.password = undefined;

  res.cookie('jwt', token, cookieOptions).status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    phone: req.body.phone,
    profileImg: req.body.profileImg,
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctCompare(password, user.password))) {
    return next(new AppError(req.t(`errors:login`), 403));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  const newBlacklistToken = new BlacklistToken({ token: req.token });
  await newBlacklistToken.save();
  res.status(200).json({
    status: req.t(`fields:success`),
    message: req.t('successes:logout'),
  });

  // const cookieOptions = {
  //   httpOnly: true,
  // };
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // res.clearCookie('jwt', cookieOptions);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError(req.t(`errors:access`), 401));
  }
  // check if the token in Blacklist tokens or not
  const checkIfBlacklisted = await BlacklistToken.findOne({ token });
  console.log(checkIfBlacklisted);
  if (checkIfBlacklisted)
    return next(new AppError(req.t(`errors:access`), 401));

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError(req.t(`errors:userNotFound`), 401));
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError(req.t(`errors:changePassword`), 401));
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  req.token = token;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(new AppError(req.t(`errors:permission`), 403));
    }

    next();
  };
};

exports.checkLogin = (req, res, next) => {
  res.status(200).json({
    status: req.t('fields:success'),
  });
};
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(req.t(`errors:emailNotFound`), 404));
  }

  // 2) Generate the random reset token
  const resetCode = await user.createPasswordResetCode();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email

  // const message = `Forgot your password? Submit Your password reset code ${resetCode}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    //sending the code by whatsapp
    await sendOTP(user.phone, resetCode);

    //sending the code by email

    // await sendEmail({
    //   email: user.email,
    //   subject: 'Your password reset code (valid for 10 min)',
    //   message,
    //});

    res.status(200).json({
      status: req.t(`fields:success`),
      message: req.t('successes:sendCode'),
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError(req.t(`errors:sendingCode`)), 500);
  }
});

exports.checkResetCode = catchAsync(async (req, res, next) => {
  const { email, resetCode } = req.body;
  const user = await User.findOne({
    email,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (
    !user ||
    !user.passwordResetCode ||
    !(await user.correctCompare(resetCode, user.passwordResetCode))
  ) {
    return next(new AppError(req.t(`errors:expiredTokenOrCode`), 400));
  }
  const name = user.name;
  const resetToken = user.createPasswordResetToken();
  user.passwordResetCode = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:codeVerified`),
    resetToken, // Pass token to the next step
    email,
    name,
  });
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.body.resetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError(req.t(`errors:expiredTokenOrCode`), 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctCompare(req.body.passwordCurrent, user.password))) {
    return next(new AppError(req.t(`errors:currentPassword`), 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
