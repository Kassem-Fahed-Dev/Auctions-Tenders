const Auction = require('../models/Auction');
const AuctionBid = require('../models/AuctionBid');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.placeBid = catchAsync(async (req, res, next) => {
  const auctionId = req.params.id;
  const { amount } = req.body;
  const userId = req.user.id;
  // 1. Get the auction
  const auction = await Auction.findById(auctionId).populate('user');
  console.log(auction)
  if (!auction) {
    return next(new AppError('No auction found with that ID', 404));
  }

  // 2. Check if user is the auction creator
  if (auction.user.toString() === userId) {
    return next(new AppError('You cannot bid on your own auction', 400));
  }

  // 3. Check auction status
  if (auction.activeStatus !== 'active') {
    return next(new AppError('Bidding is closed for this auction', 400));
  }

  // 4. Validate bid amount
  const minimumValidBid = auction.highestPrice + auction.minimumIncrement;
  if (amount < minimumValidBid) {
    return next(
      new AppError(`Bid amount must be at least ${minimumValidBid}`, 400),
    );
  }

  // 5. Create the bid
  const bid = new AuctionBid({
    user: userId,
    auction: auctionId,
    amount,
  });

  // 6. Update auction's current bid
  auction.highestPrice = amount;

  // Use transaction if possible (e.g., mongoose-transactions)
  await Promise.all([bid.save(), auction.save()]);

  res.status(201).json({
    status: 'success',
    message: 'Bid placed successfully',
  });
});
