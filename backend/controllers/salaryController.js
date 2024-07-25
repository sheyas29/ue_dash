const Salary = require('../models/Salary');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

const calculateEPF = (grossSalary) => (grossSalary > 15000 ? 15000 * 0.12 : grossSalary * 0.12);
const calculateESIC = (grossSalary) => (grossSalary > 21000 ? 21000 * 0.0075 : grossSalary * 0.0075);
const calculatePTax = (grossSalary) => (grossSalary > 20000 ? 200 : grossSalary > 15000 ? 150 : 0);
const calculateEmployerEPF = (grossSalary) => (grossSalary > 15000 ? 15000 * 0.12 : grossSalary * 0.12);
const calculateEmployerESIC = (grossSalary) => (grossSalary > 21000 ? 21000 * 0.0325 : grossSalary * 0.0325);
const calculateAdminCharges = (pfWage) => (pfWage * 0.005 < 75 ? 75 : pfWage * 0.005);
const calculateContribution = (basicSalary) => (basicSalary * 0.005 > 75 ? 75 : basicSalary * 0.005);

exports.generateSalary = async (req, res) => {
  const{contractId}=req.params;
  const {month, year } = req.body;

  try {
    const existingSalaries = await Salary.find({ contractId, month, year });
    if (existingSalaries.length > 0) {
      return res.status(400).json({ error: 'Salaries for this month and year already exist.' });
    }

    const attendances = await Attendance.find({ contractId, month, year }).populate('employeeId');
    if (attendances.length === 0) {
      return res.status(404).json({ error: 'No attendance records found for the specified month and year.' });
    }

    const salaryRecords = attendances.map(record => {
      const grossSalary = record.attendance * record.dailyWage;
      const employeeEPF = calculateEPF(grossSalary);
      const employeeESIC = calculateESIC(grossSalary);
      const pTax = calculatePTax(grossSalary);
      const totalDeductions = employeeEPF + employeeESIC + pTax;
      const netSalary = grossSalary - totalDeductions;
      const employerEPF = calculateEmployerEPF(grossSalary);
      const employerESIC = calculateEmployerESIC(grossSalary);
      const adminCharges = calculateAdminCharges(grossSalary);
      const contribution = calculateContribution(grossSalary);

      return {
        contractId,
        employeeId: record.employeeId._id,
        month,
        year,
        dailyWage: record.dailyWage,
        attendance: record.attendance,
        grossSalary,
        employeeEPF,
        employeeESIC,
        pTax,
        totalDeductions,
        netSalary,
        employerEPF,
        employerESIC,
        adminCharges,
        contribution,
      };
    });

    await Salary.insertMany(salaryRecords);
    res.status(201).json(salaryRecords);
  } catch (error) {
    console.error('Error generating salary records:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSalaries = async (req, res) => {
  const { contractId } = req.params;
  const { month, year } = req.body;

  try {
    await Salary.deleteMany({ contractId, month, year });
    res.status(200).json({ message: 'Salaries deleted successfully.' });
  } catch (error) {
    console.error('Error deleting salary records:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getSalaries = async (req, res) => {
  const { contractId } = req.params;
  const { month, year } = req.query;
  try {
    const salaries = await Salary.find({ contractId, month, year }).populate('employeeId');
    res.status(200).json(salaries);
  } catch (error) {
    console.error('Error fetching salary records:', error);
    res.status(500).json({ error: error.message });
  }
};
