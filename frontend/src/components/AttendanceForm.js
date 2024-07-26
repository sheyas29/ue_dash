// AttendanceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const AttendanceForm = ({ contractId }) => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const [workingDays, setWorkingDays] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${API_URL}/${contractId}/employees`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [contractId]);

  const handleAttendanceChange = (e, employeeId) => {
    const { name, value } = e.target;
    setAttendanceData((prevData) => {
      const existingRecord = prevData.find(record => record.employeeId === employeeId);
      if (existingRecord) {
        return prevData.map(record =>
          record.employeeId === employeeId ? { ...record, [name]: value } : record
        );
      } else {
        const employee = employees.find(emp => emp._id === employeeId);
        return [...prevData, { employeeId, [name]: value, dailyWage: employee.dailyWage }];
      }
    });
  };

  const handleSave = async () => {
    const attendancePayload = attendanceData.map(record => ({
      ...record,
      contractId,
      month: selectedMonthYear.split('-')[1],
      year: selectedMonthYear.split('-')[0],
      workingDays
    }));
    console.log('Saving attendance data:', { records: attendancePayload });

    try {
      const response = await axios.post(`${API_URL}/${contractId}/attendance`, { records: attendancePayload });
      console.log('Attendance data saved:', response.data);
    } catch (error) {
      console.error('Error saving attendance data:', error);
    }
  };

  return (
    <div className="attendance-form p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Attendance</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Month and Year:</label>
        <input
          type="month"
          value={selectedMonthYear}
          onChange={(e) => setSelectedMonthYear(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Working Days:</label>
        <input
          type="number"
          placeholder="Working Days"
          value={workingDays}
          onChange={(e) => setWorkingDays(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead>
          <tr style={{ backgroundColor: '#e63946' }}>
            <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-white">Employee Name</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-white">Daily Wage</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-white">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="border-b border-gray-300">
              <td className="px-4 py-2 text-sm text-gray-800">{employee.name}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{employee.dailyWage}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  name="attendance"
                  onChange={(e) => handleAttendanceChange(e, employee._id)}
                  className="block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSave}
        className="mt-4 bg-jet text-white font-semibold py-2 px-4 rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Save
      </button>
    </div>
  );
};

export default AttendanceForm;