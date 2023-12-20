import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserDetail = ({ match }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${match.params.userId}`);
        setUser(response.data);
      } catch (error) {
        notify('Error fetching user detail:', 'error');
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

  return (
    <div>
      <h2>User Detail</h2>
      {user && (
        <div>
          <p>ID: {user._id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
