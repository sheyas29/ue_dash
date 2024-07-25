// controllers/employeeController.js
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');

// Get all employees for a specific contract
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ contractId: req.params.contractId });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee({ ...req.body, contractId: req.params.contractId });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    // Delete employee
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Delete related attendance records
    await Attendance.deleteMany({ employeeId: req.params.id });

    res.status(200).json({ message: 'Employee and related attendance records deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total employees
exports.getTotalEmployees = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    res.status(200).json({ totalEmployees });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total employees', error });
  }
};
