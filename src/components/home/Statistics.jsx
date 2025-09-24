import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StatCard from './StatCard';
import './Statistics.css';

const API_URL = 'http://localhost:5000/api/stats';

const Statistics = () => {
  const { t, i18n } = useTranslation();
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setStatsData(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="statistics-section">
      <div className="container">
        <h2 className="section-title">{t('stats_title')}</h2>
        <div className="stats-grid">
          {statsData.map((stat) => (
            <StatCard 
              key={stat._id}
              icon={stat.icon}
              number={stat.number}
              label={stat.label[i18n.language] || stat.label.en} // يعرض اللغة الحالية، وإذا لم تكن موجودة يعرض الإنجليزية كبديل
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;