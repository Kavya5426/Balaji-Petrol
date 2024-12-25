// src/components/CreateAccount.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styling/CreateAccount.css';

const CreateAccount = () => {
  const [accountDetails, setAccountDetails] = useState({ username: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate account creation (Replace with API calls)
    console.log('Account Created:', accountDetails);
    alert('Account created successfully!');
    navigate('/');
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={accountDetails.username}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={accountDetails.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Role:
          <select
            name="role"
            value={accountDetails.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
