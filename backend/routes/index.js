const express = require('express');
const contractRoutes = require('./contractRoutes');
const employeeRoutes = require('./employeeRoutes');
const uploadRoutes = require('./uploadRoutes');
const router = express.Router();

router.use('/contracts', contractRoutes);
router.use('/contracts/:contractId/employees', employeeRoutes); // Add this line
router.use('/upload', uploadRoutes);

module.exports = router;
