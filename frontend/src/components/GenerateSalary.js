import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const GenerateSalary = ({ contractId, month, year }) => {
  const [message, setMessage] = useState('');

  const handleGenerateSalaries = async () => {
    try {
      console.log(`Generating salaries for contractId: ${contractId}, month: ${month}, year: ${year}`);
      const response = await axios.post(`${API_URL}/${contractId}/salaries/generate`, { month, year });
      if (response.data.length > 0) {
        console.log('Salaries generated:', response.data);
        setMessage('Salaries generated successfully.');
      } else {
        setMessage('No salaries were generated.');
      }
    } catch (error) {
      console.error('Error generating salaries:', error);
      setMessage(error.response?.data?.error || 'Error generating salaries. Please try again.');
    }
  };

  const handleDeleteSalaries = async () => {
    try {
      console.log(`Deleting salaries for contractId: ${contractId}, month: ${month}, year: ${year}`);
      await axios.delete(`${API_URL}/${contractId}/salaries/delete`, { data: { month, year } });
      console.log('Salaries deleted successfully.');
      setMessage('Salaries deleted successfully.');
    } catch (error) {
      console.error('Error deleting salaries:', error);
      setMessage('Error deleting salaries. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleGenerateSalaries}
          className="bg-jet text-white font-semibold py-2 px-4 rounded hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Generate Salaries
        </button>
        <button
          onClick={handleDeleteSalaries}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete Salaries
        </button>
      </div>
      {message && <p className="text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default GenerateSalary;
