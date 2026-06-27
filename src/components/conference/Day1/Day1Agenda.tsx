import React from "react";
import { motion } from "framer-motion";

const agendaData = [
  {
    time: "10:00 AM - 10:45 AM",
    session: "SESSION 1",
    type: "KEYNOTE",
    topic: "Inaugural Keynote – Future of Global Healthcare",
    description: "Global outlook on healthcare transformation, innovation, and future opportunities.",
    speaker: {
      name: "Dr. Randal Pinkett",
      role: "Former Chief Health Officer",
      company: "Amazon",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      flag: "🇺🇸"
    }
  },
  {
    time: "11:00 AM - 11:45 AM",
    session: "SESSION 2",
    type: "PANEL",
    topic: "Smart Hospitals & Digital Transformation",
    description: "Building intelligent, connected, and efficient hospitals for next-generation care.",
    speaker: {
      name: "Dr. Maria Neira",
      role: "Director, Dept of Environment",
      company: "WHO",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      flag: "🇺🇳"
    }
  },
  {
    time: "12:00 PM - 12:45 PM",
    session: "SESSION 3",
    type: "EXPERT TALK",
    topic: "Medical Devices & Innovation Showcase",
    description: "Next-gen medical devices improving outcomes and patient safety.",
    speaker: {
      name: "Dr. Kevin Tan",
      role: "Founder & CEO",
      company: "HealthTech Asia",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      flag: "🇸🇬"
    }
  },
  {
    time: "02:00 PM - 02:45 PM",
    session: "SESSION 4",
    type: "PANEL",
    topic: "AI, HealthTech & Digital Health Solutions",
    description: "AI, data, and digital platforms redefining healthcare delivery.",
    speaker: {
      name: "Dr. Devi Shetty",
      role: "Chairman & Founder",
      company: "Narayana Health",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      flag: "🇮🇳"
    }
  },
  {
    time: "03:00 PM - 03:45 PM",
    session: "SESSION 5",
    type: "EXPERT TALK",
    topic: "Diagnostics, Labs & Precision Medicine",
    description: "Advances in diagnostics and personalized medicine for better health outcomes.",
    speaker: {
      name: "Prof. Mark Woolhouse",
      role: "Professor of Infectious Disease",
      company: "University of Edinburgh",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      flag: "🇬🇧"
    }
  },
  {
    time: "04:00 PM - 05:00 PM",
    session: "SESSION 6",
    type: "NETWORKING",
    topic: "Healthcare Infrastructure & Investment",
    description: "Developing future-ready infrastructure and navigating global healthcare investments.",
    speaker: {
      name: "Industry Leaders",
      role: "Investors | Innovators",
      company: "Healthcare Executives",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100",
      flag: "🌐"
    }
  }
];

const Day1Agenda: React.FC = () => {
  return (
    <section className="py-0 bg-[#F0FDF4]/50">
      <div className="container mx-auto px-0 max-w-[1320px]">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[18px] md:text-[20px] font-black text-[#4E9F3D] uppercase tracking-tight font-sans">
            DAY 1 AGENDA — 21 AUGUST 2026
          </h2>
          <p className="text-[11px] font-bold text-[#5F6B7A] uppercase tracking-[0.2em] mt-1">
            6 Insightful Sessions | 1 Powerful Day
          </p>
        </div>


        <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0]">
          <div className="overflow-x-auto max-h-[400px] overflow-y-scroll custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-20">
                <tr className="bg-[#0B2C66] text-white">
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">Time</th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">Session</th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">Topic</th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">Speaker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {agendaData.map((item, index) => (
                  <tr key={index} className="transition-colors group">

                    <td className="px-4 py-2 align-top relative">
                      <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-[#4E9F3D] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="pl-1">
                        <span className="text-[13px] font-black text-[#4A5568]">{item.time}</span>
                      </div>
                    </td>


                    <td className="px-4 py-2 align-top">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-black text-[#0B2C66] uppercase tracking-tight">{item.session}</span>
                        <span className="text-[9px] font-black text-[#4E9F3D] uppercase tracking-widest">
                          {item.type}
                        </span>
                      </div>
                    </td>

                    {/* Topic Column */}
                    <td className="px-4 py-2 align-top max-w-[400px]">
                      <div className="space-y-1">
                        <h3 className="text-[14px] font-black text-[#0B2C66] leading-snug">
                          {item.topic}
                        </h3>
                        <p className="text-[12px] text-[#718096] font-medium leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </td>

                    {/* Speaker Column */}
                    <td className="px-4 py-2 align-top min-w-[250px]">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.speaker.image}
                            alt={item.speaker.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                          />
                          <div className="flex flex-col">
                            <span className="text-[13px] font-black text-[#0B2C66]">{item.speaker.name}</span>
                            <span className="text-[10px] font-bold text-[#5F6B7A] leading-tight mt-0.5">{item.speaker.role}</span>
                            <span className="text-[10px] font-bold text-[#718096] uppercase tracking-tight">{item.speaker.company}</span>
                          </div>
                        </div>
                        <span className="text-[16px] opacity-80">{item.speaker.flag}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>



      </div>
    </section>
  );
};

export default Day1Agenda;
