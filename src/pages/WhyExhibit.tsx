import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate } from "framer-motion";
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

// Assets
import exhibitBg from "@/assets/exhibitbg.png";
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
import meet1 from "@/assets/meet1.png";
import meet2 from "@/assets/meet2.png";
import meet3 from "@/assets/meet3.png";
import footbg from "@/assets/footbg.png";

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

const ExhibitorTestimonialCard = ({ item }: { item: any }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
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
        {isExpanded && (
          <div
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
                <div className="font-bold text-[10px] leading-tight text-[#071056]">{item.name}</div>
                <div className="font-semibold text-[9px] leading-tight text-[#d26019] mt-0.5">{item.role}</div>
              </div>
            </div>
          </div>
        )}

        {/* Top: Name & Role */}
        <div className="pt-[52px] px-4 pb-0 text-center flex-shrink-0 min-h-[82px]">
          <div className="h-[16px] mb-0.5">
            <h4 className="font-bold text-[11.5px] leading-tight text-[#071056]">{item.name}</h4>
          </div>
          <div className="h-[16px]">
            <p className="font-bold text-[10.5px] leading-tight text-[#d26019] uppercase tracking-widest">{item.role}</p>
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
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

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
      label: "VISITORS", 
      desc1: "Qualified trade visitors",
      desc2: "from India & across the globe"
    },
    { 
      img: band2, 
      val: "300+", 
      label: "EXHIBITORS", 
      desc1: "Leading brands &",
      desc2: "organizations participating"
    },
    { 
      img: band3, 
      val: "25+", 
      label: "COUNTRIES", 
      desc1: "Global participation",
      desc2: "& representation"
    },
    { 
      img: band4, 
      val: "100+", 
      label: "SPEAKERS", 
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

  const testimonials = [
    {
      name: "Rahul Mehta",
      role: "CEO, NutriLife Pvt. Ltd.",
      quote: "IHWE gave us the perfect platform\nto showcase our products and meet\nquality international buyers.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Dr. Neha Sharma",
      role: "Director, Herbalove Wellness",
      quote: "Excellent organization, great footfall and high-quality B2B meetings. We will definitely exhibit again!",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Vikram Sood",
      role: "Managing Director, WellnessKart",
      quote: "A must-attend event for every business in the health & wellness industry.",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Anjali Gupta",
      role: "Founder, PureVeda",
      quote: "The quality of delegates was impressive. We closed three major distribution deals during the expo.",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Rajesh Khanna",
      role: "VP Marketing, Global Healthcare",
      quote: "Outstanding visibility for our new range of smart wellness devices. IHWE is the place to be.",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: "Sanjay Singhania",
      role: "MD, Zenith Pharma",
      quote: "Networking opportunities were second to none. We've already booked for 2027!",
      image: "https://randomuser.me/api/portraits/men/85.jpg"
    },
    {
      name: "Meera Reddy",
      role: "CEO, AyurAura",
      quote: "The support from the organizers was exceptional. A truly world-class exhibition experience.",
      image: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      name: "David Wilson",
      role: "Director, EuroMed Partners",
      quote: "As international exhibitors, we found the Indian market potential huge. IHWE made entry easy.",
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

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
      <section className="relative min-h-[360px] flex items-center pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0 z-0 w-full overflow-hidden pointer-events-none">
          <img src={exhibitBg} alt="Exhibit BG" className="w-full h-full object-cover object-[center_37%] max-w-full" />
        </div>

        <SectionContainer className="relative z-10 py-1 md:py-2">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Content */}
            <div className="w-full lg:w-3/5 -mt-2 md:-mt-4" data-aos="fade-right">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[2px] bg-[#d26019]" />
                <p 
                  className="text-[#d26019] text-[13px] md:text-[15px] font-bold uppercase tracking-[0.2em]"
                  style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.3)' }}
                >
                  Why Exhibit at IHWE 2026
                </p>
              </div>
              <h1 
                className="text-2xl md:text-4xl font-black leading-[1.1] mb-3"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}
              >
                <span className="text-[#0e174f] text-xl md:text-3xl">SHOWCASE. CONNECT.</span> <br />
                <span className="text-[#085006] text-[26px] md:text-[43px]">GROW GLOBALLY.</span>
              </h1>
              <p 
                className="text-base md:text-lg font-bold text-[#0e174f] mb-0.5"
                style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.2)' }}
              >
                Exhibit at IHWE 2026
              </p>
              <p 
                className="text-[#131730] text-[13px] md:text-[15px] max-w-xl mb-5 font-semibold leading-relaxed"
                style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.1)' }}
              >
                India's Leading International Platform for <br />
                <span className="text-[#255428] font-bold">Health, Medical, Wellness & Well-being</span>
              </p>

              {/* Feature Highlights with Images & Dividers */}
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2.5 mb-8">
                {[
                  { main: "Global", sub: "Exposure", img: exhib1 },
                  { main: "Quality", sub: "Connections", img: exhib2 },
                  { main: "Business", sub: "Growth", img: exhib3 },
                  { main: "Brand", sub: "Visibility", img: exhib4 }
                ].map((item, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="flex items-center gap-1">
                      <img src={item.img} alt={item.main} className="w-5 md:w-7 h-auto shrink-0" />
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-black text-[#020633] uppercase leading-none">{item.main}</span>
                        <span className="text-[10px] font-bold text-[#d26019] uppercase tracking-tighter mt-0.5">{item.sub}</span>
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="h-6 w-[1px] bg-slate-300/40 hidden sm:block mx-0.5" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <Sparkle color="#ffdd00" shadow="#ffa500" style={{ top: '-12px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle color="#ffdd00" shadow="#ffa500" style={{ top: '-15px', left: '50%', animationDelay: '0.4s' }} />
                  <Sparkle color="#ffdd00" shadow="#ffa500" style={{ top: '-10px', right: '10%', animationDelay: '0.8s' }} />
                  <Link 
                    to="/book-a-stand" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="golden-btn-hero text-[#050A1A] px-6 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-2xl relative z-10"
                  >
                    Book Your Stall <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="relative">
                  <Sparkle color="#3b82f6" shadow="#28396C" style={{ top: '-12px', left: '10%', animationDelay: '0.2s' }} />
                  <Sparkle color="#3b82f6" shadow="#28396C" style={{ top: '-15px', left: '50%', animationDelay: '0.6s' }} />
                  <Sparkle color="#3b82f6" shadow="#28396C" style={{ top: '-10px', right: '10%', animationDelay: '1s' }} />
                  <a 
                    href="/pdf.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="blue-btn-hero text-white px-6 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-lg relative z-10"
                  >
                    Download Brochure <Download size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full lg:w-[190px] ml-auto" data-aos="fade-left">
              <div className="bg-white px-4 py-6 rounded-xl shadow-2xl border border-slate-100 flex flex-col gap-5">
                
                {/* Date */}
                <div className="flex items-start gap-2.5">
                  <Calendar className="text-[#0e174f] shrink-0" size={26} strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <h3 className="text-lg md:text-xl font-black text-[#0e174f] leading-none">21 – 23</h3>
                    <p className="text-[10px] font-bold text-[#0e174f] uppercase tracking-wide mt-0.5">AUGUST 2026</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="text-[#2f8f3a] shrink-0" size={26} strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <h3 className="text-[12px] font-black text-[#0e174f] leading-tight uppercase">PRAGATI MAIDAN,</h3>
                    <p className="text-[11px] font-bold text-[#0e174f] uppercase tracking-tight">NEW DELHI, INDIA</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-200" />

                {/* Quote */}
                <div className="text-center -mt-1">
                  <p className="text-[#316234] font-black text-[11px] leading-tight">
                    A Global Convergence
                  </p>
                  <p className="text-[#0e174f] font-black text-[11px] leading-tight">
                    of Health & Wellness
                  </p>
                  <p className="text-[#0e174f] font-black text-[11px] leading-tight mt-0.5">
                    Innovators
                  </p>
                </div>
              </div>
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* ─── STATS BAND ─── */}
      <div className="relative z-20 -mt-6 md:-mt-10">
        <SectionContainer>
          <div 
            className="bg-white rounded-2xl border border-slate-100 p-1.5 md:p-2"
            style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
          >
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-0">
            {stats.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center text-center group flex-1">
                  <img src={stat.img} alt={stat.label} className="w-8 h-8 md:w-10 md:h-10 mb-0.5 object-contain" />
                  <h4 className="text-lg md:text-xl font-extrabold text-[#050537] leading-none mb-0.5">
                    <LocalStatCounter value={stat.val} />
                  </h4>
                  <p className="text-[8px] md:text-[10px] font-black text-[#d26019] uppercase tracking-widest mb-0.5">{stat.label}</p>
                  <div className="text-[7px] md:text-[9px] text-black leading-tight font-bold px-1">
                    <p>{stat.desc1}</p>
                    <p>{stat.desc2}</p>
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden md:block w-px h-20 bg-slate-200" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>

      {/* ─── TOP REASONS SECTION ─── */}
      <section className="mt-4 pt-4 pb-16 bg-slate-50">
        <SectionContainer>
          <div className="text-center mb-4" data-aos="fade-up">
            <div className="flex items-center justify-center gap-4 mb-4">
               <span className="w-12 h-[2px] bg-[#1a6b3a]" />
               <span className="text-[#0c0c3e] font-semibold text-lg md:text-xl uppercase tracking-[0.1em]">Top Reasons to Exhibit at IHWE 2026</span>
               <span className="w-12 h-[2px] bg-[#1a6b3a]" />
            </div>
            {/* <h2 className="text-3xl md:text-4xl font-black text-[#00153c]">Why Your Brand Needs to be Here</h2> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {reasons.map((reason, i) => (
              <div 
                key={i}
                className="bg-white p-4 md:p-5 rounded-2xl border border-transparent flex flex-col items-center text-center group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="mb-4 h-12 md:h-16 flex items-center justify-center transition-transform group-hover:scale-110">
                  <img src={reason.img} alt="" className="w-12 md:w-16 h-full object-contain" />
                </div>
                
                <h3 className="text-[11px] md:text-[12px] font-black text-[#0c0c3e] mb-3 tracking-tight leading-tight uppercase min-h-[40px] flex flex-col items-center justify-center">
                  <span>{reason.title1}</span>
                  <span>{reason.title2}</span>
                </h3>
                
                <div className="text-slate-900 text-[9px] md:text-[10px] leading-tight mb-4 font-bold flex-1 flex flex-col items-center justify-center">
                  {reason.descLines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                
                <ul className="space-y-1.5 w-full text-left border-t border-slate-100 pt-4 mt-auto">
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
      <section className="py-0 overflow-hidden">
        <SectionContainer className="max-w-none w-full px-4">
          <img 
            src={applybg} 
            alt="Apply Under PMS Scheme" 
            className="w-full h-[160px] md:h-[220px] object-cover rounded-[30px] mt-8"
            style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' }}
            data-aos="fade-up"
          />
        </SectionContainer>
      </section>

      {/* ─── INDUSTRIES WE SERVE ─── */}
      <section className="pt-4 pb-8 bg-white">
        <SectionContainer className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6" data-aos="fade-up">
            <div className="flex items-center justify-center gap-4 mb-4">
               <span className="w-12 h-[2px] bg-[#1a6b3a]" />
               <span className="text-[#0a092a] font-semibold text-lg md:text-xl uppercase tracking-[0.1em]">Industries We Serve</span>
               <span className="w-12 h-[2px] bg-[#1a6b3a]" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1">
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
                  <span className="text-[10px] font-bold text-[#00153c] uppercase leading-tight tracking-tighter whitespace-nowrap">{item.line1}</span>
                  <span className="text-[10px] font-bold text-[#00153c] uppercase leading-tight tracking-tighter whitespace-nowrap">{item.line2}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ─── BUYER & DECISION MAKERS SECTION ─── */}
      <section className="py-2 bg-[#e9f3fd] overflow-hidden relative">
        <SectionContainer className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 items-center">
            {/* Left Content */}
            <div className="lg:col-span-3" data-aos="fade-right">
              <h2 className="text-xl md:text-2xl font-black text-[#08083c] mb-1 leading-[1.1]">
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

              <Link to="/book-a-stand" className="golden-btn-footer text-[#050A1A] px-8 py-3 rounded-lg font-black text-[11px] uppercase tracking-wider flex items-center gap-2 w-fit hover:scale-[1.02] transition-all group">
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
              <div className="flex gap-2 h-[320px] md:h-[380px] -mr-20">
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
      <section className="pt-4 pb-12 bg-white relative overflow-hidden">
        <style>{marqueeStyles}</style>
        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 z-0" />
        
        <SectionContainer className="relative z-10 !max-w-none px-0">
          <div className="text-center mb-10" data-aos="fade-up">
            <div className="flex items-center justify-center gap-4">
              <span className="w-10 md:w-16 h-[2px] bg-[#1a6b3a] rounded-full" />
              <h2 className="text-xl md:text-2xl font-bold text-[#071056] uppercase tracking-tight">What Our Exhibitors Say</h2>
              <span className="w-10 md:w-16 h-[2px] bg-[#1a6b3a] rounded-full" />
            </div>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="testimonials-marquee flex gap-10">
              {[...testimonials, ...testimonials].map((item, i) => (
                <div key={i}>
                  <ExhibitorTestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ─── FINAL IMAGE BANNER ─── */}
      <section className="pb-12 pt-4">
        {/* Heading above image */}
        <div className="flex items-center justify-center gap-4 mb-6 px-4" data-aos="fade-up">
          <span className="w-8 md:w-12 h-[2px] bg-[#1a6b3a] rounded-full" />
          <h2 className="text-xl md:text-3xl font-bold text-[#071056] uppercase tracking-tight text-center">
            Why IHWE is Different?
          </h2>
          <span className="w-8 md:w-12 h-[2px] bg-[#1a6b3a] rounded-full" />
        </div>
        {/* Full width image */}
        <div 
          className="w-full shadow-lg h-[200px] md:h-[260px]"
          style={{ 
            backgroundImage: `url(${footbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </section>
    </div>
  );
};

export default WhyExhibit;
