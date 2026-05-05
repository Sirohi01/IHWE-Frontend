import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, ChevronRight, Loader2, Calendar } from "lucide-react";
import amconImage from "../../assets/amanconfre.png";
import { agendaApi } from "../../lib/api";

interface Session {
  time: string;
  topic: string;
  speakers: string;
  type: string;
}

interface AgendaDay {
  _id: string;
  day: string;
  shortTitle: string;
  sessions: Session[];
}

const ConferenceAgenda: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [agendaData, setAgendaData] = useState<AgendaDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const data = await agendaApi.get();
        setAgendaData(data);
      } catch (error) {
        console.error("Error fetching agenda:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  if (loading) {
    return (
      <div className="py-10 flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-[#1E88E5] animate-spin mb-4" />
        <p className="text-[#5F6B7A] font-medium">Loading Agenda...</p>
      </div>
    );
  }

  if (agendaData.length === 0) {
    return null;
  }

  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-[1380px] relative left-[20px] px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h2 className="text-[24px] font-[900] text-[#0B2C66] uppercase tracking-tight">
              CONFERENCE <span className="text-[#1E88E5]">AGENDA</span>
            </h2>
            <div className="h-1 w-20 bg-[#4E9F3D] mt-2 rounded-full" />
          </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Visual - Fixed Height */}
          <div className="hidden lg:block w-[380px] flex-shrink-0">
            <div className="w-full h-[520px] rounded-[24px] overflow-hidden shadow-lg border border-[#E2E8F0]">
              <img
                src={amconImage}
                alt="Agenda visual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content - Matching Height */}
          <div className="flex-1 flex flex-col h-[520px]">
            {/* Day Tabs */}
            <div className="bg-[#F8FAFC] p-1.5 rounded-[20px] border border-[#E2E8F0] mb-4 flex gap-2">
              {agendaData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-[16px] transition-all duration-300 ${activeDay === index
                    ? "bg-[#4E9F3D] text-white shadow-md"
                    : "hover:bg-white/50 text-[#5F6B7A]"
                    }`}
                >
                  <div className={`p-2 rounded-lg ${activeDay === index ? "bg-white/20" : "bg-white"}`}>
                    <Calendar className={`w-5 h-5 ${activeDay === index ? "text-white" : "text-[#4E9F3D]"}`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-[10px] font-black uppercase tracking-wider mb-0.5 ${activeDay === index ? "text-white/80" : "text-[#1E88E5]"}`}>
                      {item.day}
                    </p>
                    <p className={`text-[13px] font-bold leading-tight ${activeDay === index ? "text-white" : "text-[#1C2B3A]"}`}>
                      {item.shortTitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Agenda List Container - Scrollable */}
            <div className="flex-1 bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto agenda-scroll">
                <style>{`
                  .agenda-scroll::-webkit-scrollbar { width: 4px; }
                  .agenda-scroll::-webkit-scrollbar-track { background: transparent; }
                  .agenda-scroll::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
                `}</style>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDay}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="divide-y divide-[#F1F5F9]"
                  >
                    {agendaData[activeDay]?.sessions?.map((session, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 px-6 py-4 hover:bg-[#F8FAFC] transition-colors"
                      >
                        {/* Time */}
                        <div className="w-[140px] flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#4E9F3D]" />
                            <span className="text-[13px] font-medium text-[#1C2B3A]">
                              {session.time}
                            </span>
                          </div>
                        </div>

                        {/* Session Topic */}
                        <div className="flex-1">
                          <p className="text-[13px] font-medium text-[#0B2C66] leading-snug">
                            {session.topic}
                          </p>
                        </div>

                        {/* Speaker & Type */}
                        <div className="flex items-center gap-3 text-[#5F6B7A] md:w-[280px] flex-shrink-0">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            <span className="text-[13px] font-medium truncate">{session.speakers}</span>
                          </div>
                          <span className="text-[#E2E8F0] font-light">|</span>
                          <span className="text-[13px] font-medium text-[#5F6B7A]">
                            {session.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="px-6 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                <p className="text-[11px] text-[#94A3B8] italic">
                  * Agenda is subject to change
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceAgenda;