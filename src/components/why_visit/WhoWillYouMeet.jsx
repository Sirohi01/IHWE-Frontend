import React from 'react';
import SectionContainer from '../layout/SectionContainer';

const attendees = [
    {
        title: "HEALTHCARE\nPROFESSIONALS",
        desc: "Doctors, hospitals, clinics & medical experts",
        icon: <img loading="lazy" decoding="async" src="/whyVisit/healthcare_icon.svg" alt="Healthcare" className="w-11 h-11 object-contain" />
    },
    {
        title: "BUYERS &\nDISTRIBUTORS",
        desc: "Importers, wholesalers, retailers & procurement heads",
        icon: <img loading="lazy" decoding="async" src="/whyVisit/buyers_icon.svg" alt="Buyers" className="w-11 h-11 object-contain" />
    },
    {
        title: "WELLNESS\nENTHUSIASTS",
        desc: "Fitness lovers, Ayurveda users & health-conscious consumers",
        icon: <img loading="lazy" decoding="async" src="/whyVisit/wellness.png" alt="Wellness" className="w-11 h-11 object-contain" />
    },
    {
        title: "INVESTORS &\nSTARTUPS",
        desc: "Investors, founders, wellness startups & innovators",
        icon: <img loading="lazy" decoding="async" src="/whyVisit/investors.png" alt="Investors" className="w-11 h-11 object-contain" />
    },
    {
        title: "AYUSH\nPROFESSIONALS",
        desc: "Ayurveda, Yoga, Naturopathy & holistic practitioners",
        icon: <img loading="lazy" decoding="async" src="/whyVisit/ayush.png" alt="Ayush" className="w-11 h-11 object-contain" />
    },
    {
        title: "HOSPITALITY &\nSPA CHAINS",
        desc: "Hotels, spas, resorts & wellness retreat operators",
        icon: <img loading="lazy" decoding="async" src="/whyVisit/hostpitality.png" alt="Hospitality" className="w-11 h-11 object-contain" />
    }
];

const WhoWillYouMeet = () => {
    return (
        <div className="w-full bg-[#011630] py-3 relative overflow-hidden">
            <SectionContainer>
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-3">
                    <div className="flex items-center gap-4 w-full justify-center">
                        <div className="h-[1.5px] bg-gradient-to-r from-transparent to-gray-600 w-16 md:w-32"></div>
                        <h2 className="text-lg font-bold text-white uppercase text-center tracking-widest">
                            Who Will You Meet?
                        </h2>
                        <div className="h-[1.5px] bg-gradient-to-l from-transparent to-gray-600 w-16 md:w-32"></div>
                    </div>
                    {/* Small Leaf below title */}
                    <div className="mt-2 flex justify-center">
                        <img loading="lazy" decoding="async" src="/whyVisit/leaf.png" alt="Leaf" className="h-4 object-contain" />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
                    {attendees.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center relative px-2">
                            {/* Icon */}
                            <div className="text-[#a8d060] mb-3">
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-white font-bold text-[12px] uppercase tracking-wider leading-snug mb-3 whitespace-pre-line h-10 flex items-center justify-center">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-300 text-[11px] leading-relaxed max-w-[160px]">
                                {item.desc}
                            </p>

                            {/* Vertical Separator for Desktop */}
                            {index < attendees.length - 1 && (
                                <div className="hidden lg:block absolute right-[-12px] top-[10%] bottom-[10%] w-px bg-gray-700/60" />
                            )}
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </div>
    );
};

export default WhoWillYouMeet;
