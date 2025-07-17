const Tenders = require('../models/Tenders');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Category = require('../models/Category');

// 1. CREATE Tender
exports.createTender = catchAsync(async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return next(new Error('User not authenticated or missing ID.'));
  }
  const newTender = await Tenders.create({
    ...req.body,
    user: req.user.id,
    category: req.body.category || undefined,
  });
  res.status(201).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:createTender`),
    data: {
      tender: newTender,
    },
  });
});

// 2. GET Tender by ID
exports.getTender = catchAsync(async (req, res, next) => {
  const tender = await Tenders.findById(req.params.id);
  if (!tender) {
    return next(new AppError('No tender found with that ID', 404));
  }
  res.status(200).json({
    status: req.t(`fields:success`),
    data: {
      tender,
    },
  });
});

// 3. UPDATE Tender
exports.updateTender = catchAsync(async (req, res, next) => {
  const tender = await Tenders.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tender) {
    return next(new AppError('No tender found with that ID', 404));
  }
  res.status(200).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:updateTender`),
    data: {
      tender,
    },
  });
});

// 4. DELETE Tender
exports.deleteTender = catchAsync(async (req, res, next) => {
  const tender = await Tenders.findByIdAndDelete(req.params.id);
  if (!tender) return next(new AppError('No tender found with that ID', 404));
  res.status(204).json({
    status: req.t(`fields:success`),
    message: req.t(`successes:deleteTender`),
    data: null,
  });
});

// 5. GET All Tenders
exports.getAllTenders = catchAsync(async (req, res, next) => {
  let filterTendersByCategory = {};
  if (req.tenderCategoryFilter)
    filterTendersByCategory = req.tenderCategoryFilter;
  const features = new APIFeatures(
    Tenders.find(filterTendersByCategory),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tenders = await features.query;
  res.status(200).json({
    status: req.t(`fields:success`),
    result: tenders.length,
    data: {
      tenders,
    },
  });
});

// فلترة المناقصات حسب التصنيف
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
  if (!category) {
    req.tenderCategoryFilter = { category: null };
    return next();
  }
  req.tenderCategoryFilter = { category: category._id };
  next();
});
