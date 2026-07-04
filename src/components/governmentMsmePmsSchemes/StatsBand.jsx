import React, { useState, useEffect, useRef } from 'react';
import { useInView, animate } from "framer-motion";
import band1 from "@/assets/band1.png";
import band2 from "@/assets/band2.png";
import band3 from "@/assets/band3.png";
import band4 from "@/assets/band4.png";
import band5 from "@/assets/band5.png";

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
    { img: band1, val: "8,000+", label: "VISITORS / DELEGATES" },
    { img: band2, val: "150+", label: "EXHIBITORS" },
    { img: band3, val: "1,000+", label: "GLOBAL BUYERS" },
    { img: band4, val: "150+", label: "EXPERTS SPEAKERS" },
    { img: band5, val: "B2B", label: "MEETINGS" },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-20 font-inter -mt-8 md:-mt-10">
      <div 
        className="rounded-2xl border border-white/10 p-1 md:py-1.5 md:px-4"
        style={{ 
          backgroundColor: '#134E8E',
          boxShadow: '0 8px 20px -10px rgba(0,0,0,0.3)',
        }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-nowrap items-center justify-center md:justify-between gap-y-6 gap-x-2 md:gap-0">
          {stats.map((stat, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center text-center group flex-1">
                <img src={stat.img} alt={stat.label} className="w-6 h-6 md:w-7 md:h-7 mb-0.5 object-contain brightness-0 invert" />
                <h4 className="text-base md:text-lg font-bold text-white leading-none">
                  <StatCounter value={stat.val} />
                </h4>
                <p className="text-[7.5px] md:text-[9.5px] font-bold text-[#f5c842] uppercase tracking-widest leading-tight">{stat.label}</p>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-6 bg-white/20" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBand;
