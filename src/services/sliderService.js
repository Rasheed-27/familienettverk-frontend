// src/services/sliderService.js

import slidesData from '../data/mockSlides'; // استيراد البيانات الأولية

const SLIDES_STORAGE_KEY = 'familienettverk_slides';

// دالة لجلب كل الشرائح
export const getSlides = () => {
  // تحقق مما إذا كانت البيانات موجودة في localStorage
  const storedSlides = localStorage.getItem(SLIDES_STORAGE_KEY);
  if (storedSlides) {
    return JSON.parse(storedSlides);
  } else {
    // إذا لم تكن موجودة، ضع البيانات الأولية وارجعها
    localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(slidesData));
    return slidesData;
  }
};

// دالة لإضافة شريحة جديدة
export const addSlide = (newSlide) => {
  const slides = getSlides();
  // إضافة id فريد (محاكاة)
  const slideToAdd = { ...newSlide, _id: new Date().getTime().toString() };
  slides.push(slideToAdd);
  localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(slides));
  return slideToAdd;
};

// دالة لتحديث شريحة
export const updateSlide = (updatedSlide) => {
  let slides = getSlides();
  slides = slides.map(slide => slide._id === updatedSlide._id ? updatedSlide : slide);
  localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(slides));
  return updatedSlide;
};

// دالة لحذف شريحة
export const deleteSlide = (slideId) => {
  let slides = getSlides();
  slides = slides.filter(slide => slide._id !== slideId);
  localStorage.setItem(SLIDES_STORAGE_KEY, JSON.stringify(slides));
  return slideId;
};