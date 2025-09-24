// src/components/contact/ContactInfo.jsx

import React from 'react';
import './Contact.css'; // ملف أنماط مشترك

// يمكن استيراد الأيقونات من مكتبة مثل react-icons
// npm install react-icons
// import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactInfo = () => {
  // بيانات وهمية. ستأتي من لوحة التحكم لاحقًا.
  const contactDetails = {
    address: "123 Main Street, Bergen, Norway",
    email: "info@familienettverk.no",
    phone: "+47 123 45 678"
  };

  return (
    <div className="contact-info">
      <h3>معلومات الاتصال</h3>
      <p>نحن هنا لمساعدتك. تواصل معنا عبر القنوات التالية أو باستخدام النموذج.</p>
      <ul className="info-list">
        <li>
          {/* <FaMapMarkerAlt /> */} <span>📍</span> {contactDetails.address}
        </li>
        <li>
          {/* <FaEnvelope /> */} <span>✉️</span> <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
        </li>
        <li>
          {/* <FaPhone /> */} <span>📞</span> <a href={`tel:${contactDetails.phone}`}>{contactDetails.phone}</a>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;