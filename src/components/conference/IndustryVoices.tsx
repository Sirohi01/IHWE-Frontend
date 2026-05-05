import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Leaf } from "lucide-react";

const FALLBACK_TESTIMONIALS = [
  {
    feedback: "My sincere compliments to the organizers and attendees of this monumental event honouring yoga and Ayurveda. I hope you all live a hundred years",
    name: "Padma Shri Dr. M. Wali",
    role: "CTO",
    company: "MediaTech"
  },
  {
    feedback: "The International Health and Wellness Expo was a phenomenal experience! The variety of exhibitors and sessions offered valuable insights into Ayurveda, holistic health, and wellness practices. It was truly a one-stop destination for health enthusiasts. ",
    name: "Aman Chaudhary",
    role: "CTo",
    company: "Pramod kirana Store"
  },
  {
    feedback: "Attending the International Health and Wellness Expo opened my eyes to many natural health solutions. It was inspiring to see Ayurveda and traditional medicine being celebrated alongside modern approaches. ",
    name: "Shri Acharya Ji",
    role: "COO",
    company: ""
  },
  {
    feedback: "A beautifully organized exhibition with a clear focus on enhancing India's health system. The integrated approach was the star of the event, blending Ayurveda, yoga, and modern medicine in one place.",
    name: "Dr. Sirohi",
    role: "COO",
    company: "MediaMantra"
  }
];

const IndustryVoices: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const itemWidth = clientWidth / (window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1);
      const scrollTo = direction === "left" ? scrollLeft - itemWidth : scrollLeft + itemWidth;

      if (direction === "right" && scrollLeft + clientWidth >= scrollRef.current.scrollWidth - 50) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        scroll("right");
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, scroll]);

  return (
    <section className="py-4 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1380px] relative left-[20px] px-6">
        {/* Header Section */}
        <div className="relative mb-1 flex flex-col items-center">
          <h2 className="text-[28px] md:text-[32px] font-[900] uppercase tracking-tight text-center leading-tight">
            <span className="text-[#4E9F3D]">VOICES FROM</span> <span className="text-[#0B2C66]">INDUSTRY LEADERS</span>
          </h2>

          {/* Leaf Decoration */}
          <div className="flex items-center gap-3 mt-2">
            <div className="h-[1px] w-12 bg-gray-200" />
            <Leaf className="w-5 h-5 text-[#4E9F3D] fill-current opacity-60" />
            <div className="h-[1px] w-12 bg-gray-200" />
          </div>

          <div className="absolute right-0 bottom-2 hidden lg:block">
            <a href="#" className="flex items-center gap-1 text-[11px] font-bold text-[#4E9F3D] uppercase hover:underline transition-all">
              VIEW ALL TESTIMONIALS
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Slider Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-lg text-gray-400 hover:text-[#4E9F3D] transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-lg text-gray-400 hover:text-[#4E9F3D] transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar scroll-smooth"
          >
            {FALLBACK_TESTIMONIALS.map((item, index) => (
              <div
                key={index}
                className="w-[85%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start"
              >
                <div className="h-full bg-white p-5 rounded-[24px] border border-[#E6ECF3] shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Green Quote Icon */}
                    <div className="text-[#4E9F3D]">
                      <Quote className="w-6 h-6 fill-current rotate-180" />
                    </div>
                    <p className="text-[12px] text-[#4A5568] leading-relaxed italic font-medium">
                      "{item.feedback}"
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-50">
                    <h4 className="font-bold text-[#0B2C66] text-[13px] mb-0.5">
                      — {item.name}
                    </h4>
                    <p className="text-[10px] font-semibold text-[#5F6B7A]">
                      {item.role}{item.company ? `, ${item.company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4E9F3D]" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default IndustryVoices;