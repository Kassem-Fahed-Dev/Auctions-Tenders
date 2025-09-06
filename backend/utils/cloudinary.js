const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,//cloudinary
  api_key: process.env.CLOUDINARY_API_KEY,//124392523163823
  api_secret: process.env.CLOUDINARY_API_SECRET, //3WiDC1soMgqxFQC5PsV-SB4h3tQ
});

module.exports = cloudinary; 
//CLOUDINARY_URL=cloudinary://124392523163823:3WiDC1soMgqxFQC5PsV-SB4h3tQ@dfapg5zfo