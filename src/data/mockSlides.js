// src/data/mockSlides.js

// هذه بيانات وهمية مؤقتة لتحل محل الخادم
const slidesData = [
  {
    _id: "1", // الخادم عادة يرسل ID فريد
    title: {
      ar: "بناء مجتمع للجميع",
      en: "Building a Community for Everyone",
      no: "Bygge et fellesskap for alle"
    },
    subtitle: {
      ar: "انضموا إلى شبكة العائلة لدعم بعضنا البعض.",
      en: "Join the Family Network to support each other.",
      no: "Bli med i Familienettverket for å støtte hverandre."
    },
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070",
    buttonText: {
      ar: "اعرف المزيد",
      en: "Learn More",
      no: "Lær mer"
    },
    buttonLink: "/about",
    order: 1
  },
  {
    _id: "2",
    title: {
      ar: "أنشطة وفعاليات متنوعة",
      en: "Diverse Activities and Events",
      no: "Ulike aktiviteter og arrangementer"
    },
    subtitle: {
      ar: "نقدم برامج تعليمية، ترفيهية، واجتماعية.",
      en: "We offer educational, recreational, and social programs.",
      no: "Vi tilbyr pedagogiske, rekreasjons- og sosiale programmer."
    },
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
    buttonText: {
      ar: "شاهد الأنشطة",
      en: "See Activities",
      no: "Se aktiviteter"
    },
    buttonLink: "/activities",
    order: 2
  },
  {
    _id: "3",
    title: {
      ar: "كن جزءًا من فريقنا",
      en: "Be a Part of Our Team",
      no: "Bli en del av teamet vårt"
    },
    subtitle: {
      ar: "تطوع بوقتك ومهاراتك لإحداث فرق.",
      en: "Volunteer your time and skills to make a difference.",
      no: "Frivillig din tid og ferdigheter for å gjøre en forskjell."
    },
    imageUrl: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?q=80&w=1974",
    buttonText: {
      ar: "انضم إلينا الآن",
      en: "Join Us Now",
      no: "Bli med nå"
    },
    buttonLink: "/join",
    order: 3
  }
];

export default slidesData;