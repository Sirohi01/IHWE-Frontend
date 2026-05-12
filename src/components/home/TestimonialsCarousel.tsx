import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import {
  Quote, ChevronLeft, ChevronRight, MapPin, Play, ArrowRight,
  Globe, Users, Handshake, Mic2, Leaf, Building2, PlayCircle, Store
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionContainer from '../layout/SectionContainer';
import { cn } from "@/lib/utils";
import testImg from '../../assets/test11.jpeg';
import leafPng from '../../assets/leaf.png';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2 (1).png';
import img3 from '../../assets/3 (1).png';
import img4 from '../../assets/4.png';

import { newTestimonialsApi, SERVER_URL } from "@/lib/api";

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

// ─── Sparkle component for teal button ───
const TealSparkle = ({ style }: { style?: React.CSSProperties }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '12px',
      color: '#5ef5e0',
      textShadow: '0 0 6px #0A7C6E, 0 0 12px #0fe8d0',
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

// ─── Logo Box ───
const LogoBox = ({ text, color }: { text: string; color: string }) => (
  <div
    className="w-16 h-16 rounded-full border-[3px] border-white flex items-center justify-center text-slate-800 font-black text-[6px] text-center leading-tight bg-white"
    style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.13), 0 0 0 2px #e2e8f0" }}
  >
    {(text || "").split("\n").map((w, i) => <div key={i} style={{ color }}>{w}</div>)}
  </div>
);

// ── Animated counter — counts up when scrolled into view ──
const StatCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const numericValue = parseInt(value.replace(/,/g, '')) || 0;
  const suffix = value.replace(/[0-9,]/g, '');

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: 2.5,
        ease: 'easeOut',
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

const STATS = [
  { icon: Globe, value: "1000+", label: "Global Buyers", color: "#005c22ff" },
  { icon: Users, value: "8000+", label: "Visitors/Delegates", color: "#004ac2ff" },
  { icon: Handshake, value: "150+", label: "Exhibitors", color: "#00742aff" },
  { icon: Mic2, value: "150+", label: "Expert Speakers", color: "#005f23ff" },
];

// ─── Testimonial Card ───
const TestimonialCard = ({ item, expandedCardId, setExpandedCardId }: { item: any; expandedCardId: string | null; setExpandedCardId: (id: string | null) => void }) => {
  const isExpanded = expandedCardId === item._id;
  const setIsExpanded = (val: boolean) => {
    setExpandedCardId(val ? item._id : null);
  };
  const CHAR_LIMIT = 155;
  const quoteText = item.quote || "";
  const isLong = quoteText.length > CHAR_LIMIT;

  return (
    <div
      className="relative flex flex-col w-[250px] md:w-[230px] flex-shrink-0"
      style={{ paddingTop: '32px' }}
    >
      {/* ── Floating Logo Circle (overlaps top of card) ── */}
      <div
        className="absolute top-0 left-1/2 z-20 flex items-center justify-center"
        style={{ transform: 'translateX(-50%)' }}
      >
        {item.logo ? (
          <div
            className="w-16 h-16 rounded-full border-[3px] border-white flex items-center justify-center overflow-hidden bg-white"
            style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.15), 0 0 0 2px #e2e8f0" }}
          >
            <img
              src={`${SERVER_URL}${item.logo}`}
              alt="logo"
              className="w-full h-full object-contain p-0.5 transform scale-110"
            />
          </div>
        ) : (
          <LogoBox
            text={item.logoText || (item.company1 ? item.company1.substring(0, 5) : "")}
            color={item.color || '#23471d'}
          />
        )}
      </div>

      {/* ── Card Body ── */}
      <div
        className="relative bg-white rounded-[22px] border border-slate-100 flex flex-col overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-500"
        style={{
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          height: '280px',
        }}
      >
        {/* ── Expanded Full-Text Overlay ── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 bg-white z-[60] flex flex-col rounded-[22px]"
              style={{ boxShadow: "inset 0 0 0 2px #e2e8f0" }}
            >
              {/* Expanded Header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-shrink-0"
                style={{ background: "linear-gradient(90deg, #f8fdf5 0%, #fff8f3 100%)" }}
              >
                <div className="flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-[#458a16] transform -scale-x-100" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Review</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                  className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-200"
                  style={{
                    color: '#23471d',
                    background: '#f0faf0',
                    border: '1px solid #c6e6c6',
                  }}
                >
                  ✕ Close
                </button>
              </div>

              {/* Expanded Content */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                <p className="text-slate-800 text-[11.5px] font-medium leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Company info footer - UPDATED to show full name */}
              <div
                className="flex items-center gap-2.5 px-4 py-3 border-t border-slate-100 flex-shrink-0"
                style={{ background: "#fafafa" }}
              >
                {item.logo ? (
                  <div className="w-8 h-8 rounded-full border border-slate-200 overflow-hidden bg-white flex-shrink-0">
                    <img src={`${SERVER_URL}${item.logo}`} alt="logo" className="w-full h-full object-contain p-0 transform scale-110" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[5px] font-black flex-shrink-0" style={{ color: item.color || '#23471d' }}>
                    {item.company1?.substring(0, 2)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[10px] leading-tight" style={{ color: item.color || '#23471d' }}>
                    {item.company1}
                  </div>
                  {item.company2 && (
                    <div className="font-semibold text-[9px] leading-tight opacity-80 mt-0.5" style={{ color: item.color || '#23471d' }}>
                      {item.company2}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-slate-400 text-[8.5px] mt-1">
                    <MapPin className="w-2.5 h-2.5 text-[#d26019] flex-shrink-0" />
                    {item.location}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Top: Company Info (below floating logo) ── */}
        <div className="pt-[52px] px-4 pb-0 text-center flex-shrink-0 min-h-[82px]">
          {/* Company 1 Slot */}
          <div className="h-[16px] mb-0.5">
            <div className="font-bold text-[11.5px] leading-tight px-1 flex items-center justify-center" style={{ color: item.color || '#23471d' }}>
              <span className={item.company1.length > 25 ? "truncate max-w-[190px]" : ""}>{item.company1}</span>
              {item.company1.length > 25 && (
                <span 
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                  className="text-red-600 font-black cursor-pointer hover:underline ml-0.5"
                >
                  ...
                </span>
              )}
            </div>
          </div>
          
          {/* Company 2 / Title Slot */}
          <div className="h-[16px]">
            <div className="font-bold text-[10.5px] leading-tight px-1 opacity-90 flex items-center justify-center" style={{ color: item.color || '#23471d' }}>
              {item.company2 ? (
                <>
                  <span className={item.company2.length > 30 ? "truncate max-w-[190px]" : ""}>{item.company2}</span>
                  {item.company2.length > 30 && (
                    <span 
                      onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                      className="text-red-600 font-black cursor-pointer hover:underline ml-0.5"
                    >
                      ...
                    </span>
                  )}
                </>
              ) : ""}
            </div>
          </div>

          {/* Location Slot */}
          <div className="flex items-center justify-center gap-1 text-slate-500 text-[9.5px] mt-2">
            <MapPin className="w-2.5 h-2.5 flex-shrink-0 text-[#d26019]" />
            <span className="truncate max-w-[150px]">{item.location}</span>
          </div>
        </div>

        {/* ── Gradient Divider ── */}
        <div
          className="h-[1.5px] mx-4 mt-3 rounded-full flex-shrink-0"
          style={{ background: `linear-gradient(90deg, ${item.color || '#23471d'}, #d26019)` }}
        />

        {/* ── Quote Section ── */}
        <div className="flex flex-col flex-1 px-4 pt-3 pb-3 relative min-h-0">
          <Quote className="w-5 h-5 text-[#458a16] transform -scale-x-100 opacity-70 mb-1.5 flex-shrink-0" />

          <div className="flex-1 overflow-hidden">
            <p className="text-slate-700 text-[11px] font-medium leading-relaxed">
              {isLong
                ? `${quoteText.substring(0, CHAR_LIMIT).trim()}…`
                : quoteText
              }
            </p>
          </div>

          {/* ── "Read More" Button ── */}
          <div className="mt-auto pt-2 flex-shrink-0">
            {isLong && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                className="flex items-center gap-0.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full transition-all duration-200 hover:gap-1"
                style={{
                  color: '#23471d',
                  background: 'linear-gradient(90deg, #eaf5e2 0%, #fff6ee 100%)',
                  border: '1px solid #c6e6c6',
                }}
              >
                Read more
                <span style={{ fontSize: '8px' }}>→</span>
              </button>
            )}
          </div>

          {/* Bottom decorative image */}
          {item.bottomImage && (
            <img
              src={`${SERVER_URL}${item.bottomImage}`}
              alt=""
              className="absolute bottom-0 right-0 pointer-events-none opacity-10 md:opacity-20"
              style={{ width: 65, height: 65, objectFit: 'contain', zIndex: 1 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const getYouTubeThumbnail = (url: string) => {
  if (!url) return null;
  let videoId = "";
  try {
    if (url.includes("v=")) videoId = url.split("v=")[1].split("&")[0];
    else if (url.includes("shorts/")) videoId = url.split("shorts/")[1].split("?")[0];
    else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1].split("?")[0];
  } catch (e) { return null; }
  if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return null;
};

// ─── Video Card ───
const VideoCard = ({ item }: { item: any }) => {
  const colors = [
    "linear-gradient(160deg,#4a5568,#1a202c)",
    "linear-gradient(160deg,#3b5ea6,#1a2d5a)",
    "linear-gradient(160deg,#2d5a2d,#1a3a1a)"
  ];
  const bg = colors[item._id ? item._id.charCodeAt(0) % colors.length : 0];
  const videoLink = item.videoFile ? `${SERVER_URL}${item.videoFile}` : item.videoUrl;
  const thumb = item.thumbnail ? `${SERVER_URL}${item.thumbnail}` : getYouTubeThumbnail(item.videoUrl);

  return (
    <div
      onClick={() => window.open(videoLink, '_blank')}
      className="relative rounded-2xl overflow-hidden flex-1 min-w-full sm:min-w-[280px] md:min-w-0 h-48 md:h-40 group cursor-pointer shadow-lg"
    >
      <div className="absolute inset-0" style={{ background: bg }}>
        {thumb && <img src={thumb} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="" />}
      </div>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
          <Play className="w-5 h-5 fill-[#4f8519] text-[#4f8519] ml-0.5" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
        <div className="text-white font-bold text-xs truncate">{item.title}</div>
        <div className="text-white/60 text-[10px] font-medium">{item.location}</div>
      </div>
    </div>
  );
};

// ─── SVG Lineart Gradient Section Header ───
const SectionDivider = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 px-16 pt-5 pb-0">
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
      <span className="font-bold text-[#6E1A37] text-[15px] tracking-[0.12em] uppercase">
        {text || "WHAT OUR EXHIBITORS & PARTNERS SAY"}
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
  const [data, setData] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await newTestimonialsApi.get();
      if (res) setData(res);
    };
    loadData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = data?.cards?.length || 0;
  const totalVideos = data?.videos?.length || 0;

  const next = () => { if (total) setActiveIndex(i => (i + 1) % total); };
  const prev = () => { if (total) setActiveIndex(i => (i - 1 + total) % total); };

  useEffect(() => {
    if (isPaused || !total) return;
    const t = setInterval(prev, 4000);
    return () => clearInterval(t);
  }, [isPaused, total]);

  const visibleCards = data?.cards ? Array.from({ length: Math.min(visibleCount, total) }, (_, i) =>
    data.cards[(activeIndex + i) % total]
  ) : [];

  if (!data) return <div className="min-h-[400px] bg-white flex items-center justify-center font-bold text-slate-400">Loading Testimonials...</div>;

  const settings = data.settings;

  const getProcessedHtml = (text: string) => {
    if (!text) return { __html: "" };
    let html = text;
    if (html.toLowerCase().trim() === "what industry leaders say about ihwe") {
      html = "What Industry<br />Leaders Say<br />About IHWE";
    }
    const styledIhwe = `<span class="font-black" style="background: linear-gradient(to bottom, #23471d 0%, #2a7a1e 40%, #1a56db 55%, #1e40af 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: inline-block;">IHWE</span>`;
    html = html.replace(/IHWE/g, styledIhwe);
    return { __html: html };
  };

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
        @keyframes marqueeScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeScrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-wrapper-cards {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marqueeScrollRight 50s linear infinite;
        }
        .marquee-wrapper-cards:hover {
          animation-play-state: paused;
        }
        .marquee-wrapper-videos {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marqueeScroll 30s linear infinite;
        }
        .marquee-wrapper-videos:hover {
          animation-play-state: paused;
        }
        .teal-btn {
          background: linear-gradient(135deg, #0A7C6E 0%, #0db39e 40%, #0A7C6E 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 16px 4px rgba(10,124,110,0.45), 0 4px 20px rgba(13,179,158,0.35);
          position: relative;
          overflow: hidden;
        }
        .teal-btn::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* ─── TOP HERO BANNER ─── */}
      <div className="relative w-full min-h-[420px] md:min-h-[380px] flex items-center overflow-hidden py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <img
            src={settings.heroBgImage ? `${SERVER_URL}${settings.heroBgImage}` : testImg}
            className="w-full h-full object-cover opacity-60 md:opacity-100"
            alt={settings.heroBgAlt || "IHWE Expo Background"}
          />
          <div className="absolute inset-0 bg-white/40 md:hidden" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-10 md:gap-12 w-full">
          <div className="flex flex-col justify-center w-full md:w-[55%] text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#397511] flex items-center justify-center shadow">
                <Quote className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[#4a8125] font-bold text-[13px] md:text-[14px] tracking-wide">
                {settings.subtitle || "Voices That Inspire Change"}
              </span>
            </div>
            <h2
              className="text-3xl md:text-[46px] font-black text-slate-900 leading-[1.1] mb-5 md:mb-3"
              dangerouslySetInnerHTML={getProcessedHtml(settings.heading)}
            />
            <div
              className="h-1.5 w-16 rounded-full mb-6 md:mb-4 mx-auto md:mx-0"
              style={{ background: "linear-gradient(90deg, #23471d 0%, #5f9426 100%)" }}
            />
            <p className="text-slate-800 text-[15px] md:text-[17px] leading-relaxed max-w-md mx-auto md:mx-0">
              {settings.description || "Real experiences. Real partnerships. Real impact. Discover how IHWE is transforming the global health & wellness ecosystem."}
            </p>
          </div>

          <div className="relative flex-1 flex justify-end">
            <div
              className="bg-white rounded-lg pl-5 pr-3 py-2 flex flex-col min-w-[170px]"
              style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
            >
              {STATS.map((s, i) => {
                let valStyle: React.CSSProperties = { color: s.color };
                return (
                  <div key={i} className={cn("flex items-center gap-4 py-3", i !== STATS.length - 1 && "border-b border-slate-100")}>
                    <div className="flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-7 h-7" style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="font-black text-[16px] leading-none" style={valStyle}>
                        {/^[\d,]+/.test(s.value) ? <StatCounter value={s.value} /> : s.value}
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
      <SectionDivider text={settings.dividerText} />

      {/* ─── TESTIMONIAL CARDS MARQUEE (Right Scrolling) ─── */}
      <div className="relative pt-10 pb-8">
        <SectionContainer className="relative z-10">
          <div className="w-full overflow-hidden">
            <div 
              className="marquee-wrapper-cards gap-6"
              style={{ animationDuration: `${Math.max(total * 10, 20)}s` }}
            >
              {/* Create multiple sets for seamless infinite loop */}
              {[1, 2, 3].map((set) => (
                <div key={set} className="flex gap-6">
                  {(data.cards || []).map((item: any, i: number) => (
                    <div key={`${set}-${i}`} className="flex-shrink-0">
                      <TestimonialCard 
                        item={item} 
                        expandedCardId={expandedCardId}
                        setExpandedCardId={setExpandedCardId}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* ─── VIDEO SECTION ─── */}
      <div className="relative pt-6 pb-0 md:pb-2">
        <div className="absolute -left-10 bottom-0 w-44 h-44 opacity-20 pointer-events-none rotate-45 select-none z-0">
          <img src={leafPng} alt="" className="w-full h-full object-contain" />
        </div>

        <SectionContainer className="relative z-10">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="w-full overflow-hidden">
              <div 
                className="marquee-wrapper-videos gap-4"
                style={{ animationDuration: `${Math.max(totalVideos * 10, 20)}s` }}
              >
                {[1, 2, 3].map((set) => (
                  <div key={set} className="flex gap-4">
                    {(data.videos || []).map((v: any, i: number) => (
                      <div key={`${set}-${i}`} className="w-[280px] md:w-[320px] flex-shrink-0">
                        <VideoCard item={v} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>

        <div className="absolute -right-12 bottom-4 w-48 h-48 opacity-20 pointer-events-none -rotate-12 select-none z-0">
          <img src={leafPng} alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* ─── BOTTOM STATS BAR ─── */}
      <div className="overflow-hidden w-full pb-5 mt-2 relative z-30">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-stretch relative px-6 md:px-16 gap-8 md:gap-0">

          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center flex-shrink-0 w-full md:w-auto"
            style={{
              background: "white",
              borderRadius: window.innerWidth > 1024 ? "24px 0 0 24px" : "24px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
              position: "relative",
              zIndex: 3,
              padding: "2px 8px",
            }}
          >
            {(settings.bottomBarStats || []).map((s: any, i: number) => {
              const IconComp = s.icon === 'Leaf' ? Leaf :
                s.icon === 'Globe' ? Globe :
                s.icon === 'Users' ? Users :
                s.icon === 'Building2' ? Building2 :
                s.icon === 'Handshake' ? Handshake :
                s.icon === 'Mic2' ? Mic2 :
                s.icon === 'Store' ? Store : Globe;

              return (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 md:py-1 flex-1 min-w-fit" style={{ position: "relative" }}>
                  {i < (settings.bottomBarStats.length - 1) && (
                    <div className="hidden lg:block" style={{ position: "absolute", right: 0, top: "8px", bottom: "8px", width: "1px", background: "linear-gradient(to bottom, transparent, #e2e8f0, transparent)" }} />
                  )}
                  <div className="flex items-center justify-center flex-shrink-0">
                    <IconComp className="w-4 h-4 md:w-5 md:h-5 opacity-80" style={{ color: i % 2 === 0 ? "#23471d" : "#2563c8" }} />
                  </div>
                  <div className="whitespace-nowrap">
                    <div className="text-slate-800 text-[9.5px] md:text-[8.5px] font-bold leading-none mb-0.5">{s.label}</div>
                    <div className="font-black text-slate-900 text-[14px] md:text-[13px] leading-tight">{s.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col relative flex-1 justify-center w-full min-h-0 ml-0 md:-ml-5" style={{ zIndex: 2 }}>
            <div
              className="rounded-[24px] md:rounded-none"
              style={{
                position: 'absolute', inset: 0, width: '100%',
                background: "linear-gradient(90deg, #1a3a12 0%, #2d5c1e 45%, #a4c639 100%)",
                clipPath: window.innerWidth > 1024 ? "polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)" : "none",
                zIndex: -1
              }}
            />
            <div className="relative z-10 py-2 md:py-1 px-6 md:pl-12 md:pr-10 text-center md:text-left">
              <div style={{ position: "absolute", top: "10px", right: "10%", opacity: 0.1, pointerEvents: "none" }}>
                <svg width="40" height="40" viewBox="0 0 42 42" fill="none">
                  {[7, 21, 35].flatMap(x => [7, 21, 35].map(y => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r="2.8" fill="white" />
                  )))}
                </svg>
              </div>

              <div className="flex flex-col md:flex-row items-center md:justify-start gap-1 md:gap-2 mb-4 md:mb-0">
                <span className="text-white font-bold text-base md:text-[14px]">{settings.ctaMainText || "Be the Next"}</span>
                <span className="text-[#f5c842] font-black text-lg md:text-[15px]">{settings.ctaSubText || "Success Story"}</span>
                <div className="text-white font-black text-base md:text-[14px] md:ml-1">{settings.ctaBottomText || "at IHWE 2026!"}</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-4 md:mt-0">
                <div className="relative group/btn w-full sm:w-auto">
                  <Sparkle style={{ top: '-6px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle style={{ top: '-8px', left: '40%', animationDelay: '0.4s' }} />
                  <Sparkle style={{ top: '-4px', right: '15%', animationDelay: '0.8s' }} />
                  <button
                    onClick={() => settings.ctaButton1Path && window.open(settings.ctaButton1Path, '_blank')}
                    className="golden-btn-premium flex items-center justify-center gap-2 text-[#050A1A] font-black text-[12px] md:text-[10px] w-full px-8 py-3.5 md:px-4 md:py-2 rounded-xl md:rounded-lg transition-all duration-300 whitespace-nowrap hover:scale-[1.02]"
                  >
                    <Store className="w-4 h-4 md:w-3 md:h-3" />
                    {settings.ctaButton1Name || "Book Your Stall"} <ChevronRight className="w-3 h-3 md:w-2.5 md:h-2.5" />
                  </button>
                </div>

                <Link to="/visitor-registration" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex justify-center">
                  <div style={{ position: 'relative', display: 'inline-block' }} className="w-full sm:w-auto">
                    {/* Sparkles around button */}
                    <TealSparkle style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
                    <TealSparkle style={{ top: '-8px', left: '40%', animationDelay: '0.4s' }} />
                    <TealSparkle style={{ top: '-12px', right: '15%', animationDelay: '0.8s' }} />
                    <TealSparkle style={{ bottom: '-10px', left: '25%', animationDelay: '0.2s' }} />
                    <TealSparkle style={{ bottom: '-8px', right: '30%', animationDelay: '0.6s' }} />

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="teal-btn text-white px-8 md:px-6 py-3 md:py-2 rounded-xl md:rounded-lg font-black text-[12px] md:text-[10px] flex items-center justify-center gap-2.5 whitespace-nowrap transition-all w-full"
                    >
                      REGISTER AS VISITOR!
                      <div className="w-5 h-5 md:w-4 md:h-4 bg-white rounded-full flex items-center justify-center z-10 relative">
                        <ArrowRight className="w-3.5 h-3.5 md:w-3 md:h-3 text-[#0A7C6E]" />
                      </div>
                    </motion.button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default TestimonialsCarousel;