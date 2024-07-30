// UserDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css'; // Import CSS file

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                if (!token) {
                    throw new Error('Please log in to access user details');
                }

                const response = await axios.get('http://localhost:4000/user-details', {
                    headers: {
                        'auth-token': token,
                    },
                });

                if (!response.data.success) {
                    throw new Error('Failed to fetch user details');
                }

                setUserDetails(response.data.user);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user details:', error.message);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return <div>Loading user details...</div>;
    }

    if (!userDetails) {
        return <div >You are not logged in.</div>;
    }

    return (
        <div className="user-details-container">

            <div className="user-details-item">
                <span className="user-details-label">Email:</span>
                <span className="user-details-value">{userDetails.email}</span>
            </div>
            <div className="user-details-item">
                <span className="user-details-label">Username:</span>
                <span className="user-details-value">{userDetails.username}</span>
            </div>
            <div className="user-details-item">
                <span className="user-details-label">Profile Type:</span>
                <span className="user-details-value">{userDetails.usertype}</span>
            </div>
            <div className="user-details-item">
                <span className="user-details-label">User ID:</span>
                <span className="user-details-value">{userDetails.id}</span>
            </div>
            {/* Add other user details here */}
        </div>
    );
};

export default UserDetails;
