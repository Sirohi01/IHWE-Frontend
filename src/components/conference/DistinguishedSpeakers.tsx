import React, { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, Mic2 } from "lucide-react";

const speakers = [
// ... (same speakers array)
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
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);

  // Function to nudge the marquee
  const nudgeMarquee = (direction: "left" | "right") => {
    // We stop the current animation and nudge it
    // For a marquee, nudging is tricky, so we'll implement a 
    // smooth speed boost or a temporary pause + jump
  };

  return (
    <section className="py-4 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Header */}
        <div className="relative mb-4 text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] font-[900] text-[#0B2C66] uppercase tracking-tight">
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

        {/* Marquee with Arrows */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Arrows */}
          <button
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-[#E6ECF3] flex items-center justify-center text-[#0B2C66] hover:bg-[#4E9F3D] hover:text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-[#E6ECF3] flex items-center justify-center text-[#0B2C66] hover:bg-[#4E9F3D] hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Infinite Scroll / Marquee Container */}
          <div className="relative w-full overflow-hidden pt-4 pb-10">
            <motion.div
              className="flex gap-6 w-max cursor-grab active:cursor-grabbing"
              animate={isPaused ? {} : {
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 40,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {/* Double the speakers for seamless looping */}
              {[...speakers, ...speakers].map((speaker, index) => (
                <div
                  key={index}
                  className="w-[280px] flex-shrink-0 bg-white rounded-[24px] p-6 shadow-md border border-[#E6ECF3] hover:border-[#4E9F3D] transition-all duration-400 group flex flex-col items-center text-center"
                >
                  {/* Photo */}
                  <div className="relative w-[110px] h-[110px] mb-5">
                    <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-[#1E88E5] text-white flex items-center justify-center shadow-lg z-10 border-2 border-white">
                      <Mic2 className="w-4 h-4" />
                    </div>

                    <div className="w-full h-full rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500 border-2 border-[#F1F8EE]">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

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
                    <p className="text-[13px] font-medium text-[#1C2B3A] leading-snug line-clamp-2">
                      {speaker.topic}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Fade effects on the edges */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistinguishedSpeakers;