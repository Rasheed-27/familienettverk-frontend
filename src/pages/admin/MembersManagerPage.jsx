import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // 1. استيراد السياق
import '../../components/admin/AdminCRUD.css';

const API_URL = 'http://localhost:5000/api/members';

const MembersManagerPage = () => {
  const { user } = useAuth(); // 2. الحصول على المستخدم (والتوكن)
  const [members, setMembers] = useState([]);

  const fetchAllMembers = async () => {
    try {
      const token = localStorage.getItem('authToken'); // 3. قراءة التوكن
      if (!token) throw new Error("No auth token found");

      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}` // 4. إرسال التوكن في الهيدر
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch members, unauthorized');
      }

      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error(error.message);
      // يمكنك عرض رسالة خطأ للمستخدم هنا
    }
  };

  useEffect(() => {
    fetchAllMembers();
  }, []);

  const handleToggleApproval = async (memberId) => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch(`${API_URL}/${memberId}/toggle-approval`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchAllMembers();
    } catch (error) {
      console.error("Failed to toggle approval:", error);
    }
  };

  const handleDelete = async (memberId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العضو؟')) {
      try {
        const token = localStorage.getItem('authToken');
        await fetch(`${API_URL}/${memberId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchAllMembers();
      } catch (error) {
        console.error("Failed to delete member:", error);
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>إدارة الأعضاء والمتطوعين</h1>
      </div>

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>صورة</th>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {members && members.map(member => ( // 5. إضافة تحقق للتأكد من أن members مصفوفة
              <tr key={member._id}>
                <td><img src={member.imageUrl} alt={member.fullName} className="thumbnail" style={{borderRadius: '50%'}} /></td>
                <td>{member.fullName}</td>
                <td>{member.email}</td>
                <td>
                  <span className={`status-badge ${member.isApproved ? 'approved' : 'pending'}`}>
                    {member.isApproved ? 'موافق عليه' : 'قيد المراجعة'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleToggleApproval(member._id)} 
                    className={member.isApproved ? 'pending-btn' : 'approve-btn'}
                  >
                    {member.isApproved ? 'تعليق' : 'موافقة'}
                  </button>
                  <button onClick={() => handleDelete(member._id)} className="delete-btn">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersManagerPage;