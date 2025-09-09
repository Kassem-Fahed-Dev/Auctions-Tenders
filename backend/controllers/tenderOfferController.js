const Tender = require('../models/Tender');
const TenderOffer = require('../models/TenderOffer');
const Wallet = require('../models/Wallet');
const WalletActivity = require('../models/WalletActivity');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const notificationService = require('../utils/notificationService');

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
  if (tender.user._id.toString() === userId) {
    return next(new AppError(req.t(`errors:offering`), 400));
  }
  // 3. Check tender status
  if (tender.activeStatus !== 'جاري') {
    return next(new AppError(req.t(`errors:offeringClose`), 400));
  }

  const existingOffer = await TenderOffer.findOne({
    user: userId,
    tender: tenderId,
  });
  // console.log('existing offer', existingOffer);
  let wallet = await Wallet.findOne({ partner: userId });
  if (!wallet) {
    wallet = await Wallet.create({ partner: userId });
  }

  if (!existingOffer) {
    let blockedAmount = 0.1 * tender.startingPrice;
    // wallet.availableAmount = blockedAmount + 10; // for testing
    if (wallet.availableAmount < blockedAmount) {
      return next(
        new AppError(
          req.t(`errors:offerAmount`, {
            blockedAmount,
            doc: req.t('fields:tender'),
          }),
          400,
        ),
      );
    }

    wallet.availableAmount -= blockedAmount;
    wallet.blockedAmount += blockedAmount;
    await wallet.save();
  }
  const offer = new TenderOffer({
    user: userId,
    tender: tenderId,
    amount,
    message,
  });

  // Send notification to tender owner
  const nogif = await notificationService.createNotification({
    userId: tender.user,
    title: 'عرض جديد على مناقصتك',
    message: `  ${tender.tenderTitle} على مناقصتك  ${amount} بتقديم عرض  بقيمة   ${req.user.name}  قام`,
    type: 'tender',
    referenceId: tender._id,
  });

  await offer.save();
  res.status(201).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:offer`),
  });
});
