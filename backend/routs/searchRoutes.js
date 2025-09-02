const express = require('express');
const authController = require('../controllers/authController');
const searchService = require('../utils/searchService');

const router = express.Router();

router.use(authController.protect);

router.get('/', searchService.unifiedSearch);

module.exports = router;
