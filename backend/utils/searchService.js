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
  // devide the text to separet words
  const words = searchQuery.trim().split(/\s+/);

  // build regex to all word
  const regexArray = words.map((word) => ({
    $regex: word,
    $options: 'i',
  }));

  //searching in item table
  const itemFilter = {
    $or: words.flatMap((word) => [
      { name: { $regex: word, $options: 'i' } },
      { description: { $regex: word, $options: 'i' } },
    ]),
  };

  const items = await Item.find(itemFilter).select('_id');
  const itemIds = items.map((item) => item._id);

  // searching in auctoins
  const auctionFilter = {
    $or: words.flatMap((word) => [
      { auctionTitle: { $regex: word, $options: 'i' } },
      { item: { $in: itemIds } },
    ]),
  };
  console.log('auctonFilter', auctionFilter);

  // searching in tenders
  const tenderFilter = {
    $or: words.flatMap((word) => [
      { tenderTitle: { $regex: word, $options: 'i' } },
      { description: { $regex: word, $options: 'i' } },
      { item: { $in: itemIds } },
    ]),
  };

  // 4. تطبيق APIFeatures على استعلامات Mongoose
  const auctions = await new APIFeatures(
    Auction.find(auctionFilter).populate('item').populate('user'),
    req.query,
  )
    .sort()
    .limitFields()
    .paginate().query;
  const tenders = await new APIFeatures(
    Tender.find(tenderFilter).populate('item').populate('user'),
    req.query,
  )
    .sort()
    .limitFields()
    .paginate().query;

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
