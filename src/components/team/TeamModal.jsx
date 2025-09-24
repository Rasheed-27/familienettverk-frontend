import React from 'react';
import './Team.css';

// المكون الآن يقبل i18n كـ prop
const TeamModal = ({ member, onClose, i18n }) => {
  if (!member) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={member.imageUrl} alt={member.fullName} className="modal-image" />
          <h2 className="modal-name">{member.fullName}</h2>
          
          {member.title && (
            <h4 className="modal-title">
              {member.title[i18n.language] || member.title.en}
            </h4>
          )}
          
          {member.bio && (
            <p className="modal-bio">
              {member.bio[i18n.language] || member.bio.en}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamModal;