// components/conference/ConferenceCTA.tsx
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Users } from "lucide-react";
import ramBg from "../../assets/ram.png";

const ConferenceCTA: React.FC = () => {
  return (
    <section className="py-6 relative overflow-hidden bg-black">
      {/* Background Image with Neutral Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ramBg})` }}
      />
      {/* Removed overlay to show image clearly */}

      {/* Green leaf graphic bottom-left - RESTORED */}
      <div className="absolute bottom-0 left-0 opacity-40 pointer-events-none">
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
            <h2 className="text-[20px] md:text-[24px] font-black text-white leading-[1.2] mb-2">
              Be Part of the <span className="text-[#4ADE80]">Conversation</span>
              <br />
              That Shapes <span className="text-[#4E9F3D]">Tomorrow</span>
            </h2>
            <p className="text-[14px] text-white/80 font-medium max-w-xl">
              Join India's most influential healthcare and wellness conference
              platform.
            </p>
          </div>


          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button className="px-6 py-2.5 rounded-full bg-[#4ADE80] text-[#1a3a32] font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all group">
              BOOK YOUR DELEGATE PASS
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-6 py-2.5 rounded-full border border-white/30 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              PARTNER WITH US
              <Users className="w-3.5 h-3.5 text-[#4ADE80]" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConferenceCTA;