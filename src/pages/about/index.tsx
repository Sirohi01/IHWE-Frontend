import React, { useRef, useEffect, useState } from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import { cloneElement } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Globe, HeartPulse, Sprout, User, MonitorDot, Plane, Leaf, GraduationCap, Trophy, Handshake, CheckCircle2, Users, Landmark, TrendingUp, Award } from "lucide-react";
import StatsCounter from "@/components/home/StatsCounter";
import ExhibitorLogos from "@/components/home/ExhibitorLogos";
import FAQSection from "@/components/home/FAQSection";
import GlobalPlatform from "@/components/sections/GlobalPlatform";
import MissionVision from "@/components/sections/MissionVision";
import WhyAttend from "@/components/sections/WhyAttend";
import WhoShouldAttend from "@/components/sections/WhoShouldAttend";
import OrganizedBy from "@/components/sections/OrganizedBy";
import { heroBackgroundApi, eventOverviewApi, SERVER_URL, visionMissionApi, aboutOrganizerApi, ourJourneyApi } from "@/lib/api";

import * as LucideIcons from "lucide-react";
import PragatiMaidanImg from "@/assets/Pragati-Maidan.webp";
import InternationalImg from "@/assets/international.webp";
import ConferenceImg from "@/assets/conference.webp";
import B2BImg from "@/assets/b2b.webp";
import AwardImg from "@/assets/global.webp";
import About12 from "@/assets/about12.webp";
import LeafImg from "@/assets/leaf.webp";
import G1 from "@/assets/G1.webp";
import G2 from "@/assets/G2.webp";
import G3 from "@/assets/G3.webp";
import G4 from "@/assets/G4.webp";
import AOS from "aos";
import "aos/dist/aos.css";
import { Store } from "lucide-react";

import Sparkle from "@/components/about/Sparkle";
import EventOverview from "@/components/about/EventOverview";

import { VenueStats } from "@/components/about/AboutStats";

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
    <div className="bg-white font-inter overflow-x-hidden">
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
          50%  { opacity: 1; transform: scale(1.5) translateY(-15px); }
          100% { opacity: 0; transform: scale(0.8) translateY(-30px); }
        }
        .golden-btn-about {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.5), 0 0 20px rgba(255,200,0,0.2);
          position: relative;
          overflow: hidden;
        }
        .golden-btn-about::before {
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
        .teal-btn-about {
          background: linear-gradient(135deg, #0A7C6E 0%, #0db39e 40%, #0A7C6E 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.5), 0 0 20px rgba(10,124,110,0.3);
          position: relative;
          overflow: hidden;
        }
        .teal-btn-about::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
      `}</style>
      {/* PROFESSIONAL HERO SECTION - REPLICATING IMAGE DESIGN */}
      {/* PROFESSIONAL HERO SECTION - REPLICATING IMAGE DESIGN */}
      <section className="relative flex items-center pt-24 md:pt-12 pb-10 md:pb-6 overflow-hidden bg-white aspect-[0.75/1] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/7] min-h-[380px] md:min-h-[420px] lg:min-h-[480px]">
        
        {/* Full Width Background Image */}
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async" src={About12} 
            alt="Hero Background" 
            className="w-full h-full object-cover object-[80%] md:object-right"
          />
          {/* Enhanced Mobile Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/10 md:from-transparent md:via-transparent md:to-transparent md:bg-transparent" />
        </div>

        {/* Decorative Leaf Element */}
        <img loading="lazy" decoding="async" src={LeafImg} 
          alt="decoration" 
          className="absolute -top-10 -left-10 w-40 h-40 opacity-10 pointer-events-none rotate-45"
        />

        <div className="container mx-auto px-5 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div data-aos="fade-right" className="relative z-20 bg-white/40 md:bg-transparent backdrop-blur-[4px] md:backdrop-blur-none p-6 md:p-0 rounded-3xl md:rounded-none border border-white/50 md:border-none shadow-2xl shadow-black/5 md:shadow-none -mt-6 md:-mt-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-8 bg-[#d26019]" />
                <p 
                  className="font-extrabold text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.25em]" 
                  style={{ color: '#23471d', textShadow: '0 0 15px rgba(255,255,255,0.9)' }}
                >
                  INDIA'S LEADING GLOBAL PLATFORM FOR
                </p>
              </div>

              <h1 
                className="text-[#051c4b] font-black text-2xl md:text-3xl lg:text-[38px] leading-[1.1] mb-5 uppercase tracking-tight"
                style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}
              >
                HEALTH, WELLNESS & <br />
                <span className="block mt-2" style={{ color: '#0b471c' }}>INNOVATION</span>
              </h1>

              <div 
                className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 text-black font-extrabold text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.15em]"
                style={{ textShadow: '0 0 8px rgba(255,255,255,1)' }}
              >
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#d26019]" strokeWidth={2.5} />
                  <span>21-23 August 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#d26019]" strokeWidth={2.5} />
                  <span>Pragati Maidan, New Delhi</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="h-[2px] w-12 bg-[#d26019]" />
                <p 
                  className="font-extrabold text-[11px] md:text-sm uppercase tracking-[0.1em] md:tracking-[0.15em]" 
                  style={{ color: '#081834', textShadow: 'none' }}
                >
                  ABOUT IHWE - GLOBAL EDITION
                </p>
              </div>

              <p 
                className="text-black/80 text-[13px] md:text-sm leading-relaxed mb-2 max-w-xl font-medium"
              >
                Uniting the world's leading healthcare brands, innovators,<br className="hidden md:block" />
                and professionals to collaborate, showcase solutions,<br className="hidden md:block" />
                and shape a healthier tomorrow.
              </p>

              {/* Feature Icons Row */}
              <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-3 mb-4 mt-2 py-3 md:py-2 border-t border-gray-100">
                <div className="flex items-center gap-3 md:pr-6 md:border-r border-gray-400 last:border-r-0">
                  <img loading="lazy" decoding="async" src={G1} alt="Global Exposure" className="w-8 h-8 object-contain" />
                  <span className="font-bold text-[9px] uppercase tracking-wider leading-tight" style={{ color: '#081e4a' }}>
                    GLOBAL<br />EXPOSURE
                  </span>
                </div>
                <div className="flex items-center gap-3 md:pr-6 md:border-r border-gray-400 last:border-r-0">
                  <img loading="lazy" decoding="async" src={G2} alt="Quality Connections" className="w-8 h-8 object-contain" />
                  <span className="font-bold text-[9px] uppercase tracking-wider leading-tight" style={{ color: '#081e4a' }}>
                    QUALITY<br />CONNECTIONS
                  </span>
                </div>
                <div className="flex items-center gap-3 md:pr-6 md:border-r border-gray-400 last:border-r-0">
                  <img loading="lazy" decoding="async" src={G3} alt="Business Growth" className="w-8 h-8 object-contain" />
                  <span 
                    className="font-bold text-[9px] uppercase tracking-wider leading-tight" 
                    style={{ color: '#081e4a', textShadow: 'none' }}
                  >
                    BUSINESS<br />GROWTH
                  </span>
                </div>
                <div className="flex items-center gap-3 md:pr-6 md:border-r border-gray-400 last:border-r-0">
                  <img loading="lazy" decoding="async" src={G4} alt="Brand Visibility" className="w-8 h-8 object-contain" />
                  <span 
                    className="font-bold text-[9px] uppercase tracking-wider leading-tight" 
                    style={{ color: '#081e4a', textShadow: '1px 1px 1px rgba(0,0,0,0.1)' }}
                  >
                    BRAND<br />VISIBILITY
                  </span>
                </div>
              </div>


              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <div className="relative group/btn">
                  <div className="hidden md:block">
                    <Sparkle style={{ top: '-8px', left: '10%', animationDelay: '0s' }} />
                    <Sparkle style={{ top: '-10px', left: '40%', animationDelay: '0.4s' }} />
                    <Sparkle style={{ top: '-6px', right: '15%', animationDelay: '0.8s' }} />
                    <Sparkle style={{ bottom: '-8px', left: '25%', animationDelay: '0.2s' }} />
                    <Sparkle style={{ bottom: '-10px', right: '30%', animationDelay: '0.6s' }} />
                  </div>
                  <Link 
                    to="/book-a-stand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="golden-btn-about flex items-center gap-2 px-5 py-2 rounded-md transition-all relative z-10 hover:scale-[1.02]"
                  >
                    <Store className="w-4 h-4 text-[#050A1A]" />
                    <span className="text-[#050A1A] font-black text-[10px] uppercase tracking-wider">BOOK YOUR STALL</span>
                    <ArrowRight size={13} className="text-[#050A1A] ml-2" />
                  </Link>
                </div>
                
                <div className="relative group/btn">
                  <div className="hidden md:block">
                    <Sparkle style={{ top: '-8px', left: '10%', animationDelay: '0s' }} />
                    <Sparkle style={{ top: '-10px', left: '40%', animationDelay: '0.4s' }} />
                    <Sparkle style={{ top: '-6px', right: '15%', animationDelay: '0.8s' }} />
                    <Sparkle style={{ bottom: '-8px', left: '25%', animationDelay: '0.2s' }} />
                    <Sparkle style={{ bottom: '-10px', right: '30%', animationDelay: '0.6s' }} />
                  </div>
                  <Link 
                    to="/buyer-registration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="teal-btn-about flex items-center gap-2 px-5 py-2 rounded-md transition-all relative z-10 hover:scale-[1.02]"
                  >
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-white font-black text-[10px] uppercase tracking-wider">REGISTER AS BUYER</span>
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center ml-2">
                      <ArrowRight size={12} className="text-[#0A7C6E]" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Empty as badges removed */}
            <div className="relative hidden md:block">
            </div>

          </div>
        </div>
      </section>

      {/* STATS COUNTER BAR - OVERLAPPING */}
      <div className="relative z-20">
        <StatsCounter variant="hero" />
      </div>

      {/* EVENT OVERVIEW + KEY SECTORS */}


      {/* DYNAMIC GLOBAL PLATFORM SECTION */}
      <GlobalPlatform />

      {/* EVENT OVERVIEW + KEY SECTORS */}
      <EventOverview eventOverviewData={eventOverviewData} />


      {/* ABOUT THE ORGANIZER */}
      <section className="pt-10 pb-4 bg-[#FFFDF1] border-t border-gray-100">
        <SectionContainer>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-1">
                {(organizerData?.capabilities || [
                  "International exhibitions & trade shows",
                  "Healthcare conferences & seminars",
                  "Buyer–Seller Meets (B2B matchmaking)",
                  "Sponsorship & brand partnerships",
                  "International collaborations & delegations",
                  "Focused on delivering measurable ROI and business growth for participants."
                ]).map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-[17px] h-[17px] rounded-full bg-[#fef0e6] flex items-center justify-center shrink-0 mt-[2px]">
                      <svg viewBox="0 0 12 12" fill="none" className="w-[9px] h-[9px]">
                        <path d="M2 6l3 3 5-5" stroke="#d26019" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-900 text-[13px] leading-[1.5] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{item}</span>
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
                  <img loading="lazy" decoding="async" src={organizerData?.imageUrl ? `${SERVER_URL}${organizerData.imageUrl}` : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"}
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
        </SectionContainer>
      </section>

      {/* OUR JOURNEY & FLAGSHIP EVENTS */}
      <section className="pt-2 pb-6 bg-[#FFFDF1] border-t border-gray-100">
        <SectionContainer>

          {/* Header */}
          <div className="mb-5">
            <p className="flex items-center gap-2 text-[#d26019] font-semibold text-[11px] uppercase tracking-[0.22em] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="inline-block w-6 h-[1.5px] bg-[#d26019]" />
              {journeyData?.subtitle || "Our Journey & Flagship Events"}
            </p>
            <h2 className="text-[#23471d] font-black text-2xl leading-[1.3] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              {journeyData?.mainTitle || "A Legacy of Growth & Innovation"}
            </h2>
            <p className="text-gray-900 text-[13px] leading-[1.7] mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
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
        </SectionContainer>
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
      <section className="pt-4 pb-8 bg-white border-t border-gray-100">
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
                    <img loading="lazy" decoding="async" src={pillar.img} alt={pillar.title.join(" ")} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </div>

                {/* Overlapping Icon - Adjusted top to account for minimized padding */}
                <div className="absolute top-[137px] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-[3px] border-white flex items-center justify-center shadow-md z-30 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: pillar.themeColor }}>
                  {pillar.icon}
                </div>

                {/* Content Area */}
                <div className="pt-6 pb-3 px-5 text-center flex flex-col flex-1">
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
      <section className="pt-4 pb-8 bg-white border-t border-gray-100">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* LEFT - Venue Image - NO border radius */}
            <div className="relative overflow-hidden group">
              <img loading="lazy" decoding="async" src={PragatiMaidanImg}
                alt="Pragati Maidan, New Delhi"
                className="w-full h-[240px] md:h-[340px] object-cover group-hover:scale-[1.04] transition-transform duration-500"
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
              <p className="flex items-center gap-2 text-[#d26019] font-bold text-[11px] md:text-[13px] uppercase tracking-[0.22em] mb-2 md:mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="inline-block w-6 h-[1.5px] bg-[#d26019]" />
                Our Venue
              </p>
              <h2 className="font-black text-[24px] md:text-[32px] text-[#23471d] leading-[1.25] mb-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                Why Pragati Maidan, New Delhi?
              </h2>

              {/* Bullet Points - Circle style like image 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-5 mt-6">
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
        </SectionContainer>
      </section>

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
      `}</style>

            <FAQSection />

      <section className="py-3 bg-[#23471d] relative overflow-hidden border-t border-white/5">
        {/* Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 opacity-50"
        />

        <SectionContainer className="relative z-10">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-4">
            {/* Text Side */}
            <div className="text-center xl:text-left max-w-2xl" data-aos="fade-right">
              <div className="flex items-center justify-center xl:justify-start gap-2.5 mb-1.5">
                <div className="h-[1.5px] w-6 bg-[#F3B71B]" />
                <span className="text-[#F3B71B] font-bold text-[9px] md:text-[10px] uppercase tracking-[0.25em]">
                  Ignite Your Growth
                </span>
              </div>
              <h3
                className="text-white font-extrabold text-lg md:text-2xl mb-1 leading-tight px-4 xl:px-0"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Be Part of India's Global Wellness Movement
              </h3>
              <p className="text-white/70 font-medium text-[10px] md:text-[11px] max-w-xl mx-auto xl:mx-0 px-4 xl:px-0">
                Exhibit. Connect. Collaborate. Grow. Join healthcare leaders in building the future of wellness.
              </p>
            </div>

            {/* Buttons Side: Grid on Mobile, Flex on Desktop */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 xl:flex xl:flex-nowrap items-center justify-center gap-2.5 w-full xl:w-auto px-4 xl:px-0"
              data-aos="fade-left"
            >
              {[
                { label: "BOOK YOUR STALL", link: "/book-a-stand", style: "gold" },
                { label: "VISITOR REGISTRATION", link: "/visitor-registration", style: "white" },
                { label: "DELEGATE REGISTER", link: "/contact", style: "white" },
                { label: "BUYER REGISTER", link: "/buyer-registration", style: "white" },
              ].map((btn, i) => (
                <div key={i} className="relative group/btn flex-1 xl:flex-none">
                  {btn.style === "gold" && (
                    <>
                      <span style={{ position: 'absolute', pointerEvents: 'none', fontSize: '10px', color: '#fff176', textShadow: '0 0 6px gold', animation: 'sparkleAnim 1.6s ease-in-out infinite', opacity: 0, zIndex: 20, top: '-6px', left: '10%', animationDelay: '0s' }} className="group-hover/btn:opacity-100 transition-opacity">✦</span>
                      <span style={{ position: 'absolute', pointerEvents: 'none', fontSize: '10px', color: '#fff176', textShadow: '0 0 6px gold', animation: 'sparkleAnim 1.6s ease-in-out infinite', opacity: 0, zIndex: 20, top: '-8px', left: '40%', animationDelay: '0.4s' }} className="group-hover/btn:opacity-100 transition-opacity">✦</span>
                      <span style={{ position: 'absolute', pointerEvents: 'none', fontSize: '10px', color: '#fff176', textShadow: '0 0 6px gold', animation: 'sparkleAnim 1.6s ease-in-out infinite', opacity: 0, zIndex: 20, top: '-5px', right: '15%', animationDelay: '0.8s' }} className="group-hover/btn:opacity-100 transition-opacity">✦</span>
                      <span style={{ position: 'absolute', pointerEvents: 'none', fontSize: '10px', color: '#fff176', textShadow: '0 0 6px gold', animation: 'sparkleAnim 1.6s ease-in-out infinite', opacity: 0, zIndex: 20, bottom: '-6px', left: '25%', animationDelay: '0.2s' }} className="group-hover/btn:opacity-100 transition-opacity">✦</span>
                    </>
                  )}
                  <Link
                    to={btn.link}
                    className={`px-2 py-2.5 text-[8.5px] font-black uppercase tracking-[0.05em] transition-all duration-300 rounded-lg shadow-lg hover:-translate-y-1 active:translate-y-0 text-center flex items-center justify-center w-full xl:min-w-[145px] relative z-10
                      ${btn.style === "gold" ? "golden-btn-footer text-[#1a3516]" : ""}
                      ${btn.style === "white" ? "bg-white text-[#23471d] hover:bg-[#F3B71B]" : ""}
                    `}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {btn.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
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
