import React from 'react';
import TravelHero from './TravelHero';
import TravelStats from './TravelStats';
import TravelBenefits from './TravelBenefits';
import TravelPackages from './TravelPackages';
import TravelFooter from './TravelFooter';

const TravelPartnerPage: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC] font-sans">
      {/* Hero Section */}
      <TravelHero />

      {/* Stats + Benefits + Packages */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-8 -mt-2 relative z-20">
        {/* Stats Bar - Width slightly increased and left-aligned */}
        <div className="max-w-[1000px]">
          <TravelStats />
        </div>

        {/* Benefits (3 cols) + Packages (sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-9 -mt-4">
            <TravelBenefits />
          </div>
          <div className="lg:col-span-3 -mt-20 ">
            <TravelPackages />
          </div>
        </div>
      </div>

      <div className="mb-2">
        <TravelFooter /></div>
    </div>
  );
};

export default TravelPartnerPage;