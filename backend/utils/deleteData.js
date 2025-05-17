const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Auction = require('../models/Auction');
const User = require('../models/User');
const Item = require('../models/Item');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
      serverSelectionTimeoutMS: 300000
  })
  .then(() => console.log('DB connection successful!'));

//READ JSON FILE
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );

// // IMPORT DATA INTO DB
// const importData = async () => {
//   try {
//     await Tour.create(tours);
//     await User.create(users, { validateBeforeSave: false });
//     await Review.create(reviews);
//     console.log('Data successfully loaded!');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Auction.deleteMany();
    //await User.deleteMany();
    await Item.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
