import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TravelHero from './TravelHero';
import TravelStats from './TravelStats';
import TravelBenefits from './TravelBenefits';
import TravelPackages from './TravelPackages';
import TravelFooter from './TravelFooter';
import { SERVER_URL } from '../../lib/api';

const TravelPartnerPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/travel-partner?t=${new Date().getTime()}`);
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching travel partner content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B2C66]"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-[#F8FAFC] font-sans">
      <TravelHero hero={data.hero} benefits={data.benefits} />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 -mt-2 relative z-20">
        <div className="max-w-[985px] mx-auto lg:ml-3">
          <TravelStats stats={data.stats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-9 lg:-mt-4">
            <TravelBenefits benefits={data.benefits} />
          </div>
          <div className="lg:col-span-3 lg:-mt-20">
            <TravelPackages packages={data.packages} />
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <TravelFooter footer={data.footer} />
      </div>
    </div>
  );
};

export default TravelPartnerPage;