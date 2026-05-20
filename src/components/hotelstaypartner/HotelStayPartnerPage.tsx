import React from 'react';
import HotelHero from './HotelHero';
import HotelStats from './HotelStats';
import HotelBenefits from './HotelBenefits';
import HotelPackages from './HotelPackages';
import HotelFooter from './HotelFooter';
import axios from 'axios';
import { SERVER_URL } from '../../lib/api';

const fetchHotelStayData = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/api/hotel-stay-partner?t=${new Date().getTime()}`);
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching hotel stay partner data", error);
  }
  return null;
};

const HotelStayPartnerPage: React.FC = () => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchHotelStayData().then(res => {
      if (res) setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#134698]"></div></div>;
  }

  if (!data) return null;

  return (
    <div className="bg-[#F8FAFC] font-sans">
      {/* Hero Section */}
      <HotelHero hero={data.hero} benefits={data.benefits} />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 -mt-2 relative z-20">

        <div className="max-w-[985px] mx-auto lg:ml-3">
          <HotelStats stats={data.stats} />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-9 lg:-mt-4">
            <HotelBenefits benefits={data.benefits} />
          </div>
          <div className="lg:col-span-3 lg:-mt-20 pb-0 ">
            <HotelPackages packages={data.packages} />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <HotelFooter footer={data.footer} /></div>
    </div>
  );
};

export default HotelStayPartnerPage;
