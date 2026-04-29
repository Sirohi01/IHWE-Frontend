import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import introImg from "@/assets/intro.png";

const EventCountdown = ({ targetDateString }: { targetDateString?: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = targetDateString ? new Date(targetDateString) : new Date("2026-08-21T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateString]);

  const boxes = [
    { label: "DAYS", value: timeLeft.days, color: "#d26019" },
    { label: "HOURS", value: timeLeft.hours, color: "#d26019" },
    { label: "MINS", value: timeLeft.minutes, color: "#1a6b3a" },
    { label: "SECS", value: timeLeft.seconds, color: "#1a6b3a" },
  ];

  return (
    <div className="flex gap-2 sm:gap-2.5 items-center">
      {boxes.map((box, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 flex items-center justify-center bg-white shadow-sm transition-colors duration-300"
            style={{ borderColor: box.color }}
          >
            <span
              className="text-base md:text-lg font-bold tabular-nums"
              style={{ color: box.color }}
            >
              {box.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[7px] font-bold uppercase tracking-widest text-slate-400 mt-1">{box.label}</span>
        </div>
      ))}
    </div>
  );
};

const StatCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const numericValue = parseInt(value.replace(/,/g, '')) || 0;
  const suffix = value.replace(/[0-9,]/g, '');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const duration = 2000; 
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const IntroductionSection = () => {
  const stats = [
    {
      num: "10+", lbl: "Years of Legacy",
      icon: (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <circle cx="19" cy="14" r="10" stroke="#1a6b3a" strokeWidth="2"/>
          <circle cx="19" cy="14" r="6" stroke="#1a6b3a" strokeWidth="1.5"/>
          <path d="M14 23 L11 35 L19 30 L27 35 L24 23" stroke="#1a6b3a" strokeWidth="2" strokeLinejoin="round"/>
          <circle cx="19" cy="14" r="2.5" fill="#1a6b3a"/>
        </svg>
      )
    },
    {
      num: "8", lbl: "Successful Editions",
      icon: (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <polygon points="19,4 23,15 35,15 25,22 29,34 19,27 9,34 13,22 3,15 15,15" stroke="#3b6fd4" strokeWidth="2" strokeLinejoin="round"/>
          <polygon points="19,9 22,17 30,17 24,22 26,30 19,25 12,30 14,22 8,17 16,17" fill="#e8effe"/>
        </svg>
      )
    },
    {
      num: "10,000+", lbl: "Exhibitors & Brands",
      icon: (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <circle cx="13" cy="12" r="5" stroke="#1a6b3a" strokeWidth="2"/>
          <circle cx="25" cy="12" r="5" stroke="#1a6b3a" strokeWidth="2"/>
          <path d="M2 32 C2 23 24 23 24 32" stroke="#1a6b3a" strokeWidth="2" strokeLinecap="round"/>
          <path d="M25 23 C29 23 36 25 36 32" stroke="#1a6b3a" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      num: "80+", lbl: "Countries Participated",
      icon: (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <circle cx="19" cy="19" r="15" stroke="#3b6fd4" strokeWidth="2"/>
          <ellipse cx="19" cy="19" rx="6.5" ry="15" stroke="#3b6fd4" strokeWidth="1.5"/>
          <line x1="4" y1="19" x2="34" y2="19" stroke="#3b6fd4" strokeWidth="1.5"/>
          <path d="M6 12 Q19 15 32 12" stroke="#3b6fd4" strokeWidth="1" fill="none"/>
          <path d="M6 26 Q19 23 32 26" stroke="#3b6fd4" strokeWidth="1" fill="none"/>
        </svg>
      )
    },
  ];

  return (
    <section className="bg-[#f5fcfd] px-14 pt-2 pb-8 overflow-hidden relative">
      <div className="grid lg:grid-cols-2 gap-8 items-start mb-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-10"
        >
          <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#1a6b3a] mb-3">Introduction</p>
          <h2 className="text-[35px] font-extrabold text-[#0d2137] leading-[1.12]">
            A Global Platform for<br />
            <span className="text-[#1a6b3a]">Health, Wellness</span> &amp;<br />
            <span className="bg-gradient-to-r from-[#1a3fa0] to-[#3b6fd4] bg-clip-text text-transparent">
              Integrated Healthcare
            </span>
          </h2>
          <div className="w-11 h-[3px] bg-[#1a6b3a] rounded mt-4 mb-1" />
          <p className="text-[14px] leading-[1.8] text-[#3d5166] max-w-[520px] text-justify">
            International Health &amp; Wellness Expo 2026 stands as India's most influential international platform dedicated to healthcare excellence, wellness innovation, and sustainable living. Entering its prestigious 9th Edition, the Expo represents a strategic evolution—from a conventional trade exhibition into a powerful global ecosystem for business growth, policy exchange, knowledge sharing, and international collaboration.
            <br /> <br />
            With a strong legacy of 10+ years and 8 successfully executed editions, the Expo has established itself as a trusted meeting ground for healthcare leaders, hospital groups, AYUSH institutions, wellness brands, medical technology providers, pharmaceutical companies, investors, policymakers, researchers, startups, and global delegations from across the world.
          </p>
        </motion.div>

        {/* RIGHT — Hero Image & Floating Countdown */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center relative pt-10"
        >
          {/* Top-Right Countdown — Aligned with Title */}
          <div className="absolute top-[40px] right-0 flex flex-col items-end gap-1 z-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a6b3a]">Event Begins In</span>
            <EventCountdown />
          </div>

          <div className="relative mt-20">
            <img
              src={introImg}
              alt="IHWE Introduction"
              className="w-full max-w-[850px] object-contain scale-110 translate-x-4"
            />
          </div>
        </motion.div>
      </div>

      {/* STATS ROW */}
      <div className="flex items-center pt-0 border-t border-slate-100 -mt-6 relative z-30">
        {stats.map((s, i) => (
          <div key={s.lbl} className="flex items-center">
            <div className="flex items-center gap-3 px-5 first:pl-0">
              {s.icon}
              <div>
                <p className="text-[22px] font-extrabold text-[#3b6fd4] leading-none">
                  <StatCounter value={s.num} />
                </p>
                <p className="text-[8.5px] font-semibold uppercase tracking-[.12em] text-[#6b8099] mt-1">{s.lbl}</p>
              </div>
            </div>
            {i < stats.length - 1 && <div className="w-px h-10 bg-slate-200" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntroductionSection;