import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './BookingR.css'

const GeneratePDFReport = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);

    const fetchProductsByCategory = async (category) => {
        try {
            const response = await fetch(`http://localhost:4000/products/${category}`);
            const data = await response.json();
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCategorySelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
        if (selectedValue) {
            fetchProductsByCategory(selectedValue);
        } else {
            setProducts([]);
        }
    };

    const generatePDFReport = () => {
        if (!selectedCategory || products.length === 0) {
            console.error('Please select a category and fetch products first.');
            return;
        }

        const doc = new jsPDF();
        doc.text(`${selectedCategory} Category Packages Report`, 80, 10);
        products.forEach((product, index) => {
            const startY = 20 + index * 55; // Adjust spacing between product sections
            const descriptionLines = doc.splitTextToSize(product.description, 180); // Adjust width as needed
            doc.text(`${index + 1}. Package Name: ${product.name}`, 10, startY + 10);
            doc.text(`Price: ${product.new_price}`, 10, startY + 25);
            doc.text(`Agency: ${product.agentName}`, 10, startY + 30);
            doc.text(`Created Date: ${product.date}`, 10, startY + 35);
            doc.text('Description:', 10, startY + 40);
            doc.text(descriptionLines, 10, startY + 45); // Adjust vertical spacing
            doc.line(10, startY + 60, 200, startY + 60); // Separator line
        });
        doc.save(`${selectedCategory}_packages.pdf`);
    };

    return (
        <div className="booking-report-container">
            <h1>Packages</h1>
            <div className="date-inputs">
                <label htmlFor="categoryDropdown">Select Category:</label>
                <select id="categoryDropdown" value={selectedCategory} onChange={handleCategorySelect}>
                    <option value="">Select</option>
                    <option value="cultural">Cultural</option>
                    <option value="adventure">Adventure</option>
                    <option value="beach">Beach</option>
                    <option value="wildlife">Wildlife</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            
                <button onClick={generatePDFReport}>Generate PDF Report</button>
            
        </div>
    );
};

export default GeneratePDFReport;
