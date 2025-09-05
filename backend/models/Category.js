const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['auction', 'tender'],
      required: [true, 'type required'],
    },
    name: {
      type: String,
      unique: true,
      required: [true, 'name required'],
    },
    image: {
      type: String, // سنخزن الرابط المحلي للصورة
    },
    properties: [
      //here we can add dynamic fields that admins determine it
      { key: String, required: Boolean, dataType: String },
      // if we have phones category
      // key = name , required = true , dataType = string
      // key = storage , required = true , dataType = number
      // ... and so on
    ],
  },
  { timestamps: true },
);

categorySchema.virtual('items', {
  ref: 'Item', // Reference the Item model
  localField: '_id', // Category's _id field
  foreignField: 'category', // Item's "category" field that stores the Category's _id
  justOne: false, // One category → many items
});

module.exports = mongoose.model('Category', categorySchema);
