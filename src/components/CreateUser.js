// CreateUser.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateUser = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    phoneNo: '',
    addresses: [
      {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
      },
    ],
  });

  const handleCreate = async () => {
    try {
      // Perform create API call using newUser data
      await axios.post('http://localhost:4000/users', newUser);

      // Display success toast
      toast.success('User created successfully');

      // Redirect to user list
      navigate('/user-list');
    } catch (error) {
      console.error('Error creating user:', error);

      // Display error toast
      toast.error('Error creating user. Please try again.');
    }
  };

  return (
    <div className='page-container'>
      <h2>Create New User</h2>
      <label>Name:</label>
      <input className="input-field" type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
      <label>Email:</label>
      <input className="input-field" type="text" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
      <label>Role:</label>
      <input className="input-field" type="text" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
      <label>Phone No:</label>
      <input className="input-field" type="text" value={newUser.phoneNo} onChange={(e) => setNewUser({ ...newUser, phoneNo: e.target.value })} />

      <label>Addresses:</label>
      {newUser.addresses &&
        newUser.addresses.map((address, index) => (
          <div key={index}>
            <label>Address Line 1:</label>
            <input
              className="input-field"
              type="text"
              value={address.addressLine1}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  addresses: newUser.addresses.map((a, i) =>
                    i === index ? { ...a, addressLine1: e.target.value } : a
                  ),
                })
              }
            />
            {/* Add other address fields as needed */}
          </div>
        ))}

      <button className="login-button" onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateUser;
