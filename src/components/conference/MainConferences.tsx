import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lightbulb, Sprout, ShieldPlus, ArrowRight } from "lucide-react";

import day1 from "../../assets/confrencetrack/day1.png";
import day2 from "../../assets/confrencetrack/day2.png";
import day3 from "../../assets/confrencetrack/day3.png";

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
      image: day1,
      icon: <Lightbulb className="w-10 h-10 text-white" />,
      accentColor: "#4E9F3D",
      badgeColor: "bg-[#1A4D2E]",

      link: "/conference/day-1"
    },
    {
      day: "DAY 2",
      date: "22 AUGUST 2026",
      title: "GLOBAL WELLNESS LEADERSHIP FORUM",
      sessions: [
        "Wellness Economy & Global Opportunities",
        "Ayurveda, AYUSH & Holistic Healing",
        "Fitness, Preventive Health & Lifestyle Medicine",
        "Beauty, Personal Care & Wellness Innovation"
      ],
      image: day2,
      icon: <Sprout className="w-10 h-10 text-white" />,
      accentColor: "#E67E22",
      badgeColor: "bg-[#92400E]",

      link: "/conference/day-2"
    },
    {
      day: "DAY 3",
      date: "23 AUGUST 2026",
      title: "WELLNESS & AYUSH LEADERSHIP FORUM",
      sessions: [
        "Ayurveda & Traditional Wisdom",
        "Nutrition, Diet & Lifestyle",
        "Yoga, Mental Health & Wellness",
        "Herbal Industry & Natural Products"
      ],
      image: day3,
      icon: <ShieldPlus className="w-10 h-10 text-white" />,
      accentColor: "#7C3AED",
      badgeColor: "bg-[#581C87]",
      shadowColor: "",
      link: "/conference/day-3"
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

        <div className="grid lg:grid-cols-3 gap-6">
          {mainConferences.map((conf, index) => (
            <Link to={conf.link || "#"} key={index} className="block h-full cursor-pointer">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className={`group relative rounded-[32px] overflow-hidden bg-white  transition-all duration-500 ${conf.shadowColor} hover:-translate-y-2 min-h-[330px] flex flex-col h-full`}
              >

                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={conf.image}
                    alt={conf.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-white/90" />
                </div>


                <div className="relative z-10 p-6 flex flex-col h-full">

                  <div className="flex justify-center items-start mb-4 w-full">

                    <div className={`absolute top-0 left-0 ${conf.badgeColor} text-white px-6 py-2 rounded-br-[20px] font-black text-[15px] tracking-wider `}>
                      {conf.day}
                    </div>


                    <div
                      className="text-[12px] font-[900] px-6 py-2 -mt-4"
                      style={{ color: conf.accentColor }}
                    >
                      {conf.date}
                    </div>
                  </div>


                  <div className="absolute top-6 right-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white  backdrop-blur-md transition-transform duration-500 group-hover:rotate-12"
                      style={{ backgroundColor: `${conf.accentColor}dd` }}
                    >
                      {React.cloneElement(conf.icon as React.ReactElement, { className: "w-8 h-8 text-white" })}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[19px] font-[900] leading-[1.2] mb-3 mt-8 uppercase"
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
                        <span className="text-[12px] font-bold text-gray-800 leading-snug">
                          {session}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainConferences;