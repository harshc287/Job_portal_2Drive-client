import React, { useState } from 'react';
import { authApi } from '../api/api';

const LoginRegister = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = isLogin
        ? await authApi.login(formData)
        : await authApi.register(formData);

      // Store token with user
      localStorage.setItem('user', JSON.stringify({ ...data.user, token: data.token }));
      setUser({ ...data.user, token: data.token });
      alert(`${isLogin ? 'Login' : 'Register'} successful!`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center">{isLogin ? 'Login' : 'Register'}</h3>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-3">
            <label>Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
        )}
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary w-100" type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <div className="text-center mt-2">
        <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create account?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;