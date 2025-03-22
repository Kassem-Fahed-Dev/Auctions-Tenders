const express = require('express');
const auctionController = require('../controllers/auctionController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', auctionController.getAllAuctions); // get all auctions
router.get(
  '/myAuctions',
  authController.protect,
  auctionController.getMyAuctions,
  auctionController.getAllAuctions,
); // get all my auctions
router.get('/:id', auctionController.getAuction); // get specific auction
router.post('/createAuction', auctionController.createAuction); // create auction
router.patch('/:id', auctionController.updateAuction); // update auction
router.delete('/:id', auctionController.deleteAuction); // delete auction

module.exports = router;
