import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// استيراد ملفات الترجمة التي أنشأناها
import translationAR from './locales/ar/translation.json';
import translationEN from './locales/en/translation.json';
import translationNO from './locales/no/translation.json';

// تهيئة i18next
i18n
  // استخدام كاشف اللغة لتحديد اللغة تلقائيًا
  .use(LanguageDetector)
  // تمرير نسخة i18n إلى react-i18next
  .use(initReactI18next)
  // إعدادات التهيئة
  .init({
    // تفعيل وضع التصحيح (debug mode) في بيئة التطوير
    debug: true,
    
    // اللغة الافتراضية التي سيتم استخدامها إذا لم يتم العثور على لغة المستخدم
    fallbackLng: 'en',
    
    interpolation: {
      // React يقوم بالفعل بالهروب من القيم، لذلك لا نحتاج لهذه الميزة
      escapeValue: false, 
    },
    
    // المصادر أو "الموارد" التي تحتوي على الترجمات
    resources: {
      en: {
        translation: translationEN,
      },
      ar: {
        translation: translationAR,
      },
      no: {
        translation: translationNO,
      },
    },
  });

export default i18n;