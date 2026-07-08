import React from "react";
import SectionContainer from "@/components/layout/SectionContainer";

const BookAStandBanner = () => {
    return (
        <SectionContainer>
            <section className="grid grid-cols-1 md:flex md:items-center md:justify-between my-3 p-4 md:py-3 md:px-2 gap-4 md:gap-0 bg-white border border-gray-100 rounded-xl shadow-sm">
                {[
                    {
                        icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/exhibition/sb4.png') center/contain no-repeat", mask: "url('/exhibition/sb4.png') center/contain no-repeat" }} />,
                        title: 'Global Platform',
                        desc: 'Uniting healthcare, wellness, and sustainable industries',
                    },
                    {
                        icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/exhibition/b1.png') center/contain no-repeat", mask: "url('/exhibition/b1.png') center/contain no-repeat" }} />,
                        title: 'Trusted Brands',
                        desc: "Connect with India's most trusted brands & manufacturers",
                    },
                    {
                        icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/exhibition/b5.png') center/contain no-repeat", mask: "url('/exhibition/b5.png') center/contain no-repeat" }} />,
                        title: 'Targeted Audience',
                        desc: 'Engage with qualified buyers, Investors & decision makers',
                    },
                    {
                        icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/icons/growth.png') center/contain no-repeat", mask: "url('/exhibition/b6.png') center/contain no-repeat" }} />,
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
    );
};

export default React.memo(BookAStandBanner);
