import React, { useState, useEffect } from "react";

function UserForm({ addUser, updateUser, editingUser, setEditingUser, departments }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    department: "",
  });

  // Populate form with user data when editing
  useEffect(() => {
    if (editingUser) {
      const [firstName, lastName] = editingUser.name.split(" ");
      setFormData({
        firstName,
        lastName,
        email: editingUser.email,
        companyName: editingUser.company.name,
        department: editingUser.department || "",
      });
    }
  }, [editingUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser({ ...formData, id: editingUser.id });
      setEditingUser(null);
    } else {
      addUser(formData);
    }
    setFormData({ firstName: "", lastName: "", email: "", companyName: "", department: "" });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ firstName: "", lastName: "", email: "", companyName: "", department: "" });
  };

  return (
    <div>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Company:
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Department:
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">{editingUser ? "Update" : "Add"}</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UserForm;
