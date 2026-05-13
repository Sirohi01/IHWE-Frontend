import React from 'react';
import FabricationHero from './FabricationHero';
import FabricationStats from './FabricationStats';
import FabricationBenefits from './FabricationBenefits';
import FabricationPackages from './FabricationPackages';
import FabricationFooter from './FabricationFooter';

const FabricationPartnerPage: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC]  font-sans">
      {/* Hero Section */}
      <FabricationHero />

      {/* Stats + Benefits + Packages */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-8 -mt-2 relative z-20">
        {/* Stats Bar - Width slightly increased and left-aligned */}
        <div className="max-w-[1000px]">
          <FabricationStats />
        </div>

        {/* Benefits (3 cols) + Packages (sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-9 -mt-4">
            <FabricationBenefits />
          </div>
          <div className="lg:col-span-3 -mt-20">
            <FabricationPackages />
          </div>
        </div>
        {/* Footer */}
      <FabricationFooter />
      </div>

      
    </div>
  );
};

export default FabricationPartnerPage;