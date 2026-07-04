import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBuilding, FaGlobe, FaCalendarAlt, FaHandshake, FaRocket, FaMapMarkerAlt } from "react-icons/fa";
import { useInView, animate } from "framer-motion";
import SectionContainer from "../layout/SectionContainer";
import { settingsApi, SERVER_URL } from "../../lib/api";

// Sparkle component
const Sparkle = ({ style, color = '#5ef5e0', shadowColor = '#0A7C6E' }) => (
    <span
        style={{
            position: 'absolute',
            pointerEvents: 'none',
            fontSize: '12px',
            color: color,
            textShadow: `0 0 6px ${shadowColor}, 0 0 12px ${color}`,
            animation: 'sparkleAnim 1.6s ease-in-out infinite',
            opacity: 0,
            zIndex: 20,
            ...style,
        }}
    >
        ✦
    </span>
);

// StatCounter component
const StatCounter = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Only count up if the string starts with a digit (e.g. "8,000+", "3", etc.)
    const isNumeric = /^[0-9]/.test(value);
    if (!isNumeric) {
        return <span ref={ref}>{value}</span>;
    }

    const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9,]/g, '');

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, numericValue, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(v) {
                    setDisplayValue(Math.floor(v));
                },
            });
            return () => controls.stop();
        }
    }, [isInView, numericValue]);

    return (
        <span ref={ref}>
            {displayValue.toLocaleString()}{suffix}
        </span>
    );
};

const WhyVisitHero = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await settingsApi.get();
                if (data) setSettings(data);
            } catch (error) {
                console.error("Failed to load settings in WhyVisitHero:", error);
            }
        };
        fetchSettings();
    }, []);

    const stats = [
        { icon: <FaUsers />, num: '8,000+', label: 'Visitors / Delegates' },
        { icon: <FaBuilding />, num: '150+', label: 'Exhibitors' },
        { icon: <FaGlobe />, num: '1,000+', label: 'Global Buyers' },
        { icon: <FaCalendarAlt />, num: '3', label: 'Power-Packed Days' },
        { icon: <FaHandshake />, num: 'B2B', label: 'Matchmaking' },
        { icon: <FaRocket />, num: 'Live', label: 'Product Launches' },
    ];

    return (
        <div className="w-full overflow-hidden">
            {/* Styles */}
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
                .teal-btn-hero {
                    background: linear-gradient(135deg, #0A7C6E 0%, #0db39e 40%, #0A7C6E 100%);
                    background-size: 200% 200%;
                    animation: goldShift 2.5s ease infinite;
                    box-shadow: 0 0 16px 4px rgba(10,124,110,0.45), 0 4px 20px rgba(13,179,158,0.35);
                    position: relative;
                    overflow: hidden;
                }
                .teal-btn-hero::before {
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
                .blue-btn-hero {
                    background: linear-gradient(135deg, #28396C 0%, #3d528f 30%, #1e2a50 60%, #28396C 100%);
                    background-size: 200% 200%;
                    animation: goldShift 2.5s ease infinite;
                    box-shadow: 0 0 16px 4px rgba(40,57,108,0.3), 0 4px 15px rgba(40,57,108,0.25);
                    position: relative;
                    overflow: hidden;
                }
                .blue-btn-hero::before {
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
            `}</style>

            {/* Hero Section */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat min-h-[400px] md:h-[460px] flex flex-col justify-center"
                style={{ backgroundImage: "url('/whyVisit/bg.webp')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/80 md:bg-white/10" />

                <SectionContainer className="relative z-10">

                    {/* Top Bar */}
                    <div className="flex items-center gap-5 py-4 ">
                        <div className="flex items-center gap-2">
                            {/* <img src="/whyVisit/logo1.png" alt="IHWE" className="h-24 object-contain" /> */}
                            <div>
                                <p className="text-lg font-semibold uppercase tracking-wider text-[#011630] leading-tight">International</p>
                                <p className="text-lg font-semibold uppercase tracking-wider text-[#185653] leading-tight">Health & Wellness</p>
                                <p className="text-lg font-semibold uppercase text-[#011630] leading-tight">Expo 2026</p>
                                <span className="text-sm font-medium uppercase tracking-widest bg-[#011630] text-white px-2 py-0.5 rounded-sm inline-block mt-0.5">
                                    Global Edition
                                </span>
                            </div>
                        </div>
                        <div className="w-[1.5px] h-24 bg-gray-500 " />
                        <div>
                            <p className="text-lg font-semibold text-[#011630] leading-tight">Collaborate.</p>
                            <p className="text-lg font-semibold text-[#185653] leading-tight">Connect.</p>
                            <p className="text-lg font-semibold text-[#83561F] leading-tight">Grow Together.</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex w-full">

                        {/* Left */}
                        <div className="w-full pt-3 pb-4 flex flex-col gap-4">

                            {/* Heading */}
                            <div>
                                <h1 className="text-5xl font-black text-[#1a3d1a] uppercase leading-none">Why Visit</h1>
                                <h1 className="text-5xl font-black text-[#739b20] uppercase leading-none">IHWE 2026</h1>
                                <div
                                    className="inline-block border border-[#c8a84b] text-[#8b6914] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded mt-2"
                                    style={{ background: 'rgba(200,168,75,0.08)' }}
                                >
                                    Global Edition
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-black font-semibold md:font-medium leading-relaxed max-w-sm">
                                Discover innovations, connect with global brands,
                                explore emerging wellness trends, and unlock new
                                business opportunities — all under one roof.
                            </p>
                            <div className="flex flex-col lg:flex-row w-full lg:items-center gap-6 mt-0">
                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative group/btn w-full sm:w-auto">
                                        {/* Teal Sparkles */}
                                        <Sparkle color="#5ef5e0" shadowColor="#0A7C6E" style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
                                        <Sparkle color="#5ef5e0" shadowColor="#0A7C6E" style={{ top: '-12px', left: '40%', animationDelay: '0.4s' }} />
                                        <Sparkle color="#5ef5e0" shadowColor="#0A7C6E" style={{ top: '-8px', right: '15%', animationDelay: '0.8s' }} />
                                        <Sparkle color="#5ef5e0" shadowColor="#0A7C6E" style={{ bottom: '-10px', left: '25%', animationDelay: '0.2s' }} />
                                        <Sparkle color="#5ef5e0" shadowColor="#0A7C6E" style={{ bottom: '-12px', right: '30%', animationDelay: '0.6s' }} />

                                        <button
                                            onClick={() => window.open('/visitor-registration', '_blank')}
                                            className="teal-btn-hero flex items-center justify-center gap-2 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-lg transition whitespace-nowrap w-full hover:scale-[1.02]"
                                        >
                                            Register as Visitor
                                            <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                                                <svg className="w-2.5 h-2.5 text-[#0A7C6E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                    <div className="relative group/btn w-full sm:w-auto">
                                        {/* Blue Sparkles */}
                                        <Sparkle color="#3d528f" shadowColor="#28396C" style={{ top: '-10px', left: '10%', animationDelay: '0.1s' }} />
                                        <Sparkle color="#3d528f" shadowColor="#28396C" style={{ top: '-12px', left: '40%', animationDelay: '0.5s' }} />
                                        <Sparkle color="#3d528f" shadowColor="#28396C" style={{ top: '-8px', right: '15%', animationDelay: '0.9s' }} />
                                        <Sparkle color="#3d528f" shadowColor="#28396C" style={{ bottom: '-10px', left: '25%', animationDelay: '0.3s' }} />
                                        <Sparkle color="#3d528f" shadowColor="#28396C" style={{ bottom: '-12px', right: '30%', animationDelay: '0.7s' }} />

                                        <button 
                                            onClick={() => window.open(settings?.downloadBrochurePdf ? `${SERVER_URL}${settings.downloadBrochurePdf}` : '/pdf.pdf', '_blank')} 
                                            className="blue-btn-hero flex items-center justify-center gap-1.5 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-lg transition whitespace-nowrap w-full hover:scale-[1.02]"
                                        >
                                            Download Brochure
                                            <svg className="w-3 h-3 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Stats have been moved outside the hero banner */}
                            </div>
                        </div>

                    </div>
                </SectionContainer>
            </div>

            {/* OVERLAPPING STATS BAND */}
            <div className="relative z-20 -mt-6 md:-mt-8 mb-8">
                <SectionContainer>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:items-center lg:justify-between gap-y-4 gap-x-3 lg:gap-2 px-4 py-4 lg:px-6 lg:py-4 rounded-xl bg-[#011630] w-full" style={{boxShadow: '0 8px 20px -10px rgba(0,0,0,0.3)'}}>
                        {stats.map((stat, i) => (
                            <div key={i} className="flex items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#a8d060] shrink-0 text-[20px] lg:text-[25px]">{stat.icon}</span>
                                    <div className="min-w-0">
                                        <p className="text-white font-bold text-xs lg:text-sm leading-none">
                                            <StatCounter value={stat.num} />
                                        </p>
                                        <p className="text-white text-[8.5px] lg:text-[9px] uppercase tracking-wide leading-tight mt-0.5 whitespace-nowrap">{stat.label}</p>
                                    </div>
                                </div>
                                {i < stats.length - 1 && (
                                    <div className="hidden lg:block w-px h-8 bg-gray-600 ml-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </SectionContainer>
            </div>

        </div>
    );
};

export default WhyVisitHero;