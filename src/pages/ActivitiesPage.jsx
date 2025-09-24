import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PhotoGallery from '../components/activities/PhotoGallery';
import VideoGallery from '../components/activities/VideoGallery';
import Lightbox from '../components/activities/Lightbox'; // 1. استيراد
import Spinner from '../components/common/Spinner';
import './Page.css';

const API_URL = 'http://localhost:5000/api/activities';

const ActivitiesPage = () => {
  const { t, i18n } = useTranslation();
  const [activities, setActivities] = useState({ photos: [], videos: [] });
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // 2. حالة جديدة

// ...
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true); // ابدأ التحميل
      try {
        const response = await fetch(API_URL);
        // التحقق من نجاح الاستجابة
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        // يمكنك هنا عرض رسالة خطأ للمستخدم إذا أردت
      } finally {
        // --- هذا هو الجزء الأهم ---
        // سيتم تنفيذ هذا السطر دائمًا، سواء نجح الطلب أو فشل.
        setLoading(false); 
      }
    };
    fetchActivities();
  }, []); // يعمل مرة واحدة عند تحميل المكون
// ...  
  // 3. دوال لفتح وإغلاق الـ Lightbox
  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
  };
  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="page-container">
        {/* ... (الهيدر و Spinner لا يتغيران) ... */}
        <div className="page-content">
          {loading ? <Spinner /> : (
            <>
              {/* 4. تمرير دالة الفتح إلى المعرض */}
              <PhotoGallery photos={activities.photos} t={t} i18n={i18n} onPhotoClick={openLightbox} />
              <VideoGallery videos={activities.videos} t={t} i18n={i18n} />
            </>
          )}
        </div>
      </div>
      
      {/* 5. عرض الـ Lightbox بشكل شرطي */}
      <Lightbox photo={selectedPhoto} onClose={closeLightbox} />
    </>
  );
};

export default ActivitiesPage;