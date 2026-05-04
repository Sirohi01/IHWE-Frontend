import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Sprout, ShieldPlus, ArrowRight } from "lucide-react";

// Import assets
import ram1 from "../../assets/ram1.png";
import ram2 from "../../assets/ram2.png";
import ram3 from "../../assets/ram3.png";

const MainConferences: React.FC = () => {
  const mainConferences = [
    {
      day: "DAY 1",
      date: "21 AUGUST 2026",
      title: "HEALTHCARE INNOVATION SUMMIT",
      sessions: [
        "Smart Hospitals & Digital Transformation",
        "Medical Devices & Innovation",
        "Diagnostics & Precision Medicine",
        "Infrastructure & Investment"
      ],
      image: ram1,
      icon: <Lightbulb className="w-10 h-10 text-white" />,
      accentColor: "#4E9F3D",
      badgeColor: "bg-[#1A4D2E]",
      shadowColor: "hover:shadow-[#4E9F3D]/20"
    },
    {
      day: "DAY 2",
      date: "22 AUGUST 2026",
      title: "WELLNESS & AYUSH LEADERSHIP FORUM",
      sessions: [
        "Ayurveda & Traditional Wisdom",
        "Nutrition, Diet & Lifestyle",
        "Yoga, Mental Health & Wellness",
        "Herbal Industry & Natural Products"
      ],
      image: ram2,
      icon: <Sprout className="w-10 h-10 text-white" />,
      accentColor: "#E67E22",
      badgeColor: "bg-[#92400E]",
      shadowColor: "hover:shadow-[#E67E22]/20"
    },
    {
      day: "DAY 3",
      date: "23 AUGUST 2026",
      title: "FUTURE OF PREVENTIVE HEALTHCARE CONFERENCE",
      sessions: [
        "Preventive Medicine & Early Detection",
        "Public Health & Community Wellness",
        "Research, Innovation & Evidence-based Care",
        "Policy, Advocacy & Global Partnerships"
      ],
      image: ram3,
      icon: <ShieldPlus className="w-10 h-10 text-white" />,
      accentColor: "#7C3AED",
      badgeColor: "bg-[#581C87]",
      shadowColor: "hover:shadow-[#7C3AED]/20"
    }
  ];

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Section label */}
        <div className="text-center mb-4">
          <h2 className="text-[20px] md:text-[24px] font-[900] text-[#4E9F3D] uppercase tracking-tight mb-2 flex items-center justify-center flex-wrap">
            3 DAYS <span className="mx-3 text-[#4E9F3D] text-[0.7em] opacity-80">|</span> 3 POWERFUL <span className="text-[#1E88E5] ml-1">CONFERENCES</span> <span className="mx-3 text-[#4E9F3D] text-[0.7em] opacity-80">|</span> <span className="text-[#0B2C66] ml-1">18 GAME-CHANGING SESSIONS.</span>
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
              className={`group relative rounded-[32px] overflow-hidden bg-white shadow-xl transition-all duration-500 ${conf.shadowColor} hover:-translate-y-2 min-h-[400px] flex flex-col`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={conf.image}
                  alt={conf.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Subtle gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent opacity-90" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Header: Day and Date */}
                <div className="flex justify-between items-start mb-4">
                  {/* Day Badge */}
                  <div className={`absolute top-0 left-0 ${conf.badgeColor} text-white px-8 py-3 rounded-br-[24px] font-black text-[18px] tracking-wider shadow-lg`}>
                    {conf.day}
                  </div>

                  {/* Date */}
                  <div className="ml-auto text-[14px] font-bold text-gray-700 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                    {conf.date}
                  </div>
                </div>

                {/* Top Right Icon */}
                <div className="absolute top-6 right-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-2xl backdrop-blur-md transition-transform duration-500 group-hover:rotate-12"
                    style={{ backgroundColor: `${conf.accentColor}dd` }}
                  >
                    {React.cloneElement(conf.icon as React.ReactElement, { className: "w-8 h-8 text-white" })}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-[22px] font-[900] leading-[1.2] mb-3 mt-10 uppercase"
                  style={{ color: "#0B2C66" }}
                >
                  {conf.title}
                </h3>

                {/* Sessions List */}
                <div className="space-y-2 mb-auto">
                  {conf.sessions.map((session, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="w-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: conf.accentColor, height: "8px", width: "8px" }}
                      />
                      <span className="text-[13px] font-bold text-gray-800 leading-snug">
                        {session}
                      </span>
                    </div>
                  ))}
                </div>

                {/* View Sessions Button */}
                <button
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-black text-[13px] uppercase tracking-[1px] transition-all duration-300 text-white shadow-lg active:scale-[0.98]"
                  style={{ backgroundColor: conf.accentColor }}
                >
                  VIEW SESSIONS
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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