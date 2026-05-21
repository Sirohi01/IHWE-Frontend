import React, { useState, useEffect } from 'react';
import LogisticHero from './LogisticHero';
import LogisticStats from './LogisticStats';
import LogisticBenefits from './LogisticBenefits';
import LogisticPackages from './LogisticPackages';
import LogisticFooter from './LogisticFooter';
import { logisticPartnerApi } from '@/lib/api';

const LogisticPartnerPage: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await logisticPartnerApi.get();
        if (res) setData(res);
      } catch (err) {
        console.error("Failed to load logistic partner data", err);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-8 h-8 border-4 border-[#0B2C66] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] font-sans">
      {/* Hero Section */}
      <LogisticHero data={data?.hero} />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 -mt-2 relative z-20">
        {/* Stats Bar */}
        <div className="max-w-[985px] mx-auto lg:ml-3">
          <LogisticStats data={data?.stats} />
        </div>

        {/* Benefits (3 cols) + Packages (sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">

          <div className="lg:col-span-9 lg:-mt-4">
            <LogisticBenefits data={data?.benefits} />
          </div>
          <div className="lg:col-span-3 lg:-mt-20 ">
            <LogisticPackages data={data?.packages} />
          </div>
        </div>
      </div>

      <div className=" w-full h-full">
        <LogisticFooter data={data?.footer} />
      </div>
    </div>
  );
};

export default LogisticPartnerPage;
