// src/components/contact/ContactForm.jsx

import React, { useState } from 'react';
import './Contact.css'; // نفس ملف الأنماط

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // في مشروع حقيقي، هنا يتم إرسال البيانات إلى الخادم (Backend)
    console.log("Form Data Submitted:", formData);
    
    // محاكاة إرسال ناجح
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    // لإخفاء رسالة النجاح بعد فترة
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className="contact-form-container">
      <h3>أرسل لنا رسالة</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">الاسم الكامل</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">الموضوع</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">رسالتك</label>
          <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="submit-button">إرسال الرسالة</button>
      </form>
      {status === 'success' && (
        <p className="success-message">شكرًا لك! تم استلام رسالتك بنجاح.</p>
      )}
    </div>
  );
};

export default ContactForm;