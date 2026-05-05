import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import lastBg from "../../assets/confrencetrack/last.png";

const ConferenceCTA: React.FC = () => {
  return (
    <section className="relative w-full py-8 overflow-hidden bg-[#0A1A31]">
      {/* Background Image - Full Width */}
      <div className="absolute inset-0 z-0">
        <img 
          src={lastBg} 
          alt="CTA Background" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A31] via-transparent to-[#0A1A31]/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Side: Leaf + Text */}
        <div className="flex items-center gap-6 lg:gap-12 flex-1">
          {/* Skeleton Leaf Icon */}
          <div className="hidden md:block flex-shrink-0">
            <svg width="70" height="90" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
              <path d="M50 110C50 110 90 70 90 40C90 10 70 10 50 10C30 10 10 10 10 40C10 70 50 110 50 110Z" stroke="#A3E635" strokeWidth="2" strokeDasharray="5 5" />
              <path d="M50 10V110" stroke="#A3E635" strokeWidth="1.5" />
              <path d="M20 35C20 35 35 45 50 45" stroke="#A3E635" strokeWidth="1" />
              <path d="M80 35C80 35 65 45 50 45" stroke="#A3E635" strokeWidth="1" />
              <path d="M25 65C25 65 40 75 50 75" stroke="#A3E635" strokeWidth="1" />
              <path d="M75 65C75 65 60 75 50 75" stroke="#A3E635" strokeWidth="1" />
            </svg>
          </div>

          <div className="text-left">
            <h2 className="text-[24px] md:text-[32px] font-[900] text-white leading-[1.1] tracking-tight uppercase">
              Be Part of the <span className="text-[#A3E635]">Conversation</span><br />
              That Shapes <span className="text-[#1E88E5]">Tomorrow</span>
            </h2>
            <p className="text-white/60 text-[13px] md:text-[14px] mt-2 font-medium max-w-[500px] leading-snug">
              Join India's most influential healthcare and wellness conference platform.
            </p>
          </div>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-4 bg-gradient-to-r from-[#4E9F3D] to-[#2E7D32] text-white rounded-full font-black text-[13px] uppercase tracking-wider flex items-center gap-3 shadow-[0_10px_20px_rgba(78,159,61,0.3)] border border-white/10"
          >
            BOOK YOUR DELEGATE PASS
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border-2 border-white/20 text-white rounded-full font-black text-[13px] uppercase tracking-wider flex items-center gap-3 backdrop-blur-md"
          >
            PARTNER WITH US
            <Users className="w-5 h-5 opacity-70" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ConferenceCTA;