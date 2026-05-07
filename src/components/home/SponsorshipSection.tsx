import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../../lib/api';

import {
  Trophy, Zap, Users, Mic2, BadgeCheck, UserCheck,
  Leaf, Monitor, Download, Phone,
  Globe, ShieldCheck, PieChart, Users2,
  Calendar, Star, Handshake, HeadphonesIcon,
  TrendingUp, Award, Megaphone, Infinity, PhoneCall, FileText, Home, Store, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import bgImage from '../../assets/1234.png';
import titleSponsorImg from '../../assets/icon111.png';
import poweredByImg from '../../assets/icon222.png';
import associateSponsorImg from '../../assets/icon333.png';
import conferenceSponsorImg from '../../assets/icon444.png';
import registrationSponsorImg from '../../assets/icon555.png';
import lanyardSponsorImg from '../../assets/icon666.png';
import wellnessSponsorImg from '../../assets/icon777.png';
import digitalSponsorImg from '../../assets/icon888.png';
import leafImg from '../../assets/leave.png';
import logo1 from '../../logos/logo1.png';
import logo2 from '../../logos/logo2.png';
import logo3 from '../../logos/logo3.png';
import logo4 from '../../logos/logo4.png';
import logo5 from '../../logos/logo5.png';
import logo6 from '../../logos/logo6.png';
import logo7 from '../../logos/logo7.png';
import logo8 from '../../logos/logo8.png';
import logo9 from '../../logos/logo9.jpg';
import logo10 from '../../logos/logo10.webp';
import SectionContainer from '../layout/SectionContainer';

// ─── Interfaces ───
interface Opportunity {
  title: string;
  desc: string;
  image?: string;
  icon?: React.ElementType;
  color: string;
  bgColor?: string;
  badge?: string;
}

interface WhySponsor {
  icon: React.ElementType;
  title: string;
  bold: string;
}

interface Brand {
  name: string;
  sub: string;
  color: string;
  logo?: string;
}

const SPONSORSHIP_OPPORTUNITIES: Opportunity[] = [
  {
    title: "TITLE SPONSOR",
    desc: "Maximum visibility\n& brand exclusivity",
    image: titleSponsorImg,
    color: "#d97706",
    bgColor: "#fef3c7",
    badge: "MOST EXCLUSIVE"
  },
  {
    title: "POWERED BY SPONSOR",
    desc: "Align your brand as the power behind IHWE",
    image: poweredByImg,
    color: "#2563eb",
    bgColor: "#eff6ff",
  },
  {
    title: "ASSOCIATE SPONSOR",
    desc: "High-impact visibility & brand recognition",
    image: associateSponsorImg,
    color: "#16a34a",
    bgColor: "#f0fdf4",
  },
  {
    title: "CONFERENCE SPONSOR",
    desc: "Brand association with knowledge sessions",
    image: conferenceSponsorImg,
    color: "#7c3aed",
    bgColor: "#f5f3ff",
  },
  {
    title: "REGISTRATION SPONSOR",
    desc: "High brand recall at every entry point",
    image: registrationSponsorImg,
    color: "#0d9488",
    bgColor: "#f0fdfa",
  },
  {
    title: "LANYARD / BADGE SPONSOR",
    desc: "Put your brand around every neck",
    image: lanyardSponsorImg,
    color: "#ea580c",
    bgColor: "#fff7ed",
  },
  {
    title: "WELLNESS ZONE SPONSOR",
    desc: "Showcase your brand in the wellness experience zone",
    image: wellnessSponsorImg,
    color: "#059669",
    bgColor: "#ecfdf5",
  },
  {
    title: "DIGITAL PROMOTION PARTNER",
    desc: "Expand your reach across digital platforms",
    image: digitalSponsorImg,
    color: "#4f46e5",
    bgColor: "#eef2ff",
  }
];

const WHY_SPONSOR: WhySponsor[] = [
  { icon: Users2,    title: "Showcase your brand to\n10,000+ targeted visitors",   bold: "10,000+" },
  { icon: Megaphone, title: "Multi-channel promotion (digital + on-ground)",        bold: "Multi-channel" },
  { icon: Handshake, title: "Build authority in the health & wellness ecosystem",   bold: "health & wellness" },
  { icon: Star,      title: "Premium branding across expo touchpoints",             bold: "Premium branding" },
  { icon: TrendingUp,title: "Direct access to decision-makers & buyers",            bold: "decision-makers" },
  { icon: Globe,     title: "Global exposure & networking opportunities",            bold: "Global exposure &" },
];

const BRANDS: Brand[] = [
  { name: "PATANJALI", sub: "", color: "#e65c00", logo: logo1 },
  { name: "Dabur",     sub: "", color: "#2d7a2d", logo: logo2 },
  { name: "Himalaya",  sub: "", color: "#1a5fa8", logo: logo3 },
  { name: "Apollo",    sub: "", color: "#003087", logo: logo4 },
  { name: "ZANDU",     sub: "", color: "#c8a000", logo: logo5 },
  { name: "BAIDYANATH",sub: "", color: "#8b1a1a", logo: logo6 },
  { name: "HEALTHKART",sub: "", color: "#1a1a1a", logo: logo7 },
  { name: "Herbalife", sub: "", color: "#e8000d", logo: logo8 },
  { name: "nveda",     sub: "", color: "#2d7a2d", logo: logo9 },
  { name: "MORE",      sub: "", color: "#555",    logo: logo10 },
];

const SponsorshipSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    category: 'Interested Sponsorship Category*',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.fullName || !formData.companyName || !formData.email || !formData.phone) {
      toast.warning("Please fill all required fields marked with *");
      return;
    }

    if (formData.category === 'Interested Sponsorship Category*') {
      toast.warning("Please select a sponsorship category");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/sponsorship-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          category: 'Interested Sponsorship Category*',
          message: ''
        });

        // Reset success state after 4 seconds to show form again
        setTimeout(() => {
          setIsSuccess(false);
        }, 4000);
      } else {
        toast.error(data.message || "Failed to submit enquiry");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <section className="bg-white overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════════════
          TOP HERO: LEFT (text) | CENTER (image) | RIGHT (why sponsor)
      ══════════════════════════════════════════ */}
      <div className="pt-10 md:pt-16 pb-0 border-b border-slate-100 overflow-hidden" style={{ background: "#f8f7f5" }}>
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.5fr_1.8fr] gap-x-8 gap-y-4 lg:gap-8 items-start">

            {/* ── LEFT: Heading block ── */}
            <div className="flex flex-col items-start text-left w-full">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 border border-[#12321d]/10 rounded-full px-3 py-1.5 md:px-5 md:py-2 mb-5 w-fit shadow-sm text-left"
                style={{ background: "#e9ece3" }}
              >
                <Leaf className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#12321d]" />
                <span className="text-[#12321d] font-extrabold text-[9px] md:text-[11px] tracking-[0.15em] uppercase whitespace-nowrap">
                  Sponsorship Opportunities Open
                </span>
              </div>

              <h2 className="font-black leading-[1.1] mb-3 text-left" style={{ fontSize: "clamp(32px, 3.5vw, 46px)" }}>
                <span style={{ color: "#023316" }}>BECOME A</span><br />
                <span style={{ color: "#78903a" }}>SPONSOR</span>
              </h2>

              <p className="text-[#242927] font-bold text-[12px] mb-3 leading-snug uppercase tracking-wide text-left">
                Position Your Brand at the Forefront<br />of the Wellness Industry
              </p>

              <div className="text-slate-700 text-[12.5px] font-medium leading-relaxed text-left">
                <span className="block lg:whitespace-nowrap">Partner with International Health & Wellness Expo 2026 and</span>
                <span className="block lg:whitespace-nowrap">unlock premium visibility, strategic connections and unmatched</span>
                <span className="block lg:whitespace-nowrap">business opportunities with industry leaders and decision-makers.</span>
              </div>
            </div>

            {/* ── CENTER: Expo Image ── */}
            <div className="relative h-[400px] lg:h-[330px] w-full flex justify-center">
              <img
                src={bgImage}
                alt="IHWE Expo"
                className="w-full h-full object-contain object-center relative z-20 scale-[1.2] lg:scale-[1.2] lg:-mt-12 lg:-ml-4 lg:-mb-28"
              />
            </div>

            {/* ── RIGHT: Why Sponsor IHWE? ── */}
            <div className="pl-0 pr-2 pb-0 pt-0">
              {/* Header */}
              <div
                className="rounded-b-xl px-4 py-1 mb-2 text-center w-fit mx-auto"
                style={{ background: "#022f15" }}
              >
                <span className="text-white font-bold text-[14px] md:text-[18px] tracking-[0.1em] md:tracking-[0.2em] uppercase whitespace-nowrap">
                  WHY SPONSOR IHWE?
                </span>
              </div>

              {/* Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                {WHY_SPONSOR.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2.5 pr-3"
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ border: "1.5px solid #c5dfa0" }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: "#425d0d" }} />
                    </div>
                    <p className="text-slate-700 text-[12px] sm:text-[11px] font-medium leading-snug whitespace-pre-line">
                      {item.title.split(item.bold).map((part, i, arr) =>
                        i < arr.length - 1 ? (
                          <React.Fragment key={i}>
                            {part}<strong className="text-[#d26019]">{item.bold}</strong>
                          </React.Fragment>
                        ) : part
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </SectionContainer>
      </div>

      {/* ══════════════════════════════════════════
          SPONSORSHIP OPPORTUNITIES SECTION
      ══════════════════════════════════════════ */}
      <div className="bg-white pt-0 pb-4">
        <SectionContainer>

          {/* Section Divider Header */}
          <div className="flex items-center gap-2 md:gap-4 mb-4">
            <div className="flex-1 h-[1px] bg-slate-200" />
            <div className="flex items-center gap-2 shrink-0">
              <Leaf className="w-3 md:w-3.5 h-3 md:h-3.5 text-[#23471d]" />
              <span className="font-bold text-[11px] md:text-[14px] tracking-[0.15em] md:tracking-[0.25em] uppercase text-center" style={{ color: "#153421" }}>
                SPONSORSHIP OPPORTUNITIES
              </span>
              <Leaf className="w-3 md:w-3.5 h-3 md:h-3.5 text-[#23471d] scale-x-[-1]" />
            </div>
            <div className="flex-1 h-[1px] bg-slate-200" />
          </div>

          {/* Responsive grid cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 md:gap-4">
            {SPONSORSHIP_OPPORTUNITIES.map((opp, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center pt-5 pb-4 px-2 rounded-lg border transition-all duration-300 hover:shadow-lg group"
                style={{
                  border: idx === 0
                    ? "1.5px solid #d39725"
                    : "1.5px solid #e5e7eb",
                  background: "white",
                  boxShadow: idx === 0
                    ? "0 2px 12px rgba(211,151,37,0.12)"
                    : "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
              >
                {/* MOST EXCLUSIVE badge */}
                {opp.badge && (
                  <div
                    className="absolute -top-px left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-b-lg text-white font-black text-[8px] tracking-wide uppercase whitespace-nowrap"
                    style={{ background: "#d39725" }}
                  >
                    {opp.badge}
                  </div>
                )}

                {/* Icon or Image circle */}
                <div
                  className="w-14 h-14 flex items-center justify-center mb-3 mt-1 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "transparent" }}
                >
                  {opp.image ? (
                    <img src={opp.image} alt={opp.title} className="w-full h-full object-contain scale-[2.2]" />
                  ) : opp.icon ? (
                    <opp.icon 
                      className="w-9 h-9" 
                      style={{ color: "#1a3a00" }} 
                    />
                  ) : null}
                </div>

                <h4
                  className="font-bold text-[11px] tracking-wide uppercase leading-tight mb-1.5"
                  style={{ color: "#143005", minHeight: 28 }}
                >
                  {opp.title}
                </h4>
                <p className="text-black text-[9px] leading-relaxed whitespace-pre-line">
                  {opp.desc}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM: Limited Slots Bar + CTA & Form
      ══════════════════════════════════════════ */}
      <div className="bg-white pt-2 md:pt-4 pb-16 border-t border-slate-100">
        <SectionContainer>

          {/* 1. Limited Slots Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start gap-6 lg:gap-4 mb-10 lg:mb-8 mt-2 lg:-mt-5 pt-1.5 pb-3 lg:pb-2.5 px-5 lg:px-4 rounded-2xl border border-slate-100 w-full lg:max-w-fit ml-0 xl:ml-[13.5%] shadow-sm relative z-20" style={{ background: "#f0f1e9" }}>
            <div className="flex items-center gap-4 lg:gap-3">
              <div className="w-12 h-12 lg:w-10 lg:h-10 bg-[#022f15] rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 lg:w-5 lg:h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-[14px] lg:text-[13px] text-[#022f15] uppercase tracking-tight">Limited Sponsorship Slots Available</p>
                <p className="text-[12px] lg:text-[11px] text-slate-900">Secure your category before it's gone!</p>
              </div>
            </div>
            <div className="hidden lg:block w-[1.5px] h-8 bg-slate-400/60" />
            <div className="flex items-center gap-4 lg:gap-3">
              <div className="w-12 h-12 lg:w-10 lg:h-10 bg-[#f0f7e8] rounded-lg flex items-center justify-center border border-[#c5dfa0] shrink-0">
                <Star className="w-6 h-6 lg:w-5 lg:h-5 text-[#425d0d]" />
              </div>
              <p className="text-[12.5px] lg:text-[11.5px] text-slate-900 font-medium">
                Featured sponsors get exclusive<br className="hidden lg:block" /> media coverage & brand promotions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-2 items-start mt-0 lg:-mt-6 relative z-10">
            
            {/* 2. Dark Green CTA Card */}
            <div className="bg-[#012011] rounded-2xl lg:rounded-l-2xl lg:rounded-r-none p-5 lg:px-8 lg:py-10 relative overflow-hidden shadow-xl flex flex-col h-fit justify-between">
              {/* Decorative Leaf Image */}
              <img 
                src={leafImg} 
                alt="decorative" 
                className="absolute -bottom-6 -left-10 w-48 h-48 opacity-40 pointer-events-none object-contain"
              />
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Top Row: Title + Buttons */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-6 pb-6 lg:pb-5 mb-6 lg:mb-5 relative">
                  {/* Decorative Border Bottom (Indented from left) */}
                  <div className="absolute bottom-0 right-0 lg:left-[320px] left-0 h-[1px] bg-white/10" />
                  <div className="shrink-0 origin-left scale-y-[1.1] lg:scale-y-[1.3] text-center lg:text-left">
                    <h3 className="text-white font-extrabold text-lg xl:text-xl leading-tight lg:whitespace-nowrap">
                      ELEVATE YOUR BRAND PRESENCE
                    </h3>
                    <h3 className="text-[#c5dfa0] font-extrabold text-lg xl:text-xl leading-tight mt-0.5">
                      AT IHWE 2026
                    </h3>
                  </div>

                  {/* Horizontal Buttons Row */}
                  <div className="flex flex-wrap lg:flex-nowrap gap-3 lg:gap-2 items-center justify-center lg:justify-start lg:pt-0.5">
                    <a 
                      href="/pdf.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-4 lg:px-3 py-2.5 lg:py-2 flex items-center gap-3 lg:gap-2.5 transition-all duration-300 group min-w-[140px] lg:min-w-[125px]"
                    >
                      <FileText className="w-7 h-7 lg:w-6 lg:h-6 text-white group-hover:scale-110 transition-transform" />
                      <div className="text-left text-white">
                        <p className="text-[10px] lg:text-[9px] font-medium uppercase tracking-widest leading-none mb-1">Download</p>
                        <p className="text-[11px] lg:text-[10px] font-medium uppercase whitespace-nowrap">Brochure</p>
                      </div>
                    </a>

                    <Link 
                      to="/conference"
                      className="bg-[#78903a] hover:bg-[#8ba643] text-white rounded-xl px-4 lg:px-3 py-2.5 lg:py-2 flex items-center gap-3 lg:gap-2.5 transition-all duration-300 group min-w-[140px] lg:min-w-[125px]"
                    >
                      <Handshake className="w-7 h-7 lg:w-6 lg:h-6 text-white group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <p className="text-[10px] lg:text-[9px] font-medium uppercase tracking-widest leading-none mb-1">Become</p>
                        <p className="text-[11px] lg:text-[10px] font-medium uppercase whitespace-nowrap">A Sponsor</p>
                      </div>
                    </Link>

                    <a 
                      href="tel:+919654900525"
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-4 lg:px-3 py-2.5 lg:py-2 flex items-center gap-3 lg:gap-2.5 transition-all duration-300 group min-w-[140px] lg:min-w-[125px]"
                    >
                      <HeadphonesIcon className="w-7 h-7 lg:w-6 lg:h-6 text-white group-hover:scale-110 transition-transform" />
                      <div className="text-left text-white">
                        <p className="text-[10px] lg:text-[9px] font-medium uppercase tracking-widest leading-none mb-1">Talk to</p>
                        <p className="text-[11px] lg:text-[10px] font-medium uppercase whitespace-nowrap">Our Team</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Bottom Row: Description + Stats */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  {/* Description */}
                  <div className="max-w-xl text-center lg:text-left">
                    <p className="text-white text-[14px] lg:text-[13px] leading-relaxed">
                      Reach the right audience, build meaningful connections and grow your business with IHWE.
                    </p>
                  </div>

                  {/* Updated Stats Row */}
                  <div className="grid grid-cols-2 md:flex items-center gap-6 lg:gap-x-5">
                    <div className="flex items-center gap-3 lg:gap-2">
                      <Users2 className="w-8 h-8 lg:w-6 lg:h-6 text-[#FFC81E]" />
                      <div>
                        <p className="text-[#FFC81E] font-bold text-[16px] lg:text-[14px] leading-none">8,000+</p>
                        <p className="text-white text-[9px] lg:text-[8px] font-medium uppercase tracking-widest mt-1">Visitors / Delegates</p>
                      </div>
                    </div>
                    
                    <div className="hidden lg:block w-[1px] h-6 bg-white/10" />

                    <div className="flex items-center gap-3 lg:gap-2">
                      <Store className="w-8 h-8 lg:w-6 lg:h-6 text-[#FFC81E]" />
                      <div>
                        <p className="text-[#FFC81E] font-bold text-[16px] lg:text-[14px] leading-none">100+</p>
                        <p className="text-white text-[9px] lg:text-[8px] font-medium uppercase tracking-widest mt-1">Exhibitors</p>
                      </div>
                    </div>

                    <div className="hidden lg:block w-[1px] h-6 bg-white/10" />

                    <div className="flex items-center gap-3 lg:gap-2">
                      <Globe className="w-8 h-8 lg:w-6 lg:h-6 text-[#FFC81E]" />
                      <div>
                        <p className="text-[#FFC81E] font-bold text-[16px] lg:text-[14px] leading-none">1000+</p>
                        <p className="text-white text-[9px] lg:text-[8px] font-medium uppercase tracking-widest mt-1">Global Buyers</p>
                      </div>
                    </div>

                    <div className="hidden lg:block w-[1px] h-6 bg-white/10" />

                    <div className="flex items-center gap-3 lg:gap-2">
                      <Infinity className="w-8 h-8 lg:w-6 lg:h-6 text-[#FFC81E]" />
                      <div>
                        <p className="text-[#FFC81E] font-bold text-[16px] lg:text-[14px] leading-none">Unlimited</p>
                        <p className="text-white text-[9px] lg:text-[8px] font-medium uppercase tracking-widest mt-1">Opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Interest Form */}
            <div 
              className="bg-white rounded-2xl p-5 lg:p-4 border border-slate-100 shadow-sm h-fit mt-4 lg:-mt-16"
              style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
            >
              <div className="text-center mb-3">
                <h4 className="font-black text-[#022f15] text-[13px] uppercase tracking-wide">Interested in Sponsoring?</h4>
                <div className="w-8 h-0.5 bg-[#78903a] mx-auto mt-1 rounded-full" />
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-10 px-4 min-h-[300px] text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                    >
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    
                    <motion.h4 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-[#022f15] font-black text-xl mb-2"
                    >
                      Inquiry Received!
                    </motion.h4>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-600 text-sm leading-relaxed"
                    >
                      Thank you for your interest. Our team will get back to you shortly with more details.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mt-6 flex items-center gap-2 text-[10px] text-slate-400"
                    >
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Form will reset automatically...
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="sponsorship-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2.5">
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name*" 
                        className="bg-[#f8f9fa] border border-slate-200 rounded-lg px-3 py-2 text-[11px] placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all" 
                        required
                      />
                      <input 
                        type="text" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company Name*" 
                        className="bg-[#f8f9fa] border border-slate-200 rounded-lg px-3 py-2 text-[11px] placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all" 
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address*" 
                        className="bg-[#f8f9fa] border border-slate-200 rounded-lg px-3 py-2 text-[11px] placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all" 
                        required
                      />
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number*" 
                        className="bg-[#f8f9fa] border border-slate-200 rounded-lg px-3 py-2 text-[11px] placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all" 
                        required
                      />
                    </div>
                    <div className="relative">
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-[#f8f9fa] border border-slate-200 rounded-lg px-3 py-2 text-[11px] outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all appearance-none text-slate-600"
                        required
                      >
                        <option>Interested Sponsorship Category*</option>
                        <option>Title Sponsor</option>
                        <option>Powered By Sponsor</option>
                        <option>Associate Sponsor</option>
                        <option>Conference Sponsor</option>
                        <option>Registration Sponsor</option>
                        <option>Lanyard / Badge Sponsor</option>
                        <option>Wellness Zone Sponsor</option>
                        <option>Digital Promotion Partner</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="border-l-2 border-b-2 border-slate-400 w-1.5 h-1.5 -rotate-45" />
                      </div>
                    </div>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message (Optional)" 
                      rows={1} 
                      className="w-full bg-[#f8f9fa] border border-slate-200 rounded-lg px-3 py-2 text-[11px] placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all" 
                    />
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#153421] hover:bg-[#022f15] text-white font-bold py-2.5 rounded-lg text-[11px] uppercase tracking-widest transition-all duration-300 shadow-lg shadow-green-900/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : "Submit Inquiry"}
                    </button>

                    <p className="flex items-center justify-center gap-2 text-[9px] text-slate-400 mt-2">
                      <ShieldCheck className="w-3 h-3" />
                      Your information is safe with us.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>


            </div>

          </div>
        </SectionContainer>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-wrapper {
          display: flex;
          width: max-content;
          animation: marqueeScroll 40s linear infinite;
          padding-left: 2rem;
        }
        .marquee-wrapper:hover {
          animation-play-state: paused;
        }
      `}</style>


      {/* ══════════════════════════════════════════
          TRUSTED BY LEADING BRANDS
      ══════════════════════════════════════════ */}
      <div className="bg-white pt-4 pb-4 -mt-10 lg:-mt-16 border-t border-slate-100 relative z-10">
        <SectionContainer>

          <div className="flex items-center gap-4 mb-10 lg:mb-8">
            <div className="flex-1 h-[1.5px] bg-slate-300" />
            <span className="font-bold text-[12px] lg:text-[14px] tracking-[0.15em] lg:tracking-[0.25em] uppercase text-[#012112] text-center">
              TRUSTED BY LEADING BRANDS
            </span>
            <div className="flex-1 h-[1.5px] bg-slate-300" />
          </div>

          <div className="overflow-hidden relative w-full mt-4">
            <div className="marquee-wrapper">
              {/* Double the brands for seamless loop */}
              {[...BRANDS, ...BRANDS].map((brand, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex flex-col items-center gap-0.5 transition-all mx-5 md:mx-8">
                    {brand.logo ? (
                      <img 
                        src={brand.logo} 
                        alt={brand.name} 
                        className={`${brand.name === "Dabur" ? "h-12 md:h-20 lg:h-16" : brand.name === "HEALTHKART" ? "h-10 md:h-16 lg:h-14" : "h-9 md:h-14 lg:h-12"} w-auto object-contain transition-all duration-300`} 
                      />
                    ) : (
                      <span
                        className="font-black text-[15px] md:text-[20px] lg:text-[18px] leading-tight"
                        style={{ color: brand.color, fontFamily: idx % BRANDS.length === 0 ? "serif" : "inherit" }}
                      >
                        {brand.name}
                      </span>
                    )}
                    {brand.sub && (
                      <span className="text-[7px] md:text-[8px] text-slate-500 font-semibold tracking-wide text-center leading-tight max-w-[80px]">
                        {brand.sub}
                      </span>
                    )}
                  </div>
                  <div className="w-[1.5px] h-6 bg-slate-300" />
                </div>
              ))}
            </div>
          </div>

        </SectionContainer>
      </div>
    </section>
  );
};

export default SponsorshipSection;