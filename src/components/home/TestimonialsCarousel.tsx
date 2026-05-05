import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Quote, ChevronLeft, ChevronRight, MapPin, Play,
  Globe, Users, Handshake, Mic2, Leaf, Building2, PlayCircle, Store
} from 'lucide-react';
import { cn } from "@/lib/utils";
import testImg from '../../assets/test11.jpeg';
import leafPng from '../../assets/leaf.png';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2 (1).png';
import img3 from '../../assets/3 (1).png';
import img4 from '../../assets/4.png';

// ─── Sparkle component for premium button ───
const Sparkle = ({ style }: { style?: React.CSSProperties }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '12px',
      color: '#fff176',
      textShadow: '0 0 6px gold, 0 0 12px gold',
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

// ─── Data ───
const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: "IHWE helped us connect with serious buyers and expand globally. The response was exceptional and beyond our expectations.",
    company1: "NatureCure",
    company2: "International",
    logoText: "NATURE\nCURE",
    location: "Dubai, UAE",
    color: "#23471d",
    bgImage: img1,
  },
  {
    id: 2,
    quote: "A powerful platform for healthcare innovation and meaningful networking. We met the right partners for our business.",
    company1: "MediWell",
    company2: "Research",
    logoText: "MEDI\nWELL",
    location: "Toronto, Canada",
    color: "#1a4d8f",
    bgImage: img2,
  },
  {
    id: 3,
    quote: "We closed multiple distribution deals within 3 days of the expo. It is the best event for international market exposure.",
    company1: "Herbal Global",
    company2: "Pvt. Ltd.",
    logoText: "HERBAL\nGLOBAL",
    location: "New Delhi, India",
    color: "#7e22ce",
    bgImage: img3,
  },
  {
    id: 4,
    quote: "IHWE brings the right people and the right opportunities for growth. Our brand visibility has increased significantly here.",
    company1: "NutriLife",
    company2: "Solutions",
    logoText: "NUTRI\nLIFE",
    location: "Bangkok, Thailand",
    color: "#458a16",
    bgImage: img4,
  },
  {
    id: 5,
    quote: "An exceptional event with world-class organization and presence. A must-attend for everyone in the wellness industry.",
    company1: "BioVita",
    company2: "Health",
    logoText: "BIO\nVITA",
    location: "Frankfurt, Germany",
    color: "#3e6cc0",
    bgImage: img1,
  },
];

const VIDEOS_DATA = [
  { id: 1, company: "NatureCure International", location: "Dubai, UAE", bg: "linear-gradient(160deg,#4a5568,#1a202c)" },
  { id: 2, company: "MediWell Research", location: "Toronto, Canada", bg: "linear-gradient(160deg,#3b5ea6,#1a2d5a)" },
  { id: 3, company: "Herbal Global Pvt. Ltd.", location: "New Delhi, India", bg: "linear-gradient(160deg,#2d5a2d,#1a3a1a)" },
];

const STATS = [
  { icon: Globe, value: "25+", label: "Countries", color: "#005c22ff" },
  { icon: Users, value: "20,000+", label: "Visitors", color: "#004ac2ff" },
  { icon: Handshake, value: "500+", label: "Exhibitors", color: "#00742aff" },
  { icon: Mic2, value: "200+", label: "Speakers", color: "#005f23ff" },
];

const BOTTOM_STATS = [
  { icon: Leaf, label: "Trusted by", value: "500+ Brands" },
  { icon: Globe, label: "25+ Countries", value: "Participation" },
  { icon: Building2, label: "Government", value: "Supported Initiative" },
  { icon: Users, label: "Global Platform for", value: "Health & Wellness" },
];

// ─── Logo Box ───
const LogoBox = ({ text, color }) => (
  <div
    className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-800 font-black text-[5.5px] text-center leading-tight flex-shrink-0 bg-white"
    style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
  >
    {text.split("\n").map((w, i) => <div key={i} style={{ color }}>{w}</div>)}
  </div>
);

// ─── Testimonial Card ───
const TestimonialCard = ({ item }) => (
  <div
    className="relative bg-white rounded-[24px] border border-slate-100 pt-6 pl-3 pr-6 pb-2 flex flex-col gap-3 w-[225px] flex-shrink-0 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden group"
    style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}
  >
    <div className="opacity-80">
      <Quote className="w-7 h-7 text-[#458a16] transform -scale-x-100" />
    </div>

    <p className="text-slate-900 text-[11.5px] font-medium leading-relaxed flex-1 line-clamp-3 min-h-[50px]">
      {item.quote}
    </p>

    <div
      className="h-[2px] w-8 rounded-full mb-2"
      style={{ background: `linear-gradient(90deg, ${item.color}, #d26019)` }}
    />

    <div className="flex items-start gap-2 mt-auto pt-1 pb-0 relative z-10">
      <LogoBox text={item.logoText} color={item.color} />
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="font-bold text-[11.5px] leading-tight" style={{ color: item.color }}>
          {item.company1}<br />{item.company2}
        </div>
        <div className="flex items-center gap-1 text-slate-700 text-[9.5px] mt-0.5 font-semibold">
          <MapPin className="w-2.5 h-2.5 flex-shrink-0 text-[#d26019]" />
          {item.location}
        </div>
      </div>
    </div>

<img
  src={item.bgImage}
  alt=""
  className="absolute bottom-0 right-0 pointer-events-none"
  style={{
    width: 200,
    height: 200,
    objectFit: 'contain',
    zIndex: 1,
  }}
/>
  </div>
);

// ─── Video Card ───
const VideoCard = ({ item }) => (
  <div className="relative rounded-2xl overflow-hidden flex-1 min-w-0 h-40 group cursor-pointer shadow-lg">
    <div className="absolute inset-0" style={{ background: item.bg }} />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-300" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
        <Play className="w-5 h-5 fill-[#4f8519] text-[#4f8519] ml-0.5" />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
      <div className="text-white font-bold text-[11px] truncate">{item.company}</div>
      <div className="text-white/60 text-[9px]">{item.location}</div>
    </div>
  </div>
);

// ─── SVG Lineart Gradient Section Header ───
const SectionDivider = () => (
  <div className="flex items-center gap-3 px-16 py-5">
    <svg className="flex-1 h-5 overflow-visible" viewBox="0 0 300 18" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lg-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="65%" stopColor="#22c55e" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#23471d" />
        </linearGradient>
        <linearGradient id="lg-left2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="40%" stopColor="#93c5fd" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M0 9 Q30 4 60 9 Q90 14 120 9 Q150 4 180 9 Q210 13 240 9 Q265 5 300 9"
        fill="none" stroke="url(#lg-left)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M0 12 Q40 8 80 12 Q120 16 160 12 Q200 8 240 11 Q265 13 300 11"
        fill="none" stroke="url(#lg-left2)" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="293" cy="9" r="2.5" fill="#23471d" opacity="0.6" />
    </svg>

    <div className="flex items-center gap-2 whitespace-nowrap">
      <Leaf className="w-3.5 h-3.5 text-[#23471d]" />
      <span className="font-bold text-slate-900 text-[12px] tracking-[0.12em] uppercase">
        WHAT OUR{" "}
        <span style={{ color: "#458a16" }}>EXHIBITORS</span>
        {" "}
        <span style={{ color: "#23471d" }}>&</span>
        {" "}
        <span style={{ color: "#3e6cc0" }}>PARTNERS SAY</span>
      </span>
      <Leaf className="w-3.5 h-3.5 text-[#d26019]" />
    </div>

    <svg className="flex-1 h-5 overflow-visible" viewBox="0 0 300 18" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lg-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d26019" />
          <stop offset="35%" stopColor="#22c55e" stopOpacity="0.75" />
          <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="lg-right2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#93c5fd" stopOpacity="0.18" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <circle cx="7" cy="9" r="2.5" fill="#d26019" opacity="0.6" />
      <path d="M0 9 Q35 13 60 9 Q90 5 120 9 Q150 14 180 9 Q210 4 240 9 Q270 14 300 9"
        fill="none" stroke="url(#lg-right)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M0 11 Q35 9 80 12 Q120 15 160 11 Q200 7 240 11 Q260 13 300 12"
        fill="none" stroke="url(#lg-right2)" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  </div>
);

// ─── Main Component ───
const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS_DATA.length;
  const VISIBLE = 5;

  const next = () => setActiveIndex(i => (i + 1) % total);
  const prev = () => setActiveIndex(i => (i - 1 + total) % total);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [isPaused]);

  const visibleCards = Array.from({ length: VISIBLE }, (_, i) =>
    TESTIMONIALS_DATA[(activeIndex + i) % total]
  );

  return (
    <section className="relative bg-white overflow-hidden">
      <style>{`
        @keyframes goldShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%   { left: -75%; }
          100% { left: 150%; }
        }
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
        }
        .golden-btn-premium {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 16px 4px rgba(255,200,0,0.3), 0 4px 15px rgba(255,165,0,0.25);
          position: relative;
          overflow: hidden;
        }
        .golden-btn-premium::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* ─── TOP HERO BANNER ─── */}
      <div className="relative w-full min-h-[380px] flex items-center overflow-hidden">

        <div className="absolute inset-0 z-0">
          <img
            src={testImg}
            className="w-full h-full object-cover"
            alt="IHWE Expo Background"
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-16 flex flex-col md:flex-row items-center gap-12 w-full">

          {/* LEFT: Text */}
          <div className="flex flex-col justify-center w-full md:w-[55%] -mt-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#397511] flex items-center justify-center shadow">
                <Quote className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[#4a8125] font-bold text-[14px] tracking-wide">
                Voices That Inspire Change
              </span>
            </div>

            <h2 className="text-[46px] font-extrabold text-slate-900 leading-[1.1] mb-3">
              What Industry<br />
              Leaders Say<br />
              About{" "}
              <span
                className="font-extrabold"
                style={{
                  background: "linear-gradient(to bottom, #23471d 0%, #2a7a1e 40%, #1a56db 55%, #1e40af 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
              >
                IHWE
              </span>
            </h2>

            <div
              className="h-1 w-12 rounded-full mb-4"
              style={{ background: "linear-gradient(90deg, #23471d 0%, #5f9426 100%)" }}
            />

            <p className="text-slate-800 text-[17px] leading-relaxed max-w-md">
              Real experiences. Real partnerships. Real impact.
              Discover how IHWE is transforming the global health & wellness ecosystem.
            </p>
          </div>

          {/* RIGHT: Stats Card */}
          <div className="relative flex-1 flex justify-end">
            <div
              className="bg-white rounded-lg pl-5 pr-3 py-2 flex flex-col min-w-[170px]"
              style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
            >
              {STATS.map((s, i) => {
                let valStyle = { color: "#5f9426" };
                if (s.value === "20,000+") {
                  valStyle = {
                    background: "linear-gradient(90deg, #1a7a8a 0%, #4f8519 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  };
                } else if (s.value === "500+") {
                  valStyle = {
                    background: "linear-gradient(90deg, #1a4d1a 0%, #5f9426 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  };
                } else if (s.value === "200+") {
                  valStyle = {
                    background: "linear-gradient(90deg, #5f9426 0%, #1a4d1a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  };
                }

                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-4 py-3",
                      i !== STATS.length - 1 && "border-b border-slate-100"
                    )}
                  >
                    <div className="flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-7 h-7" style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="font-black text-[16px] leading-none" style={valStyle}>
                        {s.value}
                      </div>
                      <div className="text-slate-900 text-[11px] font-medium mt-1">{s.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ─── SECTION HEADER ─── */}
      <SectionDivider />

      {/* ─── TESTIMONIAL CARDS CAROUSEL ─── */}
      <div
        className="relative px-16 pb-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-2xl border border-slate-100 flex items-center justify-center text-[#23471d] hover:bg-[#23471d] hover:text-white transition-all duration-300"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        <div className="flex gap-4 justify-center overflow-hidden max-w-[1400px] mx-auto py-10 -my-10">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((item, i) => (
              <motion.div
                key={`${item.id}-${activeIndex}-${i}`}
                initial={{ opacity: 0, x: 50, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <TestimonialCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-2xl border border-slate-100 flex items-center justify-center text-[#23471d] hover:bg-[#23471d] hover:text-white transition-all duration-300"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 py-2">
        {TESTIMONIALS_DATA.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              activeIndex === i
                ? "w-8 bg-[#23471d]"
                : "w-1.5 bg-slate-200 hover:bg-slate-300"
            )}
          />
        ))}
      </div>

      {/* ─── VIDEO SECTION ─── */}
      <div className="relative px-16 pt-6 pb-4">
        {/* Left Leaf Decoration */}
        <div className="absolute -left-10 bottom-0 w-44 h-44 opacity-40 pointer-events-none rotate-45 select-none z-0">
          <img src={leafPng} alt="" className="w-full h-full object-contain" />
        </div>

        <div className="relative z-10 max-w-[1189px] mx-auto flex flex-col md:flex-row gap-8 items-start justify-center">

          <div className="flex flex-col w-[300px] flex-shrink-0">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center bg-white shadow-md flex-shrink-0"
                style={{ borderColor: "#538417" }}
              >
                <Play className="w-7 h-7 ml-1" style={{ color: "#4f8519", fill: "#4f8519" }} />
              </div>
              <div className="flex flex-col">
                <span style={{ color: "#538417" }} className="font-bold text-[10px] uppercase tracking-widest leading-none mb-1">
                  Hear Directly From
                </span>
                <h3 className="text-[27px] font-black leading-tight whitespace-nowrap">
                  <span className="text-black">Our</span>{" "}
                  <span style={{
                    background: "linear-gradient(90deg, #4f8519 0%, #4f8519 55%, #1a7a8a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    Exhibitors
                  </span>
                </h3>
              </div>
            </div>
            <p className="text-slate-900 text-[11.5px] mb-5 leading-relaxed font-medium">
              Real stories from real partners who experienced the IHWE impact.
            </p>
            <button className="flex items-center gap-1.5 border border-[#4f8519] rounded-lg px-5 py-2.5 text-[#4f8519] font-bold text-[11px] hover:bg-[#4f8519] hover:text-white transition-all duration-300 w-fit">
              View More Videos
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4 flex-1">
            {VIDEOS_DATA.map((v) => (
              <VideoCard key={v.id} item={v} />
            ))}
          </div>
        </div>

        {/* Right Leaf Decoration */}
        <div className="absolute -right-12 bottom-4 w-48 h-48 opacity-45 pointer-events-none -rotate-12 select-none z-0">
          <img src={leafPng} alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* ─── BOTTOM STATS BAR ─── */}
      <div className="border-t border-slate-100 overflow-hidden">
        <div className="flex items-stretch relative min-h-[50px]">
          
          {/* Spacer to align white bar with the Carousel Previous button (left-6) */}
          <div className="w-6 flex-shrink-0" />

          {/* WHITE STATS SECTION */}
          <div
            className="flex items-stretch flex-shrink-0"
            style={{
              background: "white",
              borderRadius: "24px",
              boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              position: "relative",
              zIndex: 3,
              paddingLeft: "10px",
              minWidth: "760px"
            }}
          >
            {BOTTOM_STATS.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 pt-1 pb-0.5 flex-1"
                style={{ position: "relative" }}
              >
                {i < BOTTOM_STATS.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "10px",
                      bottom: "10px",
                      width: "1px",
                      background: "linear-gradient(to bottom, transparent, #e2e8f0, #cbd5e1, #e2e8f0, transparent)",
                    }}
                  />
                )}
                <div className="flex items-center justify-center flex-shrink-0">
                  <s.icon
                    className="w-5 h-5"
                    style={{ color: i % 2 === 0 ? "#23471d" : "#2563c8" }}
                  />
                </div>
                <div className="whitespace-nowrap">
                  <div className="text-slate-800 text-[8.5px] font-medium leading-none mb-0.5">{s.label}</div>
                  <div className="font-bold text-slate-800 text-[11.5px] leading-tight">{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* GREEN CTA SECTION - Full width on the right */}
          <div
            className="flex flex-col relative flex-1 justify-center"
            style={{
              background: "linear-gradient(90deg, #1a3a12 0%, #2d5c1e 45%, #a4c639 100%)",
              clipPath: "polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)",
              marginLeft: "-20px",
              padding: "4px 40px 4px 50px",
              zIndex: 2,
            }}
          >
            <div style={{ position: "absolute", top: "4px", right: "5%", opacity: 0.1, pointerEvents: "none" }}>
              <svg width="30" height="30" viewBox="0 0 42 42" fill="none">
                {[7, 21, 35].flatMap(x =>
                  [7, 21, 35].map(y => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r="2.8" fill="white" />
                  ))
                )}
              </svg>
            </div>

            <div className="flex items-center">
              <span style={{ color: "#ffffff", fontWeight: 500, fontSize: "16px", marginRight: "8px" }}>
                Be the Next
              </span>
              <span style={{ color: "#f5c842", fontWeight: 500, fontSize: "16px" }}>
                Success Story
              </span>
            </div>

            <div className="flex items-center pr-10 -mt-0.5">
              <div style={{ color: "rgba(255,255,255,0.95)", fontWeight: 700, fontSize: "16px", whiteSpace: "nowrap" }}>
                at IHWE 2026!
              </div>
              <div className="flex gap-2 ml-auto">
                <div className="relative group/btn">
                  <Sparkle style={{ top: '-6px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle style={{ top: '-8px', left: '40%', animationDelay: '0.4s' }} />
                  <Sparkle style={{ top: '-4px', right: '15%', animationDelay: '0.8s' }} />
                  <Sparkle style={{ bottom: '-6px', left: '25%', animationDelay: '0.2s' }} />
                  <Sparkle style={{ bottom: '-8px', right: '30%', animationDelay: '0.6s' }} />
                  
                  <button
                    className="golden-btn-premium flex items-center gap-1 text-[#050A1A] font-bold text-[10px] px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap hover:scale-[1.02]"
                  >
                    <Store className="w-3 h-3" />
                    Book Your Stall <ChevronRight className="w-2.5 h-2.5" />
                  </button>
                </div>
                
                <button
                  className="flex items-center gap-1 font-bold text-[10px] px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1.2px solid rgba(255,255,255,0.3)",
                    color: "white",
                    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }}
                  onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                  onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                >
                  Apply Now <ChevronRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default TestimonialsCarousel;