const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});


exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ name: req.params.name });
  if (user) {
      User.deleteOne({ name: req.params.name })
          .exec()
          .then((result) => {
              res.status(200).json({ message: 'User deleted' });
          })
          .catch((err) => {
              console.log(err);
              res.status(500).json({ error: err });
          });
  } else {
      console.log('User not exist');
      res.status(500).json({ message: 'User not exist' });
  }
});
exports.updateInfo = async (req, res, next) => {
  const userId = req.params.id;
  const updateData = req.body;
  User.findByIdAndUpdate(userId, updateData, { new: true })
      .exec()
      .then((updatedUser) => {
          if (!updatedUser) {
              return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json({ message: 'User info updatd', user: updatedUser });
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
      });
};

