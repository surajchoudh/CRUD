import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch users from the mock API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const addUser = () => {
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', email: '' });
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };

  const updateUser = (id, updatedUserData) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUserData)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, ...updatedUserData } : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const filteredUsers = users.filter((user) => user.id !== id);
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Form for adding a new user */}
      <form onSubmit={(e) => {
        e.preventDefault();
        addUser();
      }}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      {/* Display list of users */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => updateUser(user.id, { name: 'Updated Name', email: 'updated@email.com' })}>
              Update
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
