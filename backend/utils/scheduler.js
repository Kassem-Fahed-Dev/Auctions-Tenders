const cron = require('node-cron');
const Auction = require('../models/Auction');
const Tender = require('../models/Tender');
const AuctionBid = require('../models/AuctionBid');
const notificationService = require('./notificationService');

// Function to update auction statuses automatically
const updateAuctionStatuses = async () => {
  try {
    const now = new Date();
    console.log(`[${now.toISOString()}] Updating auction statuses...`);

    // 1. Update auctions that should be starting now (قادم -> جاري)
    const startingAuctions = await Auction.updateMany(
      {
        startTime: { $lte: now },
        endTime: { $gt: now },
        activeStatus: { $ne: 'جاري' },
      },
      { $set: { activeStatus: 'جاري' } },
    );

    if (startingAuctions.modifiedCount > 0) {
      console.log(
        ` ${startingAuctions.modifiedCount} auctions started (قادم -> جاري)`,
      );

      const newlyStartedAuctions = await Auction.find({
        startTime: { $lte: now },
        endTime: { $gt: now },
        activeStatus: 'جاري',
      }).populate('user');

      for (const auction of newlyStartedAuctions) {
        await notificationService
          .createNotification({
            userId: auction.user._id,
            title: 'بدأ مزادك!',
            message: `بدأ مزادك "${auction.auctionTitle}" الآن ويمكن للمستخدمين المزايدة عليه`,
            type: 'auction',
            referenceId: auction._id,
          })
          .catch((err) => console.error('Notification error:', err));

        console.log(
          `📢 Notification sent to auction owner: ${auction.user.name}`,
        );
      }
    }

    // 2. Process auctions that should end now
    const auctionsToEnd = await Auction.find({
      endTime: { $lte: now },
      activeStatus: { $ne: 'منتهي' },
    }).populate('user');

    if (auctionsToEnd.length > 0) {
      console.log(`🏁 Found ${auctionsToEnd.length} auctions to end...`);

      for (const auction of auctionsToEnd) {
        try {
          console.log(
            `📧 Processing notifications for auction: ${auction.auctionTitle}`,
          );

          const bids = await AuctionBid.find({ auction: auction._id }).populate(
            'user',
          );
          console.log(
            `📊 Found ${bids.length} bids for auction ${auction.auctionTitle}`,
          );

          if (bids.length > 0) {
            const winner = bids.reduce(
              (max, bid) => (bid.amount > max.amount ? bid : max),
              bids[0],
            );

            console.log(
              `🏆 Winner found: ${winner.user.name} with bid ${winner.amount}`,
            );

            // Notify winner
            await notificationService
              .createNotification({
                userId: winner.user._id,
                title: 'مبروك! لقد ربحت المزاد',
                message: `لقد ربحت المزاد "${auction.auctionTitle}" بمبلغ ${winner.amount}`,
                type: 'auction',
                referenceId: auction._id,
              })
              .catch((err) => console.error('Notification error:', err));

            // Notify owner
            await notificationService
              .createNotification({
                userId: auction.user._id,
                title: 'انتهى مزادك',
                message: `انتهى مزادك "${auction.auctionTitle}"، الفائز: ${winner.user.name}`,
                type: 'auction',
                referenceId: auction._id,
              })
              .catch((err) => console.error('Notification error:', err));

            // Notify others
            const otherBidders = bids.filter(
              (bid) => bid.user._id.toString() !== winner.user._id.toString(),
            );

            for (const bid of otherBidders) {
              await notificationService
                .createNotification({
                  userId: bid.user._id,
                  title: 'انتهى المزاد',
                  message: `انتهى المزاد "${auction.auctionTitle}"، لم تفز هذه المرة`,
                  type: 'auction',
                  referenceId: auction._id,
                })
                .catch((err) => console.error('Notification error:', err));
            }
          } else {
            console.log(`📢 No bids found for auction ${auction.auctionTitle}`);
            await notificationService
              .createNotification({
                userId: auction.user._id,
                title: 'انتهى مزادك بدون مزايدات',
                message: `انتهى مزادك "${auction.auctionTitle}" بدون أي مزايدات`,
                type: 'auction',
                referenceId: auction._id,
              })
              .catch((err) => console.error('Notification error:', err));
          }
        } catch (error) {
          console.error(
            ` Error processing ended auction ${auction._id}:`,
            error,
          );
        }
      }

      // بعد ما خلصنا إشعارات، نحدّث الحالة
      await Auction.updateMany(
        { _id: { $in: auctionsToEnd.map((a) => a._id) } },
        { $set: { activeStatus: 'منتهي' } },
      );

      console.log(`🏁 ${auctionsToEnd.length} auctions updated to منتهي`);
    }

    // 3. Mark future auctions
    const upcomingAuctions = await Auction.updateMany(
      {
        startTime: { $gt: now },
        activeStatus: { $ne: 'قادم' },
      },
      { $set: { activeStatus: 'قادم' } },
    );

    if (upcomingAuctions.modifiedCount > 0) {
      console.log(
        ` ${upcomingAuctions.modifiedCount} auctions marked as upcoming`,
      );
    }

    console.log(` Auction status update completed successfully`);
  } catch (error) {
    console.error(' Error updating auction statuses:', error);
  }
};

// Function to update tender statuses automatically
const updateTenderStatuses = async () => {
  try {
    const now = new Date();
    console.log(` [${now.toISOString()}] Updating tender statuses...`);

    const startingTenders = await Tender.updateMany(
      {
        startTime: { $lte: now },
        endTime: { $gt: now },
        activeStatus: { $ne: 'جاري' },
      },
      { $set: { activeStatus: 'جاري' } },
    );

    if (startingTenders.modifiedCount > 0) {
      console.log(
        ` ${startingTenders.modifiedCount} tenders started (قادم -> جاري)`,
      );

      const newlyStartedTenders = await Tender.find({
        startTime: { $lte: now },
        endTime: { $gt: now },
        activeStatus: 'جاري',
      }).populate('user');

      for (const tender of newlyStartedTenders) {
        await notificationService
          .createNotification({
            userId: tender.user._id,
            title: 'بدأت مناقصتك!',
            message: `بدأت مناقصتك "${tender.tenderTitle}" الآن ويمكن للمستخدمين تقديم العروض`,
            type: 'tender',
            referenceId: tender._id,
          })
          .catch((err) => console.error('Notification error:', err));
      }
    }

    const tendersToEnd = await Tender.find({
      endTime: { $lte: now },
      activeStatus: { $ne: 'منتهي' },
    }).populate('user');

    if (tendersToEnd.length > 0) {
      for (const tender of tendersToEnd) {
        await notificationService
          .createNotification({
            userId: tender.user._id,
            title: 'انتهت مناقصتك',
            message: `انتهت مناقصتك "${tender.tenderTitle}"`,
            type: 'tender',
            referenceId: tender._id,
          })
          .catch((err) => console.error('Notification error:', err));
      }

      await Tender.updateMany(
        { _id: { $in: tendersToEnd.map((t) => t._id) } },
        { $set: { activeStatus: 'منتهي' } },
      );

      console.log(`🏁 ${tendersToEnd.length} tenders updated to منتهي`);
    }

    const upcomingTenders = await Tender.updateMany(
      {
        startTime: { $gt: now },
        activeStatus: { $ne: 'قادم' },
      },
      { $set: { activeStatus: 'قادم' } },
    );

    if (upcomingTenders.modifiedCount > 0) {
      console.log(
        ` ${upcomingTenders.modifiedCount} tenders marked as upcoming`,
      );
    }

    console.log(` Tender status update completed successfully`);
  } catch (error) {
    console.error(' Error updating tender statuses:', error);
  }
};

// Main function to update all statuses
const updateAllStatuses = async () => {
  console.log('Running automatic status updates...');
  try {
    await Promise.all([updateAuctionStatuses(), updateTenderStatuses()]);
    console.log(' All automatic status updates completed successfully');
  } catch (error) {
    console.error(' Error in automatic status updates:', error);
  }
};

cron.schedule('* * * * *', updateAllStatuses, {
  timezone: 'Asia/Damascus',
  scheduled: true,
});

console.log('🚀 Starting automatic auction/tender status scheduler...');
console.log('⏰ Status updates will run every minute automatically');
updateAllStatuses();

module.exports = {
  updateAuctionStatuses,
  updateTenderStatuses,
  updateAllStatuses,
};
