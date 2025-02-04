import React, { useState, useEffect } from "react";

const ProfilePage = ({ user, onClose }) => {
  // Load existing data from localStorage or set default values
  const [profile, setProfile] = useState({
    profilePic: "",
    name: "",
    phone: "",
    address: "",
    pin: "",
    district: "",
    state: "",
    country: "",
    panNumber: "",
  });

  // Load user details from LocalStorage on component mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem(`profile_${user.username}`));
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, [user.username]);

  // Handle Input Changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle Profile Picture Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Profile Data to LocalStorage
  const handleSave = () => {
    localStorage.setItem(`profile_${user.username}`, JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-modal">
      <div className="profile-content">
        <h2>Edit Profile</h2>

        {/* Profile Picture Upload */}
        <div className="profile-pic-container">
          <img
            src={profile.profilePic || "https://via.placeholder.com/100"}
            alt="Profile"
            className="profile-pic"
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {/* Profile Form */}
        <input type="text" name="name" placeholder="Full Name" value={profile.name} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" value={profile.phone} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={profile.address} onChange={handleChange} />
        <input type="text" name="pin" placeholder="PIN Code" value={profile.pin} onChange={handleChange} />
        <input type="text" name="district" placeholder="District" value={profile.district} onChange={handleChange} />
        <input type="text" name="state" placeholder="State" value={profile.state} onChange={handleChange} />
        <input type="text" name="country" placeholder="Country" value={profile.country} onChange={handleChange} />
        <input type="text" name="panNumber" placeholder="PAN Number" value={profile.panNumber} onChange={handleChange} />

        {/* Buttons */}
        <button onClick={handleSave} className="save-btn">Save</button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default ProfilePage;
