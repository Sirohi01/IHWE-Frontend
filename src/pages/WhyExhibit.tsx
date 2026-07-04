import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import { 
  Users, Handshake, Globe, Mic, Calendar, MapPin, 
  ArrowRight, Download, CheckCircle2, Star, Award, 
  TrendingUp, Search, Target, Megaphone, Zap, BarChart3,
  Stethoscope, Pill, HeartPulse, Microscope, Building2, 
  Activity, Sparkles, GraduationCap, Plane, Leaf, Quote,
  Phone, Mail, Globe2, QrCode, PlayCircle, ShieldCheck, Heart, Check
} from "lucide-react";
import SectionContainer from "@/components/layout/SectionContainer";
import { cn } from "@/lib/utils";
import AOS from "aos";
import "aos/dist/aos.css";
import { exhibitorTestimonialsApi, settingsApi, SERVER_URL } from "@/lib/api";

// Assets
import exhibitBg from "@/assets/exhibitbg.webp";
import pragatiMaidan from "@/assets/Pragati-Maidan.jpg";
import leafPng from "@/assets/leaf.png";
import buyerImg1 from "@/assets/h1.png";
import buyerImg2 from "@/assets/h2.png";
import buyerImg3 from "@/assets/h3.png";
import exhib1 from "@/assets/exhib1.png";
import exhib2 from "@/assets/exhib2.png";
import exhib3 from "@/assets/exhib3.png";
import exhib4 from "@/assets/exhib4.png";
import band1 from "@/assets/band1.png";
import band2 from "@/assets/band2.png";
import band3 from "@/assets/band3.png";
import band4 from "@/assets/band4.png";
import band5 from "@/assets/band5.png";
import applybg from "@/assets/applybg.png";
import leftbg from "@/assets/leftbg.webp";
import top1 from "@/assets/top1.png";
import top2 from "@/assets/top2.png";
import top3 from "@/assets/top3.png";
import top4 from "@/assets/top4.png";
import top6 from "@/assets/top6.png";
import herbal1 from "@/assets/herbal1.png";
import herbal2 from "@/assets/herbal2.png";
import herbal3 from "@/assets/herbal3.png";
import herbal5 from "@/assets/herbal5.png";
import herbal6 from "@/assets/herbal6.png";
import meet1 from "@/assets/meet1.webp";
import meet2 from "@/assets/meet2.webp";
import meet3 from "@/assets/meet3.webp";
import footbg from "@/assets/footbg.png";
import leaf2 from "@/assets/leaf2.png";

// ── Animated counter — counts up when scrolled into view ──
const LocalStatCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Handle non-numeric strings like "B2B"
  if (!/^[\d,]+/.test(value)) return <span>{value}</span>;

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

// Sparkle component for premium buttons
const Sparkle = ({ style, color = '#ffdd00', shadow = '#ffa500' }: { style?: React.CSSProperties, color?: string, shadow?: string }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '12px',
      color: color,
      textShadow: `0 0 6px ${shadow}, 0 0 12px ${shadow}`,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

const ExhibitorTestimonialCard = ({ item, expandedCardId, setExpandedCardId, index }: { item: any; expandedCardId: number | null; setExpandedCardId: (id: number | null) => void; index: number }) => {
  const isExpanded = expandedCardId === index;
  const setIsExpanded = (val: boolean) => {
    setExpandedCardId(val ? index : null);
  };
  const CHAR_LIMIT = 155;
  const quoteText = item.quote || "";
  const isLong = quoteText.length > CHAR_LIMIT;

  return (
    <div className="relative flex flex-col w-[250px] md:w-[230px] flex-shrink-0" style={{ paddingTop: '32px' }}>
      {/* Floating Portrait Circle */}
      <div className="absolute top-0 left-1/2 z-20 flex items-center justify-center" style={{ transform: 'translateX(-50%)' }}>
        <div
          className="w-16 h-16 rounded-full border-[3px] border-white flex items-center justify-center overflow-hidden bg-white"
          style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.15), 0 0 0 2px #e2e8f0" }}
        >
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Card Body */}
      <div
        className="relative bg-white rounded-[22px] border border-slate-100 flex flex-col overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-500"
        style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", height: '280px' }}
      >
        {/* Expanded Overlay */}
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
              <div
                className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-shrink-0"
                style={{ background: "linear-gradient(90deg, #f8fdf5 0%, #fff8f3 100%)" }}
              >
                <div className="flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-[#1a6b3a] transform -scale-x-100" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Review</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                  className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-200"
                  style={{ color: '#071056', background: '#f0faf0', border: '1px solid #c6e6c6' }}
                >
                  ✕ Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-3">
                <p className="text-slate-800 text-[11.5px] font-medium leading-relaxed">{item.quote}</p>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-3 border-t border-slate-100 flex-shrink-0" style={{ background: "#fafafa" }}>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-white flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[10px] leading-tight text-[#071056]">{item.companyName1}</div>
                  {item.companyName2 && (
                    <div className="font-semibold text-[9px] leading-tight text-[#d26019] mt-0.5">{item.companyName2}</div>
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

        {/* Top: Name & Role */}
        <div className="pt-[52px] px-4 pb-0 text-center flex-shrink-0 min-h-[82px]">
          {/* Company 1 Slot */}
          <div className="h-[16px] mb-0.5">
            <div className="font-bold text-[11.5px] leading-tight text-[#071056] px-1 flex items-center justify-center">
              <span className={item.companyName1.length > 25 ? "truncate max-w-[190px]" : ""}>{item.companyName1}</span>
              {item.companyName1.length > 25 && (
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
            <div className="font-bold text-[10.5px] leading-tight text-[#d26019] uppercase tracking-widest px-1 opacity-90 flex items-center justify-center">
              {item.companyName2 ? (
                <>
                  <span className={item.companyName2.length > 30 ? "truncate max-w-[190px]" : ""}>{item.companyName2}</span>
                  {item.companyName2.length > 30 && (
                    <span 
                      onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                      className="text-red-600 font-black cursor-pointer hover:underline ml-0.5"
                      style={{ fontSize: '14px', lineHeight: '10px' }}
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

        {/* Gradient Divider */}
        <div
          className="h-[1.5px] mx-4 mt-3 rounded-full flex-shrink-0"
          style={{ background: "linear-gradient(90deg, #071056, #d26019)" }}
        />

        {/* Quote Section */}
        <div className="flex flex-col flex-1 px-4 pt-3 pb-3 relative min-h-0">
          <Quote className="w-5 h-5 text-[#1a6b3a] transform -scale-x-100 opacity-70 mb-1.5 flex-shrink-0" />
          <div className="flex-1 overflow-hidden">
            <p className="text-slate-700 text-[11px] font-medium leading-relaxed whitespace-pre-line">
              {isLong ? `${quoteText.substring(0, CHAR_LIMIT).trim()}…` : quoteText}
            </p>
          </div>
          {/* Read More */}
          <div className="mt-auto pt-2 flex-shrink-0">
            {isLong && (
              <button
                onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                className="flex items-center gap-0.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full transition-all duration-200 hover:gap-1"
                style={{ color: '#071056', background: 'linear-gradient(90deg, #eaf5e2 0%, #fff6ee 100%)', border: '1px solid #c6e6c6' }}
              >
                Read more <span style={{ fontSize: '8px' }}>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const WhyExhibit = () => {
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonialHeading, setTestimonialHeading] = useState("What Our Exhibitors Say");
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
    loadTestimonials();
    
    const fetchSettings = async () => {
      try {
        const data = await settingsApi.get();
        if (data) setSettings(data);
      } catch (error) {
        console.error("Failed to load settings in WhyExhibit:", error);
      }
    };
    fetchSettings();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await exhibitorTestimonialsApi.get();
      if (data) {
        if (data.heading) setTestimonialHeading(data.heading);
        if (data.cards && data.cards.length > 0) {
          const mapped = data.cards.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((c: any) => ({
            id: c._id,
            companyName1: c.companyName1,
            companyName2: c.companyName2,
            location: c.location,
            quote: c.quote,
            image: c.image ? (c.image.startsWith('http') ? c.image : `${SERVER_URL}${c.image}`) : null
          }));
          setTestimonials(mapped);
        }
      }
    } catch (error) {
      console.error("Failed to load testimonials:", error);
    }
  };

  const marqueeStyles = `
    @keyframes marqueeScrollTestimonials {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .testimonials-marquee {
      display: flex;
      width: max-content;
      animation: marqueeScrollTestimonials 40s linear infinite;
    }
    .testimonials-marquee:hover {
      animation-play-state: paused;
    }
  `;

  const stats = [
    { 
      img: band1, 
      val: "8,000+", 
      label: "VISITORS / DELEGATES", 
      desc1: "Qualified trade visitors",
      desc2: "from India & across the globe"
    },
    { 
      img: band2, 
      val: "150+", 
      label: "EXHIBITORS", 
      desc1: "Leading brands &",
      desc2: "organizations participating"
    },
    { 
      img: band3, 
      val: "1000+", 
      label: "GLOBAL BUYERS", 
      desc1: "Global participation",
      desc2: "& representation"
    },
    { 
      img: band4, 
      val: "150+", 
      label: "EXPERTS SPEAKERS", 
      desc1: "Industry experts",
      desc2: "& thought leaders"
    },
    { 
      img: band5, 
      val: "B2B", 
      label: "MEETINGS", 
      desc1: "Pre-scheduled meetings",
      desc2: "that drive real business"
    },
  ];

  const reasons = [
    { 
      title1: "GLOBAL", 
      title2: "BUYER ACCESS",
      img: top1, 
      color: "#1a6b3a", 
      descLines: [
        "Meet thousands of",
        "qualified buyers, importers,",
        "distributors and decision-",
        "makers from around the world."
      ],
      points: ["Access new global markets", "Connect with key buyers", "Increase international reach"]
    },
    { 
      title1: "MAXIMUM BRAND", 
      title2: "VISIBILITY",
      img: top2, 
      color: "#3b82f6", 
      descLines: [
        "Showcase your brand to a",
        "highly targeted audience",
        "and stand out in the",
        "competitive market."
      ],
      points: ["High brand recall", "Media & PR exposure", "Digital promotions"]
    },
    { 
      title1: "EXPAND YOUR", 
      title2: "NETWORK",
      img: top3, 
      color: "#1a6b3a", 
      descLines: [
        "Build valuable connections",
        "with industry leaders,",
        "partners and potential",
        "collaborators."
      ],
      points: ["New partnerships", "Business alliances", "Long-term relationships"]
    },
    { 
      title1: "LAUNCH & SHOWCASE", 
      title2: "INNOVATIONS",
      img: top4, 
      color: "#8b5cf6", 
      descLines: [
        "Introduce new products,",
        "technologies and solutions",
        "to the right audience."
      ],
      points: ["Product launches", "Live demonstrations", "Market validation"]
    },
    { 
      title1: "B2B MATCHMAKING", 
      title2: "& MEETINGS",
      img: band5, 
      color: "#f59e0b", 
      descLines: [
        "Pre-scheduled B2B",
        "meetings to generate",
        "quality leads and",
        "new business."
      ],
      points: ["One-to-one meetings", "Targeted matchmaking", "Better conversions"]
    },
    { 
      title1: "BOOST SALES &", 
      title2: "BUSINESS GROWTH",
      img: top6, 
      color: "#10b981", 
      descLines: [
        "Explore new markets,",
        "increase exports and",
        "drive long-term",
        "business growth."
      ],
      points: ["Increase revenue", "Expand customer base", "Sustainable growth"]
    },
  ];

  const industries = [
    { icon: herbal1, line1: "Ayush &", line2: "Herbal" },
    { icon: herbal2, line1: "Pharmaceuticals", line2: "& Drugs" },
    { icon: herbal3, line1: "Medical", line2: "Devices" },
    { icon: herbal5, line1: "Nutraceuticals", line2: "& Supplements" },
    { icon: herbal3, line1: "Hospital &", line2: "Diagnostics" },
    { icon: herbal6, line1: "Fitness &", line2: "Wellness" },
    { icon: Sparkles, line1: "Beauty &", line2: "Personal Care" },
    { icon: Heart, line1: "Mental Health", line2: "& Well-being" },
    { icon: Microscope, line1: "Health Tech &", line2: "Digital Health" },
    { icon: Plane, line1: "Medical Tourism &", line2: "Wellness Travel" },
  ];

  // Local testimonials removed - now fetched from API
  // const testimonials = [...];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden font-inter">
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
        .golden-btn-hero {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 16px 4px rgba(255,200,0,0.3), 0 4px 15px rgba(255,165,0,0.25);
          position: relative;
          overflow: hidden;
        }
        @keyframes marqueeScrollTestimonials {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .testimonials-marquee {
          display: flex;
          width: max-content;
          animation: marqueeScrollTestimonials 40s linear infinite;
        }
        .testimonials-marquee:hover {
          animation-play-state: paused;
        }
        .golden-btn-hero::before {
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
        .golden-btn-footer {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 16px 4px rgba(255,200,0,0.3), 0 4px 15px rgba(255,165,0,0.25);
          position: relative;
          overflow: hidden;
        }
        .golden-btn-footer::before {
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
        .blue-btn-hero {
          background: linear-gradient(135deg, #28396C 0%, #3d528f 30%, #1e2a50 60%, #28396C 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 16px 4px rgba(40,57,108,0.3), 0 4px 15px rgba(40,57,108,0.25);
          position: relative;
          overflow: hidden;
        }
        .blue-btn-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
      `}</style>
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative flex items-center pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden aspect-[0.75/1] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/7] min-h-[380px] md:min-h-[420px] lg:min-h-[480px]">
        {/* BG Image */}
        <div className="absolute inset-0 z-0 w-full overflow-hidden pointer-events-none">
          <img src={exhibitBg} alt="Exhibit BG" className="w-full h-full object-cover object-center md:object-[center_37%] max-w-full" />
          <div className="absolute inset-0 bg-white/75 lg:bg-transparent" />
        </div>

        <SectionContainer className="relative z-10 py-1 md:py-2">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Content */}
            <div className="w-full lg:w-3/5 -mt-2 md:-mt-4" data-aos="fade-right">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <span className="w-8 h-[2px] bg-[#d26019]" />
                <p 
                  className="text-[#d26019] text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em] text-center lg:text-left"
                  style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.3)' }}
                >
                  Why Exhibit at IHWE 2026
                </p>
              </div>
              <h1 
                className="text-2xl md:text-4xl font-black leading-[1.1] mb-3 text-center lg:text-left"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}
              >
                <span className="text-[#0e174f] text-xl md:text-3xl">SHOWCASE. CONNECT.</span> <br />
                <span className="text-[#085006] text-[26px] md:text-[43px]">GROW GLOBALLY.</span>
              </h1>
              <p 
                className="text-base md:text-lg font-bold text-[#0e174f] mb-0.5 text-center lg:text-left"
                style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.2)' }}
              >
                Exhibit at IHWE 2026
              </p>
              <p 
                className="text-[#131730] text-[13px] md:text-[15px] max-w-xl mb-5 font-semibold leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
                style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.1)' }}
              >
                India's Leading International Platform for <br />
                <span className="text-[#255428] font-bold">Health, Medical, Wellness & Well-being</span>
              </p>

              {/* Feature Highlights with Images & Dividers */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-2.5 mb-8">
                {[
                  { main: "Global", sub: "Exposure", img: exhib1 },
                  { main: "Quality", sub: "Connections", img: exhib2 },
                  { main: "Business", sub: "Growth", img: exhib3 },
                  { main: "Brand", sub: "Visibility", img: exhib4 }
                ].map((item, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="flex items-center gap-1.5">
                      <img src={item.img} alt={item.main} className="w-7 md:w-8 h-auto shrink-0" />
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] md:text-[11px] font-black text-[#020633] uppercase leading-none">{item.main}</span>
                        <span className="text-[10px] md:text-[11px] font-bold text-[#d26019] uppercase tracking-tighter mt-0.5">{item.sub}</span>
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="h-6 w-[1px] bg-slate-300/40 hidden sm:block mx-1" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="relative w-full sm:w-auto">
                  <Sparkle color="#ffdd00" shadow="#ffa500" style={{ top: '-12px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle color="#ffdd00" shadow="#ffa500" style={{ top: '-15px', left: '50%', animationDelay: '0.4s' }} />
                  <Sparkle color="#ffdd00" shadow="#ffa500" style={{ top: '-10px', right: '10%', animationDelay: '0.8s' }} />
                  <Link 
                    to="/book-a-stand" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="golden-btn-hero text-[#050A1A] px-6 py-3 rounded-lg font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-2xl relative z-10 w-full sm:w-auto"
                  >
                    Book Your Stall <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="relative w-full sm:w-auto">
                  <Sparkle color="#3b82f6" shadow="#28396C" style={{ top: '-12px', left: '10%', animationDelay: '0.2s' }} />
                  <Sparkle color="#3b82f6" shadow="#28396C" style={{ top: '-15px', left: '50%', animationDelay: '0.6s' }} />
                  <Sparkle color="#3b82f6" shadow="#28396C" style={{ top: '-10px', right: '10%', animationDelay: '1s' }} />
                  <a 
                    href={settings?.downloadBrochurePdf ? `${SERVER_URL}${settings.downloadBrochurePdf}` : "/pdf.pdf"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="blue-btn-hero text-white px-6 py-3 rounded-lg font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg relative z-10 w-full sm:w-auto"
                  >
                    Download Brochure <Download size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-fit lg:w-[190px] mx-auto lg:ml-auto lg:mr-0" data-aos="fade-left">
              <div className="bg-white px-5 py-3 lg:py-6 rounded-xl shadow-2xl border border-slate-100 flex flex-col gap-2.5 lg:gap-5 w-full">
                
                {/* Date */}
                <div className="flex items-center lg:items-start gap-2.5">
                  <Calendar className="text-[#0e174f] shrink-0" size={26} strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <h3 className="text-lg md:text-xl font-black text-[#0e174f] leading-none m-0 p-0">21 – 23</h3>
                    <span className="text-[10px] font-bold text-[#0e174f] uppercase tracking-wide mt-0.5 m-0 p-0">AUGUST 2026</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center lg:items-start gap-2.5">
                  <MapPin className="text-[#2f8f3a] shrink-0" size={26} strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <h3 className="text-[12px] font-black text-[#0e174f] leading-tight uppercase m-0 p-0">PRAGATI MAIDAN,</h3>
                    <span className="text-[11px] font-bold text-[#0e174f] uppercase tracking-tight m-0 p-0">NEW DELHI, INDIA</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-200" />

                {/* Quote */}
                <div className="text-left lg:text-center flex flex-col gap-0.5 m-0 p-0">
                  <span className="text-[#316234] font-black text-[11px] leading-tight m-0 p-0">
                    A Global Convergence
                  </span>
                  <span className="text-[#0e174f] font-black text-[11px] leading-tight m-0 p-0">
                    of Health & Wellness
                  </span>
                  <span className="text-[#0e174f] font-black text-[11px] leading-tight mt-0.5 m-0 p-0">
                    Innovators
                  </span>
                </div>
              </div>
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* ─── STATS BAND ─── */}
      <div className="relative z-20 -mt-9 md:-mt-12">
        <SectionContainer>
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
                      <LocalStatCounter value={stat.val} />
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
        </SectionContainer>
      </div>

      {/* ─── TOP REASONS SECTION ─── */}
      <section className="mt-4 pt-4 pb-0 bg-slate-50">
        <SectionContainer>
          <div className="text-center mb-4" data-aos="fade-up">
            <div className="flex items-center justify-center gap-4 mb-4">
               <span className="w-12 h-[2px] bg-[#1a6b3a]" />
               <span className="text-[#0c0c3e] font-semibold text-lg md:text-xl uppercase tracking-[0.1em]">Top Reasons to Exhibit at IHWE 2026</span>
               <span className="w-12 h-[2px] bg-[#1a6b3a]" />
            </div>
            {/* <h2 className="text-3xl md:text-4xl font-black text-[#00153c]">Why Your Brand Needs to be Here</h2> */}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
            {reasons.map((reason, i) => (
              <div 
                key={i}
                className="bg-white p-3 md:p-5 rounded-2xl border border-transparent flex flex-col items-center text-center group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="mb-2 h-10 md:h-16 flex items-center justify-center transition-transform group-hover:scale-110">
                  <img src={reason.img} alt="" className="w-10 md:w-16 h-full object-contain" />
                </div>
                
                <h3 className="text-[10px] md:text-[12px] font-black text-[#0c0c3e] mb-2 tracking-tight leading-tight uppercase min-h-[32px] md:min-h-[40px] flex flex-col items-center justify-center">
                  <span>{reason.title1}</span>
                  <span>{reason.title2}</span>
                </h3>
                
                <div className="text-slate-900 text-[8px] md:text-[10px] leading-tight mb-3 font-bold flex-1 flex flex-col items-center justify-center">
                  {reason.descLines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                
                <ul className="space-y-1 w-full text-left border-t border-slate-100 pt-3 mt-auto">
                  {reason.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[8px] md:text-[9px] font-bold text-slate-700">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ─── GOVT PMS SCHEME BANNER ─── */}
      {settings?.showGovtPmsScheme !== false && (
        <section className="py-0 mt-4">
          <SectionContainer>
            <div
              className="w-full rounded-[30px] flex flex-col md:flex-row items-stretch overflow-hidden relative"
              style={{
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                background: '#fdf9ed',
                minHeight: '160px'
              }}
              data-aos="fade-up"
            >
              {/* Image Section */}
              <div className="w-full md:w-[38%] h-[160px] md:h-auto flex-shrink-0 relative overflow-hidden">
                <img
                  src={leftbg}
                  alt="PMS Scheme"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>

              {/* Right Text Content */}
              <div className="flex-1 flex flex-col justify-center px-6 md:px-10 py-5 md:py-6 relative z-10">
                {/* Heading */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-[2px] bg-[#1a682d] rou  nded-full" />
                  {/* <p className="text-[10px] md:text-[11px] font-black text-[#1a682d] uppercase tracking-widest">Government Scheme</p> */}
                </div>
                <h2 className="text-[15px] md:text-[22px] font-black text-[#00153c] leading-tight mb-1 uppercase">
                  Exhibit Under <br />
                  <span className="text-[#1a682d]">Government PMS Scheme</span>
                </h2>
                <p className="text-[10px] md:text-[12px] font-semibold mb-3 leading-relaxed max-w-md" style={{ color: '#070e48' }}>
                  Eligible MSMEs can get reimbursement support on <br />
                  participation expenses under the PMS Scheme.
                </p>

                {/* Feature items */}
                <div className="flex flex-wrap md:flex-nowrap items-center gap-y-2 gap-x-5 md:gap-0 mt-1">
                  {[
                    { img: band1, line1: 'Stall Cost', line2: 'Support' },
                    { img: band2, line1: 'Travel', line2: 'Assistance' },
                    { img: band3, line1: 'Global', line2: 'Exposure' },
                  ].map((item, i, arr) => (
                    <div key={i} className="flex items-center">
                      <div className="flex items-center gap-3 pr-4 md:px-3">
                        <img src={item.img} alt={item.line1} className="w-8 h-8 md:w-9 md:h-9 object-contain flex-shrink-0" />
                        <div className="flex flex-col leading-tight">
                          <span className="text-[10px] md:text-[11px] font-black uppercase whitespace-nowrap" style={{ color: '#070e48' }}>{item.line1}</span>
                          <span className="text-[10px] md:text-[11px] font-black uppercase whitespace-nowrap" style={{ color: '#070e48' }}>{item.line2}</span>
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="hidden md:block w-px h-8 bg-slate-300 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="px-6 pb-8 md:p-0 md:absolute md:bottom-4 md:right-4 z-10 flex flex-col items-start md:items-end">
                <div className="relative group/btn w-full md:w-auto">
                  {/* Sparkles */}
                  <Sparkle color="#5E0006" shadow="#3D0004" style={{ top: '-10px', left: '10%', animationDelay: '0.1s' }} />
                  <Sparkle color="#5E0006" shadow="#3D0004" style={{ top: '-12px', left: '40%', animationDelay: '0.5s' }} />
                  <Sparkle color="#5E0006" shadow="#3D0004" style={{ top: '-8px', right: '15%', animationDelay: '0.9s' }} />
                  <Sparkle color="#5E0006" shadow="#3D0004" style={{ bottom: '-10px', left: '25%', animationDelay: '0.3s' }} />
                  <Sparkle color="#5E0006" shadow="#3D0004" style={{ bottom: '-12px', right: '30%', animationDelay: '0.7s' }} />
                  <Link
                    to="/government-msme-pms-schemes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-black text-[10px] md:text-[11px] uppercase tracking-wider text-white transition-all active:scale-95 relative z-10 hover:scale-[1.02] w-full md:w-auto"
                    style={{ 
                      background: 'linear-gradient(135deg, #5E0006 0%, #3D0004 100%)',
                      boxShadow: '0 4px 14px rgba(94, 0, 6, 0.4)'
                    }}
                  >
                    Apply Under PMS Scheme <ArrowRight size={13} />
                  </Link>
                </div>
                <p className="text-[8px] md:text-[9px] text-slate-400 font-semibold mt-1.5 ml-1 md:mr-0.5">*T&amp;C Apply</p>
              </div>

              {/* Decorative Leaf - Right Bottom (inside card, clipped by overflow-hidden) */}
              <img
                src={leaf2}
                alt=""
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-[140px] md:w-[210px] h-auto object-contain pointer-events-none select-none z-0"
                style={{ opacity: 1 }}
              />
            </div>
          </SectionContainer>
        </section>
      )}

      {/* ─── INDUSTRIES WE SERVE ─── */}
      <section className="pt-4 pb-8 bg-white">
        <SectionContainer>
          <div className="text-center mb-6" data-aos="fade-up">
            <div className="flex items-center justify-center gap-4 mb-4">
               <span className="w-12 h-[2px] bg-[#1a6b3a]" />
               <span className="text-[#0a092a] font-semibold text-lg md:text-xl uppercase tracking-[0.1em]">Industries We Serve</span>
               <span className="w-12 h-[2px] bg-[#1a6b3a]" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
            {industries.map((item, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center text-center group px-0.5 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d0d9e8] hover:shadow-[0_14px_30px_rgba(0,0,0,0.11)]"
                style={{ 
                  background: 'linear-gradient(145deg, #ffffff 0%, #e8f8f2 55%, #ddf0fa 100%)',
                  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                  border: '1px solid #e8edf2'
                }}
                data-aos="zoom-in"
                data-aos-delay={i * 50}
              >
                <div className="mb-3 transition-transform group-hover:scale-110">
                  {typeof item.icon === 'string' ? (
                    <img src={item.icon} alt={item.line1} className="w-8 h-8 object-contain" />
                  ) : (
                    <item.icon className="text-[#1a6b3a]" size={28} />
                  )}
                </div>
                <div className="flex flex-col items-center justify-center min-h-[30px] w-full px-1">
                  <span className="text-[10px] font-bold text-[#00153c] uppercase leading-tight tracking-tighter whitespace-normal">{item.line1}</span>
                  <span className="text-[10px] font-bold text-[#00153c] uppercase leading-tight tracking-tighter whitespace-normal">{item.line2}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ─── BUYER & DECISION MAKERS SECTION ─── */}
      <section className="py-2 bg-[#e9f3fd] overflow-hidden relative">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 items-center">
            {/* Left Content */}
            <div className="lg:col-span-3" data-aos="fade-right">
              <h2 className="text-[18px] md:text-2xl font-black text-[#08083c] mb-2 leading-[1.2] text-center lg:text-left">
                MEET GENUINE BUYERS & <br />
                DECISION MAKERS
              </h2>
              
              <div className="space-y-2 mb-2">
                {[
                  "Hospitals, Clinics & Healthcare Providers",
                  "Importers, Exporters & Distributors",
                  "Pharmacies & Retail Chains",
                  "Wellness Centres & Spa Chains",
                  "E-commerce & Online Retailers",
                  "Government & Institutional Buyers",
                  "Investors & Business Partners",
                  "Researchers & Academicians"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#5e9439] flex items-center justify-center shrink-0 shadow-sm">
                      <Check size={12} className="text-white" strokeWidth={4} />
                    </div>
                    <span className="text-[#08083c] font-semibold text-sm">{text}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/book-a-stand" 
                target="_blank"
                rel="noopener noreferrer"
                className="golden-btn-footer text-[#050A1A] px-8 py-3 rounded-lg font-black text-[11px] uppercase tracking-wider flex items-center gap-2 w-fit hover:scale-[1.02] transition-all group mx-auto lg:mx-0"
              >
                <div className="absolute inset-0 pointer-events-none">
                  <Sparkle style={{ top: '-4px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle style={{ top: '-6px', left: '40%', animationDelay: '0.4s' }} />
                  <Sparkle style={{ top: '-2px', right: '15%', animationDelay: '0.8s' }} />
                  <Sparkle style={{ bottom: '-4px', left: '25%', animationDelay: '0.2s' }} />
                  <Sparkle style={{ bottom: '-6px', right: '30%', animationDelay: '0.6s' }} />
                </div>
                Book Your Stall <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            </div>

            {/* Right Skewed Images */}
            <div className="lg:col-span-7" data-aos="fade-left">
              <div className="flex gap-2 h-[320px] md:h-[380px]">
                {[meet1, meet2, meet3].map((img, idx) => (
                  <div 
                    key={idx}
                    className="flex-1 overflow-hidden border-[3px] border-white shadow-xl transform -skew-x-12 rounded-[20px]"
                  >
                    <img 
                      src={img} 
                      alt={`Meet ${idx + 1}`} 
                      className="w-full h-full object-cover transform skew-x-12 scale-125" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ─── EXHIBITOR TESTIMONIALS ─── */}
      <section className="pt-4 pb-4 bg-white relative overflow-hidden">
        <style>{marqueeStyles}</style>
        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 z-0" />
        
        <SectionContainer className="relative z-10 !max-w-none px-0">
          <div className="text-center mb-10" data-aos="fade-up">
            <div className="flex items-center justify-center gap-4">
              <span className="w-10 md:w-16 h-[2px] bg-[#1a6b3a] rounded-full" />
              <h2 className="text-xl md:text-2xl font-bold text-[#071056] uppercase tracking-tight">{testimonialHeading}</h2>
              <span className="w-10 md:w-16 h-[2px] bg-[#1a6b3a] rounded-full" />
            </div>
          </div>

          <div className="relative w-full overflow-hidden -mt-16">
            <div className="testimonials-marquee flex gap-10 py-12">
              {[...testimonials, ...testimonials].map((item, i) => (
                <div key={i}>
                  <ExhibitorTestimonialCard 
                    item={item} 
                    index={i}
                    expandedCardId={expandedCardId}
                    setExpandedCardId={setExpandedCardId}
                  />
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ─── FINAL IMAGE BANNER ─── */}
      {/* <section className="pb-12 pt-0 -mt-12">
 
        <div className="flex items-center justify-center gap-4 mb-6 px-4" data-aos="fade-up">
          <span className="w-8 md:w-12 h-[2px] bg-[#1a6b3a] rounded-full" />
          <h2 className="text-xl md:text-3xl font-bold text-[#071056] uppercase tracking-tight text-center">
            Why IHWE is Different?
          </h2>
          <span className="w-8 md:w-12 h-[2px] bg-[#1a6b3a] rounded-full" />
        </div>

        <div 
          className="w-full shadow-lg h-[200px] md:h-[260px]"
          style={{ 
            backgroundImage: `url(${footbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </section> */}
    </div>
  );
};

export default WhyExhibit;
