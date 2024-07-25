const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  workingDays: {
    type: Number,
    required: true,
  },
  dailyWage: {
    type: Number,
    required: true,
  },
  attendance: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
