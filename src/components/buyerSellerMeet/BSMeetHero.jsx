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
            {/* GREEN OVERLAY */}
            {/* <div className="absolute inset-0 bg-green-200/10"></div> */}

            <SectionContainer className="relative z-10 py-10">
                <div className="flex justify-between w-full gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div className="w-[40%]">
                        <h2 className="text-2xl md:text-4xl mt-4 font-bold text-green-900 leading-tight">
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
                        </div>

                        {/* DATE & LOCATION BAR - STRAIGHT LINE */}
                        <div className="inline-flex flex-row items-center overflow-hidden rounded-xl mt-12 border-2 border-[#c8d8b0] bg-[#edf2e4] w-fit shadow-md">
                            <div className="flex items-center gap-3 px-6 md:px-10 py-3 md:py-2.5 text-[13px] md:text-[15px] font-bold text-[#1a3d20] uppercase whitespace-nowrap">
                                <FaCalendarAlt size={18} className="text-green-700" />
                                21 - 23 AUGUST 2026
                            </div>

                            <div className="w-[1.5px] h-8 bg-[#c0d4a8]" />

                            <div className="flex items-center gap-3 px-10 py-1 "
                                style={{ fontSize: "15px", fontWeight: 500, color: "#1a3d20", textTransform: "uppercase" }}>

                                <FaMapMarkerAlt size={20} color="#1a3d20" />
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