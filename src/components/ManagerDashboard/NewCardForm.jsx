import React, { useState } from "react";
import "../../styling/NewCardForm.css";

const NewCardForm = () => {
  // States for forms and popups
  const [formData, setFormData] = useState({
    customerName: "",
    mobileNumber: "",
    customerId: `CUST${Math.floor(1000 + Math.random() * 9000)}`, // Auto-generated
    cardNumber: `CARD${Math.floor(100000 + Math.random() * 900000)}`, // Auto-generated
  });

  const [otp, setOtp] = useState("");
  const [otpFormVisible, setOtpFormVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle OTP submission
  const handleOtpSubmit = () => {
    if (otp === "1234") { // Assuming "1234" as the correct OTP for demo
      setOtpFormVisible(false);
      setPreviewVisible(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // Handle final save
  const handleSave = () => {
    alert("Customer information saved successfully!");
    setPreviewVisible(false);
  };

  return (
    <div className="new-card-form">
      <h2>New Card Entry</h2>

      {/* Customer Entry Form */}
      {!otpFormVisible && !previewVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOtpFormVisible(true);
          }}
        >
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Mobile Number:
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
            />
          </label>
          <label>
            Customer ID:
            <input type="text" value={formData.customerId} disabled />
          </label>
          <label>
            Card Number:
            <input type="text" value={formData.cardNumber} disabled />
          </label>
          <button type="submit">Submit</button>
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

      {/* Preview Popup */}
      {previewVisible && (
        <div className="preview-popup">
          <h3>Preview Customer Information</h3>
          <p><strong>Customer Name:</strong> {formData.customerName}</p>
          <p><strong>Mobile Number:</strong> {formData.mobileNumber}</p>
          <p><strong>Customer ID:</strong> {formData.customerId}</p>
          <p><strong>Card Number:</strong> {formData.cardNumber}</p>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default NewCardForm;
