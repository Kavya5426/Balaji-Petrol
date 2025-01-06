import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "../../styling/NewCardForm.css";

const NewCardForm = () => {
  // States for the New Card Form
  const [customerFormData, setCustomerFormData] = useState({
    customerName: "",
    mobileNumber: "",
    customerId: `CUST${Math.floor(1000 + Math.random() * 9000)}`, // Auto-generated
    cardNumber: `CARD${Math.floor(100000 + Math.random() * 900000)}`, // Auto-generated
  });

  // States for the Bill Form
  const [formData, setFormData] = useState({
    openingPoints: 0,
    deductionPoints: 0,
    additionalPoints: 0,
    totalPoints: 0,
    redeemablePoints: 0,
  });

  const [otp, setOtp] = useState("");
  const [otpFormVisible, setOtpFormVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isBillFormVisible, setIsBillFormVisible] = useState(false);
  const [isBillVisible, setIsBillVisible] = useState(false); // Bill visibility

  // Handle Input Changes for Customer Form
  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle OTP Submission
  const handleOtpSubmit = () => {
    if (otp === "1234") {
      setOtpFormVisible(false);
      alert("Confirmation Successful!");
      setIsFormVisible(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // Handle Input Changes for Bill Form
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

  // Handle New Card Form Submission
  const handleNewCardFormSubmit = (e) => {
    e.preventDefault();
    setIsFormVisible(false);
    setOtpFormVisible(true);
  };

  const resetAllForms = () => {
    setCustomerFormData({
      customerName: "",
      mobileNumber: "",
      customerId: `CUST${Math.floor(1000 + Math.random() * 9000)}`,
      cardNumber: `CARD${Math.floor(100000 + Math.random() * 900000)}`,
    });
    setFormData({
      openingPoints: 0,
      deductionPoints: 0,
      additionalPoints: 0,
      totalPoints: 0,
      redeemablePoints: 0,
    });
    setOtpFormVisible(false);
    setIsFormVisible(true);
    setIsBillFormVisible(false);
    setIsBillVisible(false); // Reset bill visibility
  };

  // Clear data on window change
  useEffect(() => {
    const handleWindowChange = () => resetAllForms();
    window.addEventListener("beforeunload", handleWindowChange);
    return () => window.removeEventListener("beforeunload", handleWindowChange);
  }, []);

  return (
    <div className="new-card-form">
      <h2 className="h2">New Card Entry</h2>

      {/* New Card Form */}
      {isFormVisible && (
        <form onSubmit={handleNewCardFormSubmit}>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={customerFormData.customerName}
              onChange={handleCustomerInputChange}
              required
            />
          </label>
          <label>
            Mobile Number:
            <input
              type="tel"
              name="mobileNumber"
              value={customerFormData.mobileNumber}
              onChange={handleCustomerInputChange}
              required
              pattern="[0-9]{10}"
            />
          </label>
          <label>
            Customer ID:
            <input type="text" value={customerFormData.customerId} disabled />
          </label>
          <label>
            Card Number:
            <input type="text" value={customerFormData.cardNumber} disabled />
          </label>
          <button type="submit">Submit</button>
          <button
            type="button"
            onClick={() => setIsBillFormVisible(true)}
            style={{ marginTop: "10px" }}
          >
            Generate Bill
          </button>
        </form>
      )}

      {/* OTP Form */}
      {otpFormVisible && (
        <div className="otp-popup">
          <h3>Enter OTP</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button onClick={handleOtpSubmit}>Submit OTP</button>
        </div>
      )}

      {/* Bill Form */}
      {isBillFormVisible && (
        <div className="form-popup">
          <form onSubmit={handleBillFormSubmit}>
            <h3>Enter Bill Details</h3>
            <label>
              Opening Points:
              <input
                type="number"
                name="openingPoints"
                value={formData.openingPoints}
                onChange={handleBillInputChange}
              />
            </label>
            <label>
              Deduction Points:
              <input
                type="number"
                name="deductionPoints"
                value={formData.deductionPoints}
                onChange={handleBillInputChange}
              />
            </label>
            <label>
              Additional Points:
              <input
                type="number"
                name="additionalPoints"
                value={formData.additionalPoints}
                onChange={handleBillInputChange}
              />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setIsBillFormVisible(false)}>
              Close
            </button>
          </form>
        </div>
      )}

      {/* Display Bill */}
      {isBillVisible && (
  <div className="form-popup">
    <div id="bill-content" className="bill">
      <h3>Loyalty Scheme</h3>
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

export default NewCardForm;
