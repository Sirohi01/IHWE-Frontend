import React from "react";
import { motion } from "framer-motion";
import {
  Flower2,
  Building2,
  Activity,
  Sparkles,
  Monitor,
  Users,
  Clock
} from "lucide-react";

const agendaData = [
  {
    time: "10:00 AM - 10:45 AM",
    session: "SESSION 1",
    type: "KEYNOTE",
    topic: "Wellness Economy & Global Opportunities",
    description: "The future of wellness industry and global market trends.",
    icon: Flower2,
    speaker: {
      name: "Dr. James Porter",
      role: "Global Wellness Economist",
      company: "International Wellness Institute",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      flag: "🇺🇸"
    }
  },
  {
    time: "11:00 AM - 11:45 AM",
    session: "SESSION 2",
    type: "PANEL",
    topic: "Ayurveda, AYUSH & Holistic Healing",
    description: "Ancient wisdom for modern health and natural healing approaches.",
    icon: Building2,
    speaker: {
      name: "Dr. Ananya Sharma",
      role: "Director - AYUSH Initiatives",
      company: "Ministry of AYUSH",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      flag: "🇮🇳"
    }
  },
  {
    time: "12:00 PM - 12:45 PM",
    session: "SESSION 3",
    type: "EXPERT TALK",
    topic: "Fitness, Preventive Health & Lifestyle Medicine",
    description: "Preventive care and lifestyle changes for long-term wellness.",
    icon: Activity,
    speaker: {
      name: "Dr. Michael Lee",
      role: "Lifestyle Medicine Specialist",
      company: "Harvard Medical School",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      flag: "🇺🇸"
    }
  },
  {
    time: "02:00 PM - 02:45 PM",
    session: "SESSION 4",
    type: "PANEL",
    topic: "Beauty, Personal Care & Wellness Innovation",
    description: "Clean beauty, wellness innovation and future trends.",
    icon: Sparkles,
    speaker: {
      name: "Ms. Sophia Laurent",
      role: "CEO, Global Beauty & Wellness",
      company: "L'Oreal Wellness",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      flag: "🇫🇷"
    }
  },
  {
    time: "03:00 PM - 03:45 PM",
    session: "SESSION 5",
    type: "EXPERT TALK",
    topic: "Organic Living, Nutrition & Sustainable Wellness",
    description: "Nutrition, natural living and sustainable wellness solutions.",
    icon: Monitor,
    speaker: {
      name: "Dr. Rajesh Nair",
      role: "Nutritionist & Wellness Expert",
      company: "WHO Advisor",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      flag: "🇮🇳"
    }
  },
  {
    time: "04:00 PM - 05:00 PM",
    session: "SESSION 6",
    type: "NETWORKING",
    topic: "Wellness Leaders Networking Session",
    description: "Connect with global wellness leaders, experts, and industry innovators.",
    icon: Users,
    speaker: {
      name: "Wellness Leaders",
      role: "Global Experts &",
      company: "Industry Leaders",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100",
      flag: "🌐"
    }
  }
];

const Day2Agenda: React.FC = () => {
  return (
    <section className="py-1 bg-[#F0FDF4]/50">
      <div className="container mx-auto px-6 max-w-[1320px]">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[18px] md:text-[20px] font-black text-[#4E9F3D] uppercase tracking-tight font-sans">
            DAY 2 AGENDA — 21 AUGUST 2026
          </h2>
          <p className="text-[11px] font-bold text-[#5F6B7A] uppercase tracking-[0.2em] mt-1 flex items-center justify-center gap-2">
            6 Insightful Sessions <span className="text-[#4E9F3D] font-black">+</span> 1 Powerful Day <span className="text-[#4E9F3D] font-black">+</span> Unlimited Opportunities
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B2C66] text-white">
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">Time</th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">Session</th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">Topic</th>
                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest">Speaker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {agendaData.map((item, index) => (
                  <tr key={index} className="transition-colors group hover:bg-gray-50/50">
                    {/* Time Column */}
                    <td className="px-4 py-3 align-top min-w-[180px]">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-[#A0AEC0]" />
                        <span className="text-[13px] font-black text-[#4A5568]">{item.time}</span>
                      </div>
                    </td>

                    {/* Session Column with Icon */}
                    <td className="px-4 py-3 align-top min-w-[160px]">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#4E9F3D] border border-[#DCFCE7] group-hover:bg-[#4E9F3D] group-hover:text-white transition-colors">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-black text-[#0B2C66] uppercase tracking-tight">{item.session}</span>
                          <span className="text-[9px] font-black text-[#4E9F3D] uppercase tracking-widest">
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Topic Column */}
                    <td className="px-4 py-3 align-top max-w-[400px]">
                      <div className="space-y-1">
                        <h3 className="text-[15px] font-black text-[#0B2C66] leading-snug">
                          {item.topic}
                        </h3>
                        <p className="text-[12px] text-[#718096] font-medium leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </td>

                    {/* Speaker Column */}
                    <td className="px-4 py-3 align-top min-w-[280px]">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.speaker.image}
                            alt={item.speaker.name}
                            className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm"
                          />
                          <div className="flex flex-col">
                            <span className="text-[14px] font-black text-[#0B2C66]">{item.speaker.name}</span>
                            <span className="text-[11px] font-bold text-[#5F6B7A] leading-tight mt-0.5">{item.speaker.role}</span>
                            <span className="text-[10px] font-bold text-[#718096] uppercase tracking-tight">{item.speaker.company}</span>
                          </div>
                        </div>
                        <span className="text-[18px] opacity-80">{item.speaker.flag}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-left text-[11px] text-[#A0AEC0] font-bold uppercase tracking-widest mt-6">
          * Agenda is subject to change
        </p>

      </div>
    </section>
  );
};

export default Day2Agenda;
