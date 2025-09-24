import React from 'react';
import { useTranslation } from 'react-i18next';
import ContentSection from '../components/about/ContentSection';
import Spinner from '../components/common/Spinner';
import './Page.css';
import '../components/about/About.css';

const AboutPage = ({ siteContent, loading }) => {
  const { t, i18n } = useTranslation();
  
  // 1. طباعة الـ props التي تصل للمكون عند كل إعادة عرض
  console.log("AboutPage received siteContent:", siteContent);

  if (loading || !siteContent) {
    return (
      <div className="page-container">
        <header className="page-header">
          <h1>{t('about_page_title')}</h1>
          <p>{t('about_page_subtitle')}</p>
        </header>
        <div className="page-content">
          <Spinner />
        </div>
      </div>
    );
  }

  // استخدام optional chaining (?.) للوصول الآمن إلى البيانات المتداخلة
  const { introduction, vision, mission } = siteContent.aboutPage || {};

  // 2. طباعة البيانات بعد استخلاصها
  console.log("AboutPage extracted data:", { introduction, vision, mission });
  
  // 3. استخلاص كل نص على حدة وطباعته
  const introText = introduction?.text?.[i18n.language];
  const visionText = vision?.text?.[i18n.language];
  const missionText = mission?.text?.[i18n.language];
  
  console.log("AboutPage final introText for lang '" + i18n.language + "':", introText);

  // ملاحظة: لم نقم بإضافة imageUrl إلى النموذج بعد، لذلك سيكون فارغًا حاليًا
  const introImageUrl = siteContent.aboutPage?.introduction?.imageUrl; 

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>{t('about_page_title')}</h1>
        <p>{t('about_page_subtitle')}</p>
      </header>
      <div className="page-content">
        <div className="about-page-content">
          <ContentSection 
            title={t('about_story_title')}
            text={introText}
            imageUrl={introImageUrl}
          />
          <ContentSection 
            title={t('about_vision_title')}
            text={visionText}
            reverse={true}
          />
          <ContentSection 
            title={t('about_mission_title')}
            text={missionText}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;