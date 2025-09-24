import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // <-- استخدام السياق الرئيسي

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // انتظار تحميل بيانات المستخدم
  }

  // 1. هل المستخدم مسجل دخوله؟
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // 2. هل المستخدم المسجل هو مدير؟
  if (user && user.isAdmin) {
    return children; // نعم، اسمح له بالمرور
  } else {
    // هو مسجل، لكنه ليس مديرًا
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }
};

export default AdminProtectedRoute;