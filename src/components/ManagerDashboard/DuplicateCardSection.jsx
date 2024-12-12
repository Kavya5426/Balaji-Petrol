import React, { useState } from "react";
import jsPDF from "jspdf";
import "../../styling/DuplicateCardSection.css";

const DuplicateCardSection = () => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [cardNumberToBlock, setCardNumberToBlock] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [formData, setFormData] = useState({
    openingPoints: 0,
    deductionPoints: 0,
    additionalPoints: 0,
    totalPoints: 0,
    redeemablePoints: 0,
  });

  const [isBillVisible, setIsBillVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
    // Update form values and calculate total points dynamically
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0,
    });
  };

  // Handle form submission and generate the bill
  const handleFormSubmit = (e) => {
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

    setIsFormVisible(false);
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
  const handleFetchDetails = (e) => {
    e.preventDefault();
    // Simulate fetching customer details using the mobile number
    setCustomerDetails({
      name: "John Doe",
      customerId: "12345",
      cardNumber: "987654321",
    });
  };

  const handleBlockCard = (e) => {
    e.preventDefault();
    if (cardNumberToBlock === customerDetails.cardNumber) {
      setCustomerDetails({ ...customerDetails, cardNumber: null });
      alert("Card has been blocked successfully!");
    } else {
      alert("Invalid card number!");
    }
  };

  const handleGenerateNewCard = (e) => {
    e.preventDefault();
    const generatedCardNumber = `CARD-${Math.floor(Math.random() * 1000000)}`;
    setNewCardNumber(generatedCardNumber);
    setCustomerDetails({ ...customerDetails, cardNumber: generatedCardNumber });
    alert(`New Card Generated: ${generatedCardNumber}`);
  };

  const handleGenerateBill = (e) => {
    e.preventDefault();
    alert("Bill generation form would open here!");
  };

  return (
    <div className="duplicate-card-section">
      <h2>Duplicate Card</h2>
      {/* Fetch Customer Details */}
      <form className="fetch-details-form" onSubmit={handleFetchDetails}>
        <label>Enter Contact Number:</label>
        <input type="text" placeholder="Enter phone number" required />
        <button type="submit">Fetch Details</button>
      </form>

      {/* Display Customer Details */}
      {customerDetails && (
        <div className="customer-details">
          <h3>Customer Details:</h3>
          <p>Name: {customerDetails.name}</p>
          <p>Customer ID: {customerDetails.customerId}</p>
          <p>Card Number: {customerDetails.cardNumber || "No active card"}</p>

          {/* Block Card Button */}
          <form className="block-card-form" onSubmit={handleBlockCard}>
            <label>Enter Card Number to Block:</label>
            <input
              type="text"
              placeholder="Enter card number"
              value={cardNumberToBlock}
              onChange={(e) => setCardNumberToBlock(e.target.value)}
              required
            />
            <button type="submit">Block Card</button>
          </form>

          {/* Generate Duplicate Card Button */}
          <form className="generate-card-form" onSubmit={handleGenerateNewCard}>
            <label>Generate New Card:</label>
            {newCardNumber && <p>New Card Number: {newCardNumber}</p>}
            <button type="submit">Generate New Card</button>
          </form>
        </div>
      )}

      {/* Generate Bill Button */}
      
      <button onClick={() => setIsFormVisible(true)}>Generate Bill</button>
      {/* Pop-up Form */}
      {isFormVisible && (
        <div className="form-popup">
          <form className="bill-form" onSubmit={handleFormSubmit}>
            <h3>Enter Bill Details</h3>
            <label>
              Opening Points:
              <input
                type="number"
                name="openingPoints"
                value={formData.openingPoints}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Deduction Points:
              <input
                type="number"
                name="deductionPoints"
                value={formData.deductionPoints}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Additional Points:
              <input
                type="number"
                name="additionalPoints"
                value={formData.additionalPoints}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setIsFormVisible(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Render the Bill */}
      {isBillVisible && (
        <div className="form-popup">
          <div id="bill-content" className="bill"><h3>Loyalty Scheme</h3>
          <h4>BALAJI HIGHWAY PETROLEUM</h4>
          <p>Phone: 7224554934</p>
          <hr />
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>Opening Points: {formData.openingPoints}</p>
          <p>Deduction Points: {formData.deductionPoints}</p>
          <p>Additional Points: {formData.additionalPoints}</p>
          <p>Total Points: {formData.totalPoints}</p>
          <hr />
          <p>Redeemable Points: {formData.redeemablePoints}</p>
          <hr />
          </div>
          <button onClick={printBill}>Print</button>
          <button onClick={downloadBill}>Download</button>
          <button onClick={() => setIsBillVisible(false)}>Close</button>
          </div>
      )}
      </div>
    );
  };
  export default DuplicateCardSection;  
