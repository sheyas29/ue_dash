const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  dailyWage: { type: Number, required: true },
  attendance: { type: Number, required: true },
  grossSalary: { type: Number, required: true },
  employeeEPF: { type: Number, required: true },
  employeeESIC: { type: Number, required: true },
  pTax: { type: Number, required: true },
  totalDeductions: { type: Number, required: true },
  netSalary: { type: Number, required: true },
  employerEPF: { type: Number, required: true },
  employerESIC: { type: Number, required: true },
  adminCharges: { type: Number, required: true },
  contribution: { type: Number, required: true },
});

module.exports = mongoose.model('Salary', salarySchema);
