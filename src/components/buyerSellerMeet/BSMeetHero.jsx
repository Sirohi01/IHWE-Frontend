import { FaCalendarAlt, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SectionContainer from "@/components/layout/SectionContainer";
import { ArrowRight } from "lucide-react";

// ── Maroon Sparkle component ──
const MaroonSparkle = ({ style }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '11px',
      color: '#ff6b7a',
      textShadow: '0 0 5px #5E0006, 0 0 10px #a0000a, 0 0 18px rgba(94,0,6,0.9)',
      animation: 'maroonSparkleAnim 1.8s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

const BSMeetHero = () => {
    const navigate = useNavigate();

    return (
        <div
            className="w-full bg-cover relative bg-no-repeat bg-center font-['Barlow',sans-serif] overflow-visible z-10"
            style={{
                backgroundImage: "url('/bsmeet/bg4.png')"
            }}
        >
            {/* Background white overlay for mobile readability */}
            <div className="absolute inset-0 bg-white/90 md:bg-transparent z-0 pointer-events-none" />

            {/* Global styles for B2B Maroon Button & Sweeps */}
            <style>{`
                @keyframes maroonShimmer {
                  0%   { background-position: 0% 50%; }
                  50%  { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                @keyframes maroonSweep {
                  0%   { left: -75%; }
                  100% { left: 150%; }
                }
                @keyframes maroonSparkleAnim {
                  0%   { opacity: 0; transform: scale(0.5) translateY(0); }
                  40%  { opacity: 1; transform: scale(1.3) translateY(-5px); }
                  80%  { opacity: 0.6; transform: scale(0.9) translateY(-8px); }
                  100% { opacity: 0; transform: scale(0.5) translateY(-11px); }
                }

                .b2b-maroon-btn {
                  position: relative;
                  overflow: hidden;
                  background: linear-gradient(
                    135deg,
                    #3a0004 0%,
                    #5E0006 25%,
                    #8b000b 50%,
                    #5E0006 75%,
                    #3a0004 100%
                  );
                  background-size: 200% 200%;
                  animation: maroonShimmer 2.5s ease infinite;
                  border: 1.5px solid #c0000f;
                  box-shadow:
                    0 0 16px 4px rgba(94,0,6,0.45),
                    0 4px 15px rgba(94,0,6,0.35),
                    0 1px 2px rgba(220,60,70,0.35) inset,
                    0 -1px 2px rgba(30,0,2,0.25) inset;
                  transition: filter 0.2s, transform 0.15s;
                }
                .b2b-maroon-btn::before {
                  content: '';
                  position: absolute;
                  top: -50%;
                  left: -75%;
                  width: 50%;
                  height: 200%;
                  background: linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent);
                  transform: skewX(-20deg);
                  animation: maroonSweep 2.2s infinite;
                }
                .b2b-maroon-btn:hover {
                  filter: brightness(1.12);
                  transform: translateY(-1px);
                  box-shadow:
                    0 0 24px 6px rgba(94,0,6,0.55),
                    0 6px 20px rgba(94,0,6,0.4),
                    0 1px 3px rgba(240,80,90,0.4) inset,
                    0 -1px 3px rgba(30,0,2,0.3) inset;
                }
                .b2b-maroon-btn:active {
                  transform: translateY(0px);
                  filter: brightness(0.96);
                }
                .b2b-maroon-btn .btn-text {
                  font-weight: 800;
                  font-size: 11px;
                  letter-spacing: 0.14em;
                  text-transform: uppercase;
                  color: #fff;
                  text-shadow: 0 1px 2px rgba(30,0,2,0.6);
                  position: relative;
                  z-index: 1;
                }
                .b2b-maroon-btn .btn-icon {
                  color: #fff;
                  position: relative;
                  z-index: 1;
                }
                .b2b-maroon-btn .btn-arrow {
                  color: #fff;
                  transition: transform 0.2s;
                  position: relative;
                  z-index: 1;
                }
                .b2b-maroon-btn:hover .btn-arrow {
                  transform: translateX(3px);
                }
                .group\\/btn:hover .b2b-maroon-btn {
                  filter: brightness(1.12);
                  transform: translateY(-1px);
                }
            `}</style>

            <SectionContainer className="relative z-10 py-10">
                <div className="flex flex-col md:flex-row justify-between w-full gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div className="w-full md:w-[60%] lg:w-[50%] flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="text-2xl md:text-4xl mt-4 font-bold text-green-900 leading-tight">
                            IHWE 2026

                        </h2>
                        <h2 className="text-3xl md:text-6xl font-extrabold text-green-900 leading-tight mt-1">
                            BUYER–SELLER <br />
                            <span style={{ color: '#739b20' }}>MEET 2026</span>
                        </h2>

                        <p className="mt-4 text-sm md:text-xl text-green-800 font-bold uppercase tracking-tight max-w-lg">
                            CONNECTING BRANDS WITH VERIFIED BUYERS <br className="hidden md:block" />
                            FOR REAL BUSINESS GROWTH
                        </p>

                        <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed max-w-xl font-medium">
                            International Health & Wellness Expo 2026 brings a curated B2B networking platform where manufacturers, brands,
                            distributors and institutional buyers meet for meaningful collaborations, market expansion and faster deal closures.
                        </p>

                        {/* BUTTONS */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-10 w-full md:w-auto">
                            {/* REGISTER AS BUYER */}
                            <div className="relative group/btn w-full sm:w-auto shrink-0 flex justify-center md:justify-start">
                                {/* Maroon Sparkles */}
                                <MaroonSparkle style={{ top: '-8px', left: '10%', animationDelay: '0s' }} />
                                <MaroonSparkle style={{ top: '-10px', left: '40%', animationDelay: '0.4s' }} />
                                <MaroonSparkle style={{ top: '-6px', right: '15%', animationDelay: '0.8s' }} />
                                <MaroonSparkle style={{ bottom: '-8px', left: '25%', animationDelay: '0.2s' }} />
                                <MaroonSparkle style={{ bottom: '-10px', right: '30%', animationDelay: '0.6s' }} />
                                
                                <button
                                    onClick={() => window.open('/buyer-registration', '_blank')}
                                    className="b2b-maroon-btn flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl transition-all relative z-10"
                                >
                                    <FaUserTie className="btn-icon text-sm text-white shrink-0" />
                                    <span className="btn-text whitespace-nowrap">REGISTER AS BUYER</span>
                                    <ArrowRight className="btn-arrow w-4 h-4 text-white shrink-0" />
                                </button>
                            </div>
                        </div>

                        {/* DATE & LOCATION BAR - RESPONSIVE */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center overflow-hidden rounded-xl mt-8 md:mt-12 border-2 border-[#c8d8b0] bg-[#edf2e4] w-full sm:w-fit shadow-md">
                            <div className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-2.5 text-xs sm:text-[14px] font-bold text-[#1a3d20] uppercase whitespace-nowrap justify-center sm:justify-start">
                                <FaCalendarAlt size={16} className="text-green-700 shrink-0" />
                                21 - 23 AUGUST 2026
                            </div>

                            <div className="hidden sm:block w-[1.5px] h-8 bg-[#c0d4a8]" />
                            <div className="block sm:hidden h-[1px] bg-[#c0d4a8] w-full" />

                            <div className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-2.5 text-xs sm:text-[14px] font-bold text-[#1a3d20] uppercase justify-center sm:justify-start">
                                <FaMapMarkerAlt size={18} className="text-[#1a3d20] shrink-0" />
                                <span className="text-center sm:text-left whitespace-nowrap">PRAGATI MAIDAN, NEW DELHI, INDIA</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE EMPTY (optional ya kuch aur add kar sakte ho) */}
                    {/* <div className="relative w-[45%]">
                   
                        <img src="/bsmeet/bsmeetRight3.png" alt="Buyer Seller Meet" className="mix-blend-multiply bg-transparent object-contain w-full h-auto" />
                        
                        <a
                            href="https://wa.me/919220408160"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 right-60 z-10 cursor-pointer hover:scale-110 transition-transform duration-300 drop-shadow-xl hover:drop-shadow-2xl"
                        >
                            <img src="/bsmeet/bsherob.png" alt="WhatsApp Chat" className="w-24 h-24 object-contain" />
                        </a>
                    </div> */}

                </div>
            </SectionContainer>
        </div>
    )
}

export default BSMeetHero;