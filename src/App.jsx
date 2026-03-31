import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import JobList from './pages/JobList';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

import { useState } from 'react';

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user'));
  });

  return (
    <Router>
      {user && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path="/" element={user ? (
          user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/jobs" />
        ) : <Navigate to="/login" />} />

        <Route path="/login" element={<LoginRegister setUser={setUser}/>} />
        <Route path="/jobs" element={user ? <JobList user={user}/> : <Navigate to="/login" />} />
        <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;