const express = require('express');
const { upload, uploadFile, uploadMultipleFiles, getFileUrl } = require('../controllers/cloudinaryController.js');
const router = express.Router();

// Upload single file
router.post('/upload', upload.single('file'), uploadFile);

// Upload multiple files
router.post('/upload-multiple', upload.array('files', 10), uploadMultipleFiles); // Max 10 files

// Get file URL
router.get('/download/:publicId', getFileUrl);

module.exports = router;