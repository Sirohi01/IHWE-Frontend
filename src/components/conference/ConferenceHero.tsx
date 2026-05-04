
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mic } from "lucide-react";
import amanImage from "../../assets/bhiya.png";
import arogyaLogo from "../../assets/arogyasangosti.png";

const ConferenceHero: React.FC = () => {
  const darkYellow = "#C9A227";
  return (
    <section className="relative min-h-[750px] lg:min-h-[650px] flex items-center overflow-hidden ">


      <div
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: `url(${amanImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top-left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/75 lg:bg-white/10" />
      </div>

      <div className="container mx-auto px-8 lg:px-16 relative z-20">
        <div className="max-w-[600px]">
          <div className="flex flex-col items-start gap-0 mb-1">
            <div className="flex items-center gap-1">
              <span className="text-[14px] font-bold  uppercase tracking-[0.4em]" style={{ color: darkYellow }}>18th Edition Of</span>
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
                className="h-48 w-auto object-contain mt-8"
              />
            </motion.div>
          </div>


          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#0B2C66] text-white text-[11px] font-bold tracking-[0.15em] mb-2 shadow-lg"
            style={{ marginTop: '45px' }}>
            <div className="w-2 h-2 rounded-full bg-[#4E9F3D] animate-pulse " />
            IHWE CONFERENCE 2026
          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[42px] md:text-[48px] font-[900] text-[#0B2C66] mb-1 leading-[1.1] tracking-tight"
          >
            Learn. <span className="text-[#4E9F3D]"> &nbsp;Connect.</span> <span className="text-[#1E88E5]"> &nbsp;Lead</span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[16px] text-[#5F6B7A] mb-3 leading-[1.5] font-normal max-w-[480px]"
          >
            3 Days of world-class conferences, expert panels, and thought
            leadership sessions shaping the future of healthcare.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-row gap-4"
          >
            <button className="px-4 py-3 rounded-full bg-[#4E9F3D] text-white font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#3D8B2D] transition-all shadow-md hover:shadow-lg group whitespace-nowrap">
              REGISTER FOR CONFERENCE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="/speaker-registration">
              <button className="px-8 py-3 rounded-full bg-white text-[#0B2C66] font-bold text-[11px] uppercase tracking-widest border border-[#E6ECF3] flex items-center gap-2 hover:bg-[#F7F9FC] transition-all shadow-sm whitespace-nowrap w-full">
                <Mic className="w-4 h-4 text-[#4E9F3D]" />
                BECOME A SPEAKER
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default ConferenceHero;