import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSlides } from '../../services/sliderService'; // سنحتاج لإعادة إنشاء هذه الخدمات
import { getAllMembers } from '../../services/memberService';
import './AdminDashboard.css';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({ slides: 0, members: 0 });

  useEffect(() => {
    // محاكاة جلب البيانات
    const fetchStats = async () => {
        // بما أننا حذفنا الخدمات، سنضع أرقامًا وهمية مؤقتًا
        // لاحقًا، سنقوم بعمل fetch لهذه البيانات
        setStats({ slides: 3, members: 4 }); 
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>أهلاً بك في لوحة التحكم</h1>
      <p>من هنا يمكنك إدارة كل محتوى الموقع.</p>

      <div className="dashboard-stats">
        <div className="stat-card-admin">
          <h2>{stats.slides}</h2>
          <p>شريحة في السلايدر</p>
        </div>
        <div className="stat-card-admin">
          <h2>{stats.members}</h2>
          <p>عضو مسجل</p>
        </div>
      </div>

      <div className="quick-links">
        <h3>روابط سريعة</h3>
        <Link to="/admin/slider" className="quick-link">إدارة السلايدر</Link>
        <Link to="/admin/members" className="quick-link">إدارة الأعضاء</Link>
        <Link to="/admin/activities" className="quick-link">إدارة الأنشطة</Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;