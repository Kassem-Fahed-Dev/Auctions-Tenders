const Favorite = require('../models/Favorite');
const Auction = require('../models/Auction');
const Tender = require('../models/Tender');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// Toggle favorite status (add if not exists, remove if exists) for auction or tender
exports.toggleFavorite = catchAsync(async (req, res, next) => {
  const { auctionId, tenderId } = req.params;
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
  const query = Favorite.find({ user: req.user.id });
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const favorites = await features.query;

  res.status(200).json({
    status: req.t(`fields:success`),
    results: favorites.length,
    data: {
      data: favorites
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
