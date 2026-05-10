import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Leaf } from "lucide-react";
import { conferenceTestimonialsApi, SERVER_URL } from "@/lib/api";
import logoImage from "../../assets/arogyasangosti.png";

const FALLBACK_TESTIMONIALS = [
  {
    feedback: "IHWE provided an unmatched platform to showcase our innovations. The quality of attendees and the networking opportunities exceeded all expectations.",
    name: "Dr. Anjali Chaudhary",
    role: "Chief Medical Officer",
    company: "Vana Tech Labs",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    feedback: "IHWE provided an unmatched platform to showcase our innovations. The quality of attendees and the networking opportunities exceeded all expectations.",
    name: "Dr. Vansh Chaudhary",
    role: "CEO",
    company: "Vana Tech Labs",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    feedback: "IHWE provided an unmatched platform to showcase our innovations. The quality of attendees and the networking opportunities exceeded all expectations.",
    name: "Dr. Nitin Kumar",
    role: "Director",
    company: "10 ka Double",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    feedback: "IHWE provided an unmatched platform to showcase our innovations. The quality of attendees and the networking opportunities exceeded all expectations.",
    name: "Dr. Rohit Kumar",
    role: "MD",
    company: "Namogange Wellness",
    image: "https://randomuser.me/api/portraits/men/4.jpg"
  }
];


const cardBackgrounds = [
  "bg-gradient-to-br from-white to-[#F0F9FF]",
  "bg-gradient-to-br from-white to-[#F0FDF4]",
  "bg-gradient-to-br from-white to-[#FFF7ED]",
  "bg-gradient-to-br from-white to-[#FEF2F2]",
  "bg-gradient-to-br from-white to-[#FAF5FF]",
  "bg-gradient-to-br from-white to-[#FFF1F5]",
  "bg-gradient-to-br from-white to-[#F5F3FF]",
  "bg-gradient-to-br from-white to-[#ECFEFF]",
];

const IndustryVoices: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await conferenceTestimonialsApi.get();
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const testimonials = data?.cards || FALLBACK_TESTIMONIALS;

  const isMarqueeEnabled = testimonials.length >= 5;

  useEffect(() => {
    if (scrollRef.current && testimonials.length > 0) {
      const measureWidths = () => {
        const scrollContainer = scrollRef.current;
        const contentContainer = scrollContainer?.querySelector(".scroll-content");

        if (contentContainer && scrollContainer) {
          const multiplier = isMarqueeEnabled ? 0.5 : 1;
          const contentWidthValue = contentContainer.scrollWidth * multiplier;
          setContentWidth(contentWidthValue);
        }
      };

      measureWidths();
      window.addEventListener("resize", measureWidths);
      return () => window.removeEventListener("resize", measureWidths);
    }
  }, [testimonials, isMarqueeEnabled]);

  const getInfiniteItems = () => {
    if (testimonials.length === 0) return [];
    if (!isMarqueeEnabled) return testimonials;
    return [...testimonials, ...testimonials];
  };

  const infiniteItems = getInfiniteItems();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="py-4 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1380px] relative left-[20px] px-6">
        <div className="relative mb-1 flex flex-col items-center">
          <h2 className="text-[28px] md:text-[30px] font-[900] uppercase tracking-tight text-center leading-tight">
            <span className="text-[#4E9F3D]">VOICES FROM</span> <span className="text-[#0B2C66]">INDUSTRY LEADERS</span>
          </h2>
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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
            className="relative w-full overflow-hidden no-scrollbar"
          >
            <motion.div
              className={`scroll-content flex gap-6 py-8 w-max ${!isMarqueeEnabled ? 'justify-center' : ''}`}
              animate={isPaused || !isMarqueeEnabled ? {} : { x: [0, -contentWidth] }}
              transition={{
                duration: 100,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {infiniteItems.map((item: any, index: number) => (
                <div
                  key={`${index}-${item.name}`}
                  className="w-[300px] flex-shrink-0"
                >
                  <div className={`h-[380px] ${cardBackgrounds[index % cardBackgrounds.length]} p-5 rounded-[24px] border border-[#E6ECF3] shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between overflow-hidden`}>
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4E9F3D] rounded-full blur-3xl"></div>
                    </div>

                    <div className="flex justify-center mb-4 relative z-10">
                      <img
                        src={item.image ? `${SERVER_URL}${item.image}` : `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${(index % 10) + 1}.jpg`}
                        alt={item.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-[#4E9F3D] p-0.5 shadow-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=4E9F3D&color=fff&rounded=true&size=120&bold=true`;
                        }}
                      />
                    </div>

                    <div className="space-y-3 relative z-10 flex-1">
                      <div className="text-[#4E9F3D]">
                        <Quote className="w-6 h-6 fill-current rotate-180" />
                      </div>
                      <p className="text-[12px] text-[#4A5568] leading-relaxed italic font-medium line-clamp-6">
                        "{item.feedback}"
                      </p>
                    </div>

                    <div className="flex items-end justify-between mt-5 pt-4 border-t border-gray-50 relative z-10">
                      <div className="flex-1">
                        <h4 className="font-bold text-[#0B2C66] text-[13px] mb-0.5">
                          — {item.name}
                        </h4>
                        <p className="text-[10px] font-semibold text-[#5F6B7A]">
                          {item.role}{item.company ? `, ${item.company}` : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

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