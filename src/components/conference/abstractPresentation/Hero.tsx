import paperHero from "../../../assets/day/abstract_hero.png";

import {
  Download,
  FileText,
  Users,
  UserCheck,
  BookOpen,
  Globe,
} from "lucide-react";

const benefits = [
  {
    icon: FileText,
    title: "Share Your Research",
    description: "Give a glimpse of your research and contribute to the global healthcare community.",
  },
  {
    icon: Users,
    title: "Peer Review",
    description: "All abstracts will be reviewed by our expert scientific committee.",
  },
  {
    icon: UserCheck,
    title: "Selected for Presentation",
    description: "Selected abstracts will be invited for oral or poster presentation.",
  },
  {
    icon: BookOpen,
    title: "Publication Opportunity",
    description: "Accepted abstracts will be published in the conference abstract book.",
  },
  {
    icon: Globe,
    title: "Global Recognition",
    description: "Showcase your work to an international audience of experts and leaders.",
  },
];

export default function AbstractPresentationHero() {
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
              <span>Abstract Submission</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl uppercase">
              <span className="text-[#0a1c63]">ABSTRACT</span>
              <br />
              <span className="text-[#2F8B2E]">SUBMISSION</span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-[16px] text-gray-700 md:text-[17px]">
              Submit your innovative ideas and research for consideration at the Healthcare Innovation Summit.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex h-12 items-center justify-center rounded-full bg-[#2F8B2E] px-8 text-sm font-semibold uppercase text-white transition hover:bg-green-700 shadow-md">
                SUBMIT ABSTRACT <span className="ml-2">›</span>
              </button>

              <button className="group flex h-12 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 text-sm font-semibold uppercase text-gray-700 transition hover:bg-gray-50 shadow-sm">
                DOWNLOAD GUIDELINES
                <Download
                  size={16}
                  className="text-gray-500 transition group-hover:text-gray-700"
                />
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