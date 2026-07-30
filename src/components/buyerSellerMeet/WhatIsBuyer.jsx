import React from 'react'
import SectionContainer from "@/components/layout/SectionContainer";

const features = [
    {
        title: "PRE-SCHEDULED\nONE-TO-ONE MEETINGS",
        desc: "Well-matched meetings as per your business interests.",
        icon: (
            <img loading="lazy" decoding="async" src="/bsmeet/what1.webp" alt="Pre-Scheduled Meetings" className="w-full h-full object-contain p-2.5" />
        ),
    },
    {
        title: "VERIFIED BUYER\nPROFILES",
        desc: "Connect with genuine buyers for quality business.",
        icon: (
            <img loading="lazy" decoding="async" src="/bsmeet/what2.webp" alt="Verified Profiles" className="w-full h-full object-contain p-2.5" />
        ),
    },
    {
        title: "FOCUSED BUSINESS\nDISCUSSIONS",
        desc: "Have productive conversations that lead to real outcomes.",
        icon: (
            <img loading="lazy" decoding="async" src="/bsmeet/what3.webp" alt="Focused Discussions" className="w-full h-full object-contain p-2.5" />
        ),
    },
    {
        title: "ACCESS TO NEW MARKETS,\nCHANNELS & PARTNERSHIPS",
        desc: "Expand your reach and build strong partnerships.",
        icon: (
            <img loading="lazy" decoding="async" src="/bsmeet/what4.webp" alt="New Markets" className="w-full h-full object-contain p-2.5" />
        ),
    },
    {
        title: "REAL OPPORTUNITIES\nFOR GROWTH",
        desc: "Generate leads, explore opportunities and close deals.",
        icon: (
            <img loading="lazy" decoding="async" src="/bsmeet/what5.webp" alt="Real Opportunities" className="w-full h-full object-contain p-2.5" />
        ),
    },
]

const WhatIsBuyer = () => {
    return (
        <div className="relative overflow-hidden py-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bsmeet/whatbg.webp')", backgroundColor: '#f5f8f0', fontFamily: "'Barlow', sans-serif" }}>
            <SectionContainer className="relative z-10">
                <div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-10 items-stretch">
                    
                    {/* Left Text Column */}
                    <div className='w-full lg:w-[32%] flex flex-col items-center lg:items-start text-center lg:text-left'>
                        {/* Heading */}
                        <h2 className='text-xl md:text-2xl font-bold text-[#1a3d20] uppercase tracking-wider'>
                            WHAT IS BUYER<span style={{ color: '#3a8c2f' }}>–</span>SELLER MEET?
                        </h2>

                        {/* Separator */}
                        <div className="flex items-center justify-center lg:justify-start gap-3 my-4 w-full">
                            <div style={{ width: '60px', height: '1.5px', background: '#b0c890' }} />
                            <div style={{ width: '7px', height: '7px', background: '#3a8c2f', transform: 'rotate(45deg)' }} />
                            <div style={{ width: '60px', height: '1.5px', background: '#b0c890' }} />
                        </div>

                        {/* Tagline */}
                        <p className='text-sm text-center lg:text-left text-[#4a5a40] leading-relaxed max-w-2xl'>
                            Buyer–Seller Meet is a premium B2B networking platform at International Health & Wellness Expo 2026, designed to connect exhibitors with genuine, pre-verified buyers from the health, wellness, Ayurveda, fitness, organic, nutraceutical, beauty, and healthcare industries. <br /><br />
                            This curated business matchmaking initiative enables direct meetings with distributors, retailers, importers, wholesalers, wellness chains, hospitals, and key decision-makers — helping brands generate quality leads, expand business networks, and create new growth opportunities.
                        </p>
                    </div>

                    {/* Feature Cards Column */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row items-stretch lg:w-[65%] w-full gap-6 lg:gap-0 mt-8 lg:mt-0">
                        {features.map((feat, i) => (
                            <React.Fragment key={i}>
                                {/* Card */}
                                <div className="flex-1 flex flex-col items-center text-center gap-3 p-4 bg-white/40 lg:bg-transparent rounded-2xl border border-white/30 lg:border-none shadow-sm lg:shadow-none transition-all">
                                    <div className="flex items-center justify-center rounded-full shadow-sm shrink-0"
                                        style={{ width: '74px', height: '74px', border: '2px solid #b0c890', background: '#fff' }}>
                                        {feat.icon}
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#1a3d20', textTransform: 'uppercase', letterSpacing: '0.4px', lineHeight: 1.4, whiteSpace: 'pre-line' }} className="mt-1">
                                        {feat.title}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#5a7050', lineHeight: 1.55 }}>
                                        {feat.desc}
                                    </div>
                                </div>

                                {/* Vertical divider — HIDDEN ON MOBILE */}
                                {i < features.length - 1 && (
                                    <div className="hidden lg:block self-stretch w-px bg-[#d4e4bc] my-4 shrink-0" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                </div>
            </SectionContainer>
        </div>
    )
}

export default WhatIsBuyer