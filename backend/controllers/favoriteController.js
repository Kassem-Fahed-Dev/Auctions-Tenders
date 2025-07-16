const Favorite = require('../models/Favorite');
const Auction = require('../models/Auction');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Toggle favorite status (add if not exists, remove if exists)
exports.toggleFavorite = catchAsync(async (req, res, next) => {
  const { auctionId } = req.params;
  const userId = req.user.id;

  // Check if auction exists
  const auction = await Auction.findById(auctionId);
  if (!auction) {
    return next(
      new AppError(
        req.t(`errors:notFound`, { doc: req.t(`fields:auction`) }),
        404
      )
    );
  }

  // Check if already favorited
  const existingFavorite = await Favorite.findOne({
    user: userId,
    auction: auctionId
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
      auction: auctionId
    });
    message = req.t(`successes:addFavorite`);
  }

  res.status(200).json({
    status: req.t(`fields:success`),
    message,
    data: {
      data: result
    }
  });
});

// Get all favorites for current user
exports.getUserFavorites = catchAsync(async (req, res, next) => {
  const favorites = await Favorite.find({ user: req.user.id })
    .populate({
      path: 'auction',
      populate: [
        { path: 'item' },
        { path: 'user' }
      ]
    });

  res.status(200).json({
    status: req.t(`fields:success`),
    results: favorites.length,
    data: {
      data: favorites.map(fav => fav.auction)
    }
  });
});

// Check if an auction is favorited by current user
exports.checkFavorite = catchAsync(async (req, res, next) => {
  const { auctionId } = req.params;
  
  const isFavorite = await Favorite.exists({
    user: req.user.id,
    auction: auctionId
  });

  res.status(200).json({
    status: req.t(`fields:success`),
    data: {
      isFavorite: !!isFavorite
    }
  });
});