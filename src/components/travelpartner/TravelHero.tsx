import React from 'react';
import { motion } from 'framer-motion';
import { Users, Megaphone, Globe, Handshake, Award } from 'lucide-react';
import heroBg from '../../assets/image.png';

const TravelHero: React.FC = () => {
  return (
    <section
      className="relative h-[350px] bg-white bg-cover bg-top bg-no-repeat overflow-hidden flex flex-col"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Container for precise alignment based on the reference image */}
      <div className="relative z-10 mx-auto max-w-[1400px] w-full h-full px-6 md:px-12 flex flex-col justify-start pt-0 pb-10">

        {/* Top Header: Align Start Logo + Slogan */}
        <div className="flex items-start gap-4 w-full mb-0 pt-4 mt-[30px]">
          {/* Logo Section */}
          <div className="flex items-center gap-[15px]">
            <div className="w-[50px] h-[50px] flex-shrink-0">
              <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6C14 6 6 14 6 22C6 28 10 32 16 34L20 36L24 34C30 32 34 28 34 22C34 14 26 6 20 6Z" fill="#4E9F3D" opacity="0.3" />
                <path d="M20 8C16 10 10 16 10 22C10 27 13 30 17 32L20 33.5L23 32C27 30 30 27 30 22C30 16 24 10 20 8Z" fill="#4E9F3D" />
                <line x1="20" y1="8" x2="20" y2="34" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
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
        <div className="relative flex items-end justify-between flex-1 mt-0">
          {/* Left Text: Partner Details - FIXED (Not to be touched) */}
          <div className="flex flex-col items-start pb-4">
            <p className="text-[#0B2C66] font-black text-[22px] uppercase tracking-[1px] mb-0">
              Partner with us as a
            </p>
            <h2 className="text-[52px] font-[1000] leading-[0.8] tracking-tighter flex items-center gap-4">
              <span className="text-[#0B2C66]">TRAVEL</span>
              <span className="text-[#4E9F3D]">PARTNER</span>
            </h2>

            <div className="flex items-center gap-4 w-full max-w-[500px] my-1">
              <div className="h-[2px] flex-1 bg-gray-300" />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B2C66">
                <path d="M21 16L15 12L21 8V16ZM3 12L9 16V8L3 12Z" fill="#0B2C66" opacity="0.3" />
                <path d="M22 12L2 12" stroke="#0B2C66" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M12 4L9 12L12 20L15 12L12 4Z" fill="#0B2C66" />
              </svg>
              <div className="h-[2px] flex-1 bg-gray-300" />
            </div>

            <p className="text-[#0B2C66] text-[18px] font-bold leading-[1.4] max-w-[500px] opacity-90 mt-1">
              Be the preferred travel partner for a global community<br />
              of health &amp; wellness leaders, innovators &amp; changemakers.
            </p>
          </div>

          {/* Right Section: Why Partner Card - Shifted DOWN independently */}
          <div className="pr-[10px] relative min-w-[260px] h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-[105px] right-0 bg-[#0B2C66]/95 backdrop-blur-md rounded-[20px] p-[24px_22px] w-[260px] shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-white/10"
            >
              <h3 className="text-white font-black text-[17px] leading-tight mb-6 uppercase tracking-tight">
                Why Partner<br />
                With <span className="text-[#4E9F3D]">IHWE 2026?</span>
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  { text: "Access a premium, pre-qualified global audience", icon: <Users /> },
                  { text: "High visibility before, during & after the event", icon: <Megaphone /> },
                  { text: "Be part of a trusted global health & wellness movement", icon: <Globe /> },
                  { text: "Build long-term business relationships", icon: <Handshake /> },
                  { text: "Enhance brand credibility and leadership", icon: <Award /> },
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

export default TravelHero;