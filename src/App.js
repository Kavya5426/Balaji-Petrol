// src/App.js
/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerDashboard from './components/ManagerDashboard/ManagerDashboard';
import NewCardForm from './components/ManagerDashboard/NewCardForm';
import Redemption from "./components/ManagerDashboard/Redemption";
import GiftInventory from "./components/ManagerDashboard/GiftInventory";
import Report from "./components/ManagerDashboard/Report";
import DuplicateCardSection from './components/ManagerDashboard/DuplicateCardSection';
function App() {
  return (
    <Router>
      <div className="app">
        <ManagerDashboard />
        <Routes>
          <Route path="/newcardform" element={<NewCardForm/>} />
          <Route path="/duplicate-card" element={<DuplicateCardSection />} />
          <Route path="/redemption" element={<Redemption />} />
          <Route path="/gift-inventory" element={<GiftInventory />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}*/

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import CreateAccount from './components/Login/CreateAccount';
import ManagerDashboard from './components/ManagerDashboard/ManagerDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

const App = () => {
  return (
    <Router basename="/Balaji-Petrol">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};


export default App;
