import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy, Zap, Users, Mic2, BadgeCheck, UserCheck,
  Leaf, Monitor, Download, Phone,
  Globe, ShieldCheck, PieChart, Users2,
  Calendar, Star, Handshake, HeadphonesIcon,
  TrendingUp, Award, Megaphone
} from 'lucide-react';
import { cn } from "@/lib/utils";
import bgImage from '../../assets/1234.jpg.jpeg';

const SPONSORSHIP_OPPORTUNITIES = [
  {
    title: "TITLE SPONSOR",
    desc: "Maximum visibility & brand exclusivity",
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
  {
    icon: Users2,
    title: "Showcase your brand to 10,000+ targeted visitors",
    bold: "10,000+"
  },
  {
    icon: Megaphone,
    title: "Multi-channel promotion (digital + on-ground)",
    bold: "Multi-channel"
  },
  {
    icon: Handshake,
    title: "Build authority in the health & wellness ecosystem",
    bold: "health & wellness"
  },
  {
    icon: Star,
    title: "Premium branding across expo touchpoints",
    bold: "Premium branding"
  },
  {
    icon: TrendingUp,
    title: "Direct access to decision-makers & buyers",
    bold: "decision-makers"
  },
  {
    icon: Globe,
    title: "Global exposure & networking opportunities",
    bold: "Global exposure &"
  },
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
          TOP HERO: 3-COLUMN LAYOUT
          Left: Text | Center: Image | Right: Why Sponsor
      ══════════════════════════════════════════ */}
      <div className="bg-white pt-10 pb-6 px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto grid grid-cols-[1fr_auto_1fr] gap-6 items-start">

          {/* ── LEFT: Heading block ── */}
          <div className="flex flex-col justify-start pt-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-[#23471d]/30 rounded-full px-3 py-1.5 mb-5 w-fit bg-white shadow-sm">
              <Leaf className="w-3 h-3 text-[#23471d]" />
              <span className="text-[#23471d] font-bold text-[10px] tracking-[0.18em] uppercase">
                Sponsorship Opportunities Open
              </span>
            </div>

            <h2 className="font-black leading-[0.92] mb-4" style={{ fontSize: "clamp(52px, 6vw, 80px)" }}>
              <span style={{ color: "#1a1a1a" }}>BECOME A</span><br />
              <span style={{ color: "#23471d" }}>SPONSOR</span>
            </h2>

            <p className="text-slate-800 font-semibold text-[15px] mb-3 leading-snug">
              Position Your Brand at the Forefront<br />of the Wellness Industry
            </p>

            <p className="text-slate-500 text-[12.5px] leading-relaxed max-w-[360px]">
              Partner with International Health & Wellness Expo 2026 and
              unlock premium visibility, strategic connections and unmatched
              business opportunities with industry leaders and decision-makers.
            </p>
          </div>

          {/* ── CENTER: Expo image in rounded frame ── */}
          <div className="relative flex items-center justify-center" style={{ width: 380 }}>
            {/* Decorative leaf top-left */}
            <div className="absolute -top-4 -left-6 z-10 pointer-events-none">
              <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
                <path d="M35 85 C10 70 5 45 15 20 C25 0 50 -5 60 15 C70 35 65 65 35 85Z" fill="#23471d" opacity="0.85" />
                <path d="M35 85 C35 60 30 40 20 20" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
              </svg>
            </div>
            {/* Decorative leaf bottom-right */}
            <div className="absolute -bottom-4 -right-4 z-10 pointer-events-none">
              <svg width="55" height="70" viewBox="0 0 55 70" fill="none">
                <path d="M27 65 C5 50 3 28 12 10 C20 -3 44 -4 50 14 C56 32 50 55 27 65Z" fill="#4a8c1c" opacity="0.75" />
              </svg>
            </div>

            <div
              className="overflow-hidden shadow-2xl"
              style={{
                borderRadius: "50% 50% 48% 48% / 40% 40% 60% 60%",
                width: 340,
                height: 380,
                border: "4px solid #23471d",
              }}
            >
              <img
                src={bgImage}
                alt="IHWE Expo"
                className="w-full h-full object-cover object-center"
              />
              {/* Overlay text on image */}
              <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none"
                style={{ width: 200 }}
              >
                <p className="text-white font-bold text-[11px] tracking-widest uppercase drop-shadow-lg">
                  Stronger Together<br />For a Healthier Tomorrow
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Why Sponsor IHWE ── */}
          <div className="flex flex-col">
            {/* Header bar */}
            <div
              className="flex items-center justify-center py-3 px-5 mb-5 rounded-lg"
              style={{ background: "#1a3a10" }}
            >
              <span className="text-white font-black text-[13.5px] tracking-[0.08em] uppercase">
                WHY SPONSOR IHWE?
              </span>
            </div>

            {/* 2-col grid of why items */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              {WHY_SPONSOR.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "#f0f7e8", border: "1.5px solid #c5dfa0" }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: "#23471d" }} />
                  </div>
                  <p className="text-slate-700 text-[11.5px] leading-snug pt-0.5">
                    {item.title.split(item.bold).map((part, i, arr) =>
                      i < arr.length - 1 ? (
                        <React.Fragment key={i}>
                          {part}<strong className="text-slate-900">{item.bold}</strong>
                        </React.Fragment>
                      ) : part
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          SPONSORSHIP OPPORTUNITIES SECTION
      ══════════════════════════════════════════ */}
      <div className="bg-white px-8 lg:px-16 py-8">
        <div className="max-w-[1360px] mx-auto">

          {/* Section Divider Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-[1px] bg-slate-200" />
            <div className="flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5 text-[#23471d]" />
              <span className="font-black text-[13px] tracking-[0.25em] uppercase text-slate-800">
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
                className="relative flex flex-col items-center text-center pt-5 pb-4 px-2 rounded-2xl border transition-all duration-300 hover:shadow-lg group"
                style={{
                  border: idx === 0
                    ? "1.5px solid #d97706"
                    : "1.5px solid #e5e7eb",
                  background: "white",
                  boxShadow: idx === 0
                    ? "0 2px 12px rgba(217,119,6,0.12)"
                    : "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                {/* MOST EXCLUSIVE badge */}
                {opp.badge && (
                  <div
                    className="absolute -top-px left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-b-lg text-white font-black text-[8px] tracking-wide uppercase whitespace-nowrap"
                    style={{ background: "#d97706" }}
                  >
                    {opp.badge}
                  </div>
                )}

                {/* Icon circle */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-3 mt-1 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: opp.bgColor }}
                >
                  <opp.icon className="w-7 h-7" style={{ color: opp.color }} />
                </div>

                <h4
                  className="font-black text-[9.5px] tracking-wide uppercase leading-tight mb-1.5"
                  style={{ color: "#1a1a1a", minHeight: 28 }}
                >
                  {opp.title}
                </h4>
                <p className="text-slate-500 text-[9px] leading-relaxed">
                  {opp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ALERT BAR: Limited slots + Featured sponsors
      ══════════════════════════════════════════ */}
      <div className="px-8 lg:px-16 py-3">
        <div className="max-w-[1360px] mx-auto">
          {/* Two-part alert bar, left of form */}
          <div className="flex gap-3" style={{ maxWidth: 910 }}>
            {/* Left alert */}
            <div
              className="flex items-center gap-3 flex-1 px-5 py-3 rounded-xl"
              style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#23471d" }}
              >
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-black text-[11.5px] text-slate-900 uppercase tracking-wide">
                  Limited Sponsorship Slots Available
                </p>
                <p className="text-slate-500 text-[10px]">Secure your category before it's gone!</p>
              </div>
            </div>

            {/* Right alert */}
            <div
              className="flex items-center gap-3 flex-1 px-5 py-3 rounded-xl"
              style={{ background: "#fafafa", border: "1px solid #e5e7eb" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#f0f7e8", border: "1.5px solid #c5dfa0" }}
              >
                <Star className="w-4 h-4" style={{ color: "#23471d" }} />
              </div>
              <p className="text-slate-600 text-[11px] leading-snug">
                Featured sponsors get exclusive<br />
                <strong className="text-slate-800">media coverage & brand promotions.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM: Dark CTA + Form side by side
      ══════════════════════════════════════════ */}
      <div className="px-8 lg:px-16 pb-8">
        <div className="max-w-[1360px] mx-auto flex gap-5 items-stretch">

          {/* ── LEFT: Dark green CTA card ── */}
          <div
            className="flex flex-col justify-between rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0d2408 0%, #1a3a10 50%, #1f4a12 100%)",
              flex: "0 0 66%",
              minHeight: 220,
            }}
          >
            {/* Subtle leaf watermark */}
            <div className="absolute right-6 bottom-0 opacity-[0.06] pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <path d="M100 190 C30 150 15 90 40 35 C65 -15 145 -20 165 40 C185 95 160 165 100 190Z" fill="white" />
              </svg>
            </div>

            <div className="relative z-10">
              <h3 className="font-black text-white mb-1 leading-tight" style={{ fontSize: 26 }}>
                ELEVATE YOUR BRAND PRESENCE
              </h3>
              <h3 className="font-black mb-4 leading-tight" style={{ fontSize: 26, color: "#a3d94a" }}>
                AT IHWE 2026
              </h3>
              <p className="text-white/60 text-[12px] mb-6 max-w-md leading-relaxed">
                Reach the right audience, build meaningful connections<br />
                and grow your business with IHWE.
              </p>

              {/* 3 CTA buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[11px] transition-all hover:opacity-90"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.25)", color: "white" }}
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD<br />BROCHURE
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[11px] transition-all hover:opacity-90"
                  style={{ background: "#3a7d10", border: "1.5px solid #5aad20", color: "white" }}
                >
                  <Handshake className="w-4 h-4" />
                  BECOME<br />A SPONSOR
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[11px] transition-all hover:opacity-90"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.2)", color: "white" }}
                >
                  <Phone className="w-4 h-4 text-green-400" />
                  TALK TO<br />OUR TEAM
                </button>
              </div>
            </div>

            {/* Stats row at bottom */}
            <div
              className="relative z-10 grid grid-cols-4 gap-4 mt-6 pt-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
            >
              {[
                { icon: Users2, val: "10,000+", label: "Visitors" },
                { icon: Users, val: "350+", label: "Exhibitors" },
                { icon: Globe, val: "25+", label: "Countries" },
                { icon: Award, val: "Unlimited", label: "Opportunities", gold: true },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <s.icon className="w-5 h-5 flex-shrink-0" style={{ color: s.gold ? "#a3d94a" : "rgba(255,255,255,0.5)" }} />
                  <div>
                    <p className="font-black text-[15px] leading-none" style={{ color: s.gold ? "#a3d94a" : "white" }}>
                      {s.val}
                    </p>
                    <p className="text-[9.5px] font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Inquiry Form ── */}
          <div
            className="flex-1 rounded-2xl p-6"
            style={{
              background: "white",
              border: "1.5px solid #e5e7eb",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            }}
          >
            <h4 className="font-black text-slate-900 text-[14px] uppercase tracking-wide mb-5 text-center">
              INTERESTED IN SPONSORING?
            </h4>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name*"
                  className="bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[11.5px] focus:ring-2 focus:ring-green-500 outline-none w-full"
                />
                <input
                  type="text"
                  placeholder="Company Name*"
                  className="bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[11.5px] focus:ring-2 focus:ring-green-500 outline-none w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email Address*"
                  className="bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[11.5px] focus:ring-2 focus:ring-green-500 outline-none w-full"
                />
                <input
                  type="tel"
                  placeholder="Phone Number*"
                  className="bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[11.5px] focus:ring-2 focus:ring-green-500 outline-none w-full"
                />
              </div>
              <div className="relative">
                <select
                  className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[11.5px] text-slate-500 focus:ring-2 focus:ring-green-500 outline-none appearance-none"
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
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <textarea
                placeholder="Message (Optional)"
                rows={2}
                className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-[11.5px] focus:ring-2 focus:ring-green-500 outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full text-white font-black text-[12px] py-3.5 rounded-xl tracking-wide transition-all hover:opacity-90 active:scale-[0.99]"
                style={{ background: "#23471d" }}
              >
                SUBMIT INQUIRY
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[9.5px] text-slate-400">
                <ShieldCheck className="w-3 h-3" />
                Your information is safe with us and will never be shared.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          TRUSTED BY LEADING BRANDS
      ══════════════════════════════════════════ */}
      <div className="px-8 lg:px-16 pb-10">
        <div className="max-w-[1360px] mx-auto">

          {/* Divider with title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-slate-200" />
            <span className="font-black text-[12px] tracking-[0.25em] uppercase text-slate-700">
              TRUSTED BY LEADING BRANDS
            </span>
            <div className="flex-1 h-[1px] bg-slate-200" />
          </div>

          {/* Brands row */}
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

        </div>
      </div>

    </section>
  );
};

export default SponsorshipSection;