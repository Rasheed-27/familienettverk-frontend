import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AboutSnippet.css';

const AboutSnippet = ({ content }) => {
  const { t, i18n } = useTranslation();
  
  // --- أضف هذا السطر للتشخيص ---
  console.log("AboutSnippet received props:", content);

  if (!content) {
    console.log("AboutSnippet: Content prop is missing, rendering nothing.");
    return null;
  }

  const title = content.title?.[i18n.language];
  const text = content.text?.[i18n.language];

  if (!title && !text) {
    console.log("AboutSnippet: Title and text are empty, rendering nothing.");
    return null;
  }

  return (
    <section className="about-snippet">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-text">{text}</p>
        <Link to="/about" className="section-button">{t('about_snippet_button')}</Link>
      </div>
    </section>
  );
};
export default AboutSnippet;