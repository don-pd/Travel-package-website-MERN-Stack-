import React, { useState } from 'react';
import jsPDF from 'jspdf';

const UserProductsPDF = () => {
    const [data, setData] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleGeneratePDF = async () => {
        try {
            const response = await fetch(`http://localhost:4000/uploadedproductss?startDate=${startDate}&endDate=${endDate}`);
            const result = await response.json();

            if (result.success) {
                setData(result.uploadedProductsByAgents);
                generatePDF(result.uploadedProductsByAgents);
            } else {
                console.error('Error fetching data:', result.error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const generatePDF = (uploadedProductsByAgents) => {
        const doc = new jsPDF();
        doc.text('Report of registered packages', 80, 10);

        let y = 10;

        if (startDate && endDate) {
            doc.text(`Date Range: ${startDate} to ${endDate}`, 10, 20); // Add date range
        } else {
            doc.text(' Registered packages:-', 20, y); // No date range specified, show all bookings
        }
        y += 20;

        for (const agentName in uploadedProductsByAgents) {
            if (uploadedProductsByAgents.hasOwnProperty(agentName)) {
                const products = uploadedProductsByAgents[agentName];


                doc.text(`- ${agentName}'s Packages:`, 20, y);
                y += 15;

                 
        
                products.forEach((product, index) => {
                    const formattedProduct = [
                        `Name: ${product.name}`,
                        `Category: ${product.category}`,
                        `Price: ${product.new_price.toFixed(2)}`,
                        `Date: ${new Date(product.date).toLocaleDateString()}`,
                        `Available: ${product.available ? 'Yes' : 'No'}`,
                        `Description: ${product.description || 'N/A'}`,
                    ];

                    const text = formattedProduct.join('\n');
                    doc.text(text, 20, y);
                    y += 45; // Increased line spacing for better readability
                });

                y += 20;
            }
        }

        doc.save('Agent_products.pdf');
    };

    return (
        <div className="booking-report-container">
            <h1>Packages uploaded</h1>
            <div className="date-inputs">
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="date-inputs">
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button onClick={handleGeneratePDF}>Generate PDF</button>
        </div>
    );
};

export default UserProductsPDF;
