const express = require('express');
const authController = require('./../controllers/authController.js');
const userController = require('./../controllers/userController.js');
const router = express.Router();

router.get('/' ,userController.getAllUsers);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/:id',userController.getUser)

//router.use(authController.protect);

router.patch('/updateMyPassword', authController.protect,authController.updatePassword);
router.get('/me', authController.protect,userController.getMe, userController.getUser);
router.patch('/updateMe', authController.protect,userController.updateMe);
router.delete('/deleteMe', authController.protect,userController.deleteMe);

//router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
