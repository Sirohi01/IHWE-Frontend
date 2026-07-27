import React from 'react';
import FabricationHero from './FabricationHero';
import FabricationStats from './FabricationStats';
import FabricationBenefits from './FabricationBenefits';
import FabricationPackages from './FabricationPackages';
import FabricationFooter from './FabricationFooter';
import axios from 'axios';
import { SERVER_URL } from '../../lib/api';

const fetchFabricationData = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/api/fabrication-partner?t=${new Date().getTime()}`);
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Error fetching fabrication partner data", error);
  }
  return null;
};

const FabricationPartnerPage: React.FC = () => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchFabricationData().then(res => {
      if (res) setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f6a72]"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-[#F8FAFC] font-sans">
      {/* Hero Section */}
      <FabricationHero hero={data.hero} benefits={data.benefits} />

      {/* Stats + Benefits + Packages */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 -mt-2 relative z-20">
        {/* Stats Bar */}
        <div className="max-w-[1000px] mx-auto lg:ml-0">
          <FabricationStats stats={data.stats} />
        </div>

        {/* Benefits (3 cols) + Packages (sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-9 lg:-mt-4">
            <FabricationBenefits benefits={data.benefits} />
          </div>
          <div className="lg:col-span-3 lg:-mt-20">
            <FabricationPackages packages={data.packages} />
          </div>
        </div>
        {/* Footer */}
        <div className="w-full mt-8 pb-4">
          <FabricationFooter footer={data.footer} />
        </div>
      </div>
    </div>
  );
};

export default FabricationPartnerPage;