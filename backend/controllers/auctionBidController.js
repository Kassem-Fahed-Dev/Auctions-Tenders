const Auction = require('../models/Auction');
const AuctionBid = require('../models/AuctionBid');
const WalletActivity = require('../models/WalletActivity'); // Add this import
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const notificationService = require('../utils/notificationService');

const Wallet = require('../models/Wallet');

exports.placeBid = catchAsync(async (req, res, next) => {
  const auctionId = req.params.id;
  const { amount } = req.body;
  const userId = req.user.id;

  // 1. Get the auction
  const auction = await Auction.findById(auctionId).populate('user');
  if (!auction) {
    return next(
      new AppError(
        req.t(`errors:notFound`, { doc: req.t(`fields:auction`) }),
        404,
      ),
    );
  }

  // 2. Check if user is the auction creator
  if (auction.user._id == userId) {
    return next(new AppError(req.t(`errors:bidding`), 400));
  }

  // 3. Check auction status
  if (auction.activeStatus == 'منتهي') {
    return next(new AppError(req.t(`errors:biddingClose`), 400));
  }
  if (auction.activeStatus == 'قادم') {
    return next(new AppError('المزاد لم يبدأ بعد', 400));
  }
  if (auction.status!='مقبول') {
      return next(new AppError("المزاد لم يتم قبوله ", 400));
    }

  // 4. Validate bid amount
  const minimumValidBid = auction.highestPrice + auction.minimumIncrement;
  if (amount < minimumValidBid) {
    return next(
      new AppError(
        req.t(`errors:biddingAmount`, { minimumValidBid: minimumValidBid + 1 }),
        400,
      ),
    );
  }

  // 5. Check if user has already bid on this auction
  const existingBid = await AuctionBid.findOne({
    user: userId,
    auction: auctionId,
  });

  let wallet = await Wallet.findOne({ partner: userId });
  if (!wallet) {
    wallet = await Wallet.create({ partner: userId });
  }

  let blockedAmount = 0;
  let isFirstBid = false;
  
  if (!existingBid) {
    blockedAmount = amount;
    isFirstBid = true;
  } else {
    blockedAmount = amount - existingBid.amount;
  }
  blockedAmount += (0.1*blockedAmount)
  // This check now ensures the user has enough available funds for the new bid
  if (wallet.availableAmount < blockedAmount) {
    // Log failed wallet activity
    await WalletActivity.create({
      partner: userId,
      descriptionTransaction: `فشل المزايدة على المزاد "${auction.auctionTitle}" - رصيد غير كافي`,
      amount: blockedAmount,
      status: 'failed',
    });

    return next(
      new AppError(
        req.t(`errors:blockedAmount`, {
          blockedAmount,
          doc: req.t('fields:auction'),
        }),
        400,
      ),
    );
  }

  // Block the amount
  wallet.availableAmount -= blockedAmount;
  wallet.blockedAmount += blockedAmount;

  // 6. Create or update the bid
  let bid;
  if (existingBid) {
    // Update existing bid
    existingBid.amount = amount;
    bid = existingBid;
  } else {
    // Create new bid
    bid = new AuctionBid({
      user: userId,
      auction: auctionId,
      amount,
    });
  }

  // 7. Update auction's highest bid
  auction.highestPrice = amount;

  // 8. Save wallet, bid and auction (using Promise.all for better performance)
  await Promise.all([
    wallet.save(),
    bid.save(),
    auction.save()
  ]);

  // 9. Log successful wallet activity
  const activityDescription = isFirstBid 
    ? `مزايدة جديدة على المزاد "${auction.auctionTitle}" بمبلغ ${amount}`
    : `تعديل المزايدة على المزاد "${auction.auctionTitle}" من ${existingBid.amount} إلى ${amount}`;

  await WalletActivity.create({
    partner: userId,
    descriptionTransaction: activityDescription,
    amount: blockedAmount,
    status: 'completed',
  });

  // 10. Send notification to auction owner
  const nogif = await notificationService.createNotification({
    userId: auction.user,
    title: 'مزايدة جديدة على مزادك',
    message: `قام ${req.user.name} بالمزايدة بقيمة ${amount} على مزادك ${auction.auctionTitle}`,
    type: 'auction',
    referenceId: auction._id,
  });

  console.log('notification created', nogif);

  res.status(201).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:bid`),
  });
});