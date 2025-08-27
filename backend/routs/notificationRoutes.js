const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Get notifications for current authenticated user
router.get('/my', notificationController.getMyNotifications);

// Get notifications for a specific user by username
router.get(
  '/user/:username',
  notificationController.getNotificationsByUsername,
);

// Get notification statistics for current user
router.get('/stats', notificationController.getNotificationStats);

// Get specific notification by ID
router.get('/:id', notificationController.getNotification);

// Mark notification as read
router.patch('/:id/read', notificationController.markAsRead);

// Mark all notifications as read for current user
router.patch('/mark-all-read', notificationController.markAllAsRead);

// Delete notification
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
