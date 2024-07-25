const express = require('express');
const upload = require('../middlewares/upload');
const { uploadContract } = require('../controllers/uploadController');
const router = express.Router();

router.post('/upload', upload.single('file'), uploadContract);

module.exports = router;
