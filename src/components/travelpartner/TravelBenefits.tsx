import React from 'react';
import { motion } from 'framer-motion';
import {
  Plane,
  Users2,
  Megaphone,
  Tag,
  Handshake,
  Star,
  Users,
  ShieldCheck,
  Zap,
  Globe,
  Ticket,
  UserCheck,
  Gift,
  Percent,
  Armchair,
} from 'lucide-react';

const TravelBenefits: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1: Your Company */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-[#E2E8F0]"
      >
        <div className="bg-[#4E9F3D] px-[16px] py-[10px]">
          <h3 className="text-white font-[900] text-[11px] uppercase tracking-wide text-center">
            What's in it for your company?
          </h3>
        </div>
        <div className="p-[14px_16px] flex flex-col gap-[12px]">
          {[
            { icon: <Plane className="w-[18px] h-[18px]" />, text: "Direct access to 8,000+ high-value delegates, speakers & exhibitors" },
            { icon: <Users2 className="w-[18px] h-[18px]" />, text: "Increased flight bookings during the event period" },
            { icon: <Megaphone className="w-[18px] h-[18px]" />, text: "Brand visibility across IHWE 2026 platforms (website, app, emails, social media)" },
            { icon: <Tag className="w-[18px] h-[18px]" />, text: "Promotion of exclusive travel offers to a global audience" },
            { icon: <Handshake className="w-[18px] h-[18px]" />, text: "Networking with global brands, associations & decision makers" },
            { icon: <Star className="w-[18px] h-[18px]" />, text: "Association with a prestigious international health & wellness event" },
          ].map((item, i) => (
            <div key={i} className="flex gap-[10px] items-start">
              <div className="flex-shrink-0 text-[#4E9F3D] mt-[1px]">{item.icon}</div>
              <p className="text-[11px] font-bold text-[#2D3748] leading-[1.4]">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card 2: For IHWE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-[#E2E8F0]"
      >
        <div className="bg-[#0B2C66] px-[16px] py-[10px]">
          <h3 className="text-white font-[900] text-[11px] uppercase tracking-wide text-center">
            What's in it for IHWE 2026?
          </h3>
        </div>
        <div className="p-[14px_16px] flex flex-col gap-[12px]">
          {[
            { icon: <Users className="w-[14px] h-[14px]" />, text: "Preferred travel options for delegates, speakers & exhibitors" },
            { icon: <Plane className="w-[14px] h-[14px]" />, text: "Competitive flight fares & seamless travel experience" },
            { icon: <ShieldCheck className="w-[14px] h-[14px]" />, text: "Reliable travel support ensuring smooth event participation" },
            { icon: <Zap className="w-[14px] h-[14px]" />, text: "Value-added services enhancing delegate satisfaction" },
            { icon: <Globe className="w-[14px] h-[14px]" />, text: "Strengthening global connectivity & participation in the event" },
          ].map((item, i) => (
            <div key={i} className="flex gap-[10px] items-start">
              <div className="flex-shrink-0 w-[28px] h-[28px] rounded-full bg-[#0B2C66] text-white flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-[11px] font-bold text-[#2D3748] leading-[1.4] pt-[5px]">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card 3: Partner Perks */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-[#E2E8F0]"
      >
        <div className="bg-[#4E9F3D] px-[16px] py-[10px]">
          <h3 className="text-white font-[900] text-[11px] uppercase tracking-wide text-center">
            Partner Perks
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-10 p-[14px_10px] items-center">
          {[
            { icon: <Globe className="w-7 h-7" />, label: "Logo Visibility on all IHWE 2026 platforms" },
            { icon: <Ticket className="w-7 h-7" />, label: "Co-branded Flight Offers" },
            { icon: <UserCheck className="w-7 h-7" />, label: "Priority Access for Delegates" },
            { icon: <Gift className="w-7 h-7" />, label: "Welcome Kit Inclusion" },
            { icon: <Percent className="w-7 h-7" />, label: "Special Delegate Discounts" },
            { icon: <Armchair className="w-7 h-7" />, label: "Lounge Branding Opportunities" },
          ].map((perk, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-[#4E9F3D] mb-[6px]">{perk.icon}</div>
              <p className="text-[8px] font-bold text-[#0B2C66] uppercase leading-tight max-w-[68px]">
                {perk.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TravelBenefits;