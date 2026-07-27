import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (Icons as any)[name] || Icons.Star;
  return <Icon className={className} />;
};

interface TravelBenefitsProps {
  benefits: any;
}

const TravelBenefits: React.FC<TravelBenefitsProps> = ({ benefits }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1: Your Company - Icons in white circles with green borders */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[20px] lg:ml-3 overflow-hidden shadow-sm border border-[#E2E8F0]"
      >
        <div className="bg-[#4E9F3D] px-[16px] py-[10px]">
          <h3 className="text-white font-[900] text-[11px] uppercase tracking-wide text-center whitespace-pre-line">
            {benefits?.companyCard?.title || "What's in it for your company?"}
          </h3>
        </div>
        <div className="p-[14px_16px] flex flex-col gap-[12px]">
          {(benefits?.companyCard?.items || []).map((item: any, i: number) => (
            <div key={i} className="flex gap-[12px] items-center">
              <div className="flex-shrink-0 w-[28px] h-[28px] rounded-full border border-[#4E9F3D] flex items-center justify-center text-[#4E9F3D]">
                <IconRenderer name={item.icon} className="w-[14px] h-[14px]" />
              </div>
              <p className="text-xs md:text-[10px] font-bold text-[#2D3748] leading-[1.3]">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card 2: For IHWE - White icons in solid blue circles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-[#E2E8F0]"
      >
        <div className="bg-[#0B2C66] px-[16px] py-[10px]">
          <h3 className="text-white font-[900] text-[11px] uppercase tracking-wide text-center whitespace-pre-line">
            {benefits?.ihweCard?.title || "What's in it for IHWE 2026?"}
          </h3>
        </div>
        <div className="p-[14px_16px] flex flex-col gap-[12px]">
          {(benefits?.ihweCard?.items || []).map((item: any, i: number) => (
            <div key={i} className="flex gap-[12px] items-center">
              <div className="flex-shrink-0 w-[28px] h-[28px] rounded-full bg-[#0B2C66] text-white flex items-center justify-center">
                <IconRenderer name={item.icon} className="w-[14px] h-[14px]" />
              </div>
              <p className="text-xs md:text-[10px] font-bold text-[#2D3748] leading-[1.3]">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card 3: Partner Perks - Grid with lines and bordered icons */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-[#E2E8F0]"
      >
        <div className="bg-[#4E9F3D] px-[16px] py-[10px]">
          <h3 className="text-white font-[900] text-[11px] uppercase tracking-wide text-center whitespace-pre-line">
            {benefits?.perksCard?.title || "Partner Perks"}
          </h3>
        </div>
        <div className="relative p-[20px_10px]">
          {/* Grid Lines */}
          <div className="absolute top-[50%] left-0 w-full h-[1px] bg-gray-100" />
          <div className="absolute top-0 left-[33.3%] w-[1px] h-full bg-gray-100" />
          <div className="absolute top-0 left-[66.6%] w-[1px] h-full bg-gray-100" />

          <div className="grid grid-cols-3 gap-y-10 relative z-10">
            {(benefits?.perksCard?.items || []).map((perk: any, i: number) => (
              <div key={i} className="flex flex-col items-center text-center px-1">
                <div className="w-[42px] h-[42px] rounded-full border border-[#4E9F3D] flex items-center justify-center text-[#4E9F3D] mb-2 bg-white">
                  <IconRenderer name={perk.icon} className="w-[20px] h-[20px]" />
                </div>
                <p className="text-[9px] md:text-[8px] font-bold text-[#0B2C66] uppercase leading-tight max-w-[85px] md:max-w-[75px] whitespace-pre-line">
                  {perk.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TravelBenefits;