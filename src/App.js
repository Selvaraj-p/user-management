import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(apiUrl);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Add a new user
  const addUser = async (user) => {
    try {
      const response = await axios.post(apiUrl, {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        company: { name: user.companyName },
        department: user.department,
      });
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Update an existing user
  const updateUser = async (user) => {
    try {
      const response = await axios.put(`${apiUrl}/${user.id}`, {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        company: { name: user.companyName },
        department: user.department,
      });
      // Update the user in the state after edit
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? response.data : u))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${apiUrl}/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Effect hook to fetch users initially
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <UserForm
        addUser={addUser}
        updateUser={updateUser}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        departments={departments}
      />
      <UserList
        users={users}
        setEditingUser={setEditingUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default App;
