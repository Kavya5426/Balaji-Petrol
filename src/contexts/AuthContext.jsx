// src/authContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null); // 'admin' or 'manager'

  const login = (userRole) => {
    setRole(userRole);
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
