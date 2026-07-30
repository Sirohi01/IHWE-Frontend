import React from "react";
import SectionContainer from "@/components/layout/SectionContainer";

const BookAStandHero = () => {
    return (
        <section
            className="hero-background-registration relative overflow-hidden !aspect-auto md:!aspect-[16/5] !h-auto md:!h-auto py-6 md:py-0"
            style={{
                backgroundImage: "url('/exhibition/bg.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'left',
                backgroundRepeat: 'no-repeat',
                fontFamily: "'Barlow', sans-serif",
            }}
        >
            <SectionContainer>
                <div className="w-full">
                    <div className="relative z-10 py-6 md:py-12 flex flex-col gap-2 w-full md:w-[60%] lg:w-[55%] bg-black/40 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none backdrop-blur-sm md:backdrop-blur-none">

                        {/* Register as a Buyer */}
                        <div className="inline-block mt-4 px-4 py-1 bg-[#a8d060]/15 border border-[#a8d060]/40 rounded-lg text-[#a8d060] text-xs font-bold uppercase tracking-[0.2em] w-fit backdrop-blur-sm shadow-[0_0_20px_rgba(168,208,96,0.2)]">
                            Exhibition stall booking
                        </div>

                        {/* Main Heading */}
                        <div className="mt-1">
                            <h1 className="text-3xl md:text-[38px] font-extrabold text-white leading-tight uppercase">
                                Book Your <br />
                                Exhibition <span className="text-[#a8d060]">Stand</span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-white/80 text-[13px] md:text-sm leading-relaxed max-w-md mt-1">
                            Showcase your innovations to 8,000+ healthcare Professionals-fill the form and get a customized stall for your brand.
                        </p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:flex md:items-center mt-3 gap-y-4 gap-x-2 md:gap-3">
                            {[
                                {
                                    num: '', label: '8,000+\nHealthcare\nProfessionals',
                                    icon: <img loading="lazy" decoding="async" src="/exhibition/b1.webp" alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                                },
                                {
                                    num: '', label: 'Custom\nStall\nSolutions',
                                    icon: <img loading="lazy" decoding="async" src="/exhibition/b2.webp" alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />,
                                },
                                {
                                    num: '', label: 'Maximum\nBrand\nVisibility',
                                    icon: <img loading="lazy" decoding="async" src="/exhibition/b3.webp" alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />,
                                },
                                {
                                    num: '', label: 'High-Value\nBusiness\nConnections',
                                    icon: <img loading="lazy" decoding="async" src="/exhibition/b4.webp" alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />,
                                },
                            ].map((stat, i, arr) => (
                                <div key={i} className="flex items-center md:contents">
                                    <div className="flex flex-col items-center text-center px-1 flex-1">
                                        <div className="mb-1.5">{stat.icon}</div>
                                        {stat.num && (
                                            <div className="text-lg md:text-xl font-bold text-[#a8d060] leading-none tracking-tight">
                                                {stat.num}
                                            </div>
                                        )}
                                        <div className="text-[9px] md:text-[10px] font-semibold text-white uppercase tracking-wider leading-tight opacity-90 whitespace-pre-line max-w-[120px]">
                                            {stat.label}
                                        </div>
                                    </div>
                                    {i < arr.length - 1 && (
                                        <div className="hidden md:block h-16 w-px bg-[#a8d060]/20 shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <button className="flex items-center gap-3 bg-[#4a8f2f] hover:bg-[#3d7a26] text-white px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all duration-300 hover:scale-[1.03]">
                                Book Your Stall Now
                                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#4a8f2f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </span>
                            </button>
                        </div>

                    </div>

                    <div className="w-[40%]">
                        {/* <img loading="lazy" decoding="async" src="/bsmeet/bsherob.webp" alt="" /> */}
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
};

export default React.memo(BookAStandHero);
