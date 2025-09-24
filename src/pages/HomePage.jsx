import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import AboutSnippet from '../components/home/AboutSnippet';
import WelcomeVideo from '../components/home/WelcomeVideo';
import Statistics from '../components/home/Statistics';
import Spinner from '../components/common/Spinner';

const HomePage = ({ siteContent, loading }) => {
  return (
    <>
      <HeroSlider />

      {/* 
        إذا كانت البيانات لا تزال تُحمّل، اعرض Spinner.
        وإلا، إذا كانت البيانات موجودة (siteContent ليس null)، اعرض المكونات.
      */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
          <Spinner />
        </div>
      ) : siteContent ? (
        <>
          <AboutSnippet content={siteContent.homeAboutSnippet} />
          <WelcomeVideo videoUrl={siteContent.welcomeVideoUrl} />
          <Statistics />
        </>
      ) : (
        // في حال فشل جلب البيانات، يمكنك عرض رسالة
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>فشل تحميل محتوى الصفحة.</p>
        </div>
      )}
    </>
  );
};

export default HomePage;