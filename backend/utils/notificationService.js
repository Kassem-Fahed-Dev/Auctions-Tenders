const Notification = require('../models/Notification');

exports.createNotification = async ({
  userId,
  title,
  message,
  type,
  referenceId,
}) => {
  return Notification.create({
    user: userId,
    title,
    message,
    type,
    referenceId,
  });
};
