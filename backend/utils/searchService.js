const Auction = require('../models/Auction');
const Tender = require('../models/Tender');
const Favorite = require('../models/Favorite');
const AuctionBid = require('../models/AuctionBid');
const TenderOffer = require('../models/TenderOffer');
const APIFeatures = require('./apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.unifiedSearch = catchAsync(async (req, res) => {
  const { q: searchQuery, type: searchType, ...extraFilters } = req.query;
  if (!searchQuery) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Please provide a search query' });
  }

  const words = searchQuery.trim().split(/\s+/);
  const textSearch = {
    $or: words.flatMap((word) => [
      { auctionTitle: { $regex: word, $options: 'i' } },
      { tenderTitle: { $regex: word, $options: 'i' } },
      { description: { $regex: word, $options: 'i' } },
    ]),
  };

  let auctionFilter = {},
    tenderFilter = {};

  switch (searchType) {
    case 'favorites': {
      const favorites = await Favorite.find({ user: req.user.id });
      auctionFilter._id = {
        $in: favorites
          .filter((f) => f.type === 'auction')
          .map((f) => f.referenceId),
      };
      tenderFilter._id = {
        $in: favorites
          .filter((f) => f.type === 'tender')
          .map((f) => f.referenceId),
      };
      break;
    }
    case 'participant': {
      const bids = await AuctionBid.find({ user: req.user.id }).select(
        'auction',
      );
      const offers = await TenderOffer.find({ user: req.user.id }).select(
        'tender',
      );
      auctionFilter._id = { $in: bids.map((b) => b.auction) };
      tenderFilter._id = { $in: offers.map((o) => o.tender) };
      break;
    }
    case 'my': {
      auctionFilter.user = tenderFilter.user = req.user.id;
      break;
    }
  }

  const applyFilters = (filter) =>
    !searchType || ['auctions', 'tenders'].includes(searchType)
      ? { ...filter, ...textSearch, ...extraFilters }
      : { ...filter, ...textSearch };

  auctionFilter = applyFilters(auctionFilter);
  tenderFilter = applyFilters(tenderFilter);

  const fetchData = (Model, filter) =>
    new APIFeatures(Model.find(filter).populate('item user'), req.query)
      .sort()
      .limitFields()
      .paginate().query;

  const auctions = ['tenders'].includes(searchType)
    ? []
    : await fetchData(Auction, auctionFilter);
  const tenders = ['auctions'].includes(searchType)
    ? []
    : await fetchData(Tender, tenderFilter);

  res.status(200).json({
    status: 'success',
    results: { auctionsCount: auctions.length, tendersCount: tenders.length },
    data: { auctions, tenders },
  });
});
