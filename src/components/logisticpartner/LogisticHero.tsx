import React from 'react';
import { motion } from 'framer-motion';
import { Users, Megaphone, Globe, Handshake, Award } from 'lucide-react';
import heroBg from '../../assets/logistic/nisu.webp';

const LogisticHero: React.FC = () => {
  return (
    <section
      className="relative h-[350px] bg-white bg-cover bg-top bg-no-repeat overflow-hidden flex flex-col"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="relative z-10 mx-auto max-w-[1400px] w-full h-full px-6 md:px-12 flex flex-col justify-start pt-0 pb-10">
        <div className="flex items-start gap-4 w-full mb-0 pt-4 mt-[30px]">

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


          <div className="w-[1px] h-[70px] bg-gray-200 hidden md:block" />


          <div className="hidden md:block">
            <p className="text-[#0B2C66] font-bold text-[20px] leading-[1.2] tracking-tight">
              Collaborate.<br />
              Connect.<br />
              <span className="text-[#4E9F3D]">Grow Together.</span>
            </p>
          </div>
        </div>


        <div className="relative flex items-end justify-between flex-1 mt-0">


          <div className="absolute left-[556px] -translate-x-1/2 top-4 z-20 flex items-start justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-[130px] h-[130px]  flex flex-col items-center justify-center text-center "
            >
              <p className="text-white font-black text-[16px] uppercase tracking-[2px] leading-none mb-[4px]">
                Official
              </p>
              <p className="pb-1 text-white font-[900] text-[16px] leading-none uppercase tracking-tight">
                Logistics
              </p>
              <p className="text-white font-[900] text-[16spx] leading-none uppercase tracking-tight mb-[14px]">
                Partner
              </p>

            </motion.div>
          </div>

          <div className="flex flex-col items-start pb-4">
            <p className="text-[#0B2C66] font-black text-[18px] uppercase tracking-[1px] mb-0">
              Partner with us as a
            </p>
            <h2 className="text-[46px] font-[1000] leading-[0.8] tracking-tighter flex items-center gap-4">
              <span className="text-[#0B2C66]">LOGISTICS</span>
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

            <p className="text-[#0B2C66] text-[14px] font-bold leading-[1.4] max-w-[500px] opacity-90 mt-1">
              Powering Smooth Connections. Delivering Success Together.<br />
              Be the preferred logistics partner for a global platform that unites health, wellness and innovation.
            </p>
          </div>



          <div className="pr-[10px] relative min-w-[260px] h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-[110px] left-[15px] right-0 bg-[#001D3D] backdrop-blur-md rounded-[15px] p-[14px_18px] w-[260px] shadow-[0_40px_80px_rgba(0,0,0,0.4)] border border-white/10"
            >
              <h3 className="text-white font-black text-[16px] leading-tight mb-1.5 uppercase tracking-tight">
                WHY PARTNER<br />
                WITH <span className="text-[#4E9F3D]">IHWE 2026?</span>
              </h3>

              <div className="w-[35px] h-[1.5px] bg-[#4E9F3D] mb-3" />

              <div className="flex flex-col">
                {[
                  { text: "Access 8,000+ exhibitors, buyers & decision makers", icon: <Users /> },
                  { text: "High visibility before, during & after the event", icon: <Megaphone /> },
                  { text: "Be part of a trusted global health & wellness platform", icon: <Globe /> },
                  { text: "Build strong partnerships & long-term relationships", icon: <Handshake /> },
                  { text: "Enhance brand credibility & market leadership", icon: <Award /> },
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <div className="flex gap-3 items-center group py-2">
                      <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] rounded-full flex-shrink-0 flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 border border-white/10">
                        {React.cloneElement(item.icon as React.ReactElement, { className: "w-[15px] h-[15px]" })}
                      </div>

                      <p className="text-white font-bold text-[9.2px] leading-tight tracking-tight">
                        {item.text}
                      </p>
                    </div>
                    {i < 4 && <div className="border-t border-dashed border-white/5 w-full" />}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>




        </div>
      </div>
    </section>
  );
};

export default LogisticHero;
