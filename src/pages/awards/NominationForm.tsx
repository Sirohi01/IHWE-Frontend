import ApplicantDetailsSection from "./nomination-sections/ApplicantDetailsSection";
import AwardCategorySection from "./nomination-sections/AwardCategorySection";
import ProfileDetailsSection from "./nomination-sections/ProfileDetailsSection";
import AchievementsImpactSection from "./nomination-sections/AchievementsImpactSection";
import SupportingDocumentsSection from "./nomination-sections/SupportingDocumentsSection";
import DeclarationSection from "./nomination-sections/DeclarationSection";

const NominationForm = () => (
  <div className="space-y-2">
    <ApplicantDetailsSection />
    <AwardCategorySection />
    <ProfileDetailsSection />
    <AchievementsImpactSection />
    <SupportingDocumentsSection />
    <DeclarationSection />
  </div>
);

export default NominationForm;
