import React, { useState, useEffect } from 'react';
import '../../components/admin/AdminCRUD.css';

const API_URL = '/api/stats';

const StatsManagerPage = () => {
  const [stats, setStats] = useState([]);
  const [message, setMessage] = useState('');

  const fetchStats = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleChange = (id, field, value) => {
    setStats(prevStats => 
      prevStats.map(stat => 
        stat.id === id ? { ...stat, [field]: value } : stat
      )
    );
  };
  
  const handleLabelChange = (id, lang, value) => {
    setStats(prevStats => 
      prevStats.map(stat => {
        if (stat._id === id) { // استخدام _id
          return { ...stat, label: { ...stat.label, [lang]: value } };
        }
        return stat;
      })
    );
  };
  
  const handleNumberChange = (id, value) => {
     setStats(prevStats => 
      prevStats.map(stat => 
        stat._id === id ? { ...stat, number: value } : stat
      )
    );
  };

  const handleSave = async () => {
    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats),
      });
      setMessage('تم تحديث الإحصائيات بنجاح!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error("Failed to update stats:", error);
      alert("حدث خطأ أثناء حفظ التغييرات.");
    }
  };

  if (!stats.length) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>إدارة الإحصائيات</h1>
        <button onClick={handleSave} className="save-btn">حفظ التغييرات</button>
      </div>
      
      {message && <p className="success-message" style={{marginBottom: '20px'}}>{message}</p>}

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>الوصف (عربي)</th>
              <th>الرقم</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(stat => (
              <tr key={stat._id}>
                <td>
                  <input 
                    type="text" 
                    value={stat.label.ar} 
                    onChange={(e) => handleLabelChange(stat._id, 'ar', e.target.value)}
                    className="table-input"
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={stat.number} 
                    onChange={(e) => handleNumberChange(stat._id, e.target.value)}
                    className="table-input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsManagerPage;