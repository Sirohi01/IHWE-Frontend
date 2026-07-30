import React from 'react';
import SectionContainer from '../layout/SectionContainer';

const experiences = [
    {
        title: "INNOVATION\nSHOWCASE",
        desc: "Discover cutting-edge products in healthcare, wellness, AYUSH, fitness, nutraceuticals & organic industries.",
        icon: "/whyVisit/innovation.webp",
        alt: "Innovation"
    },
    {
        title: "GLOBAL\nNETWORKING",
        desc: "Meet manufacturers, importers, distributors, hospitals, wellness brands & investors from around the world.",
        icon: "/whyVisit/globalnetworkw.webp",
        alt: "Networking"
    },
    {
        title: "BUSINESS\nOPPORTUNITIES",
        desc: "Generate leads, explore dealership opportunities & build strategic partnerships.",
        icon: "/whyVisit/businessOpp.webp",
        alt: "Business"
    },
    {
        title: "CONFERENCES &\nLIVE SESSIONS",
        desc: "Attend expert-led conferences, startup showcases, wellness seminars & industry discussions.",
        icon: "/whyVisit/conference.png",
        alt: "Conferences"
    },
    {
        title: "WELLNESS\nEXPERIENCES",
        desc: "Experience live wellness demos, Ayurveda therapies, fitness innovations & organic lifestyle solutions.",
        icon: "/whyVisit/wellnessExp.webp",
        alt: "Wellness"
    },
    {
        title: "PRODUCT\nLAUNCHES",
        desc: "Witness exclusive launches from emerging and established international brands.",
        icon: "/whyVisit/produceLonch.webp",
        alt: "Products"
    }
];

const ExperienceSection = () => {
    return (
        <div className="w-full bg-[#f8f9fa] py-4">
            <SectionContainer>
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-4">
                    <div className="flex items-center gap-4 w-full justify-center">
                        <div className="h-[1.5px] bg-gradient-to-r from-transparent to-gray-400 w-16 md:w-32"></div>
                        <h4 className="text-xl md:text-2xl font-bold text-[#011630] uppercase text-center tracking-wide">
                            Experience the Future of Health & Wellness
                        </h4>
                        <div className="h-[1.5px] bg-gradient-to-l from-transparent to-gray-400 w-16 md:w-32"></div>
                    </div>
                    {/* Small Leaf below title */}
                    <div className="mt-2 flex justify-center">
                        <img loading="lazy" decoding="async" src="/whyVisit/leaf.webp" alt="Leaf" className="h-4 object-contain" />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {experiences.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white rounded-xl p-5 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                            style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
                        >
                            {/* Icon container */}
                            <div className="w-20 h-20 flex items-center justify-center">
                                <img loading="lazy" decoding="async" src={item.icon} alt={item.alt} className="w-16 h-16 object-contain" />
                            </div>

                            {/* Title */}
                            <h3 className="text-[#0f3b73] font-bold text-[13px] uppercase tracking-wide leading-snug mb-3 whitespace-pre-line h-10 flex items-center justify-center">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-black text-[12px] leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </div>
    );
};

export default ExperienceSection;
