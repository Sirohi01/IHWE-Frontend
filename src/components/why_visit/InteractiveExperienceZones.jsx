import React from 'react';
import SectionContainer from '../layout/SectionContainer';

const zones = [
    {
        title: "MEDICAL\nINNOVATION ZONE",
        desc: "Healthcare technology & diagnostics",
        image: "/whyVisit/medical_zone.png",
        icon: "/whyVisit/heart_pulse.png",
        alt: "Medical Innovation"
    },
    {
        title: "ORGANIC &\nNATURAL ZONE",
        desc: "Organic food, herbal & sustainable products",
        image: "/whyVisit/organic_zone.png",
        icon: "/whyVisit/sprout.png",
        alt: "Organic & Natural"
    },
    {
        title: "AYUSH\nPAVILION",
        desc: "Ayurveda, Yoga & naturopathy",
        image: "/whyVisit/ayush_zone.png",
        icon: "/whyVisit/gold_lotus.png",
        alt: "Ayush Pavilion"
    },
    {
        title: "FITNESS\nARENA",
        desc: "Fitness products, supplements & live demos",
        image: "/whyVisit/fitness_zone.png",
        icon: "/whyVisit/dumbbell.png",
        alt: "Fitness Arena"
    },
    {
        title: "BEAUTY &\nWELLNESS ZONE",
        desc: "Skincare, spa & beauty innovations",
        image: "/whyVisit/beauty_zone.png",
        icon: "/whyVisit/beauty_flower.png",
        alt: "Beauty & Wellness"
    },
    {
        title: "STARTUP\nPAVILION",
        desc: "Emerging wellness startups & innovations",
        image: "/whyVisit/startup_zone.png",
        icon: "/whyVisit/rocket.png",
        alt: "Startup Pavilion"
    }
];

const InteractiveExperienceZones = () => {
    return (
        <div className="w-full bg-white py-6">
            <SectionContainer>
                {/* Header with tapered gradient lines */}
                <div className="flex flex-col items-center justify-center mb-3">
                    <div className="flex items-center gap-4 w-full justify-center">
                        <div className="h-[1.5px] bg-gradient-to-r from-transparent to-gray-400 w-16 md:w-32"></div>
                        <h2 className="text-lg md:text-xl font-bold text-[#011630] uppercase text-center tracking-wider">
                            Explore Interactive Experience Zones
                        </h2>
                        <div className="h-[1.5px] bg-gradient-to-l from-transparent to-gray-400 w-16 md:w-32"></div>
                    </div>
                </div>

                {/* Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {zones.map((zone, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col group"
                        >
                            {/* Image Container */}
                            <div className="w-full h-32 overflow-hidden relative">
                                <img
                                    src={zone.image}
                                    alt={zone.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Dark overlay for subtle gradient contrast */}
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>

                            {/* Floating Round Badge (Transparent Container) */}
                            <div className="absolute top-[96px] left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center z-10">
                                <div className="">
                                    <img src={zone.icon} alt={zone.alt} className="w-14 h-14 object-contain" />
                                </div>
                            </div>

                            {/* Text content */}
                            <div className="pt-10 pb-5 px-3 flex flex-col flex-grow items-center text-center">
                                {/* Title */}
                                <h3 className="text-[#011630] font-black text-[12px] uppercase tracking-wide leading-tight mb-2 h-10 flex items-center justify-center whitespace-pre-line">
                                    {zone.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-[11px] leading-relaxed max-w-[140px]">
                                    {zone.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </div>
    );
};

export default InteractiveExperienceZones;
