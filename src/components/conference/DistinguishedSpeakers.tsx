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
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-8 bg-[#4E9F3D]" />
              <span className="text-[12px] font-semibold text-[#4E9F3D] uppercase tracking-widest">
                MEET OUR DISTINGUISHED
              </span>
            </div>
            <h2 className="text-[38px] font-bold text-[#0B2C66]">
              Global <span className="text-[#4E9F3D]">Speakers</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[12px] font-semibold text-[#4E9F3D] cursor-pointer hover:underline">
              VIEW ALL SPEAKERS →
            </span>
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#E6ECF3] flex items-center justify-center hover:bg-[#F7F9FC] transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-[#5F6B7A]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-[#0B2C66] flex items-center justify-center hover:bg-[#081F4D] transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Scrollable speaker cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="min-w-[220px] snap-start bg-[#f8fcf9] rounded-[24px] p-6 border border-[#E6ECF3] hover:border-[#4E9F3D] transition-all duration-400 group flex flex-col items-center text-center"
            >
              {/* Photo */}
              <div className="relative w-[120px] h-[120px] mb-4">
                <div className="w-full h-full rounded-[18px] overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Flag */}
                <div className="absolute top-1.5 left-1.5 w-8 h-8 rounded-[8px] bg-white shadow-md flex items-center justify-center text-lg">
                  {speaker.flag}
                </div>
                {/* Mic icon */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-[8px] bg-[#4E9F3D] text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                  <Mic2 className="w-4 h-4" />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-[15px] font-black text-[#1C2B3A] mb-1 leading-tight">
                {speaker.name}
              </h3>
              <p className="text-[10px] font-black text-[#4E9F3D] uppercase tracking-wide mb-0.5">
                {speaker.role}
              </p>
              <p className="text-[11px] text-[#5F6B7A] font-semibold uppercase tracking-tight opacity-70 mb-3">
                {speaker.org}
              </p>

              {/* Topic */}
              <div className="w-full border-t border-[#E6ECF3] pt-3 mt-1">
                <p className="text-[9px] font-black text-[#aaa] uppercase tracking-widest mb-1">
                  TOPIC:
                </p>
                <p
                  className={`text-[12px] font-semibold italic leading-snug ${speaker.topicColor ? "text-[#4E9F3D]" : "text-[#1C2B3A]"
                    }`}
                >
                  {speaker.topic}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${i === 0
                  ? "w-6 h-2 bg-[#4E9F3D]"
                  : "w-2 h-2 bg-[#E6ECF3]"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DistinguishedSpeakers;