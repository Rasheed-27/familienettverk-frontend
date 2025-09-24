import React from 'react';
import './About.css';

const ContentSection = ({ title, text, imageUrl, reverse = false }) => {
  return (
    <div className={`content-section ${reverse ? 'reverse' : ''}`}>
      {imageUrl && (
        <div className="content-image">
          <img src={imageUrl} alt={title} />
        </div>
      )}
      <div className="content-text">
        <h3>{title}</h3>
        {text && <p>{text}</p>}
      </div>
    </div>
  );
};

export default ContentSection;