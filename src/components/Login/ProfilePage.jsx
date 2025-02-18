import React from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userType } = useParams();

  return (
    <div>
      <h1>{userType.charAt(0).toUpperCase() + userType.slice(1)} Profile</h1>
      <p>Welcome to the {userType}'s profile page!</p>
      <p>Here, you can view and manage your profile details.</p>
    </div>
  );
};

export default ProfilePage;