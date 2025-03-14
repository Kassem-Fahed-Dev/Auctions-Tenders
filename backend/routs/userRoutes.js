const express = require('express');
const authController = require('./../controllers/authController.js');
const userController = require('./../controllers/userController.js');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/signup', authController.singUp);
router.post('/login', authController.login);
router
  .delete('/:name', userController.deleteUser)
  .put('/:id', userController.updateInfo);
router.post('/forgotPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.post('/auction', userController.addAuction);

module.exports = router;
