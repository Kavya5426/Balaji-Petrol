// src/components/PopUp.jsx
import React from 'react';

const PopUp = ({ message, onClose }) => {
  return (
    <div className="popup">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PopUp;
