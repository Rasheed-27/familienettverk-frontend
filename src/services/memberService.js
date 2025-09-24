// src/services/memberService.js

import teamData from '../data/mockTeam';

const MEMBERS_STORAGE_KEY = 'familienettverk_members';

// إضافة خاصية "الموافقة" للبيانات الأولية
const initialMembers = teamData.map(member => ({ ...member, isApproved: true }));
// لغرض التجربة، سنجعل أحد الأعضاء غير موافق عليه
initialMembers[initialMembers.length - 1].isApproved = false;


// دالة لجلب كل الأعضاء (للمدير)
export const getAllMembers = () => {
  const storedMembers = localStorage.getItem(MEMBERS_STORAGE_KEY);
  if (storedMembers) {
    return JSON.parse(storedMembers);
  } else {
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(initialMembers));
    return initialMembers;
  }
};

// دالة لجلب الأعضاء الموافق عليهم فقط (للصفحة العامة)
export const getApprovedMembers = () => {
  const allMembers = getAllMembers();
  return allMembers.filter(member => member.isApproved);
};

// دالة لتحديث عضو
export const updateMember = (updatedMember) => {
  let members = getAllMembers();
  members = members.map(member => member.id === updatedMember.id ? updatedMember : member);
  localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
  return updatedMember;
};

// دالة لتبديل حالة الموافقة
export const toggleMemberApproval = (memberId) => {
  let members = getAllMembers();
  members = members.map(member => {
    if (member.id === memberId) {
      return { ...member, isApproved: !member.isApproved };
    }
    return member;
  });
  localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
  return members;
};

// دالة لحذف عضو
export const deleteMember = (memberId) => {
  let members = getAllMembers();
  members = members.filter(member => member.id !== memberId);
  localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
  return members;
};