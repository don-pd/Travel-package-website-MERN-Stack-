// UserProfilePage.js

import React from 'react';
import UserDetails from './UserProfile'; // Import the UserDetails component
import UserBookings from '../Bookings/Booking'; // Import the UserBookings component
import './UserDash.css'; // Import the UserProfilePage CSS file

const UserProfilePage = () => {
    return (
        <div className="user-profile-page">
            <div className="user-details-section">
                <h2>User Details</h2>
                <UserDetails /> {/* Render the UserDetails component */}
            </div>

            <div className="user-bookings-section">
                <h2>User Bookings</h2>
                <UserBookings /> {/* Render the UserBookings component */}
            </div>
        </div>
    );
};

export default UserProfilePage;
