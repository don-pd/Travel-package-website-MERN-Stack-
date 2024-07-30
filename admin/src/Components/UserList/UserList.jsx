import React, { useState, useEffect } from 'react';
import './UserList.css'

const AllUsers = () => {
    const [allusers, setAllUsers] = useState([]);

    const fetchUsers = async () => {
        await fetch('http://localhost:4000/allusers')
            .then((res) => res.json())
            .then((data) => {
                setAllUsers(data);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

   // Frontend React code (AllUsers component)

const handleRemoveUser = async (uid) => {
    console.log('Removing user with ID:', uid);
    await fetch('http://localhost:4000/removeuser', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: uid }), // Use 'uid' instead of 'id'
    });
    await fetchUsers();
};

    return (
        <div className="all-users">
            <h2>All Users</h2>

                {allusers.map((user, index) => (
                    <div key={index}>
                        Name: {user.name},<br/>Email: {user.email}, <br/>Usertype: {user.usertype}<br/>
                        <button onClick={() => handleRemoveUser(user.uid)}>Remove</button><br/><br/>
                    </div>
                ))}
            </div>
        
    );
};

export default AllUsers;
