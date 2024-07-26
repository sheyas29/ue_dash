import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DisplaySalary.css';
import { API_URL } from '../config';

const DisplaySalary = ({ contractId, month, year }) => {
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(`${API_URL}/${contractId}/salaries`, {
          params: { month, year }
        });
        setSalaries(response.data);
        console.log('Fetched salary records:', response.data);
      } catch (error) {
        console.error('Error fetching salary records:', error);
      }
    };

    fetchSalaries();
  }, [contractId, month, year]);

  const formatMonth = (month) => {
    const monthNames = [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    if (typeof month === 'string') {
      const monthNumber = parseInt(month, 10);
      if (!isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12) {
        return monthNames[monthNumber - 1];
      }
      return month.toUpperCase();
    } else if (typeof month === 'number' && month >= 1 && month <= 12) {
      return monthNames[month - 1];
    }
    return 'UNKNOWN MONTH';
  };

  const handlePrint = () => {
    const printContent = document.getElementById('salary-table').outerHTML;
    const printWindow = window.open('', '', 'height=800,width=1200');
    printWindow.document.write('<html><head><title>' + formatMonth(month) + '/' + year + '</title>');
    printWindow.document.write('<style>table {width: 100%;border-collapse: collapse;} th, td {border: 1px solid black;padding: 8px;text-align: left;} .no-print {display: none;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2>' + formatMonth(month) + '/' + year + '</h2>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="salary-display">
      <h2>{formatMonth(month)}/{year}</h2>
      {salaries.length > 0 ? (
        <div>
          <button onClick={handlePrint} className="print-button no-print">Print</button>
          <table id="salary-table">
            <thead>
              <tr>
                <th rowSpan="2">S.No</th>
                <th rowSpan="2">NAME</th>
                <th rowSpan="2">JOB</th>
                <th rowSpan="2">ESIC No.</th>
                <th rowSpan="2">No. of DAYS</th>
                <th rowSpan="2">PER DAY WAGES</th>
                <th rowSpan="2">GROSS PAY</th>
                <th colSpan="3">DEBITS</th>
                <th rowSpan="2">TOT DED</th>
                <th rowSpan="2">NET SAL</th>
                <th colSpan="4">CREDIT</th>
                <th rowSpan="2">Bank A/c</th>
                <th rowSpan="2">IFSC</th>
              </tr>
              <tr>
                <th>EPF 12%</th>
                <th>ESIC 0.75%</th>
                <th>P. Tax</th>
                <th>EPF 12%</th>
                <th>ELDI 0.5%</th>
                <th>EPF Admin 0.5%</th>
                <th>ESIC 3.25%</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary, index) => (
                <tr key={salary._id}>
                  <td>{index + 1}</td>
                  <td>{salary.employeeId.name}</td>
                  <td>{salary.employeeId.jobRole}</td>
                  <td>{salary.employeeId.esic}</td>
                  <td>{salary.attendance.toFixed(2)}</td>
                  <td>{salary.dailyWage}</td>
                  <td>{salary.grossSalary.toFixed(2)}</td>
                  <td>{salary.employeeEPF.toFixed(2)}</td>
                  <td>{salary.employeeESIC.toFixed(2)}</td>
                  <td>{salary.pTax.toFixed(2)}</td>
                  <td>{salary.totalDeductions.toFixed(2)}</td>
                  <td>{salary.netSalary.toFixed(2)}</td>
                  <td>{salary.employerEPF.toFixed(2)}</td>
                  <td>{salary.contribution.toFixed(2)}</td>
                  <td>{salary.adminCharges.toFixed(2)}</td>
                  <td>{salary.employerESIC.toFixed(2)}</td>
                  <td>{salary.employeeId.bankAccount}</td>
                  <td>{salary.employeeId.ifsc}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">TOTAL</td>
                <td>{salaries.reduce((acc, curr) => acc + curr.attendance, 0).toFixed(2)}</td>
                <td></td>
                <td>{salaries.reduce((acc, curr) => acc + curr.grossSalary, 0).toFixed(2)}</td>
                <td>{salaries.reduce((acc, curr) => acc + curr.employeeEPF, 0).toFixed(2)}</td>
                <td>{salaries.reduce((acc, curr) => acc + curr.employeeESIC, 0).toFixed(2)}</td>
                <td>{salaries.reduce((acc, curr) => acc + curr.pTax, 0).toFixed(2)}</td>
                <td>{salaries.reduce((acc, curr) => acc + curr.totalDeductions, 0).toFixed(2)}</td>
                <td>{salaries.reduce((acc, curr) => acc + curr.netSalary, 0).toFixed(2)}</td>
                <td>{salaries.reduce((acc, curr) => acc + curr.employerEPF, 0).toFixed(2)}</td>
                <td>{salaries.reduce((acc, curr) => acc + curr.contribution, 0).toFixed(2)}</td>
                <td>{salaries.reduce((acc, curr) => acc + curr.adminCharges, 0).toFixed(2)}</td>
                <td>{salaries.reduce((acc, curr) => acc + curr.employerESIC, 0).toFixed(2)}</td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="no-records">No salary records found for the selected month and year.</p>
      )}
    </div>
  );
};

export default DisplaySalary;
