import React from 'react';
import logo from './logo.svg';
import './App.css';

import UserList from './components/UserList'
import UserForm from './components/UserForm/index'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello World</p>
      </header>

      <UserForm />
      <UserList />
    </div>
  );
}

export default App;
