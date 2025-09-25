import React, { useState, useEffect } from 'react';
import '../../components/admin/AdminCRUD.css';

const API_URL = '/api/activities';
const UPLOAD_URL = '/api/upload';

const ActivitiesManagerPage = () => {
  const [activities, setActivities] = useState({ photos: [], videos: [] });

  const fetchActivities = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);
  
  const handleVideoDelete = async (videoId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
      const token = localStorage.getItem('authToken');
      await fetch(`${API_URL}/videos/${videoId}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchActivities();
    }
  };

  const handleVideoAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const title = e.target.elements.videoTitle.value;
    const youtubeUrl = e.target.elements.videoUrl.value;
    const videoId = youtubeUrl.split('v=')[1]?.split('&')[0] || youtubeUrl.split('/').pop();

    if (title && videoId) {
      await fetch(`${API_URL}/videos`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: { ar: title, en: title, no: title }, youtubeVideoId: videoId }),
      });
      fetchActivities();
      e.target.reset();
    } else {
      alert('الرجاء إدخال عنوان ورابط يوتيوب صحيح.');
    }
  };

  const handlePhotoDelete = async (photoId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      const token = localStorage.getItem('authToken');
      await fetch(`${API_URL}/photos/${photoId}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchActivities();
    }
  };

  const handlePhotoAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const description = e.target.elements.photoDescription.value;
    const file = e.target.elements.photoFile.files[0];

    if (!description || !file) {
      alert('الرجاء إدخال وصف واختيار صورة.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    const uploadRes = await fetch(UPLOAD_URL, { 
      method: 'POST', 
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData 
    });
    const uploadData = await uploadRes.json();
    const { imageUrl } = uploadData;

    await fetch(`${API_URL}/photos`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ description: { ar: description, en: description, no: description }, imageUrl }),
    });
    fetchActivities();
    e.target.reset();
  };


  return (
    <div className="admin-page">
      <h1>إدارة الأنشطة</h1>

      <div className="editor-section">
        <h3>إدارة الصور</h3>
        <form onSubmit={handlePhotoAdd} className="add-photo-form">
          <input type="text" name="photoDescription" placeholder="وصف الصورة (عربي)" required />
          <input type="file" name="photoFile" required />
          <button type="submit" className="add-btn">إضافة صورة</button>
        </form>
        <div className="photo-manager-grid">
          {activities.photos.map(photo => (
            <div key={photo._id} className="photo-manager-card">
              <img src={photo.imageUrl} alt={photo.description.ar} />
              <button onClick={() => handlePhotoDelete(photo._id)} className="delete-btn-overlay">×</button>
            </div>
          ))}
        </div>
      </div>

      <div className="editor-section">
        <h3>إدارة الفيديوهات</h3>
        <form onSubmit={handleVideoAdd} className="add-video-form">
          <input type="text" name="videoTitle" placeholder="عنوان الفيديو (عربي)" required />
          <input type="url" name="videoUrl" placeholder="رابط فيديو يوتيوب الكامل" required />
          <button type="submit" className="add-btn">إضافة فيديو</button>
        </form>
        <div className="admin-table-container">
            <table>
                <thead><tr><th>العنوان</th><th>إجراءات</th></tr></thead>
                <tbody>
                    {activities.videos.map(video => (
                        <tr key={video._id}>
                            <td>{video.title.ar}</td>
                            <td><button onClick={() => handleVideoDelete(video._id)} className="delete-btn">حذف</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesManagerPage;