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
    <section className="relative w-full overflow-hidden bg-white">
      {/* Hero Content with Image Background */}
      <div className="relative h-[440px] w-full">
        <img
          src={pragatiMaidan}
          alt="Conference Venue"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#143111]/90 via-[#143111]/40 to-transparent" />

        {/* Content Overlay */}
        <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-[48px] font-black text-white leading-[1.1] mb-6 uppercase tracking-tight">
              DELEGATE REGISTRATION
            </h1>
            <p className="text-[18px] text-white/90 font-medium leading-relaxed max-w-xl">
              Register now and be a part of India's largest healthcare knowledge platform.
            </p>
          </div>
        </div>

        {/* Floating Stats Bar - EXACT LIKE IMAGE */}
        <div className="absolute bottom-6 left-6 lg:left-10 z-10">
          <div className="bg-white rounded-l-3xl rounded-r-lg shadow-2xl flex items-stretch p-1 overflow-hidden">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-4 px-8 py-5 group">
                  <div className="text-[#143111] opacity-80 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-[24px] font-black text-[#143111] leading-none mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[12px] font-bold text-gray-500 uppercase tracking-tight whitespace-nowrap">
                      {stat.label}
                    </div>
                  </div>
                </div>
                {/* Vertical Divider */}
                {index < stats.length - 1 && (
                  <div className="w-[1px] bg-gray-100 self-stretch my-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Info Card (Right Side) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-10 hidden xl:block">
          <div className="bg-[#143111]/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-[320px] shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#A3E635]/20 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-[#A3E635]" />
                </div>
                <div>
                  <h4 className="text-[16px] font-black text-white leading-tight">21 – 23 August 2026</h4>
                  <p className="text-[12px] font-medium text-white/60 uppercase mt-1">Thursday – Saturday</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#A3E635]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#A3E635]" />
                </div>
                <div>
                  <h4 className="text-[16px] font-black text-white leading-tight">Pragati Maidan,</h4>
                  <p className="text-[12px] font-medium text-white/60 uppercase mt-1">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DelegateHero;
