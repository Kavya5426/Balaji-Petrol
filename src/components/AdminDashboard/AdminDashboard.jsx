import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/AdminDashboard.css";
import GiftInventory from "../ManagerDashboard/GiftInventory";
import AdminReport from "./AdminReport";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const mainPageRef = useRef(null);
  const giftInventoryRef = useRef(null);
  const adminreportRef = useRef(null);

  const Navbar = () => {
    const [userType, setUserType] = useState("");
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
      const storedUserType = localStorage.getItem("userType");
      if (storedUserType) {
        setUserType(storedUserType);
      }
    }, []);

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleProfileNavigation = () => {
      navigate("/profile");
    };

    const handleLogout = () => {
      localStorage.removeItem("userType");
      navigate("/"); // Redirect to login page
    };

    return (
      <nav className="navbar">
        

        <h1>{userType ? `${capitalizeFirstLetter(userType)} Dashboard` : "Dashboard"}</h1>

        {/* User Profile Dropdown */}
        <div
          className="user-profile"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <div className="profile-logo" onClick={handleProfileNavigation}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User Profile"
            />
          </div>

          {isDropdownVisible && (
            <div className="dropdown-menu">
              <p onClick={() => navigate('/profile')} className="user-type">
                {capitalizeFirstLetter(userType)}
              </p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          <button className="hamburger" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          ☰
        </button>
        </div>
        {/* Hamburger Menu Button */}
        
      </nav>
    );
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      {/* Sidebar */}
      <div className={`dashboard ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="dashboard-logo">CTS</h2>
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-item" onClick={() => scrollToSection(mainPageRef)}>Home</div>
        <div className="dashboard-item" onClick={() => scrollToSection(giftInventoryRef)}>Gift Inventory</div>
        <div className="dashboard-item" onClick={() => scrollToSection(adminreportRef)}>Report</div>
        <div className="dashboard-item" onClick={() => navigate("/")}>Logout</div>
      </div>

      {/* Main Content */}
      <div className="content">
        <section ref={mainPageRef} className="section main-section">
          <h1>Welcome to Admin Dashboard</h1>
        </section>
        <section ref={giftInventoryRef} className="section">
          <h1>Gift Inventory</h1>
          <GiftInventory />
        </section>
        <section ref={adminreportRef} className="section">
          <h1>Report</h1>
          <AdminReport />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
