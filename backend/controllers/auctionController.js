const Auction = require('../models/Auction');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getMyAuctions = (req,res,next) => {
  req.query.userId = req.user.id;
  console.log(req.params.userId)
  next();
}
exports.getAllAuctions =  factory.getAll(Auction)
exports.getAuction = factory.getOne(Auction);
exports.createAuction = factory.createOne(Auction);
exports.updateAuction = factory.updateOne(Auction);
exports.deleteAuction = factory.deleteOne(Auction);
