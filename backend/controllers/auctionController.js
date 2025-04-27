const Auction = require('../models/Auction');
const Item = require('../models/Item');
const Category = require('../models/Category');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.filterAuctionsByCategory = catchAsync(async (req, res, next) => {
  const categoryName = req.query.categoryName;
  req.query = (({ categoryName, ...rest }) => rest)(req.query);
  if (!categoryName) {
    return next();
  }
  const category = await Category.findOne({
    type: 'auction',
    name: categoryName,
  });
  //console.log(category)
  const itemsInCategory = await Item.find({ category: category._id });

  const itemIds = itemsInCategory.map((item) => item._id);

  req.itemAuction = { item: { $in: itemIds } };
  // console.log(req.itemAuction)
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
  const newItem = new Item({
    ...req.body.item,
    auction: null, // Temporary placeholder
  });

  // Create Auction with Item reference
  const newAuction = new Auction({
    ...req.body.auction,
    user: req.user.id,
    item: newItem._id,
  });

  // Update Item with Auction reference
  newItem.auction = newAuction._id;
  await Promise.all([newItem.save(), newAuction.save()]);

  const populatedAuction = await Auction.findById(newAuction._id)
    .populate('item')
    .populate('user');
  res.status(201).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:createAuction`),
    data: {
      populatedAuction,
    },
  });
});

// 2. GET Auction + Item
exports.getAuctionWithItem = catchAsync(async (req, res, next) => {
  const auction = await Auction.findById(req.params.id)
    .populate('item')
    .populate('user');

  if (!auction) {
    return next(
      new AppError(
        req.t(`errors:notFound`, { doc: req.t(`fields:auction`) }),
        404,
      ),
    );
  }

  res.status(200).json({
    status: req.t(`fields:success`),
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
    return next(
      new AppError(
        req.t(`errors:notFound`, { doc: req.t(`fields:auction`) }),
        404,
      ),
    );
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
    status: req.t(`fields:success`),
    message: req.t(`successes:updateAuction`),
    data: {
      data: auctionAndItem,
    },
  });
});

// 4. DELETE Auction + Item
exports.deleteAuctionWithItem = catchAsync(async (req, res, next) => {
  const auction = await Auction.findById(req.params.id);
  if (!auction)
    return next(
      new AppError(
        req.t(`errors:notFound`, { doc: req.t(`fields:auction`) }),
        404,
      ),
    );

  // Delete linked Item first
  await Item.findByIdAndDelete(auction.item);

  // Then delete Auction
  await Auction.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:deleteAuction`),
    data: null,
  });
});

// Get All Auctions + Items
exports.getAllAuctionsWithItems = catchAsync(async (req, res, next) => {
  let filterAuctionsByCategory = {};
  if (req.itemAuction) filterAuctionsByCategory = req.itemAuction;

  const query = Auction.find(filterAuctionsByCategory)
    .populate('item')
    .populate('user');
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const auctions = await features.query;
  res.status(200).json({
    status: req.t(`fields:success`),
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
