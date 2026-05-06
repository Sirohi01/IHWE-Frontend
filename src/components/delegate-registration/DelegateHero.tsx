import React from "react";
import { Users, FileText, UserCheck, Globe, Calendar, MapPin } from "lucide-react";
import pragatiMaidan from "@/assets/Pragati-Maidan.jpg";

const DelegateHero: React.FC = () => {
  const stats = [
    { label: "Expert Speakers", value: "80+", icon: <UserCheck className="w-8 h-8" /> },
    { label: "Power-Packed Sessions", value: "18", icon: <FileText className="w-8 h-8" /> },
    { label: "Delegates", value: "1000+", icon: <Users className="w-8 h-8" /> },
    { label: "Countries", value: "20+", icon: <Globe className="w-8 h-8" /> },
  ];

  return (
    <section className="relative w-full h-[400px] overflow-hidden bg-[#F0F7EE]">
      {/* Background Decorative Leaves (SVG or CSS) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 bg-green-200 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 left-1/4 w-60 h-60 bg-green-100 rounded-full blur-[100px]" />
      </div>

      {/* Building Image (Right Side) */}
      <div className="absolute top-0 right-0 w-2/3 h-full">
        <img
          src={pragatiMaidan}
          alt="Conference Venue"
          className="w-full h-full object-cover object-left"
        />
        {/* Soft fade between left content and right image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0F7EE] via-[#F0F7EE]/40 to-transparent" />
      </div>

      <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center">
        {/* Left Content Area */}
        <div className="w-1/2 z-10">
          <h1 className="text-[42px] font-black text-[#143111] leading-tight mb-4 uppercase tracking-tight">
            DELEGATE REGISTRATION
          </h1>
          <p className="text-[17px] text-gray-700 font-bold leading-snug max-w-md">
            Register now and be a part of India's<br />
            largest healthcare knowledge platform.
          </p>
        </div>

        {/* Right Info Card - Exact Like Image */}
        <div className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-10 z-20">
          <div className="bg-[#143111] rounded-2xl p-7 w-[320px] shadow-2xl border border-white/5">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-[#A3E635]" />
                </div>
                <div className="text-white">
                  <h4 className="text-[16px] font-black leading-none">21 – 23 August 2026</h4>
                  <p className="text-[12px] font-bold opacity-60 mt-1.5 uppercase">Thursday – Saturday</p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/10" />

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#A3E635]" />
                </div>
                <div className="text-white">
                  <h4 className="text-[16px] font-black leading-none">Pragati Maidan,</h4>
                  <p className="text-[12px] font-bold opacity-60 mt-1.5 uppercase">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar - Exact Pill Shape Like Image */}
        <div className="absolute bottom-8 left-10 z-30 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          <div
            className="bg-white flex items-stretch py-1 pr-24 rounded-l-[0px] overflow-hidden"
            style={{ clipPath: "polygon(0% 0%, 88% 0%, 100% 100%, 0% 100%)" }}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-4 px-8 py-5 group">
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
                {/* Vertical Divider */}
                {index < stats.length - 1 && (
                  <div className="w-[1px] bg-gray-100 self-stretch my-5" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DelegateHero;
