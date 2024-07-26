import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { API_URL } from '../config';

const GenerateInvoice = ({ contractId, month, year }) => {
    const [salaries, setSalaries] = useState([]);
    const invoiceRef = useRef();

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await axios.get(`${API_URL}/${contractId}/salaries`, {
                    params: { month, year }
                });
                setSalaries(response.data);
            } catch (error) {
                console.error('Error fetching salary records:', error);
            }
        };

        fetchSalaries();
    }, [contractId, month, year]);

    const formatMonth = (month) => {
        const monthNames = [
            "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
            "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
        ];
        if (typeof month === 'string') {
            const monthNumber = parseInt(month, 10);
            if (!isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12) {
                return monthNames[monthNumber - 1];
            }
            return month.toUpperCase();
        } else if (typeof month === 'number' && month >= 1 && month <= 12) {
            return monthNames[month - 1];
        }
        return 'UNKNOWN MONTH';
    };

    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
        documentTitle: `${formatMonth(month)}-${year}-Invoice`,
    });

    const totalGrossSalary = salaries.reduce((acc, curr) => acc + curr.grossSalary, 0);
    const totalEmployerEPF = salaries.reduce((acc, curr) => acc + curr.employerEPF, 0);
    const totalEmployerESIC = salaries.reduce((acc, curr) => acc + curr.employerESIC, 0);
    const totalAdminCharges = salaries.reduce((acc, curr) => acc + curr.adminCharges, 0);
    const totalContribution = salaries.reduce((acc, curr) => acc + curr.contribution, 0);

    const subTotalD = totalGrossSalary + totalEmployerEPF + totalEmployerESIC;
    const serviceCharges = 0.85 * subTotalD / 100;
    const gst = 18 * subTotalD / 100;
    const total = subTotalD + serviceCharges + gst;

    const serviceChargesExcludingGST = 0.72 * subTotalD / 100;
    const subTotalTaxableValue = subTotalD + serviceChargesExcludingGST;
    const totalGST = 18 * subTotalTaxableValue / 100;
    const totalInvoice = subTotalTaxableValue + totalGST;

    return (
        <div className="invoice-display">
            <h2>{formatMonth(month)}/{year} Invoice</h2>
            <button onClick={handlePrint} className="print-button">Print Invoice</button>
            <div ref={invoiceRef} className="invoice-content">
                <div className="invoice-header">
                    <h1>Invoice for {formatMonth(month)} {year}</h1>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>WAGES (A)</td>
                            <td>{totalGrossSalary.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>EPF 13% on max.Rs.15,000/- (B)</td>
                            <td>{totalEmployerEPF.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>ESIC (C) 3.25%</td>
                            <td>{totalEmployerESIC.toFixed(2)}</td>
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
                            <td>{gst.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>TOTAL</td>
                            <td>{total.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="2"></td>
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
                            <td>{subTotalTaxableValue.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>TOTAL GST 18%</td>
                            <td>{totalGST.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>TOTAL</td>
                            <td>{totalInvoice.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Rounded Off</td>
                            <td>{Math.round(totalInvoice)}</td>
                        </tr>
                        <tr>
                            <td>Wages increased w.e.f. 01.04.2024</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GenerateInvoice;
