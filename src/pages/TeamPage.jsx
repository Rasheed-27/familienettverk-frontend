import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TeamCard from '../components/team/TeamCard';
import TeamModal from '../components/team/TeamModal';
import Spinner from '../components/common/Spinner'; // 1. استيراد
import './Page.css';
import '../components/team/Team.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/members/approved`;

const TeamPage = () => {
  const { t, i18n } = useTranslation();
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchApprovedMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setTeamData(data);
      } catch (error) {
        console.error("Failed to fetch approved members:", error);
      } finally {
        setLoading(false); // 2. إيقاف التحميل دائمًا
      }
    };
    fetchApprovedMembers();
  }, []);

  const handleCardClick = (member) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <div className="page-container">
        <header className="page-header">
          <h1>{t('team_page_title')}</h1>
          <p>{t('team_page_subtitle')}</p>
        </header>
        <div className="page-content">
          {loading ? ( // 3. عرض Spinner أثناء التحميل
            <Spinner />
          ) : (
            <div className="team-grid">
              {teamData.map((member) => (
                <TeamCard 
                  key={member._id}
                  member={member}
                  onCardClick={handleCardClick}
                  i18n={i18n}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <TeamModal member={selectedMember} onClose={handleCloseModal} i18n={i18n} />
    </>
  );
};

export default TeamPage;