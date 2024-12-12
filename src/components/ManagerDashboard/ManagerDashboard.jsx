import React, { useRef } from "react";
import NewCardForm from "./NewCardForm"
import "../../styling/ManagerDashboard.css";
import DuplicateCardSection from "./DuplicateCardSection"; // Import the component
import Redemption from "./Redemption";
import GiftInventory from "./GiftInventory";
import Report from "./Report";


const ManagerDashboard = () => {
  // Create references for scrolling
  const mainPageRef = useRef(null);
  const newCardRef = useRef(null);
  const duplicateCardRef = useRef(null);
  const redemptionRef = useRef(null);
  const giftInventoryRef = useRef(null);
  const reportRef = useRef(null);

  // Function to scroll to the specific section
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="dashboard-container">
      {/* Static Left Sidebar */}
      <div className="dashboard">
        <h2 className="dashboard-title">Dashboard</h2>
        <div
        className="dashboard-arrow" onClick={() => scrollToSection(mainPageRef)}>
        &#8592; {/* Unicode for a left arrow */}
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

      {/* Sections */}
      <div className="content">
          {/* Main Page */}
        <section ref={mainPageRef} className="section main-section">
          <h1>Welcome to Manager Dashboard</h1>
          <div class="cards-container">
            <div class="card1 top-left" id="new-card">
              <h3>New Card</h3>
              <p>Cards issued this month: <span class="placeholder">--</span></p>
              <p>Cards issued this year: <span class="placeholder">--</span></p>
              <p>Total cards generated: <span class="placeholder">--</span></p>
            </div>
            <div class="card1 top-right" id="redemption-card">
              <h3>Redemption</h3>
              <p>Eligibility criteria: <span class="placeholder">--</span></p>
              <p>Customers eligible: <span class="placeholder">--</span></p>
              <p>Gifts redeemed: <span class="placeholder">--</span></p>
            </div>
            <div class="card1 center" id="duplicate-card">
              <h3>Duplicate Card</h3>
              <p>Deduction points: <span class="placeholder">--</span></p>
              <p>Cards issued: <span class="placeholder">--</span></p>
            </div>
            <div class="card1 bottom-left" id="gift-inventory-card">
              <h3>Gift Inventory</h3>
              <p>Last stock check-in: <span class="placeholder">--</span></p>
              <p>Next stock check-in: <span class="placeholder">--</span></p>
              <p>No. of items: <span class="placeholder">--</span></p>
            </div>
            <div class="card1 bottom-right" id="report-card">
              <h3>Report</h3>
              <p>Gift stock: <span class="placeholder">--</span></p>
              <p>Cards assigned: <span class="placeholder">--</span></p>
              <p>Gifts redeemed: <span class="placeholder">--</span></p>
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



        