// src/components/common/ProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 1. أثناء التحقق الأولي، لا تعرض أي شيء أو اعرض مؤشر تحميل
  if (loading) {
    return <div>Loading...</div>; // أو مكون Spinner احترافي
  }

  // 2. إذا لم يكن المستخدم مسجلاً
  if (!isAuthenticated) {
    // أعد توجيهه إلى صفحة تسجيل الدخول، مع حفظ الصفحة التي كان يحاول الوصول إليها
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. إذا كان المستخدم مسجلاً، اسمح بعرض المكونات الأبناء (الصفحة المحمية)
  return children;
};

export default ProtectedRoute;