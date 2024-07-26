import React from 'react';
// import './ContractList.css'; // Import the CSS file if needed for additional styles

const ContractList = ({ contracts, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Contracts</h2>
      {contracts.length === 0 ? (
        <p className="text-center text-gray-500">No contracts available.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-indian-red">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Contract No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Client Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract._id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-600">{contract.contract_no}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{contract.clientName}</td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => onDelete(contract._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContractList;
