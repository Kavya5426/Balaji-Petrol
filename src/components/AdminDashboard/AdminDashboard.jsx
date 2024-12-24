import React, { useRef,useState } from "react";
import "../../styling/AdminDashboard.css";
import GiftInventory from "../ManagerDashboard/GiftInventory";
import DataAnalytics from "./DataAnalytics";
import AdminReport from "./AdminReport";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // Refs to scroll to sections
  const mainPageRef = useRef(null);
  const dataAnalyticsRef = useRef(null);
  const giftInventoryRef = useRef(null);
  const adminreportRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`dashboard ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-item" onClick={() => scrollToSection(giftInventoryRef)}>
          Gift Inventory
        </div>
        <div className="dashboard-item" onClick={() => scrollToSection(dataAnalyticsRef)}>
          Data Analytics
        </div>
        <div className="dashboard-item" onClick={() => scrollToSection(adminreportRef)}>
          Report
        </div>
        <div><button
        className="dashboard-pointer" onClick={() => scrollToSection(mainPageRef)}
      >&larr;</button></div>
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
