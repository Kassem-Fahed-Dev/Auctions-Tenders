const Favorite = require('../models/Favorite');
const Auction = require('../models/Auction');
const Tender = require('../models/Tender');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Category = require('../models/Category');

// Toggle favorite status (add if not exists, remove if exists) for auction or tender
exports.toggleFavorite = catchAsync(async (req, res, next) => {
  const { auctionId, tenderId, categoryId } = req.params;
  const userId = req.user.id;
  console.log('😘 user id', userId);
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
    targetType = 'category';
    targetField = categoryId;
  } else {
    return next(
      new AppError('No auctionId or tenderId or categoryId provided', 400),
    );
  }
  console.log('😂category id is ', categoryId);
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
  console.log('😊category is :', existingFavorite);
  let result;
  let message;

  if (existingFavorite) {
    // Remove from favorites
    await Favorite.findByIdAndDelete(existingFavorite._id);
    result = null;
    message = req.t(`successes:removeFavorite`);
  } else {
    // Add to favorites
    console.log('😐iam here');

    result = await Favorite.create({
      user: userId,
      type: targetType,
      referenceId: targetField,
    });
    message = req.t(`successes:addFavorite`);
    console.log('😊result is ', result);
  }
  console.log('😋 Iam here also');
  res.status(200).json({
    status: req.t(`fields:success`),
    message,
    data: {
      data: result,
    },
  });
});

// Get all favorites for current user (auctions and tenders and categorys)
exports.getUserFavorites = catchAsync(async (req, res, next) => {
  const query = Favorite.find({ user: req.user.id }).populate('user');
  console.log('query', query.length);
  console.log('user id ', req.user.name);
  
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  const favorites = await features.query;
  
  // Separate auction and tender IDs
  const auctionIds = [];
  const tenderIds = [];
  const categoryIds = [];
  
  favorites.forEach((favorite) => {
    if (favorite.type === 'auction') {
      auctionIds.push(favorite.referenceId);
    } else if (favorite.type === 'tender') {
      tenderIds.push(favorite.referenceId);
    } else {
      categoryIds.push(favorite.referenceId);
      console.log('😋 Iam here ');
    }
  });
  
  console.log('😅categoryIds', categoryIds);
  
  // Fetch all auctions and tenders and category in parallel with population
  const [auctions, tenders, categories] = await Promise.all([
    auctionIds.length > 0 
      ? Auction.find({ _id: { $in: auctionIds } }).populate({
          path: 'item',
          populate: {
            path: 'category',
            model: 'Category' // Adjust model name as needed
          }
        })
      : [],
    tenderIds.length > 0 
      ? Tender.find({ _id: { $in: tenderIds } }).populate({
          path: 'item',
          populate: {
            path: 'category',
            model: 'Category' // Adjust model name as needed
          }
        })
      : [],
    categoryIds.length > 0 
      ? Category.find({ _id: { $in: categoryIds } }) 
      : [],
  ]);
  
  // Create maps for quick lookup
  const auctionMap = {};
  const tenderMap = {};
  const categoryMap = {};
  
  auctions.forEach((auction) => {
    auctionMap[auction._id.toString()] = auction;
  });
  
  tenders.forEach((tender) => {
    tenderMap[tender._id.toString()] = tender;
  });
  
  categories.forEach((category) => {
    categoryMap[category._id.toString()] = category;
  });
  
  // Attach the populated data
  const populatedFavorites = favorites.map((favorite) => {
  const favoriteObj = favorite.toObject();

  let referenceDoc;
  if (favorite.type === 'auction') {
    referenceDoc = auctionMap[favorite.referenceId.toString()];
  } else if (favorite.type === 'tender') {
    referenceDoc = tenderMap[favorite.referenceId.toString()];
  } else {
    referenceDoc = categoryMap[favorite.referenceId.toString()];
  }

  // Convert to object (to avoid modifying Mongoose doc directly)
  if (referenceDoc) {
    referenceDoc = referenceDoc.toObject ? referenceDoc.toObject() : referenceDoc;
    referenceDoc.favorite = true; // ✅ add favorite field
  }

  favoriteObj.referenceId = referenceDoc;
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
