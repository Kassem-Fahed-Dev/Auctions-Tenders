const Tender = require('../models/Tender');
const Item = require('../models/Item');
const Category = require('../models/Category');
const Favorite = require('../models/Favorite');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

// Filter tenders by category
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

// middleware to add userId to query parameters
exports.getUserId = (req, res, next) => {
  req.params.userId = req.user.id;
  next();
};

// 1. CREATE Tender + Item
exports.createTenderWithItem = catchAsync(async (req, res, next) => {
  let newItem = null;
  let newTender = null;
  try {
    newItem = new Item({
      ...req.body.item,
      tender: null,
    });
    newTender = new Tender({
      ...req.body.tender,
      user: req.user.id,
      item: newItem._id,
    });
    newItem.tender = newTender._id;
    await newItem.save();
    await newTender.save();
    const populatedTender = await Tender.findById(newTender._id)
      .populate('item')
      .populate('user');
    res.status(201).json({
      status: req.t(`fields:success`),
      message: req.t(`successes:createTender`),
      data: {
        populatedTender,
      },
    });
  } catch (err) {
    if (newTender) await Tender.findByIdAndDelete({ _id: newTender._id });
    if (newItem) await Item.findByIdAndDelete({ _id: newItem._id });
    return next(new AppError(err, 400));
  }
});

// 2. GET Tender + Item
exports.getTenderWithItem = catchAsync(async (req, res, next) => {
  const tender = await Tender.findById(req.params.id)
    .populate('item')
    .populate('user');
  if (!tender) {
    return next(
      new AppError(
        req.t(`errors:notFound`, { doc: req.t(`fields:tender`) }),
        404,
      ),
    );
  }
  res.status(200).json({
    status: req.t(`fields:success`),
    data: {
      data: tender,
    },
  });
});

// 3. UPDATE Tender + Item
exports.updateTenderWithItem = catchAsync(async (req, res, next) => {
  const tender = await Tender.findByIdAndUpdate(
    req.params.id,
    req.body.tender,
    { new: true, runValidators: true },
  );
  if (!tender) {
    return next(
      new AppError(
        req.t(`errors:notFound`, { doc: req.t(`fields:tender`) }),
        404,
      ),
    );
  }
  if (req.body.item) {
    await Item.findByIdAndUpdate(tender.item, req.body.item, {
      new: true,
      runValidators: true,
    });
  }
  const tenderAndItem = await Tender.findById(req.params.id).populate('item');
  res.status(200).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:updateTender`),
    data: {
      data: tenderAndItem,
    },
  });
});

// 4. DELETE Tender + Item
exports.deleteTenderWithItem = catchAsync(async (req, res, next) => {
  const tender = await Tender.findById(req.params.id);
  if (!tender)
    return next(
      new AppError(
        req.t(`errors:notFound`, { doc: req.t(`fields:tender`) }),
        404,
      ),
    );
  await Item.findByIdAndDelete(tender.item);
  await Tender.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:deleteTender`),
    data: null,
  });
});

// Get All Tenders + Items
exports.getAllTendersWithItems = catchAsync(async (req, res, next) => {
  let filterTendersByCategory = {};
  if (req.itemTender) filterTendersByCategory = req.itemTender;
  req.itemTender = undefined;
  const query = Tender.find(filterTendersByCategory)
    .populate('item')
    .populate('user');
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tenders = await features.query;
  // Check favorites
  const tenderIds = tenders.map((tender) => tender._id);
  const favorites = await Favorite.find({
    user: req.user.id,
    type: 'tender',
    referenceId: { $in: tenderIds },
  });
    const favoritedTenderIds = new Set(
    favorites.map((fav) => fav.referenceId.toString()),
  );
  // Add favorite field to each auction
  const updatedTenders = tenders.map((auction) => {
    const plainTender = auction.toObject();
    plainTender.favorite = favoritedTenderIds.has(
      plainTender._id.toString(),
    );
    return plainTender;
  });

  res.status(200).json({
    status: req.t(`fields:success`),
    result: updatedTenders.length,
    data: {
      data: updatedTenders,
    },
  });
});

// Get my tenders
exports.getMyTenders = catchAsync(async (req, res, next) => {
  let filterTendersByCategory = {};
  if (req.itemTender) filterTendersByCategory = req.itemTender;
  req.itemTender = undefined;
  filterTendersByCategory.user = req.user.id;
  const query = Tender.find(filterTendersByCategory)
    .populate('item')
    .populate('user');
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tenders = await features.query;
  const tenderIds = tenders.map((tender) => tender._id);
  const favorites = await Favorite.find({
    user: req.user.id,
    tender: { $in: tenderIds },
  });
  const favoritedTenderIds = new Set(
    favorites.map((fav) => fav.tender.toString()),
  );
  tenders.forEach((tender) => {
    tender = tender.toObject();
    tender.favorite = favoritedTenderIds.has(tender._id.toString());
    return tender;
  });
  res.status(200).json({
    status: req.t(`fields:success`),
    result: tenders.length,
    data: {
      data: tenders,
    },
  });
});
