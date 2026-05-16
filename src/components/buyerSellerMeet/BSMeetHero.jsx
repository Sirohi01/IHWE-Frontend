import { FaCalendarAlt, FaMapMarkerAlt, FaUserTie, FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SectionContainer from "@/components/layout/SectionContainer";
import { ArrowRight } from "lucide-react";

// Sparkle component
const Sparkle = ({ style, color = '#5ef5e0', shadowColor = '#0A7C6E' }) => (
    <span
        style={{
            position: 'absolute',
            pointerEvents: 'none',
            fontSize: '16px',
            color: color,
            textShadow: `0 0 8px ${shadowColor}, 0 0 15px ${color}, 0 0 25px ${color}`,
            animation: 'sparkleAnim 1.8s ease-in-out infinite',
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
            className="w-full bg-cover relative bg-no-repeat bg-center"
            style={{
                backgroundImage: "url('/bsmeet/bg4.png')"
            }}
        >
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
                    50%  { opacity: 1; transform: scale(1.5) translateY(-15px); }
                    100% { opacity: 0; transform: scale(0.8) translateY(-30px); }
                }
                .navy-btn-bsm {
                    background: linear-gradient(135deg, #093C5D 0%, #0d5585 40%, #093C5D 100%);
                    background-size: 200% 200%;
                    animation: goldShift 2.5s ease infinite;
                    box-shadow: 0 10px 30px -5px rgba(0,0,0,0.4), 0 0 20px rgba(9,60,93,0.2);
                    position: relative;
                    overflow: hidden;
                }
                .navy-btn-bsm::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -75%;
                    width: 50%;
                    height: 200%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent);
                    transform: skewX(-20deg);
                    animation: shimmer 2s infinite;
                }
                .teal-btn-bsm {
                    background: linear-gradient(135deg, #0A7C6E 0%, #0db39e 40%, #0A7C6E 100%);
                    background-size: 200% 200%;
                    animation: goldShift 2.5s ease infinite;
                    box-shadow: 0 10px 30px -5px rgba(0,0,0,0.4), 0 0 20px rgba(10,124,110,0.2);
                    position: relative;
                    overflow: hidden;
                }
                .teal-btn-bsm::before {
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

            <SectionContainer className="relative z-10 py-10 md:py-20">
                <div className="flex flex-col md:flex-row justify-between w-full gap-8 md:gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div className="w-full md:w-[60%] text-left">
                        <h2 className="text-xl md:text-3xl mt-2 md:mt-4 font-bold text-green-900 leading-tight">
                            IHWE 2026
                        </h2>
                        <h2 className="text-3xl md:text-6xl font-extrabold text-green-900 leading-tight">
                            BUYER–SELLER <br />
                            <span style={{ color: '#739b20' }}>MEET 2026</span>
                        </h2>

                        <p className="mt-4 text-base md:text-xl text-green-800 font-bold uppercase tracking-tight">
                            CONNECTING BRANDS WITH VERIFIED BUYERS <br className="hidden md:block" />
                            FOR REAL BUSINESS GROWTH
                        </p>

                        <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0 font-medium">
                            International Health & Wellness Expo 2026 brings a curated B2B networking platform where manufacturers, brands,
                            distributors and institutional buyers meet for meaningful collaborations, market expansion and faster deal closures.
                        </p>

                        {/* BUTTONS */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-10">
                            {/* REGISTER AS BUYER */}
                            <div className="relative group/btn">
                                <div className="hidden md:block">
                                    <Sparkle style={{ top: '-8px', left: '10%', animationDelay: '0s' }} />
                                    <Sparkle style={{ top: '-10px', left: '40%', animationDelay: '0.4s' }} />
                                    <Sparkle style={{ top: '-6px', right: '15%', animationDelay: '0.8s' }} />
                                    <Sparkle style={{ bottom: '-8px', left: '25%', animationDelay: '0.2s' }} />
                                    <Sparkle style={{ bottom: '-10px', right: '30%', animationDelay: '0.6s' }} />
                                </div>
                                <button
                                    onClick={() => window.open('/buyer-registration', '_blank')}
                                    className="teal-btn-bsm flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-md transition-all relative z-10 hover:scale-[1.03] border-none"
                                >
                                    <FaUserTie className="text-base text-white" />
                                    <span className="text-white font-black text-[11px] md:text-[12px] uppercase tracking-wider">REGISTER AS BUYER</span>
                                    <div className="w-4.5 h-4.5 bg-white rounded-full flex items-center justify-center ml-1">
                                        <ArrowRight size={13} className="text-[#0A7C6E]" />
                                    </div>
                                </button>
                            </div>

                            {/* REGISTER AS SELLER */}
                            <div className="relative group/btn">
                                <div className="hidden md:block">
                                    <Sparkle color="#57c1ff" shadowColor="#093C5D" style={{ top: '-8px', left: '10%', animationDelay: '0s' }} />
                                    <Sparkle color="#57c1ff" shadowColor="#093C5D" style={{ top: '-10px', left: '40%', animationDelay: '0.4s' }} />
                                    <Sparkle color="#57c1ff" shadowColor="#093C5D" style={{ top: '-6px', right: '15%', animationDelay: '0.8s' }} />
                                    <Sparkle color="#57c1ff" shadowColor="#093C5D" style={{ bottom: '-8px', left: '25%', animationDelay: '0.2s' }} />
                                    <Sparkle color="#57c1ff" shadowColor="#093C5D" style={{ bottom: '-10px', right: '30%', animationDelay: '0.6s' }} />
                                </div>
                                <button
                                    onClick={() => window.open('/exhibitor-login', '_blank')}
                                    className="navy-btn-bsm flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-md transition-all relative z-10 hover:scale-[1.03] border-none"
                                >
                                    <FaStore className="text-base text-white" />
                                    <span className="text-white font-black text-[11px] md:text-[12px] uppercase tracking-wider">REGISTER AS SELLER</span>
                                    <ArrowRight size={15} className="text-white ml-1" />
                                </button>
                            </div>
                        </div>

                        {/* DATE & LOCATION BAR - STRAIGHT LINE */}
                        <div className="inline-flex flex-row items-center overflow-hidden rounded-xl mt-12 border-2 border-[#c8d8b0] bg-[#edf2e4] w-fit shadow-md">
                            <div className="flex items-center gap-3 px-6 md:px-10 py-3 md:py-2.5 text-[13px] md:text-[15px] font-bold text-[#1a3d20] uppercase whitespace-nowrap">
                                <FaCalendarAlt size={18} className="text-green-700" />
                                21 - 23 AUGUST 2026
                            </div>

                            <div className="w-[1.5px] h-8 bg-[#c0d4a8]" />

                            <div className="flex items-center gap-3 px-6 md:px-10 py-3 md:py-2.5 text-[13px] md:text-[15px] font-bold text-[#1a3d20] uppercase whitespace-nowrap">
                                <FaMapMarkerAlt size={18} className="text-green-700" />
                                <span>PRAGATI MAIDAN, NEW DELHI, INDIA</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block w-[35%]">
                        {/* Optional content */}
                    </div>

                </div>
            </SectionContainer>
        </div>
    )
}

export default BSMeetHero