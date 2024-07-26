// src/components/ContractPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ContractDetails from '../components/ContractDetails';
import AttendanceTracker from '../components/AttendanceTracker';
import EmployeeList from '../components/EmployeeList';
import GenerateSalary from '../components/GenerateSalary';
import DisplaySalary from '../components/DisplaySalary';
import GenerateInvoice from '../components/GenerateInvoice';
import './ContractPage.css';
import { API_URL } from '../config';

const ContractPage = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(API_URL);
        setContracts(response.data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchContracts();
  }, []);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setContract(response.data);
        console.log('Fetched contract:', response.data);
      } catch (error) {
        console.error('Error fetching contract:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}/employees`);
        console.log('Fetched employees:', response.data);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchContract();
    fetchEmployees();
  }, [id]);

  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/employees`, newEmployee);
      setEmployees([...employees, response.data]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditEmployee = async (empId, updatedEmployee) => {
    try {
      await axios.put(`${API_URL}/${id}/employees/${empId}`, updatedEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp._id === empId ? { ...emp, ...updatedEmployee } : emp))
      );
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`${API_URL}/${id}/employees/${employeeId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp._id !== employeeId)
      );
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  if (!contract) {
    return <div>Loading...</div>;
  }

  console.log('Contract ID in ContractPage:', contract._id);

  return (
    <div className={`contract-page-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar contracts={contracts} onToggle={handleSidebarToggle} />
      <div className="contract-page">
        <div className="contract-header p-6 bg-indian-red rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center" style={{ backgroundColor: '#E8505E' }}>
          <div className="left flex flex-col md:flex-row md:items-center md:space-x-6 mb-4 md:mb-0">
            <span className="block text-gray-700 text-lg">
              <strong>Start Date:</strong> {new Date(contract.startDate).toLocaleDateString()}
            </span>
            <span className="block text-gray-700 text-lg">
              <strong>End Date:</strong> {new Date(contract.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="middle mb-4 md:mb-0">
            <span className="block text-gray-700 text-lg">
              <strong>Contract No.:</strong> {contract.contract_no}
            </span>
          </div>
          <div className="right">
            <span className="block text-gray-700 text-lg font-semibold">
              <strong>Value:</strong> INR {contract.value.toLocaleString()}
            </span>
          </div>
        </div>

        <ContractDetails contract={contract} />
        <EmployeeList
          employees={employees}
          contractId={contract._id}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onAdd={handleAddEmployee}
        />
        <AttendanceTracker contractId={contract._id} />
        <div className="salary-section">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Generate Monthly Salary</h2>
          <div className="date-selector flex gap-4 mt-4">
            <label className="block">
              <span className="text-gray-700">Month:</span>
              <select
                value={month}
                onChange={handleMonthChange}
                className="block w-full mt-1 p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Year:</span>
              <input
                type="number"
                value={year}
                onChange={handleYearChange}
                className="block w-full mt-1 p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <GenerateSalary contractId={contract._id} month={month} year={year} />
          <DisplaySalary contractId={contract._id} month={month} year={year} />
        </div>
        <div className="invoice-section">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Generate Invoice</h2>
          <GenerateInvoice contractId={contract._id} month={month} year={year} />
        </div>
        <div className="navigation-links">
          <Link to="/">Go to Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default ContractPage;
