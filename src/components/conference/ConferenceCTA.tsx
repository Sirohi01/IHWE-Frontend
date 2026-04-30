// components/conference/ConferenceCTA.tsx
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Users } from "lucide-react";

const ConferenceCTA: React.FC = () => {
  return (
    <section className="py-16 bg-[#1a3a32] relative overflow-hidden">
      {/* Decorative SVG background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg viewBox="0 0 1200 400" className="w-full h-full">
          <path
            d="M-100,200 Q200,50 500,200 T1100,200"
            fill="none"
            stroke="#4ADE80"
            strokeWidth="1.5"
          />
          <path
            d="M-100,260 Q200,110 500,260 T1100,260"
            fill="none"
            stroke="#4ADE80"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Leaf/logo graphic bottom-left */}
      <div className="absolute bottom-0 left-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-[180px] h-[180px]">
          <path
            d="M20,180 Q80,20 180,10 Q160,100 20,180Z"
            fill="#4ADE80"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 max-w-[1320px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Left text */}
          <div className="text-center lg:text-left">
            <h2 className="text-[40px] md:text-[46px] font-black text-white leading-[1.15] mb-3">
              Be Part of the{" "}
              <span className="text-[#4ADE80]">Conversation</span>
              <br />
              That Shapes{" "}
              <span className="text-[#86EFAC]">Tomorrow</span>
            </h2>
            <p className="text-[15px] text-white/50 font-medium">
              Join India's most influential healthcare and wellness conference
              platform.
            </p>
          </div>

          {/* Right buttons */}
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <button className="px-8 py-4 rounded-full bg-[#4ADE80] text-[#1a3a32] font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all shadow-2xl shadow-green-900/40 group">
              BOOK YOUR DELEGATE PASS
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full border border-[#4ADE80]/30 text-white font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#4ADE80]/10 transition-all">
              PARTNER WITH US
              <Users className="w-4 h-4 text-[#4ADE80]" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConferenceCTA;