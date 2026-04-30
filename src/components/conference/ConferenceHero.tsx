
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mic } from "lucide-react";
import amanImage from "../../assets/aman2.png";

const ConferenceHero: React.FC = () => {
  return (
    <section className="relative min-h-[500px] lg:min-h-[450px] flex items-center overflow-hidden ">

      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={amanImage}
          alt="Conference Background"
          className="w-full h-full object-cover"
        />
        {/* Subtle Overlay for readability */}
        <div className="absolute inset-0 bg-white/80 lg:bg-white/0" />
      </div>

      <div className="container mx-auto px-8 lg:px-16 relative z-20">
        <div className="max-w-[600px]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#0B2C66] text-white text-[10px] font-bold tracking-[0.15em] mb-10 shadow-lg"
          >
            <div className="w-2 h-2 rounded-full bg-[#4E9F3D] animate-pulse" />
            IHWE CONFERENCE 2026
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[36px] md:text-[54px] font-[900] text-[#0B2C66] mb-4 leading-[1.1] tracking-tight"
          >
            Learn. <span className="text-[#4E9F3D]">Connect.</span> <span className="text-[#1E88E5]">Lead.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[14px] text-[#5F6B7A] mb-6 leading-[1.5] font-normal max-w-[420px]"
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