import { useNavigate } from "react-router-dom";
import { FaUsers, FaBuilding, FaGlobe, FaCalendarAlt, FaHandshake, FaRocket, FaMapMarkerAlt } from "react-icons/fa";
import SectionContainer from "../layout/SectionContainer";

const WhyVisitHero = () => {
    const navigate = useNavigate();

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

            {/* Hero Section */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/whyVisit/bg.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/10" />

                <SectionContainer className="relative z-10">

                    {/* Top Bar */}
                    <div className="flex items-center gap-5 py-4 ">
                        <div className="flex items-center gap-2">
                            <img src="/whyVisit/logo1.png" alt="IHWE" className="h-24 object-contain" />
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
                            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                                Discover innovations, connect with global brands,
                                explore emerging wellness trends, and unlock new
                                business opportunities — all under one roof.
                            </p>
                            <div className="flex flex-col lg:flex-row justify-between w-full lg:items-center gap-6 mt-4">
                                {/* Buttons */}
                                <div className="flex flex-col lg:flex-row gap-3">
                                    <button
                                        onClick={() => window.open('/buyer-registration', '_blank')}
                                        className="flex items-center gap-2 bg-[#2d6a1f] text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-[#245518] transition whitespace-nowrap"
                                    >
                                        Register as Visitor
                                        <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3 text-[#2d6a1f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M13 6l6 6-6 6" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button className="flex items-center gap-2 bg-white text-gray-700 text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 transition whitespace-nowrap">
                                        Download Brochure
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-between gap-2 px-6 py-4 rounded-[10px] bg-[#011630]">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="flex items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#a8d060]" style={{ fontSize: "25px" }}>{stat.icon}</span>
                                                <div>
                                                    <p className="text-white font-black text-sm leading-none">{stat.num}</p>
                                                    <p className="text-gray-400 text-[9px] uppercase tracking-wide leading-tight mt-0.5 whitespace-nowrap">{stat.label}</p>
                                                </div>
                                            </div>
                                            {i < stats.length - 1 && (
                                                <div className="hidden lg:block w-px h-8 bg-gray-600 ml-4" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </SectionContainer>
            </div>

        </div>
    );
};

export default WhyVisitHero;