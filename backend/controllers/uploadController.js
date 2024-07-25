const pdfParse = require('pdf-parse');
const Contract = require('../models/Contract');

// Function to sanitize the place field
const sanitizePlace = (place) => {
  // Remove everything after the last occurrence of "India"
  const indiaIndex = place.lastIndexOf('India');
  if (indiaIndex !== -1) {
    place = place.substring(0, indiaIndex + 5); // Include "India"
  }
  // Remove extra spaces, new lines, and unwanted characters from the end
  return place.replace(/[^\w\s,.-]/g, '').trim();
};

// Function to extract contract details from PDF text
const extractContractDetails = (text) => {
  const contractDetails = {
    contract_no: '',
    bid_no: '',
    clientName: '',
    place: '',
    value: '',
    startDate: '',
    endDate: '',
    status: '',
  };

  console.log('Extracting contract details...');

  // Adjust parsing logic based on the structure of your PDF
  const contractNoMatch = text.match(/Contract No[:\s]*([\w-]+)/i);
  const bidNoMatch = text.match(/Bid\/RA\/PBP No\.\s*:\s*([\w\/-]+)/i);
  const clientNameMatch = text.match(/Organisation Name[:\s]+(.+?)\n/i);
  const placeMatch = text.match(/Address\s*:\s*([\s\S]*?)(?=Total Value Including Addons|Financial Approval Detail|Designation of Administrative Approval|GSTIN|Contact No|Email ID|S.No|$)/i);
  const valueMatch = text.match(/Total Value Including Addons\(INR\)[:\s]*([\d,]+(\.\d+)?)/i);
  const startDateMatch = text.match(/Service Start Date \(latest by\)[:\s]*(\d{2}-\w{3}-\d{4})/i);
  const endDateMatch = text.match(/Service End Date[:\s]*(\d{2}-\w{3}-\d{4})/i);

  if (contractNoMatch) contractDetails.contract_no = contractNoMatch[1];
  if (bidNoMatch) contractDetails.bid_no = bidNoMatch[1];
  if (clientNameMatch) contractDetails.clientName = clientNameMatch[1].trim().substring(0, 100);
  if (placeMatch) contractDetails.place = sanitizePlace(placeMatch[1].trim().replace(/\n/g, ' ')).substring(0, 300);
  if (valueMatch) contractDetails.value = parseFloat(valueMatch[1].replace(/,/g, ''));
  if (startDateMatch) contractDetails.startDate = startDateMatch[1];
  if (endDateMatch) contractDetails.endDate = endDateMatch[1];

  // Calculate status
  const today = new Date();
  const startDate = new Date(contractDetails.startDate);
  const endDate = new Date(contractDetails.endDate);
  if (today < startDate) {
    contractDetails.status = 'Pending';
  } else if (today >= startDate && today <= endDate) {
    contractDetails.status = 'Active';
  } else if (today > endDate) {
    contractDetails.status = 'Completed';
  }

  console.log('Contract details extracted:', contractDetails);
  return contractDetails;
};

exports.uploadContract = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const data = await pdfParse(req.file.buffer);
    const contractDetails = extractContractDetails(data.text);

    const newContract = new Contract(contractDetails);
    await newContract.save();
    res.status(201).json(newContract);
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).json({ error: error.message });
  }
};
