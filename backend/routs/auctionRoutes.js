const express = require('express');
const auctionController = require('../controllers/auctionController');
const authController = require('../controllers/authController');
const router = express.Router();

//router.get('/', auctionController.filterAuctionsByCategory,auctionController.getAllAuctions); // get all auctions

// router.get(
//   '/myAuctions',
//   authController.protect,
//   auctionController.getUserId,
//   auctionController.getAllAuctions,
// ); // get all my auctions

router
  .get('/', auctionController.getAllAuctionsWithItems)
  .post('/',  authController.protect, auctionController.createAuctionWithItem);
router.get(
  '/myAuctions',
  authController.protect,
  auctionController.getUserId,
  auctionController.getAllAuctionsWithItems,
);
router
  .get('/:id', auctionController.getAuctionWithItem)
  .patch('/:id', authController.protect,auctionController.updateAuctionWithItem)
  .delete('/:id', authController.protect,auctionController.deleteAuctionWithItem);
module.exports = router;
