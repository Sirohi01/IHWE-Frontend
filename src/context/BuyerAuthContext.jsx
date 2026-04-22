import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentBuyer, setCurrentBuyer] = useState(() => {
    const saved = localStorage.getItem('buyer_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = (buyerData) => {
    setCurrentBuyer(buyerData);
    localStorage.setItem('buyer_session', JSON.stringify(buyerData));
    navigate('/buyer-dashboard');
  };

  const logout = () => {
    setCurrentBuyer(null);
    localStorage.removeItem('buyer_session');
    navigate('/buyer-login');
  };

  return (
    <AuthContext.Provider value={{ currentBuyer, loading, login, logout, isAuthenticated: !!currentBuyer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
