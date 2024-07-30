// src/BookingReport.js
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import './BookingR.css';

const BookingReport = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [report, setReport] = useState(null);

    useEffect(() => {
        const fetchBookingReport = async () => {
            try {
                const queryParams = new URLSearchParams({ startDate, endDate }).toString();
                const response = await fetch(`http://localhost:4000/bookings/report?${queryParams}`);
                const data = await response.json();
                setReport(data.report);
            } catch (error) {
                console.error('Error fetching booking report:', error);
            }
        };

        fetchBookingReport();
    }, [startDate, endDate]); // Fetch report when startDate or endDate changes

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Booking report', 80, 10);
        
        if (startDate && endDate) {
            doc.text(`Date Range: ${startDate} to ${endDate}`, 10, 20); // Add date range
        } else {
            doc.text(' All bookings:-', 10, 20); // No date range specified, show all bookings
        }
    
        let y = 30; // Adjust starting y position based on date range text
        Object.entries(report).forEach(([productId, userData]) => {
            doc.text(`Package: ${productId}`, 10, y);
            y += 10; // Increase y position
    
            Object.entries(userData).forEach(([userName, bookingData]) => {
                doc.text(`- Booked by: ${userName}`, 15, y);
                y += 5; // Move to the next line
                doc.text(`  No of individuals: ${bookingData.count}`, 15, y);
                y += 5; // Move to the next line
                doc.text(`  Booked on: ${bookingData.dates}`, 15, y);
                y += 10; // Move to the next block of data
            });
            
            y += 5; // Add extra space between packages
        });
    
        doc.save('booking_report.pdf');
    };
    
    

    return (
        <div className="booking-report-container">
            <h1>Bookings made by users</h1>
            <div className="date-inputs">
                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button onClick={generatePDF}>Generate PDF Report</button>
        </div>
    );
};

export default BookingReport;