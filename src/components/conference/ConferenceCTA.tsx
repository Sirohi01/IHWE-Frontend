import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import lastBg from "../../assets/confrencetrack/last.png";
import leafImg from "../../assets/dayimagesarogyasangosti/leaf.png";
import { Link } from "react-router-dom";

const ConferenceCTA: React.FC = () => {
  return (
    <section className="relative w-full py-1 overflow-hidden bg-[#0A1A31]">
      {/* Background */}
      <Link to="/travel-partner" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0 block cursor-pointer">
        <img loading="lazy" decoding="async" src={lastBg}
          alt="CTA Background"
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A31] via-[#0A1A31]/40 to-[#0A1A31]" />
      </Link>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 flex flex-col md:flex-row items-center justify-center md:justify-between min-h-[100px] md:min-h-[68px] py-4 md:py-0 gap-4">

        {/* Left Side */}
        <div className="flex flex-col md:flex-row items-center gap-4 flex-1 min-w-0 text-center md:text-left">

          {/* Bigger Leaf Image + More Height */}
          <Link to="/travel-partner" target="_blank" rel="noopener noreferrer" className="hidden md:block flex-shrink-0 w-[125px] relative h-[24px] cursor-pointer">
            <img loading="lazy" decoding="async" src={leafImg}
              alt="Leaf Icon"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[180px] w-auto object-contain opacity-100 drop-shadow-[0_0_18px_rgba(163,230,53,0.35)]"
            />
          </Link>

          {/* Text Content */}
          <div className="min-w-0">
            <h2 className="text-[14px] md:text-[18px] font-[900] text-white leading-tight tracking-tight whitespace-nowrap">
              Be Part of the <span className="text-[#4E9F3D]">Conversation</span> That Shapes{" "}
              <span className="text-[#1E88E5]">Tomorrow</span>
            </h2>

            <p className="text-white/75 text-[11px] md:text-[12px] font-medium whitespace-normal md:whitespace-nowrap">
              Join India's most influential healthcare and wellness conference platform.
            </p>
          </div>
        </div>

        {/* Right Side Button - Thinner */}
        <div className="flex-shrink-0 md:ml-4">
          <Link to="/delegate-registration" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group px-5 md:px-6 py-1.5 bg-gradient-to-r from-[#4E9F3D] to-[#2E7D32] text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase tracking-wide flex items-center gap-1.5 shadow-md whitespace-nowrap"
            >
              REGISTER AS DELEGATE
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConferenceCTA;