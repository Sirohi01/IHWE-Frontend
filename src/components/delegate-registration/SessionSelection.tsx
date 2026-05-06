import React, { useState } from "react";
import { Check, Calendar, Users, Lightbulb, BookOpen } from "lucide-react";

const SessionSelection: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);

  const dayData = [
    { id: 1, date: "21 AUGUST 2026", day: "Thursday", title: "HEALTHCARE INNOVATION SUMMIT" },
    { id: 2, date: "22 AUGUST 2026", day: "Friday", title: "AYUSH & WELLNESS CONCLAVE" },
    { id: 3, date: "23 AUGUST 2026", day: "Sesturday", title: "GLOBAL LEADERSHIP FORUM" },
  ];

  const sessionsData: Record<number, any[]> = {
    1: [
      { id: "d1s1", number: "1", time: "10:00 AM – 11:30 AM", title: "Smart Hospitals & Digital Transformation", description: "Exploring the future of smart hospitals, digital health platforms and technology-driven care.", price: 500 },
      { id: "d1s2", number: "2", time: "12:00 PM – 01:30 PM", title: "Medical Devices & Innovation", description: "Latest trends in medical devices, innovation and their impact on modern healthcare.", price: 500 },
      { id: "d1s3", number: "3", time: "02:30 PM – 04:00 PM", title: "Diagnostics & Precision Medicine", description: "Advances in diagnostics, precision medicine and personalized treatment approaches.", price: 500 },
    ],
    2: [
      { id: "d2s1", number: "1", time: "10:00 AM – 11:30 AM", title: "Ayush in Modern Healthcare", description: "Integrating traditional Ayush practices with contemporary medical systems.", price: 500 },
      { id: "d2s2", number: "2", time: "12:00 PM – 01:30 PM", title: "Wellness & Lifestyle Medicine", description: "The role of preventive care and holistic wellness in the global health landscape.", price: 500 },
    ],
    3: [
      { id: "d3s1", number: "1", time: "10:00 AM – 11:30 AM", title: "Healthcare Leadership & Policy", description: "Navigating global health policy and leadership challenges in the 21st century.", price: 500 },
    ],
  };

  const toggleSession = (sessionId: string) => {
    setSelectedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const currentDay = dayData.find((d) => d.id === activeDay)!;

  return (
    <div className="w-full">
      <h2 className="text-[18px] font-black text-[#143111] uppercase tracking-tight mb-6">
        STEP 1: CHOOSE DAY & SESSION
      </h2>

      {/* Day Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {dayData.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`relative flex flex-col p-6 rounded-2xl border-2 transition-all text-left ${
              activeDay === day.id
                ? "bg-[#143111] border-[#143111] text-white shadow-xl shadow-green-900/20"
                : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <Calendar className={`w-6 h-6 ${activeDay === day.id ? "text-white" : "text-gray-300"}`} />
              <span className="text-[20px] font-black">DAY {day.id}</span>
            </div>
            <div className="text-[13px] font-bold uppercase tracking-wide opacity-80">{day.date}</div>
            <div className="text-[12px] font-medium opacity-60 uppercase">{day.day}</div>
          </button>
        ))}
      </div>

      {/* Divider with Title */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative bg-[#F8FAFC]/30 px-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#143111]" />
          <span className="text-[14px] font-black text-[#143111] uppercase tracking-[0.15em]">
            DAY {activeDay} – {currentDay.title}
          </span>
          <div className="w-2 h-2 rounded-full bg-[#143111]" />
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-3 mb-8">
        {sessionsData[activeDay]?.map((session) => (
          <div 
            key={session.id}
            onClick={() => toggleSession(session.id)}
            className="flex items-stretch bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-[120px] bg-[#143111] p-6 flex flex-col justify-center items-center text-white shrink-0">
              <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-1">SESSION</div>
              <div className="text-[42px] font-black leading-none mb-2">{session.number}</div>
              <div className="text-[11px] font-bold opacity-80 text-center">{session.time}</div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center border-r border-gray-50">
              <h3 className="text-[18px] font-black text-[#143111] leading-tight mb-2 group-hover:text-green-800 transition-colors">
                {session.title}
              </h3>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-[550px]">
                {session.description}
              </p>
            </div>
            <div className="w-[160px] p-6 flex flex-col items-center justify-center bg-gray-50/30">
              <div className="text-[24px] font-black text-[#143111]">₹{session.price}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Per Person</div>
              <div className={`w-8 h-8 rounded border-2 flex items-center justify-center transition-all ${
                selectedSessions.includes(session.id) ? "bg-[#143111] border-[#143111]" : "bg-white border-gray-200"
              }`}>
                {selectedSessions.includes(session.id) && <Check className="w-5 h-5 text-white stroke-[3]" />}
              </div>
            </div>
          </div>
        ))}

        {/* All Sessions Card */}
        <div 
          onClick={() => toggleSession(`all_day_${activeDay}`)}
          className={`flex items-stretch rounded-2xl border-2 transition-all cursor-pointer group ${
            selectedSessions.includes(`all_day_${activeDay}`) ? "bg-[#F1F8EE] border-[#143111] shadow-md" : "bg-white border-[#143111]/20"
          }`}
        >
          <div className="w-[120px] p-6 flex items-center justify-center text-[#143111] shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#F1F8EE] flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-[18px] font-black text-[#143111] uppercase tracking-tight">
                ALL 3 SESSIONS – DAY {activeDay}
              </h3>
              <span className="px-3 py-1 bg-[#143111] text-white text-[10px] font-black uppercase tracking-wider rounded">
                MOST POPULAR
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {["All 3 Sessions Access", "Delegate Kit", "Participation Certificate", "Packed Lunch (Thali)"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[12px] font-bold text-gray-700">
                  <Check className="w-4 h-4 text-green-600" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[160px] p-6 flex flex-col items-center justify-center border-l border-gray-100">
            <div className="text-[24px] font-black text-[#143111]">₹1000</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Per Person</div>
            <div className={`w-8 h-8 rounded border-2 flex items-center justify-center transition-all ${
              selectedSessions.includes(`all_day_${activeDay}`) ? "bg-[#143111] border-[#143111]" : "bg-white border-gray-200"
            }`}>
              {selectedSessions.includes(`all_day_${activeDay}`) && <Check className="w-5 h-5 text-white stroke-[3]" />}
            </div>
          </div>
        </div>
      </div>

      {/* OTHER OPTIONS - EXACT LIKE IMAGE */}
      <div className="mt-8">
        <h2 className="text-[16px] font-black text-[#143111] uppercase tracking-tight mb-4">OTHER OPTIONS</h2>
        <div className="space-y-4">
          
          {/* Full Access Pass */}
          <div 
            onClick={() => toggleSession("full_pass")}
            className={`flex items-stretch rounded-xl border border-gray-200 transition-all cursor-pointer group bg-white hover:border-[#0B2C66]/30 ${
              selectedSessions.includes("full_pass") ? "border-[#0B2C66] shadow-lg shadow-blue-900/5" : ""
            }`}
          >
            <div className="w-[120px] bg-[#0B2C66] p-8 flex items-center justify-center text-white shrink-0 rounded-l-[11px]">
              <Calendar className="w-10 h-10" />
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center">
              <h3 className="text-[18px] font-black text-[#0B2C66] uppercase tracking-tight">
                ALL 3 DAYS – FULL ACCESS PASS
              </h3>
              <p className="text-[13px] font-bold text-gray-500 uppercase mt-1.5 mb-5">(DAY 1 + DAY 2 + DAY 3)</p>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[
                  "All Sessions Access (3 Days)",
                  "Delegate Kit",
                  "Participation Certificate",
                  "Packed Lunch (All Days)"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-[12px] font-bold text-gray-700">
                    <div className="w-5 h-5 rounded-full border border-green-500 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-600 stroke-[4]" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[180px] p-8 flex flex-col items-center justify-center border-l border-gray-50 bg-gray-50/10">
              <div className="text-[32px] font-black text-[#0B2C66] leading-none mb-1">₹2500</div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-6">Per Person</div>
              <div className={`w-8 h-8 rounded border-2 flex items-center justify-center transition-all ${
                selectedSessions.includes("full_pass") ? "bg-[#0B2C66] border-[#0B2C66] shadow-md shadow-blue-900/20" : "bg-white border-gray-200"
              }`}>
                {selectedSessions.includes("full_pass") && <Check className="w-5 h-5 text-white stroke-[3]" />}
              </div>
            </div>
          </div>

          {/* Paper Presentation Pass */}
          <div 
            onClick={() => toggleSession("paper_pass")}
            className={`flex items-stretch rounded-xl border border-gray-200 transition-all cursor-pointer group bg-white hover:border-[#6A3DF0]/30 ${
              selectedSessions.includes("paper_pass") ? "border-[#6A3DF0] shadow-lg shadow-purple-900/5" : ""
            }`}
          >
            <div className="w-[120px] bg-[#6A3DF0] p-8 flex items-center justify-center text-white shrink-0 rounded-l-[11px]">
              <BookOpen className="w-10 h-10" />
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center">
              <h3 className="text-[18px] font-black text-[#6A3DF0] uppercase tracking-tight">
                PAPER PRESENTATION PASS
              </h3>
              <p className="text-[13px] font-bold text-gray-500 uppercase mt-1.5 mb-5">(ANY 1 DAY – 2 SESSIONS)</p>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[
                  "Access to 2 Sessions (Any 1 Day)",
                  "Paper Presentation Opportunity",
                  "Certificate (Seminar + Paper Presentation)",
                  "Packed Lunch (Thali) + Delegate Kit"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-[12px] font-bold text-gray-700">
                    <div className="w-5 h-5 rounded-full border border-purple-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-purple-600 stroke-[4]" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[180px] p-8 flex flex-col items-center justify-center border-l border-gray-50 bg-gray-50/10">
              <div className="text-[32px] font-black text-[#6A3DF0] leading-none mb-1">₹2500</div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-6">Per Person</div>
              <div className={`w-8 h-8 rounded border-2 flex items-center justify-center transition-all ${
                selectedSessions.includes("paper_pass") ? "bg-[#6A3DF0] border-[#6A3DF0] shadow-md shadow-purple-900/20" : "bg-white border-gray-200"
              }`}>
                {selectedSessions.includes("paper_pass") && <Check className="w-5 h-5 text-white stroke-[3]" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-8 bg-[#FFF8EE] border border-[#FF9800]/20 rounded-xl p-4 flex items-center gap-4">
        <div className="bg-[#FF9800] p-2 rounded-lg">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <p className="text-[14px] font-bold text-[#855B1C]">
          Select any option from above to continue with your registration.
        </p>
      </div>
    </div>
  );
};

export default SessionSelection;
