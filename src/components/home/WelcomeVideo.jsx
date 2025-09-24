import React from 'react';
import { useTranslation } from 'react-i18next';
import useContent from '../../hooks/useContent'; // استدعاء الـ hook
import './WelcomeVideo.css';

const WelcomeVideo = () => {
  const { t } = useTranslation();
  const { content, loading } = useContent(); // استخدام الـ hook

  // استخلاص رابط الفيديو من المحتوى
  const videoUrl = content?.welcomeVideoUrl;

  const getYouTubeID = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeID(videoUrl);

  // أثناء التحميل أو في حال عدم وجود رابط، لا تعرض أي شيء
  if (loading || !videoId) {
    return null;
  }

  return (
    <section className="welcome-video-section">
      <div className="container">
        <h2 className="section-title">{t('video_title')}</h2>
        <div className="video-responsive-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default WelcomeVideo;