import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import lastBg from "../../assets/confrencetrack/last.png";
import leafImg from "../../assets/dayimagesarogyasangosti/leaf.png";

import { Link } from "react-router-dom";

const ConferenceCTA: React.FC = () => {
  return (
    <section className="relative w-full py-3 overflow-hidden bg-[#0A1A31]">

      <div className="absolute inset-0 z-0">
        <img
          src={lastBg}
          alt="CTA Background"
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A31] via-transparent to-[#0A1A31]/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">

        <div className="flex items-center gap-6 lg:gap-12 flex-1">

          <div className="hidden md:block flex-shrink-0 w-[140px] relative h-10">
            <img
              src={leafImg}
              alt="Leaf Icon"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[160px] max-w-none w-auto object-contain opacity-100 drop-shadow-[0_0_20px_rgba(163,230,53,0.4)]"
            />
          </div>

          <div className="text-left">
            <h2 className="text-[20px] md:text-[24px] font-[900] text-white leading-tight tracking-tight capitalize">
              Be Part of the <span className="text-green">Conversation</span><br />
              That Shapes <span className="text-[#1E88E5]">Tomorrow</span>
            </h2>
            <p className="text-white/80 text-[14px] md:text-[16px] mt-3 font-medium max-w-[650px] leading-relaxed">
              Join India's most influential healthcare and wellness<br />conference platform.
            </p>
          </div>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/delegate-registration">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-3.5 bg-gradient-to-r from-[#4E9F3D] to-[#2E7D32] text-white rounded-full font-black text-[12px] uppercase tracking-wider flex items-center gap-2 shadow-[0_10px_20px_rgba(78,159,61,0.3)] border border-white/10"
            >
              BOOK YOUR DELEGATE PASS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 border-2 border-white/20 text-white rounded-full font-black text-[12px] uppercase tracking-wider flex items-center gap-2 backdrop-blur-md"
          >
            PARTNER WITH US
            <Users className="w-4 h-4 opacity-70" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ConferenceCTA;