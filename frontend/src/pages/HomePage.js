import React, { useState, useEffect } from 'react';
import CompanyDetails from '../components/CompanyDetails';
import ContractList from '../components/ContractList';
import Sidebar from '../components/Sidebar';
import FileUpload from '../components/FileUpload';
import ContractsCountTracker from '../components/ContractsCountTracker';
import TotalEmployeesDisplay from '../components/TotalEmployeesDisplay';
import { getContracts, deleteContract } from '../apis/contractApi';
import { ChevronLeft, ChevronRight, Upload, BarChart2, Users, Search } from 'lucide-react';

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
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        contracts={contracts}
        isOpen={isSidebarOpen}
        onToggle={handleSidebarToggle}
        className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'
          } bg-indigo-800 text-white`}
      />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}>
        <header className="bg-white shadow-md z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Contract Dashboard</h1>
              <div className="flex items-center">
                <div className="relative mr-4">
                  <input
                    type="text"
                    placeholder="Search contracts..."
                    className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button
                  onClick={handleSidebarToggle}
                  className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors duration-200"
                >
                  {isSidebarOpen ? (
                    <ChevronLeft className="w-6 h-6" />
                  ) : (
                    <ChevronRight className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <CompanyDetails className="bg-white rounded-lg shadow-md p-6 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <Upload className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Upload Contract PDF</h3>
                <FileUpload
                  onUpload={handleUpload}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center mb-6">
                  <BarChart2 className="w-12 h-12 text-indigo-600 mb-2" />
                  <h2 className="text-xl font-semibold text-gray-800 text-center">Contracts Count Tracker</h2>
                </div>
                <ContractsCountTracker
                  contracts={contracts}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <Users className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Total Employees</h3>
                <TotalEmployeesDisplay
                  className="text-3xl font-bold text-indigo-600"
                />
              </div>
            </div>

            <ContractList
              contracts={contracts}
              onDelete={handleDelete}
              className="bg-white rounded-lg shadow-md"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;