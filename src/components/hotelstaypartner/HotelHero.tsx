import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SERVER_URL } from '../../lib/api';

const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (Icons as any)[name] || Icons.Star;
  return <Icon className={className} />;
};

interface HotelHeroProps {
  hero: any;
}

const HotelHero: React.FC<HotelHeroProps> = ({ hero }) => {
  const bgImageUrl = hero?.image?.startsWith('/uploads') ? `${SERVER_URL}${hero.image}` : hero?.image;

  return (
    <>

      <section
        className="hidden md:flex relative h-[350px] bg-white bg-cover bg-top bg-no-repeat overflow-hidden flex-col"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      >

        <div className="relative z-10 mx-auto max-w-[1400px] w-full h-full px-6 md:px-12 flex flex-col justify-start pt-0 pb-10">


          <div className="flex items-start gap-4 w-full mb-0 pt-4 mt-[20px]">

            <div className="flex items-center gap-[15px]">
              <div>
                <h1 className="text-[#0B2C66] font-black text-[16px] leading-[1.1] uppercase whitespace-pre-line">
                  {hero?.title || "Health & Wellness\nExpo 2026\nGlobal Edition"}
                </h1>
                <span className="bg-[#0B2C66] text-white text-[8px] px-[6px] py-[1px] rounded font-bold mt-0.5 inline-block uppercase tracking-widest">
                  {hero?.slogan || "Global Edition"}
                </span>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] h-[70px] bg-gray-200 hidden md:block" />

            {/* Top Slogan */}
            <div className="hidden md:block">
              <p className="text-[#0B2C66] font-bold text-[20px] leading-[1.2] tracking-tight">
                {(hero?.subtitle || "Collaborate.\nConnect.\nGrow Together.")
                  .replace(/\. /g, '.\n') // Automatically add newlines after periods if typed on one line
                  .split('\n')
                  .filter((line: string) => line.trim() !== '')
                  .map((line: string, idx: number, arr: string[]) => (
                    <React.Fragment key={idx}>
                      <span className={idx === arr.length - 1 ? "text-[#4E9F3D]" : ""}>
                        {line.trim()}
                      </span>
                      {idx < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="relative flex items-end justify-between flex-1 mt-0">

            {/* ===== CENTER: OFFICIAL HOTEL PARTNER Badge ===== */}
            <div className="absolute left-[660px] -translate-x-1/2 -top-2 z-20 flex items-start justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative w-[130px] h-[130px]  flex flex-col items-center justify-center text-center "
              >
                {(hero?.badgeText || "Official\nHotel\nPartner")
                  .split('\n')
                  .map((line: string, idx: number) => (
                    <p
                      key={idx}
                      className={`text-white font-[900] uppercase tracking-tight leading-none ${idx === 0 ? 'text-[14px] mb-[4px] tracking-[2px]' : 'text-[14px] mb-[4px]'}`}
                    >
                      {line.trim()}
                    </p>
                  ))}
              </motion.div>
            </div>
            {/* Left Text: Partner Details */}
            <div className="flex flex-col items-start pt-4">
              <p className="text-[#0B2C66] font-black text-[20px] uppercase tracking-[1px] mb-0">
                {hero?.partnerTitle || "Partner with us as a"}
              </p>
              <h2 className="text-[45px] font-[1000] leading-[0.85] tracking-tighter">
                <span className="text-[#0B2C66] pb-4">{hero?.hotelPartnerLabel || "HOTEL & STAY PARTNER"}</span><br />
                <div className="mt-2"> </div>
              </h2>

              {/* Gradient Fading Divider Lines */}
              <div className="flex items-center gap-4 w-full max-w-[500px] my-1">
                <div className="h-[1.5px] flex-1 bg-gradient-to-l from-gray-300 to-transparent" />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B2C66">
                  <path d="M21 16L15 12L21 8V16ZM3 12L9 16V8L3 12Z" fill="#0B2C66" opacity="0.3" />
                  <path d="M22 12L2 12" stroke="#0B2C66" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M12 4L9 12L12 20L15 12L12 4Z" fill="#0B2C66" />
                </svg>
                <div className="h-[1.5px] flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
              </div>

              <p className="text-[#0B2C66] text-[18px] font-bold leading-[1.4] max-w-[500px] opacity-90 mt-1 whitespace-pre-line">
                {hero?.hotelPartnerDesc || "Be the preferred stay for a global community of health & wellness leaders, innovators & changemakers."}
              </p>
            </div>

            {/* Right Section: Why Partner Card */}
            <div className="pr-[10px] relative min-w-[260px] h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-[105px] left-[15px] right-0 bg-[#0B2C66]/95 backdrop-blur-md rounded-[20px] p-[24px_22px] w-[260px] shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-white/10"
              >
                <h3 className="text-white font-black text-[17px] leading-tight mb-6 uppercase tracking-tight whitespace-pre-line">
                  {hero?.whyPartnerTitle || "Why Partner With IHWE 2026?"}
                </h3>

                <div className="flex flex-col gap-4">
                  {(hero?.whyPartnerItems || []).map((item: any, i: number) => (
                    <div key={i} className="flex gap-3 items-center">
                      <div className="w-[28px] h-[28px] bg-[#4E9F3D] rounded-full flex-shrink-0 flex items-center justify-center text-white shadow-md">
                        <IconRenderer name={item.icon} className="w-[14px] h-[14px]" />
                      </div>
                      <p className="text-white font-bold text-[9.5px] leading-tight opacity-90">
                        {item.text}
                      </p>
                    </div>
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
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(11, 44, 102, 0.93), rgba(11, 44, 102, 0.98)), url(${bgImageUrl})` }}
      >
        <div className="relative z-10 w-full flex flex-col gap-6">
          {/* Top Header Row */}
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-white font-black text-[14px] leading-[1.1] uppercase whitespace-pre-line">
                {hero?.title || "Health & Wellness\nExpo 2026\nGlobal Edition"}
              </h1>
              <span className="bg-[#4E9F3D] text-white text-[7px] px-[5px] py-[0.5px] rounded font-bold mt-0.5 inline-block uppercase tracking-wider">
                {hero?.slogan || "Global Edition"}
              </span>
            </div>

            {/* Official Hotel Partner Badge - Mobile Styled */}
            <div className="border border-[#4E9F3D]/50 bg-white/10 backdrop-blur-md rounded-lg p-2 text-center flex flex-col items-center justify-center shrink-0">
              {(hero?.badgeText || "Official\nHotel\nPartner")
                .split('\n')
                .map((line: string, idx: number, arr: string[]) => (
                  <p
                    key={idx}
                    className={`font-extrabold text-[11px] leading-none uppercase tracking-tight ${idx > 0 ? 'mt-0.5' : ''} ${idx === arr.length - 1 ? 'text-[#4E9F3D]' : 'text-white'}`}
                  >
                    {line.trim()}
                  </p>
                ))}
            </div>
          </div>

          <div className="flex flex-col items-start mt-2">
            <p className="text-white/80 font-bold text-xs uppercase tracking-[1px] mb-1">
              {hero?.partnerTitle || "Partner with us as a"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight text-white uppercase">
              {hero?.hotelPartnerLabel || "HOTEL & STAY PARTNER"}
            </h2>

            <div className="h-[2px] w-24 bg-[#4E9F3D] my-3 rounded-full" />

            <p className="text-white/90 text-sm font-semibold leading-relaxed max-w-[450px] whitespace-pre-line">
              {hero?.hotelPartnerDesc || "Be the preferred stay for a global community of health & wellness leaders, innovators & changemakers."}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 mt-2 border border-white/10 shadow-lg">
            <h3 className="text-white font-black text-[16px] leading-tight mb-4 uppercase tracking-tight whitespace-pre-line">
              {hero?.whyPartnerTitle || "Why Partner With IHWE 2026?"}
            </h3>

            <div className="flex flex-col gap-3.5">
              {(hero?.whyPartnerItems || []).map((item: any, i: number) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="w-[26px] h-[26px] bg-[#4E9F3D] rounded-full flex-shrink-0 flex items-center justify-center text-white shadow-sm">
                    <IconRenderer name={item.icon} className="w-[12px] h-[12px]" />
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

export default HotelHero;