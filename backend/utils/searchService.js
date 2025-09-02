const Auction = require('../models/Auction');
const Tender = require('../models/Tender');
const Item = require('../models/Item');
const APIFeatures = require('./apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.unifiedSearch = catchAsync(async (req, res, next) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide a search query',
    });
  }
  console.log('😁Iam here😁');
  console.log('searchQuery', searchQuery);

  const filter = { $regex: searchQuery, $options: 'i' };

  //searching in item table
  const itemFilter = {
    $or: [{ name: filter }, { description: filter }],
  };
  const items = await Item.find(itemFilter).select('_id');
  const itemIds = items.map((item) => item._id);

  // searching in auctoins
  const auctionFilter = {
    $or: [{ auctionTitle: filter }, { item: { $in: itemIds } }],
  };
  console.log('auctonFilter', auctionFilter);

  // searching in tenders
  const tenderFilter = {
    $or: [
      { tenderTitle: filter },
      { description: filter },
      { item: { $in: itemIds } },
    ],
  };

  // 4. تطبيق APIFeatures على استعلامات Mongoose
  const auctions = await new APIFeatures(
    Auction.find(auctionFilter).populate('item').populate('user'),
    req.query,
  ).query;

  const tenders = await new APIFeatures(
    Tender.find(tenderFilter).populate('item').populate('user'),
    req.query,
  ).query;
  res.status(200).json({
    status: 'success',
    results: {
      auctionsCount: auctions.length,
      tendersCount: tenders.length,
    },
    data: {
      auctions,
      tenders,
    },
  });
});
