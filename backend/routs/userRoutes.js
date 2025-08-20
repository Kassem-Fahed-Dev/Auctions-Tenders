const express = require('express');
const authController = require('./../controllers/authController.js');
const userController = require('./../controllers/userController.js');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.protect, authController.logout);
router.get('/checkLogin', authController.protect, authController.checkLogin);

router.post('/forgotPassword', authController.forgotPassword);
router.post('/checkResetCode', authController.checkResetCode);
router.patch('/resetPassword', authController.resetPassword);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser,
);
//router.use(authController.protect);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

//router.use(authController.restrictTo('admin'));

router
.route('/:id')
.patch(authController.protect,authController.restrictTo('admin'),userController.updateUser)
.delete(authController.protect,authController.restrictTo('admin'),userController.deleteUser)
.get(userController.getUser);

module.exports = router;
