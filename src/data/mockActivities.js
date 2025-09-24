// src/data/mockActivities.js

const activitiesData = {
  // قسم الصور
  photoAlbums: [
    {
      id: "album1",
      title: { ar: "احتفال نهاية العام", en: "End of Year Celebration" },
      items: [
        { id: "p1", imageUrl: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77", description: { ar: "أجواء احتفالية رائعة.", en: "Great festive atmosphere." } },
        { id: "p2", imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce", description: { ar: "لحظات من الفرح.", en: "Moments of joy." } },
        { id: "p3", imageUrl: "https://images.unsplash.com/photo-1578351049389-a212c72b212f", description: { ar: "توزيع الهدايا على الأطفال.", en: "Distributing gifts to children." } },
      ]
    },
    {
      id: "album2",
      title: { ar: "ورشة عمل فنية", en: "Art Workshop" },
      items: [
        { id: "p4", imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f", description: { ar: "إطلاق العنان للإبداع.", en: "Unleashing creativity." } },
        { id: "p5", imageUrl: "https://images.unsplash.com/photo-1598420567649-014490333b2a", description: { ar: "الأطفال يتعلمون الرسم.", en: "Kids learning to paint." } },
      ]
    },
    {
      id: "album3",
      title: { ar: "رحلة إلى الطبيعة", en: "Trip to Nature" },
      items: [
        { id: "p6", imageUrl: "https://images.unsplash.com/photo-1473177839626-4557c491a3a7", description: { ar: "استكشاف الغابة معًا.", en: "Exploring the forest together." } },
        { id: "p7", imageUrl: "https://images.unsplash.com/photo-1470219556762-1771e7f9427d", description: { ar: "الاستمتاع بالمناظر الطبيعية.", en: "Enjoying the landscape." } },
        { id: "p8", imageUrl: "https://images.unsplash.com/photo-1444464666168-49d633b86797", description: { ar: "جلسة هادئة بجانب النهر.", en: "A calm session by the river." } },
      ]
    }
  ],
  // قسم الفيديوهات
  videos: [
    { id: "v1", title: { ar: "ملخص فعاليات الصيف", en: "Summer Activities Recap" }, youtubeVideoId: "Scxs7L0hZFU" },
    { id: "v2", title: { ar: "كلمة من مدير المنظمة", en: "A Word from the Director" }, youtubeVideoId: "78A2SQLbORs" },
  ]
};

export default activitiesData;