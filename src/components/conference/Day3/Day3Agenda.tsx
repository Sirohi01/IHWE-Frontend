import React from "react";
import { Clock } from "lucide-react";

const agendaData = [
  {
    time: "10:00 AM – 10:45 AM",
    session: "SESSION 1",
    type: "KEYNOTE",
    topic: "The Future of Preventive Healthcare",
    description: "Global strategies for prevention and population health.",
    speaker: {
      name: "Dr. Sanjay Gupta",
      role: "Prev. Chief Medical",
      company: "Correspondent, CNN",
      image: "https://randomuser.me/api/portraits/men/20.jpg",
      flag: "🇺🇸"
    }
  },
  {
    time: "11:00 AM – 11:45 AM",
    session: "SESSION 2",
    type: "PANEL",
    topic: "Public Health & Community Wellness",
    description: "Building healthier communities through collaboration and awareness.",
    speaker: {
      name: "Dr. Soumya Swaminathan",
      role: "Prev. Chief Scientist",
      company: "WHO",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      flag: "🇮🇳"
    }
  },
  {
    time: "12:00 PM – 12:45 PM",
    session: "SESSION 3",
    type: "EXPERT TALK",
    topic: "Nutrition, Lifestyle & Mental Well-being",
    description: "Food, fitness & mindfulness for a healthy tomorrow.",
    speaker: {
      name: "Luke Coutinho",
      role: "Holistic Lifestyle",
      company: "Expert",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      flag: "🇮🇳"
    }
  },
  {
    time: "02:00 PM – 02:45 PM",
    session: "SESSION 4",
    type: "PANEL",
    topic: "Sustainability & Planetary Health",
    description: "Climate change, environment & health impact.",
    speaker: {
      name: "Dr. R. Balakrishnan",
      role: "Director",
      company: "PHFI",
      image: "https://randomuser.me/api/portraits/men/23.jpg",
      flag: "🇮🇳"
    }
  },
  {
    time: "03:00 PM – 03:45 PM",
    session: "SESSION 5",
    type: "EXPERT TALK",
    topic: "Research & Innovation in Prevention",
    description: "From data to action: innovations driving preventive care.",
    speaker: {
      name: "Dr. Nikhil Tandon",
      role: "Director",
      company: "AIIMS",
      image: "https://randomuser.me/api/portraits/men/24.jpg",
      flag: "🇮🇳"
    }
  },
  {
    time: "04:00 PM – 05:00 PM",
    session: "SESSION 6",
    type: "NETWORKING",
    topic: "Policy, Advocacy & Global Partnerships",
    description: "Working together for a healthier and equitable future.",
    speaker: {
      name: "Policy Leaders",
      role: "Health Ministers &",
      company: "Global Experts",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100",
      flag: "🌐"
    }
  }
];

const Day3Agenda: React.FC = () => {
  return (
    <div className="bg-white h-full flex flex-col">
      {/* Section Header */}
      <div className="text-center mb-5">
        <h2 className="text-[20px] font-black text-[#4E9F3D] uppercase tracking-tight leading-none">
          DAY 3 AGENDA — 23 AUGUST 2026
        </h2>
        <p className="text-[11px] font-bold text-[#5F6B7A] mt-1.5">
          6 Insightful Sessions &nbsp;|&nbsp; 1 Powerful Day
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1 border border-[#E2E8F0] rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0B2C66] text-white">
              <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Time</th>
              <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Session</th>
              <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Topic</th>
              <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Speaker</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {agendaData.map((item, index) => (
              <tr key={index} className="group hover:bg-[#F8FFF8] transition-colors">
                {/* Time */}
                <td className="px-4 py-4 align-middle min-w-[150px]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#A0AEC0] shrink-0" />
                    <span className="text-[11px] font-black text-[#4A5568] leading-tight whitespace-nowrap">{item.time}</span>
                  </div>
                </td>

                {/* Session */}
                <td className="px-4 py-4 align-middle min-w-[90px]">
                  <div className="flex flex-col gap-0">
                    <span className="text-[10px] font-black text-[#0B2C66] uppercase leading-tight">{item.session}</span>
                    <span className="text-[9px] font-black text-[#4E9F3D] uppercase tracking-wide">{item.type}</span>
                  </div>
                </td>

                {/* Topic */}
                <td className="px-4 py-4 align-middle">
                  <div className="space-y-0.5">
                    <p className="text-[12px] font-black text-[#0B2C66] leading-snug">{item.topic}</p>
                    <p className="text-[11px] text-[#718096] font-medium leading-snug">{item.description}</p>
                  </div>
                </td>

                {/* Speaker */}
                <td className="px-4 py-4 align-middle min-w-[180px]">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.speaker.image}
                      alt={item.speaker.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[12px] font-black text-[#0B2C66]">{item.speaker.name}</span>
                      <span className="text-[10px] font-bold text-[#5F6B7A]">{item.speaker.role}</span>
                      <span className="text-[10px] font-bold text-[#718096]">{item.speaker.company}</span>
                    </div>
                    <span className="text-[16px] ml-1 shrink-0">{item.speaker.flag}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-[#A0AEC0] font-bold uppercase tracking-widest mt-3">
        * Agenda is subject to change
      </p>
    </div>
  );
};

export default Day3Agenda;
