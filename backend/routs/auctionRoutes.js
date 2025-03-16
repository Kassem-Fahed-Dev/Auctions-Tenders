const express = require('express');
const auctionController = require('../controllers/auctionController');
const router = express.Router();

router.post('/createAuction', auctionController.addAuction);

module.exports = router;
