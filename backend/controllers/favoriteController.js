const Favorite = require('../models/Favorite');
const Auction = require('../models/Auction');
const Tender = require('../models/Tender');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// Toggle favorite status (add if not exists, remove if exists) for auction or tender
exports.toggleFavorite = catchAsync(async (req, res, next) => {
  const { auctionId, tenderId, categoryId } = req.params;
  const userId = req.user.id;

  let targetDoc, targetType, targetField;
  if (auctionId) {
    targetDoc = await Auction.findById(auctionId);
    targetType = 'auction';
    targetField = auctionId;
  } else if (tenderId) {
    targetDoc = await Tender.findById(tenderId);
    targetType = 'tender';
    targetField = tenderId;
  } else if (categoryId) {
    targetDoc = await Category.findById(categoryId);
    targetType = 'categroy';
    targetField = categroryId;
  } else {
    return next(new AppError('No auctionId or tenderId provided', 400));
  }

  if (!targetDoc) {
    return next(
      new AppError(
        req.t(`errors:notFound`, { doc: req.t(`fields:${targetType}`) }),
        404,
      ),
    );
  }

  // Check if already favorited
  const existingFavorite = await Favorite.findOne({
    user: userId,
    type: targetType,
    referenceId: targetField,
  });

  let result;
  let message;

  if (existingFavorite) {
    // Remove from favorites
    await Favorite.findByIdAndDelete(existingFavorite._id);
    result = null;
    message = req.t(`successes:removeFavorite`);
  } else {
    // Add to favorites
    result = await Favorite.create({
      user: userId,
      type: targetType,
      referenceId: targetField,
    });
    message = req.t(`successes:addFavorite`);
  }

  res.status(200).json({
    status: req.t(`fields:success`),
    message,
    data: {
      data: result,
    },
  });
});

// Get all favorites for current user (auctions and tenders)
exports.getUserFavorites = catchAsync(async (req, res, next) => {
  const query = Favorite.find({ user: req.user.id }).populate('user');

  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const favorites = await features.query;

  // Separate auction and tender IDs
  const auctionIds = [];
  const tenderIds = [];

  favorites.forEach((favorite) => {
    if (favorite.type === 'auction') {
      auctionIds.push(favorite.referenceId);
    } else if (favorite.type === 'tender') {
      tenderIds.push(favorite.referenceId);
    }
  });

  // Fetch all auctions and tenders in parallel
  const [auctions, tenders] = await Promise.all([
    auctionIds.length > 0 ? Auction.find({ _id: { $in: auctionIds } }) : [],
    tenderIds.length > 0 ? Tender.find({ _id: { $in: tenderIds } }) : [],
  ]);

  // Create maps for quick lookup
  const auctionMap = {};
  const tenderMap = {};

  auctions.forEach((auction) => {
    auctionMap[auction._id.toString()] = auction;
  });

  tenders.forEach((tender) => {
    tenderMap[tender._id.toString()] = tender;
  });

  // Attach the populated data
  const populatedFavorites = favorites.map((favorite) => {
    const favoriteObj = favorite.toObject();

    if (favorite.type === 'auction') {
      favoriteObj.referenceId = auctionMap[favorite.referenceId.toString()];
    } else if (favorite.type === 'tender') {
      favoriteObj.referenceId = tenderMap[favorite.referenceId.toString()];
    }

    return favoriteObj;
  });

  res.status(200).json({
    status: req.t(`fields:success`),
    results: populatedFavorites.length,
    data: {
      data: populatedFavorites,
    },
  });
});

// Check if an auction or tender is favorited by current user
exports.checkFavorite = catchAsync(async (req, res, next) => {
  const { auctionId, tenderId } = req.params;
  let query = { user: req.user.id };
  if (auctionId) query.auction = auctionId;
  if (tenderId) query.tender = tenderId;

  const isFavorite = await Favorite.exists(query);

  res.status(200).json({
    status: req.t(`fields:success`),
    data: {
      isFavorite: !!isFavorite,
    },
  });
});
