import React, { useState, useEffect } from 'react';

const AgentBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                if (!token) {
                    throw new Error('Please log in to access this page');
                }

                const response = await fetch('http://localhost:4000/bookings/agent', {
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

    const handleApproveReject = async (bookingId, approved) => {
        try {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                throw new Error('Please log in to perform this action');
            }

            const response = await fetch(`http://localhost:4000/bookings/${bookingId}/approve`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
                body: JSON.stringify({ approved }), // Send approved status in the request body
            });

            if (!response.ok) {
                throw new Error('Failed to update booking status');
            }

            // Update the bookings state after successful approval/rejection
            const updatedBookings = bookings.map(booking => {
                if (booking._id === bookingId) {
                    return { ...booking, approved }; // Update the approved status for the specific booking
                }
                return booking;
            });

            setBookings(updatedBookings);
        } catch (error) {
            console.error('Error updating booking status:', error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Agent Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found for this agent</p>
            ) : (
                <ul>
                    {bookings.map(booking => (
                        <li key={booking._id}>
                            {/* Display booking details */}
                            <p>User ID: {booking.userName}</p>
                            <p>Product Name: {booking.productName}</p>
                            <p>Booked On: {booking.created_at}</p>
                            <p>Number of individuals: {booking.Number}</p>
                            <p>Approved: {booking.approved ? 'Yes' : 'No'}</p>
                            
                            {/* Add approve and reject buttons */}
                            {!booking.approved && (
                                <>
                                    <button onClick={() => handleApproveReject(booking._id, true)}>Approve</button>
                                    
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AgentBookings;
