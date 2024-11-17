import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ userToEdit, setRefresh }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
    });

    useEffect(() => {
        if (userToEdit) {
            setFormData(userToEdit);
        } else {
            setFormData({ name: '', email: '', department: '' });
        }
    }, [userToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = userToEdit ? `https://jsonplaceholder.typicode.com/users/${userToEdit.id}` : 'https://jsonplaceholder.typicode.com/users';
        const method = userToEdit ? 'put' : 'post';

        axios[method](url, formData)
            .then(() => setRefresh(prev => !prev))
            .catch(error => console.error('Error saving user:', error));
    };

    return (
        <div>
            <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Name" required />
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" required />
                <input type="text" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} placeholder="Department" required />
                <button type="submit">{userToEdit ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default UserForm;
