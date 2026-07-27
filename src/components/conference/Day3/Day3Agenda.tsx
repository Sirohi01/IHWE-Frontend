import React from "react";
import { Clock } from "lucide-react";
import { SERVER_URL } from "@/lib/api";

interface Day3AgendaProps {
  data?: {
    title?: string;
    subtitle?: string;
    sessions: Array<{
      time: string;
      topic: string;
      description: string;
      type: string;
      speaker: {
        name: string;
        role: string;
        company: string;
        image: string;
        flag: string;
      };
    }>;
  };
  dayTitle?: string;
  dayNumber?: number;
}

const Day3Agenda: React.FC<Day3AgendaProps> = ({ data, dayTitle, dayNumber }) => {
  const sessions = Array.isArray(data?.sessions) ? data.sessions : [];

  return (
    <div className="bg-white h-full flex flex-col py-2 -mt-4" style={{ backgroundColor: '#F5F5F0' }}>

      <div className="text-center mb-5">
        <h2 className="text-[18px] md:text-[20px] font-black text-[#4E9F3D] uppercase tracking-tight leading-none font-sans">
          {data?.title || dayTitle || `DAY ${dayNumber || 3} AGENDA`}
        </h2>
        <p className="text-[11px] font-bold text-[#5F6B7A] mt-1.5">
          {data?.subtitle || `${sessions.length} Insightful Sessions &nbsp;|&nbsp; 1 Powerful Day`}
        </p>
      </div>


      <div className="-mt-4 overflow-x-auto flex-1 border border-[#E2E8F0] rounded-xl overflow-hidden max-h-[400px] overflow-y-scroll custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#0B2C66] text-white">
              <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Time</th>
              <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Session</th>
              <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Topic</th>
              <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest">Speaker</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {sessions.map((item, index) => {
              const speakerImg = item.speaker?.image
                ? (item.speaker.image.startsWith('http') ? item.speaker.image : `${SERVER_URL}${item.speaker.image}`)
                : "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100";

              return (
                <tr key={index} className="group hover:bg-[#F8FFF8] transition-colors">

                  <td className="px-4 py-2 align-middle min-w-[150px]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#A0AEC0] shrink-0" />
                      <span className="text-[11px] font-black text-[#4A5568] leading-tight whitespace-nowrap">{item.time}</span>
                    </div>
                  </td>


                  <td className="px-4 py-2 align-middle min-w-[90px]">
                    <div className="flex flex-col gap-0">
                      <span className="text-[10px] font-black text-[#0B2C66] uppercase leading-tight">SESSION {index + 1}</span>
                      <span className="text-[9px] font-black text-[#4E9F3D] uppercase tracking-wide">{item.type}</span>
                    </div>
                  </td>

                  <td className="px-4 py-2 align-middle">
                    <div className="space-y-0.5">
                      <p className="text-[12px] font-black text-[#0B2C66] leading-snug">{item.topic}</p>
                      <p className="text-[11px] text-[#718096] font-medium leading-snug">{item.description}</p>
                    </div>
                  </td>


                  <td className="px-4 py-2 align-middle min-w-[180px]">
                    <div className="flex items-center gap-3">
                      <img loading="lazy" decoding="async" src={speakerImg}
                        alt={item.speaker?.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                      />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[12px] font-black text-[#0B2C66]">{item.speaker?.name}</span>
                        <span className="text-[10px] font-bold text-[#5F6B7A]">{item.speaker?.role}</span>
                        <span className="text-[10px] font-bold text-[#718096]">{item.speaker?.company}</span>
                      </div>
                      {/* <span className="text-[16px] ml-1 shrink-0">{item.speaker?.flag || '🌐'}</span> */}
                    </div>
                  </td>
                </tr>
              );
            })}
            {sessions.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-400 italic text-xs">
                  No sessions scheduled for this day yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default Day3Agenda;



