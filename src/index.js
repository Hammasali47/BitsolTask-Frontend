import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Login from './components/Login';
import UserList from './components/UserList';
import UserDetail from './components/UserDetails';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/user/list" element={<UserList/>} />
        <Route path="/user/detail/:id" element={<UserDetail/>} />
        <Route path="/user/create" element={<CreateUser/>} />
        <Route path="/user/edit/:id" element={<EditUser/>} />
        <Route path="*" element={<Navigate to="/user/list" replace />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
