const express = require('express');
const tendersController = require('../controllers/tendersController');
const tenderBidController = require('../controllers/tenderBidController');
const authController = require('../controllers/authController');
const router = express.Router();

// فلترة حسب التصنيف + جلب الكل
router.get(
  '/',
  tendersController.filterTendersByCategory,
  tendersController.getAllTenders,
);

// إنشاء مناقصة
router.post('/', authController.protect, tendersController.createTender);

// جلب مناقصة واحدة
router.get('/:id', tendersController.getTender);

// تحديث مناقصة
router.patch('/:id', authController.protect, tendersController.updateTender);

// حذف مناقصة
router.delete('/:id', authController.protect, tendersController.deleteTender);

// المزايدة على مناقصة
router.post(
  '/placeBid/:id',
  authController.protect,
  tenderBidController.placeBid,
);

module.exports = router;
