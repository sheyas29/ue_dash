const express = require('express');
const { getContracts, getContractById, deleteContract } = require('../controllers/contractController');
// const { generateSalary, getSalaries, deleteSalaries } = require('../controllers/salaryController');
const salaryRoutes = require('./salaryRoutes');
const router = express.Router();

router.get('/', getContracts);
router.get('/:id', getContractById);
router.delete('/:id', deleteContract);
// router.post('/:contractId/salaries/generate', generateSalary);
// router.get('/:contractId/salaries', getSalaries);
// router.delete('/:contractId/salaries/delete', deleteSalaries);
router.use('/:contractId/salaries', salaryRoutes);
module.exports = router;
