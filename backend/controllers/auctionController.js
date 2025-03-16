const Auctions = require('../models/Auctions');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addAuction = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log('auction data', data);
  const newAuction = Auctions.create({
    userId: data.userId,
    itemId: data.itemId,
    auctionTtile: data.auctionTtile,
    startTime: data.startTime,
    endTime: data.endTime,
    minimumIncrement: data.minimumIncrement,
    startingPrice: data.startingPrice,
    highestPrice: data.highestPrice,
  })
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'the auction not created',
        error,
      });
    });
});
