import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import heroBgFallback from '../../assets/logistic/nisu.webp';
import { SERVER_URL } from '@/lib/api';

const formatUrl = (url: string) => {
  if (!url) return "";

  // Normalize backslashes to forward slashes for easier checking
  const normalizedUrl = url.replace(/\\/g, "/");

  if (normalizedUrl.startsWith("http://") || normalizedUrl.startsWith("https://")) return normalizedUrl;

  if (normalizedUrl.startsWith("/uploads") || normalizedUrl.startsWith("uploads/")) {
    const cleanUrl = normalizedUrl.startsWith("/") ? normalizedUrl : `/${normalizedUrl}`;
    return `${SERVER_URL}${cleanUrl}`;
  }

  if (normalizedUrl.startsWith("/")) {
    return `${SERVER_URL}${normalizedUrl}`;
  }

  return normalizedUrl;
};

const renderIcon = (iconName: string, className: string = "w-[15px] h-[15px]") => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return <IconComponent className={className} />;
};

interface LogisticHeroProps {
  data?: any;
}

const LogisticHero: React.FC<LogisticHeroProps> = ({ data }) => {
  const bgImage = data?.bgImage ? formatUrl(data.bgImage) : heroBgFallback;
  const title = data?.title || "LOGISTICS PARTNER";
  const subTitle = data?.subTitle || "Powering Smooth Connections. Delivering Success Together.\nBe the preferred logistics partner for a global platform that unites health, wellness and innovation.";
  const whyPartnerTitle = data?.whyPartnerTitle || "WHY PARTNER\nWITH IHWE 2026?";
  const whyPartnerPoints = data?.whyPartnerPoints || [
    { text: "Access 8,000+ exhibitors, buyers & decision makers", icon: "Users" },
    { text: "High visibility before, during & after the event", icon: "Megaphone" },
    { text: "Be part of a trusted global health & wellness platform", icon: "Globe" },
    { text: "Build strong partnerships & long-term relationships", icon: "Handshake" },
    { text: "Enhance brand credibility & market leadership", icon: "Award" },
  ];

  const titleParts = title.split(' ');
  const titleFirst = titleParts.slice(0, titleParts.length > 1 ? titleParts.length - 1 : 1).join(' ');
  const titleLast = titleParts.length > 1 ? titleParts[titleParts.length - 1] : '';

  return (
    <>
      {/* DESKTOP VIEW - Visible only on Desktop (>= md) */}
      <section
        className="hidden md:flex relative min-h-[350px] lg:h-[350px] bg-white bg-cover bg-top bg-no-repeat overflow-hidden flex-col pb-6 lg:pb-0"
        style={{ backgroundImage: `url("${bgImage}")` }}
      >
        <div className="relative z-10 mx-auto max-w-[1400px] w-full h-full px-4 sm:px-6 md:px-12 flex flex-col justify-start pt-0 pb-6 lg:pb-10">
          <div className="flex items-start gap-4 w-full mb-0 pt-4 mt-[20px] lg:mt-[30px]">
            <div className="flex items-center gap-[15px]">
              <div>
                <h1 className="text-[#0B2C66] font-black text-[16px] leading-[1.1] uppercase">
                  International<br />
                  <span className="text-[#4E9F3D]">Health &amp; Wellness</span><br />
                  Expo 2026
                </h1>
                <span className="bg-[#0B2C66] text-white text-[8px] px-[6px] py-[1px] rounded font-bold mt-0.5 inline-block uppercase tracking-widest">
                  Global Edition
                </span>
              </div>
            </div>

            <div className="w-[1px] h-[70px] bg-gray-200 hidden md:block" />

            <div className="hidden md:block">
              <p className="text-[#0B2C66] font-bold text-[20px] leading-[1.2] tracking-tight">
                Collaborate.<br />
                Connect.<br />
                <span className="text-[#4E9F3D]">Grow Together.</span>
              </p>
            </div>
          </div>


          <div className="relative flex flex-col lg:flex-row items-stretch lg:items-end justify-between flex-1 mt-0">


            <div className="hidden md:flex absolute left-[556px] -translate-x-1/2 top-4 z-20 items-start justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative w-[130px] h-[130px]  flex flex-col items-center justify-center text-center "
              >
                <p className="text-white font-black text-[16px] uppercase tracking-[2px] leading-none mb-[4px]">
                  Official
                </p>
                <p className="pb-1 text-white font-[900] text-[16px] leading-none uppercase tracking-tight">
                  Logistics
                </p>
                <p className="text-white font-[900] text-[16px] leading-none uppercase tracking-tight mb-[14px]">
                  Partner
                </p>

              </motion.div>
            </div>

            <div className="flex flex-col items-start pb-4">
              <p className="text-[#0B2C66] font-black text-[14px] sm:text-[18px] lg:text-[22px] uppercase tracking-[1px] mb-0">
                Partner with us as a
              </p>
              <h2 className="text-[26px] sm:text-[38px] lg:text-[46px] font-[1000] leading-[1] lg:leading-[0.8] tracking-tighter flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="text-[#0B2C66]">{titleFirst}</span>
                {titleLast && <span className="text-[#4E9F3D]">{titleLast}</span>}
              </h2>


              <div className="flex items-center gap-4 w-full max-w-[500px] my-1">
                <div className="h-[1.5px] flex-1 bg-gradient-to-l from-gray-300 to-transparent" />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B2C66">
                  <path d="M21 16L15 12L21 8V16ZM3 12L9 16V8L3 12Z" fill="#0B2C66" opacity="0.3" />
                  <path d="M22 12L2 12" stroke="#0B2C66" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M12 4L9 12L12 20L15 12L12 4Z" fill="#0B2C66" />
                </svg>
                <div className="h-[1.5px] flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
              </div>

              <p className="text-[#0B2C66] text-[12px] sm:text-[14px] font-bold leading-[1.4] max-w-[500px] opacity-90 mt-1 whitespace-pre-line">
                {subTitle}
              </p>
            </div>



            <div className="pr-[10px] relative w-full lg:w-auto lg:min-w-[260px] lg:h-full flex justify-center lg:block mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative lg:absolute lg:-top-[110px] lg:left-[15px] lg:right-0 bg-[#001D3D] backdrop-blur-md rounded-[15px] p-[14px_18px] w-full max-w-[320px] lg:w-[260px] shadow-[0_40px_80px_rgba(0,0,0,0.4)] border border-white/10"
              >
                <h3 className="text-white font-black text-[16px] leading-tight mb-1.5 uppercase tracking-tight whitespace-pre-line">
                  {whyPartnerTitle.split('\n').map((line: string, idx: number) => (
                    <React.Fragment key={idx}>
                      {idx === 1 ? <span className="text-[#4E9F3D]">{line}</span> : line}
                      {idx === 0 && <br />}
                    </React.Fragment>
                  ))}
                </h3>

                <div className="w-[35px] h-[1.5px] bg-[#4E9F3D] mb-3" />

                <div className="flex flex-col">
                  {whyPartnerPoints.map((item: any, i: number) => (
                    <React.Fragment key={i}>
                      <div className="flex gap-3 items-center group py-2">
                        <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] rounded-full flex-shrink-0 flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 border border-white/10">
                          {renderIcon(item.icon, "w-[15px] h-[15px]")}
                        </div>

                        <p className="text-white font-bold text-[9.2px] leading-tight tracking-tight">
                          {item.text}
                        </p>
                      </div>
                      {i < whyPartnerPoints.length - 1 && <div className="border-t border-dashed border-white/5 w-full" />}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE VIEW - Visible only on Mobile (< md) */}
      <section
        className="relative md:hidden bg-white bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col py-6 px-4"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(11, 44, 102, 0.93), rgba(11, 44, 102, 0.98)), url(${heroBg})` }}
      >
        <div className="relative z-10 w-full flex flex-col gap-6">
          {/* Top Header Row */}
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-white font-black text-[14px] leading-[1.1] uppercase">
                International<br />
                <span className="text-[#4E9F3D]">Health &amp; Wellness</span><br />
                Expo 2026
              </h1>
              <span className="bg-[#4E9F3D] text-white text-[7px] px-[5px] py-[0.5px] rounded font-bold mt-0.5 inline-block uppercase tracking-wider">
                Global Edition
              </span>
            </div>

            {/* Official Logistics Partner Badge - Mobile Styled */}
            <div className="border border-[#4E9F3D]/50 bg-white/10 backdrop-blur-md rounded-lg p-2 text-center flex flex-col items-center justify-center shrink-0">
              <p className="text-white font-bold text-[10px] uppercase tracking-[1px] leading-none mb-1">
                Official
              </p>
              <p className="text-white font-extrabold text-[11px] leading-none uppercase tracking-tight">
                Logistics
              </p>
              <p className="text-[#4E9F3D] font-extrabold text-[11px] leading-none uppercase tracking-tight mt-0.5">
                Partner
              </p>
            </div>
          </div>

          {/* Hero Title & Subtitle */}
          <div className="flex flex-col items-start mt-2">
            <p className="text-white/80 font-bold text-xs uppercase tracking-[1px] mb-1">
              Partner with us as a
            </p>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight text-white uppercase">
              LOGISTICS <span className="text-[#4E9F3D]">PARTNER</span>
            </h2>

            <div className="h-[2px] w-24 bg-[#4E9F3D] my-3 rounded-full" />

            <p className="text-white/90 text-sm font-semibold leading-relaxed max-w-[450px]">
              Powering Smooth Connections. Delivering Success Together.<br />
              Be the preferred logistics partner for a global platform that unites health, wellness and innovation.
            </p>
          </div>

          {/* Why Partner Card - Mobile Styled */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 mt-2 border border-white/10 shadow-lg">
            <h3 className="text-white font-black text-[16px] leading-tight mb-4 uppercase tracking-tight">
              WHY PARTNER WITH <span className="text-[#4E9F3D]">IHWE 2026?</span>
            </h3>

            <div className="flex flex-col gap-3.5">
              {[
                { text: "Access 8,000+ exhibitors, buyers & decision makers", icon: <Users /> },
                { text: "High visibility before, during & after the event", icon: <Megaphone /> },
                { text: "Be part of a trusted global health & wellness platform", icon: <Globe /> },
                { text: "Build strong partnerships & long-term relationships", icon: <Handshake /> },
                { text: "Enhance brand credibility & market leadership", icon: <Award /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="w-[26px] h-[26px] bg-[#4E9F3D] rounded-full flex-shrink-0 flex items-center justify-center text-white shadow-sm">
                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-[12px] h-[12px]" })}
                  </div>
                  <p className="text-white/90 font-bold text-[11px] sm:text-xs leading-snug">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogisticHero;
