const cron = require('node-cron');
const Auction = require('../models/Auction')

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const damascusNow = new Date(now.getTime() + 3 * 60 * 60 * 1000); // UTC+3

  try {
    // Update auctions that haven't started yet
    const a = await Auction.updateMany(
      { startTime: { $gt: damascusNow } },
      { $set: { activeStatus: 'قادم' } }
    );
    console.log(a.startTime,damascusNow)
    // Update auctions that are currently active
    await Auction.updateMany(
      { startTime: { $lte: damascusNow }, endTime: { $gte: damascusNow } },
      { $set: { activeStatus: 'جاري' } }
    );

    // Update auctions that have already ended
    await Auction.updateMany(
      { endTime: { $lt: damascusNow } },
      { $set: { activeStatus: 'منتهي' } }
    );

    console.log(`Auction statuses updated at ${damascusNow.toISOString()}`);
  } catch (err) {
    console.error('Failed to update auction statuses:', err);
  }
},{timezone:'Asia/Damascus'});
