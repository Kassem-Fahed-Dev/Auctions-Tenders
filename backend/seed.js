// generateFakeData.js
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const dotenv = require('dotenv');
dotenv.config({ path: `./config.env` });
// require your models (adjust paths if needed)
const User = require('./models/User');
const Category = require('./models/Category');
const Item = require('./models/Item');
const Auction = require('./models/Auction');
const AuctionBid = require('./models/AuctionBid');
const Tender = require('./models/Tender');
const TenderOffer = require('./models/TenderOffer');
const Wallet = require('./models/Wallet');
const WalletActivity = require('./models/WalletActivity');

const MONGO_URI = process.env.DATABASE_LOCAL || 'mongodb://127.0.0.1:27017/auctiondb';

// counts
const USERS_COUNT = 20;
const CATEGORIES_COUNT = 6;
const ITEMS_COUNT = 30;
const AUCTIONS_COUNT = 20;
const TENDERS_COUNT = 20;

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  await mongoose.connect(process.env.DATABASE_LOCAL);
  console.log('✅ Connected to MongoDB');

  // clear
  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Item.deleteMany(),
    Auction.deleteMany(),
    AuctionBid.deleteMany(),
    Tender.deleteMany(),
    TenderOffer.deleteMany(),
    Wallet.deleteMany(),
    WalletActivity.deleteMany(),
  ]);
  console.log('🧹 Database cleared');

  // ===== USERS =====
  // Create an admin like your example (pre-save hooks should hash password)
  const users = [];

  // admin
  const adminPassword = '123123123';
  const admin = await User.create({
    name: 'admin',
    role: 'admin',
    email: 'admin@gmail.com',
    password: adminPassword,
    passwordConfirm: adminPassword,
    phone: '000000000',
    profileImg: '', // you can set faker image if you want
  });
  users.push(admin);

  // generate other users (ensure we use .create or .save to trigger pre-save hooks)
  for (let i = 1; i < USERS_COUNT; i++) {
    const password = faker.internet.password({ length: 10 });
    const user = await User.create({
      name: faker.person.fullName(),
      role: 'user',
      email: `user${i}@gmail.com`, // guaranteed gmail
      password,
      passwordConfirm: password,
      phone: faker.phone.number('09########'),
      profileImg: faker.image.url(), // random image url
    });
    users.push(user);
  }
  console.log(`👥 ${users.length} users created (including admin)`);

  // ===== CATEGORIES =====
  const categories = [];
  for (let i = 0; i < CATEGORIES_COUNT; i++) {
    const cat = await Category.create({
      type: faker.helpers.arrayElement(['auction', 'tender']),
      name: `${faker.commerce.department()}-${i}`,
      image: faker.image.url(),
      properties: [
        { key: 'color', required: false, dataType: 'string' },
        { key: 'weight', required: false, dataType: 'number' },
      ],
    });
    categories.push(cat);
  }
  console.log(`📂 ${categories.length} categories created`);

  // ===== ITEMS =====
  const items = [];
  for (let i = 0; i < ITEMS_COUNT; i++) {
    const category = randomElement(categories);
    // attach random image(s) — auctions/tenders reference item, so item.photo will give images
    const photos = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
      faker.image.url()
    );

    const item = await Item.create({
      category: category._id,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      photo: photos, // array of random image urls
      video: faker.internet.url(),
      status: faker.helpers.arrayElement(['جديد', 'مستعمل']),
      properties: [{ key: 'brand', value: faker.company.name() }],
    });
    items.push(item);
  }
  console.log(`📦 ${items.length} items created (with random images)`);

  // ===== AUCTIONS =====
  const auctions = [];
  for (let i = 0; i < AUCTIONS_COUNT; i++) {
    const user = randomElement(users);
    const item = randomElement(items);

    // start in recent past or near future, end after start
    const start = faker.date.recent({ days: 7 });
    const end = faker.date.soon({ days: faker.number.int({ min: 3, max: 20 }), refDate: start });

    const auction = await Auction.create({
      user: user._id,
      item: item._id,
      auctionTitle: `${faker.commerce.productName()} Auction`,
      startTime: start,
      endTime: end,
      minimumIncrement: faker.number.int({ min: 5, max: 200 }),
      startingPrice: faker.number.int({ min: 50, max: 1000 }),
      highestPrice: 0,
      numberOfItems: faker.number.int({ min: 1, max: 5 }),
      city: faker.location.city(),
      // NOTE: your Auction schema doesn't have an 'image' field; the Item.photo contains images.
    });

    auctions.push(auction);
  }
  console.log(`🔨 ${auctions.length} auctions created`);

  // ===== AUCTION BIDS =====
  // const bids = [];
  // for (const auction of auctions) {
  //   const count = faker.number.int({ min: 0, max: 6 });
  //   for (let j = 0; j < count; j++) {
  //     const bid = await AuctionBid.create({
  //       user: randomElement(users)._id,
  //       auction: auction._id,
  //       amount: faker.number.int({ min: auction.startingPrice + 1, max: auction.startingPrice + 2000 }),
  //     });
  //     bids.push(bid);
  //   }
  // }
  // console.log(`💸 ${bids.length} auction bids created`);

  // ===== TENDERS =====
  const tenders = [];
  for (let i = 0; i < TENDERS_COUNT; i++) {
    const user = randomElement(users);
    const item = randomElement(items);

    const start = faker.date.recent({ days: 7 });
    const end = faker.date.soon({ days: faker.number.int({ min: 3, max: 20 }), refDate: start });

    const tender = await Tender.create({
      user: user._id,
      item: item._id,
      tenderTitle: `${faker.commerce.productName()} Tender`,
      startTime: start,
      endTime: end,
      startingPrice: faker.number.int({ min: 100, max: 5000 }),
      numberOfItems: faker.number.int({ min: 1, max: 5 }),
      city: faker.location.city(),
      description: faker.commerce.productDescription(),
    });
    tenders.push(tender);
  }
  console.log(`📑 ${tenders.length} tenders created`);

  // ===== TENDER OFFERS =====
  // const offers = [];
  // for (const tender of tenders) {
  //   const count = faker.number.int({ min: 0, max: 6 });
  //   for (let j = 0; j < count; j++) {
  //     const offer = await TenderOffer.create({
  //       user: randomElement(users)._id,
  //       tender: tender._id,
  //       amount: faker.number.int({ min: 1, max: tender.startingPrice || 1000 }),
  //       message: faker.lorem.sentence(),
  //     });
  //     offers.push(offer);
  //   }
  // }
  // console.log(`✉️ ${offers.length} tender offers created`);

  // ===== WALLETS & ACTIVITIES =====
  const wallets = [];
  for (const user of users) {
    const w = await Wallet.create({
      partner: user._id,
      blockedAmount: faker.number.int({ min: 0, max: 500 }),
      availableAmount: faker.number.int({ min: 0, max: 10000 }),
    });
    wallets.push(w);

    // create 0..3 activities per wallet
    // for (let k = 0; k < faker.number.int({ min: 0, max: 3 }); k++) {
    //   await WalletActivity.create({
    //     partner: user._id,
    //     descriptionTransaction: faker.lorem.sentence(),
    //     amount: faker.number.int({ min: 5, max: 2000 }),
    //     status: faker.helpers.arrayElement(['pending', 'completed', 'failed']),
    //   });
    // }
  }
  console.log(`👛 ${wallets.length} wallets and activities created`);

  console.log('✅ Fake data generation finished');
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
