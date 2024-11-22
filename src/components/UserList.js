import React from "react";

function UserList({ users, setEditingUser, deleteUser }) {
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email}) - {user.company.name} -{" "}
            {user.department || "N/A"}
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
