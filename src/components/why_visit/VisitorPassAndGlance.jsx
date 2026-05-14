import React from 'react';
import SectionContainer from '../layout/SectionContainer';

const passColumns = [
    {
        items: [
            { title: "Free Access\nto Expo Zones", icon: "/whyVisit/pass_expo.svg" },
            { title: "Conference\nAccess", icon: "/whyVisit/pass_conf.svg" }
        ]
    },
    {
        items: [
            { title: "Live Product\nDemonstrations", icon: "/whyVisit/pass_demo.svg" },
            { title: "Industry\nInsights", icon: "/whyVisit/pass_insight.svg" }
        ]
    },
    {
        items: [
            { title: "Networking\nOpportunities", icon: "/whyVisit/pass_net.svg" },
            { title: "Business Expansion\nOpportunities", icon: "/whyVisit/pass_expansion.svg" }
        ]
    },
    {
        items: [
            { title: "B2B\nMeetings", icon: "/whyVisit/pass_b2b.svg" },
            { title: "International Brand\nDiscovery", icon: "/whyVisit/pass_discovery.svg" }
        ]
    }
];

const stats = [
    { value: "150+", label: "Exhibitors", icon: "/whyVisit/exhibitors.png", color: "text-[#4a7729]" },
    { value: "8,000+", label: "Visitors/ Delegates", icon: "/whyVisit/stat_visitors.svg", color: "text-[#0f3b73]" },
    { value: "1,000+", label: "GLOBAL BUYERS", icon: "/whyVisit/stat_globe.svg", color: "text-[#4a7729]" },
    { value: "3 Days", label: "of Networking", icon: "/whyVisit/stat_calendar.svg", color: "text-[#0f3b73]" }
];

const VisitorPassAndGlance = () => {
    return (
        <div className="w-full bg-[#f8f9fa] py-6 border-t border-gray-200/60">
            <SectionContainer>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Left Card: Visitor Pass Includes */}
                    <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5 flex flex-col">
                        <h2 className="text-lg font-extrabold text-[#0f3b73] uppercase text-center tracking-wider mb-6 mt-2">
                            Your Visitor Pass Includes
                        </h2>

                        {/* 4-column Flex Grid with Dividers */}
                        <div className="flex flex-row justify-between items-stretch flex-grow">
                            {passColumns.map((col, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={`flex-1 flex flex-col items-center justify-between gap-8 px-1 ${colIndex < passColumns.length - 1 ? 'border-r border-gray-200' : ''
                                        }`}
                                >
                                    {col.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex flex-col items-center text-center w-full">
                                            <img
                                                src={item.icon}
                                                alt="Icon"
                                                className="w-10 h-10 object-contain mb-2"
                                            />
                                            <span className="text-[11px] font-bold text-[#0f3b73] uppercase tracking-tight leading-snug px-1 whitespace-pre-line">
                                                {item.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Card: IHWE At A Glance */}
                    <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5">
                        {/* Sub-Header with gradient lines */}
                        <div className="flex items-center gap-4 justify-center mb-6 mt-1">
                            <div className="h-[1.5px] bg-gradient-to-r from-transparent to-gray-400 flex-grow max-w-[60px]"></div>
                            <h2 className="text-lg font-extrabold text-[#0f3b73] uppercase tracking-widest text-center">
                                IHWE 2026 At A Glance
                            </h2>
                            <div className="h-[1.5px] bg-gradient-to-l from-transparent to-gray-400 flex-grow max-w-[60px]"></div>
                        </div>

                        {/* Content Block Split */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            {/* Stats Column */}
                            <div className="md:col-span-4 flex flex-col justify-center gap-4 pr-2">
                                {stats.map((stat, sIndex) => (
                                    <div key={sIndex} className="flex items-center gap-3 border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                                        <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                                            <img src={stat.icon} alt="stat" className="w-8 h-8 object-contain" />
                                        </div>
                                        <div className="flex flex-row items-baseline gap-2">
                                            <span className={`text-xl font-extrabold tracking-tight ${stat.color}`}>
                                                {stat.value}
                                            </span>
                                            <span className="text-[9px] font-extrabold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                                {stat.label}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Image Collage Grid */}
                            <div className="md:col-span-8 grid grid-cols-3 gap-1 self-center">
                                {/* Top Row: 2 images */}
                                <div className="col-span-2 h-28 rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:opacity-95 transition-opacity">
                                    <img
                                        src="/whyVisit/glance_conf_hall.png"
                                        alt="Seminar Hall"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="col-span-1 h-28 rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:opacity-95 transition-opacity">
                                    <img
                                        src="/whyVisit/glance_handshake.png"
                                        alt="Handshake"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Bottom Row: 3 images */}
                                <div className="col-span-1 h-28 rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:opacity-95 transition-opacity">
                                    <img
                                        src="/whyVisit/glance_massage.png"
                                        alt="Spa Massage"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="col-span-1 h-28 rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:opacity-95 transition-opacity">
                                    <img
                                        src="/whyVisit/glance_expo_aisle.png"
                                        alt="Convention Hall"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="col-span-1 h-28 rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:opacity-95 transition-opacity">
                                    <img
                                        src="/whyVisit/glance_cosmetics.png"
                                        alt="Cosmetics Shelf"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
};

export default VisitorPassAndGlance;
