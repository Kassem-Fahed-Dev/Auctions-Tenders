const Auction = require('../models/Auction');
const AuctionBid = require('../models/AuctionBid');
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
  if (auction.activeStatus != 'جاري') {
    return next(new AppError(req.t(`errors:biddingClose`), 400));
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

  // block 10% of startingPrice to participate in the auction

  let wallet = await Wallet.findOne({ partner: userId });
  if (!wallet) {
    wallet = await Wallet.create({ partner: userId });
  }
  // Only block amount if this is the user's first bid on this auction
  if (!existingBid) {
    let blockedAmount = 0.1 * auction.startingPrice;
    blockedAmount = wallet.availableAmount;
    if (wallet.availableAmount < blockedAmount) {
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

    // Block the amount for first-time bidder
    wallet.availableAmount -= blockedAmount;
    wallet.blockedAmount += blockedAmount;
    await wallet.save();
  }

  // 5. Create the bid
  const bid = new AuctionBid({
    user: userId,
    auction: auctionId,
    amount,
  });

  // 8. Update auction's highest bid
  auction.highestPrice = amount;

  // 9. Save both bid and auction (using Promise.all for better performance)
  await Promise.all([bid.save(), auction.save()]);

  // Send notification to auction owner
  const nogif = await notificationService.createNotification({
    userId: auction.user,
    title: 'مزايدة جديدة على مزادك',
    message: `قام ${req.user.name} بالمزايدة بقيمة ${amount} على مزادك ${auction.auctionTtile}`,
    type: 'auction',
    referenceId: auction._id,
  });

  console.log('notification created', nogif);

  res.status(201).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:bid`),
  });
});
