import React from 'react';
import SectionContainer from '../layout/SectionContainer';

const testimonials = [
    {
        text: "One of the best wellness expos in India for networking and discovering new brands. The quality of exhibitors and attendees is excellent.",
        author: "Healthcare Distributor",
        avatar: "/whyVisit/avatar_distributor.png"
    },
    {
        text: "Excellent platform to meet global suppliers and wellness innovators. We found great partners for our business expansion.",
        author: "International Buyer",
        avatar: "/whyVisit/avatar_buyer.png"
    },
    {
        text: "Very professionally organized with insightful conferences and live product demonstrations. Highly recommended!",
        author: "Wellness Entrepreneur",
        avatar: "/whyVisit/avatar_entrepreneur.png"
    }
];

const eventDetails = [
    { icon: "/whyVisit/footer_calendar.svg", label: "21 - 23 AUGUTST 2026" },
    { icon: "/whyVisit/footer_map.svg", label: "PRAGATI MAIDAN,\nNEW DELHI, INDIA" },
    { icon: "/whyVisit/footer_globe.svg", label: "www.ihwe.in" },
    { icon: "/whyVisit/footer_mail.svg", label: "info@ihwe.in" },
    { icon: "/whyVisit/footer_phone.svg", label: "+91-9654900525" }
];

const VisitorTestimonialsAndCTA = () => {
    const handleRegister = () => {
        window.open('/visitor-registration', '_blank');
    };

    const handleContact = () => {
        window.open('/contact', '_blank');
    };

    return (
        <div className="w-full bg-white">
            {/* Section 1: WHAT VISITORS SAY */}
            <div className="py-2">
                <SectionContainer>
                    {/* Header with tapered lines */}
                    <div className="flex items-center gap-4 justify-center mb-3">
                        <div className="h-[1.5px] bg-gradient-to-r from-transparent to-gray-400 w-16 md:w-32"></div>
                        <h2 className="text-lg md:text-xl font-extrabold text-[#0f3b73] uppercase tracking-widest text-center">
                            What Visitors Say
                        </h2>
                        <div className="h-[1.5px] bg-gradient-to-l from-transparent to-gray-400 w-16 md:w-32"></div>
                    </div>

                    {/* Multi-column Testimonial Card */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {testimonials.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-row items-stretch justify-between gap-4 h-full ${index < testimonials.length - 1 ? 'lg:border-r lg:border-gray-200 lg:pr-6' : ''
                                        }`}
                                >
                                    {/* Left Column: Text, Stars, Author */}
                                    <div className="flex-grow flex flex-col justify-between h-full min-h-[110px]">
                                        {/* Top: Quote & Testimonial */}
                                        <div className="flex items-start gap-2.5 mb-3">
                                            <img src="/whyVisit/quote.svg" alt="Quote" className="w-5 h-5 object-contain shrink-0 mt-0.5 opacity-90" />
                                            <p className="text-[12px] text-gray-700 leading-relaxed font-medium">
                                                {item.text}
                                            </p>
                                        </div>

                                        {/* Bottom: 5 Gold Stars & Author name aligned at the absolute base */}
                                        <div className="mt-auto">
                                            {/* 5 Gold Stars */}
                                            <div className="flex items-center gap-0.5 mb-1.5 pl-7">
                                                {[...Array(5)].map((_, i) => (
                                                    <img key={i} src="/whyVisit/star.svg" alt="Star" className="w-5 h-5" />
                                                ))}
                                            </div>

                                            {/* Name / Title */}
                                            <span className="text-[11px] font-bold text-gray-800 pl-7 whitespace-nowrap">
                                                - {item.author}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Column: Round Avatar */}
                                    {/* <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 self-center ml-1">
                                        <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionContainer>
            </div>

            {/* Section 2: READY TO EXPERIENCE CTA Banner */}
            <div className="w-full bg-[#011630] relative overflow-hidden py-2">
                {/* High-tech overlay digital earth on far right */}
                <div className="absolute right-0 top-0 bottom-0 w-[40%] hidden lg:block">
                    <img
                        src="/whyVisit/cta_earth.png"
                        alt="digital sphere"
                        className="w-full h-full object-contain object-right scale-110 opacity-75 mix-blend-screen select-none pointer-events-none"
                    />
                </div>

                <SectionContainer>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-3">
                        {/* CTA Heading Text */}
                        <div className="lg:col-span-7 flex flex-col">
                            <h2 className="text-lg md:text-xl font-extrabold text-white tracking-wide leading-tight uppercase">
                                Ready to Experience<br />
                                the <span className="text-[#a8d060]">Future of Wellness?</span>
                            </h2>
                            <p className="text-sm text-gray-300 leading-relaxed font-medium mt-1 max-w-[520px]">
                                Join thousands of professionals, buyers, wellness leaders & innovators at IHWE 2026 Global Edition.
                            </p>
                        </div>

                        {/* CTA Buttons Row */}
                        <div className="lg:col-span-5 flex flex-wrap items-center gap-4 lg:justify-end">
                            <button
                                onClick={handleRegister}
                                className="bg-[#4a7729] hover:bg-[#3c6121] text-white font-extrabold text-[13px] px-6 py-3 rounded-lg uppercase tracking-wide flex items-center gap-3 transition-colors shadow-md group"
                            >
                                Register Now
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </button>

                            <button
                                onClick={handleContact}
                                className="border border-white/30 hover:border-white text-white font-extrabold text-[13px] px-6 py-3 rounded-lg uppercase tracking-wide flex items-center gap-3 transition-all bg-white/5 hover:bg-white/10"
                            >
                                Contact Team
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </SectionContainer>
            </div>

            {/* Section 3: Event Details Footer Bar */}
            <div className="w-full border-t border-gray-200 py-2">
                <SectionContainer>
                    <div className="flex flex-wrap items-center justify-between gap-4 md:gap-0">
                        {eventDetails.map((detail, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center gap-3 flex-1 min-w-[160px] justify-center md:justify-start ${idx < eventDetails.length - 1 ? 'md:border-r md:border-gray-200' : ''
                                    } px-4`}
                            >
                                <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                                    <img src={detail.icon} alt="event detail icon" className="w-6 h-6 object-contain" />
                                </div>
                                <span className="text-[11px] md:text-[12px] font-extrabold text-[#011630] tracking-wide leading-snug whitespace-pre-line">
                                    {detail.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </SectionContainer>
            </div>
        </div>
    );
};

export default VisitorTestimonialsAndCTA;
