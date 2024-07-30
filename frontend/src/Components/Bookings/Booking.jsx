import React, { useState, useEffect } from 'react';
import './Booking.css';

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                if (!token) {
                    throw new Error('Please log in to access this page');
                }

                const response = await fetch('http://localhost:4000/bookings/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }

                const data = await response.json();
                setBookings(data.bookings);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

   
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="user-bookings-container">
         
            {bookings.length === 0 ? (
                <p>No bookings made by you</p>
            ) : (
                <ul className="user-bookings-list">
                    {bookings.map((booking, index) => (
                        <li key={index} className="user-bookings-item">
                            <p className="bold">Package : {booking.productName}</p>
                            <p>Number of individuals: {booking.Number}</p>
                            <p>Agency: {booking.agentName}</p>
                            <p>Booked On: {booking.created_at}</p>
                            <p className={booking.approved ? 'approved-yes' : 'approved-no'}>
                                Approved: {booking.approved ? 'Yes' : 'No'}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserBookings;