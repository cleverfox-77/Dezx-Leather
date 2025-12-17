'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AdminContextType = {
  isAdmin: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// In a real app, this would come from environment variables
const ADMIN_EMAIL = 'admin@dezxleather.com';
const ADMIN_PASS = 'password';

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check session storage on initial load
    const storedAdminStatus = sessionStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (email: string, pass: string): boolean => {
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      setIsAdmin(true);
      sessionStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdmin');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};