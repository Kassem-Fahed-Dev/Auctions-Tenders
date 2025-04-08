const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .get('/', categoryController.getAllCategories)
  .post('/', categoryController.createCategory);
router
  .get('/:id', categoryController.getCategory)
  .patch('/:id', categoryController.updateCategory)
  .delete('/:id', categoryController.deleteCategory);

module.exports = router;
