"use client";

import {
  Users,
  Lightbulb,
  BarChart3,
  Handshake,
  Globe,
} from "lucide-react";
import heighlights from  "../../../assets/day/highlights.jpg"

const features = [
  {
    icon: Users,
    title: "Network",
    description: "with global experts & industry leaders",
  },
  {
    icon: Lightbulb,
    title: "Discover",
    description: "the latest innovations in healthcare",
  },
  {
    icon: BarChart3,
    title: "Gain Insights",
    description: "from world-class sessions",
  },
  {
    icon: Handshake,
    title: "Explore",
    description: "business & collaboration opportunities",
  },
  {
    icon: Globe,
    title: "Be a Part",
    description: "of the future of healthcare",
  },
];

export default function HealthcareHighlights() {
  return (
    <div className="container mx-auto px-6 max-w-[1320px] py-4">
      <div
        className="
          relative overflow-hidden rounded-2xl py-4
        "
      >
        <img src={heighlights} alt="high lights bg"  className="absolute inset-0 w-full h-full"/>
        {/* subtle glow */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]" /> */}

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  flex items-center gap-3
                  px-5 py-4
                  transition-all duration-300
                  hover:bg-white/[0.05]
                "
              >
                <div
                  className="
                    flex h-11 w-11 shrink-0 items-center justify-center
                    rounded-full
                    border border-white/15
                    bg-white/5
                    backdrop-blur-sm
                  "
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white leading-none">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[11px] leading-[1.35] text-white/90">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* decorative circles like the design */}
        {/* <div className="absolute -right-8 -bottom-10 h-32 w-32 rounded-full border border-white/10" />
        <div className="absolute right-6 bottom-3 h-16 w-16 rounded-full border border-white/10" />
        <div className="absolute right-16 top-3 h-10 w-10 rounded-full border border-white/10" /> */}
      </div>
    </div>
  );
}