const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
  name: { type: String, required: true },
  epf: { type: String, required: true },
  esic: { type: String, required: true },
  bankAccount: { type: String, required: true },
  aadhar: { type: String, required: true },
  mobile: { type: String, required: true },
  dailyWage: { type: Number, required: true },
  jobRole: { type: String, required: true },
  ifsc: { type: String, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);
