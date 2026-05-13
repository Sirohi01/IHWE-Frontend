import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Calendar, Briefcase, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: <Users className="w-5 h-5" />,
    value: "8,000+",
    label: "Visitor / Delegates",
    color: "#04777a"
  },
  {
    icon: <Globe className="w-5 h-5" />,
    value: "1000+",
    label: "Global Buyers",
    color: "#707717"
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    value: "3",
    label: "Power-Packed\nDays",
    color: "#b37504"
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    value: "Unlimited",
    label: "Business\nOpportunities",
    color: "#01366a"
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    value: "High",
    label: "Brand Visibility\n& Exposure",
    color: "#036975"
  },
];

const FabricationStats = () => {
  return (
    <div className="bg-white rounded-[20px] border border-[#E2E8F0] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-[12px_20px] mx-auto max-w-[1200px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-[12px] px-4 group flex-1 justify-center md:justify-start"
                >
                  <div 
                    className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 shadow-md"
                    style={{ backgroundColor: stat.color }}
                  >
                    {stat.icon}
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
                  <div className="hidden md:block w-[1px] h-[35px] bg-gray-100" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
  )
}

export default FabricationStats