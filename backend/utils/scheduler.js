const cron = require('node-cron');
const Auction = require('../models/Auction');
const Tender = require('../models/Tender');
const AuctionBid = require('../models/AuctionBid');
const notificationService = require('./notificationService');
const Favorite = require('../models/Favorite');
const TenderOffer = require('../models/TenderOffer');

// Function to update auction statuses automatically
const updateAuctionStatuses = async () => {
  try {
    const now = new Date();
    console.log(`[${now.toISOString()}] Updating auction statuses...`);

    // 1. Find and process auctions that should be starting now (قادم -> جاري)
    const newlyStartedAuctions = await Auction.find({
      startTime: { $lte: now },
      endTime: { $gt: now },
      activeStatus: { $ne: 'جاري' },
    }).populate('user');

    if (newlyStartedAuctions.length > 0) {
      console.log(
        ` ${newlyStartedAuctions.length} auctions are starting (قادم -> جاري)`,
      );

      for (const auction of newlyStartedAuctions) {
        // Notify the auction owner
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

        // Notify users who added this auction to their favorites
        const favoritedUsers = await Favorite.find({
          referenceId: auction._id,
          type: 'auction',
        }).populate('user');

        for (const fav of favoritedUsers) {
          await notificationService
            .createNotification({
              userId: fav.user._id,
              title: 'بدأ المزاد',
              message: `بدأ المزاد "${auction.auctionTitle}" الذي أضفته إلى مفضلتك`,
              type: 'auction',
              referenceId: auction._id,
            })
            .catch((err) => console.error('Notification error:', err));

          console.log(
            `📢 Notification sent to favorite user: ${fav.user.name}`,
          );
        }
      }

      // After sending all notifications, update the status of these auctions
      await Auction.updateMany(
        { _id: { $in: newlyStartedAuctions.map((a) => a._id) } },
        { $set: { activeStatus: 'جاري' } },
      );

      console.log(` ${newlyStartedAuctions.length} auctions updated to جاري`);
    }
    // 2. Process auctions that should end now
    const auctionsToEnd = await Auction.find({
      endTime: { $lte: now },
      activeStatus: { $ne: 'منتهي' },
    }).populate('user');

    if (auctionsToEnd.length > 0) {
      console.log(`Found ${auctionsToEnd.length} auctions to end...`);

      for (const auction of auctionsToEnd) {
        try {
          console.log(
            `Processing notifications for auction: ${auction.auctionTitle}`,
          );

          const bids = await AuctionBid.find({ auction: auction._id }).populate(
            'user',
          );
          console.log(
            `Found ${bids.length} bids for auction ${auction.auctionTitle}`,
          );

          if (bids.length > 0) {
            const winner = bids.reduce(
              (max, bid) => (bid.amount > max.amount ? bid : max),
              bids[0],
            );

            console.log(
              `Winner found: ${winner.user.name} with bid ${winner.amount}`,
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

            const allBiddersIds = new Set(
              bids.map((bid) => bid.user._id.toString()),
            );
            const winnerId = winner.user._id.toString();

            //  خصم المبلغ النهائي من الفائز
            const winnerWallet = await Wallet.findOne({
              partner: winner.user._id,
            });
            if (winnerWallet) {
              const finalPrice = winner.amount;
              const blockedAmount = 0.1 * auction.startingPrice;

              // إضافة المبلغ المقتطع أولاً إلى المبلغ المتاح
              winnerWallet.availableAmount += blockedAmount;
              winnerWallet.blockedAmount -= blockedAmount;

              // خصم المبلغ النهائي للمزاد
              winnerWallet.availableAmount -= finalPrice;
              await winnerWallet.save();
              console.log(
                ` Deducted final bid amount ${finalPrice} from winner's wallet.`,
              );
            }

            //   إعادة المبلغ المقتطع لغير الفائزين
            const otherBiddersIds = [...allBiddersIds].filter(
              (bidderId) => bidderId !== winnerId,
            );

            // Fetch wallets for all non-winning bidders and return their blocked amount
            const otherBiddersWallets = await Wallet.find({
              partner: { $in: otherBiddersIds },
            });

            const blockedAmountToReturn = 0.1 * auction.startingPrice;
            for (const wallet of otherBiddersWallets) {
              if (wallet.blockedAmount >= blockedAmountToReturn) {
                wallet.availableAmount += blockedAmountToReturn;
                wallet.blockedAmount -= blockedAmountToReturn;
                await wallet.save();
                console.log(
                  ` Returned blocked amount to non-winner: ${wallet.partner}`,
                );
              }
            }

            // Notify others
            allBiddersIds = new Set(bids.map((bid) => bid.user._id.toString()));
            // console.log('😀all biders ', allBiddersIds);
            winnerId = winner.user._id.toString();
            otherBiddersIds = [...allBiddersIds].filter(
              (bidderId) => bidderId !== winnerId,
            );

            // Fetch users who favorited this specific auction
            const favoritedUsers = await Favorite.find({
              referenceId: auction._id,
              type: 'auction',
            }).populate('user');
            // console.log('😀favoritedUsers:', favoritedUsers);
            // Get IDs of favorited users
            const favoritedUserIds = new Set(
              favoritedUsers.map((fav) => fav.user._id.toString()),
            );

            // Remove bidders from favorited users to get "favorites only" list
            const favoritesOnlyUserIds = new Set(
              [...favoritedUserIds].filter(
                (userId) => !allBiddersIds.has(userId),
              ),
            );

            // Send "You did not win" notification to non-winning bidders
            for (const userId of otherBiddersIds) {
              await notificationService
                .createNotification({
                  userId: userId,
                  title: 'انتهى المزاد',
                  message: `انتهى المزاد "${auction.auctionTitle}"، لم تفز هذه المرة`,
                  type: 'auction',
                  referenceId: auction._id,
                })
                .catch((err) => console.error('Notification error:', err));
            }

            // Send "Auction has ended" notification to "favorites only" users
            for (const userId of favoritesOnlyUserIds) {
              await notificationService
                .createNotification({
                  userId: userId,
                  title: 'انتهى المزاد',
                  message: `انتهى المزاد "${auction.auctionTitle}"`,
                  type: 'auction',
                  referenceId: auction._id,
                })
                .catch((err) => console.error('Notification error:', err));
            }
          } else {
            console.log(`No bids found for auction ${auction.auctionTitle}`);
            await notificationService
              .createNotification({
                userId: auction.user._id,
                title: 'انتهى مزادك بدون مزايدات',
                message: `انتهى مزادك "${auction.auctionTitle}" بدون أي مزايدات`,
                type: 'auction',
                referenceId: auction._id,
              })
              .catch((err) => console.error('Notification error:', err));

            // Send notification to users who favorited but no bids were made
            const favoritedUsers = await Favorite.find({
              referenceId: auction._id,
              type: 'auction',
            }).populate('user');

            for (const fav of favoritedUsers) {
              await notificationService
                .createNotification({
                  userId: fav.user._id,
                  title: 'انتهى المزاد',
                  message: `انتهى المزاد "${auction.auctionTitle}"`,
                  type: 'auction',
                  referenceId: auction._id,
                })
                .catch((err) => console.error('Notification error:', err));
            }
          }
        } catch (error) {
          console.error(
            ` Error processing ended auction ${auction._id}:`,
            error,
          );
        }
      }

      // update status
      await Auction.updateMany(
        { _id: { $in: auctionsToEnd.map((a) => a._id) } },
        { $set: { activeStatus: 'منتهي' } },
      );

      console.log(` ${auctionsToEnd.length} auctions updated to منتهي`);
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

    // 1. Find and process tenders that should be starting now (قادم -> جاري)
    const newlyStartedTenders = await Tender.find({
      startTime: { $lte: now },
      endTime: { $gt: now },
      activeStatus: { $ne: 'جاري' },
    }).populate('user');

    if (newlyStartedTenders.length > 0) {
      console.log(
        ` ${newlyStartedTenders.length} tenders are starting (قادم -> جاري)`,
      );

      for (const tender of newlyStartedTenders) {
        // Notify the tender owner
        await notificationService
          .createNotification({
            userId: tender.user._id,
            title: 'بدأت مناقصتك!',
            message: `بدأت مناقصتك "${tender.tenderTitle}" الآن ويمكن للمستخدمين تقديم العروض`,
            type: 'tender',
            referenceId: tender._id,
          })
          .catch((err) => console.error('Notification error:', err));

        console.log(`Notification sent to tender owner: ${tender.user.name}`);

        // Notify users who added this tender to their favorites
        const favoritedUsers = await Favorite.find({
          referenceId: tender._id,
          type: 'tender',
        }).populate('user');

        for (const fav of favoritedUsers) {
          await notificationService
            .createNotification({
              userId: fav.user._id,
              title: 'بدأت المناقصة',
              message: `بدأت المناقصة "${tender.tenderTitle}" التي أضفتها إلى مفضلتك`,
              type: 'tender',
              referenceId: tender._id,
            })
            .catch((err) => console.error('Notification error:', err));

          console.log(` Notification sent to favorite user: ${fav.user.name}`);
        }
      }

      // After sending all notifications, update the status of these tenders
      await Tender.updateMany(
        { _id: { $in: newlyStartedTenders.map((t) => t._id) } },
        { $set: { activeStatus: 'جاري' } },
      );

      console.log(` ${newlyStartedTenders.length} tenders updated to جاري`);
    }

    // 2. Process tenders that should end now
    const tendersToEnd = await Tender.find({
      endTime: { $lte: now },
      activeStatus: { $ne: 'منتهي' },
    }).populate('user');

    if (tendersToEnd.length > 0) {
      console.log(`Found ${tendersToEnd.length} tenders to end...`);

      for (const tender of tendersToEnd) {
        try {
          console.log(
            `Processing notifications for tender: ${tender.tenderTitle}`,
          );

          const offers = await TenderOffer.find({
            tender: tender._id,
          }).populate('user');
          console.log(
            `Found ${offers.length} offers for tender ${tender.tenderTitle}`,
          );

          if (offers.length > 0) {
            // Notify owner
            // console.log('offers❤❤', offers.length);
            await notificationService
              .createNotification({
                userId: tender.user._id,
                title: 'انتهت مناقصتك',
                message: `انتهت مناقصتك "${tender.tenderTitle}"، يمكنك الآن مراجعة العروض واختيار الأنسب`,
                type: 'tender',
                referenceId: tender._id,
              })
              .catch((err) => console.error('Notification error:', err));

            // Notify all bidders
            const allBiddersIds = new Set(
              offers.map((offer) => offer.user._id.toString()),
            );

            for (const userId of allBiddersIds) {
              await notificationService
                .createNotification({
                  userId: userId,
                  title: 'انتهت المناقصة',
                  message: `انتهت المناقصة "${tender.tenderTitle}"، سيتم إعلامك بالنتيجة بعد مراجعة العروض`,
                  type: 'tender',
                  referenceId: tender._id,
                })
                .catch((err) => console.error('Notification error:', err));
            }

            // Notify "favorites only" users
            const favoritedUsers = await Favorite.find({
              referenceId: tender._id,
              type: 'tender',
            }).populate('user');

            const favoritedUserIds = new Set(
              favoritedUsers.map((fav) => fav.user._id.toString()),
            );

            const favoritesOnlyUserIds = new Set(
              [...favoritedUserIds].filter(
                (userId) => !allBiddersIds.has(userId),
              ),
            );

            for (const userId of favoritesOnlyUserIds) {
              await notificationService
                .createNotification({
                  userId: userId,
                  title: 'انتهت المناقصة',
                  message: `انتهت المناقصة "${tender.tenderTitle}"`,
                  type: 'tender',
                  referenceId: tender._id,
                })
                .catch((err) => console.error('Notification error:', err));
            }
          } else {
            console.log(`No offers found for tender ${tender.tenderTitle}`);
            await notificationService
              .createNotification({
                userId: tender.user._id,
                title: 'انتهت مناقصتك بدون عروض',
                message: `انتهت مناقصتك "${tender.tenderTitle}" بدون أي عروض`,
                type: 'tender',
                referenceId: tender._id,
              })
              .catch((err) => console.error('Notification error:', err));

            // Send notification to users who favorited but no offers were made
            const favoritedUsers = await Favorite.find({
              referenceId: tender._id,
              type: 'tender',
            }).populate('user');

            for (const fav of favoritedUsers) {
              await notificationService
                .createNotification({
                  userId: fav.user._id,
                  title: 'انتهت المناقصة',
                  message: `انتهت المناقصة "${tender.tenderTitle}"`,
                  type: 'tender',
                  referenceId: tender._id,
                })
                .catch((err) => console.error('Notification error:', err));
            }
          }
        } catch (error) {
          console.error(` Error processing ended tender ${tender._id}:`, error);
        }
      }

      // update status
      await Tender.updateMany(
        { _id: { $in: tendersToEnd.map((t) => t._id) } },
        { $set: { activeStatus: 'منتهي' } },
      );

      console.log(` ${tendersToEnd.length} tenders updated to منتهي`);
    }

    // 3. Mark future tenders
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

console.log(' Starting automatic auction/tender status scheduler...');
console.log(' Status updates will run every minute automatically');
updateAllStatuses();

module.exports = {
  updateAuctionStatuses,
  updateTenderStatuses,
  updateAllStatuses,
};
