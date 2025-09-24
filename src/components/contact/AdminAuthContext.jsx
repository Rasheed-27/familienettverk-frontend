// src/context/AdminAuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // -- محاكاة -- التحقق من وجود توكن للمدير
    const token = localStorage.getItem('mock_admin_token');
    if (token) {
      // في تطبيق حقيقي، ستتحقق من صحة التوكن مع الخادم
      setAdmin({ username: 'admin' });
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    // -- محاكاة -- تحقق بسيط من كلمة المرور
    if (password === 'admin123') { // كلمة مرور وهمية
      localStorage.setItem('mock_admin_token', 'fake-admin-jwt-token');
      setAdmin({ username: 'admin' });
      return true; // نجح تسجيل الدخول
    }
    return false; // فشل تسجيل الدخول
  };

  const logout = () => {
    localStorage.removeItem('mock_admin_token');
    setAdmin(null);
  };

  const value = {
    admin,
    isAdminAuthenticated: !!admin,
    loading,
    login,
    logout,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};