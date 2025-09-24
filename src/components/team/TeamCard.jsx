import React from 'react';
import './Team.css';

// المكون الآن يقبل i18n كـ prop
const TeamCard = ({ member, onCardClick, i18n }) => {
  return (
    <div className="team-card" onClick={() => onCardClick(member)}>
      <div className="team-card-image-container">
        <img src={member.imageUrl} alt={member.fullName} className="team-card-image" />
      </div>
      <div className="team-card-info">
        <h3 className="team-card-name">{member.fullName}</h3>
        
        {/*
          التحقق من وجود title ثم عرض الترجمة بناءً على اللغة الحالية.
          إذا لم تكن الترجمة للغة الحالية موجودة، يعرض الإنجليزية كبديل.
        */}
        {member.title && (
          <p className="team-card-title">
            {member.title[i18n.language] || member.title.en}
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamCard;