import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SERVER_URL } from '../../lib/api';
import heroBg from '../../assets/travels/newherologo.webp';

const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (Icons as any)[name] || Icons.Star;
  return <Icon className={className} />;
};

interface TravelHeroProps {
  hero: any;
  benefits?: any;
}

const TravelHero: React.FC<TravelHeroProps> = ({ hero, benefits }) => {
  const bgImageUrl = hero?.image?.startsWith('/uploads') ? `${SERVER_URL}${hero.image}` : (hero?.image || heroBg);

  return (
    <section
      className="relative min-h-[350px] lg:h-[350px] bg-white bg-cover bg-top bg-no-repeat overflow-hidden flex flex-col pb-6 lg:pb-0"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >

      <div className="relative z-10 mx-auto max-w-[1400px] w-full h-full px-4 sm:px-6 md:px-12 flex flex-col justify-start pt-0 pb-6 lg:pb-10">

        <div className="flex items-start gap-4 w-full mb-0 pt-4 mt-[20px] lg:mt-[30px]">

          <div className="flex items-center gap-[15px]">
            <div>
              <h1 className="text-[#0B2C66] font-black text-[16px] leading-[1.1] uppercase">
                {(hero?.title || "International\nHealth & Wellness\nExpo 2026")
                  .split('\n')
                  .map((line: string, i: number) => (
                    <React.Fragment key={i}>
                      {i === 1 ? (
                        <span className="text-[#4E9F3D]">{line}</span>
                      ) : (
                        line
                      )}
                      {i < 2 && <br />}
                    </React.Fragment>
                  ))}
              </h1>
              <span className="bg-[#0B2C66] text-white text-[8px] px-[6px] py-[1px] rounded font-bold mt-0.5 inline-block uppercase tracking-widest">
                {hero?.slogan || "Global Edition"}
              </span>
            </div>
          </div>

          <div className="w-[1px] h-[70px] bg-gray-200 hidden md:block" />

          <div className="hidden md:block">
            <p className="text-[#0B2C66] font-bold text-[20px] leading-[1.2] tracking-tight">
              {(hero?.subtitle || "Collaborate.\nConnect.\nGrow Together.")
                .split('\n')
                .map((line: string, i: number) => (
                  <React.Fragment key={i}>
                    {i === 2 ? (
                      <span className="text-[#4E9F3D]">{line}</span>
                    ) : (
                      line
                    )}
                    {i < 2 && <br />}
                  </React.Fragment>
                ))}
            </p>
          </div>
        </div>

        <div className="relative flex flex-col lg:flex-row items-stretch lg:items-end justify-between flex-1 mt-0">

          <div className="hidden md:flex absolute left-[596px] -translate-x-1/2 top-0 z-20 items-start justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-[130px] h-[130px]  flex flex-col items-center justify-center text-center "
            >
              <p className="text-white font-black text-[20px] uppercase tracking-[2px] leading-none mb-[4px]">
                {(hero?.badgeText || "Official\nTravel\nPartner").split('\n')[0] || "Official"}
              </p>
              <p className="pb-1 text-white font-[900] text-[21px] leading-none uppercase tracking-tight">
                {(hero?.badgeText || "Official\nTravel\nPartner").split('\n')[1] || "Travel"}
              </p>
              <p className="text-white font-[900] text-[21px] leading-none uppercase tracking-tight mb-[14px]">
                {(hero?.badgeText || "Official\nTravel\nPartner").split('\n')[2] || "Partner"}
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col items-start pb-4">
            <p className="text-[#0B2C66] font-black text-[14px] sm:text-[18px] lg:text-[22px] uppercase tracking-[1px] mb-0">
              {hero?.partnerTitle || "Partner with us as a"}
            </p>
            <h2 className="text-[26px] sm:text-[38px] lg:text-[52px] font-[1000] leading-[1] lg:leading-[0.8] tracking-tighter flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-[#0B2C66]">
                {(hero?.travelPartnerLabel || "TRAVEL PARTNER").split(' ')[0] || "TRAVEL"}
              </span>
              <span className="text-[#4E9F3D]">
                {(hero?.travelPartnerLabel || "TRAVEL PARTNER").split(' ')[1] || "PARTNER"}
              </span>
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

            <p className="text-[#0B2C66] text-[13px] sm:text-[16px] lg:text-[18px] font-bold leading-[1.4] max-w-[500px] opacity-90 mt-1 whitespace-pre-line">
              {hero?.travelPartnerDesc || "Be the preferred travel partner for a global community\nof health & wellness leaders, innovators & changemakers."}
            </p>
          </div>

          <div className="pr-[10px] relative w-full lg:w-auto lg:min-w-[260px] lg:h-full flex justify-center lg:block mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative lg:absolute lg:-top-[105px] lg:left-[15px] lg:right-0 bg-[#0B2C66]/95 backdrop-blur-md rounded-[20px] p-[24px_22px] w-full max-w-[320px] lg:w-[260px] shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-white/10"
            >
              <h3 className="text-white font-black text-[17px] leading-tight mb-6 uppercase tracking-tight">
                Why Partner<br />
                With <span className="text-[#4E9F3D]">IHWE 2026?</span>
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
  );
};

export default TravelHero;