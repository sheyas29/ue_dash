import React from 'react';
import { Check, Clock, Archive,BarChart2 } from 'lucide-react';

const ContractsCountTracker = ({ contracts }) => {
  const activeContracts = contracts.filter(contract => contract.status === 'Active').length;
  const upcomingContracts = contracts.filter(contract => contract.status === 'Pending').length;
  const completedContracts = contracts.filter(contract => contract.status === 'Completed').length;

  const CountCard = ({ icon: Icon, title, count, color }) => (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <div className={`p-3 rounded-full ${color.replace('text-', 'bg-')} bg-opacity-10 mb-4`}>
        <Icon className={`${color} w-8 h-8`} />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className={`text-2xl font-semibold ${color}`}>{count}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      {/* <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Contracts Count Tracker</h2>
      
      <BarChart2 className="w-6 h-6 text-blue-500" /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CountCard 
          icon={Check} 
          title="Active" 
          count={activeContracts} 
          color="text-green-500"
        />
        <CountCard 
          icon={Clock} 
          title="Upcoming" 
          count={upcomingContracts} 
          color="text-yellow-500"
        />
        <CountCard 
          icon={Archive} 
          title="Completed" 
          count={completedContracts} 
          color="text-blue-500"
        />
      </div>
    </div>
  );
};

export default ContractsCountTracker;
