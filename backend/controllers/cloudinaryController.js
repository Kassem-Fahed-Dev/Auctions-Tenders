const cloudinary = require('../utils/cloudinary.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');
const multer = require('multer');
const { Readable } = require('stream');

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to upload a single file to Cloudinary
const uploadToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        resource_type: 'auto', 
        public_id: fileName.split('.')[0], // Remove extension from public_id
        use_filename: true,
        unique_filename: true
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            bytes: result.bytes,
            width: result.width,
            height: result.height
          });
        }
      }
    );
    
    // Pipe the buffer to the upload_stream
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

// Upload single file to Cloudinary
const uploadFile = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('No file uploaded', 400));
  }
  try {
    const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: result
    });
  } catch (error) {
    return next(new AppError('Cloudinary upload failed', 500));
  }
});

// Upload multiple files to Cloudinary
const uploadMultipleFiles = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new AppError('No files uploaded', 400));
  }
  try {
    // Upload all files concurrently using Promise.all
    const uploadPromises = req.files.map(file => 
      uploadToCloudinary(file.buffer, file.originalname)
    );
    const results = await Promise.all(uploadPromises);
    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully',
      count: results.length,
      data: {
        files: results,
        urls: results.map(result => result.url)
      }
    });
  } catch (error) {
    return next(new AppError('One or more files failed to upload to Cloudinary', 500));
  }
});

// Download (get URL) from Cloudinary
const getFileUrl = catchAsync(async (req, res, next) => {
  const { publicId } = req.params;
  
  if (!publicId) {
    return next(new AppError('No publicId provided', 400));
  }
  // Generate the URL
  const url = cloudinary.url(publicId, { resource_type: 'auto', secure: true });
  
  res.status(200).json({
    success: true,
    message: 'File URL fetched successfully',
    data: { url }
  });
});

module.exports = {
  upload,
  uploadFile,
  uploadMultipleFiles,
  getFileUrl
};