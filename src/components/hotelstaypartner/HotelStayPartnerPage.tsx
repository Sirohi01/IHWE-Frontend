import React from 'react';
import HotelHero from './HotelHero';
import HotelStats from './HotelStats';
import HotelBenefits from './HotelBenefits';
import HotelPackages from './HotelPackages';
import HotelFooter from './HotelFooter';

const HotelStayPartnerPage: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC] font-sans">
      {/* Hero Section */}
      <HotelHero />

      <div className="mx-auto max-w-[1400px] px-6 md:px-8 -mt-2 relative z-20">
        {/* Stats Bar - Width slightly decreased */}
        <div className="max-w-[985px] ml-3">
          <HotelStats />
        </div>

        {/* Benefits (3 cols) + Packages (sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-9 -mt-4">
            <HotelBenefits />
          </div>
          <div className="lg:col-span-3 -mt-20 pb-0 ">
            <HotelPackages />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <HotelFooter /></div>
    </div>
  );
};

export default HotelStayPartnerPage;
