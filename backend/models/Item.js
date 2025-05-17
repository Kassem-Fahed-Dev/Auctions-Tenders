const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema(
  {
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, 'category required'],
      },
      auction: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auction",
      },
    name: {
      type:String,
      required: [true, 'name required'],
    },
    description: {
      type:String,
      required: [true, 'description required'],
    },
    photo: {
      type:[String],
      required: [true, 'photo required'],

    }, // Array of URLs
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
