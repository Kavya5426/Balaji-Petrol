import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem('userType');
    if (type) {
      setUserType(type);
    } else {
      navigate('/login'); // Redirect if no user type found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userType'); // Clear user session
    navigate('/login'); // Redirect to login
  };

  const [profileData, setProfileData] = useState({
    username: "",
    role: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (savedProfile) {
      setProfileData(savedProfile);
    } else if (user) {
      setProfileData({
        username: user.username,
        role: user.role,
        email: user.email || "",
        phone: user.phone || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-container">
      

      <main className="profile-main">
        <h2>Account Settings</h2>
        <div className="profile-form">
    <div className="form-group">
      <label>Username</label>
      <input type="text" name="username" value={profileData.username} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Role</label>
      <input type="text" name="role" value={profileData.role} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Email</label>
      <input type="email" name="email" value={profileData.email} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Phone</label>
      <input type="text" name="phone" value={profileData.phone} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>City</label>
      <input type="text" name="city" value={profileData.city} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>State</label>
      <input type="text" name="state" value={profileData.state} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Country</label>
      <input type="text" name="country" value={profileData.country} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Address</label>
      <input type="text" name="address" value={profileData.address} onChange={handleChange} />
    </div>
  </div>
  <div className="form-actions">
    <button className="update-btn" onClick={handleSave}>Update</button>
  </div>

      </main>
    </div>
  );
};

export default UserProfile;
