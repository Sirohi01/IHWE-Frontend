import React from "react";
import { motion } from "framer-motion";
import { Calendar, Layers, Search, ArrowRight } from "lucide-react";
import imgDay1 from "../../assets/ram1.png";
import imgDay2 from "../../assets/ram2.png";
import imgDay3 from "../../assets/ram3.png";
import icon1 from "../../assets/powerfullconfrencce/Screenshot 2026-05-01 at 11.47.53 AM.png";
import icon2 from "../../assets/powerfullconfrencce/Screenshot 2026-05-01 at 11.48.11 AM.png";
import icon3 from "../../assets/powerfullconfrencce/Screenshot 2026-05-01 at 11.48.21 AM.png";

const mainConferences = [
  {
    day: "DAY 1",
    title: "HEALTHCARE INNOVATION SUMMIT",
    description:
      "Advancing technology, infrastructure & innovation for future-ready healthcare systems.",
    date: "20 AUG 2026",
    sessions: "6 SESSIONS",
    focus: "Innovation & Technology",
    badgeBg: "bg-[#4E9F3D]",
    btnBg: "bg-[#4E9F3D]",
    btnHover: "hover:bg-[#3D8B2D]",
    image: imgDay1,
    icon: icon1,
  },
  {
    day: "DAY 2",
    title: "GLOBAL WELLNESS LEADERSHIP FORUM",
    description:
      "Empowering wellness, holistic healing & lifestyle solutions for a healthier tomorrow.",
    date: "21 AUG 2026",
    sessions: "6 SESSIONS",
    focus: "Wellness & Lifestyle",
    badgeBg: "bg-[#1E88E5]",
    btnBg: "bg-[#1E88E5]",
    btnHover: "hover:bg-[#1565C0]",
    image: imgDay2,
    icon: icon2,
  },
  {
    day: "DAY 3",
    title: "FUTURE OF PREVENTIVE HEALTHCARE CONFERENCE",
    description:
      "Strengthening prevention, public health & sustainability for a healthier planet.",
    date: "22 AUG 2026",
    sessions: "6 SESSIONS",
    focus: "Prevention & Sustainability",
    badgeBg: "bg-[#6A3DF0]",
    btnBg: "bg-[#6A3DF0]",
    btnHover: "hover:bg-[#5229C7]",
    image: imgDay3,
    icon: icon3,
  },
];

const MainConferences: React.FC = () => {
  return (
    <section className="py-4 bg-[#F7F9FC]">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Section label */}
        <div className="text-center mb-4">
          <h2 className="text-[24px] font-[900] text-[#4E9F3D] uppercase tracking-tight mb-2">
            3 DAYS. 3 POWERFUL <span className="text-[#1E88E5]">CONFERENCES</span>.{" "}
            <span className="text-[#0B2C66]">18 GAME-CHANGING SESSIONS.</span>
          </h2>
          <div className="h-1 w-20 bg-[#4E9F3D] mx-auto mt-2 rounded-full" />
        </div>

        {/* Cards grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {mainConferences.map((conf, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="relative min-h-[480px] rounded-[24px] overflow-hidden group shadow-xl border border-[#E6ECF3]/20 flex flex-col items-start text-left transition-all duration-500"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={conf.image}
                  alt={conf.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay - reduced opacity for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C66]/90 via-[#0B2C66]/30 to-[#0B2C66]/10 z-10" />
              </div>

              {/* Content Container */}
              <div className="relative z-20 p-8 flex flex-col h-full w-full">
                {/* Day badge */}
                <div
                  className={`inline-block self-start px-6 py-2 rounded-full ${conf.badgeBg} text-white text-[14px] font-bold tracking-widest shadow-lg mb-6`}
                >
                  {conf.day}
                </div>

                {/* Logo and Title row */}
                <div className="flex items-start gap-6 mb-6 w-full">
                  <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-xl overflow-hidden border-4 border-white/20">
                    <img src={conf.icon} alt={conf.title} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <h3 className="text-[20px] font-black text-white leading-tight uppercase tracking-tight">
                      {conf.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[14px] text-white/80 leading-[1.6] mb-6 font-medium">
                  {conf.description}
                </p>

                {/* Meta row */}
                <div className="w-full grid grid-cols-3 gap-2 border border-white/10 rounded-[16px] py-4 px-2 mb-8 bg-white/5 backdrop-blur-md">
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <Calendar className="w-4 h-4 text-white/60" />
                    <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">
                      DATE
                    </span>
                    <span className="text-[10px] font-bold text-white">
                      {conf.date}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 border-x border-white/10 text-center">
                    <Layers className="w-4 h-4 text-white/60" />
                    <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">
                      SESSIONS
                    </span>
                    <span className="text-[10px] font-bold text-white">
                      {conf.sessions}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <Search className="w-4 h-4 text-white/60" />
                    <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">
                      KEY FOCUS
                    </span>
                    <span className="text-[9px] font-bold text-white leading-tight uppercase">
                      {conf.focus}
                    </span>
                  </div>
                </div>

                {/* CTA button */}
                <div className="w-full mt-auto flex justify-start">
                  <button
                    className={`px-10 py-3.5 rounded-full ${conf.btnBg} ${conf.btnHover} text-white font-bold text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-xl active:scale-[0.95] group/btn`}
                  >
                    VIEW SESSIONS
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainConferences;