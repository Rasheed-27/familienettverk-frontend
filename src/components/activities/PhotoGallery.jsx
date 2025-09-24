import React from 'react';
import { FaRegNewspaper } from 'react-icons/fa';
import './Gallery.css';

const formatDate = (dateString, locale = 'en') => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(locale, options);
};

// 1. المكون الآن يستقبل دالة onPhotoClick كـ prop
const PhotoGallery = ({ photos, t, i18n, onPhotoClick }) => {
  return (
    <div className="gallery-section">
      <h2 className="gallery-title">{t('photo_gallery_title')}</h2>
      <div className="content-grid">
        {photos.map((photo) => (
          // 2. تم تغيير وسم <a> إلى <div>
          // 3. تم إضافة حدث onClick الذي يستدعي onPhotoClick مع بيانات الصورة الحالية
          <div 
            key={photo._id} 
            className="story-card" 
            onClick={() => onPhotoClick(photo)}
            style={{ cursor: 'pointer' }} // إضافة مؤشر اليد للإشارة إلى أنه قابل للنقر
          >
            <div className="story-card-media image-media">
              <img 
                src={photo.imageUrl} 
                alt={photo.title ? (photo.title[i18n.language] || photo.title.en) : 'Activity photo'} 
              />
            </div>
            <div className="story-card-content">
              <div className="story-card-meta">
                <FaRegNewspaper />
                <span>{photo.category ? (photo.category[i18n.language] || photo.category.en) : 'Event'}</span>
                <time dateTime={photo.eventDate}>
                  {formatDate(photo.eventDate, i18n.language)}
                </time>
              </div>
              <h3 className="story-card-title">
                {photo.title ? (photo.title[i18n.language] || photo.title.en) : 'Untitled'}
              </h3>
              <p className="story-card-description">
                {photo.description ? (photo.description[i18n.language] || photo.description.en) : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;