import React from "react";
import bannerBg from "@/assets/deligateimage/detailsbg.webp";
import logo from "@/assets/deligateimage/logoImg.webp";
import SectionContainer from "@/components/layout/SectionContainer";
import SingleRegistration from "./SingleRegistration";
import GroupRegistration from "./GroupRegistration";
const DelegateDetailsHero = () => {
    const [delegateType, setDelegateType] = React.useState(null);
    const formRef = React.useRef(null);

    const handleDelegateTypeChange = (type) => {
        setDelegateType(type);
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    };

    return (
        <>
            <section className="relative w-full overflow-hidden min-h-[440px]" >

                {/* ── Background Image ── */}
                <img loading="lazy" decoding="async" src={bannerBg}
                    alt="9th International Health & Wellness Expo 2026"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* ── Very light overlay (banner colors maintain karne ke liye) ── */}
                <div className="absolute inset-0 bg-white/20" />

                {/* ── Main Content ── */}

                <SectionContainer className="relative z-10 flex flex-col items-start justify-start  ">

                    {/* 9th + th superscript */}
                    <div className="flex mt-10">
                        <img loading="lazy" decoding="async" src={logo} className="h-[220px]" alt="logo" />
                    </div>

                    {/* Tagline */}
                    <p
                        className="text-[#3B3F35] border-t-[3px] border-[#D9D8C4] pt-3 text-lg font-medium mb-4 -mt-6 ml-40"
                    >
                        Uniting Innovation, Wellness &amp;<br />
                        Sustainability for a <strong className="font-bold text-[#366225]">Better Tomorrow</strong>
                    </p>

                    {/* Date & Venue row */}
                    <div className="w-full flex items-center justify-start flex-wrap gap-10 py-2"
                    >
                        {/* ── Date Block ── */}
                        <div className="flex items-center gap-4">
                            {/* Green Calendar Icon Box */}
                            <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                                style={{ background: "#2d6e2a", width: "54px", height: "54px" }}
                            >
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                    <rect x="2.5" y="3.5" width="19" height="18" rx="2" stroke="white" strokeWidth="1.6" />
                                    <line x1="7" y1="2" x2="7" y2="5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                    <line x1="17" y1="2" x2="17" y2="5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                    <line x1="2.5" y1="9" x2="21.5" y2="9" stroke="white" strokeWidth="1.5" />
                                    <rect x="5" y="11.5" width="3" height="2.5" rx="0.5" fill="white" />
                                    <rect x="10.5" y="11.5" width="3" height="2.5" rx="0.5" fill="white" />
                                    <rect x="16" y="11.5" width="3" height="2.5" rx="0.5" fill="white" />
                                    <rect x="5" y="15.5" width="3" height="2.5" rx="0.5" fill="white" />
                                    <rect x="10.5" y="15.5" width="3" height="2.5" rx="0.5" fill="white" />
                                    <rect x="16" y="15.5" width="3" height="2.5" rx="0.5" fill="white" />
                                </svg>
                            </div>

                            {/* Date Text */}
                            <div>
                                <p className="m-0 text-[#131E0C] font-bold text-[17px] leading-snug"
                                >
                                    21 – 23 August 2026
                                </p>
                                <p className="m-0 text-[#1C2716] text-[14px] font-medium"
                                >
                                    Friday – Sunday
                                </p>
                            </div>
                        </div>

                        {/* ── Vertical Divider ── */}
                        <div className="hidden sm:block opacity-50"
                            style={{ width: "1.5px", height: "50px", background: "#5a7a52" }}
                        />

                        {/* ── Venue Block ── */}
                        <div className="flex items-center gap-4">
                            {/* Pin Icon */}
                            <div className="flex items-center justify-center flex-shrink-0" style={{ width: "40px" }}>
                                <svg width="34" height="42" viewBox="0 0 34 44" fill="none">
                                    <path
                                        d="M17 2C9.82 2 4 7.82 4 15C4 24.5 17 42 17 42C17 42 30 24.5 30 15C30 7.82 24.18 2 17 2Z"
                                        fill="#1e5c1a"
                                    />
                                    <circle cx="17" cy="15" r="6" fill="white" />
                                </svg>
                            </div>

                            {/* Venue Text */}
                            <div>
                                <p className="m-0 text-[#131E0C] font-bold text-[17px] leading-snug"
                                >
                                    PRAGATI MAIDAN,
                                </p>
                                <p className="m-0 text-[#131E0C] font-bold text-[17px] leading-snug"
                                >
                                    NEW DELHI, INDIA
                                </p>
                            </div>
                        </div>
                    </div>
                </SectionContainer>

            </section>

            {/* bannar section  */}
            <SectionContainer>
                <section className="grid grid-cols-1 md:flex md:items-center md:justify-between my-3 p-4 md:py-3 md:px-2 gap-4 md:gap-0 bg-white border border-gray-100 rounded-xl shadow-sm">
                    {[
                        {
                            icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/icons/c1.webp') center/contain no-repeat", mask: "url('/icons/c1.webp') center/contain no-repeat" }} />,
                            title: 'Global Platform',
                            desc: 'Uniting healthcare, wellness, and sustainable industries',
                        },
                        {
                            icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/exhibition/b1.webp') center/contain no-repeat", mask: "url('/exhibition/b1.webp') center/contain no-repeat" }} />,
                            title: 'Trusted Brands',
                            desc: "Connect with India's most trusted brands & manufacturers",
                        },
                        {
                            icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/exhibition/b5.webp') center/contain no-repeat", mask: "url('/exhibition/b5.webp') center/contain no-repeat" }} />,
                            title: 'Targeted Audience',
                            desc: 'Engage with qualified buyers, Investors & decision makers',
                        },
                        {
                            icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/icons/growth.webp') center/contain no-repeat", mask: "url('/exhibition/b6.webp') center/contain no-repeat" }} />,
                            title: 'Business Growth',
                            desc: 'Expand your market & accelerate your growth',
                        },
                    ].map((item, i) => (
                        <React.Fragment key={i}>
                            <div className="flex items-start gap-4 flex-1 px-2 md:px-4">
                                {/* Icon Circle */}
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#f0f7e6] flex items-center justify-center shrink-0 p-2 md:p-3">
                                    {item.icon}
                                </div>
                                {/* Text */}
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                            {/* Divider */}
                            {i < 3 && (
                                <>
                                    <div className="hidden md:block w-px h-12 bg-gray-200 shrink-0" />
                                    <div className="block md:hidden h-px w-full bg-gray-100 my-1" />
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </section>
            </SectionContainer>

            {/* button section */}
            <SectionContainer>
                <section className="bg-white border border-gray-100 my-3 py-6 rounded-xl shadow-sm p-4 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-10">

                    {/* Left Side */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <p className="text-gray-900 text-xl font-medium mb-1">Edition Of Health & Wellness At</p>
                            <h2 className="text-[#1a4d1a] text-2xl font-semibold leading-snug mb-2">
                                9th International Health & Wellness Expo 2026<br />(IHWE Global Edition)
                            </h2>
                            <div className="w-8 h-[3px] bg-[#4a8f2f] rounded mb-4" />
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Step into IHWE 2026, a leading global platform uniting healthcare, wellness, AYUSH,
                                organic, and sustainable industries under one roof. Whether you are a visitor
                                discovering innovations or a corporate buyer seeking meaningful business
                                connections, IHWE offers a high-value, curated experience with India's most
                                trusted brands and manufacturers.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Register now and be part of a powerful global movement in{' '}
                                <span className="text-[#4a8f2f] font-semibold">health & wellness.</span>
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-px bg-gray-200 self-stretch" />
                    <div className="block lg:hidden h-px w-full bg-gray-200 my-2" />

                    {/* Right Side */}
                    <div className="flex-1">
                        <h3 className="text-gray-900 text-xl font-medium mb-1">Choose Delegate Category</h3>
                        <div className="w-8 h-[3px] bg-[#4a8f2f] rounded mb-5" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Delegate Register  */}
                            <div
                                onClick={() => handleDelegateTypeChange('single')}
                                className={`cursor-pointer transition-all duration-300 rounded-xl px-5 py-4 flex flex-col items-center text-center gap-2 border-2 ${delegateType === 'single' ? 'bg-[#f0f7e6] border-[#4a8f2f] shadow-lg scale-[1.02]' : 'bg-[#f0f7e6]/50 border-transparent hover:border-[#c8e6a0] hover:bg-[#f0f7e6]'}`}
                            >
                                <div className="flex items-center justify-center">
                                    <img loading="lazy" decoding="async" src="/exhibition/dom.webp" alt="Single Delegate" className="w-18 h-20 object-contain" />
                                </div>
                                <div>
                                    <p className="text-gray-800 font-bold text-base mb-1">Delegate Register </p>
                                    <p className="text-gray-700 text-xs">For individual delegates</p>
                                </div>
                                <button
                                    type="button"
                                    className={`flex gap-2 items-center text-white text-xs font-medium uppercase tracking-widest px-5 py-2 rounded-lg transition-colors ${delegateType === 'single' ? 'bg-[#1a4d1a]' : 'bg-[#23471d] hover:bg-[#1a4d1a]'}`}
                                >
                                    {delegateType === 'single' ? 'Selected' : 'Register Now'}
                                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <svg className={`w-3 h-3 ${delegateType === 'single' ? 'text-[#1a4d1a]' : 'text-[#23471d]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                            {/* Delegate group Register */}
                            <div
                                onClick={() => handleDelegateTypeChange('group')}
                                className={`cursor-pointer transition-all duration-300 rounded-xl px-5 py-4 flex flex-col items-center text-center gap-2 border-2 ${delegateType === 'group' ? 'bg-[#fff7f0] border-[#d26019] shadow-lg scale-[1.02]' : 'bg-[#fff7f0]/50 border-transparent hover:border-[#f5d5b0] hover:bg-[#fff7f0]'}`}
                            >
                                <div className="flex items-center justify-center">
                                    <img loading="lazy" decoding="async" src="/exhibition/int.webp" alt="Group Delegate" className="w-18 h-20 object-contain" />
                                </div>
                                <div>
                                    <p className="text-gray-800 font-bold text-base mb-1">Delegate Group Register </p>
                                    <p className="text-gray-700 text-xs">For group of delegates</p>
                                </div>
                                <button
                                    type="button"
                                    className={`flex items-center gap-2 text-white text-xs font-medium uppercase tracking-widest px-5 py-2 rounded-lg transition-colors ${delegateType === 'group' ? 'bg-[#c96a18]' : 'bg-[#e07820] hover:bg-[#c96a18]'}`}
                                >
                                    {delegateType === 'group' ? 'Selected' : 'Register Now'}
                                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <svg className={`w-3 h-3 ${delegateType === 'group' ? 'text-[#c96a18]' : 'text-[#e07820]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>

                </section>
            </SectionContainer>

            {/* main screen  */}
            <div ref={formRef}>
                {delegateType === 'single' && <SingleRegistration />}
                {delegateType === 'group' && <GroupRegistration />}
            </div>

        </>
    );
};

export default DelegateDetailsHero;