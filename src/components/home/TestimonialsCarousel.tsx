import React, { useState, useEffect, useCallback } from 'react';
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

// ─── Logo Box ───
const LogoBox = ({ text, color }: { text: string; color: string }) => (
  <div
    className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-800 font-black text-[5.5px] text-center leading-tight flex-shrink-0 bg-white"
    style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
  >
    {(text || "").split("\n").map((w, i) => <div key={i} style={{ color }}>{w}</div>)}
  </div>
);

// ─── Testimonial Card ───
const TestimonialCard = ({ item }: { item: any }) => (
  <div
    className="relative bg-white rounded-[24px] border border-slate-100 pt-6 pl-3 pr-6 pb-2 flex flex-col gap-3 w-[250px] md:w-[225px] flex-shrink-0 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden group"
    style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}
  >
    <div className="opacity-80">
      <Quote className="w-7 h-7 text-[#458a16] transform -scale-x-100" />
    </div>

    <p className="text-slate-900 text-[11.5px] font-bold md:font-medium leading-relaxed flex-1 relative z-10">
      {item.quote}
    </p>

    <div
      className="h-[2px] w-8 rounded-full mb-2 relative z-10"
      style={{ background: `linear-gradient(90deg, ${item.color || '#23471d'}, #d26019)` }}
    />

    <div className="flex items-start gap-2 mt-auto pt-1 pb-0 relative z-20">
      {item.logo ? (
        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center overflow-hidden bg-white shrink-0 shadow-sm" style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}>
          <img src={`${SERVER_URL}${item.logo}`} alt="logo" className="w-full h-full object-contain p-1.5" />
        </div>
      ) : (
        <LogoBox text={item.logoText || (item.company1 ? item.company1.substring(0, 5) : "")} color={item.color || '#23471d'} />
      )}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="font-bold text-[11.5px] leading-tight" style={{ color: item.color || '#23471d' }}>
          {item.company1}<br />{item.company2}
        </div>
        <div className="flex items-center gap-1 text-slate-700 text-[9.5px] mt-0.5 font-semibold">
          <MapPin className="w-2.5 h-2.5 flex-shrink-0 text-[#d26019]" />
          {item.location}
        </div>
      </div>
    </div>

    {item.bottomImage && (
      <img
        src={`${SERVER_URL}${item.bottomImage}`}
        alt=""
        className="absolute bottom-0 right-0 pointer-events-none opacity-20 md:opacity-100"
        style={{
          width: 160,
          height: 160,
          objectFit: 'contain',
          zIndex: 1,
        }}
      />
    )}
  </div>
);

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
  // Use background color or linear gradient based on ID for visual variety
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
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

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
  const nextVideo = useCallback(() => { if (totalVideos) setActiveVideoIndex(i => (i + 1) % totalVideos); }, [totalVideos]);

  useEffect(() => {
    if (isPaused || !total) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [isPaused, total]);

  useEffect(() => {
    if (isPaused || !totalVideos) return;
    const t = setInterval(nextVideo, 3000);
    return () => clearInterval(t);
  }, [isPaused, totalVideos, nextVideo]);

  const visibleCards = data?.cards ? Array.from({ length: Math.min(visibleCount, total) }, (_, i) =>
    data.cards[(activeIndex + i) % total]
  ) : [];

  const videoVisibleCount = window.innerWidth < 768 ? 1 : 3;
  const visibleVideos = data?.videos ? Array.from({ length: Math.min(videoVisibleCount, totalVideos) }, (_, i) =>
    data.videos[(activeVideoIndex + i) % totalVideos]
  ) : [];

  if (!data) return <div className="min-h-[400px] bg-white flex items-center justify-center font-bold text-slate-400">Loading Testimonials...</div>;

  const settings = data.settings;

  // Process heading to support HTML and special IHWE gradient
  const getProcessedHtml = (text: string) => {
    if (!text) return { __html: "" };
    
    let html = text;
    
    // Auto-inject line breaks for the standard heading if they are missing
    if (html.toLowerCase().trim() === "what industry leaders say about ihwe") {
      html = "What Industry<br />Leaders Say<br />About IHWE";
    }
    
    // Replace IHWE with a styled span string
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

          {/* LEFT: Text */}
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

            <p 
              className="text-slate-900 text-[15px] md:text-[17px] leading-relaxed max-w-md mx-auto md:mx-0 font-medium"
              dangerouslySetInnerHTML={getProcessedHtml(settings.description)}
            />
          </div>

          {/* RIGHT: Stats Card */}
          <div className="relative w-full md:flex-1 flex justify-center md:justify-end">
            <div
              className="bg-white/90 backdrop-blur-sm md:bg-white rounded-xl pl-6 pr-6 py-3 flex flex-col w-fit min-w-[210px] md:min-w-[230px]"
              style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            >
              {(settings.heroStats || []).map((s: any, i: number) => {
                let valStyle: any = { color: s.color || "#5f9426" };
                if (s.value === "8,000+" || s.value === "1,000+" || s.value === "1000+") {
                  valStyle = {
                    background: "linear-gradient(90deg, #1a7a8a 0%, #4f8519 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  };
                }
                const IconComp = s.icon === 'Globe' ? Globe : 
                                 s.icon === 'Users' ? Users : 
                                 s.icon === 'Handshake' ? Handshake : 
                                 s.icon === 'Mic2' ? Mic2 : 
                                 s.icon === 'Store' ? Store : 
                                 s.icon === 'Leaf' ? Leaf : Globe;
                
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-4 py-3",
                      i !== (settings.heroStats.length - 1) && "border-b border-slate-100"
                    )}
                  >
                    <div className="flex items-center justify-center flex-shrink-0">
                      <IconComp className="w-7 h-7" style={{ color: s.color || "#5f9426" }} />
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
      <SectionDivider text={settings.dividerText} />

      {/* ─── TESTIMONIAL CARDS CAROUSEL ─── */}
      <div
        className="relative px-6 md:px-16 pb-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          onClick={prev}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#23471d] hover:bg-[#23471d] hover:text-white transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        <div className="flex gap-4 justify-center overflow-hidden max-w-[1400px] mx-auto py-10 -my-10">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((item, i) => (
              <motion.div
                key={`${item._id}-${activeIndex}-${i}`}
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
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#23471d] hover:bg-[#23471d] hover:text-white transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 py-2">
        {(data.cards || []).map((_: any, i: number) => (
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
      <div className="relative px-6 md:px-16 pt-6 pb-0 md:pb-2">
        {/* Left Leaf Decoration */}
        <div className="absolute -left-10 bottom-0 w-44 h-44 opacity-20 pointer-events-none rotate-45 select-none z-0">
          <img src={leafPng} alt="" className="w-full h-full object-contain" />
        </div>

        <div className="relative z-10 max-w-[1189px] mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start justify-center">

          <div className="flex flex-col w-full md:w-[300px] flex-shrink-0 text-center md:text-left items-center md:items-start">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-full border-2 flex items-center justify-center bg-white shadow-md flex-shrink-0"
                style={{ borderColor: "#538417" }}
              >
                <Play className="w-7 h-7 ml-1" style={{ color: "#4f8519", fill: "#4f8519" }} />
              </div>
              <div className="flex flex-col text-left">
                <span style={{ color: "#538417" }} className="font-bold text-[10px] uppercase tracking-widest leading-none mb-1">
                  {settings.videoSubheading || "Hear Directly From"}
                </span>
                <h3 className="text-2xl md:text-[27px] font-black leading-tight whitespace-nowrap">
                  <span style={{
                    background: "linear-gradient(90deg, #4f8519 0%, #4f8519 55%, #1a7a8a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    {settings.videoMainHeading || "Our Exhibitors"}
                  </span>
                </h3>
              </div>
            </div>
            <p className="text-slate-900 text-[13px] md:text-[11.5px] mb-6 md:mb-5 leading-relaxed font-medium max-w-sm">
              {settings.videoDescription}
            </p>
            <button 
              onClick={() => settings.videoButtonPath && window.open(settings.videoButtonPath, '_blank')}
              className="flex items-center gap-1.5 border border-[#4f8519] rounded-lg px-6 py-3 md:px-5 md:py-2.5 text-[#4f8519] font-bold text-[12px] md:text-[11px] hover:bg-[#4f8519] hover:text-white transition-all duration-300 w-fit"
            >
              {settings.videoButtonText || "View More Videos"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full flex-1 relative min-h-[220px]">
            <div className="flex gap-4 justify-center overflow-hidden w-full">
              <AnimatePresence mode="popLayout">
                {visibleVideos.map((v: any, i: number) => (
                  <motion.div
                    key={`${v._id}-${activeVideoIndex}-${i}`}
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={cn(
                      "flex-1 min-w-0",
                      window.innerWidth < 768 ? "w-full" : "max-w-[calc(33.33%-11px)]"
                    )}
                  >
                    <VideoCard item={v} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Video Dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {(data.videos || []).map((_: any, i: number) => (
                <div
                  key={i}
                  onClick={() => setActiveVideoIndex(i)}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300 cursor-pointer",
                    activeVideoIndex === i ? "w-6 bg-[#4f8519]" : "w-1.5 bg-slate-200"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Leaf Decoration */}
        <div className="absolute -right-12 bottom-4 w-48 h-48 opacity-20 pointer-events-none -rotate-12 select-none z-0">
          <img src={leafPng} alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* ─── BOTTOM STATS BAR ─── */}
      <div className="border-t border-slate-100 overflow-hidden w-full py-0 md:py-0 -mt-4 md:-mt-8 relative z-30">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-stretch relative px-6 md:px-16 gap-8 md:gap-0">
          
          {/* WHITE STATS SECTION */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center flex-shrink-0 w-full md:w-auto"
            style={{
              background: "white",
              borderRadius: window.innerWidth > 1024 ? "24px 0 0 24px" : "24px",
              boxShadow: "rgba(60, 64, 67, 0.2) 0px 1px 2px 0px",
              position: "relative",
              zIndex: 3,
              padding: "2px 8px",
            }}
          >
            {(settings.bottomBarStats || []).map((s: any, i: number) => {
              // Simple Icon Mapping
              const IconComp = s.icon === 'Leaf' ? Leaf : 
                               s.icon === 'Globe' ? Globe : 
                               s.icon === 'Users' ? Users : 
                               s.icon === 'Building2' ? Building2 : 
                               s.icon === 'Handshake' ? Handshake : 
                               s.icon === 'Mic2' ? Mic2 : 
                               s.icon === 'Store' ? Store : Globe;

              return (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 md:py-1 flex-1 min-w-fit"
                  style={{ position: "relative" }}
                >
                  {i < (settings.bottomBarStats.length - 1) && (
                    <div className="hidden lg:block"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "8px",
                        bottom: "8px",
                        width: "1px",
                        background: "linear-gradient(to bottom, transparent, #e2e8f0, transparent)",
                      }}
                    />
                  )}
                  <div className="flex items-center justify-center flex-shrink-0">
                    <IconComp
                      className="w-4 h-4 md:w-5 md:h-5 opacity-80"
                      style={{ color: i % 2 === 0 ? "#23471d" : "#2563c8" }}
                    />
                  </div>
                  <div className="whitespace-nowrap">
                    <div className="text-slate-800 text-[7.5px] md:text-[7px] font-bold leading-none mb-0.5">{s.label}</div>
                    <div className="font-black text-slate-900 text-[10px] md:text-[9px] leading-tight">{s.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="flex flex-col relative flex-1 justify-center w-full min-h-0 ml-0 md:-ml-5"
            style={{
              zIndex: 2,
            }}
          >
            {/* Bleeding background to the right edge */}
            <div 
              className="rounded-[24px] md:rounded-none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                background: "linear-gradient(90deg, #1a3a12 0%, #2d5c1e 45%, #a4c639 100%)",
                clipPath: window.innerWidth > 1024 ? "polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)" : "none",
                zIndex: -1
              }}
            />
            <div className="relative z-10 py-2 md:py-1 px-6 md:pl-12 md:pr-10 text-center md:text-left">
            <div style={{ position: "absolute", top: "10px", right: "10%", opacity: 0.1, pointerEvents: "none" }}>
              <svg width="40" height="40" viewBox="0 0 42 42" fill="none">
                {[7, 21, 35].flatMap(x =>
                  [7, 21, 35].map(y => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r="2.8" fill="white" />
                  ))
                )}
              </svg>
            </div>

            <div className="flex flex-col md:flex-row items-center md:justify-start gap-1 md:gap-2 mb-4 md:mb-0">
              <span className="text-white font-bold text-lg md:text-[16px]">
                {settings.ctaMainText || "Be the Next"}
              </span>
              <span className="text-[#f5c842] font-black text-xl md:text-[16px]">
                {settings.ctaSubText || "Success Story"}
              </span>
              <div className="text-white font-black text-lg md:text-[16px] md:ml-1">
                {settings.ctaBottomText || "at IHWE 2026!"}
              </div>
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
              
              <button
                onClick={() => settings.ctaButton2Path && window.open(settings.ctaButton2Path, '_blank')}
                className="flex items-center justify-center gap-2 font-black text-[12px] md:text-[10px] w-full sm:w-auto px-8 py-3.5 md:px-4 md:py-2 rounded-xl md:rounded-lg transition-all duration-300 whitespace-nowrap"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1.2px solid rgba(255,255,255,0.3)",
                  color: "white",
                  boxShadow: "rgba(0,0,0,0.2) 0 4px 10px",
                }}
              >
                {settings.ctaButton2Name || "Apply Now"} <ChevronRight className="w-3 h-3 md:w-2.5 md:h-2.5" />
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