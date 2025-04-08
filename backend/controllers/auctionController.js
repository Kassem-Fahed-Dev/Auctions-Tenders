const Auction = require('../models/Auction');
const Item = require('../models/Item');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');

exports.filterAuctionsByCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.query.categoryId; // Assuming categoryId is passed as a query parameter

  if (!categoryId) {
    return next();
  }
  const itemsInCategory = await Item.find({ category: categoryId });

  const itemIds = itemsInCategory.map((item) => item._id);
  req.query.item = { $in: itemIds };
  next();
});

// middleware to add userId to query parameters
exports.getUserId = (req, res, next) => {
  req.params.userId = req.user.id;
  next();
};

// 1. CREATE Auction + Item
exports.createAuctionWithItem = catchAsync(async (req, res, next) => {
  // Create Item first
  const newItem = await Item.create({
    ...req.body.item,
    auction: null, // Temporary placeholder
  });

  // Create Auction with Item reference
  const newAuction = await Auction.create({
    ...req.body.auction,
    user:req.user.id,
    item: newItem._id,
  });

  // Update Item with Auction reference
  newItem.auction = newAuction._id;
  await newItem.save();

  const populatedAuction = await Auction.findById(newAuction._id).populate(
    'item',
  );
  res.status(201).json({
    status: 'success',
    data: {
      populatedAuction
    },
  });
});

// 2. GET Auction + Item
exports.getAuctionWithItem = catchAsync(async (req, res, next) => {
  const auction = await Auction.findById(req.params.id).populate('item');

  if (!auction) {
    return next(new AppError('No auction found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: auction,
    },
  });
});

// 3. UPDATE Auction + Item
exports.updateAuctionWithItem = catchAsync(async (req, res, next) => {
  // Update Auction
  const auction = await Auction.findByIdAndUpdate(
    req.params.id,
    req.body.auction,
    { new: true, runValidators: true },
  );
  if (!auction) {
    return next(new AppError('No auction found with that ID', 404));
  }
  // Update linked Item if provided
  if (req.body.item) {
    await Item.findByIdAndUpdate(auction.item, req.body.item, {
      new: true,
      runValidators: true,
    });
  }
  
  const auctionAndItem = await Auction.findById(req.params.id).populate('item');
  res.status(200).json({
    status: 'success',
    data: {
      data: auctionAndItem,
    },
  });
});

// 4. DELETE Auction + Item
exports.deleteAuctionWithItem = catchAsync(async (req, res, next) => {
  const auction = await Auction.findById(req.params.id);
  if (!auction) return next(new AppError('No auction found with that ID', 404));

  // Delete linked Item first
  await Item.findByIdAndDelete(auction.item);

  // Then delete Auction
  await Auction.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Get All Auctions + Items
exports.getAllAuctionsWithItems = catchAsync(async (req, res, next) => {
  const query = Auction.find().populate('item');

  const features = new APIFeatures(query, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      // const doc = await features.query.explain();
      const auctions = await features.query;
  res.status(200).json({
    status: 'success',
    result: auctions.length,
    data: {
      data: auctions,
    },
  });
});

// exports.getAllAuctions = factory.getAll(Auction);
// exports.getAuction = factory.getOne(Auction);
// exports.createAuction = factory.createOne(Auction);
// exports.updateAuction = factory.updateOne(Auction);
// exports.deleteAuction = factory.deleteOne(Auction);
