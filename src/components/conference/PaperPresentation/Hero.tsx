import paperHero from "../../../assets/day/paper_hero.png";

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
          src={paperHero}
          alt="Paper Presentation"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />

        {/* Left Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 via-35% to-transparent" />

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

      <div className="relative z-20 mt-1 px-5 sm:px-6 lg:px-14">
        <div className="overflow-hidden rounded-xl bg-[#0A1C63] shadow-lg shadow-[#0A1C63]/20">
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex flex-1 items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/5 group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 shadow-sm transition-transform group-hover:scale-110">
                    <Icon className="text-white" size={16} strokeWidth={2.5} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[12px] font-bold text-white leading-tight uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-[1.3] text-gray-300 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


    </section>
  );
}