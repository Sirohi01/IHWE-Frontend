import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, FileDown, Info, Store } from 'lucide-react';
import bannerImg from '../../assets/banner2.jpg';

interface BrochurePopUpProps {
  isOpen: boolean;
  onClose: () => void;
  logoUrl?: string;
}

// ── Sparkle Component (Same as WhyParticipate) ──
const Sparkle = ({ style, color = '#fff176' }: { style?: React.CSSProperties, color?: string }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '10px',
      color: color,
      textShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

const BrochurePopUp: React.FC<BrochurePopUpProps> = ({ isOpen, onClose, logoUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center p-4">
          {/* Import Roboto for buttons */}
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
            
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
            .orange-btn-popup {
              background: linear-gradient(135deg, #F08D39 0%, #ff9d4d 30%, #d97a26 60%, #F08D39 100%);
              background-size: 200% 200%;
              animation: goldShift 2.5s ease infinite;
              box-shadow: 0 0 12px 3px rgba(240,141,57,0.3);
              position: relative;
              overflow: hidden;
              font-family: 'Roboto', sans-serif;
            }
            .orange-btn-popup::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -75%;
              width: 50%;
              height: 200%;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
              transform: skewX(-20deg);
              animation: shimmer 2s infinite;
            }
            .white-btn-popup {
              background: linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 60%, #ffffff 100%);
              background-size: 200% 200%;
              animation: goldShift 2.5s ease infinite;
              box-shadow: 0 0 12px 3px rgba(255,255,255,0.3), 0 4px 6px rgba(0,0,0,0.05);
              position: relative;
              overflow: hidden;
              font-family: 'Roboto', sans-serif;
              border: 1px solid rgba(0,0,0,0.05);
            }
            .white-btn-popup::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -75%;
              width: 50%;
              height: 200%;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent);
              transform: skewX(-20deg);
              animation: shimmer 2s infinite;
            }
            .blue-btn-popup {
              background: linear-gradient(135deg, #28396C 0%, #3d528f 30%, #1e2a50 60%, #28396C 100%);
              background-size: 200% 200%;
              animation: goldShift 2.5s ease infinite;
              box-shadow: 0 0 12px 3px rgba(40,57,108,0.3);
              position: relative;
              overflow: hidden;
              font-family: 'Roboto', sans-serif;
            }
            .blue-btn-popup::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -75%;
              width: 50%;
              height: 200%;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
              transform: skewX(-20deg);
              animation: shimmer 2s infinite;
            }
            .golden-btn-popup {
              background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
              background-size: 200% 200%;
              animation: goldShift 2.5s ease infinite;
              box-shadow: 0 0 12px 3px rgba(255,200,0,0.3), 0 4px 10px rgba(255,165,0,0.25);
              position: relative;
              overflow: hidden;
              font-family: 'Roboto', sans-serif;
            }
            .golden-btn-popup::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -75%;
              width: 50%;
              height: 200%;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
              transform: skewX(-20deg);
              animation: shimmer 2s infinite;
            }
          `}</style>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-xl w-full z-[20010]"
          >
            {/* Close Button - Red */}
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-all duration-300 z-[20030] shadow-xl border-2 border-white"
            >
              <X size={20} strokeWidth={3} />
            </button>

            {/* Logo in Top Right */}
            {logoUrl && (
              <div className="absolute -top-10 right-6 z-[20020] pointer-events-none">
                <img src={logoUrl} alt="IHWE Logo" className="h-40 w-auto object-contain drop-shadow-sm" />
              </div>
            )}

            {/* Banner Image Container */}
            <div className="relative w-full h-auto rounded-2xl overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] border border-white/30 bg-white">
              <img
                src={bannerImg}
                alt="IHWE 2026 Banner"
                className="w-full h-auto object-contain block"
              />

              {/* ── BUTTONS OVERLAY ── */}
              <div className="absolute bottom-[12.5%] left-[34%] md:left-[36%] right-2 flex flex-row items-center justify-start gap-0.5 md:gap-2 z-[20025] flex-nowrap">

                {/* 1. Apply Under PMS Scheme (ORANGE + GOLD SPARKLES) */}
                <div className="relative group/btn shrink-0">
                  <Sparkle color="#fff176" style={{ top: '-4px', left: '10%' }} />
                  <Sparkle color="#fff176" style={{ bottom: '-4px', right: '15%', animationDelay: '0.4s' }} />
                  <button 
                    onClick={() => window.open("/government-msme-pms-schemes", "_blank")}
                    className="orange-btn-popup flex items-center gap-1 md:gap-1.5 px-1.5 md:px-4 h-6 md:h-9 rounded-md md:rounded-lg transition-transform hover:scale-[1.03] min-w-[65px] md:min-w-[110px]"
                  >
                    <CheckCircle className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white shrink-0" />
                    <div className="flex flex-col text-left leading-[1]">
                      <span className="font-bold text-[5.5px] md:text-[9px] tracking-tight text-white uppercase">APPLY UNDER</span>
                      <span className="font-bold text-[5.5px] md:text-[9px] tracking-tight text-white uppercase">PMS SCHEME</span>
                    </div>
                  </button>
                </div>

                {/* 2. Know Your Eligibility (WHITE + GREEN SPARKLES) */}
                <div className="relative group/btn shrink-0">
                  <Sparkle color="#a4c639" style={{ top: '-4px', right: '10%' }} />
                  <Sparkle color="#a4c639" style={{ bottom: '-4px', left: '15%', animationDelay: '0.6s' }} />
                  <button 
                    onClick={() => window.open("/government-msme-pms-schemes", "_blank")}
                    className="white-btn-popup flex items-center gap-1 md:gap-1.5 px-1.5 md:px-4 h-6 md:h-9 rounded-md md:rounded-lg transition-transform hover:scale-[1.03] min-w-[65px] md:min-w-[110px]"
                  >
                    <Info className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-[#28396C] shrink-0" />
                    <div className="flex flex-col text-left leading-[1]">
                      <span className="font-bold text-[5.5px] md:text-[9px] tracking-tight text-[#28396C] uppercase">KNOW YOUR</span>
                      <span className="font-bold text-[5.5px] md:text-[9px] tracking-tight text-[#28396C] uppercase">ELIGIBILITY</span>
                    </div>
                  </button>
                </div>

                {/* 3. Book Your Stall (GOLDEN + GOLD SPARKLES) */}
                <div className="relative group/btn shrink-0">
                  <Sparkle color="#fff176" style={{ top: '-4px', right: '40%' }} />
                  <Sparkle color="#fff176" style={{ bottom: '-4px', right: '10%', animationDelay: '0.2s' }} />
                  <button 
                    onClick={() => window.open("/book-a-stand", "_blank")}
                    className="golden-btn-popup flex items-center gap-1 md:gap-1.5 px-1.5 md:px-4 h-6 md:h-9 rounded-md md:rounded-lg transition-transform hover:scale-[1.03] min-w-[65px] md:min-w-[110px]"
                  >
                    <Store className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-[#050A1A] shrink-0" />
                    <div className="flex flex-col text-left leading-[1]">
                      <span className="font-bold text-[5.5px] md:text-[9px] tracking-tight text-[#050A1A] uppercase">BOOK YOUR</span>
                      <span className="font-bold text-[5.5px] md:text-[9px] tracking-tight text-[#050A1A] uppercase">STALL NOW</span>
                    </div>
                  </button>
                </div>

              </div>



            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BrochurePopUp;
