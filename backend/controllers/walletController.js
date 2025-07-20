const Wallet = require('../models/Wallet');
const WalletActivity = require('../models/WalletActivity');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllWalletActivities = catchAsync(async (req, res, next) => {
  const query = WalletActivity.find().populate('partner');
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const WalletActivities = await features.query;
  res.status(200).json({
    status: 'success',
    results: WalletActivities.length,
    data: WalletActivities,
  });
});

exports.getMyWalletActivities = catchAsync(async (req, res, next) => {
  const query = WalletActivity.find({partner:req.user.id});
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const WalletActivities = await features.query;
  res.status(200).json({
    status: 'success',
    results: WalletActivities.length,
    data: WalletActivities,
  });
});

exports.getWallet = catchAsync(async (req, res, next) => {
  const partner = req.user.id
  let wallet = await Wallet.findOne({ partner });
  if (!wallet) {
    wallet = await Wallet.create({ partner });
  }
  res.status(200).json({
    status: 'success',
    data: wallet,
  });
});

exports.depositRequest = catchAsync(async (req, res, next) => {
  const { amount } = req.body;
  const partner = req.user.id;

  if (!amount || amount <= 0) {
    return next(new AppError('Amount must be greater than zero', 400));
  }

  // find or create wallet
  let wallet = await Wallet.findOne({ partner });
  if (!wallet) {
    wallet = await Wallet.create({ partner });
  }

  // block the funds
  wallet.blockedAmount += amount;
  await wallet.save();

  // log activity
  const w = await WalletActivity.create({
    partner,
    descriptionTransaction: 'Deposit requested',
    amount, // positive
    status: 'pending',
  });

  res.status(200).json({
    status: 'success',
    data: {
      wallet,
    },
  });
});

exports.approveDeposit = catchAsync(async (req, res, next) => {
  const { activityId } = req.params;
  // 1) Fetch activity
  const activity = await WalletActivity.findById(activityId);
  if (
    !activity ||
    activity.status !== 'pending' ||
    activity.descriptionTransaction !== 'Deposit requested'
  ) {
    return next(new AppError('Invalid or non-pending deposit activity', 400));
  }

  // 2) Fetch wallet
  const wallet = await Wallet.findOne({ partner: activity.partner });
  if (!wallet) {
    return next(new AppError('Wallet not found', 404));
  }

  const amount = activity.amount;

  // 3) Move funds: blocked -> available
  wallet.blockedAmount -= amount;
  wallet.availableAmount += amount;
  await wallet.save();

  // 4) Mark activity completed
  activity.status = 'completed';
  await activity.save();

  res.status(200).json({
    status: 'success',
    data: { wallet, activity },
  });
});

exports.rejectDeposit = catchAsync(async (req, res, next) => {
  const { activityId } = req.params;

  const activity = await WalletActivity.findById(activityId);
  if (
    !activity ||
    activity.status !== 'pending' ||
    activity.descriptionTransaction !== 'Deposit requested'
  ) {
    return next(new AppError('Invalid or non-pending deposit activity', 400));
  }

  const wallet = await Wallet.findOne({ partner: activity.partner });
  if (!wallet) {
    return next(new AppError('Wallet not found', 404));
  }

  const amount = activity.amount;

  // Roll back the block
  wallet.blockedAmount -= amount;
  await wallet.save();

  activity.status = 'failed';
  await activity.save();

  res.status(200).json({
    status: 'success',
    data: { wallet, activity },
  });
});

exports.withdrawRequest = catchAsync(async (req, res, next) => {
  const { amount } = req.body;
  const partner = req.user.id;

  if (!amount || amount <= 0) {
    return next(new AppError('Amount must be greater than zero', 400));
  }

  const wallet = await Wallet.findOne({ partner });
  if (!wallet) {
    return next(new AppError('Wallet not found', 404));
  }

  if (wallet.availableAmount < amount) {
    return next(new AppError('Insufficient available balance', 400));
  }

  // move from available -> blocked
  wallet.availableAmount -= amount;
  wallet.blockedAmount += amount;
  await wallet.save();

  // log activity
  await WalletActivity.create({
    partner,
    descriptionTransaction: 'Withdrawal requested',
    amount: -amount, // negative value for debit
    status: 'pending',
  });

  res.status(200).json({
    status: 'success',
    data: {
      wallet,
    },
  });
});

exports.completeWithdrawal = catchAsync(async (req, res, next) => {
  const { activityId } = req.params;

  const activity = await WalletActivity.findById(activityId);
  if (
    !activity ||
    activity.status !== 'pending' ||
    activity.descriptionTransaction !== 'Withdrawal requested'
  ) {
    return next(
      new AppError('Invalid or non-pending withdrawal activity', 400),
    );
  }

  const wallet = await Wallet.findOne({ partner: activity.partner });
  if (!wallet) {
    return next(new AppError('Wallet not found', 404));
  }

  const amount = Math.abs(activity.amount);

  // Finalize payout: remove from blocked
  wallet.blockedAmount -= amount;
  await wallet.save();

  activity.status = 'completed';
  await activity.save();

  res.status(200).json({
    status: 'success',
    data: { wallet, activity },
  });
});

exports.failWithdrawal = catchAsync(async (req, res, next) => {
  const { activityId } = req.params;

  const activity = await WalletActivity.findById(activityId);
  if (
    !activity ||
    activity.status !== 'pending' ||
    activity.descriptionTransaction !== 'Withdrawal requested'
  ) {
    return next(
      new AppError('Invalid or non-pending withdrawal activity', 400),
    );
  }

  const wallet = await Wallet.findOne({ partner: activity.partner });
  if (!wallet) {
    return next(new AppError('Wallet not found', 404));
  }

  const amount = Math.abs(activity.amount);

  // Roll back: blocked -> available
  wallet.blockedAmount -= amount;
  wallet.availableAmount += amount;
  await wallet.save();

  activity.status = 'failed';
  await activity.save();

  res.status(200).json({
    status: 'success',
    data: { wallet, activity },
  });
});
