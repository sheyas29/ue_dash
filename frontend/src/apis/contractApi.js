import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contracts';
const COMPANY_API_URL = 'http://localhost:5000/api/company';
const EMPLOYEES_API_URL = 'http://localhost:5000/api/employees';

export const getContracts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contracts:', error);
    throw error;
  }
};

export const createContract = async (contract) => {
  try {
    const response = await axios.post(API_URL, contract);
    return response.data;
  } catch (error) {
    console.error('Error creating contract:', error);
    throw error;
  }
};

export const getCompanyDetails = async () => {
  try {
    const response = await axios.get(COMPANY_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching company details:', error);
    throw error;
  }
};

export const updateCompanyDetails = async (details) => {
  try {
    const response = await axios.put(COMPANY_API_URL, details);
    return response.data;
  } catch (error) {
    console.error('Error updating company details:', error);
    throw error;
  }
};

export const getTotalEmployees = async () => {
  try {
    const response = await axios.get(`${EMPLOYEES_API_URL}/total`);
    return response.data.totalEmployees;
  } catch (error) {
    console.error('Error fetching total employees:', error);
    throw error;
  }
};

export const deleteContract = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting contract:', error);
    throw error;
  }
};

export const generateSalaries = async (contractId, month, year) => {
  try {
    const response = await axios.post(`${API_URL}/${contractId}/salaries/generate`, { month, year });
    return response.data;
  } catch (error) {
    console.error('Error generating salaries:', error);
    throw error;
  }
};

export const deleteSalaries = async (contractId, month, year) => {
  try {
    await axios.delete(`${API_URL}/${contractId}/salaries/delete`, { data: { month, year } });
  } catch (error) {
    console.error('Error deleting salaries:', error);
    throw error;
  }
};

export const getSalaries = async (contractId, month, year) => {
  try {
    const response = await axios.get(`${API_URL}/${contractId}/salaries`, { params: { month, year } });
    return response.data;
  } catch (error) {
    console.error('Error fetching salary records:', error);
    throw error;
  }
};
