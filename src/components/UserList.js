import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { List, WindowScroller } from 'react-virtualized';
import CircularProgress from '@mui/material/CircularProgress';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const notify = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  

  const fetchUsers = async () => {
    try {
        setIsLoading(true)
      const response = await axios.get('http://your-backend-api-url/users');
  
      if (response.status === 200) {
        setUsers(response.data);
        setIsLoading(false);
      } else {
        console.error('Unexpected response status:', response.status);
        setIsLoading(false);
        notify('Unexpected error occurred while fetching users', 'error');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
      notify('Error fetching users', 'error');
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const rowRenderer = ({ index, key, style }) => {
    const user = users[index];
    return (
      <div key={key} style={style}>
        {/* Render user details here */}
        <span>{user.id}</span>
        <span>{user.name}</span>
        <span>{user.email}</span>
        <button onClick={() => handleDelete(user.id)}>Delete</button>
      </div>
    );
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://your-backend-api-url/users/${userId}`);
  
      if (response.status === 200) {
        fetchUsers();
        notify('User deleted successfully', 'success');
      } else {
        notify('Unexpected error occurred', 'error');
      }
    } catch (error) {
      notify('Error deleting user', 'error');
    }
  };
  
  

  return (
    <>
    {isLoading ? <CircularProgress/> :
        <div>
      <h2>User List</h2>
      <WindowScroller>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <List
            autoHeight
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            rowCount={users.length}
            rowHeight={50}
            rowRenderer={rowRenderer}
            scrollTop={scrollTop}
            width={400}
          />
        )}
      </WindowScroller>
    </div>}
    </>
  );
};

export default UserList;
