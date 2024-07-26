// src/config.js
const SERVER_IP = process.env.REACT_APP_SERVER_IP || 'http://192.168.0.103:5000';

export const API_URL = `${SERVER_IP}/api/contracts`;
export const COMPANY_API_URL = `${SERVER_IP}/api/company`;
export const EMPLOYEES_API_URL = `${SERVER_IP}/api/employees`;
export const UPLOAD_API_URL = `${SERVER_IP}/api/upload`;