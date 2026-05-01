import React from "react";
import { motion } from "framer-motion";
import { Calendar, Layers, Search, ArrowRight, Network, User, Plus } from "lucide-react";

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
    icon: Network,
    iconBg: "bg-[#F1F8EE]",
    iconColor: "text-[#4E9F3D]",
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
    icon: User,
    iconBg: "bg-[#EEF4FF]",
    iconColor: "text-[#1E88E5]",
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
    icon: Plus,
    iconBg: "bg-[#F3E9FF]",
    iconColor: "text-[#6A3DF0]",
  },
];

const MainConferences: React.FC = () => {
  return (
    <section className="py-8 bg-[#F7F9FC]">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Section label */}
        <div className="text-center mb-10">
          <h2 className="text-[24px] font-[900] text-[#4E9F3D] uppercase tracking-tight mb-2">
            3 DAYS. 3 POWERFUL <span className="text-[#1E88E5]">CONFERENCES</span>.{" "}
            <span className="text-[#0B2C66]">18 GAME-CHANGING SESSIONS.</span>
          </h2>
          <div className="h-1 w-20 bg-[#4E9F3D] mx-auto mt-2 rounded-full" />
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
              className="bg-white rounded-[16px] p-4 shadow-md border border-[#E6ECF3] flex flex-col items-start text-left group hover:border-[#4E9F3D] transition-all duration-500 relative"
            >
              {/* Day badge */}
              <div
                className={`px-3 py-1 rounded-full ${conf.badgeBg} text-white text-[8px] font-bold tracking-widest shadow mb-4`}
              >
                {conf.day}
              </div>

              {/* Icon and Content row */}
              <div className="flex items-start gap-6 mb-6 w-full">
                <div
                  className={`w-24 h-24 rounded-full ${conf.iconBg} flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm`}
                >
                  <conf.icon className={`w-12 h-12 ${conf.iconColor}`} />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <h3 className="text-[14px] font-black text-[#1C2B3A] leading-snug uppercase tracking-tight">
                    {conf.title}
                  </h3>
                  <p className="text-[11px] text-[#5F6B7A] leading-[1.5]">
                    {conf.description}
                  </p>
                </div>
              </div>

              {/* Meta row */}
              <div className="w-full grid grid-cols-3 gap-0 border border-[#E6ECF3] rounded-[10px] py-2.5 mb-4 bg-[#F8FAFC]">
                <div className="flex flex-col items-center gap-1 px-1 text-center">
                  <Calendar className="w-3.5 h-3.5 text-[#C1C8D5]" />
                  <span className="text-[7px] font-black text-[#5F6B7A] uppercase tracking-widest">
                    DATE
                  </span>
                  <span className="text-[9px] font-bold text-[#1C2B3A]">
                    {conf.date}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 px-1 border-x border-[#E6ECF3] text-center">
                  <Layers className="w-3.5 h-3.5 text-[#C1C8D5]" />
                  <span className="text-[7px] font-black text-[#5F6B7A] uppercase tracking-widest">
                    SESSIONS
                  </span>
                  <span className="text-[9px] font-bold text-[#1C2B3A]">
                    {conf.sessions}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 px-1 text-center">
                  <Search className="w-3.5 h-3.5 text-[#C1C8D5]" />
                  <span className="text-[7px] font-black text-[#5F6B7A] uppercase tracking-widest">
                    KEY FOCUS
                  </span>
                  <span className="text-[8px] font-bold text-[#1C2B3A] leading-tight uppercase">
                    {conf.focus}
                  </span>
                </div>
              </div>

              {/* CTA button */}
              <div className="w-full mt-auto flex justify-center">
                <button
                  className={`px-6 py-2 rounded-full ${conf.btnBg} ${conf.btnHover} text-white font-bold text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] inline-flex`}
                >
                  VIEW SESSIONS
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainConferences;