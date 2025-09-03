const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authController = require('../controllers/authController');
const router = express.Router();

// All favorite routes require authentication
router.use(authController.protect);

// Get all favorites for current user
router.get('/', favoriteController.getUserFavorites);

// Toggle favorite status (add/remove) for auction
router.post('/auction/:auctionId', favoriteController.toggleFavorite);
// Toggle favorite status (add/remove) for tender
router.post('/tender/:tenderId', favoriteController.toggleFavorite);
// Toggle favorite status (add/remove) for category
router.post('/category/:categoryId', favoriteController.toggleFavorite);
// Check if an auction is favorited
router.get('/auction/check/:auctionId', favoriteController.checkFavorite);
// Check if a tender is favorited
router.get('/tender/check/:tenderId', favoriteController.checkFavorite);

module.exports = router;
