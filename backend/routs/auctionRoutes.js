const express = require('express');
const auctionController = require('../controllers/auctionController');
const auctionBidController = require('../controllers/auctionBidController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .get(
    '/',
    auctionController.filterAuctionsByCategory,
    auctionController.getAllAuctionsWithItems,
  )
  .post('/', authController.protect, auctionController.createAuctionWithItem);
router.get(
  '/myAuctions',
  authController.protect,
  auctionController.filterAuctionsByCategory,
  auctionController.getUserId,
  auctionController.getAllAuctionsWithItems,
);
router
  .get('/:id', auctionController.getAuctionWithItem)
  .patch(
    '/:id',
    authController.protect,
    auctionController.updateAuctionWithItem,
  )
  .delete(
    '/:id',
    authController.protect,
    auctionController.deleteAuctionWithItem,
  );

router.post(
  '/placeBid/:id',
  authController.protect,
  auctionBidController.placeBid,
);
module.exports = router;
