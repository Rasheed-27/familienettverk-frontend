// src/components/common/AdminProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return <div>Loading Admin Auth...</div>;
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;