const Tender = require('../models/Tender');
const Item = require('../models/Item');
const Category = require('../models/Category');
const Favorite = require('../models/Favorite');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const TenderOffer = require('../models/TenderOffer');
const notificationService = require('../utils/notificationService');
const Wallet = require('../models/Wallet');
// Helper function to add favorites to tenders
const addFavoritesToTenders = async (tenders, userId) => {
  const tenderIds = tenders.map((tender) => tender._id);

  const favorites = await Favorite.find({
    user: userId,
    type: 'tender',
    referenceId: { $in: tenderIds },
  });

  const favoritedTenderIds = new Set(
    favorites.map((fav) => fav.referenceId.toString()),
  );

  return tenders.map((tender) => {
    const plainTender = tender.toObject();
    plainTender.favorite = favoritedTenderIds.has(plainTender._id.toString());
    return plainTender;
  });
};

// Helper function to build tender query with filters
const buildTenderQuery = (filters = {}) => {
  return Tender.find(filters).populate({
    path: "item",
    populate: {
      path: "category", // populate category inside item
    },
  })
  .populate("user"); // populate the auction's user;
};

// Helper function to execute query with API features
const executeTenderQuery = async (query, queryParams) => {
  const features = new APIFeatures(query, queryParams)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return await features.query;
};

// Helper function to send tender response
const sendTenderResponse = (res, req, tenders, message = null) => {
  const response = {
    status: req.t('fields:success'),
    result: tenders.length,
    data: { data: tenders },
  };

  if (message) {
    response.message = message;
  }

  res.status(200).json(response);
};

// Helper function to get tenders with favorites
const getTendersWithFavorites = async (filters, queryParams, userId) => {
  const query = buildTenderQuery(filters);
  const tenders = await executeTenderQuery(query, queryParams);
  return await addFavoritesToTenders(tenders, userId);
};

// Helper function to handle category filtering
const applyCategoryFilter = (req, filterProperty) => {
  let filters = {};
  if (req[filterProperty]) {
    filters = req[filterProperty];
  }
  req[filterProperty] = undefined;
  return filters;
};

exports.filterTendersByCategory = catchAsync(async (req, res, next) => {
  const categoryName = req.query.categoryName;
  req.query = (({ categoryName, ...rest }) => rest)(req.query);

  if (!categoryName) {
    return next();
  }

  const category = await Category.findOne({
    type: 'tender',
    name: categoryName,
  });

  const itemsInCategory = await Item.find({ category: category._id });
  const itemIds = itemsInCategory.map((item) => item._id);

  req.itemTender = { item: { $in: itemIds } };
  next();
});

exports.getUserId = (req, res, next) => {
  req.params.userId = req.user.id;
  next();
};

exports.createTenderWithItem = catchAsync(async (req, res, next) => {
  let newItem = null;
  let newTender = null;

  // تحقق من رصيد صاحب المناقصة
  const tenderOwnerWallet = await Wallet.findOne({
    partner: req.user.id,
  });
  console.log('🎆🎆tenderOwnerWallet', tenderOwnerWallet);
  if (
    !tenderOwnerWallet ||
    tenderOwnerWallet.availableAmount < req.body.tender.startingPrice
  ) {
    return next(new AppError(req.t('errors:insufficientBalance'), 400));
  }

  try {
    // Create Item first
    newItem = new Item({
      ...req.body.item,
      tender: null,
    });

    // Create Tender with Item reference
    newTender = new Tender({
      ...req.body.tender,
      user: req.user.id,
      item: newItem._id,
    });

    // Update Item with Tender reference
    newItem.tender = newTender._id;
    await newItem.save();
    await newTender.save();

    const populatedTender = await Tender.findById(newTender._id)
     .populate({
    path: "item",
    populate: {
      path: "category", // populate category inside item
    },
  })
  .populate("user"); // populate the auction's user
    // send notification to user that add category tender to their fav
    try {
      const categoryId = populatedTender.item.category;
      if (categoryId) {
        const category = await Category.findById(categoryId);

        if (category) {
          const favoritedUsers = await Favorite.find({
            referenceId: category._id,
            type: 'category',
          }).populate('user');

          for (const fav of favoritedUsers) {
            await notificationService.createNotification({
              userId: fav.user._id,
              title: 'مفضلتك',
              message: `تم إضافة مناقصة جديدة إلى ${category.name}`,
              type: 'category',
              referenceId: category._id,
            });
            console.log(
              ` Notification sent to favorite user: ${fav.user.name} for new tender in category ${category.name}`,
            );
          }
        }
      }
    } catch (notificationError) {
      console.error(
        'Error sending category favorite notification:',
        notificationError,
      );
    }
    res.status(201).json({
      status: req.t('fields:success'),
      message: req.t('successes:createTender'),
      data: { populatedTender },
    });
  } catch (err) {
    // Cleanup on error
    if (newTender) await Tender.findByIdAndDelete({ _id: newTender._id });
    if (newItem) await Item.findByIdAndDelete({ _id: newItem._id });
    return next(new AppError(err, 400));
  }
});

exports.getTenderWithItem = catchAsync(async (req, res, next) => {
  const tender = await Tender.findById(req.params.id)
    .populate({
    path: "item",
    populate: {
      path: "category", // populate category inside item
    },
  })
  .populate("user"); // populate the auction's user

  if (!tender) {
    return next(
      new AppError(
        req.t('errors:notFound', { doc: req.t('fields:tender') }),
        404,
      ),
    );
  }

  res.status(200).json({
    status: req.t('fields:success'),
    data: { data: tender },
  });
});

exports.updateTenderWithItem = catchAsync(async (req, res, next) => {
  // Remove sensitive fields for non-admin users
  if (req.user.role !== 'admin' && req.body.tender) {
    delete req.body.tender.status;
    delete req.body.tender.activeStatus;
  }

  const tender = await Tender.findByIdAndUpdate(
    req.params.id,
    req.body.tender,
    { new: true, runValidators: true },
  );

  if (!tender) {
    return next(
      new AppError(
        req.t('errors:notFound', { doc: req.t('fields:tender') }),
        404,
      ),
    );
  }

  // Update linked Item if provided
  if (req.body.item) {
    await Item.findByIdAndUpdate(tender.item, req.body.item, {
      new: true,
      runValidators: true,
    });
  }

  const tenderAndItem = await Tender.findById(req.params.id).populate('item');

  res.status(200).json({
    status: req.t('fields:success'),
    message: req.t('successes:updateTender'),
    data: { data: tenderAndItem },
  });
});

exports.deleteTenderWithItem = catchAsync(async (req, res, next) => {
  const tender = await Tender.findById(req.params.id);

  if (!tender) {
    return next(
      new AppError(
        req.t('errors:notFound', { doc: req.t('fields:tender') }),
        404,
      ),
    );
  }

  // Delete linked Item first, then Tender
  await Item.findByIdAndDelete(tender.item);
  await Tender.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: req.t('fields:success'),
    message: req.t('successes:deleteTender'),
    data: null,
  });
});

exports.getAllTendersWithItems = catchAsync(async (req, res, next) => {
  const filters = applyCategoryFilter(req, 'itemTender');
  const tenders = await getTendersWithFavorites(
    filters,
    req.query,
    req.user.id,
  );
  sendTenderResponse(res, req, tenders);
});

exports.getMyTenders = catchAsync(async (req, res, next) => {
  const filters = {
    ...applyCategoryFilter(req, 'itemTender'),
    user: req.user.id,
  };

  const tenders = await getTendersWithFavorites(
    filters,
    req.query,
    req.user.id,
  );
  sendTenderResponse(res, req, tenders);
});

exports.getUserParticipateTenders = catchAsync(async (req, res, next) => {
  const participateTenders = await TenderOffer.find({ user: req.user.id });
  const participateTenderIds = participateTenders.map(
    (participateTender) => participateTender.tender,
  );

  const filters = {
    ...applyCategoryFilter(req, 'itemTender'),
    _id: { $in: participateTenderIds },
  };

  const tenders = await getTendersWithFavorites(
    filters,
    req.query,
    req.user.id,
  );
  sendTenderResponse(res, req, tenders);
});
