// server.js
const path = require('path');
require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const contractRoutes = require('./routes/contractRoutes');
const companyRoutes = require('./routes/companyRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');


const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
// Middleware
// Middleware
app.use(cors({
  origin: '*', // You can restrict this to your frontend's URL if needed
}));

app.use(express.json());
app.use('/api/contracts', contractRoutes);
app.use('/api/company', companyRoutes);
app.use('/api', uploadRoutes);
app.use('/api/contracts/:contractId/employees', employeeRoutes);
app.use('/api/contracts/:contractId/attendance', attendanceRoutes);
app.use('/api/employees', employeeRoutes);

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
