// components/InvoiceGenerator.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './InvoiceGenerator.css';

const InvoiceGenerator = ({ contractId, month, year }) => {
    const [salaries, setSalaries] = useState([]);

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/contracts/${contractId}/salaries`, {
                    params: { month, year }
                });
                setSalaries(response.data);
                console.log('Fetched salary records:', response.data);
            } catch (error) {
                console.error('Error fetching salary records:', error);
            }
        };

        fetchSalaries();
    }, [contractId, month, year]);

    // Calculate values for the invoice
    const wages = salaries.reduce((acc, curr) => acc + curr.grossSalary, 0);
    const employerEPF = salaries.reduce((acc, curr) => acc + curr.employerEPF, 0);
    const employerESIC = salaries.reduce((acc, curr) => acc + curr.employerESIC, 0);
    const adminCharges = salaries.reduce((acc, curr) => acc + curr.adminCharges, 0);
    const epf13Percent = employerEPF + employerESIC + adminCharges;
    const esic325Percent = employerESIC;
    const subTotalD = wages + epf13Percent + esic325Percent;
    const serviceCharges = subTotalD * 0.85 / 100;
    const gst18Percent = subTotalD * 18 / 100;
    const total = subTotalD + serviceCharges + gst18Percent;

    const serviceChargesExcludingGST = subTotalD * 0.72 / 100;
    const taxableValue = subTotalD + serviceChargesExcludingGST;
    const totalGST = taxableValue * 18 / 100;
    const finalTotal = taxableValue + totalGST;

    const handlePrint = () => {
        const printContent = document.getElementById('invoice').outerHTML;
        const printWindow = window.open('', '', 'height=800,width=1200');
        printWindow.document.write('<html><head><title>Invoice</title>');
        printWindow.document.write('<style>table {width: 100%;border-collapse: collapse;} th, td {border: 1px solid black;padding: 8px;text-align: left;} .no-print {display: none;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="invoice-generator">
            <button onClick={handlePrint} className="print-button no-print">Print Invoice</button>
            <div id="invoice">
                <h2>{`Invoice for ${month}/${year}`}</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>WAGES (A)</td>
                            <td>{wages.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>EPF 13% on max. Rs.15,000/- (B)</td>
                            <td>{epf13Percent.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>ESIC (C) 3.25%</td>
                            <td>{esic325Percent.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>SUB TOTAL (D) = A+B+C</td>
                            <td>{subTotalD.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>SERVICE CHARGES (0.85% including GST) on (D)</td>
                            <td>{serviceCharges.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>GST 18% on (D)</td>
                            <td>{gst18Percent.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>TOTAL</td>
                            <td>{total.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">INVOICE Details</td>
                        </tr>
                        <tr>
                            <td>(I) WAGES + EPF + ESIC = (D)</td>
                            <td>{subTotalD.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>(II) SERVICE CHARGES (0.85% including GST i.e.0.72 excluding GST)</td>
                            <td>{serviceChargesExcludingGST.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>(III) SUB TOTAL i.e. TAXABLE VALUE</td>
                            <td>{taxableValue.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>TOTAL GST 18%</td>
                            <td>{totalGST.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>TOTAL</td>
                            <td>{finalTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Rounded Off</td>
                            <td>{Math.round(finalTotal)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoiceGenerator;
