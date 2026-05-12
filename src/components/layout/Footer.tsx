import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronRight,
  Building2,
  Calendar,
  Check,
  Users,
  Trophy,
  TrendingUp,
  FileText,
  Shield,
  ArrowRight,
  Store,
  UserCheck,
  User,
  Plane,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { settingsApi } from "@/lib/api";
import { motion } from "framer-motion";

// Sparkle component
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

const FooterCounter = ({
  end,
  prefix = "",
  suffix = "",
  delay = 0,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;

          setTimeout(() => {
            let start = 0;
            const duration = 2000; // 2 seconds
            const interval = 16;
            const steps = duration / interval;
            const stepValue = end / steps;

            const timer = setInterval(() => {
              start += stepValue;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, interval);
          }, delay * 1000);

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Footer = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsApi.get();
        if (data) setSettings(data);
      } catch (error) {
        console.error("Error fetching settings for footer:", error);
      }
    };
    fetchSettings();
  }, []);

  const contactEmail =
    settings?.emails?.find((e: any) => e.forContact)?.email ||
    "info@namogangewellness.com";
  const contactPhone =
    settings?.phones?.find((p: any) => p.forContact)?.phone ||
    "+91 96549 00525";

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about", newTab: true },
    { label: "Exhibition", href: "/exhibition" },
    { label: "Conference", href: "/conference", newTab: true },
    { label: "Awards", href: "/awards", newTab: true },
    // { label: "B2B Meet", href: "/b2b-meet" },
    { label: "Visitor Registration", href: "/visitor-registration", newTab: true },
    { label: "Buyer Registration", href: "/buyer-registration", newTab: true },
    { label: "Contact Us", href: "/contact", newTab: true },
  ];

  const exhibitorLinks = [
    { label: "Book Your Stall", href: "/book-a-stand", newTab: true },
    { label: "Floor Plan Download", href: "/pdf1.pdf", newTab: true },
    { label: "Brochure Download", href: "/pdf.pdf", newTab: true },
    { label: "Exhibitor List", href: "/exhibitors", newTab: true },
    { label: "Sponsorship Opportunities", href: "/contact", newTab: true },
    { label: "MSME PMS Scheme", href: "/msme-pms-scheme", newTab: true },
    { label: "Buyer Seller Meet", href: "/buyer-seller-meet", newTab: true },
    { label: "Travel & Stay", href: "/partners", newTab: true },
    { label: "Arogya Sangosthi", href: "/conference", newTab: true },
  ];

  const highlights = [
    "Global Exhibitors & Buyers",
    "Knowledge-Packed Conferences",
    "B2B Meetings & Networking",
    "Global Health Excellence Awards",
    "Innovation & Product Showcase",
    "Business Growth Opportunities",
    "Be Part of India's Wellness Movement",
  ];

  const stats = [
    {
      icon: <Users className="w-9 h-9 text-[#F3B71B]" />,
      end: 1500,
      suffix: "+",
      label: "EXHIBITORS",
      sub: "ACROSS SUCCESSFUL EDITIONS",
    },
    {
      icon: <Globe className="w-9 h-9 text-[#F3B71B]" />,
      end: 80000,
      suffix: "+",
      label: "VISITORS / DELEGATES",
      sub: "ACROSS SUCCESSFUL EDITIONS",
    },
    {
      icon: <Trophy className="w-9 h-9 text-[#F3B71B]" />,
      end: 10,
      suffix: "+",
      label: "YEARS",
      sub: "LEGACY OF TRUST & GROWTH",
    },
    {
      icon: <TrendingUp className="w-9 h-9 text-[#F3B71B]" />,
      end: 1500,
      prefix: "₹",
      suffix: "CR+",
      label: "BUSINESS",
      sub: "GENERATED OVER THE YEARS",
    },
  ];

  const ctaButtons = [
    {
      icon: <Store className="w-5 h-5" />,
      line1: "BOOK",
      line2: "YOUR STALL",
      href: "/book-a-stand",
      primary: true,
    },

       
    {
      icon: <User className="w-5 h-5" />,
      line1: "REGISTER",
      line2: "AS VISITOR",
      href: "/visitor-registration",
      primary: false,
    },

      {
      icon: <Plane className="w-5 h-5" />,
      line1: "REGISTER ",
      line2: "AS DELEGATE",
      href: "/conference",
      primary: false,
    },


    {
      icon: <Users className="w-5 h-5" />,
      line1: "REGISTER",
      line2: "AS BUYER",
      href: "/buyer-registration",
      primary: false,
    },
    
 
  
  ];

  return (
    <footer
      className="bg-[#050A1A] text-white overflow-hidden"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
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
        .golden-text {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          display: inline-block;
        }
      `}</style>
      {/* ── TOP HEADER BAR: Logo + CTA Buttons ── */}
      <div className="border-b border-[#1E2A45]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6 md:py-4 gap-6 md:gap-4">
          {/* Left: Logo + divider + edition */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="bg-white rounded-xl py-2 px-4 shadow-lg flex items-center gap-4">
              <Link to="/" className="shrink-0 flex items-center">
                <img
                  src="/logo.png"
                  alt="IHWE"
                  className="h-10 md:h-11 w-auto object-contain hover:opacity-90 transition-opacity"
                />
              </Link>
              <div className="w-[1px] h-8 bg-slate-500" />
              <div className="flex flex-col">
                <p className="text-[7px] md:text-[7.5px] text-slate-500 font-bold uppercase tracking-[0.1em] leading-none mb-1">Organised By</p>
                <a 
                  href="https://namogangewellness.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] md:text-[11.5px] text-slate-900 font-semibold leading-tight tracking-tight uppercase hover:text-[#F3B71B] transition-colors" 
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  NAMO GANGE WELLNESS PVT. LTD.
                </a>
              </div>
            </div>
          </div>

          {/* Right: CTA Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:flex items-center gap-2 md:gap-2.5 w-full md:w-auto">
            {ctaButtons.map((btn) => (
              <div key={btn.line2} className="relative group/btn w-full md:w-auto">
                {btn.primary && (
                  <div className="hidden md:block">
                    <Sparkle style={{ top: '-8px', left: '10%', animationDelay: '0s' }} />
                    <Sparkle style={{ top: '-10px', left: '40%', animationDelay: '0.4s' }} />
                    <Sparkle style={{ top: '-6px', right: '15%', animationDelay: '0.8s' }} />
                    <Sparkle style={{ bottom: '-8px', left: '25%', animationDelay: '0.2s' }} />
                    <Sparkle style={{ bottom: '-10px', right: '30%', animationDelay: '0.6s' }} />
                  </div>
                )}
                <Link
                  to={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3.5 py-2 md:py-2 rounded-lg transition-all relative z-10 w-full justify-center ${btn.primary
                    ? "golden-btn-footer hover:scale-[1.02]"
                    : "bg-transparent border border-[#F3B71B] hover:bg-[#F3B71B]/10 hover:scale-[1.02]"
                    }`}
                  style={{ minWidth: "auto" }}
                >
                  <span
                    className={`shrink-0 ${btn.primary ? "text-[#050A1A]" : "text-[#F3B71B]"
                      }`}
                  >
                    {btn.icon}
                  </span>
                  <div className="flex flex-col text-left min-w-0">
                    <p
                      className={`font-semibold leading-none text-[8px] md:text-[9.5px] tracking-wide ${btn.primary ? "text-[#050A1A]" : "text-[#F3B71B]"
                        }`}
                    >
                      {btn.line1}
                    </p>
                    <p
                      className={`font-bold text-[10px] md:text-[11.5px] tracking-wide leading-tight mt-0.5 ${btn.primary ? "text-[#050A1A]" : "text-white"
                        }`}
                    >
                      {btn.line2}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-3 h-3 md:w-3.5 md:h-3.5 shrink-0 ml-auto md:ml-0 ${btn.primary ? "text-[#050A1A]" : "text-[#F3B71B]"
                      }`}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN 5-COLUMN GRID ── */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-b border-[#1E2A45]">
          {/* COL 1: Event Info */}
          <div className="flex flex-col gap-4 py-8 md:py-6 md:pr-6 border-b lg:border-b-0 lg:border-r border-[#1E2A45]">
            <div>
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className="text-white font-bold text-[15px] leading-none">9th IHWE</span>
                <span className="relative inline-block">
                  <Sparkle style={{ top: '-10px', left: '-2px', animationDelay: '0s', fontSize: '10px' }} />
                  <Sparkle style={{ top: '-6px', right: '-4px', animationDelay: '0.4s', fontSize: '10px' }} />
                  <Sparkle style={{ bottom: '-10px', left: '40%', animationDelay: '0.8s', fontSize: '10px' }} />
                  <span className="golden-text font-bold text-[15px] leading-none">
                    (Global Edition)
                  </span>
                </span>
              </div>
              <p className="text-[#F3B71B] text-[13px] leading-tight uppercase">
                International Health &amp; Wellness Expo
              </p>
              <p className="text-[#cbd5e1] font-bold italic text-[11px] mt-1">
                <sup className="text-[8px] "></sup> The International Health & Wellness Expo brings together global healthcare leaders, innovators, and decision-makers for three days of transformative experiences.
              </p>
            </div>
            <div className="w-full h-[1px] bg-[#1E2A45]" />
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 border border-[#F3B71B] rounded-md flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#F3B71B]" />
                </div>
                <p className="text-[12px] font-semibold text-white pt-0.5">
                  21 – 23 AUGUST 2026
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 border border-[#F3B71B] rounded-md flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#F3B71B]" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white">
                    PRAGATI MAIDAN
                  </p>
                  <p className="text-[10px] text-[#cbd5e1]">
                    HALL 8, 9 & 10, NEW DELHI, INDIA
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 border border-[#F3B71B] rounded-md flex items-center justify-center shrink-0">
                  <Globe className="w-3.5 h-3.5 text-[#F3B71B]" />
                </div>
                <p className="text-[10.5px] text-slate-300 leading-tight pt-0.5">
                  India's Leading Global Platform for Healthcare, AYUSH & Wellness
                </p>
              </div>
            </div>
          </div>

          {/* COL 2: Quick Links */}
          <div className="py-8 md:py-6 px-0 md:px-6 border-b md:border-b-0 md:border-r border-[#1E2A45]">
            <p className="text-[#F3B71B] font-bold text-[11.5px] uppercase tracking-widest">
              QUICK LINKS
            </p>
            <div className="w-7 h-[2px] bg-[#F3B71B] my-2" />
            <div className="flex flex-col gap-1.5">
              {quickLinks.map((l: any) => (
                <Link
                  key={l.label}
                  to={l.href}
                  target={l.newTab ? "_blank" : undefined}
                  rel={l.newTab ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-1.5 text-[11.5px] text-slate-300 hover:text-[#F3B71B] transition-colors"
                >
                  <ChevronRight className="w-2.5 h-2.5 text-slate-600 shrink-0" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* COL 3: Exhibitor Resources */}
          <div className="py-8 md:py-6 px-0 md:px-6 border-b lg:border-b-0 lg:border-r border-[#1E2A45]">
            <p className="text-[#F3B71B] font-bold text-[11.5px] uppercase tracking-widest">
              EXHIBITOR RESOURCES
            </p>
            <div className="w-7 h-[2px] bg-[#F3B71B] my-2" />
            <div className="flex flex-col gap-1.5">
              {exhibitorLinks.map((l: any) => (
                <Link
                  key={l.label}
                  to={l.href}
                  target={l.newTab ? "_blank" : undefined}
                  rel={l.newTab ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-1.5 text-[11.5px] text-slate-300 hover:text-[#F3B71B] transition-colors"
                >
                  <ChevronRight className="w-2.5 h-2.5 text-slate-600 shrink-0" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* COL 4: Contact Information */}
          <div className="py-8 md:py-6 px-0 md:px-6 border-b md:border-b-0 md:border-r border-[#1E2A45]">
            <p className="text-[#F3B71B] font-bold text-[11.5px] uppercase tracking-widest">
              CONTACT INFORMATION
            </p>
            <div className="w-7 h-[2px] bg-[#F3B71B] my-2" />
            <div className="flex flex-col gap-3">
                {[
                  {
                    Icon: Phone,
                    label: "Call for Stall Booking",
                    value: contactPhone,
                    link: `tel:${contactPhone.replace(/\s+/g, '')}`,
                    large: true,
                  },
                  {
                    Icon: Mail,
                    label: "Email",
                    value: "info@ihwe.in",
                    link: "mailto:info@ihwe.in",
                  },
                  {
                    Icon: Globe,
                    label: "Official Website",
                    value: "www.ihwe.in",
                    link: "/",
                  },
                  {
                    Icon: Building2,
                    label: "Organised By",
                    value: "Namo Gange Wellness Pvt. Ltd.",
                    link: "https://namogangewellness.com/",
                  },
                  {
                    Icon: Building2,
                    label: "Co-Organised By",
                    value: "Namo Gange Trust",
                    link: "https://namogange.org/",
                  },
                ].map(({ Icon, label, value, link, large }: any) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full border border-[#F3B71B] flex items-center justify-center shrink-0">
                      <Icon className="w-3 h-3 text-[#F3B71B]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#CBD5E1] mb-0.5">{label}</p>
                      {link ? (
                        link.startsWith('/') ? (
                          <Link
                            to={link}
                            className={`font-semibold leading-tight text-[#CBD5E1] hover:text-[#F3B71B] transition-colors ${large ? "text-[13px]" : "text-[11px]"}`}
                          >
                            {value}
                          </Link>
                        ) : (
                          <a
                            href={link}
                            target={link.startsWith('http') || link.startsWith('mailto') ? "_blank" : undefined}
                            rel={link.startsWith('http') || link.startsWith('mailto') ? "noopener noreferrer" : undefined}
                            className={`font-semibold leading-tight text-[#CBD5E1] hover:text-[#F3B71B] transition-colors ${large ? "text-[13px]" : "text-[11px]"}`}
                          >
                            {value}
                          </a>
                        )
                      ) : (
                        <p className={`font-semibold leading-tight text-[#CBD5E1] ${large ? "text-[13px]" : "text-[11px]"}`}>
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* COL 5: Event Highlights */}
          <div className="py-8 md:py-6 px-0 md:px-6">
            <p className="text-[#F3B71B] font-bold text-[11.5px] uppercase tracking-widest">
              EVENT HIGHLIGHTS
            </p>
            <div className="w-7 h-[2px] bg-[#F3B71B] my-2" />
            <div className="flex flex-col gap-2">
              {highlights.map((h) => (
                <div key={h} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full border border-[#F3B71B] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-[#F3B71B]" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">{h}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-b border-[#1E2A45]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex items-center gap-4 py-6 md:py-5 px-4 md:px-5 border-b sm:border-b-0 sm:border-r border-[#1E2A45] last:border-none"
            >
              {s.icon}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p
                    className="text-[#F3B71B] font-bold leading-none"
                    style={{
                      fontSize: "22px",
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                  >
                    <FooterCounter
                      end={s.end || 0}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      delay={i * 0.1}
                    />
                  </p>
                  <p className="text-[#cbd5e1] font-bold text-[10.5px] uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
                {s.sub && (
                  <p className="text-[#cbd5e1] text-[9.5px] mt-1 opacity-80 leading-tight uppercase">
                    {s.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-6"
        style={{ background: "#030712" }}
      >
        <p className="text-[11px] text-slate-500">
          © 2026 International Health & Wellness Expo. All Rights Reserved.
        </p>

        <div className="flex items-center justify-center flex-wrap gap-y-2">
          {[
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms & Conditions", href: "/terms-of-service" },
            { label: "Refund Policy", href: "/refund-policy" },
            { label: "Payment Policy", href: "/payment-policy" },
            { label: "Cancellation Policy", href: "/cancellation-policy" },
          ].map((p, i) => (
            <Link
              key={p.label}
              to={p.href}
              target="_blank"
              className="text-[10.5px] text-slate-500 hover:text-[#F3B71B] cursor-pointer transition-colors px-3 border-r border-[#1E2A45] last:border-none"
            >
              {p.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {[
            { Icon: Check, top: "100%", bot: "SECURE WEBSITE" },
            { Icon: FileText, top: "GST", bot: "INVOICE" },
            { Icon: Shield, top: "VERIFIED", bot: "ORGANISER" },
          ].map(({ Icon, top, bot }) => (
            <div key={bot} className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full border border-[#F3B71B] flex items-center justify-center">
                <Icon className="w-2.5 h-2.5 text-[#F3B71B]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white leading-none">
                  {top}
                </p>
                <p className="text-[9px] text-slate-500 leading-tight">{bot}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;