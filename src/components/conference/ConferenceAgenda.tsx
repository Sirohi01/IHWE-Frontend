// components/conference/ConferenceAgenda.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User } from "lucide-react";

const agendaData = [
  {
    day: "DAY 1 | 20 AUG",
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
    day: "DAY 2 | 21 AUG",
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
    day: "DAY 3 | 22 AUG",
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
  Keynote: "bg-[#4E9F3D] text-white",
  Panel: "bg-[#1E88E5] text-white",
  "Expert Talk": "bg-[#6A3DF0] text-white",
  Networking: "bg-[#E88C1E] text-white",
};

const ConferenceAgenda: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section className="py-16 bg-[#F7F9FC]">
      <div className="container mx-auto px-6 max-w-[1320px]">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left image */}
          <div className="hidden lg:block w-[200px] flex-shrink-0 rounded-[16px] overflow-hidden h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&q=80"
              alt="Agenda visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right agenda content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] font-black text-[#1C2B3A] uppercase tracking-wide">
                CONFERENCE AGENDA
              </h2>
              <span className="text-[11px] font-semibold text-[#4E9F3D] cursor-pointer hover:underline">
                VIEW FULL AGENDA →
              </span>
            </div>

            {/* Day tabs */}
            <div className="flex gap-2 mb-5 overflow-x-auto">
              {agendaData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`flex-shrink-0 px-4 py-2 rounded-[8px] border text-left transition-all duration-200 ${activeDay === index
                      ? "bg-[#1C2B3A] border-[#1C2B3A] text-white"
                      : "bg-white border-[#E6ECF3] text-[#5F6B7A] hover:border-[#4E9F3D]"
                    }`}
                >
                  <p
                    className={`text-[8px] font-black uppercase tracking-widest mb-0.5 ${activeDay === index ? "text-[#4E9F3D]" : "text-[#4E9F3D]"
                      }`}
                  >
                    {item.day}
                  </p>
                  <p className="text-[11px] font-bold leading-tight">
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
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#F7F9FC] transition-colors"
                    >
                      {/* Time */}
                      <div className="w-[130px] flex-shrink-0">
                        <div className="flex items-center gap-1.5 text-[#4E9F3D]">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold">
                            {session.time}
                          </span>
                        </div>
                      </div>

                      {/* Session topic */}
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-[#1C2B3A]">
                          {session.topic}
                        </p>
                      </div>

                      {/* Speaker */}
                      <div className="hidden md:flex items-center gap-1.5 text-[#5F6B7A] w-[140px] flex-shrink-0 justify-end">
                        <User className="w-3 h-3" />
                        <span className="text-[11px]">{session.speakers}</span>
                      </div>

                      {/* Type badge */}
                      <span
                        className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wide flex-shrink-0 ${typeColors[session.type] || "bg-gray-200 text-gray-700"
                          }`}
                      >
                        {session.type}
                      </span>
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