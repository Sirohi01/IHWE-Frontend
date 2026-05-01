import AwardsHero from "./AwardsHero";
import AwardsAbout from "./AwardsAbout";
import AwardsCategories from "./AwardsCategories";
import AwardsNomination from "./AwardsNomination";
import AwardsSponsorship from "./AwardsSponsorship";
import AwardsGallery from "./AwardsGallery";
import AwardsCTA from "./AwardsCTA";

const Awards = () => {
  return (
    <div className="min-h-screen font-inter bg-white">
      <AwardsHero />
      <AwardsAbout />
      <AwardsCategories />
      <AwardsNomination />
      <AwardsSponsorship />
      <AwardsGallery />
      <AwardsCTA />
    </div>
  );
};

export default Awards;
