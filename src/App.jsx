import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginRegister from './pages/LoginRegister';
import JobList from './pages/JobList';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  if (!user) return <LoginRegister setUser={setUser} />;

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      {user.role === 'admin' ? <AdminDashboard /> : <JobList user={user} />}
    </div>
  );
}

export default App;