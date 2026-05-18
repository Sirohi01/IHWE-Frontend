import React from 'react';
import { CheckCircle2, TrendingUp, Globe, Landmark, Calendar, MapPin } from 'lucide-react';

// ── Sparkle Component (Same as BrochurePopUp) ──
const Sparkle = ({ style, color = '#fff176' }) => (
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

const MPSchemeHero = ({ onApplyClick }) => {
    return (
        <div
            className="w-full relative min-h-[400px] lg:min-h-[450px] flex bg-[url('/mpscheme/bg2.png')] bg-cover bg-center bg-no-repeat font-['Barlow',sans-serif] overflow-visible z-10"
        >
            {/* Background white overlay for mobile readability */}
            <div className="absolute inset-0 bg-white/90 md:bg-transparent z-0 pointer-events-none" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
                
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
                  box-shadow: 0 0 16px 4px rgba(240,141,57,0.45), 0 4px 15px rgba(240,141,57,0.3);
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
                  background: linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent);
                  transform: skewX(-20deg);
                  animation: shimmer 2s infinite;
                }
                .golden-btn-popup {
                  background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
                  background-size: 200% 200%;
                  animation: goldShift 2.5s ease infinite;
                  box-shadow: 0 0 16px 4px rgba(255,200,0,0.4), 0 4px 15px rgba(255,165,0,0.35);
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
                  background: linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent);
                  transform: skewX(-20deg);
                  animation: shimmer 2s infinite;
                }
            `}</style>

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row relative z-10 h-full py-8 lg:py-0">

                {/* ── LEFT CONTENT PANEL ── */}
                <div className="flex-1 flex flex-col justify-center pt-6 pb-2 lg:pt-8 lg:pb-4 w-full lg:max-w-[520px] relative z-20">

                    {/* Badge Tag */}
                    <div className="inline-flex items-center bg-[#166534] text-white text-xs sm:text-sm font-medium uppercase tracking-[0.8px] px-3 py-1.5 rounded w-fit shadow-sm mb-4">
                        Government Supported Scheme
                    </div>

                    {/* Title Block */}
                    <h1 className="text-3xl sm:text-4xl font-medium text-[#111] leading-none uppercase tracking-tight mb-4">
                        MSME PMS Scheme
                    </h1>

                    <div className="flex flex-col gap-2 mb-4">
                        <p className="text-base sm:text-lg font-medium text-[#1a1a1a] tracking-tight leading-tight">Exhibit with Up To</p>
                        <h2 className="text-3xl sm:text-4xl font-medium text-[#1e5c1e] leading-none drop-shadow-sm">
                            ₹1,50,000*
                        </h2>
                        <p className="text-xl sm:text-2xl font-medium text-[#1a1a1a] tracking-tight uppercase">Financial Assistance</p>
                    </div>

                    {/* Summary Paragraph */}
                    <p className="text-sm text-gray-800 leading-[1.6] w-full max-w-[480px] mb-6 font-normal">
                        Exhibit at International Health & Wellness Expo 2026 with financial support from Ministry of MSME, Government of India.
                    </p>

                    {/* Bottom Features Bar - Collapses from row to grid on mobile */}
                    <div className="grid grid-cols-2 sm:flex items-center bg-white rounded-md border border-slate-200 p-3 sm:px-4 sm:py-2 shadow-sm w-full sm:w-fit gap-x-4 gap-y-3 mb-4">
                        {[
                            { icon: CheckCircle2, label: "Reduce Cost" },
                            { icon: TrendingUp, label: "Increase Reach" },
                            { icon: Globe, label: "Grow Globally" },
                            { icon: Landmark, label: "Govt Backed" }
                        ].map((f, i) => (
                            <div key={i} className={`flex items-center gap-2 ${i < 3 ? 'sm:border-r border-slate-200 sm:pr-4' : ''}`}>
                                <div className="w-6 h-6 rounded-full bg-[#f0fdf4] flex items-center justify-center shrink-0 border border-green-100 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                                    <f.icon size={12} className="text-[#166534]" strokeWidth={2.5} />
                                </div>
                                <span className="text-sm sm:text-base font-medium text-[#1a3d20] leading-none whitespace-nowrap">{f.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tiny Disclaimer */}
                    <p className="text-xs sm:text-sm font-medium text-gray-800 mt-2 italic">
                        *Subsidy amount may vary as per MSME guidelines, category and approval.
                    </p>
                </div>

                {/* ── RIGHT CTA & INFO COLUMN ── */}
                <div className="flex-1 relative w-full h-full min-h-0 lg:min-h-[400px] flex flex-col items-center lg:items-end justify-center mt-8 lg:mt-0 z-10">

                    {/* Info Pillar - Relative stack on mobile, Absolute float on desktop */}
                    <div className="relative lg:absolute lg:top-4 lg:bottom-4 lg:right-0 w-full max-w-[250px] h-[350px] lg:h-auto lg:w-[240px] bg-[#001933] rounded-xl shadow-2xl border border-white/10 overflow-hidden flex flex-col z-20 mb-8 lg:mb-0">

                        <div className="p-4 lg:p-4 flex-1 flex flex-col justify-start gap-3 lg:gap-5">
                            {/* Top Data Block */}
                            <div className="flex flex-col gap-3 lg:gap-3.5 mt-0 lg:mt-0.5">
                                {/* Date Block */}
                                <div className="flex items-center gap-2.5 text-white">
                                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                                        <Calendar size={20} className="text-[#8cc63f] shrink-0" strokeWidth={2} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[20px] lg:text-[22px] font-black text-white leading-none">21 – 23</span>
                                        <span className="text-[9px] lg:text-[10px] font-bold tracking-widest text-[#fbbf24] uppercase mt-0.5">August 2026</span>
                                    </div>
                                </div>

                                {/* Location Block */}
                                <div className="flex items-start gap-2.5 text-white">
                                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                                        <MapPin size={20} className="text-[#8cc63f] shrink-0" strokeWidth={2} />
                                    </div>
                                    <div className="flex flex-col pt-0.5">
                                        <span className="text-[9px] lg:text-[10px] font-black tracking-wider uppercase text-white leading-tight">PRAGATI MAIDAN,</span>
                                        <span className="text-[9px] lg:text-[10px] font-black tracking-wider uppercase text-white leading-tight">NEW DELHI, INDIA</span>
                                    </div>
                                </div>

                                {/* Catchphrase */}
                                <div className="border-t border-white/10 pt-1.5 mt-0">
                                    <p className="text-[10px] lg:text-[11px] font-bold text-white/90 leading-snug italic">
                                        A Global Convergence of Health & Wellness Innovators
                                    </p>
                                </div>
                            </div>

                            {/* Subsidy Badge - Further tightened padding */}
                            <div className="flex justify-center items-center py-1 lg:py-1.5 mt-0.5">
                                <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white/10 flex flex-col items-center justify-center bg-[#166534] shadow-xl relative overflow-hidden">
                                    <span className="text-[10px] lg:text-[11px] font-medium text-[#fbbf24] tracking-wider">★</span>
                                    <h3 className="text-[18px] lg:text-[20px] font-medium text-white leading-none">80% <span className="text-[11px] opacity-80 font-normal">TO</span></h3>
                                    <h3 className="text-[20px] lg:text-[24px] font-medium text-white leading-none -mt-0.5">100%</h3>
                                    <span className="text-[8px] lg:text-[9px] font-medium text-white/80 uppercase tracking-widest mt-1">Subsidy</span>
                                    <span className="text-[8px] lg:text-[9px] font-medium text-white/80 uppercase tracking-widest -mt-0.5">Available</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Actions Container - Relocates to vertical stack if viewport tightens */}
                    <div className="relative lg:absolute w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-[14px] bottom-0 lg:bottom-8 lg:right-14 z-30 pb-4 lg:pb-0">
                        {/* Apply for PMS Scheme (ORANGE + SHIMMER + SPARKLES) */}
                        <div className="relative group/btn w-full sm:w-auto shrink-0">
                            <Sparkle color="#fff176" style={{ top: '-4px', left: '10%' }} />
                            <Sparkle color="#fff176" style={{ bottom: '-4px', right: '15%', animationDelay: '0.4s' }} />
                            <button
                                onClick={onApplyClick}
                                className="w-full sm:w-auto orange-btn-popup text-white flex items-center justify-center gap-1.5 px-5 py-2 text-[10px] sm:text-xs font-black uppercase rounded-lg shadow-md hover:scale-[1.02] transition whitespace-nowrap"
                            >
                                Apply for PMS Scheme →
                            </button>
                        </div>

                        {/* Book Your Stall (GOLDEN + SHIMMER + SPARKLES) */}
                        <div className="relative group/btn w-full sm:w-auto shrink-0">
                            <Sparkle color="#fff176" style={{ top: '-4px', right: '40%' }} />
                            <Sparkle color="#fff176" style={{ bottom: '-4px', right: '10%', animationDelay: '0.2s' }} />
                            <button
                                onClick={() => window.open('/book-a-stand', '_blank')}
                                className="w-full sm:w-auto golden-btn-popup text-[#050A1A] flex items-center justify-center gap-1.5 px-5 py-2 text-[10px] sm:text-xs font-black uppercase rounded-lg shadow-md hover:scale-[1.02] transition whitespace-nowrap"
                            >
                                Book Your Stall →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MPSchemeHero;