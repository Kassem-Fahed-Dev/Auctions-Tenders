const AppError = require('./../utils/appError');

const handleCastErrorDB = (req,err) => {
  const message = req.t(`errors:invlaidCast`,{path:err.path,value:err.value})
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (req,err) => {
  const field = req.t(`fields:${Object.keys(err.keyValue)[0]}`);
  const value = req.t(`fields:${Object.values(err.keyValue)[0]}`);
  const message = req.t('errors:duplicateField',{field,value})
  return new AppError(message, 400);
};

const handleValidationErrorDB = (req,err) => {
  console.log(err.errors)
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = req.t(`errors:validationFailed`,{errors:errors.join('. ')});
  return new AppError(message, 400);
};

const handleJWTError = (req) =>
  new AppError(req.t(`errors:invalidToken`), 401);

const handleJWTExpiredError = (req) =>
  new AppError(req.t(`errors:expiredToken`), 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: req.t(`fields:${err.status}`),
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: req.t('errors:genericError'),
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') err = handleCastErrorDB(req,err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(req,err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(req,err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError(req);
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError(req);

    sendErrorProd(err, req, res);
  }
};
