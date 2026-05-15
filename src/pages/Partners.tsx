import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Hotel, Plane, Layout, Truck, Printer, Users,
  CheckCircle2, ArrowRight, ShieldCheck, Clock, Calendar, MapPin,
  ChevronRight, Phone, Mail, Building2, Star,
  HeartHandshake, Trophy, Zap, Globe, TrendingUp
} from "lucide-react";
import { partnersApi } from "@/lib/api";
import PartnershipPopup from "@/components/popups/PartnershipPopup";

import partImage1 from "../assets/partimage1.png";
import partImage from "../assets/partimage.png";  
import part1 from "../assets/part1.png";
import part2 from "../assets/part2.png";
import part3 from "../assets/part3.png";
import part4 from "../assets/part4.png";
import tajLogo from "../assets/h1.png";
import leelaLogo from "../assets/h2.png";
import radissonLogo from "../assets/h3.png";
import hiltonLogo from "../assets/h4.png";
import part11 from "../assets/part11.webp";
import part22 from "../assets/part22.webp";
import part33 from "../assets/part33.webp";
import part44 from "../assets/part44.webp";
import part55 from "../assets/part55.webp";
import part66 from "../assets/part66.webp";
import part111 from "../assets/part111.webp";
import part1111 from "../assets/part212.png";
import log1 from "../assets/log1.png";
import log2 from "../assets/log2.png";
import log3 from "../assets/log3.png";
import log4 from "../assets/log4.png";
import log5 from "../assets/log5.png";
import log6 from "../assets/log6.png";
import who1 from "../assets/who1.png";
import who2 from "../assets/who2.png";
import who3 from "../assets/who3.png";
import who4 from "../assets/who4.png";
import who5 from "../assets/who5.png";
import stay1 from "../assets/stay1.png";
import stay2 from "../assets/stay2.png";
import stay3 from "../assets/stay3.png";
import stay4 from "../assets/stay4.png";
import stay5 from "../assets/stay5.png";


const GoldSparkle = ({ style, color = "#fff176" }: { style?: React.CSSProperties; color?: string }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '12px',
      color: color,
      textShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
      animation: 'greenSparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

const Partners = () => {
  const [partnerGroups, setPartnerGroups] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | null>(null);

  const openServicePopup = (serviceId: string) => {
    setInitialService(serviceId);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partnersData = await partnersApi.getAll();
        setPartnerGroups(partnersData);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  const serviceCards = [
    {
      id: "hotel",
      title: "HOTEL & STAY",
      icon: part11,
      desc: <>Handpicked hotels at exclusive<br />rates for exhibitors, buyers<br />and delegates.</>,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
      iconBg: "#1a1f3f",
      path: "/support/hotel-stay"
    },
    {
      id: "travel",
      title: "TRAVEL ASSISTANCE",
      icon: part22,
      desc: <>Flight bookings, airport transfers,<br />local transport and complete<br />travel arrangements.</>,
      image: part111,
      iconBg: "#141a34",
      path: "/support/travel-assistance"
    },
    {
      id: "stall",
      title: "STALL DESIGN & FABRICATION",
      icon: part33,
      desc: <>Creative stall design, fabrication<br />and installation to make your<br />brand stand out.</>,
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400",
      iconBg: "#0e7490",
      path: "/support/stall-design"
    },
    {
      id: "logistics",
      title: "LOGISTICS SUPPORT",
      icon: part44,
      desc: <>Freight forwarding, customs<br />clearance, storage and material<br />handling support.</>,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400",
      iconBg: "#7c3aed",
      path: "/support/logistics-support"
    },
    {
      id: "printing",
      title: "PRINTING & BRANDING",
      icon: part55,
      desc: <>High-quality printing, signage<br />and branding solutions for<br />maximum visibility.</>,
      image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=400",
      iconBg: "#ea580c",
      path: "/support/printing-branding"
    },
    {
      id: "hospitality",
      title: "HOSPITALITY DESK",
      icon: part66,
      desc: <>On-ground assistance for all<br />your queries to ensure a smooth<br />and pleasant experience.</>,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400",
      iconBg: "#0f766e",
      path: "/support/hospitality-desk"
    },
  ];

  const features = [
    { icon: who1, title: "EXCLUSIVE BENEFITS", desc: "Special rates and value added services for all participants." },
    { icon: who2, title: "EXPERIENCED TEAM", desc: "Professional team with years of experience in handling global events." },
    { icon: who3, title: "TIME & COST SAVING", desc: "Save time and cost with our efficient and reliable support solutions." },
    { icon: who4, title: "TRUSTED & SECURE", desc: "Verified partners and secure transactions you can rely on." },
    { icon: who5, title: "END-TO-END SUPPORT", desc: "From planning to execution, we are with you at every step of the way." },
  ];

  const vendorBenefits = [
    { label: "Direct Access to Global Clients", icon: <Users className="w-4 h-4 text-blue-500" /> },
    { label: "Business Growth", icon: <Trophy className="w-4 h-4 text-emerald-500" /> },
    { label: "Brand Visibility", icon: <Star className="w-4 h-4 text-orange-500" /> },
    { label: "Long-term Opportunities", icon: <Clock className="w-4 h-4 text-purple-500" /> },
  ];

  const hotelLogos = [log1, log2, log3, log4, log5, log6];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden font-inter">
      <style>{`
        @keyframes greenShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes greenSweep {
          0%   { left: -75%; }
          100% { left: 150%; }
        }
        @keyframes greenSparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.3) translateY(-5px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-8px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-11px); }
        }

        .green-btn-support {
          background: linear-gradient(135deg, #74b123 0%, #a2d149 30%, #2e7d32 60%, #74b123 100%);
          background-size: 200% 200%;
          animation: greenShimmer 2.5s ease infinite;
          box-shadow: 0 0 16px 4px rgba(116,177,35,0.3), 0 4px 15px rgba(116,177,35,0.25);
          position: relative;
          overflow: hidden;
        }
        .green-btn-support::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: greenSweep 2s infinite;
        }

        .vendor-green-btn {
          background: linear-gradient(135deg, #084c17 0%, #16511e 50%, #2e7d32 100%);
          background-size: 200% auto;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .vendor-green-btn:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(8, 76, 23, 0.4);
        }
        .vendor-green-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: all 0.6s;
        }
        .vendor-green-btn:hover::before {
          left: 100%;
        }
      `}</style>


      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden bg-white pt-20 pb-10 lg:py-0">
        <div className="container mx-auto px-4 lg:pl-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">

            <div className="w-full lg:w-[45%] space-y-4 text-center lg:text-left pt-6 lg:pt-0 pb-2 lg:pb-8 lg:mt-14">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[#084c17] font-bold text-xs md:text-sm tracking-[0.18em] uppercase"
              >
                We're Here to Support You
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-[22px] sm:text-3xl md:text-5xl font-extrabold text-[#0a133c] leading-[1.2] md:leading-[1.1] tracking-tight"
              >
                SUPPORT SERVICES <br className="hidden md:block" />
                FOR{" "}
                <span className="text-[#084c17]">YOUR SUCCESS</span>
              </motion.h1>

              <div className="space-y-1">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-base md:text-lg font-medium text-[#1e2131]"
                >
                  Everything you need. All in one place.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-[3px] w-16 bg-gradient-to-r from-[#084c17] via-[#2e7d32] to-transparent rounded-full origin-center lg:origin-left mx-auto lg:mx-0"
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-900 text-sm md:text-base leading-relaxed max-w-lg font-medium mx-auto lg:mx-0"
              >
                From comfortable stays to seamless travel and perfect exhibition support – we make your IHWE Expo experience smooth, productive and stress-free.
              </motion.p>


              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 lg:flex items-center gap-y-8 gap-x-0 lg:gap-0 pt-8 lg:pt-10 max-w-[500px] mx-auto lg:mx-0"
              >
                {[
                  { label: <><span>Dedicated</span><br className="hidden md:block" /><span>Support Team</span></>, img: part1, sub: "24x7 Assistance" },
                  { label: <><span>Trusted</span><br className="hidden md:block" /><span>Network</span></>, img: part2, sub: "Verified Partners" },
                  { label: <><span>Best Rates</span><br className="hidden md:block" /><span>Guaranteed</span></>, img: part3, sub: "Exclusive Deals" },
                  { label: <><span>End-to-End</span><br className="hidden md:block" /><span>Solutions</span></>, img: part4, sub: "Hassle-free Experience" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center text-center px-2 ${i % 2 === 0 && i < 2 ? "border-r border-slate-200 lg:border-r" : ""} ${i === 1 ? "lg:border-r border-slate-200" : ""} ${i === 2 ? "lg:border-r border-slate-200" : ""} ${i % 2 !== 0 ? "lg:border-r last:border-r-0 border-slate-200" : ""}`}
                  >
                    <img src={item.img} alt="Feature" className="w-12 h-12 md:w-16 md:h-16 object-cover mb-2 transition-transform hover:scale-110" />
                    <p className="text-[10px] md:text-[12px] font-black text-[#0a133c] leading-[0.5] uppercase flex flex-col justify-center min-h-[16px]">
                      {item.label}
                    </p>
                    <p className="text-[8px] text-slate-900 font-bold uppercase tracking-tighter mt-2.5">{item.sub}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-full lg:w-1/2 relative flex justify-center lg:justify-end -mx-4 lg:mx-0"
            >
              <div className="relative w-screen lg:w-full lg:max-w-2xl">
                <img
                  src={partImage}
                  alt="IHWE Support Services"
                  className="w-full h-auto object-contain lg:scale-x-[2.0] lg:scale-y-[1.85] lg:-translate-x-72"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-10 bg-white">
        <div className="container mx-auto px-4 lg:pl-12 lg:pr-8">

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10 bg-[#0b1126]" />
              <span className="text-sm md:text-base font-extrabold text-[#0b1126] uppercase tracking-[0.28em]">Our Support Services</span>
              <div className="h-px w-10 bg-[#0b1126]" />
            </div>
            <p className="text-black text-sm leading-relaxed font-medium mb-3">
              Comprehensive support solutions designed to make your experience seamless and successful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1220px]">
            {serviceCards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.13)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="flex flex-row rounded-2xl overflow-hidden border border-slate-200 group"
                style={{
                  minHeight: '140px',
                  background: '#ffffff',
                  boxShadow: "rgba(20, 26, 52, 0.12) 0px 4px 12px, rgba(20, 26, 52, 0.08) 0px 1px 4px"
                }}
              >

                <div
                  className="flex flex-col justify-between pl-4 pr-0 py-4 flex-1 min-w-0"
                  style={{ background: '#ffffff' }}
                >

                  <div>
                    <div className="w-16 h-16  mb-3">
                      <img src={card.icon} alt={card.title} className="w-full h-full object-contain" />
                    </div>
                    <h3
                      className="text-[16px] font-extrabold tracking-tight leading-snug mb-2 uppercase"
                      style={{ color: card.iconBg }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[10.5px] text-black leading-relaxed font-medium">
                      {card.desc}
                    </p>
                  </div>

                  {/* Learn More */}
                  <button
                    onClick={() => openServicePopup(card.id)}
                    className="mt-3 flex items-center gap-1 font-extrabold text-[12px] uppercase tracking-widest transition-all hover:gap-2"
                    style={{ color: "#24660a" }}
                  >
                    Learn More <ArrowRight className="w-3 h-3" />
                  </button>
                </div>


                <div className="w-[180px] shrink-0 overflow-hidden relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div
                    className="absolute inset-y-0 left-0 w-24 pointer-events-none"
                    style={{ background: 'linear-gradient(to right, #ffffff 15%, rgba(255,255,255,0.8) 40%, transparent 100%)' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ARE YOU A SERVICE PROVIDER?
      ══════════════════════════════════════ */}
      <section className="pt-4 pb-4 bg-white">
        <div className="container mx-auto px-4 lg:pl-12 lg:pr-8">
          <div
            className="bg-[#eaf0ec] rounded-3xl overflow-hidden max-w-[1220px]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
          >
            <div className="flex flex-col lg:flex-row items-center">
              {/* Image Side */}
              <div className="w-full lg:w-[20%] p-6">
                <img
                  src={part1111}
                  alt="Vendor Network"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-[80%] p-8 lg:pl-0 flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                <div className="flex-1 space-y-4 pt-4">
                  <h2 className="text-[22px] md:text-[24px] font-black leading-tight uppercase">
                    <span className="text-[#0b1126] block whitespace-nowrap">ARE YOU A SERVICE PROVIDER?</span>
                    <span className="text-[#16511e] block whitespace-nowrap">JOIN OUR VENDOR NETWORK</span>
                  </h2>
                  <p className="text-black text-[13px] font-medium leading-relaxed max-w-md">
                    Expand your business by becoming an official vendor partner of IHWE Expo 2026 and connect with thousands of exhibitors, buyers and delegates from around the world.
                  </p>
                </div>

                <div className="flex-1 flex flex-col items-center lg:items-start gap-8 pt-4">
                  {/* Benefits Icons — single horizontal row */}
                  <div className="flex flex-row flex-wrap lg:flex-nowrap items-center gap-x-4 gap-y-4">
                    {[
                      { label: <>Direct Access<br />to Global Clients</>, icon: <Users className="w-5 h-5 text-[#2e7d32]" /> },
                      { label: <>Business<br />Growth</>, icon: <Trophy className="w-5 h-5 text-[#2e7d32]" /> },
                      { label: <>Brand<br />Visibility</>, icon: <Star className="w-5 h-5 text-[#2e7d32]" /> },
                      { label: <>Long-term<br />Opportunities</>, icon: <Clock className="w-5 h-5 text-[#2e7d32]" /> },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="shrink-0 p-1.5 bg-white rounded-full shadow-sm">
                            {item.icon}
                          </div>
                          <span className="text-[10px] font-bold text-[#0b1126] leading-tight uppercase whitespace-nowrap">
                            {item.label}
                          </span>
                        </div>
                        {i < 3 && <div className="h-8 w-px bg-slate-300" />}
                      </div>
                    ))}
                  </div>

                  {/* CTA Area */}
                  <div className="flex flex-col items-center lg:items-start gap-4 w-full">
                    <div className="relative group/btn w-full lg:max-w-[340px]">
                      {/* Gold Sparkles */}
                      <GoldSparkle style={{ top: '-10px', left: '8%', animationDelay: '0s' }} />
                      <GoldSparkle style={{ top: '-12px', left: '30%', animationDelay: '0.3s' }} />
                      <GoldSparkle style={{ top: '-10px', left: '55%', animationDelay: '0.6s' }} />
                      <GoldSparkle style={{ top: '-12px', right: '12%', animationDelay: '0.15s' }} />
                      <GoldSparkle style={{ bottom: '-10px', left: '18%', animationDelay: '0.45s' }} />
                      <GoldSparkle style={{ bottom: '-12px', left: '42%', animationDelay: '0.75s' }} />
                      <GoldSparkle style={{ bottom: '-10px', right: '20%', animationDelay: '0.2s' }} />

                      <Link 
                        to="/partner-registration" 
                        target="_blank"
                        className="vendor-green-btn flex items-center justify-center gap-3 text-white w-full py-4 rounded-xl font-black text-[13px] uppercase tracking-wider shadow-lg transition-all group"
                      >
                        <Users className="w-5 h-5" />
                        REGISTER AS A VENDOR PARTNER
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#084c17] group-hover:bg-[#2e7d32] group-hover:text-white transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </Link>
                    </div>
                    <button className="text-[#084c17] font-bold text-[11px] uppercase tracking-widest hover:underline transition-all">
                      VENDOR REGISTRATION GUIDELINES →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR HOTEL PARTNERS
      ══════════════════════════════════════ */}
      {/* <section className="pt-0 pb-4 bg-white">
        <div className="container mx-auto px-4 lg:pl-12 lg:pr-8">
          <div className="bg-[#011635] pt-2 pb-4 md:pt-3 md:pb-6 px-8 md:px-10 rounded-3xl shadow-2xl relative overflow-hidden max-w-[1220px]">
          
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-14 bg-[#2e7d32]" />
              <span className="text-[18px] font-bold text-white uppercase tracking-[0.28em]">Our Hotel Partners</span>
              <div className="h-px w-14 bg-[#2e7d32]" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-items-center">
              {hotelLogos.map((logo, i) => (
                <div key={i} className="bg-white p-2 rounded-xl shadow-md w-full h-[75px] flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                  <img
                    src={logo}
                    alt="Hotel Partner"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="inline-flex items-center gap-2 bg-[#2e7d32]/20 hover:bg-[#2e7d32] text-emerald-400 hover:text-white px-8 py-3 rounded-xl border border-emerald-500/30 font-bold text-xs uppercase tracking-widest transition-all">
                View All Hotel Partners <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* ══════════════════════════════════════
          WHY CHOOSE OUR SUPPORT SERVICES
      ══════════════════════════════════════ */}
      <section className="pt-4 pb-6 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-14 bg-[#2e7d32]" />
              <span className="text-[20px] font-bold text-[#00153c] uppercase tracking-[0.1em]">Why Choose Our Support Services</span>
              <div className="h-px w-14 bg-[#2e7d32]" />
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-4 max-w-[1250px] mx-auto">
            {features.map((f, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-4 px-2 flex-1 min-w-[200px]">
                  <div className="w-16 h-16 flex items-center justify-center shrink-0">
                    <img src={f.icon} alt={f.title} className="object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[11px] font-black text-[#00153c] tracking-tight uppercase leading-tight mb-1">{f.title}</h4>
                    <p className="text-[9px] text-slate-800 font-bold leading-relaxed">{f.desc}</p>
                  </div>
                </div>
                {i < features.length - 1 && (
                  <div className="hidden lg:block w-px h-12 border-l border-dashed border-slate-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-8 mb-6">
        <div className="bg-[#001c27] rounded-[2rem] md:rounded-full pt-8 pb-6 md:pt-8 md:pb-6 md:px-14 relative overflow-hidden shadow-2xl border-b-4 border-[#2e7d32]/30">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 relative z-10">

            {/* Left: Text */}
            <div className="text-center lg:text-left w-full lg:w-auto px-2 lg:px-0">
              <h2 className="text-[16px] md:text-[26px] font-black text-white leading-[1.2] md:leading-[1.1]">
                YOU FOCUS ON <span className="text-[#74b123]">GROWTH.</span>
                <br className="hidden md:block" /><span className="whitespace-nowrap">WE TAKE CARE OF THE REST.</span>
              </h2>
              <p className="text-white/80 text-[11px] md:text-[14px] font-bold max-w-[340px] mt-2.5 mx-auto lg:mx-0 leading-relaxed">
                Let our support services make your IHWE Expo 2026 experience seamless and successful.
              </p>
            </div>

            {/* Middle: Icons with Dividers */}
            <div className="flex items-center justify-center w-full lg:w-auto overflow-x-auto no-scrollbar py-4 px-2">
              {[
                { label: "STAY", icon: stay1 },
                { label: "TRAVEL", icon: stay2 },
                { label: "EXHIBIT", icon: stay3 },
                { label: "CONNECT", icon: stay4 },
                { icon: stay5, label: "GROW" },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center gap-1.5 px-4 md:px-8 text-white/90 min-w-[70px] md:min-w-[100px] shrink-0">
                    <div className="text-white/80">
                      <img src={item.icon} alt={item.label} className="w-8 md:w-12 h-auto object-contain" />
                    </div>
                    <span className="text-[9px] md:text-[12px] font-black uppercase tracking-tight">{item.label}</span>
                  </div>
                  {i < 4 && <div className="h-10 md:h-16 w-[1.5px] bg-[#74b123] shrink-0 opacity-50" />}
                </React.Fragment>
              ))}
            </div>

            {/* Right: CTA & Contact */}
            <div className="flex flex-col items-center lg:items-start gap-4 shrink-0 w-full lg:w-auto">
              <div className="relative group/btn w-full max-w-[280px] lg:w-auto">
                {/* Gold Sparkles */}
                <GoldSparkle style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
                <GoldSparkle style={{ top: '-12px', left: '40%', animationDelay: '0.4s' }} />
                <GoldSparkle style={{ top: '-8px', right: '15%', animationDelay: '0.8s' }} />
                <GoldSparkle style={{ bottom: '-10px', left: '25%', animationDelay: '0.2s' }} />
                <GoldSparkle style={{ bottom: '-12px', right: '30%', animationDelay: '0.6s' }} />

                <Link to="/contact" className="w-full lg:w-auto">
                  <button className="green-btn-support flex items-center gap-3 text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all group w-full lg:w-auto justify-center relative z-10 hover:scale-[1.02]">
                    Get Support Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <a href="mailto:support@ihwe.in" className="flex items-center gap-2 text-white/80 text-[11px] font-bold hover:text-[#74b123] transition-colors">
                  <Mail className="w-3.5 h-3.5" /> info@ihwe.in
                </a>
                <a href="tel:+911149588555" className="flex items-center gap-2 text-white/80 text-[13px] font-black hover:text-[#74b123] transition-colors">
                  <Phone className="w-3.5 h-3.5" /> +91 9654900525
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER INFO BAR
      ══════════════════════════════════════ */}
      {/* ── Footer Info Bar (Screenshot Match) ── */}
      <div className="bg-white border-y border-slate-300 py-6 mb-12 mt-[-1rem] relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">

            {/* 1. Date */}
            <div className="flex items-center gap-3">
              <Calendar className="w-9 h-9 text-[#2e7d32]" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-[18px] font-black text-[#00153c] leading-none">21 – 23</span>
                <span className="text-[13px] font-black text-[#2e7d32] uppercase tracking-wider">MARCH 2026</span>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200" />

            {/* 2. Location */}
            <div className="flex items-center gap-3">
              <MapPin className="w-9 h-9 text-[#2e7d32]" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-[#00153c] leading-none uppercase">Pragati Maidan,</span>
                <span className="text-[15px] font-black text-[#00153c] leading-none uppercase mt-1">New Delhi</span>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200" />

            {/* 3. Website */}
            <div className="flex items-center gap-3">
              <Globe className="w-9 h-9 text-[#2e7d32]" strokeWidth={1.5} />
              <a href="https://www.ihwe.in" target="_blank" rel="noopener noreferrer" className="text-[16px] font-black text-[#1e40af] hover:underline underline-offset-4">
                www.ihwe.in
              </a>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200" />

            {/* 4. MSME */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-[14px] font-black text-[#00153c] leading-none uppercase">Under the PMS Scheme,</span>
                <span className="text-[14px] font-black text-[#00153c] leading-none uppercase mt-1">Approved by MSME</span>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#2e7d32]/10 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[#2e7d32]" fill="#2e7d32" color="#fff" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <PartnershipPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        initialService={initialService}
      />
    </div>
  );
};

export default Partners;