// src/services/pageContentService.js

import aboutPageContent from '../data/aboutPageContent';

const CONTENT_STORAGE_KEY = 'familienettverk_page_content';

// بيانات أولية مجمعة
const initialContent = {
  home: {
    aboutSnippet: {
      title: { ar: "من هي منظمة Familie.Nettverk؟", en: "Who is Familie.Nettverk?" },
      text: { ar: "نحن شبكة داعمة تسعى لبناء مجتمع مترابط...", en: "We are a supportive network..." }
    }
  },
  about: aboutPageContent, // استيراد محتوى صفحة "من نحن" بالكامل
  contact: {
    info: {
      address: "123 Main Street, Bergen, Norway",
      email: "info@familienettverk.no",
      phone: "+47 123 45 678"
    }
  }
};

// دالة لجلب كل المحتوى
export const getPageContent = () => {
  const storedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
  if (storedContent) {
    return JSON.parse(storedContent);
  } else {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(initialContent));
    return initialContent;
  }
};

// دالة لتحديث المحتوى
export const updatePageContent = (newContent) => {
  // دمج المحتوى الجديد مع القديم لضمان عدم فقدان أي جزء
  const currentContent = getPageContent();
  const updatedContent = { ...currentContent, ...newContent };
  localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(updatedContent));
  return updatedContent;
};