import { useState, useEffect, useRef, cloneElement } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Globe, HeartPulse, Sprout, User, MonitorDot, Plane, Leaf, GraduationCap, Trophy, Handshake, CheckCircle2, Users, Landmark, TrendingUp } from "lucide-react";
import StatsCounter from "@/components/home/StatsCounter";
import ExhibitorLogos from "@/components/home/ExhibitorLogos";
import GlobalPlatform from "@/components/sections/GlobalPlatform";
import MissionVision from "@/components/sections/MissionVision";
import WhyAttend from "@/components/sections/WhyAttend";
import WhoShouldAttend from "@/components/sections/WhoShouldAttend";
import OrganizedBy from "@/components/sections/OrganizedBy";
import { heroBackgroundApi, eventOverviewApi, SERVER_URL, visionMissionApi, aboutOrganizerApi, ourJourneyApi } from "@/lib/api";
import * as LucideIcons from "lucide-react";
import PragatiMaidanImg from "@/assets/Pragati-Maidan.jpg";
import InternationalImg from "@/assets/international.png";
import ConferenceImg from "@/assets/conference.png";
import B2BImg from "@/assets/b2b.png";
import AwardImg from "@/assets/global.png";
import AOS from "aos";
import "aos/dist/aos.css";

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
    icon: (c: string) => <svg viewBox="0 0 24 24" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  },
  {
    end: 11000, prefix: "9,000–", suffix: "", label: "VISITORS", iconColor: "#23471d",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" /></svg>
  },
  {
    end: 650, prefix: "500–", suffix: "", label: "B2B BUYERS", iconColor: "#d26019",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
  },
  {
    end: 100, prefix: "", suffix: "+", label: "SPEAKERS & EXPERTS", iconColor: "#23471d",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
  },
  {
    end: 7, prefix: "5–", suffix: "", label: "COUNTRIES PARTICIPATION", iconColor: "#d26019",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
  },
  {
    end: 700, prefix: "₹500–", suffix: " Cr+", label: "BUSINESS OPPORTUNITIES", iconColor: "#23471d",
    icon: (c: string) => <svg viewBox="0 0 24 24" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
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
    <div className="flex flex-col items-center text-center py-1.5 px-3">
      <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center mb-1.5" style={{ borderColor: `${stat.iconColor}40` }}>
        {stat.icon(stat.iconColor)}
      </div>
      <p className="font-black text-[15px] leading-tight" style={{ color: stat.iconColor, fontFamily: "'Inter', sans-serif" }}>
        {stat.prefix}{count.toLocaleString()}{stat.suffix}
      </p>
      <p className="text-black text-[9px] uppercase tracking-[0.15em] font-bold mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{stat.label}</p>
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
    <div ref={ref} className="">
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const wrap = canvas.parentElement!;

    const resize = () => {
      canvas.width = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    };
    resize();

    const dots = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.5,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      a: Math.random() * 0.7 + 0.3,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243,183,27,${d.a})`;
        ctx.fill();
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(243,183,27,${0.25 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await heroBackgroundApi.getByPage("Overview / About IHWE");
        if (data) {
          setHeroData(data);
          setTimeout(() => AOS.refresh(), 100);
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
        
        setTimeout(() => AOS.refresh(), 500);
      } catch (error) {
        console.error("Error fetching event overview:", error);
      }
    };

    fetchHero();
    fetchEventOverview();
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
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

        <div className="container mx-auto px-8 text-left text-white relative z-10 flex flex-col justify-center h-full pt-16 pb-6" data-aos="fade-up">
          <div>
            {heroSubtitle && (
              <div className="mb-2">
                <div
                  className="subtitle-underline uppercase tracking-tight opacity-90 font-medium [&_a]:text-white [&_a]:no-underline [&_a]:pointer-events-none [&_*]:!bg-transparent [&_p]:!bg-transparent [&_*]:!text-white inline-block"
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
<section className="pt-10 pb-4 bg-white relative z-10">
  <div className="container mx-auto px-11">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

      {/* LEFT - Event Overview */}
      {eventOverviewData && eventOverviewData.title ? (
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
      <section className="pt-6 pb-4 bg-[#FFFDF1] border-t border-gray-100">
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
      <section className="pt-2 pb-6 bg-[#FFFDF1] border-t border-gray-100">
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


  {/* FROM INDIA TO THE WORLD - Full Width */}
{/* <section
  className="w-full overflow-hidden relative border-t border-gray-100"
  style={{ fontFamily: "'DM Sans', sans-serif", background: '#faf9f6' }}
>
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

    .fw-card {
      background: #fff;
      border: 1px solid #e8e2d9;
      border-left: 3px solid #d26019;
      border-radius: 4px;
      padding: 20px 18px 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
      overflow: hidden;
      transition: box-shadow 0.22s, border-color 0.22s;
    }
    .fw-card:hover {
      box-shadow: 0 6px 28px rgba(210,96,25,0.10);
      border-color: #d26019;
    }
  `}</style>


  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#d26019 25%,#d4a843 60%,transparent)' }} />


  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
    <svg width="100%" height="100%" viewBox="0 0 1400 420" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.04" fill="#d26019">
        {[80,180,280,380].map(cy => [80,200,320,440,560,680,800,920,1040,1160,1280].map(cx => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={cx < 500 ? 1.2 : 0.8} />
        )))}
      </g>
      <g stroke="#d26019" strokeWidth="0.5" opacity="0.06" fill="none">
        <path d="M120,360 Q400,200 700,240"/>
        <path d="M700,240 Q1000,280 1280,220"/>
      </g>
      <circle cx="700" cy="240" r="16" fill="none" stroke="#d4a843" strokeWidth="0.8" opacity="0.15"/>
      <circle cx="700" cy="240" r="5" fill="#d4a843" opacity="0.18"/>
    </svg>
  </div>


  <div className="relative z-10 w-full" style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 64px', padding: '56px 64px' }}>


    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span style={{ width: 28, height: 1.5, background: '#d26019', flexShrink: 0, display: 'inline-block' }} />
        <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '2.8px', textTransform: 'uppercase', color: '#d26019' }}>From India to the World</span>
      </div>

      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.18, marginBottom: 6 }}>
        From a National Expo<br />
        to a <span style={{ color: '#d26019' }}>Global Platform</span>
      </h2>

      <div style={{ width: 28, height: 1.5, background: '#d4a843', margin: '14px 0 16px' }} />
      <p style={{ fontSize: 12.5, lineHeight: 1.85, color: '#555', fontWeight: 300, marginBottom: 22 }}>
        The 9th Edition – Global Edition marks a strategic evolution of IHWE, designed to attract:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          'International Exhibitors & Global Brands',
          'Buyers, Distributors & Importers',
          'Hospitals & Healthcare Institutions',
          'Investors, Startups & Innovators',
          'Government Bodies, Embassies & Policymakers',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#d26019', flexShrink: 0, display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 400, color: '#222', lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>

  
    <div style={{ background: 'linear-gradient(180deg,transparent,rgba(210,96,25,0.13) 30%,rgba(210,96,25,0.13) 70%,transparent)' }} />


    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span style={{ width: 28, height: 1.5, background: '#d26019', flexShrink: 0, display: 'inline-block' }} />
        <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '2.8px', textTransform: 'uppercase', color: '#d26019' }}>Four Pillars of Growth</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          {
            num: '01', label: 'Global Exhibitors', sub: 'Showcase to a worldwide audience',
            icon: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"/></>
          },
          {
            num: '02', label: 'International Buyers', sub: 'Connect with decision makers',
            icon: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>
          },
          {
            num: '03', label: 'Policy & Knowledge', sub: 'Dialogue, insights & roadmaps',
            icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>
          },
          {
            num: '04', label: 'Investment & Innovation', sub: 'Growth & collaboration',
            icon: <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/><path d="M2 20h20"/></>
          },
        ].map((card, i) => (
          <div key={i} className="fw-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 36, height: 36, borderRadius: 6, background: '#fef7ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#d26019" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">{card.icon}</svg>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: 'rgba(210,96,25,0.18)', lineHeight: 1 }}>{card.num}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#1a1a1a', letterSpacing: '0.2px', lineHeight: 1.3 }}>{card.label}</div>
            <div style={{ fontSize: 11.5, color: '#888', fontWeight: 300, lineHeight: 1.45, marginTop: -4 }}>{card.sub}</div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section> */}

      {/* ONE PLATFORM. FOUR POWERFUL PILLARS. */}
      <section className="pt-4 pb-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-8 lg:px-12 max-w-7xl">
          
          <div className="text-center mb-2">
            <h2 className="font-bold text-[18px] text-[#1e3a8a] uppercase tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif" }}>
              ONE PLATFORM. FOUR POWERFUL PILLARS.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                title: ["INTERNATIONAL", "EXHIBITION"],
                themeColor: "#1e40af",
                desc: "Spanning 40,000+ sq ft across three halls, featuring 200+ exhibitors from 8 key sectors including Medical, AYUSH, Wellness, and Digital Health. Witness live demos, finalize deals, and explore global innovations in dedicated country pavilions for specialized high-level networking and business growth.",
                icon: <Globe className="w-5 h-5 text-white" />,
                img: InternationalImg,
              },
              {
                title: ["CONFERENCE &", "KNOWLEDGE SUMMIT"],
                themeColor: "#16a34a",
                desc: "The 18th Edition, Arogya Sangoshthi, offers 30+ insightful sessions over 3 days, with 150+ distinguished speakers including government officials and industry CEOs. Explore critical discussions across 6 thematic tracks, attracting 2,000+ delegates for knowledge exchange and policy dialogue.",
                icon: <GraduationCap className="w-5 h-5 text-white" />,
                img: ConferenceImg,
              },
              {
                title: ["GLOBAL EXCELLENCE", "AWARDS"],
                themeColor: "#d97706",
                desc: "Our prestigious 3rd Edition program, a formal evening ceremony on Day 2, recognizes ground breaking achievements and fosters brand authority. Categories include Best Healthcare Innovation, Excellence in AYUSH, and Wellness Entrepreneur of the Year, acknowledging pioneering start ups and influential industry leaders",
                icon: <Trophy className="w-5 h-5 text-white" />,
                img: AwardImg,
              },
              {
                title: ["B2B BUYER-SELLER", "MEET"],
                themeColor: "#7c3aed",
                desc: "Designed to forge powerful partnerships and drive global commerce, this pillar facilitates pre-scheduled 1-on-1 meetings within dedicated business lounges. We host international buyer delegations from key markets, offering professional matchmaking services with a target of 500+ impactful B2B meetings.",
                icon: <Handshake className="w-5 h-5 text-white" />,
                img: B2BImg,
              },
            ].map((pillar, i) => (
              <div key={i} 
                className="bg-white border-[1.5px] rounded-[1.25rem] flex flex-col group transition-all duration-300 hover:shadow-xl relative"
                style={{ borderColor: `${pillar.themeColor}55` }}>
                
                {/* Image Area - Minimized gap from border */}
                <div className="p-[4px]">
                  <div className="relative h-[160px] overflow-hidden rounded-[1rem]">
                    <img src={pillar.img} alt={pillar.title.join(" ")} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </div>

                {/* Overlapping Icon - Adjusted top to account for minimized padding */}
                <div className="absolute top-[137px] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-[3px] border-white flex items-center justify-center shadow-md z-30 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: pillar.themeColor }}>
                  {pillar.icon}
                </div>

                {/* Content Area */}
                <div className="pt-6 pb-5 px-5 text-center flex flex-col flex-1">
                  <h3 className="font-extrabold text-[13px] leading-[1.3] uppercase tracking-wide mb-4 flex flex-col items-center justify-center"
                    style={{ color: pillar.themeColor, fontFamily: "'Inter', sans-serif" }}>
                    <span>{pillar.title[0]}</span>
                    <span>{pillar.title[1]}</span>
                  </h3>
                  <p className="text-gray-600 text-[11px] leading-relaxed font-medium text-justify"
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
      <section className="pt-4 pb-4 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* LEFT - Venue Image - NO border radius */}
            <div className="relative overflow-hidden group">
              <img
                src={PragatiMaidanImg}
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
                Why Pragati Maidan, New Delhi?
              </h2>
              <div className="w-9 h-[2px] bg-[#d26019] my-5" />

              {/* Bullet Points - Circle style like image 2 */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  {
                    color: "#d26019", bg: "#fff3eb",
                    text: "India's premier international exhibition & convention venue with world-class facilities",
                    icon: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>
                  },
                  {
                    color: "#23471d", bg: "#edf7ed",
                    text: "Excellent connectivity via dedicated Metro, International Airport & Central Delhi hubs",
                    icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>
                  },
                  {
                    color: "#d26019", bg: "#fff3eb",
                    text: "State-of-the-art infrastructure featuring modern air-conditioned exhibition hall space",
                    icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>
                  },
                  {
                    color: "#23471d", bg: "#edf7ed",
                    text: "Preferred global destination for high-profile trade fairs, congresses & mega exhibitions",
                    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>
                  },
                  {
                    color: "#d26019", bg: "#fff3eb",
                    text: "Strategically located close to key government ministries, foreign embassies & institutions",
                    icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>
                  },
                  {
                    color: "#23471d", bg: "#edf7ed",
                    text: "A perfect business-centric environment designed for global networking & deal-making",
                    icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
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
                      className="text-[#2a2a2a] text-[12.5px] leading-[1.6] font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
        </div>
      </section>

      <section className="py-6 bg-[#23471d] relative overflow-hidden border-t border-white/5">
  {/* Particle Canvas */}
  <canvas
    ref={canvasRef}
    className="pointer-events-none absolute inset-0 opacity-50"
  />

  <div className="container mx-auto px-6 relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-start gap-10 lg:gap-40">
      {/* Text Side */}
      <div className="text-center lg:text-left max-w-2xl" data-aos="fade-right">
        <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-1.5">
          <div className="h-[1.5px] w-6 bg-[#F3B71B]" />
          <span className="text-[#F3B71B] font-bold text-[10px] uppercase tracking-[0.25em]">
            Ignite Your Growth
          </span>
        </div>
        <h3
          className="text-white font-extrabold text-2xl md:text-3xl mb-1 leading-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Be Part of India's Global Wellness Movement
        </h3>
        <p className="text-white/70 font-medium text-[12px] max-w-xl">
          Exhibit. Connect. Collaborate. Grow. Join healthcare leaders in building the future of wellness.
        </p>
      </div>

      {/* Buttons Side: 2x2 Grid */}
      <div
        className="grid grid-cols-2 gap-4 w-full lg:w-auto"
        data-aos="fade-left"
      >
        {[
          { label: "BOOK YOUR STALL", link: "/book-a-stand", style: "gold" },
          { label: "REGISTER AS BUYER", link: "/buyer-registration", style: "white" },
          { label: "REGISTER AS DELEGATE", link: "/contact", style: "white" },
          { label: "REGISTER AS VISITOR", link: "/contact", style: "white" },
        ].map((btn, i) => (
          <Link
            key={i}
            to={btn.link}
            className={`px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] transition-all duration-300 rounded-lg shadow-lg hover:-translate-y-1 active:translate-y-0 text-center flex items-center justify-center min-w-[150px]
              ${btn.style === "gold" ? "bg-[#F3B71B] text-[#1a3516] hover:bg-white" : ""}
              ${btn.style === "white" ? "bg-white text-[#23471d] hover:bg-[#F3B71B]" : ""}
            `}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {btn.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>


 {/* THE SCALE. THE IMPACT. */}
          <div className="mt-1 border-t border-gray-100 pt-6">
            <p className="flex items-center justify-center gap-3 text-[#d26019] font-extrabold text-[15px] uppercase tracking-[0.28em] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="inline-block w-8 h-[1.5px] bg-[#d26019] " />
              The Scale. The Impact.
              <span className="inline-block w-8 h-[1.5px] bg-[#d26019]" />
            </p>
            <div className="bg-[#f0f9f1] py-2 px-5 rounded-2xl border border-[#23471d15]">
              <VenueStats />
            </div>
          </div>
    
 

      {/* WHY ATTEND SECTION */}
      {/* <WhyAttend /> */}



      {/* <StatsCounter /> */}



      {/* WHO SHOULD ATTEND */}
      {/* <WhoShouldAttend /> */}
      {/* <OrganizedBy /> */}

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
