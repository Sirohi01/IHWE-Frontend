// components/conference/DistinguishedSpeakers.tsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Mic2 } from "lucide-react";

const speakers = [
  {
    name: "Dr. Randal Pinkett",
    role: "Former Chief Health Officer",
    org: "Amazon",
    topic: "The Future of Digital Health",
    image:
      "https://images.unsplash.com/photo-1556157382-97dee2dcb721?auto=format&fit=crop&q=80",
    flag: "🇺🇸",
  },
  {
    name: "Dr. Maria Neira",
    role: "Director, Dept of Environment",
    org: "World Health Organization (WHO)",
    topic: "Climate Change and Global Health",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    flag: "🇺🇳",
    topicColor: true,
  },
  {
    name: "Dr. Devi Shetty",
    role: "Chairman & Founder",
    org: "Narayana Health",
    topic: "Building Affordable Healthcare Systems",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80",
    flag: "🇮🇳",
  },
  {
    name: "Prof. Mark Woolhouse",
    role: "Professor of Infectious Disease",
    org: "University of Edinburgh",
    topic: "Preparing for the Next Global Pandemic",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80",
    flag: "🇬🇧",
  },
  {
    name: "Dr. Chaiyavat Chaiyasut",
    role: "CEO",
    org: "BDMS Wellness Clinic",
    topic: "The Future of Wellness Tourism",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80",
    flag: "🇹🇭",
  },
];

const DistinguishedSpeakers: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Header */}
        <div className="relative mb-12 text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-[18px] md:text-[19px] font-bold text-[#0B2C66] uppercase tracking-tight">
              MEET OUR DISTINGUISHED <span className="text-[#1E88E5]">SPEAKERS</span>
            </h2>
            <div className="h-1 w-20 bg-[#4E9F3D] mt-2 rounded-full" />
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <a href="#" className="flex items-center gap-1 text-[11px] font-extrabold text-[#4E9F3D] uppercase tracking-wider hover:opacity-80 transition-opacity">
              VIEW ALL SPEAKERS
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Slider Container with Arrows */}
        <div className="relative px-8 md:px-12">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#E6ECF3] flex items-center justify-center hover:bg-[#4E9F3D] hover:border-[#4E9F3D] transition-all shadow-md group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-[#5F6B7A] group-hover:text-white transition-colors" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#E6ECF3] flex items-center justify-center hover:bg-[#4E9F3D] hover:border-[#4E9F3D] transition-all shadow-md group"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-[#5F6B7A] group-hover:text-white transition-colors" />
          </button>

          {/* Scrollable speaker cards */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {speakers.map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="min-w-[220px] md:min-w-[240px] snap-start bg-white rounded-[24px] p-6 shadow-sm border border-[#E6ECF3] hover:border-[#4E9F3D] transition-all duration-400 group flex flex-col items-center text-center"
              >
                {/* Photo */}
                <div className="relative w-[110px] h-[110px] mb-5">
                  {/* Mic icon - Top Left */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-[#1E88E5] text-white flex items-center justify-center shadow-lg z-10 border-2 border-white">
                    <Mic2 className="w-4 h-4" />
                  </div>

                  <div className="w-full h-full rounded-full overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-500 border-2 border-[#F1F8EE]">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Flag - Top Right */}
                  <div className="absolute top-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-[12px] border border-[#E6ECF3] z-10">
                    {speaker.flag}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-[16px] font-bold text-[#1C2B3A] mb-1.5 leading-tight">
                  {speaker.name}
                </h3>
                <div className="flex flex-col gap-0.5 mb-4">
                  <p className="text-[11px] font-medium text-[#5F6B7A] leading-tight">
                    {speaker.role}
                  </p>
                  <p className="text-[11px] font-bold text-[#1C2B3A]">
                    {speaker.org}
                  </p>
                </div>

                {/* Topic */}
                <div className="w-full border-t border-[#F1F5F9] pt-4 text-left">
                  <p className="text-[10px] font-bold text-[#8FB569] uppercase tracking-wider mb-1">
                    TOPIC:
                  </p>
                  <p className="text-[13px] font-medium text-[#1C2B3A] leading-snug">
                    {speaker.topic}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dot Indicators for scroll position */}
          <div className="flex justify-center gap-3 mt-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth = scrollRef.current.children[0] as HTMLElement;
                    const scrollAmount = (cardWidth.offsetWidth + 20) * i; // 20 is the gap
                    scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
                  }
                }}
                className="rounded-full transition-all duration-300 w-2 h-2 bg-[#E6ECF3] hover:bg-[#4E9F3D] hover:w-5"
                aria-label={`Go to speaker ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistinguishedSpeakers;