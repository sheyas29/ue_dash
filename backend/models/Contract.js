const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  contract_no: { type: String, required: true },
  bid_no: { type: String, required: true },
  clientName: { type: String, required: true },
  place: { type: String, required: true },
  value: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Contract', contractSchema);
