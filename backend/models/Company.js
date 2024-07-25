const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  gemSellerId: { type: String, required: true },
  companyName: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  msmeVerified: { type: String, required: true },
  msmeRegistrationNumber: { type: String, required: true },
  mseSocialCategory: { type: String, required: true },
  mseGender: { type: String, required: true },
  gstin: { type: String, required: true },
});

module.exports = mongoose.model('Company', companySchema);
