import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { username, password, role } = credentials;
  
    // Simulate login verification (Replace with API calls)
    if ((role === 'manager' && username === 'manager' && password === 'password') ||
        (role === 'admin' && username === 'admin' && password === 'password') ||
        (role === 'employee' && username === 'employee' && password === 'password')) {
        
        localStorage.setItem("userType", role);  // Store user type in localStorage
  
        if (role === 'manager') {
          navigate('/manager-dashboard');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'employee') {
          navigate('/employee-dashboard');
        }
        return;
    }
  
    // Hardcoded example credentials
    const exampleUsers = [
      { username: 'manager', password: 'manager123', role: 'manager' },
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'employee', password: 'employee123', role: 'employee' },
    ];
  
    // Validate credentials
    const user = exampleUsers.find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password &&
        user.role === credentials.role
    );
  
    if (user) {
      localStorage.setItem("userType", user.role);  // Store user type in localStorage
  
      if (user.role === 'manager') {
        navigate('/manager-dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'employee') {
        navigate('/employee-dashboard');
      }
    } else {
      alert('Invalid username, password, or role!');
    }
  };
  


  return (
    <div className="login-container">
      <div className="left-section"></div>
      
        <div className="right-section">
          <h1>Welcome to BHP</h1>
          <div className="form-section">
            <form onSubmit={handleSubmit} className="login-form">
              <h2>Login</h2>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Role:
                <select
                  name="role"
                  value={credentials.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </label>
              <button type="submit">Login</button>
              <button type="button" onClick={() => navigate('/create-account')}>
                Create Account
              </button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default LoginForm;
