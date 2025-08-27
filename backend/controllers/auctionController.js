const Auction = require('../models/Auction');
const Item = require('../models/Item');
const Category = require('../models/Category');
const Favorite = require('../models/Favorite');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const AuctionBid = require('../models/AuctionBid');

// Helper function to add favorites to auctions
const addFavoritesToAuctions = async (auctions, userId) => {
  const auctionIds = auctions.map((auction) => auction._id);
  
  const favorites = await Favorite.find({
    user: userId,
    type: 'auction',
    referenceId: { $in: auctionIds },
  });

  const favoritedAuctionIds = new Set(
    favorites.map((fav) => fav.referenceId.toString())
  );

  return auctions.map((auction) => {
    const plainAuction = auction.toObject();
    plainAuction.favorite = favoritedAuctionIds.has(plainAuction._id.toString());
    return plainAuction;
  });
};

// Helper function to build auction query with filters
const buildAuctionQuery = (filters = {}) => {
  return Auction.find(filters)
    .populate('item')
    .populate('user');
};

// Helper function to execute query with API features
const executeAuctionQuery = async (query, queryParams) => {
  const features = new APIFeatures(query, queryParams)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return await features.query;
};

// Helper function to send auction response
const sendAuctionResponse = (res, req, auctions, message = null) => {
  const response = {
    status: req.t('fields:success'),
    result: auctions.length,
    data: { data: auctions },
  };

  if (message) {
    response.message = message;
  }

  res.status(200).json(response);
};

// Helper function to get auctions with favorites
const getAuctionsWithFavorites = async (filters, queryParams, userId) => {
  const query = buildAuctionQuery(filters);
  const auctions = await executeAuctionQuery(query, queryParams);
  return await addFavoritesToAuctions(auctions, userId);
};

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

  const itemsInCategory = await Item.find({ category: category._id });
  const itemIds = itemsInCategory.map((item) => item._id);
  
  req.itemAuction = { item: { $in: itemIds } };
  next();
});

exports.getUserId = (req, res, next) => {
  req.params.userId = req.user.id;
  next();
};

exports.createAuctionWithItem = catchAsync(async (req, res, next) => {
  console.log('iam here');
  console.log(req.user);
  
  if (!req.user || !req.user.id) {
    return next(new Error('User not authenticated or missing ID.'));
  }

  let newItem = null;
  let newAuction = null;

  try {
    // Create Item first
    newItem = new Item({
      ...req.body.item,
      auction: null,
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
      status: req.t('fields:success'),
      message: req.t('successes:createAuction'),
      data: { populatedAuction },
    });
  } catch (err) {
    // Cleanup on error
    if (newAuction) await Auction.findByIdAndDelete({ _id: newAuction._id });
    if (newItem) await Item.findByIdAndDelete({ _id: newItem._id });
    return next(new AppError(err, 400));
  }
});

exports.getAuctionWithItem = catchAsync(async (req, res, next) => {
  const auction = await Auction.findById(req.params.id)
    .populate('item')
    .populate('user');

  if (!auction) {
    return next(
      new AppError(
        req.t('errors:notFound', { doc: req.t('fields:auction') }),
        404
      )
    );
  }

  res.status(200).json({
    status: req.t('fields:success'),
    data: { data: auction },
  });
});

exports.updateAuctionWithItem = catchAsync(async (req, res, next) => {
  // Remove sensitive fields for non-admin users
  if (req.user.role !== 'admin' && req.body.auction) {
    delete req.body.auction.status;
    delete req.body.auction.activeStatus;
  }

  const auction = await Auction.findByIdAndUpdate(
    req.params.id,
    req.body.auction,
    { new: true, runValidators: true }
  );

  if (!auction) {
    return next(
      new AppError(
        req.t('errors:notFound', { doc: req.t('fields:auction') }),
        404
      )
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
    status: req.t('fields:success'),
    message: req.t('successes:updateAuction'),
    data: { data: auctionAndItem },
  });
});

exports.deleteAuctionWithItem = catchAsync(async (req, res, next) => {
  const auction = await Auction.findById(req.params.id);
  
  if (!auction) {
    return next(
      new AppError(
        req.t('errors:notFound', { doc: req.t('fields:auction') }),
        404
      )
    );
  }

  // Delete linked Item first, then Auction
  await Item.findByIdAndDelete(auction.item);
  await Auction.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: req.t('fields:success'),
    message: req.t('successes:deleteAuction'),
    data: null,
  });
});

exports.getAllAuctionsWithItems = catchAsync(async (req, res, next) => {
  const filters = req.itemAuction || {};
  req.itemAuction = undefined;

  const auctions = await getAuctionsWithFavorites(filters, req.query, req.user.id);
  sendAuctionResponse(res, req, auctions);
});

exports.getMyAuctions = catchAsync(async (req, res, next) => {
  const filters = { ...req.itemAuction, user: req.user.id };
  req.itemAuction = undefined;

  console.log(filters);
  const auctions = await getAuctionsWithFavorites(filters, req.query, req.user.id);
  sendAuctionResponse(res, req, auctions);
});

exports.getUserParticipateAuctions = catchAsync(async (req, res, next) => {
  const participateAuctions = await AuctionBid.find({ user: req.user.id });
  const participateAuctionIds = participateAuctions.map(
    (participateAuction) => participateAuction.auction
  );

  const filters = {
    ...req.itemAuction,
    _id: { $in: participateAuctionIds },
  };
  req.itemAuction = undefined;

  const auctions = await getAuctionsWithFavorites(filters, req.query, req.user.id);
  sendAuctionResponse(res, req, auctions);
});

exports.getAuctionParticipants = catchAsync(async (req, res, next) => {
  const auction = req.params.id;
  const auctionParticipants = await AuctionBid.find({ auction }).populate('user');
  
  res.status(200).json({
    status: req.t('fields:success'),
    result: auctionParticipants.length,
    data: { data: auctionParticipants },
  });
});