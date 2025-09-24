// src/services/statsService.js

const STATS_STORAGE_KEY = 'familienettverk_stats';

// البيانات الأولية
const initialStats = [
  {
    id: 1,
    icon: "👥",
    number: "50+",
    label: { ar: "متطوع ومتطوعة", en: "Volunteers", no: "Frivillige" }
  },
  {
    id: 2,
    icon: "🎉",
    number: "100+",
    label: { ar: "نشاط وفعالية", en: "Activities & Events", no: "Aktiviteter og arrangementer" }
  },
  {
    id: 3,
    icon: "👨‍👩‍👧‍👦",
    number: "200+",
    label: { ar: "عائلة مستفيدة", en: "Beneficiary Families", no: "Mottakerfamilier" }
  },
  {
    id: 4,
    icon: "🤝",
    number: "15+",
    label: { ar: "شريك نجاح", en: "Successful Partners", no: "Vellykkede partnere" }
  }
];

// دالة لجلب كل الإحصائيات
export const getStats = () => {
  const storedStats = localStorage.getItem(STATS_STORAGE_KEY);
  if (storedStats) {
    return JSON.parse(storedStats);
  } else {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(initialStats));
    return initialStats;
  }
};

// دالة لتحديث كل الإحصائيات مرة واحدة
export const updateStats = (newStats) => {
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStats));
  return newStats;
};