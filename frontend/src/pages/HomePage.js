import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CompanyDetails from '../components/CompanyDetails';
import ContractList from '../components/ContractList';
import Sidebar from '../components/Sidebar';
import FileUpload from '../components/FileUpload';
import ContractsCountTracker from '../components/ContractsCountTracker';
import TotalEmployeesDisplay from '../components/TotalEmployeesDisplay';
import { getContracts, deleteContract } from '../apis/contractApi';
import { ChevronLeft, ChevronRight, Upload, BarChart2, Users } from 'lucide-react';

const HomePage = () => {
  const [contracts, setContracts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getContracts();
        setContracts(data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchContracts();
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUpload = (newContract) => {
    setContracts([...contracts, newContract]);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      try {
        await deleteContract(id);
        setContracts(contracts.filter(contract => contract._id !== id));
      } catch (error) {
        console.error('Error deleting contract:', error);
      }
    }
  };

  return (
    <div className={`flex transition-all duration-300 ease-in-out shadow-[10px_0px_10px_rgba(0,0,0,0)] ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}>
      <Sidebar
        contracts={contracts}
        isOpen={isSidebarOpen}
        onToggle={handleSidebarToggle}
        className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-[270px]' : 'w-[70px]'
          }`}
      />
      <div className={`flex-grow transition-[margin-left] duration-300 ease-in-out p-5 ${isSidebarOpen ? 'ml-[270px]' : 'ml-[70px]'
        }`}>
        <Header className="bg-white shadow-md mb-6 rounded-lg" />
        <CompanyDetails className="bg-white rounded-lg shadow-md p-4 mb-6" />
        <div className="flex items-center justify-end mb-6">
          <button
            onClick={handleSidebarToggle}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronRight className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <Upload className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Contract PDF</h3>
            <FileUpload
              onUpload={handleUpload}
              className="w-full"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <BarChart2 className="w-11 h-11 text-blue-500 mb-2" />
              <h2 className="text-xl font-semibold text-gray-800 text-center">Contracts Count Tracker</h2>
            </div>
            <ContractsCountTracker
              contracts={contracts}
              className="w-full"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <Users className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Total Employees</h3>
            <TotalEmployeesDisplay
              className="text-3xl font-bold text-gray-700"
            />
          </div>
        </div>
        <ContractList
          contracts={contracts}
          onDelete={handleDelete}
          className="bg-white rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default HomePage;