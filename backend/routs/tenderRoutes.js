const express = require('express');
const checkOwnerOrAdmin = require('../utils/checkOwnerOrAdmin');
const tenderController = require('../controllers/tenderController');
const tenderOfferController = require('../controllers/tenderOfferController');
const authController = require('../controllers/authController');
const Tender = require('../models/Tender');
const router = express.Router();

router
  .get(
    '/',
    authController.protect,
    tenderController.filterTendersByCategory,
    tenderController.getAllTendersWithItems,
  )
  .post('/', authController.protect, tenderController.createTenderWithItem);

router.get(
  '/myTenders',
  authController.protect,
  tenderController.filterTendersByCategory,
  tenderController.getUserId,
  tenderController.getMyTenders,
);

router
  .get('/:id', tenderController.getTenderWithItem)
  .patch(
    '/:id',
    authController.protect,
    checkOwnerOrAdmin(Tender, 'user'),
    tenderController.updateTenderWithItem,
  )
  .delete(
    '/:id',
    authController.protect,
    checkOwnerOrAdmin(Tender, 'user'),
    tenderController.deleteTenderWithItem,
  );

router.post(
  '/submitOffer/:id',
  authController.protect,
  tenderOfferController.submitOffer,
);

module.exports = router; 