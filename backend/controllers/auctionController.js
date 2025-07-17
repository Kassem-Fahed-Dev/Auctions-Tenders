const Auction = require('../models/Auction');
const Item = require('../models/Item');
const Category = require('../models/Category');
const Favorite = require('../models/Favorite');
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

  console.log('iam here');
  console.log(req.user); //  Check if user exists
  if (!req.user || !req.user.id) {
    return next(new Error('User not authenticated or missing ID.'));
  }
  let newItem = null;
  let newAuction = null;
  try {
    // Create Item first
    newItem = new Item({
      ...req.body.item,
      auction: null, // Temporary placeholder
    });


    // Create Auction with Item reference
    newAuction = new Auction({
      ...req.body.auction,
      user: req.user.id,
      item: newItem._id,
    });

    // Update Item with Auction reference
    newItem.auction = newAuction._id;
    await newItem.save();
    await newAuction.save();

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
  } catch (err) {
    if (newAuction) await Auction.findByIdAndDelete({ _id: newAuction._id });
    if (newItem) await Item.findByIdAndDelete({ _id: newItem._id });
    return next(new AppError(err, 400));
  }
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

  req.itemAuction = undefined;
  console.log(filterAuctionsByCategory)
  const query = Auction.find(filterAuctionsByCategory)
    .populate('item')
    .populate('user');
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const auctions = await features.query;
  
  // Check favorites
  const auctionIds = auctions.map(auction => auction._id);
  
  // Get all favorites for this user and these auctions
  const favorites = await Favorite.find({
      user: req.user.id,
      auction: { $in: auctionIds }
    });
    
    
    // Create a Set of favorited auction IDs for quick lookup
    const favoritedAuctionIds = new Set(
      favorites.map(fav => fav.auction.toString())
    );
    
    // Add favorite field to each auction
      auctions.forEach(auction => {
      auction = auction.toObject();
      auction.favorite = favoritedAuctionIds.has(auction._id.toString());
      return auction;
    });
  //console.log(auctions)
  res.status(200).json({
    status: req.t(`fields:success`),
    result: auctions.length,
    data: {
      data: auctions,
    },
  });
});

// Git my auctions
exports.getMyAuctions = catchAsync(async (req, res, next) => {
  let filterAuctionsByCategory = {};
  if (req.itemAuction) filterAuctionsByCategory = req.itemAuction;
  req.itemAuction=undefined
  filterAuctionsByCategory.user = req.user.id
  console.log(filterAuctionsByCategory)
  const query = Auction.find(filterAuctionsByCategory)
    .populate('item')
    .populate('user');

  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const auctions = await features.query;
  
  // Check favorites
  const auctionIds = auctions.map(auction => auction._id);
  
  // Get all favorites for this user and these auctions
  const favorites = await Favorite.find({
      user: req.user.id,
      auction: { $in: auctionIds }
    });
    
    
    // Create a Set of favorited auction IDs for quick lookup
    const favoritedAuctionIds = new Set(
      favorites.map(fav => fav.auction.toString())
    );
    
    // Add favorite field to each auction
      auctions.forEach(auction => {
      auction = auction.toObject();
      auction.favorite = favoritedAuctionIds.has(auction._id.toString());
      return auction;
    });
  //console.log(auctions)
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
