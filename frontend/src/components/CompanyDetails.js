import React, { useState, useEffect } from 'react';
import { getCompanyDetails, updateCompanyDetails } from '../apis/contractApi';
import { motion } from 'framer-motion';
import { Building2, Phone, Mail, MapPin, CheckCircle, FileText, Users, User, CreditCard } from 'lucide-react';

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
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const DetailsItem = ({ icon, label, value, name }) => (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
      {icon}
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        ) : (
          <p className="text-base font-semibold text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
        <h2 className="text-3xl font-bold text-white mb-2">Company Details</h2>
        <p className="text-indigo-100">Manage your company information</p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailsItem icon={<Building2 className="text-indigo-500" />} label="Company Name" value={details.companyName} name="companyName" />
        <DetailsItem icon={<CreditCard className="text-indigo-500" />} label="GeM Seller ID" value={details.gemSellerId} name="gemSellerId" />
        <DetailsItem icon={<Phone className="text-indigo-500" />} label="Contact No." value={details.contactNo} name="contactNo" />
        <DetailsItem icon={<Mail className="text-indigo-500" />} label="Email ID" value={details.email} name="email" />
        <DetailsItem icon={<MapPin className="text-indigo-500" />} label="Address" value={details.address} name="address" />
        <DetailsItem icon={<CheckCircle className="text-indigo-500" />} label="MSME Verified" value={details.msmeVerified} name="msmeVerified" />
        <DetailsItem icon={<FileText className="text-indigo-500" />} label="MSME Registration Number" value={details.msmeRegistrationNumber} name="msmeRegistrationNumber" />
        <DetailsItem icon={<Users className="text-indigo-500" />} label="MSE Social Category" value={details.mseSocialCategory} name="mseSocialCategory" />
        <DetailsItem icon={<User className="text-indigo-500" />} label="MSE Gender" value={details.mseGender} name="mseGender" />
        <DetailsItem icon={<CreditCard className="text-indigo-500" />} label="GSTIN" value={details.gstin} name="gstin" />
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEditToggle}
          className={`w-full text-center py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
        >
          {isEditing ? 'Save Changes' : 'Edit Details'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CompanyDetails;