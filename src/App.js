import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);
  const [setRefresh] = useState(false);

  return (
    <div className="container">
      <UserList setUserToEdit={setUserToEdit} setRefresh={setRefresh} />
      <UserForm userToEdit={userToEdit} setRefresh={setRefresh} />
    </div>
  );
};

export default App;
