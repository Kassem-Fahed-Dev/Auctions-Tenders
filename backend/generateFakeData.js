// seed.js
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const dotenv = require('dotenv');
dotenv.config({ path: `./config.env` });
// Import models
const User = require("./models/User"); // you should have user model
const Auction = require("./models/Auction");
const AuctionBid = require("./models/AuctionBid");
const Category = require("./models/Category");
const Favorite = require("./models/Favorite");
const Item = require("./models/Item");
const Tender = require("./models/Tender");
const TenderOffer = require("./models/TenderOffer");
const Wallet = require("./models/Wallet");
const WalletActivity = require("./models/WalletActivity");

// ====== CONFIG ======
const MONGO_URI = "mongodb://127.0.0.1:27017/auctiondb";
const USERS_COUNT = 10;
const CATEGORIES_COUNT = 5;
const ITEMS_COUNT = 20;
const AUCTIONS_COUNT = 10;
const TENDERS_COUNT = 5;

// ====== HELPER FUNCTIONS ======
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function seed() {
  await mongoose.connect(process.env.DATABASE_LOCAL);
  console.log("✅ Connected to MongoDB");

  // Clear existing data
  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Item.deleteMany(),
    Auction.deleteMany(),
    AuctionBid.deleteMany(),
    Tender.deleteMany(),
    TenderOffer.deleteMany(),
    Favorite.deleteMany(),
    Wallet.deleteMany(),
    WalletActivity.deleteMany(),
  ]);
  console.log("🧹 Database cleared");

  // ====== USERS ======
// ====== USERS ======
const users = [];
for (let i = 0; i < USERS_COUNT; i++) {
  const password = faker.internet.password({ length: 10 });
  users.push(
    new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(), // ✅ add phone
      password: password, // ✅ add password
      passwordConfirm: password, // ✅ confirm password
    })
  );
}
await User.insertMany(users);
console.log(`👤 ${users.length} Users created`);

  // ====== CATEGORIES ======
  const categories = [];
  for (let i = 0; i < CATEGORIES_COUNT; i++) {
    categories.push(
      new Category({
        type: faker.helpers.arrayElement(["auction", "tender"]),
        name: faker.commerce.department() + "-" + i,
        image: faker.image.url(),
        properties: [
          { key: "color", required: false, dataType: "string" },
          { key: "weight", required: false, dataType: "number" },
        ],
      })
    );
  }
  await Category.insertMany(categories);
  console.log(`📂 ${categories.length} Categories created`);

  // ====== ITEMS ======
  const items = [];
  for (let i = 0; i < ITEMS_COUNT; i++) {
    const category = randomElement(categories);
    items.push(
      new Item({
        category: category._id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        photo: [faker.image.url()],
        video: faker.internet.url(),
        status: faker.helpers.arrayElement(["جديد", "مستعمل"]),
        properties: [{ key: "brand", value: faker.company.name() }],
      })
    );
  }
  await Item.insertMany(items);
  console.log(`📦 ${items.length} Items created`);

  // ====== AUCTIONS ======
  const auctions = [];
  for (let i = 0; i < AUCTIONS_COUNT; i++) {
    const user = randomElement(users);
    const item = randomElement(items);

    const start = faker.date.recent({ days: 5 });
    const end = faker.date.soon({ days: 10 });

    auctions.push(
      new Auction({
        user: user._id,
        item: item._id,
        auctionTitle: faker.commerce.productName() + " Auction",
        startTime: start,
        endTime: end,
        minimumIncrement: faker.number.int({ min: 10, max: 100 }),
        startingPrice: faker.number.int({ min: 100, max: 1000 }),
        highestPrice: faker.number.int({ min: 1000, max: 2000 }),
        numberOfItems: faker.number.int({ min: 1, max: 5 }),
        city: faker.location.city(),
      })
    );
  }
  await Auction.insertMany(auctions);
  console.log(`🔨 ${auctions.length} Auctions created`);

  // ====== AUCTION BIDS ======
  const bids = [];
  auctions.forEach((auction) => {
    for (let i = 0; i < faker.number.int({ min: 1, max: 5 }); i++) {
      bids.push(
        new AuctionBid({
          user: randomElement(users)._id,
          auction: auction._id,
          amount: faker.number.int({ min: 200, max: 2000 }),
        })
      );
    }
  });
  await AuctionBid.insertMany(bids);
  console.log(`💰 ${bids.length} Bids created`);

  // ====== TENDERS ======
  const tenders = [];
  for (let i = 0; i < TENDERS_COUNT; i++) {
    const user = randomElement(users);
    const item = randomElement(items);

    const start = faker.date.recent({ days: 5 });
    const end = faker.date.soon({ days: 10 });

    tenders.push(
      new Tender({
        user: user._id,
        item: item._id,
        tenderTitle: faker.commerce.productName() + " Tender",
        startTime: start,
        endTime: end,
        startingPrice: faker.number.int({ min: 500, max: 5000 }),
        numberOfItems: faker.number.int({ min: 1, max: 5 }),
        city: faker.location.city(),
        description: faker.commerce.productDescription(),
      })
    );
  }
  await Tender.insertMany(tenders);
  console.log(`📑 ${tenders.length} Tenders created`);

  // ====== TENDER OFFERS ======
  const offers = [];
  tenders.forEach((tender) => {
    for (let i = 0; i < faker.number.int({ min: 1, max: 5 }); i++) {
      offers.push(
        new TenderOffer({
          user: randomElement(users)._id,
          tender: tender._id,
          amount: faker.number.int({ min: 100, max: tender.startingPrice }),
          message: faker.lorem.sentence(),
        })
      );
    }
  });
  await TenderOffer.insertMany(offers);
  console.log(`📨 ${offers.length} TenderOffers created`);

  // ====== WALLETS ======
  const wallets = users.map(
    (user) =>
      new Wallet({
        partner: user._id,
        blockedAmount: faker.number.int({ min: 0, max: 500 }),
        availableAmount: faker.number.int({ min: 100, max: 5000 }),
      })
  );
  await Wallet.insertMany(wallets);
  console.log(`👛 ${wallets.length} Wallets created`);

  // ====== WALLET ACTIVITIES ======
  const walletActivities = [];
  wallets.forEach((wallet) => {
    for (let i = 0; i < faker.number.int({ min: 1, max: 3 }); i++) {
      walletActivities.push(
        new WalletActivity({
          partner: wallet.partner,
          descriptionTransaction: faker.lorem.sentence(),
          amount: faker.number.int({ min: 10, max: 500 }),
          status: faker.helpers.arrayElement([
            "pending",
            "completed",
            "failed",
          ]),
        })
      );
    }
  });
  await WalletActivity.insertMany(walletActivities);
  console.log(`📊 ${walletActivities.length} WalletActivities created`);

  console.log("✅ Fake data seeding completed!");
  mongoose.disconnect();
}

seed().catch((err) => console.error(err));
