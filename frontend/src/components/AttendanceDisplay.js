import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AttendanceDisplay.css';

const AttendanceDisplay = ({ contractId }) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contracts/' + contractId + '/attendance', {
          params: { contractId, month, year }
        });
        console.log('Fetched attendance records from DB:', response.data);
        setAttendanceRecords(response.data);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    fetchAttendanceRecords();
  }, [contractId, month, year]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contracts/${contractId}/employees`);
        console.log('Fetched employees:', response.data);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [contractId]);

  return (
    <div className="attendance-display">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance Records</h2>
      <label>
        Month:
        <input
          type="month"
          value={`${year}-${String(month).padStart(2, '0')}`}
          onChange={(e) => {
            const [year, month] = e.target.value.split('-');
            setYear(parseInt(year, 10));
            setMonth(parseInt(month, 10));
          }}
        />
      </label>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found for {month}/{year}.</p>
      ) : (
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr style={{ backgroundColor: '#e63946' }}>
              <th className="px-4 py-2 text-white">Employee Name</th>
              <th className="px-4 py-2 text-white">Daily Wage</th>
              <th className="px-4 py-2 text-white">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{record.employeeId ? record.employeeId.name : 'Unknown'}</td>
                <td className="px-4 py-2">{record.dailyWage}</td>
                <td className="px-4 py-2">{record.attendance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceDisplay;
