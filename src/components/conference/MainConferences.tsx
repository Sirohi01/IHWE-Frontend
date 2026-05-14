
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lightbulb, Sprout, ShieldPlus } from "lucide-react";

import day1 from "../../assets/confrencetrack/compressed_day1.webp";
import day2 from "../../assets/confrencetrack/compressed_day2.webp";
import day3 from "../../assets/confrencetrack/compressed_day3.webp";

import { conferenceTrackApi, SERVER_URL } from "@/lib/api";

const ICON_MAP: { [key: string]: React.ReactNode } = {
  Lightbulb: <Lightbulb className="w-10 h-10 text-white" />,
  Sprout: <Sprout className="w-10 h-10 text-white" />,
  ShieldPlus: <ShieldPlus className="w-10 h-10 text-white" />,
};

const MainConferences: React.FC = () => {
  const [tracks, setTracks] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTracks = async () => {
      try {
        const result = await conferenceTrackApi.get();
        if (result && result.length > 0) {
          setTracks(result);
        }
      } catch (error) {
        console.error("Error fetching conference tracks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, []);

  const mainConferences = tracks.length > 0 ? tracks.map(track => ({
    ...track,
    image: track.image ? `${SERVER_URL}${track.image}` : (track.day === "DAY 1" ? day1 : track.day === "DAY 2" ? day2 : day3),
    icon: ICON_MAP[track.iconName] || <Lightbulb className="w-10 h-10 text-white" />
  })) : [
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
    <section className="py-8 bg-white">
      <div className="mx-auto max-w-[1330px] pl-6 lg:pl-2">


        <div className="text-center mb-6">
          <h2 className="text-[20px] md:text-[24px] font-[900] text-[#4E9F3D] uppercase tracking-tight mb-2 flex items-center justify-center flex-wrap">
            3 DAYS <span className="mx-3 text-[#4E9F3D] text-[0.7em] opacity-80">|</span> 3 POWERFUL{" "}
            <span className="text-[#1E88E5] ml-1">CONFERENCES</span>{" "}
            <span className="mx-3 text-[#4E9F3D] text-[0.7em] opacity-80">|</span>{" "}
            <span className="text-[#0B2C66] ml-1">18 GAME-CHANGING SESSIONS.</span>
          </h2>
          <div className="h-1 w-24 bg-[#4E9F3D] mx-auto mt-2 rounded-full" />
        </div>


        <div className="grid lg:grid-cols-3 gap-8">
          {mainConferences.map((conf, index) => (
            <Link to={conf.link || "#"} key={index} className="block h-full cursor-pointer">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className={`group relative rounded-[32px] overflow-hidden bg-white transition-all duration-500 ${conf.shadowColor} hover:-translate-y-3 min-h-[500px] flex flex-col h-full`}
              >

                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={conf.image}
                    alt={conf.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-white/90" />
                </div>
                <div className="relative z-10 p-7 flex flex-col h-full">


                  <div className="flex justify-center items-start mb-4 w-full">
                    <div
                      className={`absolute top-0 left-0 ${conf.badgeColor} text-white px-20 py-2.5 rounded-br-[28px] font-black text-[22px] tracking-wider min-w-[420px] text-center border-2 border-yellow-300`}
                      style={{
                        boxShadow:
                          "0 0 18px rgba(255, 215, 0, 0.55), 0 4px 12px rgba(255, 215, 0, 0.35)"
                      }}
                    >
                      <span
                        style={{
                          textShadow:
                            "0 2px 8px rgba(255, 215, 0, 0.9), 0 1px 3px rgba(0,0,0,0.45)"
                        }}
                      >
                        {conf.day}
                      </span>
                    </div>
                  </div>


                  <div className="absolute top-6 right-7">
                    <div
                      className="w-18 h-18 rounded-full flex items-center justify-center border-4 border-white backdrop-blur-md transition-transform duration-500 group-hover:rotate-12"
                      style={{
                        backgroundColor: `${conf.accentColor}dd`,
                        width: "72px",
                        height: "72px"
                      }}
                    >
                      {React.cloneElement(conf.icon as React.ReactElement, {
                        className: "w-9 h-9 text-white"
                      })}
                    </div>
                  </div>

                  <h3
                    className="text-[22px] font-[900] leading-[1.15] mb-4 mt-10 uppercase max-w-[85%]"
                    style={{ color: "#0B2C66" }}
                  >
                    {conf.title}
                  </h3>


                  <div className="space-y-2.5 mb-auto">
                    {conf.sessions.map((session, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className="w-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{
                            backgroundColor: conf.accentColor,
                            height: "9px",
                            width: "9px"
                          }}
                        />
                        <span className="text-[13px] font-bold text-gray-800 leading-snug">
                          {session}
                        </span>
                      </div>
                    ))}
                  </div>


                  <div className="flex justify-center items-end w-full mt-4">
                    <div
                      className="absolute bottom-0 left-0 px-20 py-1.5 rounded-tr-[24px] font-black text-[20px] tracking-wider min-w-[420px] text-center border-2 border-yellow-300"
                      style={{
                        backgroundColor:
                          conf.accentColor === "#4E9F3D"
                            ? "#E8F5E9"
                            : conf.accentColor === "#E67E22"
                              ? "#FFF3E0"
                              : "#F3E8FF",
                        color:
                          conf.accentColor === "#4E9F3D"
                            ? "#1A4D2E"
                            : conf.accentColor === "#E67E22"
                              ? "#92400E"
                              : "#581C87",
                        boxShadow:
                          "0 0 18px rgba(255, 215, 0, 0.55), 0 4px 12px rgba(255, 215, 0, 0.35)"
                      }}
                    >
                      <span
                        style={{
                          textShadow:
                            "0 2px 8px rgba(255, 215, 0, 0.85), 0 1px 3px rgba(0,0,0,0.35)"
                        }}
                      >
                        {conf.date}
                      </span>
                    </div>
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