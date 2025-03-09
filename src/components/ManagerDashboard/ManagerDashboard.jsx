import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewCardForm from "./NewCardForm";
import DuplicateCardSection from "./DuplicateCardSection";
import Redemption from "./Redemption";
import GiftInventory from "./GiftInventory";
import Report from "./Report";
import "../../styling/ManagerDashboard.css";
import "../../styling/Navbar.css";

const Navbar = ({ toggleMenu }) => {
  const [userType, setUserType] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

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
      {/* Hamburger Menu Button (only on small screens) */}
      {/* <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button> */}

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
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for scrolling
  const mainPageRef = useRef(null);
  const newCardRef = useRef(null);
  const duplicateCardRef = useRef(null);
  const redemptionRef = useRef(null);
  const giftInventoryRef = useRef(null);
  const reportRef = useRef(null);

  // Scroll to section function
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close menu after clicking
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />

      {/* Sidebar Menu */}
      <div className={`dashboard ${isMenuOpen ? "open" : ""}`}>
        <h2 className="dashboard-logo">CTS</h2>
        <h5 className="dashboard-title">Dashboard</h5>

        <div className="dashboard-item" onClick={() => scrollToSection(mainPageRef)}>
          Home
        </div>
        <div className="dashboard-item" onClick={() => scrollToSection(newCardRef)}>
          New Card
        </div>
        <div className="dashboard-item" onClick={() => scrollToSection(duplicateCardRef)}>
          Duplicate Card
        </div>
        <div className="dashboard-item" onClick={() => scrollToSection(redemptionRef)}>
          Redemption
        </div>
        <div className="dashboard-item" onClick={() => scrollToSection(giftInventoryRef)}>
          Gift Inventory
        </div>
        <div className="dashboard-item" onClick={() => scrollToSection(reportRef)}>
          Report
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Main Page */}
        <section ref={mainPageRef} className="section main-section">
        <h1>Welcome to Manager Dashboard</h1>
        <div className="cards-container">
          <div className="card1" id="new-card">
            <h3>New Card</h3>
            <p>Cards issued this month: <span className="placeholder">--</span></p>
            <p>Cards issued this year: <span className="placeholder">--</span></p>
            <p>Total cards generated: <span className="placeholder">--</span></p>
          </div>
          <div className="card1" id="redemption-card">
            <h3>Redemption</h3>
            <p>Eligibility criteria: <span className="placeholder">--</span></p>
            <p>Customers eligible: <span className="placeholder">--</span></p>
            <p>Gifts redeemed: <span className="placeholder">--</span></p>
          </div>
          <div className="card1" id="duplicate-card">
            <h3>Duplicate Card</h3>
            <p>Deduction points: <span className="placeholder">--</span></p>
            <p>Cards issued: <span className="placeholder">--</span></p>
          </div>
          <div className="card1" id="gift-inventory-card">
            <h3>Gift Inventory</h3>
            <p>Last stock check-in: <span className="placeholder">--</span></p>
            <p>Next stock check-in: <span className="placeholder">--</span></p>
            <p>No. of items: <span className="placeholder">--</span></p>
          </div>
          <div className="card1" id="report-card">
            <h3>Report</h3>
            <p>Gift stock: <span className="placeholder">--</span></p>
            <p>Cards assigned: <span className="placeholder">--</span></p>
            <p>Gifts redeemed: <span className="placeholder">--</span></p>
          </div>
        </div>
        </section>
        <section ref={newCardRef} className="section">
          <NewCardForm />
        </section>
        <section ref={duplicateCardRef} className="section">
          <DuplicateCardSection />
        </section>
        <section ref={redemptionRef} className="section">
          <Redemption />
        </section>
        <section ref={giftInventoryRef} className="section">
          <GiftInventory />
        </section>
        <section ref={reportRef} className="section">
          <Report />

      </section>
      </div>
    </div>
  );
};

export default ManagerDashboard;
