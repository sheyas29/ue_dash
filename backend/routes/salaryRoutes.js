const express = require('express');
const { generateSalary, getSalaries, deleteSalaries } = require('../controllers/salaryController');
const router = express.Router({ mergeParams: true });

router.post('/generate', generateSalary);
router.get('/', getSalaries);
router.delete('/delete', deleteSalaries); // Add this line

module.exports = router;
