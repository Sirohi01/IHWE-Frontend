import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mic } from "lucide-react";
import amanImage from "../../assets/bhiya.png";
import arogyaLogo from "../../assets/arogyasangosti.png";

const ConferenceHero: React.FC = () => {
  const darkYellow = "#C9A227";
  return (
    <section className="relative min-h-[750px] lg:min-h-[550px] flex items-center overflow-hidden font-sans" style={{ backgroundColor: "#caf0f8" }}>


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


          <div className="flex flex-col items-start gap-0 -mt-4">
            <div className="flex items-center gap-0">
              <span
                className="text-[12px] sm:text-[14px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold"
                style={{
                  color: darkYellow,
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 600,
                  textShadow: '0 0 10px rgba(201,162,39,0.5), 0 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '0.3em'
                }}
              >
                18th Edition Of
              </span>
              <div className="flex items-center gap-0">
                <div
                  className="h-[2px] w-10 sm:w-14"
                  style={{
                    background: `linear-gradient(90deg, ${darkYellow}, #FFD700, ${darkYellow})`,
                    boxShadow: '0 0 4px rgba(255,215,0,0.6)'
                  }}
                ></div>
                <div
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rotate-45 -ml-1 relative z-10 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${darkYellow}, #FFD700, #B8860B)`,
                    border: '1px solid rgba(255,215,0,0.6)',
                    boxShadow: '0 0 8px rgba(255,215,0,0.8)'
                  }}
                ></div>
                <div
                  className="h-[2px] w-10 sm:w-14 -ml-1"
                  style={{
                    background: `linear-gradient(90deg, ${darkYellow}, #FFD700, ${darkYellow})`,
                    boxShadow: '0 0 4px rgba(255,215,0,0.6)'
                  }}
                ></div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-1 sm:-mt-5"
            >
              <img
                src={arogyaLogo}
                alt="Arogyasangosti Logo"
                className="h-32 sm:h-40 md:h-48 w-auto object-contain transition-all duration-300 hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.4)) drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                }}
              />
            </motion.div>
          </div>


          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#0B2C66] text-white text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.15em] shadow-lg"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 400, marginTop: '20px' }}
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#4E9F3D] animate-pulse" />
            IHWE CONFERENCE 2026
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginTop: "12px" }}
          >
            <div
              className="text-[#0B2C66] leading-[1.1] flex items-center whitespace-nowrap"
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontWeight: 400,
                gap: "10px",
              }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold">
                Learn.
              </div>

              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#4E9F3D] font-semibold">
                Connect.
              </div>

              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#1E88E5] font-semibold">
                Lead
              </div>
            </div>
          </motion.div>


          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[14px] sm:text-[15px] md:text-[16px] text-[#5F6B7A] leading-[1.5] max-w-[480px]"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 400, marginTop: '12px', marginBottom: '16px' }}
          >
            3 Days of world-class conferences, expert panels, and thought
            leadership sessions shaping the future of healthcare.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            style={{ marginTop: '8px' }}
          >
            <Link to="/delegate-registration">
              <button
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#4E9F3D] text-white text-[10px] sm:text-[11px] uppercase tracking-wide flex items-center justify-center gap-2 transition-all whitespace-nowrap"
                style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 400 }}
              >
                REGISTER FOR DELEGATES
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </Link>
            <Link to="/speaker-registration">
              <button
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-[#0B2C66] text-[10px] sm:text-[11px] uppercase tracking-wide border border-[#E6ECF3] flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
                style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 400 }}
              >
                <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4E9F3D]" />
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