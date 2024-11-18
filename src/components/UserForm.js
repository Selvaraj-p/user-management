import React, { useState, useEffect } from 'react';
import axios from 'axios';

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];

const UserForm = ({ userToEdit, setRefresh }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        firstName: userToEdit.firstName || '',
        lastName: userToEdit.lastName || '',
        email: userToEdit.email || '',
        department: userToEdit.department || '',
      });
    } else {
      setFormData({ firstName: '', lastName: '', email: '', department: '' });
    }
  }, [userToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = userToEdit && userToEdit.id
      ? `https://jsonplaceholder.typicode.com/users/${userToEdit.id}`
      : 'https://jsonplaceholder.typicode.com/users';
    const method = userToEdit && userToEdit.id ? 'put' : 'post';

    axios({
      method: method,
      url: url,
      data: {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
      },
    })
      .then(() => {
        setRefresh((prev) => !prev);
      })
      .catch((error) => console.error('Error saving user:', error));
  };

  return (
    <div>
      <h2>{userToEdit && userToEdit.id ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <select
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>Select Department</option>
          {departments.map(department => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        <button type="submit">{userToEdit && userToEdit.id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default UserForm;
