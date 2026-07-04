import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroApi, SERVER_URL } from "@/lib/api";
import SectionContainer from "../../../layout/SectionContainer";

// Sparkle component for buttons - Enhanced visibility
const Sparkle = ({ style, color = '#fff176' }: { style?: React.CSSProperties, color?: string }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '16px',
      color: color,
      textShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

interface HeroSectionProps {
  onRegisterVisit: () => void;
  forceNewTab?: boolean;
  hideStats?: boolean;
}

const HeroSection = ({ onRegisterVisit, forceNewTab, hideStats }: HeroSectionProps) => {
  const [slides, setSlides] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await heroApi.getAll();
        if (data && data.length > 0) {
          const now = new Date().getTime();
          const activeSlides = data.filter((s: any) => {
            if (!s.isActive) return false;

            // If scheduling is present, check time
            if (s.schedule?.startDate && s.schedule?.startTime) {
              const startDateTime = new Date(s.schedule.startDate + 'T' + s.schedule.startTime).getTime();
              const endDateTime = s.schedule.endDate && s.schedule.endTime
                ? new Date(s.schedule.endDate + 'T' + s.schedule.endTime).getTime()
                : null;

              if (now < startDateTime) return false;
              if (endDateTime && now > endDateTime) return false;
            }

            return true;
          });

          if (activeSlides.length > 0) {
            setSlides(activeSlides);
          }
        }
      } catch (error) {
        console.error("Failed to fetch slides:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1 || !isPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPlaying]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSlideChange = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      z: 0,
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const getImageUrl = (image: string) => {
    if (!image) return "";
    // Full URL or data URI — use as-is
    if (image.startsWith("http") || image.startsWith("data:")) return image;
    // Backend upload path — prefix with server origin from VITE_API_URL env
    const cleanPath = image.startsWith("/") ? image : "/" + image;
    return `${SERVER_URL}${cleanPath}`;
  };

  if (isLoading) {
    return (
      <section className="relative w-full overflow-hidden bg-black flex items-center justify-center" style={{ aspectRatio: '16/5.3' }}>
        <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
      </section>
    );
  }

  if (slides.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes goldShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%   { left: -75%; }
          100% { left: 150%; }
        }
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
        }
        .golden-btn-hero {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 20px 5px rgba(255,200,0,0.3), 0 4px 25px rgba(255,165,0,0.2);
          position: relative;
          overflow: hidden;
          border: 2px solid white !important;
        }
        .golden-btn-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
        .hero-title-responsive {
          font-size: var(--desktop-fs) !important;
        }
        .hero-desc-responsive {
          font-size: var(--desktop-fs-desc) !important;
        }
        @media (max-width: 768px) {
          .hero-title-responsive {
            font-size: clamp(16px, 7vw, 22px) !important;
            line-height: 1.1 !important;
            letter-spacing: -0.01em !important;
          }
          .hero-title-responsive * {
            font-size: inherit !important;
            line-height: inherit !important;
          }
          .hero-desc-responsive {
            font-size: clamp(10px, 3vw, 11px) !important;
            line-height: 1.4 !important;
            margin-bottom: 1rem !important;
            opacity: 0.95;
          }
          .hero-desc-responsive * {
            font-size: inherit !important;
            line-height: inherit !important;
          }
          .hero-subtitle-responsive {
            font-size: 8px !important;
            letter-spacing: 0.1em !important;
          }
        }
        @media (max-width: 640px) {
          .hero-title-gap {
            margin-bottom: 4px !important;
          }
          .hero-desc-gap {
            margin-bottom: 16px !important;
          }
        }
      `}</style>

      <section className="relative w-full overflow-hidden bg-black font-inter text-white aspect-[0.75/1] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/6.7] min-h-[380px] md:min-h-[420px] lg:min-h-[480px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring" as const, stiffness: 200, damping: 30 },
              opacity: { duration: 0.8 },
              scale: { duration: 1.2 },
            }}
            className="absolute inset-0 z-0"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: "easeOut" }}
            >
              <img
                src={getImageUrl(slides[current].image)}
                alt={slides[current].title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>



        <div className="absolute top-40 right-20 w-64 h-64 bg-white/5 rounded-full blur-[120px] z-10 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-[150px] z-10" />

        <SectionContainer className="relative z-20 h-full flex flex-col justify-center items-start text-left text-white pt-16 sm:pt-0 pb-8 sm:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mt-0 translate-y-0 md:-translate-y-8"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center gap-3 mb-2"
              >
                <span className="w-10 h-[1px] bg-white/40" />
                <span className={cn(
                  "uppercase tracking-[0.15em] font-semibold text-[#FF4400] flex items-center gap-2 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] filter",
                  slides[current].subtitleFontSize ? "hero-subtitle-responsive" : "text-[10px]"
                )}
                  style={{
                    fontSize: slides[current].subtitleFontSize ? `${slides[current].subtitleFontSize}px` : undefined,
                    textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)'
                  }}
                >
                  <Sparkles size={12} className="text-[#FF4400] filter drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]" />
                  {slides[current].subtitle}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                className={cn(
                  "font-bold leading-[1.1] tracking-tight text-white uppercase [&_p]:mb-0 [&_div]:mb-0 last:[&_p]:mb-0 last:[&_div]:mb-0 hero-title-gap",
                  slides[current].title2 ? "mb-[0px]" : "mb-5",
                  slides[current].titleFontSize ? "hero-title-responsive" : "text-xl sm:text-2xl md:text-4xl lg:text-5xl"
                )}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  // @ts-ignore
                  "--desktop-fs": slides[current].titleFontSize ? `${slides[current].titleFontSize}px` : undefined,
                  textShadow: '0 0 15px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6), 0 0 45px rgba(0,0,0,0.4)'
                }}
                dangerouslySetInnerHTML={{ __html: slides[current].title }}
              />

              {slides[current].title2 && (
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.9 }}
                  className={cn(
                    "font-bold mb-5 leading-[1.1] tracking-tight text-white/90 uppercase [&_p]:m-0 [&_div]:m-0 [&_p]:p-0 [&_div]:p-0 hero-title-gap",
                    slides[current].title2FontSize ? "hero-title-responsive" : "text-xl sm:text-2xl md:text-4xl lg:text-5xl"
                  )}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    // @ts-ignore
                    "--desktop-fs": slides[current].title2FontSize ? `${slides[current].title2FontSize}px` : undefined,
                    textShadow: '0 0 15px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6), 0 0 45px rgba(0,0,0,0.4)'
                  }}
                  dangerouslySetInnerHTML={{ __html: slides[current].title2 }}
                />
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.9 }}
                className={cn(
                  "font-light mb-10 max-w-4xl text-white/85 leading-relaxed tracking-wide [&_p]:mb-1 [&_div]:mb-1 last:[&_p]:mb-0 last:[&_div]:mb-0 hero-desc-gap",
                  slides[current].descriptionFontSize ? "hero-desc-responsive" : "text-xs sm:text-sm md:text-base"
                )}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  // @ts-ignore
                  "--desktop-fs-desc": slides[current].descriptionFontSize ? `${slides[current].descriptionFontSize}px` : undefined,
                  textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)'
                }}
                dangerouslySetInnerHTML={{ __html: slides[current].description }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
                className="flex flex-wrap flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto"
              >
                {slides[current].button1Name && (
                  <div style={{ position: 'relative', display: 'inline-block' }} className="w-[75%] max-w-[280px] sm:max-w-none sm:w-auto">
                    {/* Enhanced Gold Sparkles */}
                    <Sparkle style={{ top: '-15px', left: '10%', animationDelay: '0s' }} />
                    <Sparkle style={{ top: '-12px', left: '45%', animationDelay: '0.4s' }} />
                    <Sparkle style={{ top: '-16px', right: '15%', animationDelay: '0.8s' }} />
                    <Sparkle style={{ bottom: '-15px', left: '20%', animationDelay: '0.2s' }} />
                    <Sparkle style={{ bottom: '-12px', right: '25%', animationDelay: '0.6s' }} />
                    <Sparkle style={{ top: '20%', left: '-10px', animationDelay: '0.3s' }} />
                    <Sparkle style={{ top: '60%', right: '-10px', animationDelay: '0.7s' }} />

                    {slides[current].button1Url ? (
                      slides[current].button1Url.startsWith('http') ? (
                        <a
                          href={slides[current].button1Url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="golden-btn-hero group rounded-xl px-4 py-2 sm:px-4 sm:py-1.5 text-[#0b2912] transition-all duration-500 uppercase tracking-[0.15em] text-[9px] font-black w-full sm:w-auto flex items-center justify-center shrink-0"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {slides[current].button1Name}
                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </a>
                      ) : (
                        <Link
                          to={slides[current].button1Url}
                          target={forceNewTab ? "_blank" : undefined}
                          rel={forceNewTab ? "noopener noreferrer" : undefined}
                          className="golden-btn-hero group rounded-xl px-4 py-2 sm:px-4 sm:py-1.5 text-[#0b2912] transition-all duration-500 uppercase tracking-[0.15em] text-[9px] font-black w-full sm:w-auto flex items-center justify-center shrink-0"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {slides[current].button1Name}
                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </Link>
                      )
                    ) : (
                      <button
                        onClick={onRegisterVisit}
                        className="golden-btn-hero group rounded-xl px-4 py-2 sm:px-4 sm:py-1.5 text-[#0b2912] transition-all duration-500 uppercase tracking-[0.15em] text-[9px] font-black w-full sm:w-auto flex items-center justify-center shrink-0"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {slides[current].button1Name}
                          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </button>
                    )}
                  </div>
                )}

                {slides[current].button3Name && (
                  <div style={{ position: 'relative', display: 'inline-block' }} className="w-[75%] max-w-[280px] sm:max-w-none sm:w-auto">
                    {/* Enhanced Blue Sparkles */}
                    <Sparkle color="#60a5fa" style={{ top: '-15px', left: '20%', animationDelay: '0.2s' }} />
                    <Sparkle color="#60a5fa" style={{ bottom: '-15px', right: '15%', animationDelay: '0.6s' }} />
                    <Sparkle color="#60a5fa" style={{ top: '10%', right: '-12px', animationDelay: '0.4s' }} />
                    <Sparkle color="#60a5fa" style={{ bottom: '20%', left: '-12px', animationDelay: '0.8s' }} />
                    <Sparkle color="#60a5fa" style={{ top: '-12px', left: '50%', animationDelay: '0s' }} />
                    {slides[current].button3Url?.startsWith('http') ? (
                      <a
                        href={slides[current].button3Url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-xl px-4 py-2 sm:px-4 sm:py-1.5 bg-[#134698] text-white hover:bg-black transition-all duration-500 uppercase tracking-[0.15em] text-[9px] font-bold border-2 border-white shadow-[0_8px_20px_rgba(19,70,152,0.2)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] w-full sm:w-auto flex items-center justify-center shrink-0"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {slides[current].button3Name}
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </a>
                    ) : (
                      <Link
                        to={slides[current].button3Url || "/conference"}
                        target={forceNewTab ? "_blank" : undefined}
                        rel={forceNewTab ? "noopener noreferrer" : undefined}
                        className="group relative overflow-hidden rounded-xl px-4 py-2 sm:px-4 sm:py-1.5 bg-[#134698] text-white hover:bg-black transition-all duration-500 uppercase tracking-[0.15em] text-[9px] font-bold border-2 border-white shadow-[0_8px_20px_rgba(19,70,152,0.2)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] w-full sm:w-auto flex items-center justify-center shrink-0"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {slides[current].button3Name}
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </Link>
                    )}
                  </div>
                )}

                {slides[current].button2Name && (
                  <div style={{ position: 'relative', display: 'inline-block' }} className="w-[75%] max-w-[280px] sm:max-w-none sm:w-auto">
                    {/* Enhanced Green Sparkles */}
                    <Sparkle color="#4ade80" style={{ top: '-15px', right: '20%', animationDelay: '0.4s' }} />
                    <Sparkle color="#4ade80" style={{ bottom: '-15px', left: '15%', animationDelay: '0.8s' }} />
                    <Sparkle color="#4ade80" style={{ top: '30%', left: '-12px', animationDelay: '0.2s' }} />
                    <Sparkle color="#4ade80" style={{ bottom: '40%', right: '-12px', animationDelay: '0.6s' }} />
                    <Sparkle color="#4ade80" style={{ top: '-12px', left: '40%', animationDelay: '0s' }} />
                    {slides[current].button2Url?.startsWith('http') ? (
                      <a
                        href={slides[current].button2Url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-xl px-4 py-2 sm:px-4 sm:py-1.5 bg-[#23471d] text-white hover:bg-[#d26019] transition-all duration-500 uppercase tracking-[0.15em] text-[9px] font-bold border-2 border-white shadow-[0_8px_20px_rgba(35,71,29,0.2)] hover:shadow-[0_12px_30px_rgba(35,71,29,0.3)] w-full sm:w-auto flex items-center justify-center shrink-0"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {slides[current].button2Name}
                          <Sparkles size={11} className="group-hover:rotate-180 transition-transform duration-500" />
                        </span>
                        <span className="absolute inset-0 bg-[#d26019] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </a>
                    ) : (
                      <Link
                        to={slides[current].button2Url || "/book-a-stand"}
                        target={forceNewTab ? "_blank" : undefined}
                        rel={forceNewTab ? "noopener noreferrer" : undefined}
                        className="group relative overflow-hidden rounded-xl px-4 py-2 sm:px-4 sm:py-1.5 bg-[#23471d] text-white hover:bg-[#d26019] transition-all duration-500 uppercase tracking-[0.15em] text-[9px] font-bold border-2 border-white shadow-[0_8px_20px_rgba(35,71,29,0.2)] hover:shadow-[0_12px_30px_rgba(35,71,29,0.3)] w-full sm:w-auto flex items-center justify-center shrink-0"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {slides[current].button2Name}
                          <Sparkles size={11} className="group-hover:rotate-180 transition-transform duration-500" />
                        </span>
                        <span className="absolute inset-0 bg-[#d26019] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </Link>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </SectionContainer>

        <div className="hidden md:flex absolute bottom-16 right-12 z-30 flex flex-col gap-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSlideChange(i)}
              className="group relative flex items-center justify-end"
            >
              <motion.span
                className="absolute right-0 text-[10px] font-semibold text-white/0 group-hover:text-white/70 transition-all duration-300 mr-20 uppercase tracking-[0.3em]"
                whileHover={{ x: -10 }}
              >
                0{i + 1}
              </motion.span>
              <div className="relative w-16 h-[2px] bg-white/20 overflow-hidden">
                <motion.span
                  className={cn("absolute left-0 top-0 h-full bg-white")}
                  initial={false}
                  animate={{ width: i === current ? "100%" : "0%" }}
                  transition={{ duration: i === current && isPlaying ? 5 : 0.5, ease: isPlaying ? "linear" : "easeOut" }}
                />
              </div>
              <span
                className={cn(
                  "ml-4 w-2 h-2 rounded-full transition-all duration-300",
                  i === current ? "bg-white scale-100" : "bg-white/30 scale-75 group-hover:bg-white/50",
                )}
              />
            </button>
          ))}
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </section >
    </>
  );
};

export default HeroSection;