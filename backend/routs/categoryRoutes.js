const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .get('/', categoryController.getAllCategories)
  .post('/',authController.protect,authController.restrictTo('admin'),categoryController.createCategory);
router
  .get('/:id', categoryController.getCategory)
  .patch('/:id', authController.protect,authController.restrictTo('admin'),categoryController.updateCategory)
  .delete('/:id', authController.protect,authController.restrictTo('admin'),categoryController.deleteCategory);

module.exports = router;
