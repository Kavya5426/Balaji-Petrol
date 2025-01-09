import React, { useState } from "react";
import jsPDF from "jspdf";
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
  const [isBillFormVisible, setIsBillFormVisible] = useState(false);
  const [isBillVisible, setIsBillVisible] = useState(false);

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
  const [formData, setFormData] = useState({
    openingPoints: 0,
    deductionPoints: 0,
    additionalPoints: 0,
    totalPoints: 0,
    redeemablePoints: 0,
  });

  const handleBillInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  // Handle Bill Form Submission
  const handleBillFormSubmit = (e) => {
    e.preventDefault();
    const totalPoints =
      formData.openingPoints +
      formData.additionalPoints -
      formData.deductionPoints;

    setFormData((prevData) => ({
      ...prevData,
      totalPoints,
      redeemablePoints: totalPoints,
    }));

    // Show the bill content after submission
    setIsBillFormVisible(false);
    setIsBillVisible(true);
  };

  const printBill = () => {
    const billContent = document.getElementById("bill-content");
  
    // Clone the content for print
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .bill {
              width: 100%;
              max-width: 250px;
              margin: 0 auto; /* Center the bill on the page */
              padding: 20px;
              border: 1px solid #ccc;
              background-color: #f8f9fa;
            }
            h3, h4 {
              text-align: center; /* Center-align headings */
              margin: 0 0 10px;
            }
            p {
              margin: 10px 0;
              display: flex; /* Use flexbox for alignment */
              justify-content: space-between; /* Space between label and value */
            }
            .centered {
              text-align: center; /* Center-align phone and date */
              margin: 10px 0;
            }
            hr {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="bill">
            <h3>Loyalty Scheme</h3>
            <h4>BALAJI HIGHWAY PETROLEUM</h4>
            <div class="centered">7224554934</div> <!-- Centered phone number -->
            <div class="centered">${new Date().toLocaleDateString()}</div> <!-- Centered date -->
            <hr />
            <p><span>Opening Points:</span><span>${formData.openingPoints}</span></p>
            <p><span>Deduction Points:</span><span>${formData.deductionPoints}</span></p>
            <p><span>Additional Points:</span><span>${formData.additionalPoints}</span></p>
            <p><span>Total Points:</span><span>${formData.totalPoints}</span></p>
            <hr />
            <p><span>Redeemable Points:</span><span>${formData.redeemablePoints}</span></p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  
  const downloadBill = () => {
    const doc = new jsPDF({
      format: [130, 170], // Set custom PDF size: width = 100mm, height = 200mm
    });
  
    // Set up the padding and styling
    const padding = 10; // Padding for the PDF
    const pageWidth = doc.internal.pageSize.getWidth();
    let cursorY = padding; // Start Y-coordinate
  
    // Bill Content
    const billContent = {
      title: "Loyalty Scheme",
      subtitle: "BALAJI HIGHWAY PETROLEUM",
      phone: "7224554934",
      date: `${new Date().toLocaleDateString()}`,
      details: [
        { label: "Opening Points:", value: formData.openingPoints },
        { label: "Deduction Points:", value: formData.deductionPoints },
        { label: "Additional Points:", value: formData.additionalPoints },
        { label: "Total Points:", value: formData.totalPoints },
      ],
      redeemablePoints: { label: "Redeemable Points:", value: formData.redeemablePoints },
    };
  
    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(billContent.title, pageWidth / 2, cursorY, { align: "center" });
    cursorY += 10;
  
    // Subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(billContent.subtitle, pageWidth / 2, cursorY, { align: "center" });
    cursorY += 10;
  
    // Horizontal Line
    doc.line(padding, cursorY, pageWidth - padding, cursorY);
    cursorY += 10;
  
    // Phone (Center-Aligned)
    doc.setFontSize(12);
    doc.text(billContent.phone, pageWidth / 2, cursorY, { align: "center" });
    cursorY += 10;
    doc.line(padding, cursorY, pageWidth - padding, cursorY);
    cursorY += 10;
  
    // Date (Center-Aligned)
    doc.setFont("helvetica", "bold");
    doc.text(billContent.date, pageWidth / 2, cursorY, { align: "center" });
    cursorY += 10;

    // Details (Labels Left-Aligned, Values Right-Aligned)
    doc.setFont("helvetica","normal")
    billContent.details.forEach((detail) => {
      doc.text(detail.label, padding, cursorY); // Left-aligned label
      doc.text(String(detail.value), pageWidth - padding, cursorY, {
        align: "right", // Right-aligned value
      });
      cursorY += 10;
    });
  
    // Horizontal Line above Redeemable Points
  cursorY += 5; // Add spacing before the horizontal line
  doc.line(padding, cursorY, pageWidth - padding, cursorY);
  cursorY += 10;

  // Redeemable Points
  doc.setFont("helvetica","normal")
  doc.text(billContent.redeemablePoints.label, padding, cursorY);
  doc.text(String(billContent.redeemablePoints.value), pageWidth - padding, cursorY, {
    align: "right",
  });
  
    // Save the PDF
    doc.save("bill.pdf");
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
      <button
      type="button"
      onClick={() => setIsBillFormVisible(true)}
      style={{ marginTop: "10px" }}
    >
      Generate Bill
    </button>

      

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
