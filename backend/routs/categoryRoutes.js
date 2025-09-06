const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');
const upload = require('../middleware/upload');
const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    upload.single('image'),
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.createCategory,
  );
router
  .get('/:id', categoryController.getCategory)
  .patch(
    '/:id',
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.updateCategory,
  )
  .delete(
    '/:id',
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.deleteCategory,
  );

module.exports = router;
