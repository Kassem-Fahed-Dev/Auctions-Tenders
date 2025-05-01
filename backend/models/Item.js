const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema(
  {
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      auction: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auction",
      },
    name: String,
    description: String,
    photo: [String], // Array of URLs
    video: String, // URL
    status: {
      type: String,
      enum: ['جديد', 'مستعمل'],
    }, // "new", "used"
    properties: [
        {key:String , value:mongoose.Schema.Types.Mixed}
    ],
  },
  { timestamps: true },
);

itemSchema.virtual("linkedAuction", {
    ref: "Auction",
    localField: "auction",
    foreignField: "_id",
    justOne: true
  });
  
module.exports = mongoose.model('Item', itemSchema);
