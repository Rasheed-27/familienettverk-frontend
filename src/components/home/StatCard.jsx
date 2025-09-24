// src/components/home/StatCard.jsx

import React from 'react';
import './Statistics.css'; // سنستخدم نفس ملف الأنماط الخاص بالقسم الرئيسي

const StatCard = ({ icon, number, label }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatCard;