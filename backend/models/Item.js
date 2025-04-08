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
        unique: true
      },
    name: String,
    description: String,
    photo: [String], // Array of URLs
    video: String, // URL
    status: {
      type: String,
      enum: ['new', 'used'],
    }, // "new", "used"
    properties: [
        {key:String , value:mongoose.Schema.Types.Mixed}
    ],
    numberOfItems:Number
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
