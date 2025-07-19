const Tender = require('../models/Tender');
const TenderOffer = require('../models/TenderOffer');
const Wallet = require('../models/Wallet');
const WalletActivity = require('../models/WalletActivity');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.submitOffer = catchAsync(async (req, res, next) => {
  const tenderId = req.params.id;
  const { amount, message } = req.body;
  const userId = req.user.id;
  // 1. Get the tender
  const tender = await Tender.findById(tenderId).populate('user');
  if (!tender) {
    return next(
      new AppError(
        req.t(`errors:notFound`, { doc: req.t(`fields:tender`) }),
        404,
      ),
    );
  }
  // 2. Check if user is the tender creator
  if (tender.user.toString() === userId) {
    return next(new AppError(req.t(`errors:offering`), 400));
  }
  // 3. Check tender status
  if (tender.activeStatus !== 'جاري') {
    return next(new AppError(req.t(`errors:offeringClose`), 400));
  }
  const offer = new TenderOffer({
    user: userId,
    tender: tenderId,
    amount,
    message,
  });
  await offer.save();
  res.status(201).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:offer`),
  });
});
