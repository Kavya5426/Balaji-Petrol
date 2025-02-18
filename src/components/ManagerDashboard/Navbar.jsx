// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import "../../styling/Navbar.css";

// const Navbar = () => {
//   const [userType, setUserType] = useState("");
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const type = localStorage.getItem("userType");
//     if (type) {
//       setUserType(type);
//     }
//   }, []);

//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };
//   const handleProfileNavigation = () => {
//     navigate(`/profile/${userType}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("userType");
//     // Redirect to login page or perform additional logout logic
//     window.location.href = "/";
//   };

//   // const handleProfileNavigation = () => {
//   //   // Navigate to the profile page based on the user type
//   //   switch (userType) {
//   //     case "manager":
//   //       navigate("/manager-profile");
//   //       break;
//   //     case "admin":
//   //       navigate("/admin-profile");
//   //       break;
//   //     case "employee":
//   //       navigate("/employee-profile");
//   //       break;
//   //     default:
//   //       navigate("/");
//   //   }
//   // };

//   return (
//     <nav className="navbar">
//       {/* Dashboard Title */}
//       <h1>
//         {userType
//           ? `${capitalizeFirstLetter(userType)} Dashboard`
//           : "Dashboard"}
//       </h1>

//       {/* User Profile and Dropdown */}
//       <div
//         className="user-profile"
//         onMouseEnter={() => setDropdownVisible(true)}
//         onMouseLeave={() => setDropdownVisible(false)}
//       >
//         {/* User Profile Logo */}
//         <div className="profile-logo" onClick={handleProfileNavigation}>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Replace with your profile logo
//             alt="User Profile"
//           />
//         </div>

//         {/* Dropdown Menu */}
//         {isDropdownVisible && (
//           <div className="dropdown-menu">
//             <p onClick={handleProfileNavigation}>
//               User Type: {capitalizeFirstLetter(userType)}
//             </p>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;