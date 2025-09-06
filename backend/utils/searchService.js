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

  const words = searchQuery.trim().split(/\s+/);

  // 1. فلترة العناصر (Item)
  const itemFilter = {
    $or: words.flatMap((word) => [
      { name: { $regex: word, $options: 'i' } },
      { description: { $regex: word, $options: 'i' } },
    ]),
  };

  const items = await Item.find(itemFilter).select('_id');
  const itemIds = items.map((item) => item._id);

  let auctions = [];
  let tenders = [];

  const searchType = req.query.type;

  // 2. اجلب باقي الباراميترات غير q و type
  const extraFilters = { ...req.query };
  delete extraFilters.q;
  delete extraFilters.type;

  // 3. فلتر المزايدات
  const auctionFilter = {
    $or: words.flatMap((word) => [
      { auctionTitle: { $regex: word, $options: 'i' } },
      { item: { $in: itemIds } },
    ]),
    ...extraFilters,
  };

  // 4. فلتر المناقصات
  const tenderFilter = {
    $or: words.flatMap((word) => [
      { tenderTitle: { $regex: word, $options: 'i' } },
      { description: { $regex: word, $options: 'i' } },
      { item: { $in: itemIds } },
    ]),
    ...extraFilters,
  };

  if (searchType === 'auctions') {
    auctions = await new APIFeatures(
      Auction.find(auctionFilter).populate('item').populate('user'),
      req.query,
    )
      .sort()
      .limitFields()
      .paginate().query;
  } else if (searchType === 'tenders') {
    tenders = await new APIFeatures(
      Tender.find(tenderFilter).populate('item').populate('user'),
      req.query,
    )
      .sort()
      .limitFields()
      .paginate().query;
  } else {
    auctions = await new APIFeatures(
      Auction.find(auctionFilter).populate('item').populate('user'),
      req.query,
    )
      .sort()
      .limitFields()
      .paginate().query;

    tenders = await new APIFeatures(
      Tender.find(tenderFilter).populate('item').populate('user'),
      req.query,
    )
      .sort()
      .limitFields()
      .paginate().query;
  }

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
