import React, { useState, useEffect } from 'react';
import './Approve.css'

const AdminApproval = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsersPendingApproval();
    }, []);

  

    const fetchUsersPendingApproval = async () => {
        try {
            const response = await fetch('http://localhost:4000/admin/users/pending');
            const data = await response.json();
    
            if (data.success) {
                setUsers(data.users);
            } else {
                console.error('Error fetching users:', data.error);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    

    const handleApproveUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/approve/${userId}`, {
                method: 'PATCH',
            });
            const data = await response.json();

            if (data.success) {
                // Remove the approved user from the list
                setUsers(users.filter(user => user._id !== userId));
            } else {
                console.error('Error approving user:', data.error);
            }
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    return (
        <div className="admin-approval">
            <h2>Agents Pending Approval</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleApproveUser(user._id)}>Approve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminApproval;
