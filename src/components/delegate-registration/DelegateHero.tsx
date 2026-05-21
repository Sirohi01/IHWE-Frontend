import React from "react";
import { Users, FileText, UserCheck, Globe, Calendar, MapPin } from "lucide-react";
import delegateBg from "@/assets/deligateimage/uoi.png";
const DelegateHero: React.FC = () => {
  const stats = [
    { label: "Expert Speakers", value: "150+", icon: <UserCheck className="w-8 h-8" /> },
    { label: "Power-Packed Sessions", value: "18", icon: <FileText className="w-8 h-8" /> },
    { label: "Delegates", value: "1000+", icon: <Users className="w-8 h-8" /> },
    { label: "Global Buyers", value: "1000+", icon: <Globe className="w-8 h-8" /> },
  ];

  return (
    <section className="relative w-full h-auto md:h-[300px] overflow-hidden bg-[#F0F7EE] py-8 md:py-0">

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 bg-green-200 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 left-1/4 w-60 h-60 bg-green-100 rounded-full blur-[100px]" />
      </div>


      <div className="absolute top-0 right-0 w-2/3 h-full hidden md:block">
        <img
          src={delegateBg}
          alt="Conference Venue"
          className="w-full h-full object-inherit object-left"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#F0F7EE] via-[#F0F7EE]/10 to-transparent" />
      </div>

      <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-0">

        <div className="w-full md:w-1/2 z-10 text-center md:text-left md:-mt-10">
          <h1 className="text-[28px] sm:text-[36px] md:text-[42px] font-black text-[#143111] leading-tight mb-1 uppercase tracking-tight md:pl-[30px]">
            DELEGATE REGISTRATION
          </h1>
          <p className="text-[14px] sm:text-[16px] md:text-[17px] text-gray-700 font-bold leading-snug max-w-md mx-auto md:mx-0 md:pl-[30px] pl-0 md:pl-4">
            Register now and be a part of India's<br />
            largest healthcare knowledge platform.
          </p>
        </div>


        <div className="relative md:absolute md:top-1/2 md:-translate-y-1/2 md:right-6 lg:right-10 z-20 w-full max-w-[320px] md:w-[290px] mx-auto">
          <div className="bg-[#143111] rounded-[20px] p-5 sm:p-6 shadow-2xl">
            {/* Date Row */}
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-white text-left">
                <h4 className="text-[17px] font-bold leading-snug">21 – 23 August 2026</h4>
                <p className="text-[13px] font-medium text-white/70">Thursday – Saturday</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full bg-white/15 my-4" />

            {/* Venue Row */}
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-white text-left">
                <h4 className="text-[17px] font-bold leading-snug">Pragati Maidan,</h4>
                <p className="text-[13px] font-medium text-white/70">New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full md:absolute md:bottom-[30px] md:left-9 z-30 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex justify-center md:justify-start">
          {/* Desktop Stats (With Clip Path) */}
          <div
            className="hidden md:flex items-stretch pr-10 rounded-l-[0px] overflow-hidden bg-white/90"
            style={{ clipPath: "polygon(0% 0%, 88% 0%, 100% 100%, 0% 100%)" }}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-4 px-8 py-4 group">
                  <div className="text-[#143111] opacity-70">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-[22px] font-black text-[#143111] leading-none mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-black text-gray-400 uppercase tracking-tight whitespace-nowrap">
                      {stat.label}
                    </div>
                  </div>
                </div>

                {index < stats.length - 1 && (
                  <div className="w-[1px] bg-gray-100 self-stretch my-5" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Stats (No Clip Path, 2-Column Grid) */}
          <div className="grid grid-cols-2 md:hidden gap-3 p-4 bg-white/90 rounded-2xl w-full max-w-[340px] mx-auto border border-gray-100">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3 py-1 px-2">
                <div className="text-[#143111] opacity-70 shrink-0 scale-90">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-[18px] font-black text-[#143111] leading-none mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-tight leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DelegateHero;
