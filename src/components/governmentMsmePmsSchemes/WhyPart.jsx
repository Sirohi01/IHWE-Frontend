import React from "react";
import { FileText } from "lucide-react";

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

const WhyPart = ({ onApplyClick }) => {
    const benefits = [
        {
            label: 'Significant reduction\nin exhibition cost',
            icon: (
                <img src="/mpscheme/why1.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
        {
            label: 'Access to national &\nInternational buyers',
            icon: (
                <img src="/mpscheme/why2.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
        {
            label: 'Government-supported\ncredibility',
            icon: (
                <img src="/mpscheme/why3.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
        {
            label: 'Increase brand\nvisibility',
            icon: (
                <img src="/mpscheme/why4.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
        {
            label: 'Expand your\nbusiness network',
            icon: (
                <img src="/mpscheme/why5.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
        {
            label: 'Boost sales &\ndistribution',
            icon: (
                <img src="/mpscheme/why6.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
    ];

    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
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

            {/* ── SECTION ONE: WHY PARTICIPATE ── */}
            {/* <div className='bg-white px-4 py-2 border border-[#e0e8d8] rounded-2xl mt-4 mb-4'>
                <div className="text-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wide">
                        Why Participate Under PMS Scheme?
                    </h2>
                    <div className="w-10 h-0.5 bg-[#1e5c1e] mx-auto mt-2 rounded-full" />
                </div>

                <div className="flex items-start">
                    {benefits.map((item, i) => (
                        <div key={i} className="flex items-stretch flex-1">

                            <div className="flex-1 flex flex-col items-center justify-start gap-3 px-1 py-1 text-center">
                                <div className="flex items-center justify-center h-14">
                                    {item.icon}
                                </div>
                                <p className="text-sm font-normal text-gray-600 leading-snug whitespace-pre-line">
                                    {item.label}
                                </p>
                            </div>

                            {i < benefits.length - 1 && (
                                <div className="w-px bg-gray-200 self-stretch mx-1" />
                            )}

                        </div>
                    ))}
                </div>
            </div> */}

            {/* ── SECTION TWO: HOW IT WORKS + DOCUMENTS ── */}
            <div className="w-full flex flex-col lg:flex-row gap-4 mt-4">

                {/* ── LEFT: HOW IT WORKS ── */}
                <div className="flex-[62] bg-white px-6 py-5 border border-[#e2e8f0] shadow-sm rounded-2xl flex flex-col group hover:shadow-md transition-all duration-300">
                    <h2 className="text-[14px] font-black text-[#051d40] uppercase tracking-wide mb-6">
                        How It Works?
                    </h2>

                    {/* Steps Row - responsive grid on small, flex row on medium+ */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-start justify-between relative gap-y-6 md:gap-y-0">

                        {/* Connecting line - hidden when steps are stacked into a grid */}
                        <div className="hidden md:block absolute top-[54px] left-[8%] right-[8%] h-px border-t-2 border-dashed border-gray-300 z-0" />

                        {[
                            {
                                num: 1,
                                title: 'Apply Online',
                                desc: 'Fill the PMS application form',
                                icon: (
                                    <img src="/mpscheme/how1.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                            {
                                num: 2,
                                title: 'Upload Documents',
                                desc: 'Submit all required documents online',
                                icon: (
                                    <img src="/mpscheme/how2.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                            {
                                num: 3,
                                title: 'MSME Verification',
                                desc: 'Documents verified by MSME',
                                icon: (
                                    <img src="/mpscheme/how3.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                            {
                                num: 4,
                                title: 'Stall Allocation',
                                desc: 'Stall will be allocated',
                                icon: (
                                    <img src="/mpscheme/how4.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                            {
                                num: 5,
                                title: 'Exhibit at IHWE',
                                desc: 'Participate in IHWE 2026',
                                icon: (
                                    <img src="/mpscheme/how5.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                            {
                                num: 6,
                                title: 'Claim Reimbursement',
                                desc: 'Get reimbursement after approval',
                                icon: (
                                    <img src="/mpscheme/how6.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col items-center relative z-10 flex-1">

                                <div className="relative mt-3">

                                    {/* Number badge — top right corner pe */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1e5c1e] text-white text-xs font-medium flex items-center justify-center z-10 shadow">
                                        {step.num}
                                    </div>

                                    {/* Circle with icon */}
                                    <div className="w-20 h-20 rounded-full bg-[#f0f5ec] border border-[#d0e4c0] flex items-center justify-center mt-0">
                                        {step.icon}
                                    </div>

                                </div>

                                {/* Title */}
                                <div className="text-sm font-base text-gray-900 text-center leading-snug mt-1 h-10 flex items-start justify-center w-full px-1">
                                    {step.title}
                                </div>

                                {/* Desc */}
                                <div className="text-xs text-gray-700 text-center leading-snug mt-2 min-h-[48px] flex items-start justify-center w-full px-1">
                                    {step.desc}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: DOCUMENTS REQUIRED ── */}
                <div className="flex-[38] bg-white px-6 py-5 border border-[#e2e8f0] shadow-sm rounded-2xl relative overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col">

                    {/* The floating Checklist Illustration - dimmed on mobile for readability */}
                    <div className="absolute bottom-2 -right-4 w-[140px] h-[140px] pointer-events-none z-0 opacity-10 sm:opacity-90 scale-100 group-hover:scale-105 transition-transform duration-700">
                        <img src="/msmepmsscheme/approved.png" className="w-full h-full object-contain" alt="" />
                    </div>

                    <div className="relative z-10 pr-4 sm:pr-[110px] flex-1 flex flex-col">
                        <h2 className="text-[14px] font-black text-[#051d40] uppercase tracking-wide mb-5">
                            Documents Required
                        </h2>

                        <div className="grid grid-cols-2 gap-x-3 gap-y-3 items-start flex-1 mt-1">
                            {[
                                'Udyam Registration Certificate',
                                'PAN Card',
                                'GST Certificate',
                                'Company Profile',
                                'Product / Service Details',
                                'Bank Account Details',
                                'Stall Booking Invoice',
                                'Product / Service Brochure',
                                'Other documents as may be required'
                            ].map((doc, i) => (
                                <div key={i} className="flex items-start gap-2 group/item">
                                    <div className="w-5 h-5 rounded bg-[#f0f9f0] border border-green-100 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-green-100 transition-colors">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m9 15 2 2 4-4"></path></svg>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#051d40] leading-tight tracking-tight pt-[2px]">{doc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* SECTION THREE - Responsive CTA strip */}
            <div className="w-full mb-4 mt-6 rounded-2xl bg-[#1e4d1e] flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 px-4 md:px-6 relative pt-5 md:pt-0 pb-5 md:pb-0">

                {/* Trophy Image — HIDDEN ON MOBILE to prevent messy overlapping */}
                <div className="hidden md:block shrink-0 z-10" style={{ marginBottom: 0, marginTop: '-44px' }}>
                    <img
                        src="/mpscheme/trofi1.png"
                        alt="Trophy"
                        className="w-28 h-36 object-contain object-bottom block"
                    />
                </div>

                {/* Text */}
                <div className="flex-1 z-10 md:py-2 text-center md:text-left">
                    <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                        Don't Miss This{' '}
                        <span className="text-[#f5a623]">Government-Supported Opportunity!</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-200 mt-1 leading-relaxed">
                        Exhibit at IHWE 2026 and take your business to the next level with financial support under the MSME PMS Scheme.
                    </p>
                </div>

                {/* Buttons - Full width stack on mobile */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shrink-0 z-10 py-2 md:py-5 w-full md:w-auto">
                    {/* Apply for PMS Scheme */}
                    <div className="relative group/btn w-full sm:w-auto shrink-0">
                        <Sparkle color="#fff176" style={{ top: '-4px', left: '10%' }} />
                        <Sparkle color="#fff176" style={{ bottom: '-4px', right: '15%', animationDelay: '0.4s' }} />
                        <button
                            onClick={onApplyClick}
                            className="w-full sm:w-auto orange-btn-popup text-white flex items-center justify-center gap-1.5 px-5 py-2 text-[10px] sm:text-xs font-black uppercase rounded-lg shadow-md hover:scale-[1.02] transition whitespace-nowrap cursor-pointer"
                        >
                            Apply for PMS Scheme →
                        </button>
                    </div>

                    {/* Book Your Stall */}
                    <div className="relative group/btn w-full sm:w-auto shrink-0">
                        <Sparkle color="#fff176" style={{ top: '-4px', right: '40%' }} />
                        <Sparkle color="#fff176" style={{ bottom: '-4px', right: '10%', animationDelay: '0.2s' }} />
                        <button
                            onClick={() => window.open('/book-a-stand', '_blank')}
                            className="w-full sm:w-auto golden-btn-popup text-[#050A1A] flex items-center justify-center gap-1.5 px-5 py-2 text-[10px] sm:text-xs font-black uppercase rounded-lg shadow-md hover:scale-[1.02] transition whitespace-nowrap cursor-pointer"
                        >
                            Book Your Stall →
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default WhyPart;