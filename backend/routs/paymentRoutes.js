const express = require('express');
const walletController = require('../controllers/walletController');
const authController = require('../controllers/authController');
const router = express.Router();

// Protect all routes - only authenticated users
router.use(authController.protect);

// User routes
router.post('/deposit', walletController.depositRequest);
router.post('/withdraw', walletController.withdrawRequest);

// Admin routes for deposit management
router.patch(
  '/deposit/approve/:activityId',
  authController.restrictTo('admin'),
  walletController.approveDeposit,
);
router.patch(
  '/deposit/reject/:activityId',
  authController.restrictTo('admin'),
  walletController.rejectDeposit,
);

// Admin routes for withdrawal management
router.patch(
  '/withdraw/complete/:activityId',
  authController.restrictTo('admin'),
  walletController.completeWithdrawal,
);
router.patch(
  '/withdraw/fail/:activityId',
  authController.restrictTo('admin'),
  walletController.failWithdrawal,
);

router.get(
  '/walletActivities',
  authController.restrictTo('admin'),
  walletController.getAllWalletActivities,
);

router.get('');
module.exports = router;
