// src/components/GenerateBillPopup.jsx
import React, { useState } from "react";
import "./GenerateBillPopup.css"; // Add styles for the modal

const GenerateBillPopup = ({ onClose }) => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [initialPoints, setInitialPoints] = useState(100); // Example value
  const [deductionPoints, setDeductionPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(100);

  const calculateTotalPoints = () => {
    setTotalPoints(initialPoints - deductionPoints);
  };

  const handlePrint = () => {
    window.print(); // Opens the browser's print dialog
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Generate Bill</h2>
        <form>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label>Initial Points:</label>
          <input type="number" value={initialPoints} readOnly />
          <label>Deduction Points:</label>
          <input
            type="number"
            value={deductionPoints}
            onChange={(e) => setDeductionPoints(Number(e.target.value))}
          />
          <label>Total Points:</label>
          <input type="number" value={totalPoints} readOnly />
          <button
            type="button"
            onClick={calculateTotalPoints}
            className="calculate-btn"
          >
            Calculate Total
          </button>
        </form>
        <div className="bill">
          <h3>Loyalty Scheme</h3>
          <p><b>Balaji Highway Petroleum</b></p>
          <p>{phoneNumber}</p>
          <hr />
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>Opening Points: {initialPoints}</p>
          <p>Deduction Points: {deductionPoints}</p>
          <p>Total Points: {totalPoints}</p>
          <hr />
          <p>Redeemable Points: {totalPoints}</p>
        </div>
        <div className="buttons">
          <button onClick={handlePrint}>Print</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default GenerateBillPopup;
