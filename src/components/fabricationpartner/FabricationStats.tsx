import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (Icons as any)[name] || Icons.Star;
  return <Icon className={className} />;
};

interface FabricationStatsProps {
  stats?: any[];
}

const defaultStats = [
  {
    icon: "Users",
    value: "8,000+",
    label: "Visitor / Delegates",
    color: "#04777a"
  },
  {
    icon: "Globe",
    value: "1000+",
    label: "Global Buyers",
    color: "#707717"
  },
  {
    icon: "Calendar",
    value: "3",
    label: "Power-Packed\nDays",
    color: "#b37504"
  },
  {
    icon: "Briefcase",
    value: "Unlimited",
    label: "Business\nOpportunities",
    color: "#01366a"
  },
  {
    icon: "TrendingUp",
    value: "High",
    label: "Brand Visibility\n& Exposure",
    color: "#036975"
  },
];

const FabricationStats: React.FC<FabricationStatsProps> = ({ stats }) => {
  const statsList = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <div className="bg-white rounded-[20px] border border-[#E2E8F0] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-[16px_12px] md:p-[12px_20px] mx-auto max-w-[1200px]">
      <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-between gap-y-4 gap-x-2 md:gap-0">
        {statsList.map((stat, index) => (
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
                className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 shadow-md shrink-0"
                style={{ backgroundColor: stat.color }}
              >
                <IconRenderer name={stat.icon} className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-[18px] font-black text-[#0B2C66] leading-none mb-0.5">
                  {stat.value}
                </span>
                <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-tight leading-tight whitespace-pre-line">
                  {stat.label}
                </span>
              </div>
            </motion.div>
            {index < statsList.length - 1 && (
              <div className="hidden md:block w-[1px] h-[35px] bg-gray-100" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FabricationStats;