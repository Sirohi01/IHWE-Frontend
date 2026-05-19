import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Calendar, Briefcase, BarChart3 } from 'lucide-react';

const stats = [
  {
    icon: <Users className="w-5 h-5" />,
    value: "8,000+",
    label: "Delegates &\nExhibitors Expected",
    color: "#4E9F3D"
  },
  {
    icon: <Globe className="w-5 h-5" />,
    value: "50+",
    label: "Countries\nParticipating",
    color: "#4E9F3D"
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    value: "3",
    label: "Power-Packed\nDays",
    color: "#4E9F3D"
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    value: "Unlimited",
    label: "Business\nOpportunities",
    color: "#4E9F3D"
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    value: "High",
    label: "Brand Visibility\n& Exposure",
    color: "#4E9F3D"
  },
];

const HotelStats: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] border border-[#E2E8F0] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-[12px_20px] mx-auto max-w-[1200px]">
      <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-between gap-y-4 gap-x-2 md:gap-0">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-[12px] px-2 sm:px-4 group flex-1 justify-start ${
                index === 4 ? 'col-span-2 justify-center md:col-span-1 md:justify-start' : 'justify-center md:justify-start'
              }`}
            >
              <div 
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[#4E9F3D] border-2 border-[#4E9F3D]/20 transition-all duration-300 group-hover:scale-110 shadow-sm"
              >
                {React.cloneElement(stat.icon as React.ReactElement, { className: "w-4 h-4" })}
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-black text-[#0B2C66] leading-none mb-0.5">
                  {stat.value}
                </span>
                <span className="text-[8.5px] font-bold text-gray-500 uppercase tracking-tight leading-tight whitespace-pre-line">
                  {stat.label}
                </span>
              </div>
            </motion.div>
            {index < stats.length - 1 && (
              <div className="hidden md:block w-[1px] h-[35px] bg-gray-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HotelStats;
