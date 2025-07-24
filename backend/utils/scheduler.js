const cron = require('node-cron');
const Auction = require('../models/Auction');
const AuctionBid = require('../models/AuctionBid');
const notificationService = require('./notificationService');

cron.schedule(
  '* * * * *',
  async () => {
    const now = new Date();
    const damascusNow = new Date(now.getTime() + 3 * 60 * 60 * 1000); // UTC+3

    try {
      // Update auctions that haven't started yet
      await Auction.updateMany(
        { startTime: { $gt: damascusNow } },
        { $set: { activeStatus: 'قادم' } },
      );

      // Update auctions that are currently active
      await Auction.updateMany(
        { startTime: { $lte: damascusNow }, endTime: { $gte: damascusNow } },
        { $set: { activeStatus: 'جاري' } },
      );

      // Find auctions that just ended (were 'جاري' and now should be 'منتهي')
      const endedAuctions = await Auction.find({
        endTime: { $lt: damascusNow },
        activeStatus: { $ne: 'منتهي' },
      });

      for (const auction of endedAuctions) {
        // Get all unique participants (bidders)
        const bids = await AuctionBid.find({ auction: auction._id }).populate(
          'user',
        );
        const participantIds = [
          ...new Set(bids.map((bid) => bid.user.toString())),
        ];

        // Find the highest bid (winner)
        let winnerId = null;
        if (bids.length > 0) {
          const highestBid = bids.reduce(
            (max, bid) => (bid.amount > max.amount ? bid : max),
            bids[0],
          );
          winnerId = highestBid.user.toString();
        }

        // Notify all participants
        for (const userId of participantIds) {
          await notificationService.createNotification({
            userId,
            title: 'انتهاء المزاد',
            message: `انتهى المزاد "${auction.auctionTtile}". ${winnerId === userId ? 'لقد ربحت المزاد!' : 'لم تفز في المزاد.'}`,
            type: 'auction',
            referenceId: auction._id,
          });
        }

        // Notify auction owner
        await notificationService.createNotification({
          userId: auction.user,
          title: 'انتهاء المزاد',
          message: `انتهى مزادك "${auction.auctionTtile}"${winnerId ? `، الفائز هو المستخدم ذو المعرف ${winnerId}` : ''}.`,
          type: 'auction',
          referenceId: auction._id,
        });

        // Update auction status to 'منتهي'
        auction.activeStatus = 'منتهي';
        await auction.save();
      }

      // Update all auctions that have already ended (for consistency)
      await Auction.updateMany(
        { endTime: { $lt: damascusNow } },
        { $set: { activeStatus: 'منتهي' } },
      );

      console.log(`Auction statuses updated at ${damascusNow.toISOString()}`);
    } catch (err) {
      console.error('Failed to update auction statuses:', err);
    }
  },
  { timezone: 'Asia/Damascus' },
);
