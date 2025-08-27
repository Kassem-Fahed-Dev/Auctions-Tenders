const Notification = require('../models/Notification');
const User = require('../models/User');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

// Get all notifications for a specific user by username
exports.getNotificationsByUsername = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  // Find user by username
  const user = await User.findOne({ name: username });
  if (!user) {
    return next(
      new AppError(`User with username '${username}' not found`, 404),
    );
  }

  // Get notifications for this user
  const query = Notification.find({ user: user._id })
    .populate('user', 'name email')
    .sort({ createdAt: -1 }); // Most recent first

  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const notifications = await features.query;

  res.status(200).json({
    status: 'success',
    result: notifications.length,
    data: {
      data: notifications,
    },
  });
});

// Get all notifications for current authenticated user
exports.getMyNotifications = catchAsync(async (req, res, next) => {
  const query = Notification.find({ user: req.user.id })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const notifications = await features.query;

  res.status(200).json({
    status: 'success',
    result: notifications.length,
    data: {
      data: notifications,
    },
  });
});

// Get notification by ID
exports.getNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id).populate(
    'user',
    'name email',
  );

  if (!notification) {
    return next(new AppError('Notification not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: notification,
    },
  });
});

// Mark notification as read
exports.markAsRead = catchAsync(async (req, res, next) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true, runValidators: true },
  );

  if (!notification) {
    return next(new AppError('Notification not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: notification,
    },
  });
});

// Mark all notifications as read for current user
exports.markAllAsRead = catchAsync(async (req, res, next) => {
  await Notification.updateMany(
    { user: req.user.id, read: false },
    { read: true },
  );

  res.status(200).json({
    status: 'success',
    message: 'All notifications marked as read',
  });
});

// Delete notification
exports.deleteNotification = catchAsync(async (req, res, next) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);

  if (!notification) {
    return next(new AppError('Notification not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Get notification statistics for current user
exports.getNotificationStats = catchAsync(async (req, res, next) => {
  const totalNotifications = await Notification.countDocuments({
    user: req.user.id,
  });
  const unreadNotifications = await Notification.countDocuments({
    user: req.user.id,
    read: false,
  });

  res.status(200).json({
    status: 'success',
    data: {
      total: totalNotifications,
      unread: unreadNotifications,
      read: totalNotifications - unreadNotifications,
    },
  });
});
