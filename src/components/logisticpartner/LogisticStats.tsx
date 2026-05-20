import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return <IconComponent className={className} />;
};

interface LogisticStatsProps {
  data?: any[];
}

const LogisticStats: React.FC<LogisticStatsProps> = ({ data }) => {
  const stats = data || [
    { icon: "Users", value: "8,000+", label: "Delegates &\nExhibitors Expected", color: "#6B46C1" },
    { icon: "Globe", value: "Multiple", label: "Exhibitor\nSegments", color: "#434190" },
    { icon: "Calendar", value: "3", label: "Power-Packed\nDays", color: "#D53F8C" },
    { icon: "Briefcase", value: "Unlimited", label: "Business\nOpportunities", color: "#3182CE" },
    { icon: "TrendingUp", value: "High", label: "Brand Visibility\n& Exposure", color: "#553C9A" }
  ];

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
                index === stats.length - 1 && stats.length % 2 !== 0 ? 'col-span-2 justify-center md:col-span-1 md:justify-start' : 'justify-center md:justify-start'
              }`}
            >
              <div 
                className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 shadow-md"
                style={{ backgroundColor: stat.color }}
              >
                {renderIcon(stat.icon, "w-5 h-5")}
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-black text-[#0B2C66] leading-none mb-0.5">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight leading-tight whitespace-pre-line">
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

export default LogisticStats;
