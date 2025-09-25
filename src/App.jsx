import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// استيراد المكونات العامة والهيكل
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminProtectedRoute from './components/common/AdminProtectedRoute';

// استيراد جميع الصفحات
import HomePage from './pages/HomePage';
import ActivitiesPage from './pages/ActivitiesPage';
import TeamPage from './pages/TeamPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminLayout from './components/admin/layout/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import SliderManagerPage from './pages/admin/SliderManagerPage';
import PagesManagerPage from './pages/admin/PagesManagerPage';
import ActivitiesManagerPage from './pages/admin/ActivitiesManagerPage';
import MembersManagerPage from './pages/admin/MembersManagerPage';
import StatsManagerPage from './pages/admin/StatsManagerPage';

// عنوان API للمحتوى العام
const API_CONTENT_URL = 'http://localhost:5000/api/content';

function App() {
  const { i18n } = useTranslation();
  const [siteContent, setSiteContent] = useState(null);
  const [loading, setLoading] = useState(true); // اسم الحالة الصحيح

  // Hook لتغيير اتجاه الصفحة
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  // Hook لجلب المحتوى العام
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true); // استخدام اسم الدالة الصحيح
      try {
        const res = await fetch(API_CONTENT_URL);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setSiteContent(data);
      } catch (error) {
        console.error("App.jsx: Failed to fetch site content. The actual error is:", error);
      } finally {
        setLoading(false); // استخدام اسم الدالة الصحيح
      }
    };
    fetchContent();
  }, []);
  return (
    
    <div className="App">
      <h1>API URL IS: {import.meta.env.VITE_API_URL}</h1>

      <Header />
      <main>
        <Routes>
          {/* تمرير المحتوى والحالة للصفحات */}
          <Route path="/" element={<HomePage siteContent={siteContent} loading={loading} />} />
          <Route path="/about" element={<AboutPage siteContent={siteContent} loading={loading} />} />
          <Route path="/contact" element={<ContactPage siteContent={siteContent} loading={loading} />} />
          
          {/* بقية المسارات */}
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin" 
            element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="slider" element={<SliderManagerPage />} />
            <Route path="pages" element={<PagesManagerPage />} />
            <Route path="activities" element={<ActivitiesManagerPage />} /> 
            <Route path="members" element={<MembersManagerPage />} />
            <Route path="stats" element={<StatsManagerPage />} />
          </Route>
        </Routes>
      </main>
      <Footer siteContent={siteContent} />
    </div>
  );
}

export default App;