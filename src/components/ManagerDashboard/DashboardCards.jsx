// src/components/DashboardCards.jsx
import React from 'react';

const DashboardCards = ({ title, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h2>{title}</h2>
    </div>
  );
};

export default DashboardCards;
