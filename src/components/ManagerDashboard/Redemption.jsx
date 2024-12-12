import React, { useState } from "react";
import "../../styling/RedemptionSection.css";

const RedemptionSection = () => {
  const [customers, setCustomers] = useState([
    { name: "John Doe", phone: "1234567890", id: "CUST001", card: "CARD001", points: 150 },
    { name: "Jane Smith", phone: "9876543210", id: "CUST002", card: "CARD002", points: 100 },
    { name: "Sam Wilson", phone: "5678901234", id: "CUST003", card: "CARD003", points: 200 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddPointsPopup, setShowAddPointsPopup] = useState(false);
  const [showGiftEligibilityPopup, setShowGiftEligibilityPopup] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [pointsToAdd, setPointsToAdd] = useState(0); // State to track input points

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.phone.includes(searchTerm) || customer.card.includes(searchTerm)
  );

  // Handle Add Points
  const handleAddPoints = (customer) => {
    setSelectedCustomer(customer);
    setPointsToAdd(0); // Reset the input field for the popup
    setShowAddPointsPopup(true);
  };

  const updatePoints = () => {
    setCustomers((prev) =>
      prev.map((cust) =>
        cust.card === selectedCustomer.card
          ? { ...cust, points: cust.points + pointsToAdd }
          : cust
      )
    );
    setShowAddPointsPopup(false); // Close the popup after submission
  };

  // Handle Gift Eligibility
  const handleGiftEligibility = (customer) => {
    setSelectedCustomer(customer);
    setShowGiftEligibilityPopup(true);
  };

  const handleBuyGift = () => {
    setShowGiftEligibilityPopup(false); // Close Gift Eligibility Popup
    setShowOtpPopup(true); // Open OTP Popup
  };

  const verifyOtp = () => {
    if (otp === "1234") {
      alert("Gift delivered!");
      setShowOtpPopup(false); // Close OTP Popup
    } else {
      alert("Invalid OTP!");
    }
  };

  // Close Popups
  const closePopups = () => {
    setShowAddPointsPopup(false);
    setShowGiftEligibilityPopup(false);
    setShowOtpPopup(false);
  };

  return (
    <div className="redemption-section">
      <h2>Redemption</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Phone Number or Card Number"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Customer Table */}
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Customer ID</th>
            <th>Card Number</th>
            <th>Points</th>
            <th>Add Points</th>
            <th>Gift Eligibility</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.card}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.id}</td>
              <td>{customer.card}</td>
              <td>{customer.points}</td>
              <td>
                <button onClick={() => handleAddPoints(customer)}>Add Points</button>
              </td>
              <td>
                <button onClick={() => handleGiftEligibility(customer)}>Check Gifts</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Points Popup */}
      {showAddPointsPopup && (
        <div className="popup">
          <h3>Add Points</h3>
          <p>
            Customer: {selectedCustomer.name} ({selectedCustomer.card})
          </p>
          <p>Initial Points: {selectedCustomer.points}</p>
          <input
            type="number"
            placeholder="Enter points to add"
            value={pointsToAdd}
            onChange={(e) => setPointsToAdd(parseInt(e.target.value) || 0)} // Update input state
          />
          <button onClick={updatePoints}>Submit</button> {/* Submit button */}
          <button onClick={closePopups}>Close</button>
        </div>
      )}

      {/* Gift Eligibility Popup */}
      {showGiftEligibilityPopup && (
        <div className="popup">
          <h3>Gift Eligibility</h3>
          <p>
            Customer: {selectedCustomer.name} ({selectedCustomer.points} points)
          </p>
          <table className="gift-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Points Needed</th>
                <th>Eligible</th>
              </tr>
            </thead>
            <tbody>
              {[{ item: "Gift A", points: 100 }, { item: "Gift B", points: 150 }].map((gift) => (
                <tr key={gift.item}>
                  <td>{gift.item}</td>
                  <td>{gift.points}</td>
                  <td>
                    {selectedCustomer.points >= gift.points ? (
                      <button onClick={handleBuyGift}>Buy</button>
                    ) : (
                      "Not Eligible"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={closePopups}>Close</button>
        </div>
      )}

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="popup">
          <h3>Enter OTP</h3>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify</button>
          <button onClick={closePopups}>Close</button>
        </div>
      )}
    </div>
  );
};

export default RedemptionSection;
