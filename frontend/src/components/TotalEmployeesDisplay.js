import React, { useState, useEffect } from 'react';
import { getTotalEmployees } from '../apis/contractApi';
import './TotalEmployeesDisplay.css';
const TotalEmployeesDisplay = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    const fetchTotalEmployees = async () => {
      try {
        const total = await getTotalEmployees();
        setTotalEmployees(total);
      } catch (error) {
        console.error('Error fetching total employees:', error);
      }
    };

    fetchTotalEmployees();
  }, []);

  return (
    <div className="total-employees-box">
      <h3>Total Employees</h3>
      <p>{totalEmployees}</p>
    </div>
  );
};

export default TotalEmployeesDisplay;
