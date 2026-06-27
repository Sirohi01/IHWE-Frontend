"use client";

import {
  ChevronRight,
  Download,
  Globe,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Trophy,
} from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "Global Exposure",
    description:
      "Present your research in front of international experts and thought leaders.",
  },
  {
    icon: Lightbulb,
    title: "Knowledge Sharing",
    description:
      "Exchange ideas and innovative solutions with fellow researchers and professionals.",
  },
  {
    icon: BookOpen,
    title: "Publication Opportunity",
    description:
      "Selected papers will be considered for publication in reputed indexed journals.",
  },
  {
    icon: TrendingUp,
    title: "Career Advancement",
    description:
      "Enhance your academic profile and expand your professional network.",
  },
  {
    icon: Trophy,
    title: "Awards & Recognition",
    description:
      "Best paper presentations will be awarded with certificates and prizes.",
  },
];

export default function PaperPresentationHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="relative h-[420px] md:h-[500px] lg:h-[580px]">
        {/* Full Width Background Image */}
        <img
          src="/images/paper-presentation-banner.webp"
          alt="Paper Presentation"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Left Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-35% to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1320px] items-center px-5 sm:px-6 lg:px-0">
          <div className="max-w-[540px]">
            {/* Breadcrumb */}
            <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
              <span>Home</span>
              <span>›</span>
              <span>Paper Presentation</span>
            </div>

            {/* Title */}
            <h1 className="text-[42px] font-bold uppercase leading-[0.95] md:text-[58px] lg:text-[68px]">
              <span className="block text-[#0A1C63]">PAPER</span>
              <span className="block text-[#2F8B2E]">PRESENTATION</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[480px] text-[15px] leading-7 text-gray-600 md:text-base">
              Share your innovative research, ideas, and solutions with global
              experts and contribute to the future of healthcare.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex h-14 items-center gap-2 rounded-full bg-[#2F8B2E] px-8 text-sm font-semibold text-white transition-all hover:bg-[#267225]">
                SUBMIT YOUR PAPER
                <ChevronRight size={18} />
              </button>

              <button className="flex h-14 items-center gap-2 rounded-full border border-[#2F8B2E] bg-white px-8 text-sm font-semibold text-[#111827] transition-all hover:bg-gray-50">
                DOWNLOAD GUIDELINES
                <Download size={18} className="text-[#2F8B2E]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-20 mx-auto -mt-14 max-w-[1320px] px-5 sm:px-6 lg:px-0">
        <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x lg:grid-cols-5 lg:divide-y-0">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center px-7 py-10 text-center"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF8EE]">
                    <Icon className="text-[#2F8B2E]" size={28} />
                  </div>

                  <h3 className="text-[18px] font-semibold text-[#0A1C63]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-14" />
    </section>
  );
}