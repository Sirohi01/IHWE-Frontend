import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";

import { testimonialsApi } from "@/lib/api";

interface TestimonialCard {
  _id: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  feedback: string;
  rating: number;
}

interface TestimonialData {
  subheading: string;
  heading: string;
  highlightText: string;
  description: string;
  cards: TestimonialCard[];
}

const Testimonials = () => {
  const [data, setData] = useState<TestimonialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await testimonialsApi.get();
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

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || !data || data.cards.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 4;
        return nextIndex >= data.cards.length ? 0 : nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, data]);

  const next = () => {
    if (!data) return;
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const nextIndex = prev + 4;
      return nextIndex >= data.cards.length ? 0 : nextIndex;
    });
  };

  const prev = () => {
    if (!data) return;
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const prevIndex = prev - 4;
      return prevIndex < 0 ? Math.max(0, data.cards.length - 4) : prevIndex;
    });
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-[#d26019]">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div className="py-24 bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || !data.cards || data.cards.length === 0) return null;

  const visibleTestimonials = data.cards.slice(currentIndex, currentIndex + 4);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header - Who We Are Style */}
        <div className="flex flex-col md:items-center justify-center mb-16" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#23471d]" />
            <span className="uppercase tracking-[0.3em] text-[#23471d] font-bold text-[12px] font-inter">
              {data.subheading}
            </span>
            <div className="h-px w-8 bg-[#23471d] hidden md:block" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight md:text-center">
            {getHighlightedText(data.heading, data.highlightText)}
          </h2>
          <p className="text-slate-600 mt-6 md:text-center max-w-2xl mx-auto text-lg font-inter">
            {data.description}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {visibleTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={`${currentIndex}-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-white rounded-2xl p-6 border border-slate-300 hover:border-[#23471d]/20 transition-all duration-500 hover:shadow-2xl font-inter"
                >
                  {/* Decorative Accent */}
                  <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-2xl transition-all duration-500 ${idx % 2 === 0 ? "bg-[#23471d]/10 group-hover:bg-[#23471d]" : "bg-[#d26019]/10 group-hover:bg-[#d26019]"
                    }`} />

                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className={`w-8 h-8 opacity-20 ${idx % 2 === 0 ? "text-[#23471d]" : "text-[#d26019]"}`} />
                  </div>

                  {/* Feedback */}
                  <div className="min-h-[120px]">
                    <p className="text-slate-700 text-sm leading-relaxed mb-8 italic">
                      "{testimonial.feedback}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50">
                    {/* Avatar with Initials */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 transition-transform duration-500 group-hover:scale-110 ${idx % 2 === 0
                      ? "bg-[#23471d]/5 border-[#23471d]/20 text-[#23471d]"
                      : "bg-[#d26019]/5 border-[#d26019]/20 text-[#d26019]"
                      }`}>
                      <span className="font-bold text-sm tracking-tighter">{testimonial.initials}</span>
                    </div>

                    <div className="overflow-hidden">
                      <p className="font-bold text-[13px] text-slate-900 truncate">{testimonial.name}</p>
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-[9px] text-[#d26019] font-bold truncate">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Top-right floating stars */}
                  <div className="absolute top-6 right-6 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-2.5 h-2.5 ${i < testimonial.rating ? "fill-[#d26019] text-[#d26019]" : "text-slate-200"}`} 
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-10 mt-16">
            <button
              onClick={prev}
              className="group flex items-center gap-2 text-slate-400 hover:text-[#23471d] transition-all"
            >
              <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-[#23471d] group-hover:bg-[#23471d]/5">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline font-inter">Prev</span>
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: Math.ceil(data.cards.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index * 4)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${Math.floor(currentIndex / 4) === index
                    ? "w-8 bg-[#23471d]"
                    : "w-1.5 bg-slate-200 hover:bg-slate-300"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="group flex items-center gap-2 text-slate-400 hover:text-[#23471d] transition-all"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline font-inter">Next</span>
              <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-[#23471d] group-hover:bg-[#23471d]/5">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
