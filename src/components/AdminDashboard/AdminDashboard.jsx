import React, { useRef,useState } from "react";
import "../../styling/AdminDashboard.css";
import GiftInventory from "../ManagerDashboard/GiftInventory";
import DataAnalytics from "./DataAnalytics";
import AdminReport from "./AdminReport";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // Refs to scroll to sections
  const navigate = useNavigate();
  const mainPageRef = useRef(null);
  const dataAnalyticsRef = useRef(null);
  const giftInventoryRef = useRef(null);
  const adminreportRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };
  const handleLogout = () => {
    navigate("/"); // Redirect to login page on logout
  };
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`dashboard ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="dashboard-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_654_45822)">
<path d="M14 11H15C15.5304 11 16.0391 11.2107 16.4142 11.5858C16.7893 11.9609 17 12.4696 17 13V16C17 16.3978 17.158 16.7794 17.4393 17.0607C17.7206 17.342 18.1022 17.5 18.5 17.5C18.8978 17.5 19.2794 17.342 19.5607 17.0607C19.842 16.7794 20 16.3978 20 16V9L17 6" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H12C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6V20" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 20H15" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 7V8C18 8.26522 18.1054 8.51957 18.2929 8.70711C18.4804 8.89464 18.7348 9 19 9H20" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 11H14" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_654_45822">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
          BHP</h2>
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-item" onClick={() => scrollToSection(mainPageRef)}>
          Home
        </div>
        <div className="dashboard-item" onClick={() => scrollToSection(giftInventoryRef)}>
          Gift Inventory
        </div>
        <div className="dashboard-item" onClick={() => scrollToSection(dataAnalyticsRef)}>
          Data Analytics
        </div>
        <div className="dashboard-item" onClick={() => scrollToSection(adminreportRef)}>
          Report
        </div>
        <div className="dashboard-item" onClick={handleLogout}>
          Logout
        </div>
      </div>
      {/* Sidebar Toggle Button */}
      <button
        className="dashboard-arrow" onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        &#9776; {/* Hamburger Icon */}
      </button>

      {/* Main Content */}
      <div className="content">
          {/* Main Page */}
        <section ref={mainPageRef} className="section main-section">
          <h1>Welcome to Admin Dashboard</h1>
        </section>
        <section ref={giftInventoryRef} className="section">
          <h1>Gift Inventory</h1>
          <GiftInventory />
        </section>
        <section  className="section">
          <h1>Graph</h1>
          
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