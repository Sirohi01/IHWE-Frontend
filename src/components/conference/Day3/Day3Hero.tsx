import React from "react";
import { motion } from "framer-motion";
import { Download, ChevronRight, Home, Users, Share2, ShieldCheck, Globe, Zap } from "lucide-react";
import amanImage from "../../../assets/bhiya.png";

const Day3Hero: React.FC = () => {
  return (
    <section className="relative min-h-[750px] lg:min-h-[680px] flex items-center overflow-hidden font-sans">

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
      <div className="container mx-auto px-6 max-w-[1400px] relative z-20">
        <div className="max-w-[850px] relative left-[20px]">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[14px] text-[#5F6B7A] font-black mb-6">
            <Home className="w-4 h-4 text-[#4E9F3D]" />
            <ChevronRight className="w-4 h-4" />
            <span className="uppercase tracking-widest">Conference</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0B2C66] uppercase tracking-widest font-black bg-[#E6F3E6] px-3 py-1 rounded-full border border-[#4E9F3D]/20">Day 3</span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-5 py-1.5 bg-[#1A4D2E] text-white text-[13px] font-black rounded-full uppercase tracking-widest shadow-md">
              Day 3
            </span>
            <span className="px-5 py-1.5 bg-white text-[#0B2C66] text-[13px] font-black rounded-full uppercase tracking-widest border-2 border-[#0B2C66] shadow-sm">
              23 August 2026
            </span>
          </div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
            <h1 className="text-[20px] sm:text-[26px] md:text-[32px] lg:text-[36px] font-[900] leading-[1.05] tracking-tighter">
              <span className="text-[#0B2C66] block uppercase mb-0.5">Future Of</span>
              <span className="text-[#0B2C66] block uppercase">Preventive</span>
              <span className="text-[#4E9F3D] block uppercase">Healthcare Conference</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[13px] sm:text-[14px] md:text-[15px] text-[#5F6B7A] leading-[1.4] max-w-[550px] font-bold mb-6"
          >
            Strengthening prevention, public health & sustainability for a healthier planet.
          </motion.p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-x-6 gap-y-4 mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#4E9F3D] stroke-[2]" />
              <div className="flex flex-col">
                <span className="text-[12px] font-black text-[#0B2C66] leading-none uppercase">6 IMPACTFUL</span>
                <span className="text-[9px] font-bold text-[#4E9F3D] uppercase tracking-widest mt-0.5">SESSIONS</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-[#4E9F3D] stroke-[2]" />
              <div className="flex flex-col">
                <span className="text-[12px] font-black text-[#0B2C66] leading-none uppercase">GLOBAL</span>
                <span className="text-[9px] font-bold text-[#4E9F3D] uppercase tracking-widest mt-0.5">EXPERTS</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#4E9F3D] stroke-[2]" />
              <div className="flex flex-col">
                <span className="text-[12px] font-black text-[#0B2C66] leading-none uppercase">STRATEGIC</span>
                <span className="text-[9px] font-bold text-[#4E9F3D] uppercase tracking-widest mt-0.5">NETWORKING</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              className="px-8 py-3.5 rounded-full bg-[#1A4D2E] text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg hover:bg-[#0B2C66] group"
            >
              REGISTER FOR DAY 3
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
    </section>
  );
};

export default Day3Hero;
