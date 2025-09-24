import React from 'react';
import './Lightbox.css'; // سنقوم بإنشاء هذا الملف
import { FaTimes } from 'react-icons/fa';

const Lightbox = ({ photo, onClose }) => {
  if (!photo) {
    return null;
  }
  
  // منع إغلاق النافذة عند النقر على الصورة نفسها
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>
        <FaTimes />
      </button>
      <div className="lightbox-content" onClick={handleContentClick}>
        <img src={photo.imageUrl} alt={photo.title?.en} />
      </div>
    </div>
  );
};

export default Lightbox;