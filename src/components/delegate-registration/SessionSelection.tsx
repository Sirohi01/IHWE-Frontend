import React, { useState } from "react";
import { Check, Calendar, Users, Lightbulb, BookOpen } from "lucide-react";

const SessionSelection: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);

  const dayData = [
    { id: 1, date: "21 AUG 2026", day: "Thu", title: "HEALTHCARE INNOVATION SUMMIT" },
    { id: 2, date: "22 AUG 2026", day: "Fri", title: "GLOBAL WELLNESS LEADERSHIP FORUM" },
    { id: 3, date: "23 AUG 2026", day: "Sat", title: "WELLNESS & AYUSH LEADERSHIP FORUM" },
  ];

  const sessionsData: Record<number, any[]> = {
    1: [
      { id: "d1s1", number: "1", time: "10:00 AM – 11:30 AM", title: "Smart Hospitals & Digital Transformation", description: "Exploring the future of smart hospitals, digital health platforms.", price: 500 },
      { id: "d1s2", number: "2", time: "12:00 PM – 01:30 PM", title: "Medical Devices & Innovation", description: "Latest trends in medical devices and modern healthcare.", price: 500 },
      { id: "d1s3", number: "3", time: "02:30 PM – 04:00 PM", title: "Diagnostics & Precision Medicine", description: "Advances in diagnostics, precision medicine and treatment.", price: 500 },

    ],
    2: [
      { id: "d2s1", number: "1", time: "10:00 AM – 11:30 AM", title: "Wellness Economy & Global Opportunities", description: "Market trends and global prospects in the wellness sector.", price: 500 },
      { id: "d2s2", number: "2", time: "12:00 PM – 01:30 PM", title: "Ayurveda, AYUSH & Holistic Healing", description: "Traditional wisdom meets modern evidence-based practices.", price: 500 },
      { id: "d2s3", number: "3", time: "02:30 PM – 04:00 PM", title: "Fitness, Preventive Health & Lifestyle", description: "The core pillars of modern wellness and preventive care.", price: 500 },

    ],
    3: [
      { id: "d3s1", number: "1", time: "10:00 AM – 11:30 AM", title: "Ayurveda & Traditional Wisdom", description: "Deep dive into ancient healing systems and their relevance.", price: 500 },
      { id: "d3s2", number: "2", time: "12:00 PM – 01:30 PM", title: "Nutrition, Diet & Lifestyle", description: "Personalized nutrition and dietary habits for longevity.", price: 500 },
      { id: "d3s3", number: "3", time: "02:30 PM – 04:00 PM", title: "Yoga, Mental Health & Wellness", description: "Holistic approaches to mental well-being and yoga practices.", price: 500 },

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
      <h2 className="text-[15px] font-black text-[#143111] uppercase tracking-tight mb-4">
        STEP 1: CHOOSE DAY & SESSION
      </h2>

      {/* Day Cards - Compact */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {dayData.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`relative flex flex-col p-3 rounded-xl border-2 transition-all text-left ${activeDay === day.id
              ? "bg-[#143111] border-[#143111] text-white shadow-md"
              : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
              }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar className={`w-4 h-4 ${activeDay === day.id ? "text-white" : "text-gray-300"}`} />
              <span className="text-[14px] font-black uppercase">DAY {day.id}</span>
            </div>
            <div className="text-[11px] font-bold uppercase tracking-tight opacity-80">{day.date}</div>
            <div className="text-[10px] font-medium opacity-60 uppercase">{day.day}</div>
          </button>
        ))}
      </div>

      {/* Divider - Compact */}
      <div className="relative flex items-center justify-center mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative bg-[#F8FAFC]/30 px-4 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#143111]" />
          <span className="text-[12px] font-black text-[#143111] uppercase tracking-[0.1em]">
            DAY {activeDay} – {currentDay.title}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#143111]" />
        </div>
      </div>

      {/* Sessions List - Compact Cards */}
      <div className="space-y-3 mb-6">
        {sessionsData[activeDay]?.map((session) => (
          <div
            key={session.id}
            onClick={() => toggleSession(session.id)}
            className="flex items-stretch bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-[80px] bg-[#143111] p-3 flex flex-col justify-center items-center text-white shrink-0">
              <div className="text-[8px] font-bold opacity-60 uppercase mb-0.5">SESSION</div>
              <div className="text-[24px] font-black leading-none mb-1">{session.number}</div>
              <div className="text-[9px] font-bold opacity-80 text-center leading-tight">{session.time}</div>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center border-r border-gray-50">
              <h3 className="text-[15px] font-black text-[#143111] leading-tight mb-1 group-hover:text-green-800 transition-colors">
                {session.title}
              </h3>
              <p className="text-[12px] text-gray-500 font-medium leading-tight max-w-[450px]">
                {session.description}
              </p>
            </div>
            <div className="w-[110px] p-4 flex flex-col items-center justify-center bg-gray-50/20">
              <div className="text-[18px] font-black text-[#143111]">₹500</div>
              <div className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all ${selectedSessions.includes(session.id) ? "bg-[#143111] border-[#143111]" : "bg-white border-gray-200"
                }`}>
                {selectedSessions.includes(session.id) && <Check className="w-4 h-4 text-white stroke-[3]" />}
              </div>
            </div>
          </div>
        ))}

        {/* All Sessions Card - Compact */}
        <div
          onClick={() => toggleSession(`all_day_${activeDay}`)}
          className={`flex items-stretch rounded-xl border-2 transition-all cursor-pointer group ${selectedSessions.includes(`all_day_${activeDay}`) ? "bg-[#F1F8EE] border-[#143111]" : "bg-white border-[#143111]/10"
            }`}
        >
          <div className="w-[80px] p-4 flex items-center justify-center text-[#143111] shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#F1F8EE] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-1.5">
              <h3 className="text-[15px] font-black text-[#143111] uppercase tracking-tight">
                ALL 3 SESSIONS – DAY {activeDay}
              </h3>
              <span className="px-2 py-0.5 bg-[#143111] text-white text-[8px] font-black uppercase rounded">
                POPULAR
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {["All Sessions Access", "Delegate Kit", "Certificate", "Lunch (Thali)"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-700">
                  <Check className="w-3 h-3 text-green-600" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[110px] p-4 flex flex-col items-center justify-center border-l border-gray-100">
            <div className="text-[18px] font-black text-[#143111]">₹1200</div>
            <div className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all ${selectedSessions.includes(`all_day_${activeDay}`) ? "bg-[#143111] border-[#143111]" : "bg-white border-gray-200"
              }`}>
              {selectedSessions.includes(`all_day_${activeDay}`) && <Check className="w-4 h-4 text-white stroke-[3]" />}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.1em] mb-3">OTHER OPTIONS</h2>
        <div className="space-y-3">

          {/* Full Access Pass - Compact */}
          <div
            onClick={() => toggleSession("full_pass")}
            className={`flex items-stretch rounded-xl border border-gray-200 transition-all cursor-pointer group bg-white ${selectedSessions.includes("full_pass") ? "border-[#0B2C66] shadow-md shadow-blue-900/5" : ""
              }`}
          >
            <div className="w-[80px] bg-[#0B2C66] p-4 flex items-center justify-center text-white shrink-0 rounded-l-[10px]">
              <Calendar className="w-7 h-7 opacity-40" />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h3 className="text-[14px] font-black text-[#0B2C66] uppercase tracking-tight">
                ALL 3 DAYS – FULL ACCESS PASS
              </h3>
              <p className="text-[11px] font-bold text-gray-500 uppercase mt-0.5 mb-3">(DAY 1 + DAY 2 + DAY 3)</p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {[
                  "All Sessions (3 Days)",
                  "Delegate Kit",
                  "Certificate",
                  "Lunch (All Days)"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-gray-700">
                    <div className="w-4 h-4 rounded-full border border-green-500 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-green-600 stroke-[4]" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[140px] p-4 flex flex-col items-center justify-center border-l border-gray-50 bg-gray-50/10">
              <div className="text-[24px] font-black text-[#0B2C66] leading-none mb-1">₹3000</div>
              <div className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all ${selectedSessions.includes("full_pass") ? "bg-[#0B2C66] border-[#0B2C66]" : "bg-white border-gray-200"
                }`}>
                {selectedSessions.includes("full_pass") && <Check className="w-4 h-4 text-white stroke-[3]" />}
              </div>
            </div>
          </div>

          {/* Paper Presentation Pass - Compact */}
          <div
            onClick={() => toggleSession("paper_pass")}
            className={`flex items-stretch rounded-xl border border-gray-200 transition-all cursor-pointer group bg-white ${selectedSessions.includes("paper_pass") ? "border-[#6A3DF0] shadow-md shadow-purple-900/5" : ""
              }`}
          >
            <div className="w-[80px] bg-[#6A3DF0] p-4 flex items-center justify-center text-white shrink-0 rounded-l-[10px]">
              <BookOpen className="w-7 h-7 opacity-40" />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h3 className="text-[14px] font-black text-[#6A3DF0] uppercase tracking-tight">
                PAPER PRESENTATION PASS
              </h3>
              <p className="text-[11px] font-bold text-gray-500 uppercase mt-0.5 mb-3">(ANY 1 DAY – 2 SESSIONS)</p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {[
                  "Access to 2 Sessions",
                  "Presentation Opportunity",
                  "Certificate (Paper)",
                  "Lunch + Delegate Kit"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-gray-700">
                    <div className="w-4 h-4 rounded-full border border-purple-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-purple-600 stroke-[4]" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[140px] p-4 flex flex-col items-center justify-center border-l border-gray-50 bg-gray-50/10">
              <div className="text-[24px] font-black text-[#6A3DF0] leading-none mb-1">₹3000</div>
              <div className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all ${selectedSessions.includes("paper_pass") ? "bg-[#6A3DF0] border-[#6A3DF0]" : "bg-white border-gray-200"
                }`}>
                {selectedSessions.includes("paper_pass") && <Check className="w-4 h-4 text-white stroke-[3]" />}
              </div>
            </div>
          </div>
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
