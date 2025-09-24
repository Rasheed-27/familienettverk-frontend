import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from '../common/Spinner';
import './HeroSlider.css';

const API_URL = 'http://localhost:5000/api/slides';

const HeroSlider = () => {
  const { i18n } = useTranslation();
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSlides(data);
      } catch (err) {
        // طباعة الخطأ الفعلي لتشخيصه
        console.error("HeroSlider.jsx: Error fetching slides. The actual error is:", err);
        setError("فشل تحميل البيانات. الرجاء المحاولة مرة أخرى لاحقًا.");
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (loading) {
    return <div className="hero-slider-container"><Spinner /></div>;
  }
  if (error) {
    return <div className="hero-slider-container error-message" style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }
  if (!slides || slides.length === 0) {
    return <div className="hero-slider-container"><p>لا توجد عروض لعرضها حاليًا.</p></div>;
  }
    
  const currentSlide = slides[currentIndex];

  return (
    <div className="hero-slider" style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}>
      <div className="slider-overlay"></div>
      <button onClick={goToPrevious} className="slider-arrow left-arrow">❮</button>
      <button onClick={goToNext} className="slider-arrow right-arrow">❯</button>
      <div className="slide-content">
        <h1 className="slide-title">{currentSlide.title[i18n.language] || currentSlide.title.en}</h1>
        {currentSlide.subtitle && <p className="slide-subtitle">{currentSlide.subtitle[i18n.language] || currentSlide.subtitle.en}</p>}
        {currentSlide.buttonText && currentSlide.buttonText.ar && (
            <a href={currentSlide.buttonLink} className="slide-button">
                {currentSlide.buttonText[i18n.language] || currentSlide.buttonText.en}
            </a>
        )}
      </div>
    </div>
  );
};

export default HeroSlider;