import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // استيراد Link
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const API_URL = 'http://localhost:5000/api/members/profile';

const ProfilePage = () => {
  const { user, updateUser } = useAuth(); // جلب بيانات المستخدم الحالي من السياق
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', specialty: '', bio: '', imageUrl: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setLoading(false);
          return;
        }
        
        const response = await fetch(API_URL, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setFormData(data);
        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (error) {
        console.error("Fetch profile error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const updatedData = await response.json();
      if (response.ok) {
        updateUser(updatedData);
        setMessage('تم تحديث ملفك الشخصي بنجاح!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error(updatedData.message || 'Failed to update profile');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="page-container"><p>جاري تحميل الملف الشخصي...</p></div>;
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>ملفك الشخصي</h1>
        <p>مرحباً بك، {formData.fullName}! هنا يمكنك إدارة معلوماتك.</p>
      </header>
      <div className="page-content">
        <div className="profile-layout">
          <div className="profile-sidebar">
            <img src={formData.imageUrl || 'https://i.pravatar.cc/150'} alt="Profile" className="profile-avatar" />
            <p>لتغيير الصورة، الرجاء التواصل مع الإدارة حالياً.</p>
            
            {/* --- الزر الشرطي للمدير --- */}
            {user && user.isAdmin && (
              <Link to="/admin" className="admin-dashboard-button">
                الذهاب إلى لوحة التحكم
              </Link>
            )}

          </div>
          
          <div className="profile-main">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">الاسم الكامل</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني (غير قابل للتعديل)</label>
                <input type="email" id="email" name="email" value={formData.email} readOnly disabled />
              </div>
              <div className="form-group">
                <label htmlFor="phone">رقم الهاتف</label>
                <input type="tel" id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="specialty">التخصص</label>
                <input type="text" id="specialty" name="specialty" value={formData.specialty || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="bio">نبذة قصيرة عنك</label>
                <textarea id="bio" name="bio" rows="4" value={formData.bio || ''} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="submit-button">حفظ التغييرات</button>
              {message && <p className="success-message">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;