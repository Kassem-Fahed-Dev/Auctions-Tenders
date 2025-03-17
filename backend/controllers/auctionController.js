const Auctions = require('../models/Auctions');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addAuction = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log('auction data', data);
  const newAuction = await Auctions.create({
    userId: data.userId,
    itemId: data.itemId,
    auctionTtile: data.auctionTtile,
    startTime: data.startTime,
    endTime: data.endTime,
    minimumIncrement: data.minimumIncrement,
    startingPrice: data.startingPrice,
    highestPrice: data.highestPrice,
  });
  res.status(200).json({
    status: 'success',
    data: newAuction,
  });
});
exports.deleteAuction = catchAsync(async (req, res, next) => {
  const Auc = await Auctions.findOne({ auction_id: req.params.id });
  if (!Auc) {
    return next(new AppError('auction not found'));
  }
  await Auctions.deleteOne({ auction_id: req.params.id });
  res.status(200).json({
    message: 'auction deleted',
  });
});
exports.getAllUserAuctions = async (req, res, next) => {
  console.log('debug');
  try {
    const allAuctions = await Auctions.find({ userId: req.params.id });
    if (allAuctions.length === 0) {
      res.status(404).json({
        status: 'fail',
        message: 'No auction found for this user',
      });
    } else {
      res.status(200).json({
        status: 'succes',
        results: allAuctions.length,
        data: allAuctions,
      });
    }
  } catch (error) {
    res.json({ message: 'error', error });
  }
};
