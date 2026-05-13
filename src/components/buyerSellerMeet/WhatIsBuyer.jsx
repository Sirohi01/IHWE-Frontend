import React from 'react'
import SectionContainer from "@/components/layout/SectionContainer";

const features = [
    {
        title: "PRE-SCHEDULED\nONE-TO-ONE MEETINGS",
        desc: "Well-matched meetings as per your business interests.",
        icon: (
            <img src="/bsmeet/what1.png" alt="Pre-Scheduled Meetings" className="w-full h-full object-contain p-2.5" />
        ),
    },
    {
        title: "VERIFIED BUYER\nPROFILES",
        desc: "Connect with genuine buyers for quality business.",
        icon: (
            <img src="/bsmeet/what2.png" alt="Verified Profiles" className="w-full h-full object-contain p-2.5" />
        ),
    },
    {
        title: "FOCUSED BUSINESS\nDISCUSSIONS",
        desc: "Have productive conversations that lead to real outcomes.",
        icon: (
            <img src="/bsmeet/what3.png" alt="Focused Discussions" className="w-full h-full object-contain p-2.5" />
        ),
    },
    {
        title: "ACCESS TO NEW MARKETS,\nCHANNELS & PARTNERSHIPS",
        desc: "Expand your reach and build strong partnerships.",
        icon: (
            <img src="/bsmeet/what4.png" alt="New Markets" className="w-full h-full object-contain p-2.5" />
        ),
    },
    {
        title: "REAL OPPORTUNITIES\nFOR GROWTH",
        desc: "Generate leads, explore opportunities and close deals.",
        icon: (
            <img src="/bsmeet/what5.png" alt="Real Opportunities" className="w-full h-full object-contain p-2.5" />
        ),
    },
]

const WhatIsBuyer = () => {
    return (
        <div className="relative overflow-hidden py-2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bsmeet/whatbg.png')", backgroundColor: '#f5f8f0', fontFamily: "'Barlow', sans-serif" }}>

            <div className={`flex justify-between w-full ${SectionContainer}`}>
                {/* text  data  */}
                <div className='w-[35%]'>
                    {/* Heading */}
                    <h2 className='text-xl font-medium' style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a3d20', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'start', }}>
                        WHAT IS BUYER<span style={{ color: '#3a8c2f' }}>–</span>SELLER MEET?
                    </h2>

                    {/* Separator */}
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div style={{ width: '60px', height: '1.5px', background: '#b0c890' }} />
                        <div style={{ width: '7px', height: '7px', background: '#3a8c2f', transform: 'rotate(45deg)' }} />
                        <div style={{ width: '60px', height: '1.5px', background: '#b0c890' }} />
                    </div>

                    {/* Tagline */}
                    <p className='text-sm text-center mx-auto mb-4 text-[#4a5a40] text-start'>
                        Buyer–Seller Meet is a premium B2B networking platform at International Health & Wellness Expo 2026, designed to connect exhibitors with genuine, pre-verified buyers from the health, wellness, Ayurveda, fitness, organic, nutraceutical, beauty, and healthcare industries. <br /><br />
                        This curated business matchmaking initiative enables direct meetings with distributors, retailers, importers, wholesalers, wellness chains, hospitals, and key decision-makers — helping brands generate quality leads, expand business networks, and create new growth opportunities.
                    </p>

                </div>

                {/* Feature Cards */}
                <div className="flex items-start w-[65%]">
                    {features.map((feat, i) => (
                        <React.Fragment key={i}>
                            {/* Card — no border */}
                            <div className="flex-1 flex flex-col items-center text-center gap-3 p-4">
                                <div className="flex items-center justify-center rounded-full"
                                    style={{ width: '74px', height: '74px', border: '2px solid #b0c890', background: '#fff', flexShrink: 0 }}>
                                    {feat.icon}
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1a3d20', textTransform: 'uppercase', letterSpacing: '0.4px', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                                    {feat.title}
                                </div>
                                <div style={{ fontSize: '13px', color: '#5a7050', lineHeight: 1.55 }}>
                                    {feat.desc}
                                </div>
                            </div>

                            {/* Vertical divider — last card ke baad nahi */}
                            {i < features.length - 1 && (
                                <div className="self-stretch w-px bg-[#d4e4bc] my-4" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div >
        </div >
    )
}

export default WhatIsBuyer