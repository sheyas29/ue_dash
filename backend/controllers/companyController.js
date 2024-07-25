const Company = require('../models/Company');

exports.getCompanyDetails = async (req, res) => {
  try {
    const company = await Company.findOne();
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCompanyDetails = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
