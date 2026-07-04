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
  Brain,
} from "lucide-react";
import { SERVER_URL } from "@/lib/api";
import amanImage from "../../../assets/day/day1-banner.webp";

const Day1Hero: React.FC<{ data?: any, defaultImage?: string, currentDay: number }> = ({ data, defaultImage, currentDay }) => {
  const icons = [<ShieldCheck className="h-5 w-5 text-[#2F8D3A]" />, <BadgeCheck className="h-5 w-5 text-[#2F8D3A]" />, <Zap className="h-5 w-5 text-[#2F8D3A]" />, <Brain className="h-5 w-5 text-[#2F8D3A]" />]
  return (
    <>
      <section className="relative w-full overflow-visible font-sans aspect-[0.75/1] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/6.7] min-h-[380px] md:min-h-[420px] lg:min-h-[480px]">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${SERVER_URL}${data.backgroundImage || amanImage})`,
          }}
        />

        {/* Content */}
        <div className="relative md:absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-2">
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
                  {data.category || `DAY {currentDay}`}
                </span>

                <span className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-[11px] font-semibold text-gray-700">
                  <Calendar className="h-3.5 w-3.5 text-[#2F8D3A]" />
                  {data.date || '21 AUGUST 2026'}
                </span>
              </div>

              {/* Heading */}
              <h1 className="leading-none">
                <span className="block text-[40px] font-extrabold text-[#0B2C66] sm:text-[46px]" dangerouslySetInnerHTML={{ __html: data.title || `HEALTHCARE` }}></span>

                <span className="block text-[40px] font-extrabold text-[#2F8D3A] sm:text-[46px]">
                  {data.subtitle || 'INNOVATION SUMMIT'}
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-[420px] text-sm leading-5 font-semibold">
                {data.description || `Advancing technology, infrastructure & innovation for future-ready
            healthcare systems.`}
              </p>

              {/* Features */}
              <div className="mt-4 md:mt-8 flex flex-wrap gap-x-4 gap-y-4">
                {data.stats ? data.stats?.map((feature: any, index: number) => (
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
                  : (
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
                  )}
              </div>

            </div>
          </div>
        </div>
        {/* Bottom Stats */}

      </section>
      <div className="mt-1 z-20 px-6 lg:px-2">
        <div className="w-full lg:px-12">
          <div className="overflow-hidden rounded-xl bg-[#072B67] shadow-2xl border border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
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
                    className="flex items-center gap-1.5 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 border-white/10
  [&:not(:nth-child(2n))]:border-r sm:[&:not(:nth-child(2n))]:border-r-0 sm:[&:not(:nth-child(3n))]:border-r
  md:[&:not(:nth-child(3n))]:border-r-0 md:[&:not(:last-child)]:border-r"
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-lime-400 flex-shrink-0" />

                    <div>
                      <p className="text-[11px] sm:text-[13px] md:text-[14px] font-bold text-white leading-none">
                        {item.value}
                      </p>

                      <p className="text-[7px] sm:text-[8px] mt-2 uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold text-white/70 leading-tight">
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
    </>
  );
};

export default Day1Hero;