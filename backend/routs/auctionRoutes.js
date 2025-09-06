const express = require('express');
const auctionController = require('../controllers/auctionController');
const auctionBidController = require('../controllers/auctionBidController');
const authController = require('../controllers/authController');
const checkOwnerOrAdmin = require('../utils/checkOwnerOrAdmin');
const Auction = require('../models/Auction');
const router = express.Router();

router.get(
  '/',
  authController.protect,
  auctionController.filterAuctionsByCategory,
  auctionController.getAllAuctionsWithItems,
);
router.get(
  '/auctionParticipants/:id',
  authController.protect,
  auctionController.getAuctionParticipants,
);
router
  .get(
    '/participateAuctions',
    authController.protect,
    auctionController.filterAuctionsByCategory,
    auctionController.getUserParticipateAuctions,
  )
  .post('/', authController.protect, auctionController.createAuctionWithItem);
router.get(
  '/myAuctions',
  authController.protect,
  auctionController.filterAuctionsByCategory,
  auctionController.getUserId,
  auctionController.getMyAuctions,
);
router
  .get('/:id', auctionController.getAuctionWithItem)
  .patch(
    '/:id',
    authController.protect,
    checkOwnerOrAdmin(Auction, 'user'),
    auctionController.updateAuctionWithItem,
  )
  .delete(
    '/:id',
    authController.protect,
    checkOwnerOrAdmin(Auction, 'user'),
    auctionController.deleteAuctionWithItem,
  );

router.post(
  '/placeBid/:id',
  authController.protect,
  auctionBidController.placeBid,
);
module.exports = router;
