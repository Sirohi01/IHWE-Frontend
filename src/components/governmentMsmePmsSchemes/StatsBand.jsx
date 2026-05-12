import React from 'react';
import { Users, Building2, Globe, Mic, Handshake } from 'lucide-react';

const StatsBand = () => {
  const stats = [
    { icon: Users, val: "8,000+", label: "VISITORS", desc: "Qualified trade visitors from India & across the globe", color: "#8cc63f" },
    { icon: Building2, val: "300+", label: "EXHIBITORS", desc: "Leading brands & organizations", color: "#00aef0" },
    { icon: Globe, val: "25+", label: "COUNTRIES", desc: "Global participation & representation", color: "#c8d400" },
    { icon: Mic, val: "100+", label: "SPEAKERS", desc: "Industry experts & thought leaders", color: "#a13ccf" },
    { icon: Handshake, val: "B2B", label: "MEETINGS", desc: "Pre-scheduled meetings that drive real business", color: "#f7931e" },
  ];

  return (
    <div className="px-16 w-full -mt-10 relative z-20 font-['Barlow',sans-serif]">
      <div
        className="rounded-2xl shadow-2xl border border-white/10 flex items-stretch py-5 px-4 overflow-hidden relative"
        style={{
          background: 'linear-gradient(160deg, #001635 0%, #01204e 50%, #001635 100%)',
          boxShadow: 'rgba(0, 22, 53, 0.5) 0px 20px 40px -10px, inset 0 0 40px rgba(0, 102, 255, 0.1)'
        }}
      >
        {/* Corner glow effect */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {stats.map((item, i) => (
          <React.Fragment key={i}>
            <div className="flex-1 flex flex-col items-center text-center cursor-default px-2">

              {/* TOP: Icon & Text Row */}
              <div className="flex items-center justify-center gap-3 mb-3.5">
                <div className="shrink-0 transition-transform duration-300 hover:scale-110" style={{ color: item.color }}>
                  <item.icon strokeWidth={1.8} size={34} />
                </div>
                <div className="flex flex-col items-start text-left min-w-0">
                  <span className="text-[20px] font-extrabold text-white leading-none tracking-tight">
                    {item.val}
                  </span>
                  <span className="text-[10px] font-black text-white tracking-widest uppercase mt-0.5 opacity-90">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* BOTTOM: Description centered */}
              <p className="text-[12px] font-medium text-gray-300 leading-tight px-1 text-center max-w-[180px] opacity-90">
                {item.desc}
              </p>

            </div>

            {/* Separator line */}
            {i < stats.length - 1 && (
              <div className="w-[1px] bg-white/15 self-stretch mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatsBand;
