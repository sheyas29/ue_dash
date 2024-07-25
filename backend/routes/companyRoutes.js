const express = require('express');
const { getCompanyDetails, updateCompanyDetails } = require('../controllers/companyController');
const router = express.Router();

router.get('/', getCompanyDetails);
router.put('/', updateCompanyDetails);

module.exports = router;
