const express = require('express');
const tenderController = require('../controllers/tenderController');
const tenderOfferController = require('../controllers/tenderOfferController');
const authController = require('../controllers/authController');
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
    tenderController.updateTenderWithItem,
  )
  .delete(
    '/:id',
    authController.protect,
    tenderController.deleteTenderWithItem,
  );

router.post(
  '/submitOffer/:id',
  authController.protect,
  tenderOfferController.submitOffer,
);

module.exports = router; 