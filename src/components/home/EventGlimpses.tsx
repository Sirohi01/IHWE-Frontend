import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Globe2, Store, Mic2, Handshake, Package, Camera, ChevronLeft, ChevronRight, Leaf, 
  Building2, Mic, Sparkles, Globe
} from 'lucide-react';
import { glimpseApi, SERVER_URL } from '../../lib/api';
import SectionContainer from '../layout/SectionContainer';

const ICON_MAP: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Globe2: <Globe2 className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />,
  Mic: <Mic className="w-5 h-5" />,
  Mic2: <Mic2 className="w-5 h-5" />,
  Handshake: <Handshake className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
};

const EventGlimpses = () => {
  const [glimpseData, setGlimpseData] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const visible = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await glimpseApi.get();
        if (data) {
          setGlimpseData(data);
        }
      } catch (err) {
        console.error("Error fetching glimpse data:", err);
      }
    };
    fetchData();
  }, []);

  const nextSlide = useCallback(() => {
    if (!glimpseData?.images?.length) return;
    const maxIndex = Math.max(0, glimpseData.images.length - visible);
    setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [glimpseData]);

  const prevSlide = () => {
    if (!glimpseData?.images?.length) return;
    const maxIndex = Math.max(0, glimpseData.images.length - visible);
    setCurrent(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (glimpseData?.images?.length > visible) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, glimpseData]);

  if (!glimpseData) return null;

  const images = glimpseData.images || [];
  const stats = glimpseData.counters || [];
  const maxIndex = Math.max(0, images.length - visible);
  const GAP = 2;



  return (
    <section
      className="relative pt-6 pb-12 overflow-hidden font-inter"
      style={{ background: '#f5fdf6' }}
    >
      {/* ── BG DECORATIVE ELEMENTS ── */}

      {/* Top-left leaf cluster */}
      <svg
        className="absolute top-0 left-0 pointer-events-none"
        width="220" height="210"
        viewBox="0 0 220 210"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.18, zIndex: 0 }}
      >
        <g fill="#2f8f3a">
          <path d="M10 170 Q70 15 210 8 Q130 85 80 195 Z" opacity="0.75" />
          <path d="M0 105 Q45 38 140 28 Q75 85 28 160 Z" opacity="0.45" />
          <ellipse cx="42" cy="178" rx="32" ry="13" opacity="0.3" transform="rotate(-22 42 178)" />
        </g>
      </svg>

      {/* Top-right circle arc */}
      <svg
        className="absolute pointer-events-none"
        style={{ top: '-30px', right: '-30px', width: '170px', opacity: 0.13, zIndex: 0 }}
        viewBox="0 0 180 180"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="160" cy="20" r="120" fill="none" stroke="#2f8f3a" strokeWidth="18" />
        <circle cx="160" cy="20" r="90"  fill="none" stroke="#2f8f3a" strokeWidth="8"  />
      </svg>

      {/* Bottom-right dot grid */}
      <svg
        className="absolute pointer-events-none"
        style={{ bottom: '80px', right: '24px', opacity: 0.13, zIndex: 0 }}
        width="90" height="70"
        viewBox="0 0 90 70"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[10,30,50,70,90].map(x =>
          [10,30,50,70].map(y => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#2f8f3a" />
          ))
        )}
      </svg>

      {/* ── CONTENT ── */}
      <SectionContainer className="relative z-10">

        {/* Header */}
        <div className="text-center mb-8 px-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf size={20} className="text-[#2f8f3a]" />
            <span className="text-[#0b4d17] font-bold tracking-[0.2em] uppercase text-[11px]">{glimpseData.subheading || 'Event Glimpses'}</span>
            <Leaf size={20} className="text-[#2f8f3a] scale-x-[-1]" />
          </div>
          <div 
            className="text-2xl md:text-4xl font-black text-[#0b2912] mb-3 uppercase tracking-tight flex justify-center items-center"
            dangerouslySetInnerHTML={{ __html: glimpseData.heading }}
          />
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[#b6d9bb]" />
            <div 
              className="text-slate-700 text-xs md:text-sm tracking-wide prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: glimpseData.description }}
            />
            <div className="h-[1px] w-12 bg-[#b6d9bb]" />
          </div>
        </div>

        {/* Carousel Area */}
        <div className="relative mb-4 px-2 max-w-[1200px] mx-auto">
          {/* Arrows */}
          {images.length > visible && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#2f8f3a] shadow-lg flex items-center justify-center text-white border border-[#2f8f3a] hover:bg-[#0b4d17] transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#2f8f3a] shadow-lg flex items-center justify-center text-white border border-[#2f8f3a] hover:bg-[#0b4d17] transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Slider */}
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <motion.div
              className="flex"
              style={{ gap: `${GAP}px` }}
              animate={{ x: `${-(current * (100 / visible))}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
              {images.map((img: any, idx: number) => {
                // Dynamic window logic: check if the image is currently at the start or end of the 5 visible items
                const isFirstVisible = idx === current;
                const isLastVisible = idx === current + visible - 1;
                
                const itemWidth = `calc((100% + ${(visible - 1) * 35}px) / ${visible})`;

                return (
                  <div
                    key={idx}
                    className={`relative flex-shrink-0 group/card overflow-hidden transition-all duration-700 
                      ${isFirstVisible ? 'rounded-l-3xl shadow-[-20px_0_40px_rgba(0,0,0,0.1)]' : ''} 
                      ${isLastVisible ? 'rounded-r-3xl shadow-[20px_0_40px_rgba(0,0,0,0.1)]' : ''}`}
                    style={{
                      width: itemWidth,
                      minWidth: itemWidth,
                      marginLeft: idx === 0 ? '0' : '-35px',
                      height: '260px',
                      zIndex: isFirstVisible || isLastVisible ? 20 : 10,
                      clipPath: isFirstVisible 
                        ? 'polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)' 
                        : isLastVisible
                          ? 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)'
                          : 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
                    }}
                  >
                    <img
                      src={img.url.startsWith('http') ? img.url : `${SERVER_URL}${img.url}`}
                      alt={img.title || 'Event Glimpse'}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    
                    {/* Bottom Green Overlay - Shorter & Subtle */}
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0b4d17]/80 via-[#0b4d17]/30 to-transparent opacity-80" />

                    {/* Image Title on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <span className="text-white font-bold text-center text-sm">{img.title}</span>
                    </div>

                    {/* Decorative Dots - On Every Image */}
                    <div className="absolute bottom-6 right-4 opacity-40">
                      <div className="grid grid-cols-3 gap-1">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-white rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Stats Footer Bar */}
        <div className="px-2 mt-0">
          <div className="max-w-[1200px] mx-auto bg-[#041a0a] rounded-full p-1.5 flex items-center border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex-1 flex items-center justify-around px-2">
              {stats.map((stat: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 px-3 border-r border-white/10 last:border-r-0">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0b4d17] flex-shrink-0">
                    {ICON_MAP[stat.icon] || <Users size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#2f8f3a] font-bold text-sm leading-none mb-0.5">{stat.number}</span>
                    <span className="text-white/60 text-[9px] uppercase tracking-wider font-semibold">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA White Pill */}
            <div className="bg-white rounded-full p-1.5 pr-8 flex items-center gap-4 ml-2 shadow-xl flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#0b4d17] flex items-center justify-center text-white shadow-inner">
                <Camera size={20} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#0b4d17] font-black text-[11px] uppercase tracking-tight leading-none">Endless</span>
                  <span className="text-[#0b4d17]/60 text-[9px] font-bold uppercase tracking-widest leading-none">Opportunities</span>
                </div>
                <p className="text-[#0b2912] text-[10px] leading-[1.3] font-medium tracking-wide mt-0.5">
                  {glimpseData.counterText}
                </p>
              </div>
            </div>
          </div>
        </div>

      </SectionContainer>
    </section>
  );
};

export default EventGlimpses;