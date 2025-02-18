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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    profileImage: "", 
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (savedProfile) {
      setProfileData(savedProfile);
    } else if (user) {
      setProfileData({
        username: user.username,
        role: user.role,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        profileImage: user.profileImage || "https://via.placeholder.com/100",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
    alert("Profile Updated Successfully!");
  };


  return (
 <div className="profile-container">
      <aside className="sidebar">
        <h2>Profile</h2>
        <label htmlFor="profileImageInput" className="profile-image-label">
          <img
            src={profileData.profileImage}
            alt="Profile"
            className="profile-pic"
          />
        </label>
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <h3>{profileData.username}</h3>
        <p>{profileData.role}</p>
      </aside>

      <main className="profile-main">
        <h2>Account Settings</h2>
        <div className="profile-form">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} />
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
          <button className="update-btn" onClick={handleSave}>Update</button>
        </div>
      </main>
    </div>

  );
};

export default UserProfile;