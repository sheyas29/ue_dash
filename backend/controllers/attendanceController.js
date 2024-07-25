const Attendance = require('../models/Attendance');

exports.getAttendanceRecords = async (req, res) => {
  try {
    const { contractId, month, year } = req.query;
    console.log(`Fetching attendance for contractId: ${contractId}, month: ${month}, year: ${year}`);
    const records = await Attendance.find({ contractId, month, year }).populate('employeeId');
    const response = records.map(record => ({
      employeeName: record.employeeId ? record.employeeId.name : 'Unknown',
      attendance: record.attendance,
      dailyWage: record.dailyWage,
      grossSalary: record.attendance * record.dailyWage,
      ...record._doc
    }));
    console.log('Fetched attendance records from DB:', response);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.addAttendanceRecords = async (req, res) => {
  try {
    const { records } = req.body;
    const contractId = records[0].contractId;
    const month = records[0].month;
    const year = records[0].year;

    console.log(`Deleting existing records for contractId: ${contractId}, month: ${month}, year: ${year}`);
    await Attendance.deleteMany({ contractId, month, year });

    console.log('Inserting new records:', records);
    const newRecords = await Attendance.insertMany(records);
    console.log('Inserted records:', newRecords);
    res.status(201).json(newRecords);
  } catch (error) {
    console.error('Error adding attendance records:', error);
    res.status(500).json({ error: error.message });
  }
};
