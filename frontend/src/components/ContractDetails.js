import React from 'react';
// import './ContractDetails.css'; // Import any custom CSS if needed

const ContractDetails = ({ contract }) => {
  return (
    <div className="contract-details p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contract Details</h2>
      <div className="info space-y-2">
        <div className="bg-alice-blue p-4 rounded-md shadow-sm">
          <span className="block text-gray-700 text-lg"><strong>Bid No:</strong> {contract.bid_no}</span>
        </div>
        <div className="bg-alice-blue p-4 rounded-md shadow-sm">
          <span className="block text-gray-700 text-lg"><strong>Client Name:</strong> {contract.clientName}</span>
        </div>
        <div className="bg-alice-blue p-4 rounded-md shadow-sm">
          <span className="block text-gray-700 text-lg"><strong>Place:</strong> {contract.place}</span>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;
