import React from 'react';
import { FaVideo } from 'react-icons/fa';
import './Gallery.css';

const VideoGallery = ({ videos, t, i18n }) => {
  return (
    <div className="gallery-section">
      <h2 className="gallery-title">{t('video_gallery_title')}</h2>
      <div className="content-grid">
        {videos.map((video) => (
          <div key={video._id} className="story-card">
            <div className="story-card-media">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
                title={video.title ? (video.title[i18n.language] || video.title.en) : 'YouTube Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
             <div className="story-card-content">
              <div className="story-card-meta">
                <FaVideo />
                <span>Video</span>
              </div>
              <h3 className="story-card-title">
                {video.title ? (video.title[i18n.language] || video.title.en) : 'Untitled Video'}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;