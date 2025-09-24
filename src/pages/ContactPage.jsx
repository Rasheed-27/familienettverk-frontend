import React from 'react';
import { useTranslation } from 'react-i18next';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import './Page.css';
import '../components/contact/Contact.css';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>{t('contact_page_title')}</h1>
        <p>{t('contact_page_subtitle')}</p>
      </header>
      <div className="page-content">
        <div className="contact-page-layout">
          {/* يمكننا تمرير t إلى المكونات الفرعية إذا كانت تحتاج ترجمة داخلية */}
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;