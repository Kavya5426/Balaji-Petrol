import React, { useState } from "react";
import "../../styling/Report.css";

const Report = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState([
    { phone: "9876543210", custId: "C001", cardNo: "CARD001", name: "Alice", points: 1200, gifts: 5, consumed: 1000 },
    { phone: "8765432109", custId: "C002", cardNo: "CARD002", name: "Bob", points: 900, gifts: 3, consumed: 600 },
    { phone: "7654321098", custId: "C003", cardNo: "CARD003", name: "Charlie", points: 800, gifts: 2, consumed: 400 },
  ]);

  // Filter the table based on search
  const filteredData = sortedData.filter(
    (item) =>
      item.phone.includes(searchTerm) ||
      item.custId.includes(searchTerm) ||
      item.cardNo.includes(searchTerm)
  );

  return (
    <div className="report-section">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Phone, Customer ID, or Card Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Scrollable Table */}
      <div className="table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>Phone Number</th>
              <th>Customer ID</th>
              <th>Card Number</th>
              <th>Customer Name</th>
              <th>Points</th>
              <th>Gifts Redeemed</th>
              <th>Points Consumed</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.phone}</td>
                <td>{item.custId}</td>
                <td>{item.cardNo}</td>
                <td>{item.name}</td>
                <td>{item.points}</td>
                <td>{item.gifts}</td>
                <td>{item.consumed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
