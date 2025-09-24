// src/pages/SignupPage.jsx

import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(formData.fullName, formData.email, formData.password);
      navigate('/profile'); // توجيه إلى الملف الشخصي بعد التسجيل الناجح
    } catch (err) {
      setError(err.message || 'فشل في إنشاء الحساب. قد يكون البريد الإلكتروني مستخدمًا بالفعل.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2>إنشاء حساب متطوع جديد</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">الاسم الكامل</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">كلمة المرور</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
          </button>
        </form>
        <p className="auth-switch">
          لديك حساب بالفعل؟ <Link to="/login">سجل الدخول من هنا</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;