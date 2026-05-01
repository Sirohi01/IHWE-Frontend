// components/conference/IndustryVoices.tsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "IHWE Conference brings together the right mix of innovation, knowledge, and people who are truly committed to building a healthier world.",
    author: "Dr. B. S. Ajaikumar",
    role: "Chairman, HCG Hospitals",
  },
  {
    text: "A fantastic platform to exchange ideas, explore partnerships, and understand where the future of healthcare is headed.",
    author: "Anurag Batra",
    role: "Chairman & Editor-in-Chief, BW Businessworld",
  },
  {
    text: "IHWE sets the stage for meaningful conversations that lead to real impact in healthcare and wellness.",
    author: "Dr. Mickey Mehta",
    role: "Global Leading Holistic Health Guru",
  },
];

const IndustryVoices: React.FC = () => {
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
    <section className="py-4 bg-[#F8FCF9]">
      <div className="container mx-auto px-6 max-w-[1320px]">

        <div className="relative mb-4 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-6 bg-[#4E9F3D]" />
              <span className="text-[11px] font-bold text-[#4E9F3D] uppercase tracking-[0.2em]">
                VOICES FROM
              </span>
              <div className="h-px w-6 bg-[#4E9F3D]" />
            </div>
            <h2 className="text-[24px] font-[900] text-[#0B2C66] uppercase tracking-tight">
              INDUSTRY <span className="text-[#1E88E5]">LEADERS</span>
            </h2>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
            <a href="#" className="flex items-center gap-1 text-[11px] font-extrabold text-[#4E9F3D] uppercase tracking-wider hover:opacity-80 transition-opacity">
              VIEW ALL TESTIMONIALS
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>


        <div className="relative px-8 md:px-12">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#E6ECF3] flex items-center justify-center hover:bg-[#4E9F3D] hover:border-[#4E9F3D] transition-all shadow-md group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-[#5F6B7A] group-hover:text-white transition-colors" />
          </button>


          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#E6ECF3] flex items-center justify-center hover:bg-[#4E9F3D] hover:border-[#4E9F3D] transition-all shadow-md group"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-[#5F6B7A] group-hover:text-white transition-colors" />
          </button>


          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[280px] md:min-w-[320px] lg:min-w-[380px] flex-1 snap-start bg-white p-5 md:p-6 rounded-[24px] shadow-md border border-[#E6ECF3] relative group hover:-translate-y-2 transition-all duration-300"
              >

                <div className="absolute top-5 left-5 text-[52px] leading-none text-[#E8F5E9] font-serif group-hover:text-[#c8e6c9] transition-colors select-none">
                  "
                </div>

                <div className="relative z-10 pt-4 space-y-5">
                  {/* Star ratings */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#FFB800] fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-[13px] md:text-[14px] text-[#5F6B7A] leading-[1.65] italic">
                    "{item.text}"
                  </p>

                  <div className="border-t border-[#E6ECF3] pt-4">
                    <h4 className="font-black text-[#1a3a32] text-[14px] md:text-[15px] mb-1">
                      — {item.author}
                    </h4>
                    <p className="text-[9px] md:text-[10px] font-bold text-[#4E9F3D] uppercase tracking-widest">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dot Indicators for scroll position */}
          <div className="flex justify-center gap-3 mt-4">            {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.children[0] as HTMLElement;
                  const scrollAmount = (cardWidth.offsetWidth + 24) * i; // 24 is the gap
                  scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
                }
              }}
              className="rounded-full transition-all duration-300 w-2 h-2 bg-[#E6ECF3] hover:bg-[#4E9F3D] hover:w-5"
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryVoices;