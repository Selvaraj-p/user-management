import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
    const [userToEdit, setUserToEdit] = useState(null);

    return (
        <div>
            <UserList setUserToEdit={setUserToEdit} />
            <UserForm userToEdit={userToEdit} />
        </div>
    );
};

export default App;
