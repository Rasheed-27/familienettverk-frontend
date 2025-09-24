
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // المسار الصحيح هو ../../
import '../AuthForm.css';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // استخدام دالة login الرئيسية
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      
      // بعد تسجيل الدخول، نتحقق من صلاحيات المدير من localStorage
      const userData = JSON.parse(localStorage.getItem('authUser'));
      if (userData && userData.isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        // إذا لم يكن مديرًا، اعرض خطأ وسجل خروجه
        setError('You are not authorized as an admin.');
        // يمكنك إضافة دالة logout هنا إذا أردت
      }
    } catch (err) {
      setError(err.message || 'فشل الدخول. تحقق من بياناتك.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2>دخول لوحة التحكم</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>كلمة المرور</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'جاري التحقق...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
