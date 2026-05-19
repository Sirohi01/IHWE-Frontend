import React from 'react';
import { motion } from 'framer-motion';
import { Users, Megaphone, Globe, Handshake, Award } from 'lucide-react';
import heroBg from '../../assets/hotel/compressed_hotel.jpg.webp';

const HotelHero: React.FC = () => {
  return (
    <section
      className="relative min-h-[350px] lg:h-[350px] bg-white bg-cover bg-top bg-no-repeat overflow-hidden flex flex-col pb-6 lg:pb-0"
      style={{ backgroundImage: `url(${heroBg})` }}
    >

      <div className="relative z-10 mx-auto max-w-[1400px] w-full h-full px-4 sm:px-6 md:px-12 flex flex-col justify-start pt-0 pb-6 lg:pb-10">


        <div className="flex items-start gap-4 w-full mb-0 pt-4 mt-[20px]">

          <div className="flex items-center gap-[15px]">
            <div>
              <h1 className="text-[#0B2C66] font-black text-[16px] leading-[1.1] uppercase">
                International<br />
                <span className="text-[#4E9F3D]">Health &amp; Wellness</span><br />
                Expo 2026
              </h1>
              <span className="bg-[#0B2C66] text-white text-[8px] px-[6px] py-[1px] rounded font-bold mt-0.5 inline-block uppercase tracking-widest">
                Global Edition
              </span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-[70px] bg-gray-200 hidden md:block" />

          {/* Top Slogan */}
          <div className="hidden md:block">
            <p className="text-[#0B2C66] font-bold text-[20px] leading-[1.2] tracking-tight">
              Collaborate.<br />
              Connect.<br />
              <span className="text-[#4E9F3D]">Grow Together.</span>
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative flex flex-col lg:flex-row items-stretch lg:items-end justify-between flex-1 mt-0">

          {/* ===== CENTER: OFFICIAL HOTEL PARTNER Badge ===== */}
          <div className="hidden md:flex absolute left-[660px] -translate-x-1/2 -top-2 z-20 items-start justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-[130px] h-[130px]  flex flex-col items-center justify-center text-center "
            >
              <p className="text-white font-black text-[14px] uppercase tracking-[2px] leading-none mb-[4px]">
                Official
              </p>
              <p className="pb-1 text-white font-[900] text-[14px] leading-none uppercase tracking-tight">
                Hotel
              </p>
              <p className="text-white font-[900] text-[14px] leading-none uppercase tracking-tight mb-[14px]">
                Partner
              </p>

            </motion.div>
          </div>
          {/* Left Text: Partner Details */}
          <div className="flex flex-col items-start pt-4">
            <p className="text-[#0B2C66] font-black text-[14px] sm:text-[18px] lg:text-[20px] uppercase tracking-[1px] mb-0">
              Partner with us as a
            </p>
            <h2 className="text-[26px] sm:text-[36px] lg:text-[45px] font-[1000] leading-[1] lg:leading-[0.85] tracking-tighter">
              <span className="text-[#0B2C66] pb-4">HOTEL & STAY <span className="text-[#4E9F3D] ">PARTNER</span></span><br />
              <div className="mt-2"> </div>
            </h2>

            {/* Gradient Fading Divider Lines */}
            <div className="flex items-center gap-4 w-full max-w-[500px] my-1">
              <div className="h-[1.5px] flex-1 bg-gradient-to-l from-gray-300 to-transparent" />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B2C66">
                <path d="M21 16L15 12L21 8V16ZM3 12L9 16V8L3 12Z" fill="#0B2C66" opacity="0.3" />
                <path d="M22 12L2 12" stroke="#0B2C66" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M12 4L9 12L12 20L15 12L12 4Z" fill="#0B2C66" />
              </svg>
              <div className="h-[1.5px] flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
            </div>

            <p className="text-[#0B2C66] text-[13px] sm:text-[16px] lg:text-[18px] font-bold leading-[1.4] max-w-[500px] opacity-90 mt-1">
              Be the preferred stay for a global community of<br />
              health & wellness leaders, innovators & changemakers.
            </p>
          </div>

          {/* Right Section: Why Partner Card */}
          <div className="pr-[10px] relative w-full lg:w-auto lg:min-w-[260px] lg:h-full flex justify-center lg:block mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative lg:absolute lg:-top-[105px] lg:left-[15px] lg:right-0 bg-[#0B2C66]/95 backdrop-blur-md rounded-[20px] p-[24px_22px] w-full max-w-[320px] lg:w-[260px] shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-white/10"
            >
              <h3 className="text-white font-black text-[17px] leading-tight mb-6 uppercase tracking-tight">
                Why Partner<br />
                With <span className="text-[#4E9F3D]">IHWE 2026?</span>
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  { text: "Direct access to a premium, pre-qualified audience", icon: <Users /> },
                  { text: "High visibility before, during & after the event", icon: <Megaphone /> },
                  { text: "Be part of a trusted global health & wellness movement", icon: <Globe /> },
                  { text: "Build long-term business relationships", icon: <Handshake /> },
                  { text: "Enhance brand credibility and market leadership", icon: <Award /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-[28px] h-[28px] bg-[#4E9F3D] rounded-full flex-shrink-0 flex items-center justify-center text-white shadow-md">
                      {React.cloneElement(item.icon as React.ReactElement, { className: "w-[14px] h-[14px]" })}
                    </div>
                    <p className="text-white font-bold text-[9.5px] leading-tight opacity-90">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelHero;