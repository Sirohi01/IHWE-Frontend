import React from "react";
import { FileText } from "lucide-react";

const WhyPart = () => {
    const benefits = [
        {
            label: 'Significant reduction\nin exhibition cost',
            icon: (
                <img src="/mpscheme/why1.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
        {
            label: 'Access to national &\nInternational buyers',
            icon: (
                <img src="/mpscheme/why2.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
        {
            label: 'Government-supported\ncredibility',
            icon: (
                <img src="/mpscheme/why3.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
        {
            label: 'Increase brand\nvisibility',
            icon: (
                <img src="/mpscheme/why4.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
        {
            label: 'Expand your\nbusiness network',
            icon: (
                <img src="/mpscheme/why5.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
        {
            label: 'Boost sales &\ndistribution',
            icon: (
                <img src="/mpscheme/why6.png" alt="" className="w-20 h-20 object-contain" />
            ),
        },
    ];

    return (
        <div className="px-16">

            {/* ── SECTION ONE: WHY PARTICIPATE ── */}
            <div className='bg-white px-4 py-2 border border-[#e0e8d8] rounded-2xl mt-4 mb-4'>                {/* Heading */}
                <div className="text-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wide">
                        Why Participate Under PMS Scheme?
                    </h2>
                    <div className="w-10 h-0.5 bg-[#1e5c1e] mx-auto mt-2 rounded-full" />
                </div>

                {/* Benefits Row */}
                <div className="flex items-start">
                    {benefits.map((item, i) => (
                        <div key={i} className="flex items-stretch flex-1">

                            {/* Card */}
                            <div className="flex-1 flex flex-col items-center justify-start gap-3 px-1 py-1 text-center">
                                <div className="flex items-center justify-center h-14">
                                    {item.icon}
                                </div>
                                <p className="text-sm font-normal text-gray-600 leading-snug whitespace-pre-line">
                                    {item.label}
                                </p>
                            </div>

                            {/* Vertical divider — not after last */}
                            {i < benefits.length - 1 && (
                                <div className="w-px bg-gray-200 self-stretch mx-1" />
                            )}

                        </div>
                    ))}
                </div>
            </div>

            {/* ── SECTION TWO: DOCUMENTS + HOW IT WORKS ── */}
            <div className="w-full flex gap-3">

                {/* ── LEFT: DOCUMENTS REQUIRED ── */}
                <div className="w-[25%] bg-white px-4 py-2 border border-[#e0e8d8] rounded-2xl  ">
                    <h2 className="text-base font-medium text-green-900 uppercase tracking-wide mb-4">
                        Documents Required
                    </h2>
                    <div className="flex flex-col gap-3">
                        {[
                            'Udyam Registration Certificate',
                            'PAN Card',
                            'GST Certificate',
                            'Company Profile',
                            'Product / Service Details',
                            'Bank Account Details',
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <FileText size={20} color="#1e5c1e" strokeWidth={1.8} className="shrink-0" />
                                <span className="text-sm text-gray-700">{doc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: HOW IT WORKS ── */}
                <div className="w-[75%] bg-white px-4 py-2 border border-[#e0e8d8] rounded-2xl ">
                    <h2 className="text-lg font-medium text-gray-900 px-2 uppercase tracking-wide mb-2">
                        How It Works?
                    </h2>

                    {/* Steps Row */}
                    <div className="flex items-start justify-between relative">

                        {/* Connecting line */}
                        <div className="absolute top-[54px] left-[8%] right-[8%] h-px border-t-2 border-dashed border-gray-300 z-0" />

                        {[
                            {
                                num: 1,
                                title: 'Apply Online',
                                desc: 'Fill the PMS application form',
                                icon: (
                                    <img src="/mpscheme/how1.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                            {
                                num: 2,
                                title: 'Upload Documents',
                                desc: 'Submit all required documents online',
                                icon: (
                                    <img src="/mpscheme/how2.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                            {
                                num: 3,
                                title: 'MSME Verification',
                                desc: 'Documents verified by MSME',
                                icon: (
                                    <img src="/mpscheme/how3.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                            {
                                num: 4,
                                title: 'Stall Allocation',
                                desc: 'Stall will be allocated',
                                icon: (
                                    <img src="/mpscheme/how4.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                            {
                                num: 5,
                                title: 'Exhibit at IHWE',
                                desc: 'Participate in IHWE 2026',
                                icon: (
                                    <img src="/mpscheme/how5.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                            {
                                num: 6,
                                title: 'Claim Reimbursement',
                                desc: 'Get reimbursement after approval',
                                icon: (
                                    <img src="/mpscheme/how6.png" alt="" className="h-18 w-18 object-contain" />
                                ),
                            },
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col items-center relative z-10 flex-1">

                                <div className="relative mt-3">

                                    {/* Number badge — top right corner pe */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1e5c1e] text-white text-xs font-medium flex items-center justify-center z-10 shadow">
                                        {step.num}
                                    </div>

                                    {/* Circle with icon */}
                                    <div className="w-20 h-20 rounded-full bg-[#f0f5ec] border border-[#d0e4c0] flex items-center justify-center mt-0">
                                        {step.icon}
                                    </div>

                                </div>

                                {/* Title */}
                                <div className="text-sm font-base text-gray-900 text-center leading-snug mt-1">
                                    {step.title}
                                </div>

                                {/* Desc */}
                                <div className="text-xs text-gray-700 text-center leading-snug mt-2">
                                    {step.desc}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* SECTION THREE */}
            <div className="w-full mb-4 mt-6 rounded-2xl bg-[#1e4d1e] flex items-end gap-6 px-6 relative">

                {/* Trophy Image — upar se bahar nikle */}
                <div className="shrink-0 z-10" style={{ marginBottom: 0, marginTop: '-44px' }}>
                    <img
                        src="/mpscheme/trofi1.png"
                        alt="Trophy"
                        className="w-28 h-36 object-contain object-bottom block"
                    />
                </div>

                {/* Text */}
                <div className="flex-1 z-10 py-2 mr-6">
                    <p className="text-base font-semibold text-white leading-snug">
                        Don't Miss This{' '}
                        <span className="text-[#f5a623]">Government-Supported Opportunity!</span>
                    </p>
                    <p className="text-sm text-gray-200 mt-1 leading-relaxed">
                        Exhibit at IHWE 2026 and take your business to the next level<br />
                        with financial support under the MSME PMS Scheme.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-6 shrink-0 z-10 py-5">
                    <button className="bg-[#f5a623] hover:bg-[#e09610] text-white font-medium text-xs uppercase tracking-widest px-6 py-2 rounded-lg cursor-pointer transition whitespace-nowrap">
                        Apply for PMS Scheme →
                    </button>
                    <button className="bg-transparent hover:bg-white/10 text-white font-medium text-xs uppercase tracking-widest px-6 py-2 rounded-lg cursor-pointer transition border-2 border-white whitespace-nowrap">
                        Book Your Stall →
                    </button>
                </div>

            </div>

        </div>
    );
};

export default WhyPart;