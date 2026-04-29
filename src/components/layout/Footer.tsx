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
    { label: "About Us", href: "/about" },
    { label: "Exhibition", href: "/exhibition" },
    { label: "Conference", href: "/conference" },
    { label: "Awards", href: "/awards" },
    // { label: "B2B Meet", href: "/b2b-meet" },
    { label: "Visitor Registration", href: "/visitor-registration" },
    { label: "Buyer Registration", href: "/buyer-registration" },
    { label: "Contact Us", href: "/contact" },
  ];

  const exhibitorLinks = [
    { label: "Book Your Stall", href: "/book-a-stand" },
    { label: "Floor Plan Download", href: "/floor-plan" },
    { label: "Brochure Download", href: "/brochure" },
    { label: "Exhibitor List", href: "/exhibitors" },
    { label: "Sponsorship Opportunities", href: "/sponsorship" },
    { label: "Hosted Buyer Program", href: "/hosted-buyer" },
    { label: "Travel & Stay", href: "/travel" },
    { label: "FAQs", href: "/faq" },
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
      end: 10000,
      suffix: "+",
      label: "TRADE VISITORS",
      // sub: "From 30+ Countries",
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
      end: 500,
      prefix: "₹",
      suffix: "CR+",
      label: "BUSINESS OPPORTUNITIES",
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
      icon: <Users className="w-5 h-5" />,
      line1: "REGISTER",
      line2: "AS BUYER",
      href: "/buyer-registration",
      primary: false,
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
      href: "/hosted-buyer",
      primary: false,
    },
  ];

  return (
    <footer
      className="bg-[#050A1A] text-white overflow-hidden"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* ── TOP HEADER BAR: Logo + CTA Buttons ── */}
      <div style={{ borderBottom: "1px solid #1E2A45" }}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4">
          {/* Left: Logo + divider + edition */}
          <div className="flex items-center gap-4">
            <Link to="/" className="shrink-0">
              <div className="bg-white rounded-xl py-2 px-4 shadow-lg flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="IHWE"
                  className="h-11 w-auto object-contain"
                />
                <div className="w-[1px] h-8 bg-slate-500" />
                <div className="flex flex-col">
                  <p className="text-[7.5px] text-slate-500 font-bold uppercase tracking-[0.1em] leading-none mb-1">Organised By</p>
                  <p className="text-[11.5px] text-slate-900 font-semibold leading-tight tracking-tight uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                    NAMO GANGE WELLNESS PVT. LTD.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Right: 4 CTA Buttons */}
          <div className="flex items-center gap-2.5">
            {ctaButtons.map((btn) => (
              <Link
                key={btn.line2}
                to={btn.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                  btn.primary
                    ? "bg-[#F3B71B] hover:bg-[#e0a818]"
                    : "bg-transparent border border-[#F3B71B] hover:bg-[#F3B71B]/10"
                }`}
                style={{ minWidth: "120px" }}
              >
                <span
                  className={`shrink-0 ${
                    btn.primary ? "text-[#050A1A]" : "text-[#F3B71B]"
                  }`}
                >
                  {btn.icon}
                </span>
                <div className="flex-1 min-w-0 text-left">
                  <p
                    className={`font-semibold leading-none text-[9.5px] tracking-wide ${
                      btn.primary ? "text-[#050A1A]" : "text-[#F3B71B]"
                    }`}
                  >
                    {btn.line1}
                  </p>
                  <p
                    className={`font-bold text-[11.5px] tracking-wide leading-tight mt-0.5 ${
                      btn.primary ? "text-[#050A1A]" : "text-white"
                    }`}
                  >
                    {btn.line2}
                  </p>
                </div>
                <ArrowRight
                  className={`w-3.5 h-3.5 shrink-0 ${
                    btn.primary ? "text-[#050A1A]" : "text-[#F3B71B]"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN 5-COLUMN GRID ── */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1.2fr 0.8fr 1fr 1fr 1fr",
            borderBottom: "1px solid #1E2A45",
          }}
        >
        {/* COL 1: Event Info */}
        <div
          className="flex flex-col gap-3 py-5 pr-2"
          style={{ borderRight: "1px solid #1E2A45" }}
        >
          <div>
            <p className="text-white font-bold text-[15px] leading-none mb-1.5">IHWE</p>
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
        <div
          className="py-5 px-4"
          style={{ borderRight: "1px solid #1E2A45" }}
        >
          <p className="text-[#F3B71B] font-bold text-[11.5px] uppercase tracking-widest">
            QUICK LINKS
          </p>
          <div className="w-7 h-[2px] bg-[#F3B71B] my-2" />
          <div className="flex flex-col gap-1.5">
            {quickLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="flex items-center gap-1.5 text-[11.5px] text-slate-300 hover:text-[#F3B71B] transition-colors"
              >
                <ChevronRight className="w-2.5 h-2.5 text-slate-600 shrink-0" />
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* COL 3: Exhibitor Resources */}
        <div
          className="py-5 px-4"
          style={{ borderRight: "1px solid #1E2A45" }}
        >
          <p className="text-[#F3B71B] font-bold text-[11.5px] uppercase tracking-widest">
            EXHIBITOR RESOURCES
          </p>
          <div className="w-7 h-[2px] bg-[#F3B71B] my-2" />
          <div className="flex flex-col gap-1.5">
            {exhibitorLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="flex items-center gap-1.5 text-[11.5px] text-slate-300 hover:text-[#F3B71B] transition-colors"
              >
                <ChevronRight className="w-2.5 h-2.5 text-slate-600 shrink-0" />
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* COL 4: Contact Information */}
        <div
          className="py-5 px-4"
          style={{ borderRight: "1px solid #1E2A45" }}
        >
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
                large: true,
                gold: false,
              },
              {
                Icon: Mail,
                label: "Email",
                value: contactEmail,
                large: false,
                gold: false,
              },
              {
                Icon: Globe,
                label: "Official Website",
                value: "www.ihwe.in",
                gold: true,
                large: false,
              },
              {
                Icon: Building2,
                label: "Organised By",
                value: "Namo Gange Wellness Pvt. Ltd.",
                large: false,
                gold: false,
              },
            ].map(({ Icon, label, value, gold, large }) => (
              <div key={label} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full border border-[#F3B71B] flex items-center justify-center shrink-0">
                  <Icon className="w-3 h-3 text-[#F3B71B]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#CBD5E1] mb-0.5">{label}</p>
                  <p
                    className={`font-semibold leading-tight ${
                      gold ? "text-[#cbd5e1]" : "text-[#CBD5E1]"
                    } ${large ? "text-[13px]" : "text-[11px]"}`}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COL 5: Event Highlights */}
        <div className="py-5 px-4">
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
        <div
          className="grid grid-cols-4"
          style={{ borderBottom: "1px solid #1E2A45" }}
        >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="flex items-center gap-3.5 py-4 px-5"
            style={{
              borderRight:
                i < stats.length - 1 ? "1px solid #1E2A45" : "none",
            }}
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
        className="flex items-center justify-between flex-wrap gap-3 px-5 py-3.5"
        style={{ background: "#030712" }}
      >
        <p className="text-[11px] text-slate-500">
          © 2026 International Health & Wellness Expo. All Rights Reserved.
        </p>

        <div className="flex items-center flex-wrap">
          {[
            "Privacy Policy",
            "Terms & Conditions",
            "Refund Policy",
            "Payment Policy",
            "Cancellation Policy",
          ].map((p, i) => (
            <span
              key={p}
              className="text-[10.5px] text-slate-500 hover:text-[#F3B71B] cursor-pointer transition-colors px-2.5"
              style={{
                borderRight: i < 4 ? "1px solid #1E2A45" : "none",
              }}
            >
              {p}
            </span>
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