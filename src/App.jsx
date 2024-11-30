import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [store, setStore] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
  });
  

  // Handles input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStore((prevStore) => ({
      ...prevStore,
      [name]: value,
    }));
  };

  // Adds or updates data
  const addData = () => {
    if (editIndex !== null) {
      // Update existing user
      const updatedUsers = users.map((user, index) =>
        index === editIndex ? store : user
      );
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      // Add new user
      setUsers((prevUsers) => [...prevUsers, store]);
    }
    setStore({
      name: '',
      age: '',
      email: '',
      phone: '',
    });
  };

  // Handles delete action
  const deleteUser = (index) => {
    const filteredUsers = users.filter((_, i) => i !== index);
    setUsers(filteredUsers);
  };

  // Handles edit action
  const editUser = (index) => {
    setStore(users[index]);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <div className="form">
        <input
          value={store.name}
          onChange={handleInputChange}
          name="name"
          type="text"
          placeholder="Enter your name"
        />
        <br />
        <input
          value={store.age}
          onChange={handleInputChange}
          name="age"
          type="number"
          placeholder="Enter your age"
        />
        <br />
        <input
          value={store.email}
          onChange={handleInputChange}
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <br />
        <input
          value={store.phone}
          onChange={handleInputChange}
          name="phone"
          type="number"
          placeholder="Enter your phone"
        />
        <br />
        <button onClick={addData}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="datatable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => editUser(index)}>Edit</button>
                  <button onClick={() => deleteUser(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
