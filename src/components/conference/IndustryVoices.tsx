import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { conferenceTestimonialsApi } from "@/lib/api";

const IndustryVoices: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await conferenceTestimonialsApi.get();
        if (res) setData(res);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // 4 cards on xl, 3 on lg, 2 on md, 1 on sm
      const itemWidth = clientWidth / (window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
      const scrollTo = direction === "left" ? scrollLeft - itemWidth : scrollLeft + itemWidth;

      if (direction === "right" && scrollLeft + clientWidth >= scrollRef.current.scrollWidth - 50) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && data?.cards?.length > 3 && !isPaused) {
      const interval = setInterval(() => {
        scroll("right");
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [loading, data?.cards?.length, isPaused, scroll]);

  if (loading) return null;
  if (!data || !data.cards || data.cards.length === 0) return null;

  const { subheading, heading, highlightText, cards } = data;
  const headingParts = heading.split(highlightText);

  return (
    <section className="py-12 bg-[#FBFDFB] overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Header Section */}
        <div className="relative mb-10 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[1px] w-12 bg-[#4E9F3D]/40" />
            <span className="text-[12px] font-bold text-[#4E9F3D] uppercase tracking-[0.4em]">
              {subheading}
            </span>
            <div className="h-[1px] w-12 bg-[#4E9F3D]/40" />
          </div>
          
          <h2 className="text-[32px] md:text-[38px] font-[900] text-[#0B2C66] uppercase tracking-tight text-center leading-tight">
            {headingParts[0]}
            <span className="text-[#1E88E5]">{highlightText}</span>
            {headingParts[1]}
          </h2>
          <div className="absolute right-0 bottom-2 hidden lg:block">
            <a href="#" className="flex items-center gap-2 text-[11px] font-black text-[#4E9F3D] uppercase tracking-[0.2em] hover:text-[#3d7e30] transition-colors">
              VIEW ALL
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Slider Container */}
        <div 
          className="relative px-2 md:px-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-1 md:-left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-lg text-gray-400 hover:text-[#4E9F3D] hover:border-[#4E9F3D] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-1 md:-right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-lg text-gray-400 hover:text-[#4E9F3D] hover:border-[#4E9F3D] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {cards.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="w-[100%] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)] flex-shrink-0 snap-start"
              >
                <div className="h-full bg-white p-6 rounded-[24px] border border-gray-50 shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
                  <div className="space-y-4">
                    {/* Green Quote Icon */}
                    <div className="text-[#4E9F3D]/20">
                       <Quote className="w-8 h-8 fill-current" />
                    </div>
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < (item.rating || 5) ? 'text-[#FFB800]' : 'text-gray-200'} fill-current`} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-[14px] md:text-[15px] text-[#4A5568] leading-relaxed italic font-medium line-clamp-5">
                      "{item.feedback}"
                    </p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-gray-50">
                    <h4 className="font-black text-[#0B2C66] text-[16px] mb-1">
                      — {item.name}
                    </h4>
                    <p className="text-[10px] font-bold text-[#4E9F3D] uppercase tracking-[0.1em]">
                      {item.role}{item.company ? `, ${item.company}` : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default IndustryVoices;