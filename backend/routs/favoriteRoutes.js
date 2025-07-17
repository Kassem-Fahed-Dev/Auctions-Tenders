const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authController = require('../controllers/authController');
const router = express.Router();

// All favorite routes require authentication
router.use(authController.protect);

// Get all favorites for current user
router.get('/', favoriteController.getUserFavorites);

// Toggle favorite status (add/remove)
router.post('/:auctionId', favoriteController.toggleFavorite);

// Check if an auction is favorited
router.get('/check/:auctionId', favoriteController.checkFavorite);

module.exports = router;