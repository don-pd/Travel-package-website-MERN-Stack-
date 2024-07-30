import React, { useState } from 'react';
import jsPDF from 'jspdf';

const UserAgentDetailsPDF = () => {
    const [users, setUsers] = useState([]);
    const [agents, setAgents] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleGeneratePDF = async () => {
        try {
            const response = await fetch(`http://localhost:4000/users-agents-details?startDate=${startDate}&endDate=${endDate}`);
            const result = await response.json();

            if (result.success) {
                setUsers(result.users);
                setAgents(result.agents);
                generatePDF(result.users, result.agents);
            } else {
                console.error('Error fetching data:', result.error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const generatePDF = (users, agents) => {
        const doc = new jsPDF();

        doc.text('User Signup report', 80, 10);
        
        if (startDate && endDate) {
            doc.text(`Date Range: ${startDate} to ${endDate}`, 10, 20); // Add date range
        } else {
            doc.text(' ', 10, 20); // 
        }


        let y = 30;
        doc.text('Users Registered:', 10, y);
        y += 10;

        users.forEach((user) => {
            const formattedUser = [
                `Name: ${user.name}`,
                `Email: ${user.email}`,
                `UID: ${user.uid}`,
                `User Type: ${user.usertype}`,
                `Date: ${user.date}`
            ];
            const text = formattedUser.join('\n');
            doc.text(text, 15, y);
            y += 40;
        });

        y += 20;
        doc.text('Agents registered :', 10, y);
        y += 10;

        agents.forEach((agent) => {
            const formattedAgent = [
                `Name: ${agent.name}`,
                `Email: ${agent.email}`,
                `UID: ${agent.uid}`,
                `User Type: ${agent.usertype}`,
                `Date: ${agent.date}`
            ];
            const text = formattedAgent.join('\n');
            doc.text(text, 15, y);
            y += 35;
        });

        doc.save('users_agents_details.pdf');
    };

    return (
        <div className="booking-report-container">
            <h1>Users and Agents Signup</h1>
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

export default UserAgentDetailsPDF;
