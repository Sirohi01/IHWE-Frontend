import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentSeller, setCurrentSeller] = useState(() => {
    const saved = localStorage.getItem('seller_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = (sellerData) => {
    setCurrentSeller(sellerData);
    localStorage.setItem('seller_session', JSON.stringify(sellerData));
    navigate('/seller-dashboard');
  };

  const logout = () => {
    setCurrentSeller(null);
    localStorage.removeItem('seller_session');
    navigate('/seller-login');
  };

  return (
    <AuthContext.Provider value={{ currentSeller, loading, login, logout, isAuthenticated: !!currentSeller }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
