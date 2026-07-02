import React from "react";
import {
  Download,
  Mic,
  ChevronRight,
  Users,
  Calendar,
  Globe,
  ShieldCheck,
  BadgeCheck,
  Zap,
  Sparkles,
  Users2,
} from "lucide-react";

import amanImage from "../../../assets/day/day1-banner.webp";

const Day1Hero: React.FC<{ data?: any, defaultImage?: string, currentDay: number }> = ({ data, defaultImage, currentDay }) => {
const icons =[<ShieldCheck className="h-5 w-5 text-[#2F8D3A]" />,<BadgeCheck className="h-5 w-5 text-[#2F8D3A]" />,<Zap className="h-5 w-5 text-[#2F8D3A]" />]
  return (
    <section className="relative min-h-[620px] lg:min-h-[600px] overflow-hidden font-sans">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${data.
backgroundImage || amanImage})`,
        }}
      />

      {/* Content */}
      <div className="max-w-[1320px] relative z-10 mx-auto pt-16 pl-2">
        <div className="max-w-[540px]">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-[11px] font-medium">
            <span>Home</span>
            <ChevronRight className="h-3 w-3" />
            <span>Conference</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-[#0B2C66]">Day {currentDay}</span>
          </div>

          {/* Tags */}
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-full bg-[#2F8D3A] px-4 py-2 text-[11px] font-bold text-white">
              {data.category||`DAY {currentDay}`}
            </span>

            <span className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-[11px] font-semibold text-gray-700">
              <Calendar className="h-3.5 w-3.5 text-[#2F8D3A]" />
              {data.date||'21 AUGUST 2026'}
            </span>
          </div>

          {/* Heading */}
          <h1 className="leading-none">
            <span className="block text-[40px] font-extrabold text-[#0B2C66] sm:text-[46px]">
              {data.title||`HEALTHCARE`}
            </span>

            <span className="block text-[40px] font-extrabold text-[#2F8D3A] sm:text-[46px]">
              {data.subtitle||'INNOVATION SUMMIT'}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[420px] text-sm leading-5 font-semibold">
            {data.description || `Advancing technology, infrastructure & innovation for future-ready
            healthcare systems.`}
          </p>

          {/* Features */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
            {data.stats?data.stats?.map((feature: any, index: number) => (
                  <div className="flex items-start gap-2">
             {icons[index]}
              <div>
                <p className="text-[12px] font-bold text-[#0B2C66]">
                  {feature.value}
                </p>
                <p className="text-[10px] uppercase">
                  {feature.label}
                </p>
              </div>
            </div>))
             :(
              <>  
            
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 text-[#2F8D3A]" />
              <div>
                <p className="text-[12px] font-bold text-[#0B2C66]">
                  6 POWER-PACKED
                </p>
                <p className="text-[10px] uppercase">
                  Sessions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <BadgeCheck className="h-5 w-5 text-[#2F8D3A]" />
              <div>
                <p className="text-[12px] font-bold text-[#0B2C66]">
                  WORLD-CLASS
                </p>
                <p className="text-[10px] uppercase">
                  Speakers
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Zap className="h-5 w-5 text-[#2F8D3A]" />
              <div>
                <p className="text-[12px] font-bold text-[#0B2C66]">
                  UNMATCHED
                </p>
                <p className="text-[10px] uppercase">
                  Networking
                </p>
              </div>
            </div>
              </>
             ) }
          </div>

          {/* Buttons */}
          {/* <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-full bg-[#2F8D3A] px-7 py-2 text-[12px] font-bold text-white shadow-md transition hover:bg-[#267530]">
              REGISTER FOR DAY 1
              <ChevronRight className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 rounded-full border border-[#2F8D3A] bg-white px-7 py-2 text-[12px] font-bold text-gray-800 transition hover:bg-gray-50">
              DOWNLOAD AGENDA
              <Download className="h-4 w-4 text-[#2F8D3A]" />
            </button>
          </div> */}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-6 left-0 right-0 z-10">
       <div className="mx-auto max-w-[1320px] py-4">
          <div className="overflow-hidden rounded-2xl bg-[#072B67] shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-6">
              {[
                {
                  icon: Users,
                  value: "150+",
                  label: "EXPERT SPEAKERS",
                },
                {
                  icon: Mic,
                  value: "18",
                  label: "PREMIUM SESSIONS",
                },
                {
                  icon: Calendar,
                  value: "3",
                  label: "DAYS MAJOR CONFERENCES",
                },
                  {
                  icon: Users2,
                  value: "1000+",
                  label: "Delegates",
                },
                {
                  icon: Globe,
                  value: "1,000+",
                  label: "GLOBAL BUYERS",
                },
                {
                  icon: Sparkles,
                  value: "ENDLESS",
                  label: "OPPORTUNITIES",
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 border-white/10 px-5 py-4 md:border-r"
                  >
                    <Icon className="h-6 w-6 text-lime-400" />

                    <div>
                      <p className="text-lg font-bold text-white">
                        {item.value}
                      </p>

                      <p className="text-[10px] uppercase font-semibold text-white">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Day1Hero;