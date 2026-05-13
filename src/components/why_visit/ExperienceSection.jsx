import React from 'react';
import SectionContainer from '../layout/SectionContainer';

const experiences = [
    {
        title: "INNOVATION\nSHOWCASE",
        desc: "Discover cutting-edge products in healthcare, wellness, AYUSH, fitness, nutraceuticals & organic industries.",
        icon: <img src="/whyVisit/innovation.svg" alt="Innovation" className="w-10 h-10 object-contain" />,
        color: "bg-[#4a7729]",
        borderColor: "border-[#4a7729]"
    },
    {
        title: "GLOBAL\nNETWORKING",
        desc: "Meet manufacturers, importers, distributors, hospitals, wellness brands & investors from around the world.",
        icon: <img src="/whyVisit/networking.svg" alt="Networking" className="w-10 h-10 object-contain" />,
        color: "bg-[#0f3b73]",
        borderColor: "border-[#0f3b73]"
    },
    {
        title: "BUSINESS\nOPPORTUNITIES",
        desc: "Generate leads, explore dealership opportunities & build strategic partnerships.",
        icon: <img src="/whyVisit/business.svg" alt="Business" className="w-10 h-10 object-contain" />,
        color: "bg-[#4a7729]",
        borderColor: "border-[#4a7729]"
    },
    {
        title: "CONFERENCES &\nLIVE SESSIONS",
        desc: "Attend expert-led conferences, startup showcases, wellness seminars & industry discussions.",
        icon: <img src="/whyVisit/conferences.svg" alt="Conferences" className="w-10 h-10 object-contain" />,
        color: "bg-[#0f3b73]",
        borderColor: "border-[#0f3b73]"
    },
    {
        title: "WELLNESS\nEXPERIENCES",
        desc: "Experience live wellness demos, Ayurveda therapies, fitness innovations & organic lifestyle solutions.",
        icon: <img src="/whyVisit/wellness.svg" alt="Wellness" className="w-10 h-10 object-contain" />,
        color: "bg-[#4a7729]",
        borderColor: "border-[#4a7729]"
    },
    {
        title: "PRODUCT\nLAUNCHES",
        desc: "Witness exclusive launches from emerging and established international brands.",
        icon: <img src="/whyVisit/products.svg" alt="Products" className="w-10 h-10 object-contain" />,
        color: "bg-[#0f3b73]",
        borderColor: "border-[#0f3b73]"
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
                        <h2 className="text-lg md:text-xl font-bold text-[#011630] uppercase text-center tracking-wide">
                            Experience the Future of Health & Wellness
                        </h2>
                        <div className="h-[1.5px] bg-gradient-to-l from-transparent to-gray-400 w-16 md:w-32"></div>
                    </div>
                    {/* Small Leaf below title */}
                    <div className="mt-2 flex justify-center">
                        <img src="/whyVisit/leaf.svg" alt="Leaf" className="h-4 object-contain" />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {experiences.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b-[6px] ${item.borderColor} p-3 text-center hover:shadow-lg transition-shadow duration-300`}
                        >
                            {/* Icon Circle */}
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white mb-3 shadow-inner ${item.color}`}>
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-[#0f3b73] font-bold text-[13px] uppercase tracking-wide leading-snug mb-3 whitespace-pre-line h-10 flex items-center justify-center">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-[12px] leading-relaxed">
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
