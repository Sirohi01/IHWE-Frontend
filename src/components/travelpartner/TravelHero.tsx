import React from 'react';
import { motion } from 'framer-motion';
import { Users, Megaphone, Globe, Handshake, Award } from 'lucide-react';
import heroBg from '../../assets/travels/newherologo.webp';

const TravelHero: React.FC = () => {
  return (
    <section
      className="relative min-h-[350px] lg:h-[350px] bg-white bg-cover bg-top bg-no-repeat overflow-hidden flex flex-col pb-6 lg:pb-0"
      style={{ backgroundImage: `url(${heroBg})` }}
    >

      <div className="relative z-10 mx-auto max-w-[1400px] w-full h-full px-4 sm:px-6 md:px-12 flex flex-col justify-start pt-0 pb-6 lg:pb-10">


        <div className="flex items-start gap-4 w-full mb-0 pt-4 mt-[20px] lg:mt-[30px]">

          <div className="flex items-center gap-[15px]">
            {/* <div className="w-[50px] h-[50px] flex-shrink-0">
              <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6C14 6 6 14 6 22C6 28 10 32 16 34L20 36L24 34C30 32 34 28 34 22C34 14 26 6 20 6Z" fill="#4E9F3D" opacity="0.3" />
                <path d="M20 8C16 10 10 16 10 22C10 27 13 30 17 32L20 33.5L23 32C27 30 30 27 30 22C30 16 24 10 20 8Z" fill="#4E9F3D" />
                <line x1="20" y1="8" x2="20" y2="34" stroke="white" strokeWidth="1.5" />
              </svg>
            </div> */}
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


          <div className="w-[1px] h-[70px] bg-gray-200 hidden md:block" />


          <div className="hidden md:block">
            <p className="text-[#0B2C66] font-bold text-[20px] leading-[1.2] tracking-tight">
              Collaborate.<br />
              Connect.<br />
              <span className="text-[#4E9F3D]">Grow Together.</span>
            </p>
          </div>
        </div>


        <div className="relative flex flex-col lg:flex-row items-stretch lg:items-end justify-between flex-1 mt-0">


          <div className="hidden md:flex absolute left-[596px] -translate-x-1/2 top-0 z-20 items-start justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-[130px] h-[130px]  flex flex-col items-center justify-center text-center "
            >
              <p className="text-white font-black text-[20px] uppercase tracking-[2px] leading-none mb-[4px]">
                Official
              </p>
              <p className="pb-1 text-white font-[900] text-[21px] leading-none uppercase tracking-tight">
                Travel
              </p>
              <p className="text-white font-[900] text-[21px] leading-none uppercase tracking-tight mb-[14px]">
                Partner
              </p>

            </motion.div>
          </div>

          <div className="flex flex-col items-start pb-4">
            <p className="text-[#0B2C66] font-black text-[14px] sm:text-[18px] lg:text-[22px] uppercase tracking-[1px] mb-0">
              Partner with us as a
            </p>
            <h2 className="text-[26px] sm:text-[38px] lg:text-[52px] font-[1000] leading-[1] lg:leading-[0.8] tracking-tighter flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-[#0B2C66]">TRAVEL</span>
              <span className="text-[#4E9F3D]">PARTNER</span>
            </h2>


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
              Be the preferred travel partner for a global community<br />
              of health &amp; wellness leaders, innovators &amp; changemakers.
            </p>
          </div>


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