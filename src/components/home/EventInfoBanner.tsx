import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Globe, Trophy, ArrowRight, Leaf } from 'lucide-react';

// Sparkle component
const Sparkle = ({ style }: { style?: React.CSSProperties }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '12px',
      color: '#fff176',
      textShadow: '0 0 6px gold, 0 0 12px gold',
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      ...style,
    }}
  >
    ✦
  </span>
);

const EventInfoBanner = () => {
  return (
    <>
      {/* Keyframes injected via style tag */}
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
        .golden-btn {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 16px 4px rgba(255,200,0,0.45), 0 4px 20px rgba(255,165,0,0.35);
          position: relative;
          overflow: hidden;
        }
        .golden-btn::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
        .sparkle-1 { top: -10px; left: 10%; animation-delay: 0s !important; }
        .sparkle-2 { top: -8px; left: 40%; animation-delay: 0.4s !important; }
        .sparkle-3 { top: -12px; right: 15%; animation-delay: 0.8s !important; }
        .sparkle-4 { bottom: -10px; left: 25%; animation-delay: 0.2s !important; }
        .sparkle-5 { bottom: -8px; right: 30%; animation-delay: 0.6s !important; }
        .sparkle-6 { top: 50%; left: -14px; transform: translateY(-50%); animation-delay: 1s !important; }
        .sparkle-7 { top: 50%; right: -12px; transform: translateY(-50%); animation-delay: 0.3s !important; }
      `}</style>

      <section className="w-full bg-white pt-2 pb-0">
        <div className="w-full relative overflow-hidden bg-gradient-to-r from-[#0b2912] via-[#0e3a19] to-[#0b2912] shadow-lg">

          {/* Decorative Leaves */}
          <div className="absolute left-[-20px] bottom-[-10px] opacity-10 rotate-45">
            <Leaf className="w-24 h-24 text-white fill-white" />
          </div>
          <div className="absolute right-[-20px] top-[-10px] opacity-10 -rotate-12">
            <Leaf className="w-24 h-24 text-white fill-white" />
          </div>

          <div className="relative z-10 flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 py-3 px-6 md:px-14">

            {/* Date */}
            <div className="flex items-center gap-3 border-r border-white/10 pr-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md shrink-0">
                <Calendar className="w-5 h-5 text-[#0b2912]" />
              </div>
              <div>
                <p className="text-[18px] font-bold text-white leading-none">21 – 23</p>
                <p className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">AUGUST 2026</p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-3 border-r border-white/10 pr-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md shrink-0">
                <MapPin className="w-5 h-5 text-[#0b2912]" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-white leading-tight uppercase tracking-tight">PRAGATI MAIDAN</p>
                <p className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">NEW DELHI, INDIA</p>
              </div>
            </div>

            {/* Global Edition */}
            <div className="flex items-center gap-3 border-r border-white/10 pr-6">
              <div className="w-10 h-10 bg-[#ff6b00] rounded-lg flex items-center justify-center shadow-md shrink-0">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-white leading-tight uppercase tracking-tight">GLOBAL EDITION</p>
                <p className="text-[9px] font-semibold text-gray-300 leading-tight max-w-[130px]">CONNECTING THE WORLD OF HEALTH & WELLNESS</p>
              </div>
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-3 flex-grow">
              <Trophy className="w-8 h-8 text-[#facc15] shrink-0" />
              <div>
                <p className="text-[13px] font-bold text-white uppercase leading-tight tracking-tight">BE PART OF INDIA'S BIGGEST</p>
                <p className="text-[15px] font-bold text-[#86efac] leading-none uppercase tracking-tighter">HEALTH & WELLNESS SHOW!</p>
              </div>
            </div>

            {/* ✅ CTA Button — Golden with Sparkles */}
            <Link to="/book-a-stand" className="mr-6 shrink-0">
              <div style={{ position: 'relative', display: 'inline-block' }}>

                {/* Sparkles around button */}
                <Sparkle style={{ position: 'absolute', top: '-10px', left: '10%', animationDelay: '0s' }} />
                <Sparkle style={{ position: 'absolute', top: '-8px', left: '40%', animationDelay: '0.4s' }} />
                <Sparkle style={{ position: 'absolute', top: '-12px', right: '15%', animationDelay: '0.8s' }} />
                <Sparkle style={{ position: 'absolute', bottom: '-10px', left: '25%', animationDelay: '0.2s' }} />
                <Sparkle style={{ position: 'absolute', bottom: '-8px', right: '30%', animationDelay: '0.6s' }} />
                <Sparkle style={{ position: 'absolute', top: '50%', left: '-14px', transform: 'translateY(-50%)', animationDelay: '1s' }} />
                <Sparkle style={{ position: 'absolute', top: '50%', right: '-12px', transform: 'translateY(-50%)', animationDelay: '0.3s' }} />

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="golden-btn text-[#0b2912] px-6 py-2.5 rounded-[1rem] font-black text-[13px] flex items-center gap-2.5 whitespace-nowrap transition-all"
                >
                  BOOK YOUR STALL NOW!
                  <div className="w-5 h-5 bg-[#0b2912] rounded-full flex items-center justify-center z-10 relative">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </motion.button>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </>
  );
};

export default EventInfoBanner;