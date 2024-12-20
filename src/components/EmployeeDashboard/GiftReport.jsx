import React, { useState } from 'react';
import '../../styling/Report.css';

const EmployeeDashboard = () => {
  // Initial gift report data (replace with API data later)
  const [giftReportData] = useState([
    {
      customerName: 'John Doe',
      customerId: 'CUST001',
      phoneNumber: '9876543210',
      itemName: 'Gift Item A',
      itemsRedeemed: 2,
      pointsConsumed: 500,
      redemptionDate: '2024-12-15',
      itemsRemaining: 50,
    },
    {
      customerName: 'Jane Smith',
      customerId: 'CUST002',
      phoneNumber: '8765432109',
      itemName: 'Gift Item B',
      itemsRedeemed: 1,
      pointsConsumed: 300,
      redemptionDate: '2024-12-14',
      itemsRemaining: 30,
    },
    {
      customerName: 'Sam Wilson',
      customerId: 'CUST003',
      phoneNumber: '7654321098',
      itemName: 'Gift Item C',
      itemsRedeemed: 3,
      pointsConsumed: 700,
      redemptionDate: '2024-12-10',
      itemsRemaining: 20,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filtered data based on the search term
  const filteredData = giftReportData.filter((report) =>
    report.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="employee-dashboard">

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Customer Name, ID, or Phone Number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Gift Report Section */}
      <div className="gift-report-section">
        <div className="table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Customer ID</th>
                <th>Phone Number</th>
                <th>Item Name</th>
                <th>No. of Items Redeemed</th>
                <th>Points Consumed</th>
                <th>Date of Redemption</th>
                <th>No. of Items Remaining</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((report, index) => (
                  <tr key={index}>
                    <td>{report.customerName}</td>
                    <td>{report.customerId}</td>
                    <td>{report.phoneNumber}</td>
                    <td>{report.itemName}</td>
                    <td>{report.itemsRedeemed}</td>
                    <td>{report.pointsConsumed}</td>
                    <td>{report.redemptionDate}</td>
                    <td>{report.itemsRemaining}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
