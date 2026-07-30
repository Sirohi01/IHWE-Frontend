import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mic, ChevronRight, Home, Users, Share2 } from "lucide-react";
import arogyaLogo from "../../../assets/arogyasangosti.png";
import amanImage from "../../../assets/dayimagesarogyasangosti/design1.webp";

const Day1Hero: React.FC = () => {
  const darkYellow = "#C9A227";
  return (
    <section className="relative h-[420px] md:h-[500px] lg:h-[580px] w-full flex items-center overflow-hidden font-sans">

      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: `url(${amanImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top-left",
          backgroundRepeat: "no-repeat",
        }}
      >


      </div>

      {/* Content Container */}
      <div className="container mx-auto px-8 lg:px-16 relative z-20">
        <div className="max-w-[700px]">

          {/* Breadcrumbs - Extremely tight gap */}
          <div className="flex items-center gap-2 text-[14px] text-[#5F6B7A] font-black mb-6">
            <Home className="w-4 h-4 text-[#4E9F3D]" />
            <ChevronRight className="w-4 h-4" />
            <span className="uppercase tracking-widest">Conference</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0B2C66] uppercase tracking-widest font-black bg-[#E6F3E6] px-3 py-1 rounded-full border border-[#4E9F3D]/20">Day 1</span>
          </div>

          {/* Badges - Tight gap */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-5 py-1.5 bg-[#1A4D2E] text-white text-[13px] font-black rounded-full uppercase tracking-widest shadow-md">
              Day 1
            </span>
            <span className="px-5 py-1.5 bg-white text-[#0B2C66] text-[13px] font-black rounded-full uppercase tracking-widest border-2 border-[#0B2C66] shadow-sm">
              21 August 2026
            </span>
          </div>

          {/* Main Heading - Zero gap between lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[54px] font-semibold font-sans leading-tight tracking-tight">
              <span className="text-[#0B2C66] block">HEALTHCARE</span>
              <span className="text-[#4E9F3D] block">INNOVATION SUMMIT</span>
            </h1>
          </motion.div>

          {/* Description - Tight gap */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[13px] sm:text-[14px] md:text-[15px] text-[#5F6B7A] leading-[1.4] max-w-[480px] font-bold mb-6"
          >
            Advancing technology, infrastructure & innovation for future-ready healthcare systems.
          </motion.p>

          {/* Stats Row - Compact */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Users className="w-10 h-10 text-[#4E9F3D] stroke-[2]" />
              <div className="flex flex-col">
                <span className="text-[12px] font-black text-[#0B2C66] leading-none uppercase">6 POWER-PACKED</span>
                <span className="text-[9px] font-bold text-[#4E9F3D] uppercase tracking-widest mt-0.5">SESSIONS</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mic className="w-8 h-8 text-[#4E9F3D] stroke-[2]" />
              <div className="flex flex-col">
                <span className="text-[12px] font-black text-[#0B2C66] leading-none uppercase">WORLD-CLASS</span>
                <span className="text-[9px] font-bold text-[#4E9F3D] uppercase tracking-widest mt-0.5">SPEAKERS</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Share2 className="w-8 h-8 text-[#4E9F3D] stroke-[2]" />
              <div className="flex flex-col">
                <span className="text-[12px] font-black text-[#0B2C66] leading-none uppercase">UNMATCHED</span>
                <span className="text-[9px] font-bold text-[#4E9F3D] uppercase tracking-widest mt-0.5">NETWORKING</span>
              </div>
            </div>
          </div>

          {/* Buttons - High Density */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              className="px-8 py-3.5 rounded-full bg-[#1A4D2E] text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg hover:bg-[#0B2C66] group"
            >
              REGISTER FOR DAY 1
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
            <button
              className="px-8 py-3.5 rounded-full bg-white text-[#0B2C66] text-[11px] font-black uppercase tracking-widest border-2 border-[#0B2C66] flex items-center justify-center gap-3 transition-all hover:bg-gray-50 shadow-sm"
            >
              DOWNLOAD AGENDA
              <Download className="w-4 h-4 text-[#4E9F3D] stroke-[2.5]" />
            </button>
          </motion.div>

        </div>
      </div>
    </section >
  );
};

export default Day1Hero;
