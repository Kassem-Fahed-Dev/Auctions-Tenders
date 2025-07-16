const Tenders = require('../models/Tenders');
const TenderBid = require('../models/TenderBid');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.placeBid = catchAsync(async (req, res, next) => {
  const tenderId = req.params.id;
  const { amount } = req.body;
  const userId = req.user.id;
  // 1. Get the tender
  const tender = await Tenders.findById(tenderId).populate('user');
  if (!tender) {
    return next(new AppError('No tender found with that ID', 404));
  }

  // 2. Check if user is the tender creator
  if (tender.user.toString() === userId) {
    return next(new AppError('You cannot bid on your own tender', 400));
  }

  // 3. Check tender status
  if (tender.activeStatus !== 'active') {
    return next(new AppError('Bidding is closed for this tender', 400));
  }

  // 4. Validate bid amount (يجب أن يكون أعلى من السعر الابتدائي أو آخر مزايدة)
  // جلب أعلى مزايدة حالية
  const highestBid = await TenderBid.findOne({ tender: tenderId }).sort({
    amount: -1,
  });
  const minimumValidBid = highestBid
    ? highestBid.amount + 1
    : tender.startingPrice;
  if (amount < minimumValidBid) {
    return next(
      new AppError(`Bid amount must be at least ${minimumValidBid}`, 400),
    );
  }

  // 5. Create the bid
  const bid = new TenderBid({
    user: userId,
    tender: tenderId,
    amount,
  });

  await bid.save();

  res.status(201).json({
    status: 'success',
    message: 'Bid placed successfully',
  });
});
