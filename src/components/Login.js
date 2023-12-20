// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const notify = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleLogin = async () => {
    try {
      // Show loading spinner
      setIsLoading(true);

      // Make the API call to login
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });

      // Hide loading spinner
      setIsLoading(false);

      if (response.status === 200) {
        // Login successful
        // Assuming the backend returns a token
        const token = response.data.token;
        
        // You may handle authentication, set tokens, redirect, etc.
        // For example, you can store the token in localStorage
        localStorage.setItem('token', token);

        notify('Login successful', 'success');
      } else {
        console.error('Unexpected response status:', response.status);
        setError('Unexpected error occurred during login');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error during login. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <input type="text" className="input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="input-field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="login-button" onClick={handleLogin} disabled={isLoading}>
        {isLoading ? <CircularProgress size={20} /> : 'Login'}
      </button>
      {error && <div className="error-message">{error}</div>}
      <ToastContainer />
    </div>

  );
};

export default Login;
