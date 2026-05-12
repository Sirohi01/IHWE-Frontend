import React from 'react';
import { motion } from 'framer-motion';
import {
  Bed,
  Users,
  Megaphone,
  TrendingUp,
  Handshake,
  Star,
  UserCheck,
  Building2,
  UserPlus,
  CalendarDays,
  Globe,
  CreditCard,
  DoorOpen,
  Gift,
  Percent,
  Bus,
} from 'lucide-react';

const HotelBenefits: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Card 1: WHAT'S IN IT FOR YOUR HOTEL? */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-[#E2E8F0]"
      >
        <div className="bg-[#4E9F3D] px-[16px] py-[10px]">
          <h3 className="text-white font-[900] text-[11px] uppercase tracking-wide text-center">
            What's in it for your hotel?
          </h3>
        </div>
        <div className="p-[14px_16px] flex flex-col gap-[12px]">
          {[
            { icon: <Bed />, text: "Direct access to 8,000+ high-value delegates, speakers & exhibitors" },
            { icon: <Users />, text: "High occupancy & increased bookings during the event period" },
            { icon: <Megaphone />, text: "Premium brand visibility across IHWE 2026 platforms (website, app, social media, emails)" },
            { icon: <TrendingUp />, text: "Revenue boost through extended stays, group bookings & repeat guests" },
            { icon: <Handshake />, text: "Networking with global brands, associations & decision makers" },
            { icon: <Star />, text: "Association with a prestigious international health & wellness event" },
          ].map((item, i) => (
            <div key={i} className="flex gap-[12px] items-start">
              <div className="flex-shrink-0 w-[28px] h-[28px] rounded-full border border-[#4E9F3D] flex items-center justify-center text-[#4E9F3D]">
                {React.cloneElement(item.icon as React.ReactElement, { className: "w-[14px] h-[14px]" })}
              </div>
              <p className="text-[10px] font-bold text-[#2D3748] leading-[1.3] mt-1">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card 2: WHAT'S IN IT FOR IHWE 2026? */}
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
            { icon: <UserCheck />, text: "Trusted hospitality partner for our global delegates & guests" },
            { icon: <Building2 />, text: "Quality accommodation ensuring a seamless delegate experience" },
            { icon: <UserPlus />, text: "Strategic support in strengthening event success & reputation" },
            { icon: <CalendarDays />, text: "Long-term partnership for future editions & global collaborations" },
            { icon: <Star />, text: "Value-added stay experiences for our community" },
          ].map((item, i) => (
            <div key={i} className="flex gap-[12px] items-start">
              <div className="flex-shrink-0 w-[28px] h-[28px] rounded-full bg-[#0B2C66] text-white flex items-center justify-center">
                {React.cloneElement(item.icon as React.ReactElement, { className: "w-[14px] h-[14px]" })}
              </div>
              <p className="text-[10px] font-bold text-[#2D3748] leading-[1.3] mt-1">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card 3: PARTNER PERKS */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-[#E2E8F0]"
      >
        <div className="bg-[#1e3a24] px-[16px] py-[10px]">
          <h3 className="text-white font-[900] text-[11px] uppercase tracking-wide text-center">
            Partner Perks
          </h3>
        </div>
        <div className="relative p-[20px_10px]">
          <div className="absolute top-[50%] left-0 w-full h-[1px] bg-gray-100" />
          <div className="absolute top-0 left-[33.3%] w-[1px] h-full bg-gray-100" />
          <div className="absolute top-0 left-[66.6%] w-[1px] h-full bg-gray-100" />

          <div className="grid grid-cols-3 gap-y-10 relative z-10">
            {[
              { icon: <Globe />, label: "Logo Visibility on all IHWE 2026 platforms" },
              { icon: <CreditCard />, label: "Co-branded Room Key Cards" },
              { icon: <DoorOpen />, label: "In-room Branding" },
              { icon: <Gift />, label: "Welcome Kit Inclusion" },
              { icon: <Percent />, label: "Special Delegate Discounts" },
              { icon: <Bus />, label: "Shuttle Branding & Hospitality Lounge Access" },
            ].map((perk, i) => (
              <div key={i} className="flex flex-col items-center text-center px-1">
                <div className="w-[42px] h-[42px] rounded-full border border-[#4E9F3D] flex items-center justify-center text-[#4E9F3D] mb-2 bg-white">
                  {React.cloneElement(perk.icon as React.ReactElement, { className: "w-[20px] h-[20px]" })}
                </div>
                <p className="text-[8px] font-bold text-[#0B2C66] uppercase leading-tight max-w-[75px]">
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

export default HotelBenefits;
