import React, { useState } from "react";
import { Check, Calendar, Users, Lightbulb, BookOpen } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface SelectedSession {
  _id: string;
  number: string;
  time: string;
  title: string;
  price: number;
  date: string;
  day: string;
}

interface SessionSelectionProps {
  activeDay: string | number;
  setActiveDay: (day: string | number) => void;
  selectedSessions: SelectedSession[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<SelectedSession[]>>;
  selectedPasses: any[];
  setSelectedPasses: React.Dispatch<React.SetStateAction<any[]>>;
}

const SessionSelection: React.FC<SessionSelectionProps> = ({
  activeDay,
  setActiveDay,
  selectedSessions,
  setSelectedSessions,
  selectedPasses,
  setSelectedPasses,
}) => {
  const [dayData, setDayData] = useState<any[]>([]);
  const [sessionsData, setSessionsData] = useState<Record<string, any[]>>({});
  const [passesData, setPassesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${API_URL}/delegate-config/public`);
        const json = await res.json();
        if (json.success) {
          const fetchedDays = json.data.days || [];
          const fetchedPasses = json.data.passes || [];
          setDayData(fetchedDays);
          setPassesData(fetchedPasses);
          if (fetchedDays.length > 0 && !activeDay) {
            setActiveDay(fetchedDays[0]._id);
          }
          
          const sessionMap: Record<string, any[]> = {};
          fetchedDays.forEach((d: any) => {
            sessionMap[d._id] = d.sessions || [];
          });
          setSessionsData(sessionMap);
        }
      } catch (err) {
        console.error("Error fetching delegate config:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading sessions...</div>;
  }

  const toggleSession = (session: any, day: any) => {
    setSelectedSessions((prev) => {
      const exists = prev.find((s) => s._id === session._id);
      if (exists) {
        return prev.filter((s) => s._id !== session._id);
      } else {
        return [...prev, { ...session, date: day.date, day: day.day }];
      }
    });
  };

  const togglePass = (pass: any, day: any) => {
    setSelectedPasses((prev) => {
      const exists = prev.find((p) => p._id === pass._id);
      if (exists) {
        return prev.filter((p) => p._id !== pass._id);
      } else {
        return [...prev, { ...pass, date: day.date, day: day.day }];
      }
    });
  };

  const currentDay = dayData.find((d) => d._id === activeDay) || dayData[0];

  return (
    <div className="w-full">
      <h2 className="text-[15px] font-black text-[#143111] uppercase tracking-tight mb-4">
        STEP 1: CHOOSE DAY & SESSION
      </h2>

      {/* Day Cards - Compact */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        {dayData.map((day, index) => (
          <button
            key={day._id}
            onClick={() => setActiveDay(day._id)}
            className={`relative flex flex-col p-2 sm:p-3 rounded-xl border-2 transition-all text-left ${activeDay === day._id
              ? "bg-[#143111] border-[#143111] text-white shadow-md"
              : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
              }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <Calendar className={`w-3 h-3 sm:w-4 sm:h-4 ${activeDay === day._id ? "text-white" : "text-gray-300"}`} />
              <span className="text-[11px] sm:text-[14px] font-black uppercase">DAY {index + 1}</span>
            </div>
            <div className="text-[9px] sm:text-[11px] font-bold uppercase tracking-tight opacity-80 leading-none mb-0.5 sm:mb-0">{day.date}</div>
            <div className="text-[8px] sm:text-[10px] font-medium opacity-60 uppercase leading-none">{day.day}</div>
          </button>
        ))}
      </div>

      {/* Divider - Compact */}
      <div className="relative flex items-center justify-center mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative bg-[#F8FAFC]/30 px-3 sm:px-4 flex items-center gap-1.5 text-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#143111] shrink-0" />
          <span className="text-[9px] sm:text-[12px] font-black text-[#143111] uppercase tracking-[0.1em] leading-tight">
            DAY {dayData.findIndex(d => d._id === activeDay) + 1} – {currentDay?.title}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#143111] shrink-0" />
        </div>
      </div>

      {/* Sessions List - Compact Cards */}
      <div className="space-y-3 mb-6">
        {sessionsData[activeDay]?.map((session) => {
          const isSelected = selectedSessions.some((s) => s._id === session._id);
          return (
          <div
            key={session._id}
            onClick={() => toggleSession(session, currentDay)}
            className="flex flex-col sm:flex-row items-stretch bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-full sm:w-[80px] bg-[#143111] p-3 flex flex-row sm:flex-col justify-between sm:justify-center items-center text-white shrink-0 gap-2 sm:gap-0">
              <div className="flex sm:flex-col items-center sm:justify-center gap-1.5 sm:gap-0">
                <span className="text-[8px] font-bold opacity-60 uppercase">SESSION</span>
                <span className="text-[16px] sm:text-[24px] font-black leading-none">{session.number}</span>
              </div>
              <div className="text-[10px] sm:text-[9px] font-bold opacity-80 text-right sm:text-center leading-tight">
                {session.time}
              </div>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-gray-50">
              <h3 className="text-[14px] sm:text-[15px] font-black text-[#143111] leading-tight mb-1 group-hover:text-green-800 transition-colors">
                {session.title}
              </h3>
              <p className="text-[12px] text-gray-500 font-medium leading-tight max-w-[450px]">
                {session.description}
              </p>
            </div>
            <div className="w-full sm:w-[110px] p-3 sm:p-4 flex flex-row sm:flex-col items-center justify-between sm:justify-center bg-gray-50/20 gap-2 sm:gap-0">
              <div className="text-[16px] sm:text-[18px] font-black text-[#143111]">₹500</div>
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded border-2 flex items-center justify-center transition-all ${isSelected ? "bg-[#143111] border-[#143111]" : "bg-white border-gray-200"
                }`}>
                {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
              </div>
            </div>
          </div>
        )})}
      </div>

      {passesData.filter(p => p.passKey === "all_day").map((p) => (
        <div key={p._id}
          onClick={() => togglePass({ _id: p._id, title: `${p.title} - Day ${currentDay?.day || ''}`, price: p.price }, currentDay)}
          className={`flex flex-col sm:flex-row items-stretch rounded-xl border-2 transition-all cursor-pointer group ${selectedPasses.some(s => s._id === p._id) ? "bg-[#F1F8EE] border-[#143111]" : "bg-white border-[#143111]/10"
            }`}
        >
          <div className="w-full sm:w-[80px] p-3 sm:p-4 flex flex-row sm:flex-col items-center justify-center text-[#143111] shrink-0 bg-[#F1F8EE] sm:bg-transparent">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#F1F8EE] flex items-center justify-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="flex-grow p-4 flex flex-col justify-center border-b sm:border-b-0">
            <div className="flex items-center gap-3 mb-1.5">
              <h3 className="text-[14px] sm:text-[15px] font-black text-[#143111] uppercase tracking-tight">
                {p.title} – DAY {currentDay?.day || ''}
              </h3>
              <span className="px-2 py-0.5 bg-[#143111] text-white text-[8px] font-black uppercase rounded">
                POPULAR
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {p.perks.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-700">
                  <Check className="w-3 h-3 text-green-600" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full sm:w-[110px] p-3 sm:p-4 flex flex-row sm:flex-col items-center justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-gray-100 gap-2 sm:gap-0">
            <div className="text-[16px] sm:text-[18px] font-black text-[#143111]">₹{p.price}</div>
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded border-2 flex items-center justify-center transition-all ${selectedPasses.some(s => s._id === p._id) ? "bg-[#143111] border-[#143111]" : "bg-white border-gray-200"
              }`}>
              {selectedPasses.some(s => s._id === p._id) && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
            </div>
          </div>
        </div>
      ))}

      <div className="mt-8">
        <h2 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.1em] mb-3">OTHER OPTIONS</h2>
        <div className="space-y-3">
          {passesData.filter(p => p.passKey !== "all_day").map(p => {
            const isFullPass = p.passKey === 'full_pass';
            const Icon = isFullPass ? Calendar : BookOpen;
            const bgClass = isFullPass ? "bg-[#0B2C66]" : "bg-[#6A3DF0]";
            const borderClass = isFullPass ? "border-[#0B2C66]" : "border-[#6A3DF0]";
            const textClass = isFullPass ? "text-[#0B2C66]" : "text-[#6A3DF0]";
            const shadowClass = isFullPass ? "shadow-blue-900/5" : "shadow-purple-900/5";
            const checkBorderClass = isFullPass ? "border-green-500" : "border-purple-400";
            const checkColorClass = isFullPass ? "text-green-600" : "text-purple-600";
            const fakeDayData = isFullPass ? { date: "All Days", day: "" } : { date: "Any 1 Day", day: "" };

            return (
              <div key={p._id}
                onClick={() => togglePass({ _id: p._id, title: p.title, price: p.price }, fakeDayData)}
                className={`flex flex-col sm:flex-row items-stretch rounded-xl border border-gray-200 transition-all cursor-pointer group bg-white ${selectedPasses.some(s => s._id === p._id) ? `${borderClass} shadow-md ${shadowClass}` : ""
                  }`}
              >
                <div className={`w-full sm:w-[80px] ${bgClass} p-3 flex flex-row sm:flex-col items-center justify-center text-white shrink-0 rounded-t-[10px] sm:rounded-tr-none sm:rounded-l-[10px]`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 opacity-40 animate-pulse" />
                </div>
                <div className="flex-grow p-4 flex flex-col justify-center border-b sm:border-b-0">
                  <h3 className={`text-[13px] sm:text-[14px] font-black ${textClass} uppercase tracking-tight`}>
                    {p.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase mt-0.5 mb-3">{p.subtitle}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {p.perks.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-gray-700">
                        <div className={`w-4 h-4 rounded-full border ${checkBorderClass} flex items-center justify-center shrink-0`}>
                          <Check className={`w-2.5 h-2.5 ${checkColorClass} stroke-[4]`} />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full sm:w-[140px] p-3 sm:p-4 flex flex-row sm:flex-col items-center justify-between sm:justify-center border-l border-gray-50 bg-gray-50/10 gap-2 sm:gap-0">
                  <div className={`text-[18px] sm:text-[20px] font-black ${textClass} leading-none`}>₹{p.price}</div>
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded border-2 flex items-center justify-center transition-all ${selectedPasses.some(s => s._id === p._id) ? `${bgClass} ${borderClass}` : "bg-white border-gray-200"
                    }`}>
                    {selectedPasses.some(s => s._id === p._id) && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Banner - Compact */}
      <div className="mt-6 bg-[#FFF8EE] border border-[#FF9800]/20 rounded-xl p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#FF9800]/10 flex items-center justify-center shrink-0">
          <Lightbulb className="w-4 h-4 text-[#FF9800]" />
        </div>
        <p className="text-[12px] font-bold text-[#855B1C]">
          Select any option from above to continue with your registration.
        </p>
      </div>
    </div>
  );
};

export default SessionSelection;
