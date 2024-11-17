import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ setUserToEdit, setRefresh }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, [setRefresh]);

    const deleteUser = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(() => setRefresh(prev => !prev))
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div>
            <h2>User List</h2>
            <button onClick={() => setUserToEdit(null)}>Add User</button>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email}) - {user.department}
                        <button onClick={() => setUserToEdit(user)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
