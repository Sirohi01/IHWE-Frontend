import React from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Zap, Users, Mic2, BadgeCheck, UserCheck,
  Leaf, Monitor, Download, Phone,
  Globe, ShieldCheck, PieChart, Users2,
  Calendar, Star, Handshake, HeadphonesIcon,
  TrendingUp, Award, Megaphone, Infinity, PhoneCall, FileText, Home
} from 'lucide-react';
import bgImage from '../../assets/1234.png';
import SectionContainer from '../layout/SectionContainer';

const SPONSORSHIP_OPPORTUNITIES = [
  {
    title: "TITLE SPONSOR",
    desc: "Maximum visibility\n& brand exclusivity",
    icon: Trophy,
    color: "#d97706",
    bgColor: "#fef3c7",
    badge: "MOST EXCLUSIVE"
  },
  {
    title: "POWERED BY SPONSOR",
    desc: "Align your brand as the power behind IHWE",
    icon: Zap,
    color: "#2563eb",
    bgColor: "#eff6ff",
  },
  {
    title: "ASSOCIATE SPONSOR",
    desc: "High-impact visibility & brand recognition",
    icon: Users,
    color: "#16a34a",
    bgColor: "#f0fdf4",
  },
  {
    title: "CONFERENCE SPONSOR",
    desc: "Brand association with knowledge sessions",
    icon: Mic2,
    color: "#7c3aed",
    bgColor: "#f5f3ff",
  },
  {
    title: "REGISTRATION SPONSOR",
    desc: "High brand recall at every entry point",
    icon: UserCheck,
    color: "#0d9488",
    bgColor: "#f0fdfa",
  },
  {
    title: "LANYARD / BADGE SPONSOR",
    desc: "Put your brand around every neck",
    icon: BadgeCheck,
    color: "#ea580c",
    bgColor: "#fff7ed",
  },
  {
    title: "WELLNESS ZONE SPONSOR",
    desc: "Showcase your brand in the wellness experience zone",
    icon: Leaf,
    color: "#059669",
    bgColor: "#ecfdf5",
  },
  {
    title: "DIGITAL PROMOTION PARTNER",
    desc: "Expand your reach across digital platforms",
    icon: Monitor,
    color: "#4f46e5",
    bgColor: "#eef2ff",
  }
];

const WHY_SPONSOR = [
  { icon: Users2, title: "Showcase your brand to\n10,000+ targeted visitors", bold: "10,000+" },
  { icon: Megaphone, title: "Multi-channel promotion (digital + on-ground)", bold: "Multi-channel" },
  { icon: Handshake, title: "Build authority in the health & wellness ecosystem", bold: "health & wellness" },
  { icon: Star, title: "Premium branding across expo touchpoints", bold: "Premium branding" },
  { icon: TrendingUp, title: "Direct access to decision-makers & buyers", bold: "decision-makers" },
  { icon: Globe, title: "Global exposure & networking opportunities", bold: "Global exposure &" },
];

const BRANDS = [
  { name: "PATANJALI", sub: "Patanjali Ayurved", color: "#e65c00" },
  { name: "Dabur", sub: "", color: "#2d7a2d" },
  { name: "Himalaya", sub: "SINCE 1930", color: "#1a5fa8" },
  { name: "Apollo", sub: "Hospitals", color: "#003087" },
  { name: "ZANDU", sub: "EXPERT IN LIFESTYLE DISORDERS", color: "#c8a000" },
  { name: "BAIDYANATH", sub: "100 years of caring", color: "#8b1a1a" },
  { name: "HEALTHKART", sub: "", color: "#1a1a1a" },
  { name: "Herbalife", sub: "", color: "#e8000d" },
  { name: "nveda", sub: "", color: "#2d7a2d" },
  { name: "AND MANY MORE...", sub: "", color: "#555" },
];

const SponsorshipSection = () => {
  return (
    <section className="bg-white overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════════════
          TOP HERO: LEFT (text) | CENTER (image) | RIGHT (why sponsor)
      ══════════════════════════════════════════ */}
      <div className="pt-4 pb-0 border-b border-slate-100 overflow-hidden" style={{ background: "#f8f7f5" }}>
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.5fr_1.8fr] gap-8 items-start">

            {/* ── LEFT: Heading block ── */}
            <div className="flex flex-col justify-start">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2.5 border border-[#12321d]/10 rounded-full px-5 py-2 mb-5 w-fit shadow-sm"
                style={{ background: "#e9ece3" }}
              >
                <Leaf className="w-3.5 h-3.5 text-[#12321d]" />
                <span className="text-[#12321d] font-extrabold text-[11px] tracking-[0.15em] uppercase whitespace-nowrap">
                  Sponsorship Opportunities Open
                </span>
              </div>

              <h2 className="font-black leading-[1.1] mb-3" style={{ fontSize: "clamp(32px, 3.5vw, 46px)" }}>
                <span style={{ color: "#023316" }}>BECOME A</span><br />
                <span style={{ color: "#78903a" }}>SPONSOR</span>
              </h2>

              <p className="text-[#242927] font-bold text-[12px] mb-3 leading-snug uppercase tracking-wide">
                Position Your Brand at the Forefront<br />of the Wellness Industry
              </p>

              <p className="text-slate-700 text-[12.5px] font-medium leading-relaxed">
                <span className="block lg:whitespace-nowrap">Partner with International Health & Wellness Expo 2026 and</span>
                <span className="block lg:whitespace-nowrap">unlock premium visibility, strategic connections and unmatched</span>
                <span className="block lg:whitespace-nowrap">business opportunities with industry leaders and decision-makers.</span>
              </p>
            </div>

            {/* ── CENTER: Expo Image ── */}
            <img
              src={bgImage}
              alt="IHWE Expo"
              className="w-full h-[420px] object-contain object-center relative z-20 -mt-20 -ml-4 scale-[1.18] -mb-16"
            />

            {/* ── RIGHT: Why Sponsor IHWE? ── */}
            <div className="pl-0 pr-2 pb-0 pt-0">
              {/* Header */}
              <div
                className="rounded-b-xl px-4 py-1 mb-2 text-center w-fit mx-auto"
                style={{ background: "#022f15" }}
              >
                <span className="text-white font-semibold text-[18px] tracking-[0.2em] uppercase">
                  WHY SPONSOR IHWE?
                </span>
              </div>

              {/* Items */}
              <div className="grid grid-cols-2 gap-x-4">
                {WHY_SPONSOR.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2.5 pr-3"
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      borderRight: idx % 2 === 0 ? "1px solid #e5e7eb" : "none",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ border: "1.5px solid #c5dfa0" }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: "#425d0d" }} />
                    </div>
                    <p className="text-slate-700 text-[11px] font-medium leading-snug whitespace-pre-line">
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
      <div className="bg-white pt-2 pb-8">
        <SectionContainer>

          {/* Section Divider Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-[1px] bg-slate-200" />
            <div className="flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5 text-[#23471d]" />
              <span className="font-bold text-[14px] tracking-[0.25em] uppercase" style={{ color: "#153421" }}>
                SPONSORSHIP OPPORTUNITIES
              </span>
              <Leaf className="w-3.5 h-3.5 text-[#23471d] scale-x-[-1]" />
            </div>
            <div className="flex-1 h-[1px] bg-slate-200" />
          </div>

          {/* 8-column cards */}
          <div className="grid grid-cols-8 gap-3">
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

                {/* Icon circle */}
                <div
                  className="w-14 h-14 flex items-center justify-center mb-3 mt-1 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "transparent" }}
                >
                  <opp.icon
                    className={idx === 0 ? "w-7 h-7" : "w-9 h-9"}
                    style={{ color: idx === 0 ? opp.color : "#1a3a00" }}
                  />
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
      <div className="bg-white pb-16">
        <SectionContainer>

          {/* 1. Limited Slots Bar */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 -mt-6 py-3 px-4 rounded-full border border-slate-100 max-w-fit mx-auto shadow-sm" style={{ background: "#f0f1e9" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#022f15] rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-[13px] text-[#022f15] uppercase tracking-tight">Limited Sponsorship Slots Available</p>
                <p className="text-[11px] text-slate-500">Secure your category before it's gone!</p>
              </div>
            </div>
            <div className="hidden md:block w-[1px] h-8 bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f0f7e8] rounded-lg flex items-center justify-center border border-[#c5dfa0]">
                <Star className="w-5 h-5 text-[#425d0d]" />
              </div>
              <p className="text-[11.5px] text-slate-600 font-medium">
                Featured sponsors get exclusive<br />media coverage & brand promotions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.5fr] gap-8 items-start">

            {/* 2. Dark Green CTA Card */}
            <div className="bg-[#022f15] rounded-2xl p-4 md:p-6 relative overflow-hidden shadow-xl flex flex-col h-fit">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

              <div className="relative z-10 mb-6 flex flex-col gap-6">
                <div className="max-w-3xl">
                  <h3 className="text-white font-black text-2xl mb-4 leading-tight">
                    ELEVATE YOUR BRAND PRESENCE <span className="text-[#c5dfa0]">AT IHWE 2026</span>
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed max-w-xl">
                    Reach the right audience, build meaningful connections<br />
                    and grow your business with IHWE.
                  </p>
                </div>

                {/* Horizontal Buttons Row - Left Aligned */}
                <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
                  <a
                    href="/pdf.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest leading-none mb-1">Download</p>
                      <p className="text-xs font-bold uppercase whitespace-nowrap">Brochure</p>
                    </div>
                  </a>

                  <Link
                    to="/conference"
                    className="bg-[#78903a] hover:bg-[#8ba643] text-[#022f15] rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 bg-[#022f15]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest leading-none mb-1">Become</p>
                      <p className="text-xs font-bold uppercase whitespace-nowrap">A Sponsor</p>
                    </div>
                  </Link>

                  <a
                    href="tel:+919654900525"
                    className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest leading-none mb-1">Talk to</p>
                      <p className="text-xs font-bold uppercase whitespace-nowrap">Our Team</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Updated Stats Row with Legacy Data */}
              <div className="relative z-10 flex flex-wrap md:flex-nowrap items-center justify-between gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-[#78903a]" />
                  <div>
                    <p className="text-white font-bold text-sm leading-none">150+</p>
                    <p className="text-white/50 text-[9px] uppercase tracking-wider">Exhibitors</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users2 className="w-5 h-5 text-[#78903a]" />
                  <div>
                    <p className="text-white font-bold text-sm leading-none">8000+</p>
                    <p className="text-white/50 text-[9px] uppercase tracking-wider">Visitors/Delegates</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#78903a]" />
                  <div>
                    <p className="text-white font-bold text-sm leading-none">10+ Years</p>
                    <p className="text-white/50 text-[9px] uppercase tracking-wider">Legacy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#78903a]" />
                  <div>
                    <p className="text-white font-bold text-sm leading-none">₹150CR+</p>
                    <p className="text-white/50 text-[9px] uppercase tracking-wider">Business</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Interest Form */}
            <div
              className="bg-white rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm h-fit"
              style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
            >
              <div className="text-center mb-4">
                <h4 className="font-black text-[#022f15] text-[14px] uppercase tracking-wide">Interested in Sponsoring?</h4>
                <div className="w-8 h-1 bg-[#78903a] mx-auto mt-1 rounded-full" />
              </div>

              <form className="space-y-2.5">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name*" className="bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all" />
                  <input type="text" placeholder="Company Name*" className="bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="email" placeholder="Email Address*" className="bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all" />
                  <input type="tel" placeholder="Phone Number*" className="bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all" />
                </div>
                <div className="relative">
                  <select className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all appearance-none text-slate-500">
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
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="border-l-2 border-b-2 border-slate-400 w-1.5 h-1.5 -rotate-45" />
                  </div>
                </div>
                <textarea placeholder="Message (Optional)" rows={2} className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[#78903a]/20 focus:border-[#78903a] transition-all" />

                <button className="w-full bg-[#153421] hover:bg-[#022f15] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-green-900/20 active:scale-[0.98]">
                  Submit Inquiry
                </button>

                <p className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Your information is safe with us and will never be shared.
                </p>
              </form>
            </div>

          </div>
        </SectionContainer>
      </div>

      {/* ══════════════════════════════════════════
          TRUSTED BY LEADING BRANDS
      ══════════════════════════════════════════ */}
      {/* <div className="pb-10">
        <SectionContainer>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-slate-200" />
            <span className="font-bold text-[12px] tracking-[0.25em] uppercase text-slate-700">
              TRUSTED BY LEADING BRANDS
            </span>
            <div className="flex-1 h-[1px] bg-slate-200" />
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            {BRANDS.map((brand, idx) => (
              <div key={idx} className="flex flex-col items-center gap-0.5 opacity-80 hover:opacity-100 transition-opacity">
                <span
                  className="font-black text-[13px] leading-tight"
                  style={{ color: brand.color, fontFamily: idx === 0 ? "serif" : "inherit" }}
                >
                  {brand.name}
                </span>
                {brand.sub && (
                  <span className="text-[8px] text-slate-500 font-semibold tracking-wide text-center leading-tight max-w-[80px]">
                    {brand.sub}
                  </span>
                )}
              </div>
            ))}
          </div>

        </SectionContainer>
      </div> */}
    </section>
  );
};

export default SponsorshipSection;