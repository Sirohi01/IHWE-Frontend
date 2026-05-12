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

  // Different dark colors for each day button using #1B211A and #132440
  const getDayColors = (index: number) => {
    switch (index) {
      case 0: // Day 1 - Dark Theme 1 (#1B211A based)
        return {
          active: "bg-[#1B211A] text-white shadow-lg",
          inactive: "bg-[#2A3328] text-white/80 hover:bg-[#1B211A]",
          iconBg: "bg-white/20",
        };
      case 1: // Day 2 - Dark Theme 2 (#132440 based)
        return {
          active: "bg-[#132440] text-white shadow-lg",
          inactive: "bg-[#1E365C] text-white/80 hover:bg-[#132440]",
          iconBg: "bg-white/20",
        };
      case 2: // Day 3 - Mixed Dark Theme
        return {
          active: "bg-[#0F1A2E] text-white shadow-lg",
          inactive: "bg-[#1A2A45] text-white/80 hover:bg-[#0F1A2E]",
          iconBg: "bg-white/20",
        };
      default:
        return {
          active: "bg-[#1B211A] text-white shadow-lg",
          inactive: "bg-[#2A3328] text-white/80 hover:bg-[#1B211A]",
          iconBg: "bg-white/20",
        };
    }
  };

  // Static session data for preview
  const staticSessions: Session[] = [
    {
      time: "10:00 AM - 10:45 AM",
      topic: "Inaugural Keynote - Future of Global Healthcare",
      speakers: "Dr. Randal Pinkett",
      type: "Keynote"
    },
    {
      time: "11:00 AM - 11:45 AM",
      topic: "Smart Hospitals & Digital Transformation",
      speakers: "Dr. Maria Neira",
      type: "Panel"
    },
    {
      time: "12:00 PM - 12:45 PM",
      topic: "Medical Devices & Innovation Showcase",
      speakers: "Industry Experts",
      type: "Expert Talk"
    },
    {
      time: "02:00 PM - 02:45 PM",
      topic: "AI, HealthTech & Digital Health Solutions",
      speakers: "Dr. Devi Shetty",
      type: "Panel"
    },
    {
      time: "03:00 PM - 03:45 PM",
      topic: "Diagnostics, Labs & Precision Medicine",
      speakers: "Industry Experts",
      type: "Expert Talk"
    }
  ];

  if (loading) {
    return (
      <div className="py-2 flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-[#1E88E5] animate-spin mb-4" />
        <p className="text-[#5F6B7A] font-medium">Loading Agenda...</p>
      </div>
    );
  }


  const displayData = agendaData.length > 0 ? agendaData : [
    {
      _id: "1",
      day: "DAY 1",
      shortTitle: "Healthcare Summit",
      sessions: staticSessions
    }
  ];

  return (
    <section className="bg-white overflow-hidden -mt-4">
      <div className="mx-auto max-w-[1340px] pl-8 lg:pl-3 py-1">

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-[30px] font-[900] text-[#0B2C66] uppercase tracking-tight">
              CONFERENCE <span className="text-[#1E88E5]">AGENDA</span>
            </h2>
            <div className="h-1 w-20 bg-[#4E9F3D] mt-2 rounded-full justify-center" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="hidden lg:block w-[380px] flex-shrink-0">
            <div className="w-full h-[520px] rounded-[24px] overflow-hidden shadow-lg border border-[#E2E8F0]">
              <img
                src={amconImage}
                alt="Agenda visual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col h-[520px] ">

            <div className="bg-[#F8FAFC] p-0 rounded-[20px] border border-[#E2E8F0] mb-4 flex gap-3">
              {displayData.map((item, index) => {
                const isActive = activeDay === index;
                const colors = getDayColors(index);

                return (
                  <button
                    key={index}
                    onClick={() => setActiveDay(index)}
                    className={`flex-1 flex items-center gap-3 px-6 py-4 rounded-[16px] transition-all duration-300 ${isActive ? colors.active : colors.inactive
                      }`}
                  >
                    <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-black uppercase tracking-wider text-white/90 mb-1">
                        {item.day}
                      </p>
                      <p className="text-[16px] font-extrabold leading-tight text-white">
                        {item.shortTitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>


            <div className="rounded-[16px]  border border-[#E2E8F0] overflow-hidden" style={{ backgroundColor: '#F5F5F0' }}>
              <style dangerouslySetInnerHTML={{
                __html: `
                .agenda-scroll::-webkit-scrollbar {
                  display: none;
                }
                .agenda-scroll {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}} />

              <div className="h-[380px] overflow-y-auto agenda-scroll py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDay}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="divide-y divide-[#E8E8E0]"
                  >
                    {displayData[activeDay]?.sessions?.map((session, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 px-6 py-4 hover:bg-[#EBEBE5] transition-colors"
                        style={{ backgroundColor: 'transparent' }}
                      >

                        <div className="w-[140px] shrink-0">
                          <div className="flex items-center gap-2">

                            <span className="text-[13px] font-medium text-[#374151]">
                              {session.time}
                            </span>
                          </div>
                        </div>


                        <div className="flex-1 min-w-[200px]">
                          <p className="text-[14px] font-semibold text-[#0B2C66] leading-snug">
                            {session.topic}
                          </p>
                        </div>


                        <div className="flex items-center justify-between gap-4 md:w-[320px] shrink-0">

                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-6 h-6 rounded-full bg-[#E8E8E0] flex items-center justify-center shrink-0 border border-[#D1D1C6]">
                              <User className="w-3.5 h-3.5 text-[#6B7280]" />
                            </div>
                            <span className="text-[13px] font-medium text-[#6B7280] truncate">
                              {session.speakers || "-"}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="h-4 w-[1px] bg-[#D1D1C6]" />
                            <div className="w-[100px] text-right">
                              <span className="text-[11px] font-bold text-[#4E9F3D] uppercase tracking-wider">
                                {session.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="px-6 py-3 bg-[#EBEBE5] border-t border-[#E2E8F0]">

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceAgenda;