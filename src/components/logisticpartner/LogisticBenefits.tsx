import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return <IconComponent className={className} />;
};

interface LogisticBenefitsProps {
  data?: any;
}

const LogisticBenefits: React.FC<LogisticBenefitsProps> = ({ data }) => {
  const mainBenefits = data?.main || [
    { title: "BRAND VISIBILITY", text: "Prominent logo placement across IHWE 2026 platforms, signage, and collaterals.", icon: "Megaphone", color: "#0B2C66" },
    { title: "DIRECT BUSINESS ACCESS", text: "Receive contact details of all exhibitors for their logistics & shipping requirements.", icon: "UserCheck", color: "#4E9F3D" },
    { title: "ON-SITE PRESENCE", text: "Branding at key logistical touchpoints inside the exhibition venue.", icon: "MapPin", color: "#0B2C66" },
    { title: "OPERATIONAL SUPPORT", text: "Preferred partner for exhibitor logistics with advance communication & coordination.", icon: "Package", color: "#4E9F3D" },
    { title: "DIGITAL PROMOTION", text: "Logo promotion on our website with a direct link to your website.", icon: "Monitor", color: "#0B2C66" }
  ];

  const additionalTitle = data?.additionalTitle || "ADDITIONAL\nADVANTAGES";
  const additionalAdvantages = data?.additional || [
    { text: "Opportunity to be the exclusive logistics partner for exhibitors", icon: "Truck" },
    { text: "Build trust as the go-to logistics expert", icon: "Award" },
    { text: "Access to a network of industry leaders & businesses", icon: "Users" },
    { text: "Opportunity to offer exclusive deals to exhibitors", icon: "TrendingUp" },
    { text: "Year-round visibility through pre & post event promotions", icon: "Handshake" },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">


      {/* Main Benefit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 lg:ml-3">



        {mainBenefits.map((benefit: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[12px] border border-[#E2E8F0] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Colored Header */}
            <div
              className="w-full py-2 px-3 text-center"
              style={{ backgroundColor: benefit.color }}
            >
              <h4 className="text-white text-[11px] font-black uppercase tracking-tight">
                {benefit.title}
              </h4>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col items-center flex-1">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-3 shadow-sm"
                style={{ backgroundColor: benefit.color }}
              >
                {renderIcon(benefit.icon, "w-6 h-6")}
              </div>
              <p className="text-[11px] font-bold text-[#4A5568] leading-snug text-center">
                {benefit.text}
              </p>

            </div>
          </motion.div>
        ))}
      </div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[15px] border border-[#E2E8F0] overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch lg:ml-3"
      >


        {/* Sidebar Title */}
        <div className="bg-[#dddddd] p-[15px_20px] flex items-center justify-center min-w-[140px]">
          <h3 className="text-[#0B2C66] font-black text-[14px] uppercase tracking-wider text-center leading-tight whitespace-pre-line">
            {additionalTitle}
          </h3>
        </div>


        {/* Advantages List */}
        <div className="flex-1 p-[16px_12px] md:p-[12px_20px] grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row md:flex-nowrap items-center justify-between gap-4">
          {additionalAdvantages.map((item: any, i: number) => (
            <React.Fragment key={i}>
              <div className={`flex flex-col items-center text-center gap-2 flex-1 min-w-[100px] group ${i === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0B2C66] flex items-center justify-center text-white transition-all duration-300 shadow-md group-hover:scale-110 shrink-0">
                  {renderIcon(item.icon, "w-5 h-5 md:w-6 md:h-6")}
                </div>


                <p className="text-[10px] font-bold text-[#4A5568] leading-snug text-center">
                  {item.text}
                </p>
              </div>

              {i < additionalAdvantages.length - 1 && (
                <div className="hidden lg:block w-[1px] h-[40px] bg-gray-200 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LogisticBenefits;
