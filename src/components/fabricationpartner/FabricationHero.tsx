import React from 'react';
import { motion } from 'framer-motion';
import { Users, Megaphone, Globe, Handshake, Award } from 'lucide-react';
import heroBg from '../../assets/fabrication.png';

const FabricationHero = () => {
  return (
    <>
      {/* DESKTOP VIEW - Visible only on Desktop (>= md) */}
      <section
        className="hidden md:flex relative h-[450px] bg-white bg-cover bg-top bg-no-repeat overflow-hidden flex-col"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="relative z-10 mx-auto max-w-[1400px] w-full h-full px-6 md:px-12 flex flex-col justify-start pt-0 pb-10">
          <div className="flex items-start gap-4 w-full mb-0 pt-4 mt-[30px]">
            <div className="flex items-center gap-[15px] ">
              <div>
                <h1 className="text-[#071b3b] font-black text-[20px] md:text-[30px] uppercase leading-[1.1]">
                  International<br />
                  <span className="text-[#0f6a72]">Health & Wellness</span><br />
                  Expo 2026
                </h1>
                <span className="inline-block mt-2 bg-[#071b3b] text-white text-[10px] px-3 py-1 rounded-full font-bold tracking-[2px] uppercase">
                  Global Edition
                </span>
              </div>
            </div>

            <div className="w-[1px] h-[60px] bg-gray-200 hidden md:block " />

            <div className="hidden md:block ">
              <p className="text-[#071b3b] font-bold text-[20px] leading-[1.5] tracking-tight">
                Collaborate.<br />
                <span className="text-[#d59b18]">Connect.</span><br />
                <span className="text-[#4E9F3D]">Grow Together.</span>
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between flex-1 mt-4">
            <div className="max-w-[720px]">
              <p className="uppercase tracking-[3px] text-[#071b3b] text-[16px] font-bold mb-2">
                Partner With Us As A
              </p>
              <h2 className="text-[28px] md:text-[46px] leading-[0.95] font-black uppercase tracking-[-3px] text-[#041735]">
                Stall Designer &<br />
                <span className="text-[#0b6871]">Fabrication Partner</span>
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

              <p className="text-[#041735] text-[18px] leading-[1.4] max-w-[500px] opacity-90 mt-1">
                Be the preferred travel partner for a global community<br />
                of health &amp; wellness leaders, innovators &amp; changemakers.
              </p>
            </div>

            <div className="-mt-[100px] pr-[10px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#01122c]/95 backdrop-blur-md rounded-[20px] p-[24px_22px] w-[260px] shadow-[0_40px_80px_rgba(0,0,0,0.3)] relative overflow-hidden border border-white/10"
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

      {/* MOBILE VIEW - Visible only on Mobile (< md) */}
      <section
        className="relative md:hidden bg-white bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col py-6 px-4"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(7, 27, 59, 0.93), rgba(7, 27, 59, 0.98)), url(${heroBg})` }}
      >
        <div className="relative z-10 w-full flex flex-col gap-6">
          {/* Top Header Row */}
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-white font-black text-[14px] leading-[1.1] uppercase">
                International<br />
                <span className="text-[#0f6a72]">Health &amp; Wellness</span><br />
                Expo 2026
              </h1>
              <span className="bg-[#0f6a72] text-white text-[7px] px-[5px] py-[0.5px] rounded font-bold mt-0.5 inline-block uppercase tracking-wider">
                Global Edition
              </span>
            </div>

            {/* Official Fabrication Partner Badge - Mobile Styled */}
            <div className="border border-[#0f6a72]/50 bg-white/10 backdrop-blur-md rounded-lg p-2 text-center flex flex-col items-center justify-center shrink-0">
              <p className="text-white font-bold text-[10px] uppercase tracking-[1px] leading-none mb-1">
                Official
              </p>
              <p className="text-white font-extrabold text-[11px] leading-none uppercase tracking-tight">
                Fabrication
              </p>
              <p className="text-[#0f6a72] font-extrabold text-[11px] leading-none uppercase tracking-tight mt-0.5">
                Partner
              </p>
            </div>
          </div>

          {/* Hero Title & Subtitle */}
          <div className="flex flex-col items-start mt-2">
            <p className="text-white/80 font-bold text-xs uppercase tracking-[1px] mb-1">
              Partner with us as a
            </p>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight text-white uppercase">
              Stall Designer & <span className="text-[#0f6a72]">Fabrication Partner</span>
            </h2>

            <div className="h-[2px] w-24 bg-[#0f6a72] my-3 rounded-full" />

            <p className="text-white/90 text-sm font-semibold leading-relaxed max-w-[450px]">
              Be the preferred travel partner for a global community of health &amp; wellness leaders, innovators &amp; changemakers.
            </p>
          </div>

          {/* Why Partner Card - Mobile Styled */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 mt-2 border border-white/10 shadow-lg">
            <h3 className="text-white font-black text-[16px] leading-tight mb-4 uppercase tracking-tight">
              Why Partner With <span className="text-[#0f6a72]">IHWE 2026?</span>
            </h3>

            <div className="flex flex-col gap-3.5">
              {[
                { text: "Access a premium, pre-qualified global audience", icon: <Users /> },
                { text: "High visibility before, during & after the event", icon: <Megaphone /> },
                { text: "Be part of a trusted global health & wellness movement", icon: <Globe /> },
                { text: "Build long-term business relationships", icon: <Handshake /> },
                { text: "Enhance brand credibility and leadership", icon: <Award /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="w-[26px] h-[26px] bg-[#4E9F3D] rounded-full flex-shrink-0 flex items-center justify-center text-white shadow-sm">
                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-[12px] h-[12px]" })}
                  </div>
                  <p className="text-white/90 font-bold text-[11px] sm:text-xs leading-snug">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FabricationHero;