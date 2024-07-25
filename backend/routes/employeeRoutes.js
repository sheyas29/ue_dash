const express = require('express');
const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getTotalEmployees,
} = require('../controllers/employeeController');
const router = express.Router({ mergeParams: true });

router.get('/', getEmployees);
router.post('/', addEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/total', getTotalEmployees);

module.exports = router;
