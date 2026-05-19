import React from 'react';
import LogisticHero from './LogisticHero';
import LogisticStats from './LogisticStats';
import LogisticBenefits from './LogisticBenefits';
import LogisticPackages from './LogisticPackages';
import LogisticFooter from './LogisticFooter';

const LogisticPartnerPage: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC] font-sans">
      {/* Hero Section */}
      <LogisticHero />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 -mt-2 relative z-20">
        {/* Stats Bar */}
        <div className="max-w-[985px] mx-auto lg:ml-3">
          <LogisticStats />
        </div>

        {/* Benefits (3 cols) + Packages (sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">

          <div className="lg:col-span-9 lg:-mt-4">
            <LogisticBenefits />
          </div>
          <div className="lg:col-span-3 lg:-mt-20 ">
            <LogisticPackages />
          </div>
        </div>
      </div>

      <div className=" w-full h-full">
        <LogisticFooter /></div>
    </div>
  );
};

export default LogisticPartnerPage;
