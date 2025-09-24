import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext'; // <-- استيراد سياق المستخدم العادي

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const { login: userLogin } = useAuth(); // الحصول على دالة تسجيل دخول المستخدم العادي
  const [isAdmin, setIsAdmin] = useState(false);

  const loginAsAdmin = async (email, password) => {
    // 1. سجل الدخول كمستخدم عادي أولاً
    await userLogin(email, password);

    // 2. تحقق من صلاحيات المدير (هذه خطوة إضافية للتحقق من الـ token)
    // في الواقع، API تسجيل الدخول يجب أن تعيد خاصية isAdmin
    const userData = JSON.parse(localStorage.getItem('authUser'));
    // في نظام حقيقي، سنفك تشفير التوكن لنتأكد
    
    // محاكاة: تحقق من أن المستخدم هو المدير الذي نعرفه
    if (userData.email === 'ali.hassan@example.com') { // كمثال
      setIsAdmin(true);
      return true;
    } else {
      throw new Error('You are not authorized as an admin.');
    }
  };

  const value = { isAdmin, loginAsAdmin };
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => useContext(AdminAuthContext);