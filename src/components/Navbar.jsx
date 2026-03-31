import React from 'react';

const Navbar = ({ user, setUser }) => {
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">Job Portal</span>
        {user && (
          <div className="d-flex align-items-center">
            <span className="text-white me-3">{user.name}  ({user.role})</span>
            <button className="btn btn-danger btn-sm" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;