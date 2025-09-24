// src/services/activityService.js

import activitiesData from '../data/mockActivities';

const ACTIVITIES_STORAGE_KEY = 'familienettverk_activities';

// دالة لجلب كل الأنشطة
export const getActivities = () => {
  const storedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
  if (storedActivities) {
    return JSON.parse(storedActivities);
  } else {
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activitiesData));
    return activitiesData;
  }
};

// --- إدارة الصور (الألبومات) ---

// دالة لإضافة صورة جديدة إلى ألبوم معين
export const addPhotoToAlbum = (albumId, photoData) => {
  const activities = getActivities();
  const album = activities.photoAlbums.find(a => a.id === albumId);
  if (album) {
    const newPhoto = { 
      ...photoData, 
      id: `p${new Date().getTime()}` // id فريد
    };
    album.items.push(newPhoto);
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
  }
  return activities;
};

// دالة لحذف صورة من ألبوم
export const deletePhotoFromAlbum = (albumId, photoId) => {
  const activities = getActivities();
  const album = activities.photoAlbums.find(a => a.id === albumId);
  if (album) {
    album.items = album.items.filter(p => p.id !== photoId);
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
  }
  return activities;
};

// --- إدارة الفيديوهات ---

// دالة لإضافة فيديو جديد
export const addVideo = (videoData) => {
    const activities = getActivities();
    const newVideo = { 
        ...videoData, 
        id: `v${new Date().getTime()}` 
    };
    activities.videos.push(newVideo);
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
    return activities;
}

// دالة لحذف فيديو
export const deleteVideo = (videoId) => {
    const activities = getActivities();
    activities.videos = activities.videos.filter(v => v.id !== videoId);
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
    return activities;
}