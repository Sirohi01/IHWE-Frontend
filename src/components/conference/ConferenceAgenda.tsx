
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, ChevronRight, Loader2 } from "lucide-react";
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

const typeColors: Record<string, string> = {
  Keynote: "bg-[#F7F9FC] text-[#1C2B3A] border border-[#E6ECF3]",
  Panel: "bg-[#F7F9FC] text-[#1C2B3A] border border-[#E6ECF3]",
  "Expert Talk": "bg-[#F7F9FC] text-[#1C2B3A] border border-[#E6ECF3]",
  Networking: "bg-[#F7F9FC] text-[#1C2B3A] border border-[#E6ECF3]",
};

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
      <div className="py-20 flex flex-col items-center justify-center bg-[#F7F9FC]">
        <Loader2 className="w-10 h-10 text-[#1E88E5] animate-spin mb-4" />
        <p className="text-[#5F6B7A] font-medium">Loading Agenda...</p>
      </div>
    );
  }

  if (agendaData.length === 0) {
    return null; // Or show a fallback message
  }

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

            {/* Agenda table with vertical scroll for long lists */}
            <div className="bg-white rounded-[16px] border border-[#E6ECF3] overflow-hidden">
              <style dangerouslySetInnerHTML={{ __html: `
                .agenda-scroll::-webkit-scrollbar {
                  display: none;
                }
                .agenda-scroll {
                  -ms-overflow-style: none;  /* IE and Edge */
                  scrollbar-width: none;  /* Firefox */
                }
              `}} />

              <div className="max-h-[380px] overflow-y-auto agenda-scroll">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDay}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                    className="divide-y divide-[#F1F1F1] pb-10"
                  >
                    {agendaData[activeDay]?.sessions?.map((session, idx) => (
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