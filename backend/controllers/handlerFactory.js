const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const { modelName } = require('../models/Auction');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    let modelName = Model.modelName;
    modelName = modelName.toLowerCase();

    if (!doc) {
      return next(
        new AppError(
          req.t(`errors:notFound`, { doc: req.t(`fields:${modelName}`) }),
          404,
        ),
      );
    }

    res.status(204).json({
      status: req.t(`fields:success`),
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400,
        ),
      );
    }
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    let modelName = Model.modelName;
    modelName = modelName.toLowerCase();
    if (!doc) {
      return next(
        new AppError(
          req.t(`errors:notFound`, { doc: req.t(`fields:${modelName}`) }),
          404,
        ),
      );
    }

    res.status(200).json({
      status: req.t(`fields:success`),
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get('host')}/uploads/categories/${req.file.filename}`;
    }

    const doc = await Model.create(req.body);

    res.status(201).json({
      status: req.t(`fields:success`),
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    let modelName = Model.modelName;
    modelName = modelName.toLowerCase();
    if (!doc) {
      return next(
        new AppError(
          req.t(`errors:notFound`, { doc: req.t(`fields:${modelName}`) }),
          404,
        ),
      );
    }

    res.status(200).json({
      status: req.t(`fields:success`),
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.userId) filter = { user: req.params.userId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: req.t(`fields:success`),
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
