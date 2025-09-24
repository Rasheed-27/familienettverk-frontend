import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // 1. استيراد السياق الصحيح
import './AdminLayout.css';

const AdminLayout = () => {
  const { logout } = useAuth(); // 2. استخدام السياق الصحيح
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // دالة تسجيل الخروج الآن تأتي من السياق الموحد
    navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية بعد الخروج
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>لوحة التحكم</h3>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin/dashboard">الرئيسية</NavLink>
          <NavLink to="/admin/slider">إدارة السلايدر</NavLink>
          <NavLink to="/admin/pages">إدارة الصفحات</NavLink>
          <NavLink to="/admin/activities">إدارة الأنشطة</NavLink>
          <NavLink to="/admin/members">إدارة الأعضاء</NavLink>
          <NavLink to="/admin/stats">إدارة الإحصائيات</NavLink>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">تسجيل الخروج</button>
        </div>
      </aside>
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;