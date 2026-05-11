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
      <div className="absolute inset-0 z-0">
        <img
          src={lastBg}
          alt="CTA Background"
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A31] via-[#0A1A31]/40 to-[#0A1A31]" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto max-w-[1400px] w-full pl-6 lg:pl-2 pr-6 flex flex-row items-center justify-between min-h-[68px]">

        {/* Left Side */}
        <div className="flex items-center gap-4 flex-1 min-w-0">

          {/* Bigger Leaf Image + More Height */}
          <div className="hidden md:block flex-shrink-0 w-[125px] relative h-[24px]">
            <img
              src={leafImg}
              alt="Leaf Icon"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[180px] w-auto object-contain opacity-100 drop-shadow-[0_0_18px_rgba(163,230,53,0.35)]"
            />
          </div>

          {/* Text Content */}
          <div className="min-w-0">
            <h2 className="text-[14px] md:text-[18px] font-[900] text-white leading-tight tracking-tight whitespace-nowrap">
              Be Part of the <span className="text-[#4E9F3D]">Conversation</span> That Shapes{" "}
              <span className="text-[#1E88E5]">Tomorrow</span>
            </h2>

            <p className="text-white/75 text-[10px] md:text-[12px] font-medium whitespace-nowrap">
              Join India's most influential healthcare and wellness conference platform.
            </p>
          </div>
        </div>

        {/* Right Side Button - Thinner */}
        <div className="flex-shrink-0 ml-4">
          <Link to="/delegate-registration">
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