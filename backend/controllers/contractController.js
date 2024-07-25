// controllers/contractController.js
const Contract = require('../models/Contract');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');

// Get all contracts
exports.getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get contract by ID
exports.getContractById = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await Contract.findById(id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete contract by ID
exports.deleteContract = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete contract
    const deletedContract = await Contract.findByIdAndDelete(id);
    if (!deletedContract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    // Delete related employees
    await Employee.deleteMany({ contractId: id });

    // Delete related attendance records
    await Attendance.deleteMany({ contractId: id });

    res.status(200).json({ message: 'Contract and related data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
