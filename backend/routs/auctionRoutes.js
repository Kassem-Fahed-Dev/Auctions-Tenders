const express = require('express');
const auctionController = require('../controllers/auctionController');
const router = express.Router();

router.post('/createAuction', auctionController.addAuction);
router.delete('/:id', auctionController.deleteAuction); // id-> AuctionId
router.get('/:id', auctionController.getAllUserAuctions); // id-> UserId

module.exports = router;
