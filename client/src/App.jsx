import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Customers from './pages/Customers';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome to the CRM App</h1>} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;