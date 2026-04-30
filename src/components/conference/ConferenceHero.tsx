// components/conference/ConferenceHero.tsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mic } from "lucide-react";

const ConferenceHero: React.FC = () => {
  return (
    <section className="relative min-h-[700px] lg:min-h-[780px] flex items-center overflow-hidden bg-white">
      {/* Right diagonal image section */}
      <div
        className="absolute top-0 right-0 w-full lg:w-[62%] h-full z-10 hidden lg:block"
        style={{
          clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)",
          background:
            "linear-gradient(rgba(0,0,0,0.22), rgba(0,0,0,0.22)), url('https://images.unsplash.com/photo-1540575861501-7ce0e220ade1?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* IHWE Conference 2026 dark overlay card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="absolute top-[16%] left-[22%] bg-[#024339]/90 backdrop-blur-sm px-7 py-5 rounded-[22px] border border-white/10 shadow-2xl z-20 text-center text-white min-w-[160px]"
        >
          <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-1.5 opacity-60">
            IHWE
          </p>
          <h4 className="text-[13px] font-black leading-tight uppercase tracking-widest">
            CONFERENCE
            <br />
            2026
          </h4>
        </motion.div>

        {/* Building a Healthier Future card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="absolute top-[18%] right-[6%] bg-white px-5 py-4 rounded-[18px] shadow-2xl z-40 text-center border border-[#E6ECF3] max-w-[180px]"
        >
          <h4 className="text-[14px] font-black text-[#024339] leading-snug">
            Building a<br />
            Healthier Future
            <br />
            Together
          </h4>
        </motion.div>

        {/* Conference photo card bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="absolute bottom-[8%] right-[4%] z-30"
        >
          <div className="bg-white p-2.5 rounded-[32px] shadow-2xl overflow-hidden border border-[#E6ECF3]">
            <img
              src="https://images.unsplash.com/photo-1475721027187-4001777ce123?auto=format&fit=crop&q=80"
              alt="Conference"
              className="w-[360px] h-[220px] object-cover rounded-[24px]"
            />
          </div>
        </motion.div>
      </div>

      {/* Left text content */}
      <div className="container mx-auto px-8 lg:px-12 relative z-20">
        <div className="max-w-[520px]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0B2C66] text-white text-[10px] font-bold tracking-[0.12em] mb-7 shadow-lg"
          >
            <div className="w-2 h-2 rounded-full bg-[#4E9F3D] animate-pulse" />
            IHWE CONFERENCE 2026
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[58px] md:text-[68px] font-[800] text-[#0B2C66] mb-6 leading-[1.08]"
          >
            Learn.{" "}
            <span className="text-[#4E9F3D]">Connect.</span>{" "}
            <span className="text-[#1E88E5]">Lead.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[15px] text-[#5F6B7A] mb-9 leading-[1.7] font-normal max-w-[440px]"
          >
            3 Days of world-class conferences, expert panels, and thought
            leadership sessions shaping the future of healthcare, wellness,
            medical innovation, and preventive health.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <button className="px-8 py-3.5 rounded-full bg-[#1C2B3A] text-white font-bold text-[13px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#0B2C66] transition-all shadow-lg group">
              REGISTER FOR CONFERENCE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3.5 rounded-full bg-white text-[#0B2C66] font-bold text-[13px] uppercase tracking-widest border-2 border-[#E6ECF3] flex items-center gap-3 hover:bg-[#F7F9FC] transition-all shadow-md">
              <Mic className="w-4 h-4 text-[#4E9F3D]" />
              BECOME A SPEAKER
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-50">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="relative block w-full h-[80px] fill-white"
        >
          <path d="M0,0 C150,60 450,80 600,80 C750,80 1050,60 1200,0 L1200,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
};

export default ConferenceHero;