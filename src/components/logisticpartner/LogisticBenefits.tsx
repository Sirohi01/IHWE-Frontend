import React from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  Megaphone,
  Star,
  Users,
  Globe,
  Package,
  UserCheck,
  MapPin,
  Monitor,
  TrendingUp,
  Handshake,
  Award,
} from 'lucide-react';

const mainBenefits = [
  {
    title: "BRAND VISIBILITY",
    text: "Prominent logo placement across IHWE 2026 platforms, signage, and collaterals.",
    icon: <Megaphone className="w-6 h-6" />,
    color: "#0B2C66",
  },
  {
    title: "DIRECT BUSINESS ACCESS",
    text: "Receive contact details of all exhibitors for their logistics & shipping requirements.",
    icon: <UserCheck className="w-6 h-6" />,
    color: "#4E9F3D",
  },
  {
    title: "ON-SITE PRESENCE",
    text: "Branding at key logistical touchpoints inside the exhibition venue.",
    icon: <MapPin className="w-6 h-6" />,
    color: "#0B2C66",
  },
  {
    title: "OPERATIONAL SUPPORT",
    text: "Preferred partner for exhibitor logistics with advance communication & coordination.",
    icon: <Package className="w-6 h-6" />,
    color: "#4E9F3D",
  },
  {
    title: "DIGITAL PROMOTION",
    text: "Logo promotion on our website with a direct link to your website.",
    icon: <Monitor className="w-6 h-6" />,
    color: "#0B2C66",
  },
];

const additionalAdvantages = [
  { text: "Opportunity to be the exclusive logistics partner for exhibitors", icon: <Truck /> },
  { text: "Build trust as the go-to logistics expert", icon: <Award /> },
  { text: "Access to a network of industry leaders & businesses", icon: <Users /> },
  { text: "Opportunity to offer exclusive deals to exhibitors", icon: <TrendingUp /> },
  { text: "Year-round visibility through pre & post event promotions", icon: <Handshake /> },
];

const LogisticBenefits: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 w-full">


      {/* 5 Main Benefit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 ml-3">



        {mainBenefits.map((benefit, i) => (
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
                {benefit.icon}
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
        className="bg-white rounded-[15px] border border-[#E2E8F0] overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch ml-3"
      >


        {/* Sidebar Title */}
        <div className="bg-[#dddddd] p-[15px_20px] flex items-center justify-center min-w-[140px]">
          <h3 className="text-[#0B2C66] font-black text-[14px] uppercase tracking-wider text-center leading-tight">
            ADDITIONAL<br />ADVANTAGES
          </h3>
        </div>


        {/* Advantages List */}
        <div className="flex-1 p-[12px_20px] flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
          {additionalAdvantages.map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center text-center gap-2 flex-1 min-w-[100px] group">
                <div className="w-12 h-12 rounded-full bg-[#0B2C66] flex items-center justify-center text-white transition-all duration-300 shadow-md group-hover:scale-110">
                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
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
