const express = require('express');
const { getAttendanceRecords, addAttendanceRecords } = require('../controllers/attendanceController');
const router = express.Router({ mergeParams: true });

router.get('/', getAttendanceRecords);
router.post('/', addAttendanceRecords);

module.exports = router;
