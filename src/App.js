import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';
import UserDetail from './components/UserDetails';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={<Login/>} />
        <Route path="/user/list" component={UserList} />
        <Route path="/user/detail/:id" component={UserDetail} />
        <Route path="/user/create" component={CreateUser} />
        <Route path="/user/edit/:id" component={EditUser} />
      </Routes>
    </Router>
  );
};

export default App;
