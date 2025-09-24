// ...
import { getApprovedMembers } from '../services/memberService'; // <-- 1. استيراد الخدمة الصحيحة
// ...

const TeamPage = () => {
  // ...
  const teamData = getApprovedMembers(); // <-- 2. استخدام دالة جلب الموافق عليهم

  // ...
  return (
    <>
      <div className="page-container">
        {/* ... */}
        <div className="page-content">
          <div className="team-grid">
            {teamData.map((member) => ( // <-- teamData الآن تحتوي فقط على الموافق عليهم
              <TeamCard 
                key={member.id}
                member={member}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>
      {/* ... */}
    </>
  );
};
export default TeamPage;