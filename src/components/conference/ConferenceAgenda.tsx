
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, ChevronRight } from "lucide-react";
import amconImage from "../../assets/amanconfre.png";

const agendaData = [
  {
    day: "DAY 1 | 21 AUG",
    shortTitle: "Healthcare Innovation Summit",
    sessions: [
      {
        time: "10:00 AM - 10:45 AM",
        topic: "Inaugural Keynote - Future of Global Healthcare",
        speakers: "Dr. Randal Pinkett",
        type: "Keynote",
      },
      {
        time: "11:00 AM - 11:45 AM",
        topic: "Smart Hospitals & Digital Transformation",
        speakers: "Dr. Maria Neira",
        type: "Panel",
      },
      {
        time: "12:00 PM - 12:45 PM",
        topic: "Medical Devices & Innovation Showcase",
        speakers: "Industry Experts",
        type: "Expert Talk",
      },
      {
        time: "02:00 PM - 02:45 PM",
        topic: "AI, HealthTech & Digital Health Solutions",
        speakers: "Dr. Devi Shetty",
        type: "Panel",
      },
      {
        time: "03:00 PM - 03:45 PM",
        topic: "Diagnostics, Labs & Precision Medicine",
        speakers: "Industry Experts",
        type: "Expert Talk",
      },
      {
        time: "04:00 PM - 05:00 PM",
        topic: "Investor Networking & Leadership Forum",
        speakers: "Open Networking",
        type: "Networking",
      },
    ],
  },
  {
    day: "DAY 2 | 22 AUG",
    shortTitle: "Global Wellness Leadership Forum",
    sessions: [
      {
        time: "10:00 AM - 10:45 AM",
        topic: "Holistic Healing in Modern Era",
        speakers: "Dr. Deepak Chopra",
        type: "Keynote",
      },
      {
        time: "11:00 AM - 11:45 AM",
        topic: "Ayurveda & Modern Medicine Integration",
        speakers: "Prof. Mark Woolhouse",
        type: "Panel",
      },
      {
        time: "12:00 PM - 12:45 PM",
        topic: "Wellness Tourism Opportunities",
        speakers: "Industry Leaders",
        type: "Expert Talk",
      },
    ],
  },
  {
    day: "DAY 3 | 23 AUG",
    shortTitle: "Future of Preventive Healthcare",
    sessions: [
      {
        time: "10:00 AM - 10:45 AM",
        topic: "Building Resilient Health Systems",
        speakers: "WHO Delegates",
        type: "Keynote",
      },
      {
        time: "11:00 AM - 11:45 AM",
        topic: "Public Health & Sustainability",
        speakers: "Environment Experts",
        type: "Panel",
      },
    ],
  },
];

const typeColors: Record<string, string> = {
  Keynote: "bg-[#F7F9FC] text-[#1C2B3A] border border-[#E6ECF3]",
  Panel: "bg-[#F7F9FC] text-[#1C2B3A] border border-[#E6ECF3]",
  "Expert Talk": "bg-[#F7F9FC] text-[#1C2B3A] border border-[#E6ECF3]",
  Networking: "bg-[#F7F9FC] text-[#1C2B3A] border border-[#E6ECF3]",
};

const ConferenceAgenda: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section className="py-4 bg-[#F7F9FC]">
      <div className="container mx-auto px-6 max-w-[1320px]">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="hidden lg:block w-[340px] flex-shrink-0 mt-4">
            <div className="w-full h-[480px] overflow-hidden  ">
              <img
                src={amconImage}
                alt="Agenda visual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[24px] font-[900] text-[#0B2C66] uppercase tracking-tight">
                CONFERENCE <span className="text-[#1E88E5]">AGENDA</span>
              </h2>
              <a href="#" className="flex items-center gap-1 text-[11px] font-extrabold text-[#4E9F3D] uppercase tracking-wider hover:opacity-80 transition-opacity">
                VIEW FULL AGENDA
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>



            {/* Day tabs */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
              {agendaData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`flex-shrink-0 px-5 py-3 rounded-[12px] border text-left transition-all duration-300 ${activeDay === index
                    ? "bg-[#0B2C66] border-[#1E88E5] text-white shadow-lg scale-[1.02] ring-1 ring-[#1E88E5]/50"
                    : "bg-white border-[#E6ECF3] text-[#5F6B7A] hover:border-[#4E9F3D] hover:shadow-sm"
                    }`}
                >
                  <p
                    className={`text-[11px] font-[900] uppercase tracking-[0.2em] mb-1.5 ${activeDay === index ? "text-[#4E9F3D]" : "text-[#1E88E5]"
                      }`}
                  >
                    {item.day}
                  </p>
                  <p className={`text-[14px] font-bold leading-tight ${activeDay === index ? "text-white" : "text-[#1C2B3A]"}`}>
                    {item.shortTitle}
                  </p>
                </button>
              ))}
            </div>

            {/* Agenda table */}
            <div className="bg-white rounded-[16px] border border-[#E6ECF3] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="divide-y divide-[#F1F1F1]"
                >
                  {agendaData[activeDay].sessions.map((session, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#F7F9FC] transition-colors"
                    >
                      {/* Time */}
                      <div className="w-[160px] flex-shrink-0">
                        <div className="flex items-center gap-2 text-[#4E9F3D]">
                          <Clock className="w-4 h-4" />
                          <span className="text-[13px] font-bold">
                            {session.time}
                          </span>
                        </div>
                      </div>

                      {/* Session topic */}
                      <div className="flex-1">
                        <p className="text-[15px] font-bold text-[#1C2B3A]">
                          {session.topic}
                        </p>
                      </div>

                      {/* Speaker */}
                      <div className="hidden md:flex items-center gap-2 text-[#5F6B7A] w-[180px] flex-shrink-0 justify-start">
                        <User className="w-3.5 h-3.5" />
                        <span className="text-[13px] font-medium">{session.speakers}</span>
                      </div>

                      {/* Type badge */}
                      <div className="w-[120px] flex justify-end">
                        <span
                          className={`text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest flex-shrink-0 ${typeColors[session.type] || "bg-gray-200 text-gray-700"
                            }`}
                        >
                          {session.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-[10px] text-[#aaa] italic mt-3">
              * Agenda is subject to change
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceAgenda;