import { useState, useEffect, useRef, cloneElement } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Globe, HeartPulse, Sprout, User, MonitorDot, Plane, Leaf, GraduationCap, Trophy, Handshake } from "lucide-react";
import StatsCounter from "@/components/home/StatsCounter";
import ExhibitorLogos from "@/components/home/ExhibitorLogos";
import GlobalPlatform from "@/components/sections/GlobalPlatform";
import MissionVision from "@/components/sections/MissionVision";
import WhyAttend from "@/components/sections/WhyAttend";
import WhoShouldAttend from "@/components/sections/WhoShouldAttend";
import OrganizedBy from "@/components/sections/OrganizedBy";
import { heroBackgroundApi, eventOverviewApi, SERVER_URL, visionMissionApi, aboutOrganizerApi, ourJourneyApi } from "@/lib/api";
import * as LucideIcons from "lucide-react";

const CounterItem = ({ icon, number, sup, label, sub, prefix }: any) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const step = number / (1800 / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= number) { setCount(number); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [number]);

  return (
    <div ref={ref} className="flex items-center gap-4 px-6 py-6 group">
      <div className="w-12 h-12 rounded-xl bg-[#f0f9f0] flex items-center justify-center shrink-0 group-hover:bg-[#23471d] transition-colors duration-300 text-[#23471d] group-hover:text-white">
        {cloneElement(icon, { stroke: "currentColor" })}
      </div>
      <div>
        <div className="flex items-baseline leading-none mb-1.5 gap-0.5">
          {prefix && <span style={{ color: '#d26019', fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.2rem' }}>{prefix}</span>}
          <span style={{ color: '#d26019', fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.75rem' }} className="tabular-nums">
            {count.toLocaleString()}
          </span>
          <span style={{ color: '#23471d', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.9rem' }}>{sup}</span>
        </div>
        <p style={{ color: '#23471d', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '9.5px', letterSpacing: '0.18em' }} className="uppercase">{label}</p>
        <p style={{ color: '#000000ff', fontFamily: "'Inter', sans-serif", fontSize: '10px', marginTop: '2px' }}>{sub}</p>
      </div>
    </div>
  );
};

const STATS = [
  {
    number: 9, sup: "th", label: "EDITION", sub: "A Decade of Excellence",
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#23471d" strokeWidth="1.8"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" strokeLinecap="round" strokeLinejoin="round" /></svg>
  },
  {
    number: 1500, sup: "+", label: "EXHIBITORS", sub: "Across 8 Successful Editions",
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#23471d" strokeWidth="1.8"><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" /></svg>
  },
  {
    number: 10, sup: "+", label: "YEARS", sub: "Legacy of Trust & Growth",
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#23471d" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" /></svg>
  },
  {
    number: 500, sup: "Cr+", prefix: "₹", label: "BUSINESS OPPORTUNITIES", sub: "Generated Over the Years",
    icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#23471d" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  },
];

const VENUE_STATS = [
  {
    end: 220, prefix: "180–", suffix: "", label: "EXHIBITORS", iconColor: "#d26019",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  },
  {
    end: 11000, prefix: "9,000–", suffix: "", label: "VISITORS", iconColor: "#23471d",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" /></svg>
  },
  {
    end: 650, prefix: "500–", suffix: "", label: "B2B BUYERS", iconColor: "#d26019",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
  },
  {
    end: 100, prefix: "", suffix: "+", label: "SPEAKERS & EXPERTS", iconColor: "#23471d",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
  },
  {
    end: 7, prefix: "5–", suffix: "", label: "COUNTRIES PARTICIPATION", iconColor: "#d26019",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
  },
  {
    end: 700, prefix: "₹500–", suffix: " Cr+", label: "BUSINESS OPPORTUNITIES", iconColor: "#23471d",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
  },
];

const VenueStatItem = ({ stat, visible, delay }: { stat: typeof VENUE_STATS[0], visible: boolean, delay: number }) => {
  const [count, setCount] = useState(0);
  const animated = useRef(false);
  useEffect(() => {
    if (!visible || animated.current) return;
    const timer = setTimeout(() => {
      animated.current = true;
      let start = 0;
      const step = stat.end / (1600 / 16);
      const interval = setInterval(() => {
        start += step;
        if (start >= stat.end) { setCount(stat.end); clearInterval(interval); }
        else setCount(Math.floor(start));
      }, 16);
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, stat.end, delay]);

  return (
    <div className="flex flex-col items-center text-center py-5 px-3">
      <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center mb-3" style={{ borderColor: `${stat.iconColor}40` }}>
        {stat.icon(stat.iconColor)}
      </div>
      <p className="font-black text-[15px] leading-tight" style={{ color: stat.iconColor, fontFamily: "'Inter', sans-serif" }}>
        {stat.prefix}{count.toLocaleString()}{stat.suffix}
      </p>
      <p className="text-black text-[9px] uppercase tracking-[0.15em] font-bold mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>{stat.label}</p>
    </div>
  );
};

const VenueStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="border-t border-b border-gray-200">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-200">
        {VENUE_STATS.map((stat, i) => <VenueStatItem key={i} stat={stat} visible={visible} delay={i * 120} />)}
      </div>
    </div>
  );
};

const About = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [eventOverviewData, setEventOverviewData] = useState<any>(null);
  const [visionMission, setVisionMission] = useState<any>(null);
  const [organizerData, setOrganizerData] = useState<any>(null);
  const [journeyData, setJourneyData] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await heroBackgroundApi.getByPage("Overview / About IHWE");
        if (data) {
          setHeroData(data);
        }
      } catch (error) {
        console.error("Error fetching hero background:", error);
      }
    };

    const fetchEventOverview = async () => {
      try {
        const data = await eventOverviewApi.get();
        if (data) {
          setEventOverviewData(data);
        }
        const vmData = await visionMissionApi.get();
        if (vmData) setVisionMission(vmData);

        const orgData = await aboutOrganizerApi.get();
        if (orgData) setOrganizerData(orgData);

        const jData = await ourJourneyApi.get();
        if (jData) setJourneyData(jData);
      } catch (error) {
        console.error("Error fetching event overview:", error);
      }
    };

    fetchHero();
    fetchEventOverview();
  }, []);

  // Use dynamic data if available
  const heroStyles = {
    backgroundImage: heroData?.backgroundImage
      ? `url(${SERVER_URL}${heroData.backgroundImage})`
      : `none`
  };

  const heroSubtitle = heroData?.subtitle || "";
  const subtitleFontSize = heroData?.subtitleFontSize || "12";
  const heroTitle = heroData?.title || "";
  const titleFontSize = heroData?.titleFontSize || "45";
  const heroTitle2 = heroData?.title2 || "";
  const title2FontSize = heroData?.title2FontSize || "45";
  const heroDesc = heroData?.shortDescription || "";
  const descriptionFontSize = heroData?.descriptionFontSize || "16";
  const heroAlt = heroData?.imageAltText || "";
  const button1Text = heroData?.button1Text || "";
  const button1Link = heroData?.button1Link || "";
  const button2Text = heroData?.button2Text || "";
  const button2Link = heroData?.button2Link || "";
  const infoBar1 = heroData?.infoBar1 || "";
  const infoBar2 = heroData?.infoBar2 || "";
  const infoBar3 = heroData?.infoBar3 || "";
  const heroHeading = heroData?.heading || "";

  return (
    <div className="bg-[#FFFDF1] font-inter">
      {/* PROFESSIONAL HERO SECTION */}
      <section
        className="hero-background-about"
        style={heroStyles}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />

        <div className="container mx-auto px-8 text-left text-white relative z-10 flex flex-col justify-end h-full py-8" data-aos="fade-up">
          <div>
            {heroSubtitle && (
              <div className="mb-2">
                <span
                  className="subtitle-underline uppercase tracking-tight opacity-90 font-medium [&_a]:text-white [&_a]:no-underline [&_a]:pointer-events-none [&_*]:!bg-transparent [&_p]:!bg-transparent inline-block"
                  style={{ fontSize: `${subtitleFontSize}px`, fontFamily: "'Poppins', sans-serif", color: 'white' }}
                  dangerouslySetInnerHTML={{ __html: heroSubtitle.replace(/<a[^>]*>/gi, '<span>').replace(/<\/a>/gi, '</span>') }}
                />
              </div>
            )}
            {heroTitle && (
              <h1
                className="font-semibold mb-0 tracking-tight [&_*]:!bg-transparent [&_p]:mb-0 [&_p]:leading-none"
                style={{ fontSize: `${titleFontSize}px`, fontFamily: "'Inter', sans-serif", lineHeight: 1.2, display: 'block' }}
                dangerouslySetInnerHTML={{ __html: heroTitle }}
              />
            )}
            {heroHeading && (
              <h2
                className="font-bold mb-2 tracking-tight text-white/90"
                style={{ fontSize: '24px', fontFamily: "'Inter', sans-serif", lineHeight: 1.3, marginTop: '10px' }}
                dangerouslySetInnerHTML={{ __html: heroHeading }}
              />
            )}
            {heroTitle2 && (
              <h2
                className="font-semibold mb-2 tracking-tight [&_*]:!bg-transparent [&_p]:mb-0 [&_p]:leading-none"
                style={{ fontSize: `${title2FontSize}px`, fontFamily: "'Inter', sans-serif", lineHeight: 1.2, display: 'block', marginTop: 0 }}
                dangerouslySetInnerHTML={{ __html: heroTitle2 }}
              />
            )}
            {heroDesc && (
              <div
                className="text-white/90 mb-2 max-w-3xl font-light leading-relaxed [&_*]:!bg-transparent"
                style={{ fontSize: `${descriptionFontSize}px`, fontFamily: "'Inter', sans-serif" }}
                dangerouslySetInnerHTML={{ __html: heroDesc }}
              />
            )}
          </div>
          <div className="pb-6">
            {/* INFO BAR - above buttons */}
            {(infoBar1 || infoBar2 || infoBar3) && (
              <div className="flex flex-row items-stretch w-fit mb-3 bg-black/40 backdrop-blur-sm">
                {infoBar1 && (
                  <div className="flex items-center gap-2 py-2 pr-4 border-r border-white/20">
                    <Calendar className="w-3.5 h-3.5 text-[#d26019] shrink-0" strokeWidth={1.5} />
                    <div className="text-white text-[10px] font-bold uppercase tracking-wider leading-tight [&_*]:text-white" dangerouslySetInnerHTML={{ __html: infoBar1 }} />
                  </div>
                )}
                {infoBar2 && (
                  <div className="flex items-center gap-2 py-2 px-4 border-r border-white/20">
                    <MapPin className="w-3.5 h-3.5 text-[#d26019] shrink-0" strokeWidth={1.5} />
                    <div className="text-white text-[10px] font-bold uppercase tracking-wider leading-tight [&_*]:text-white" dangerouslySetInnerHTML={{ __html: infoBar2 }} />
                  </div>
                )}
                {infoBar3 && (
                  <div className="flex items-center gap-2 py-2 pl-4">
                    <Globe className="w-3.5 h-3.5 text-[#d26019] shrink-0" strokeWidth={1.5} />
                    <div className="text-white text-[10px] font-bold uppercase tracking-wider leading-tight [&_*]:text-white" dangerouslySetInnerHTML={{ __html: infoBar3 }} />
                  </div>
                )}
              </div>
            )}

            {/* CTA Buttons */}
            {(button1Text || button2Text) && (
              <div className="flex flex-row gap-3 mt-6">
                {button1Text && button1Link && (
                  button1Link.startsWith('http') ? (
                    <a
                      href={button1Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 bg-[#d26019] hover:bg-[#b8521a] text-white uppercase tracking-[0.12em] text-[9px] font-black transition-all duration-300 shrink-0"
                    >
                      {button1Text}
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  ) : (
                    <Link
                      to={button1Link}
                      className="group flex items-center gap-2 px-4 py-2 bg-[#d26019] hover:bg-[#b8521a] text-white uppercase tracking-[0.12em] text-[9px] font-black transition-all duration-300 shrink-0"
                    >
                      {button1Text}
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  )
                )}
                {button2Text && button2Link && (
                  button2Link.startsWith('http') ? (
                    <a
                      href={button2Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 bg-white text-[#23471d] hover:bg-gray-100 uppercase tracking-[0.12em] text-[9px] font-black transition-all duration-300 shrink-0"
                    >
                      {button2Text}
                    </a>
                  ) : (
                    <Link
                      to={button2Link}
                      className="group flex items-center gap-2 px-4 py-2 bg-white text-[#23471d] hover:bg-gray-100 uppercase tracking-[0.12em] text-[9px] font-black transition-all duration-300 shrink-0"
                    >
                      {button2Text}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STATS COUNTER BAR - overlapping hero */}
      {/* <div className="relative z-20 -mt-10 px-6">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {STATS.map((item, i) => (
              <CounterItem key={i} {...item} />
            ))}
          </div>
        </div>
      </div> */}

      {/* EVENT OVERVIEW + KEY SECTORS */}


      {/* DYNAMIC GLOBAL PLATFORM SECTION */}
      <GlobalPlatform />

      {/* EVENT OVERVIEW + KEY SECTORS */}
<section className=" pb-12 bg-white">
  <div className="container mx-auto px-11">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

      {/* LEFT - Event Overview */}
      {eventOverviewData ? (
        <div data-aos="fade-right">
          <p className="text-[#d26019] font-bold text-[13px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            {eventOverviewData.subtitle}
          </p>
          <h2 className="font-black text-[28px] leading-[1.2] mb-4 text-[#1a2e1a]" style={{ fontFamily: "'Inter', sans-serif" }}>
            {eventOverviewData.title}
          </h2>
          <div 
            className="text-gray-900 text-sm leading-[1.6] mb-3 text-justify strip-editor-bg prose prose-sm max-w-none [&_*]:!bg-transparent" 
            style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}
            dangerouslySetInnerHTML={{ __html: eventOverviewData.descriptionHtml }}
          />
        </div>
      ) : (
        <div>
          <p className="text-[#d26019] font-bold text-[13px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            Event Overview
          </p>
          <h2 className="font-black text-[28px] leading-[1.2] mb-4 text-[#1a2e1a]" style={{ fontFamily: "'Inter', sans-serif" }}>
            A Global Platform Connecting Healthcare  Wellness & Business Opportunities
          </h2>
          <p className="text-gray-900 text-sm leading-[1.6] mb-3 text-justify strip-editor-bg" style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}>
            The International Health & Wellness Expo (IHWE) 2026 is a globally positioned B2B healthcare and wellness exhibition in India, designed to bring together the entire ecosystem of healthcare, AYUSH, wellness, nutrition, medical technology, and preventive healthcare under one integrated platform.
          </p>
          <p className="text-gray-900 text-sm leading-[1.6] mb-3 text-justify strip-editor-bg" style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}>
            Now in its 9th Edition, IHWE has evolved into a comprehensive business, knowledge, and networking platform, attracting exhibitors, buyers, healthcare professionals, startups, and international delegates from across India and global markets.
          </p>
          <p className="text-gray-900 text-sm leading-[1.6] text-justify strip-editor-bg" style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}>
            Scheduled from 21st – 23rd August 2026 at Pragati Maidan, New Delhi, the expo is strategically designed to enable business growth, industry collaboration, and global trade opportunities in one high-impact environment.
          </p>
        </div>
      )}

      {/* RIGHT - Key Sectors */}
      <div data-aos="fade-left">
        <p className="text-[#d26019] font-bold text-[13px] uppercase tracking-[0.22em] mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
          {eventOverviewData?.keySectorsTitle || "Key Sectors"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {(eventOverviewData?.sectors || [
            { label: "Healthcare & Medical Industry", color: "#3b82f6", iconName: "HeartPulse" },
            { label: "AYUSH & Traditional Medicine", color: "#22c55e", iconName: "Sprout" },
            { label: "Wellness, Fitness & Lifestyle", color: "#f59e0b", iconName: "User" },
            { label: "Digital Health, AI & Medical Technology", color: "#8b5cf6", iconName: "MonitorDot" },
            { label: "Medical Tourism in India", color: "#06b6d4", iconName: "Plane" },
            { label: "Nutrition, Organic & Sustainable Living", color: "#10b981", iconName: "Leaf" },
          ]).map((sector: any, i: number) => {
            const Icon = (LucideIcons as any)[sector.iconName] || LucideIcons.HeartPulse;
            return (
              <div key={i} className="flex flex-col items-center text-center gap-3 p-4 bg-[#f8f9fa] rounded-xl shadow-sm transition-all duration-300 group cursor-default border border-gray-100 hover:border-[#d26019]/30">
                <div className="transition-transform duration-300 group-hover:scale-110" style={{ color: sector.color }}>
                  <Icon className="w-16 h-16" strokeWidth={1.2} />
                </div>
                <span className="text-[#1a2e1a] font-bold text-[11px] leading-[1.4]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {sector.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  </div>
</section>


      {/* ABOUT THE ORGANIZER */}
      <section className="py-10 bg-[#FFFDF1] border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">

            {/* LEFT - About the Organizer */}
            <div>
              <p className="flex items-center gap-2 text-[#d26019] font-semibold text-[11px] uppercase tracking-[0.22em] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="inline-block w-6 h-[1.5px] bg-[#d26019]" />
                {organizerData?.subtitle || "About the Organizer"}
              </p>
              <h2 className="text-[#23471d] font-black text-2xl leading-[1.3] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                {organizerData?.title || "Namo Gange Wellness Pvt. Ltd."}
              </h2>
              
              {organizerData?.descriptionHtml ? (
                <div 
                  className="text-gray-800 text-[13px] leading-[1.7] mb-4 text-justify strip-editor-bg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: organizerData.descriptionHtml }}
                />
              ) : (
                <>
                  <p className="text-gray-800 text-[13px] leading-[1.7] mb-2 text-justify" style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}>
                    A professionally managed exhibition and conference organizer in India, specializing in creating large-scale B2B trade shows, healthcare exhibitions, and global business platforms.
                  </p>
                  <p className="text-gray-800 text-[13px] leading-[1.7] mb-4 text-justify" style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}>
                    Established in 2016, the company has built a strong reputation for delivering high-impact, result-driven platforms that combine exhibitions, conferences, buyer–seller meets, and international participation into one ecosystem.
                  </p>
                </>
              )}

              {/* Core Capabilities */}
              <p className="text-[#23471d] font-bold text-[10px] uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                {organizerData?.capabilitiesTitle || "Core Capabilities"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-1">
                {(organizerData?.capabilities || [
                  "International exhibitions & trade shows",
                  "Healthcare conferences & seminars",
                  "Buyer–Seller Meets (B2B matchmaking)",
                  "Sponsorship & brand partnerships",
                  "International collaborations & delegations",
                  "Focused on delivering measurable ROI and business growth for participants."
                ]).map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-[15px] h-[15px] rounded-full bg-[#fef0e6] flex items-center justify-center shrink-0 mt-[2px]">
                      <svg viewBox="0 0 12 12" fill="none" className="w-[8px] h-[8px]">
                        <path d="M2 6l3 3 5-5" stroke="#d26019" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-900 text-[12px] leading-[1.5] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - Single Image */}
            <div className="lg:pl-8 flex items-center justify-center">
              <div className="relative w-full max-w-md" style={{ height: '380px' }}>

                {/* Dot pattern top-right */}
                <div className="absolute -top-4 -right-4 w-24 h-24 z-0 pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(circle, #d26019 1.2px, transparent 1.2px)', backgroundSize: '9px 9px', opacity: 0.25 }} />
                {/* Dot pattern bottom-left */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 z-0 pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(circle, #23471d 1.2px, transparent 1.2px)', backgroundSize: '9px 9px', opacity: 0.2 }} />

                {/* Image */}
                <div className="relative z-10 w-full h-full overflow-hidden group"
                  style={{ outline: '2px solid #d26019', outlineOffset: '-2px' }}>
                  <img
                    src={organizerData?.imageUrl ? `${SERVER_URL}${organizerData.imageUrl}` : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"}
                    alt={organizerData?.imageAltText || "Organizer Image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#d26019]" />
                  <div className="absolute top-0 left-0 h-full w-[4px] bg-[#23471d]" />
                </div>

                {/* Badge */}
                {organizerData?.experienceText && (
                  <div className="absolute z-20 flex flex-col items-center justify-center text-center p-2"
                    style={{ bottom: '0px', right: '0px', minWidth: '80px', minHeight: '80px', background: '#d26019', border: '3px solid #fff', boxShadow: '0 6px 24px rgba(210,96,25,0.4)' }}>
                    <span style={{ color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '20px', lineHeight: 1 }}>
                      {organizerData.experienceText.split(' ')[0]}
                    </span>
                    <span style={{ color: '#ffe0c8', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '7px', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3px' }}>
                      {organizerData.experienceText.split(' ').slice(1).join(' ') || 'Years'}
                    </span>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR JOURNEY & FLAGSHIP EVENTS */}
      <section className="py-6 bg-[#FFFDF1] border-t border-gray-100">
        <div className="container mx-auto px-6">

          {/* Header */}
          <div className="mb-5">
            <p className="flex items-center gap-2 text-[#d26019] font-semibold text-[11px] uppercase tracking-[0.22em] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="inline-block w-6 h-[1.5px] bg-[#d26019]" />
              {journeyData?.subtitle || "Our Journey & Flagship Events"}
            </p>
            <h2 className="text-[#23471d] font-black text-2xl leading-[1.3] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              {journeyData?.mainTitle || "A Legacy of Growth & Innovation"}
            </h2>
            <p className="text-gray-900 text-[13px] leading-[1.7] max-w-2xl text-justify" style={{ fontFamily: "'Inter', sans-serif", textAlign: 'justify' }}>
              {journeyData?.mainDescription || "With a proven legacy of delivering result-oriented exhibitions, we forge lasting business relationships and accelerate industry growth."}
            </p>
          </div>

          {/* 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Timeline card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#fef0e6] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <p className="text-[#23471d] font-bold text-[12px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                   {journeyData?.journeyHeading || "Our Journey: A Legacy of Growth"}
                </p>
              </div>
              <div className="flex flex-col gap-4 pl-3 border-l-2 border-[#d26019]/25">
                {(journeyData?.journeyItems || [
                  { year: "2016", text: "Company Founded — commitment to exceptional exhibition management." },
                  { year: "2016–25", text: "Successfully organized International Health & Wellness Expos, establishing a credible global platform for integrated healthcare, preventive wellness and medical innovation." },
                  { year: "2026", text: "IHWE 9th Edition — nine successful editions, sustained growth, expanding global participation and established leadership in the integrated healthcare and wellness industry." },
                ]).map((item: any, i: number) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-[#d26019] font-black text-[11px] shrink-0 w-12 mt-[2px]" style={{ fontFamily: "'Inter', sans-serif" }}>{item.year}</span>
                    <p className="text-gray-600 text-[12px] leading-[1.6]" style={{ fontFamily: "'Inter', sans-serif" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Sectors card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#fef0e6] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                  </svg>
                </div>
                <p className="text-[#23471d] font-bold text-[12px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                   {journeyData?.sectorsHeading || "Driving Innovation Across Core Sectors"}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {(journeyData?.sectorsItems || [
                  { label: "Health & Wellness", text: "Shaping the future of integrated personal & public healthcare through innovation, prevention, and global collaboration." },
                  { label: "Medical Sustainability", text: "Promoting eco-friendly medical practices, sustainable hospital infrastructure and green healthcare technologies." },
                  { label: "Digital Health", text: "Bridging technology and healthcare for smarter solutions." },
                  { label: "Health Tourism", text: "Positioning India as a global leader in health travel." },
                ]).map((item: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d26019] shrink-0 mt-[5px]" />
                    <p className="text-gray-600 text-[12px] leading-[1.55]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="text-[#23471d] font-semibold">{item.label}: </span>{item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Flagship Events card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#fef0e6] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                  </svg>
                </div>
                <p className="text-[#23471d] font-bold text-[12px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                   {journeyData?.eventsHeading || "Flagship Events: A Proven Track Record"}
                </p>
              </div>
              <p className="text-gray-500 text-[11px] leading-[1.5] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                {journeyData?.eventsDescription || "NGWPL's flagship events consistently deliver exceptional value and foster vibrant communities, creating significant market opportunities."}
              </p>
              <div className="flex flex-col gap-2">
                {(journeyData?.eventsList || [
                  "International Health & Wellness Expo",
                  "Indo Himalayan Expo",
                  "Punjab Health & Wellness Expo",
                  "The Yogshala Expo",
                  "Arogya Sangoshthi",
                  "Agritech Innovate India",
                  "Bharat Development & Schemes Expo",
                  "Organic Expo"
                ]).map((ev: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d26019] shrink-0" />
                    <span className="text-gray-700 text-[12px]" style={{ fontFamily: "'Inter', sans-serif" }}>{ev}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC MISSION & VISION SECTION */}
      <MissionVision />


{/* FROM INDIA TO THE WORLD - Global Platform Section */}
<section
  className="py-0 overflow-hidden border-t border-gray-100 relative"
  style={{ fontFamily: "'Roboto', sans-serif", background: '#ffffff' }}
>
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Roboto:wght@300;400;500;700;900&display=swap');

    .ihwe-bullet-icon {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #fef3c7;
      border: 1.5px solid #d97706;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .ihwe-pillar-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 11px;
      padding: 22px 10px 18px;
      background: #ffffff;
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      cursor: default;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }

    .ihwe-pillar-card:hover {
      transform: translateY(-5px);
      border-color: #d26019;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  `}</style>

  {/* ── World-map dot + arc background ── */}
  <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 440"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dot grid */}
      <g opacity="0.08" fill="#d26019">
        {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 400, 430].map((cy, ri) =>
          Array.from({ length: 30 }, (_, ci) => {
            const cx = ci * 40 + (ri % 2 === 0 ? 20 : 40);
            const r = (ri + ci) % 3 === 0 ? 1.4 : 0.75;
            return <circle key={`${ri}-${ci}`} cx={cx} cy={cy} r={r} />;
          })
        )}
      </g>

      {/* Connection arcs */}
      <g stroke="#d26019" strokeWidth="0.5" opacity="0.1" fill="none">
        <path d="M100,140 Q300,60 550,120" />
        <path d="M550,120 Q750,180 950,110" />
        <path d="M950,110 Q1100,70 1180,140" />
        <path d="M100,140 Q250,200 420,190" />
        <path d="M420,190 Q600,230 780,200" />
        <path d="M780,200 Q950,170 1100,220" />
        <path d="M200,260 Q400,300 600,270" />
        <path d="M600,270 Q820,320 1050,270" />
        <path d="M550,120 Q580,200 600,270" />
        <path d="M950,110 Q960,160 1050,270" />
      </g>

      {/* Node dots */}
      <g fill="#d26019" opacity="0.15">
        {[
          [100, 140], [550, 120], [950, 110], [1180, 140],
          [420, 190], [780, 200], [1100, 220], [600, 270],
          [200, 260], [1050, 270],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i === 5 ? 5 : 3.5} />
        ))}
      </g>

      {/* India golden highlight */}
      <circle cx="780" cy="200" r="12" fill="none" stroke="#d4a843" strokeWidth="1.2" opacity="0.45" />
      <circle cx="780" cy="200" r="6" fill="#d4a843" opacity="0.9" />
    </svg>
  </div>

  {/* Gradient overlay */}
  <div
    className="absolute inset-0"
    style={{
      background:
        'linear-gradient(110deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 45%, rgba(255,255,255,0.85) 100%)',
      pointerEvents: 'none',
    }}
  />

  {/* ── Two-column grid ── */}
  <div
    className="relative z-10 grid grid-cols-1 lg:grid-cols-2"
    style={{ minHeight: '420px' }}
  >
    {/* ════ LEFT PANEL ════ */}
    <div
      className="flex flex-col justify-center"
      style={{
        padding: '52px 48px 52px 52px',
        borderRight: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <span style={{ width: '32px', height: '2px', background: '#d4a843', flexShrink: 0, display: 'inline-block' }} />
        <span
          style={{
            color: '#d26019',
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            fontSize: '9.5px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}
        >
          From India to the World
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '32px',
          fontWeight: 900,
          color: '#1a2e1a',
          lineHeight: 1.22,
          marginBottom: '14px',
        }}
      >
        From a National Expo
        <br />
        to a{' '}
        <span style={{ color: '#d26019', fontStyle: 'italic' }}>Global Platform</span>
      </h2>

      {/* Gold divider */}
      <div style={{ width: '36px', height: '2px', background: '#d26019', marginBottom: '18px' }} />

      {/* Intro */}
      <p
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: '13px',
          lineHeight: 1.8,
          color: '#4b5563',
          fontWeight: 400,
          marginBottom: '22px',
        }}
      >
        The 9th Edition – Global Edition marks a strategic evolution of IHWE, designed to attract:
      </p>

      {/* Bullet list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          'International Exhibitors & Global Brands',
          'Buyers, Distributors & Importers',
          'Hospitals & Healthcare Institutions',
          'Investors, Startups & Innovators',
          'Government Bodies, Embassies & Policymakers',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="ihwe-bullet-icon">
              <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="#d97706"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#1a2e1a',
                lineHeight: 1.5,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* ════ RIGHT PANEL ════ */}
    <div
      className="flex flex-col justify-center"
      style={{ padding: '52px 52px 52px 48px' }}
    >
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <span style={{ width: '32px', height: '2px', background: '#d26019', flexShrink: 0, display: 'inline-block' }} />
        <span
          style={{
            color: '#d26019',
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            fontSize: '9.5px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}
        >
          Four Pillars of Growth
        </span>
      </div>

      {/* 4 Pillar Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
        {[
          {
            label: 'Global\nExhibitors',
            sub: 'Showcase to a global audience',
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <circle cx="9" cy="7" r="4" />
                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" />
              </svg>
            ),
          },
          {
            label: 'International\nBuyers',
            sub: 'Connect with decision makers',
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            ),
          },
          {
            label: 'Policy &\nKnowledge',
            sub: 'Dialogue, insights & roadmaps',
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            ),
          },
          {
            label: 'Investment &\nInnovation',
            sub: 'Growth & collaboration',
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6" y1="20" x2="6" y2="16" />
                <path d="M2 20h20" />
              </svg>
            ),
          },
        ].map((card, i) => (
          <div key={i} className="ihwe-pillar-card">
            {/* Icon box */}
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '10px',
                background: '#fef3c7',
                border: '1.2px solid #d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {card.icon}
            </div>

            {/* Label */}
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: '10.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                lineHeight: 1.4,
                color: '#1a2e1a',
                whiteSpace: 'pre-line',
              }}
            >
              {card.label}
            </p>

            {/* Sub */}
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: '11px',
                lineHeight: 1.5,
                color: '#4b5563',
                fontWeight: 400,
              }}
            >
              {card.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ONE PLATFORM. FOUR POWERFUL PILLARS. */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">

          <p className="flex items-center justify-center gap-3 text-[#d26019] font-semibold text-[15px] uppercase tracking-[0.28em] mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            <span className="inline-block w-9 h-[1.5px] bg-[#d26019]" />
            One Platform
            <span className="inline-block w-9 h-[1.5px] bg-[#d26019]" />
          </p>
          <h2 className="text-center font-black text-[28px] text-[#1a2e1a] mb-2 leading-[1.2]"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            Four Powerful Pillars
          </h2>
          <p className="text-center text-gray-400 text-[13px] mb-11"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            Everything you need — under one roof, at one event.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {[
              {
                title: "INTERNATIONAL EXHIBITION",
                titleColor: "#1e40af", // Professional blue
                desc: "Showcase products, launch innovations and expand to global markets.",
                iconBg: "#1e40af",
                icon: <Globe className="w-[22px] h-[22px] text-white" />,
                img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
              },
              {
                title: "AROGYA SANGOSHTHI (17th EDITION)",
                titleColor: "#166534", // Professional green
                desc: "Knowledge-driven conference on policy, innovation and preventive healthcare.",
                iconBg: "#166534",
                icon: <GraduationCap className="w-[22px] h-[22px] text-white" />,
                img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80",
              },
              {
                title: "GLOBAL HEALTH EXCELLENCE AWARDS",
                titleColor: "#b45309", // Professional gold/amber
                desc: "Recognizing excellence, innovation and leadership across the sector.",
                iconBg: "#b45309",
                icon: <Trophy className="w-[22px] h-[22px] text-white" />,
                img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=500&q=80",
              },
              {
                title: "BUYER–SELLER MEET (B2B PLATFORM)",
                titleColor: "#6b21a8", // Professional purple
                desc: "Pre-scheduled meetings for trade partnerships, exports and collaborations.",
                iconBg: "#6b21a8",
                icon: <Handshake className="w-[22px] h-[22px] text-white" />,
                img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&q=80",
              },
            ].map((pillar, i) => (
              <div key={i}
                className="bg-white border-2 border-gray-100 transition-all duration-400 flex flex-col items-center text-center group relative rounded-xl hover:border-gray-200">
                {/* Image */}
                <div className="relative w-full h-[180px] overflow-hidden">
                  <img src={pillar.img} alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Overlapping Icon Circle - Moved outside overflow container to prevent clipping */}
                <div className="absolute top-[152px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-[4px] border-white flex items-center justify-center shadow-lg z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: pillar.iconBg }}>
                  {pillar.icon}
                </div>

                {/* Content */}
                <div className="pt-10 pb-8 px-6 flex flex-col items-center flex-1">
                  {/* Title with animated underline */}
                  <div className="relative mb-4 group-hover:mb-5 transition-all duration-300">
                    <h3 className="font-bold text-[14px] leading-[1.3] uppercase tracking-wide px-2"
                      style={{ color: pillar.titleColor, fontFamily: "'Inter', sans-serif" }}>
                      {pillar.title}
                    </h3>
                    <span
                      className="absolute left-1/2 -bottom-1 h-[2px] w-0 -translate-x-1/2 group-hover:w-full transition-all duration-500 ease-in-out"
                      style={{ backgroundColor: pillar.titleColor }}
                    />
                  </div>

                  <p className="text-gray-800 text-[12.5px] leading-[1.65] font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* OUR VENUE - Why Pragati Maidan */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* LEFT - Venue Image - NO border radius */}
            <div className="relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80"
                alt="Pragati Maidan, New Delhi"
                className="w-full h-[340px] object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
              <span
                className="absolute top-4 right-4 bg-[#d26019] text-white text-[9px] font-semibold uppercase tracking-[0.15em] px-[10px] py-[5px] rounded-[5px]"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Hall 08, 09 &amp; 10
              </span>
              <div className="absolute bottom-4 left-4 bg-white/95 px-[14px] py-2 rounded-lg flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-[#1a2e1a] font-semibold text-[10.5px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Pragati Maidan, New Delhi
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <p className="flex items-center gap-2 text-[#d26019] font-bold text-[13px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="inline-block w-6 h-[1.5px] bg-[#d26019]" />
                Our Venue
              </p>
              <h2 className="font-black text-[32px] text-[#23471d] leading-[1.25] mb-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                Why Pragati Maidan,New Delhi?
              </h2>
              <div className="w-9 h-[2px] bg-[#d26019] my-5" />

              {/* Bullet Points - Circle style like image 2 */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  {
                    color: "#d26019", bg: "#fff3eb",
                    text: "India's premier international exhibition & convention venue",
                    icon: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>
                  },
                  {
                    color: "#23471d", bg: "#edf7ed",
                    text: "Excellent connectivity — Metro, Airport & Central Delhi",
                    icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>
                  },
                  {
                    color: "#d26019", bg: "#fff3eb",
                    text: "World-class infrastructure with modern exhibition halls",
                    icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>
                  },
                  {
                    color: "#23471d", bg: "#edf7ed",
                    text: "Preferred destination for global trade fairs & exhibitions",
                    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>
                  },
                  {
                    color: "#d26019", bg: "#fff3eb",
                    text: "Close to government ministries, embassies & institutions",
                    icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>
                  },
                  {
                    color: "#23471d", bg: "#edf7ed",
                    text: "A perfect environment for global business & networking",
                    icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {/* Circle with border + icon inside - like image 2 */}
                    <div
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: item.bg,
                        border: `1.8px solid ${item.color}`,
                      }}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-[17px] h-[17px]">
                        {item.icon}
                      </svg>
                    </div>
                    <p
                      className="text-[#2a2a2a] text-[12.5px] leading-[1.6] mt-[6px] font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* THE SCALE. THE IMPACT. */}
          <div className="mt-14 border-t border-gray-100 pt-10">
            <p className="flex items-center justify-center gap-3 text-[#d26019] font-semibold text-[10px] uppercase tracking-[0.28em] mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="inline-block w-8 h-[1.5px] bg-[#d26019]" />
              The Scale. The Impact.
              <span className="inline-block w-8 h-[1.5px] bg-[#d26019]" />
            </p>
            <VenueStats />
          </div>
        </div>
      </section>

      {/* WHO WE ARE + ORGANISED BY */}
      <section className="py-16 bg-[#FFFDF1] border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12">

            {/* LEFT - Who We Are */}
            <div>
              <p className="flex items-center gap-2 text-[#d26019] font-semibold text-[10px] uppercase tracking-[0.22em] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="inline-block w-6 h-[1.5px] bg-[#d26019]" />
                Who We Are
              </p>
              <h2 className="text-[#23471d] font-black text-3xl leading-[1.3] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                A Mission-Driven Platform<br />for a Healthier Tomorrow
              </h2>
              <p className="text-gray-900 text-sm leading-[1.8] mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                IHWE is more than an event — it is a long-term ecosystem that drives business growth, knowledge exchange, innovation and global partnerships for a healthier, sustainable future.
              </p>

              {/* 4 features - NO cards, just icon + text like image 1 & 2 */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                {[
                  {
                    label: "Promoting Preventive Healthcare",
                    color: "#d26019",
                    icon: <HeartPulse className="w-10 h-10" strokeWidth={1.5} />,
                  },
                  {
                    label: "Bridging Tradition with Innovation",
                    color: "#22c55e",
                    icon: <Sprout className="w-10 h-10" strokeWidth={1.5} />,
                  },
                  {
                    label: "Strengthening Global Trade & Collaboration",
                    color: "#3b82f6",
                    icon: <Globe className="w-10 h-10" strokeWidth={1.5} />,
                  },
                  {
                    label: "Building a Sustainable Wellness Future",
                    color: "#8b5cf6",
                    icon: <Leaf className="w-10 h-10" strokeWidth={1.5} />,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-2">
                    <div style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <p className="text-[#1a2e1a] font-semibold text-[11px] leading-snug" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - Organised By */}
            <div className="mt-8 lg:mt-0">
              <p className="flex items-center gap-2 text-[#d26019] font-semibold text-[10px] uppercase tracking-[0.22em] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="inline-block w-6 h-[1.5px] bg-[#d26019]" />
                Organised By
              </p>

              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md mt-6">

                {/* Two org cards side by side */}
                <div className="grid grid-cols-2 divide-x divide-gray-400 bg-white">
                  {[
                    {
                      name: "Namo Gange Wellness Pvt. Ltd.",
                      desc: "A professional exhibition & conference management company since 2016, responsible for end-to-end event execution, partnerships, exhibitor & sponsor management and global outreach.",
                      logo: "/logos/namo-gange-wellness.png",
                    },
                    {
                      name: "Namo Gange Trust",
                      desc: "A socio-spiritual, non-profit organization registered under NGO Darpan (NITI Aayog), Government of India, providing visionary guidance and social credibility to the mission.",
                      logo: "/logos/namo-gange-trust.png",
                    },
                  ].map((org, i) => (
                    <div key={i} className="flex flex-col gap-3 p-5 hover:bg-[#fffaf7] transition-colors duration-200">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 shrink-0">
                        <img
                          src={org.logo}
                          alt={org.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style="width:32px;height:32px;opacity:0.35"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-[#23471d] font-bold text-[13px] mb-2 leading-snug" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {org.name}
                        </p>
                        <p className="text-gray-900 text-[11.5px] leading-[1.7]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {org.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dark green badge bar */}
                <div className="grid grid-cols-3 divide-x divide-white/20 bg-[#23471d]">
                  {[
                    {
                      label: "Transparency & Compliance",
                      icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
                    },
                    {
                      label: "Professional Execution",
                      icon: <><circle cx="12" cy="8" r="4" /><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></>,
                    },
                    {
                      label: "Institutional Trust & Confidence",
                      icon: <><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></>,
                    },
                  ].map((badge, i) => (
                    <div key={i} className="flex flex-col items-center justify-center gap-2 py-4 px-3 text-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0">
                        {badge.icon}
                      </svg>
                      <p className="text-white font-bold text-[9px] uppercase tracking-[0.12em] leading-[1.4]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {badge.label}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-10 bg-[#23471d]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-black text-xl mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Be Part of India's Global Wellness Movement</h3>
              <p className="text-[#d26019] font-semibold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Exhibit. Connect. Collaborate. Grow.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "BOOK YOUR STALL", link: "/book-a-stand", style: "orange" },
                { label: "REGISTER AS BUYER", link: "/buyer-registration", style: "white" },
                { label: "APPLY FOR AWARDS", link: "/contact", style: "white" },
              ].map((btn, i) => (
                <Link key={i} to={btn.link}
                  className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200
                    ${btn.style === 'orange' ? 'bg-[#d26019] text-white hover:bg-[#b8521a]' : ''}
                    ${btn.style === 'outline' ? 'bg-transparent border border-white text-white hover:bg-white hover:text-[#23471d]' : ''}
                    ${btn.style === 'white' ? 'bg-white text-[#23471d] hover:bg-gray-100' : ''}
                  `}
                  style={{ fontFamily: "'Inter', sans-serif" }}>
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* WHY ATTEND SECTION */}
      <WhyAttend />



      <StatsCounter />



      {/* WHO SHOULD ATTEND */}
      <WhoShouldAttend />
      <OrganizedBy />

      <ExhibitorLogos />

      {/* FINAL CALL TO ACTION */}
      {/* <section className="py-24 bg-[#FFFDF1] border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-white shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#23471d]" />
            <h2 className="text-3xl font-inter text-slate-900 mb-6">Want to be part of IHWE 2026?</h2>
            <p className="text-slate-600 mb-10">Join thousands of healthcare leaders and pioneers in building the future of wellness.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <button className="px-10 py-4 bg-[#23471d] text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#d26019] transition-all shadow-lg hover:-translate-y-1">
                  Contact Us
                </button>
              </Link>
              <Link to="/exhibition">
                <button className="px-10 py-4 border-2 border-[#23471d] text-[#23471d] rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#23471d] hover:text-white transition-all shadow-lg hover:-translate-y-1">
                  Explore Expo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;
