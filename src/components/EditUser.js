import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditUser = ({ match }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${match.params.userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user detail:', error);
      }
    };

    fetchUserDetail();
  }, [match.params.userId]);

  const notify = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleUpdate = async () => {
    try {
      // Perform update API call using user._id and updated data
      await axios.put(`http://localhost:4000/users/${user._id}`, user);

      // Display success toast
      notify('User updated successfully', 'success');

      // Redirect to user list
      navigate('/user-list');
    } catch (error) {
      console.error('Error updating user:', error);

      // Display error toast
      notify('Error updating user. Please try again.', 'error');
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      {user && (
        <div>
          <label>ID:</label>
          <p>{user._id}</p>
          <label>Name:</label>
          <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
          <label>Email:</label>
          <input type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <label>Role:</label>
          <input type="text" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} />
          <label>Phone No:</label>
          <input type="text" value={user.phoneNo} onChange={(e) => setUser({ ...user, phoneNo: e.target.value })} />

          <label>Addresses:</label>
          {user.addresses &&
            user.addresses.map((address, index) => (
              <div key={index}>
                <label>Address Line 1:</label>
                <input
                  type="text"
                  value={address.addressLine1}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      addresses: user.addresses.map((a, i) =>
                        i === index ? { ...a, addressLine1: e.target.value } : a
                      ),
                    })
                  }
                />
                {/* Add other address fields as needed */}
              </div>
            ))}

          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default EditUser;
