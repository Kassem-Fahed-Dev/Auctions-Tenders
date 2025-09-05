const multer = require('multer');
const path = require('path');

// مكان حفظ الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/categories'); // المجلد الذي نخزن فيه الصور
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // اسم فريد للملف
  },
});

// السماح فقط بالصور
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('الملفات المسموحة فقط صور'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
