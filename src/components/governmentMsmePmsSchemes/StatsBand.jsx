import React, { useState, useEffect, useRef } from 'react';
import { useInView, animate } from "framer-motion";
import { Users, Building2, Globe, Mic, Handshake } from 'lucide-react';

// StatCounter component
const StatCounter = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Only count up if the string starts with a digit (e.g. "8,000+", "40+", etc.)
    const isNumeric = /^[0-9]/.test(value);
    if (!isNumeric) {
        return <span ref={ref}>{value}</span>;
    }

    const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9,]/g, '');

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, numericValue, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(v) {
                    setDisplayValue(Math.floor(v));
                },
            });
            return () => controls.stop();
        }
    }, [isInView, numericValue]);

    return (
        <span ref={ref}>
            {displayValue.toLocaleString()}{suffix}
        </span>
    );
};

const StatsBand = () => {
  const stats = [
    { icon: Users, val: "8,000+", label: "VISITORS", desc: "Qualified trade visitors from India & across the globe", color: "#8cc63f" },
    { icon: Building2, val: "150+", label: "EXHIBITORS", desc: "Leading brands & organizations", color: "#00aef0" },
    { icon: Globe, val: "1,000+", label: "GLOBAL BUYERS", desc: "Global participation & representation", color: "#c8d400" },
    { icon: Mic, val: "40+", label: "Expert Speakers", desc: "Industry experts & thought leaders", color: "#a13ccf" },
    { icon: Handshake, val: "B2B", label: "MEETINGS", desc: "Pre-scheduled meetings that drive real business", color: "#f7931e" },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 -mt-4 relative z-20 font-['Barlow',sans-serif]">
      <div
        className="rounded-2xl shadow-2xl border border-white/10 grid grid-cols-2 md:flex items-stretch py-5 px-3 md:px-4 overflow-hidden relative gap-y-6 md:gap-y-0"
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
            <div className={`flex-1 flex flex-col items-center text-center cursor-default px-2 ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>

              {/* TOP: Icon & Text Row */}
              <div className="flex items-center justify-center gap-3 mb-3.5">
                <div className="shrink-0 transition-transform duration-300 hover:scale-110" style={{ color: item.color }}>
                  <item.icon strokeWidth={1.8} size={30} className="md:w-[34px] md:h-[34px]" />
                </div>
                <div className="flex flex-col items-start text-left min-w-0">
                  <span className="text-[18px] md:text-[20px] font-bold text-white leading-none tracking-tight">
                    <StatCounter value={item.val} />
                  </span>
                  <span className="text-[9px] md:text-[10px] font-black text-white tracking-widest uppercase mt-0.5 opacity-90">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* BOTTOM: Description centered */}
              <p className="text-[11px] md:text-[12px] font-medium text-gray-300 leading-tight px-1 text-center max-w-[180px] opacity-90">
                {item.desc}
              </p>

            </div>

            {/* Separator line - HIDDEN ON MOBILE */}
            {i < stats.length - 1 && (
              <div className="hidden md:block w-[1px] bg-white/15 self-stretch mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatsBand;
