// components/conference/MainConferences.tsx
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Layers, Search, ArrowRight } from "lucide-react";

const mainConferences = [
  {
    day: "DAY 1",
    title: "HEALTHCARE INNOVATION SUMMIT",
    description:
      "Advancing technology, infrastructure & innovation for future-ready healthcare systems.",
    date: "20 AUG 2026",
    sessions: "6 SESSIONS",
    focus: "Innovation & Technology",
    badgeGradient: "from-[#4E9F3D] to-[#2E7D32]",
    btnGradient: "from-[#4E9F3D] to-[#2E7D32]",
    iconBg: "bg-[#F1F8EE]",
    iconColor: "text-[#4E9F3D]",
    iconStroke: "#4E9F3D",
  },
  {
    day: "DAY 2",
    title: "GLOBAL WELLNESS LEADERSHIP FORUM",
    description:
      "Empowering wellness, holistic healing & lifestyle solutions for a healthier tomorrow.",
    date: "21 AUG 2026",
    sessions: "6 SESSIONS",
    focus: "Wellness & Lifestyle",
    badgeGradient: "from-[#1E88E5] to-[#0B2C66]",
    btnGradient: "from-[#1E88E5] to-[#0B2C66]",
    iconBg: "bg-[#EEF4FF]",
    iconColor: "text-[#1E88E5]",
    iconStroke: "#1E88E5",
  },
  {
    day: "DAY 3",
    title: "FUTURE OF PREVENTIVE HEALTHCARE CONFERENCE",
    description:
      "Strengthening prevention, public health & sustainability for a healthier planet.",
    date: "22 AUG 2026",
    sessions: "6 SESSIONS",
    focus: "Prevention & Sustainability",
    badgeGradient: "from-[#6A3DF0] to-[#4A23A3]",
    btnGradient: "from-[#6A3DF0] to-[#4A23A3]",
    iconBg: "bg-[#F3E9FF]",
    iconColor: "text-[#6A3DF0]",
    iconStroke: "#6A3DF0",
  },
];

const MainConferences: React.FC = () => {
  return (
    <section className="py-16 bg-[#F7F9FC]">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Section label */}
        <div className="text-center mb-10">
          <p className="text-[13px] font-bold text-[#4E9F3D] uppercase tracking-widest mb-3">
            3 DAYS. 3 POWERFUL CONFERENCES.{" "}
            <span className="text-[#1C2B3A]">18 GAME-CHANGING SESSIONS.</span>
          </p>
          <div className="h-[3px] w-10 bg-[#4E9F3D] mx-auto rounded-full" />
        </div>

        {/* Cards grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {mainConferences.map((conf, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="bg-white rounded-[20px] p-7 shadow-md border border-[#E6ECF3] flex flex-col items-center text-center group hover:border-[#4E9F3D] transition-all duration-500 relative"
            >
              {/* Day badge */}
              <div
                className={`absolute top-5 right-5 px-4 py-1.5 rounded-full bg-gradient-to-r ${conf.badgeGradient} text-white text-[9px] font-bold tracking-widest shadow`}
              >
                {conf.day}
              </div>

              {/* Icon circle */}
              <div
                className={`w-24 h-24 rounded-full ${conf.iconBg} flex items-center justify-center mb-5 ring-4 ring-white shadow-sm`}
              >
                <Layers className={`w-10 h-10 ${conf.iconColor}`} />
              </div>

              <h3 className="text-[16px] font-bold text-[#1C2B3A] mb-3 leading-snug">
                {conf.title}
              </h3>
              <p className="text-[13px] text-[#5F6B7A] mb-6 leading-[1.55]">
                {conf.description}
              </p>

              {/* Meta row */}
              <div className="w-full grid grid-cols-3 gap-0 border border-[#E6ECF3] rounded-[10px] py-3 mb-5">
                <div className="flex flex-col items-center gap-1 px-2">
                  <Calendar className="w-3.5 h-3.5 text-[#C1C8D5]" />
                  <span className="text-[8px] font-semibold text-[#5F6B7A] uppercase tracking-wide">
                    DATE
                  </span>
                  <span className="text-[9px] font-bold text-[#1C2B3A] uppercase">
                    {conf.date}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 px-2 border-x border-[#E6ECF3]">
                  <Layers className="w-3.5 h-3.5 text-[#C1C8D5]" />
                  <span className="text-[8px] font-semibold text-[#5F6B7A] uppercase tracking-wide">
                    SESSIONS
                  </span>
                  <span className="text-[9px] font-bold text-[#1C2B3A] uppercase">
                    {conf.sessions}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 px-2">
                  <Search className="w-3.5 h-3.5 text-[#C1C8D5]" />
                  <span className="text-[8px] font-semibold text-[#5F6B7A] uppercase tracking-wide">
                    KEY FOCUS
                  </span>
                  <span className="text-[9px] font-bold text-[#1C2B3A] uppercase leading-tight text-center">
                    {conf.focus}
                  </span>
                </div>
              </div>

              {/* CTA button */}
              <button
                className={`w-full py-3.5 rounded-full bg-gradient-to-r ${conf.btnGradient} text-white font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all`}
              >
                VIEW SESSIONS
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainConferences;