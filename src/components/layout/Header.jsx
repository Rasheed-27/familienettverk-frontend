import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { FaGlobe, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.svg'; // يفضّل SVG، يمكن تغييره لـ .jpg عند الحاجة
import './Header.css';

/**
 * Header موحّد
 * - محوّل لغة ثابت بجوار زر القائمة على الموبايل
 * - RTL تلقائي للعربية
 * - إخفاء قائمة الموقع في /admin وإظهار "لوحة التحكم"
 */

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const applyDirection = (lng) => {
    const isRTL = lng === 'ar';
    const html = document.documentElement;
    html.setAttribute('lang', lng);
    html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.body.classList.toggle('rtl', isRTL);
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    applyDirection(lng);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    applyDirection(i18n.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="language-switcher-custom" ref={dropdownRef}>
      <button
        className="lang-button"
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Change language"
      >
        <FaGlobe />
        <span>{currentLanguage.code.toUpperCase()}</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
      </button>

      {isOpen && (
        <ul className="lang-dropdown" role="listbox">
          {languages.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={lang.code === currentLanguage.code}
              onClick={() => handleLanguageChange(lang.code)}
              onKeyDown={(e) => e.key === 'Enter' && handleLanguageChange(lang.code)}
              tabIndex={0}
            >
              <span className="flag" aria-hidden>
                {lang.flag}
              </span>
              <span>{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminSection = location.pathname.startsWith('/admin');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = (
    <ul>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/">
          {t('nav_home')}
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/activities">
          {t('nav_activities')}
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/team">
          {t('nav_team')}
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/about">
          {t('nav_about')}
        </NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/contact">
          {t('nav_contact')}
        </NavLink>
      </li>
    </ul>
  );

  return (
    <header className="site-header">
      <div className="container">
        {/* الشعار */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Familie.Nettverk Logo" className="logo" />
          </Link>
        </div>

        {/* قائمة التنقل (ديسكتوب فقط) */}
        {!isAdminSection && <nav className="main-nav">{navLinks}</nav>}

        {/* عنوان لوحة التحكم */}
        {isAdminSection && <div className="admin-header-title">لوحة التحكم</div>}

        {/* أكشنات المستخدم (قد تُخفى على الموبايل) */}
        <div className="header-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              {isAdminSection && (
                <Link to="/" className="back-to-site-btn">
                  {t('back_to_site', 'العودة للموقع')}
                </Link>
              )}
              <Link to="/profile" className="profile-link">
                {t('hello', 'مرحباً')}
                {user?.fullName ? `، ${user.fullName.split(' ')[0]}` : ''}
              </Link>
              <button onClick={handleLogout} className="logout-button">
                {t('logout', 'خروج')}
              </button>
            </div>
          ) : (
            !isAdminSection && (
              <Link to="/signup" className="cta-button">
                {t('join_us')}
              </Link>
            )
          )}
        </div>

        {/* أدوات اليمين: محوّل لغة ثابت + زر القائمة للموبايل */}
        <div className="right-tools">
          <LanguageSwitcher />

          {!isAdminSection && (
            <div className="mobile-menu-toggle">
              <button
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* قائمة الموبايل المنسدلة */}
      {isMobileMenuOpen && !isAdminSection && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileMenuOpen(false)}
          role="presentation"
        >
          <nav id="mobile-nav" className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            {navLinks}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
