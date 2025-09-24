import React from 'react';
import { useTranslation } from 'react-i18next'; // سنضيف الترجمة للفوتر
import './Footer.css';

const Footer = ({ siteContent }) => { // 1. استقبال المحتوى كـ prop
  const { t } = useTranslation();
  const social = siteContent?.contactInfo?.social;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Familie.Nettverk. All Rights Reserved.
          </p>
          
          <div className="social-links">
            {social?.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
            {social?.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
            {social?.youtube && <a href={social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>}
            {social?.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;