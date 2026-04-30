
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mic } from "lucide-react";
import amanImage from "../../assets/aman2.png";
import arogyaLogo from "../../assets/arogyasangosti.png";

const ConferenceHero: React.FC = () => {
  const darkYellow = "#C9A227";
  return (
    <section className="relative min-h-[500px] lg:min-h-[450px] flex items-center overflow-hidden ">


      <div className="absolute inset-0 z-0">
        <img
          src={amanImage}
          alt="Conference Background"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-white/80 lg:bg-white/0" />
      </div>

      <div className="container mx-auto px-8 lg:px-16 relative z-20">
        <div className="max-w-[600px]">
          <div className="flex flex-col items-start gap-0 mb-1">
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.4em]" style={{ color: darkYellow }}>18th Edition Of</span>
              <div className="flex items-center gap-0">
                <div className="h-[1px] w-14" style={{ backgroundColor: darkYellow }}></div>
                <div className="w-2.5 h-2.5 rotate-45 border border-[#a67c00] bg-white -ml-1 relative z-10 shadow-sm"></div>
                <div className="h-[1px] w-14 -ml-1" style={{ backgroundColor: darkYellow }}></div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={arogyaLogo}
                alt="Arogyasangosti Logo"
                className="h-32 w-auto object-contain"
              />
            </motion.div>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-2  rounded-full bg-[#0B2C66] text-white text-[10px] font-bold tracking-[0.15em] mb-2 shadow-lg"
            style={{ marginTop: '45px' }}>
            <div className="w-2 h-2 rounded-full bg-[#4E9F3D] animate-pulse " />
            IHWE CONFERENCE 2026
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[36px] md:text-[42px] font-[900] text-[#0B2C66] mb-1 leading-[1.1] tracking-tight"
          >
            Learn. <span className="text-[#4E9F3D]"> &nbsp;Connect.</span> <span className="text-[#1E88E5]"> &nbsp;Lead</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[14px] text-[#5F6B7A] mb-3 leading-[1.5] font-normal max-w-[420px]"
          >
            3 Days of world-class conferences, expert panels, and thought
            leadership sessions shaping the future of healthcare.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-row gap-4"
          >
            <button className="px-6 py-2.5 rounded-full bg-[#4E9F3D] text-white font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#3D8B2D] transition-all shadow-md hover:shadow-lg group whitespace-nowrap">
              REGISTER FOR CONFERENCE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white text-[#0B2C66] font-bold text-[11px] uppercase tracking-widest border border-[#E6ECF3] flex items-center gap-2 hover:bg-[#F7F9FC] transition-all shadow-sm whitespace-nowrap">
              <Mic className="w-4 h-4 text-[#4E9F3D]" />
              BECOME A SPEAKER
            </button>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default ConferenceHero;