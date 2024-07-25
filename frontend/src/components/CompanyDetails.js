import React, { useState, useEffect } from 'react';
import { getCompanyDetails, updateCompanyDetails } from '../apis/contractApi';
// import './CompanyDetails.css'; // Import the CSS file if needed for additional styles

const CompanyDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    gemSellerId: '4EEE190001039141',
    companyName: 'UNIFIED EXCELLENCE LLP',
    contactNo: '08500289313',
    email: 'unifiedexcellence2017@gmail.com',
    address: '2F-1, P 101 A, SHAKTINAGAR I MAIN, RAMAKRISHNAPURAM, TIRUMALGHERRY, SECUNDERABAD, Malkajgiri Medchal, TELANGANA-500056',
    msmeVerified: 'Yes',
    msmeRegistrationNumber: 'UDYAM-TS-09-0003611',
    mseSocialCategory: 'OBC',
    mseGender: 'Female',
    gstin: '36AAFFU0545F1ZC',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getCompanyDetails();
        if (data) {
          setDetails(data);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        await updateCompanyDetails(details);
      } catch (error) {
        console.error('Error updating company details:', error);
      }
    }
    setIsEditing(!isEditing);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md  w-700  ">
      <h2 className="text-2xl font-bold text-center mb-6 bg-indian-red rounded-md">Company Details</h2>
      {isEditing ? (
        <form className="space-y-4">
          <label className="block">
            <span className="text-gray-700">GeM Seller ID:</span>
            <input
              type="text"
              name="gemSellerId"
              value={details.gemSellerId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Company Name:</span>
            <input
              type="text"
              name="companyName"
              value={details.companyName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Contact No.:</span>
            <input
              type="text"
              name="contactNo"
              value={details.contactNo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Email ID:</span>
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Address:</span>
            <textarea
              name="address"
              value={details.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">MSME Verified:</span>
            <input
              type="text"
              name="msmeVerified"
              value={details.msmeVerified}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">MSME Registration Number:</span>
            <input
              type="text"
              name="msmeRegistrationNumber"
              value={details.msmeRegistrationNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">MSE Social Category:</span>
            <input
              type="text"
              name="mseSocialCategory"
              value={details.mseSocialCategory}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">MSE Gender:</span>
            <input
              type="text"
              name="mseGender"
              value={details.mseGender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">GSTIN:</span>
            <input
              type="text"
              name="gstin"
              value={details.gstin}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <button
            type="button"
            onClick={handleEditToggle}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <p><strong>GeM Seller ID:</strong> {details.gemSellerId}</p>
          <p><strong>Company Name:</strong> {details.companyName}</p>
          <p><strong>Contact No.:</strong> {details.contactNo}</p>
          <p><strong>Email ID:</strong> {details.email}</p>
          <p><strong>Address:</strong> {details.address}</p>
          <p><strong>MSME Verified:</strong> {details.msmeVerified}</p>
          <p><strong>MSME Registration Number:</strong> {details.msmeRegistrationNumber}</p>
          <p><strong>MSE Social Category:</strong> {details.mseSocialCategory}</p>
          <p><strong>MSE Gender:</strong> {details.mseGender}</p>
          <p><strong>GSTIN:</strong> {details.gstin}</p>
          <button
            onClick={handleEditToggle}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
