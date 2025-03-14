const User = require('./../models/User');
const Auctios = require('./../models/Auctions');
const catchAsync = require('./../utils/catchAsync');
const Auctions = require('./../models/Auctions');

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
    await user.remove(); // to enable pre('remove')
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
exports.addAuction = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log('auction data', data);
  const newAuction = Auctions.create({
    userId: data.userId,
    itemId: data.itemId,
    auctionTtile: data.auctionTtile,
    startTime: data.startTime,
    endTime: data.endTime,
    minimumIncrement: data.minimumIncrement,
    startingPrice: data.startingPrice,
    highestPrice: data.highestPrice,
  })
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'the auction not created',
        error,
      });
    });
});
