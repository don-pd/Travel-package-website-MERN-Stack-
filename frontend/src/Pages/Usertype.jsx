import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

const Usertype = () => {
    const navigate = useNavigate(); // Get the navigate function for navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/check-usertype', {
                    method: 'GET',
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                });

                console.log("agent");

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Response is not in JSON format.');
                }

                const data = await response.json();
                console.log(data); // true if admin, false otherwise

                // If isAdmin is true, navigate to the sidebar
                if (data) {
                    navigate('/sidebar'); // Navigate to the sidebar route
                }
                else{
                   navigate('/')

                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error appropriately, e.g., show an error message to the user
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return (
        <div></div>
    );
};

export default Usertype;
