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
        <div className="px-14">

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
            <div className="w-full flex gap-6 mb-4">

                {/* ── LEFT: DOCUMENTS REQUIRED ── */}
                <div className="w-[28%] bg-white px-4 py-2 border border-[#e0e8d8] rounded-2xl  ">
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
                <div className="w-[72%] bg-white px-4 py-2 border border-[#e0e8d8] rounded-2xl ">
                    <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide mb-2">
                        How It Works?
                    </h2>

                    {/* Steps Row */}
                    <div className="flex items-start justify-between relative">

                        {/* Connecting line */}
                        <div className="absolute top-[52px] left-[8%] right-[8%] h-px border-t-2 border-dashed border-gray-300 z-0" />

                        {[
                            {
                                num: 1,
                                title: 'Apply Online',
                                desc: 'Fill the PMS application form',
                                icon: (
                                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M30 6H12a2 2 0 0 0-2 2v32a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V14Z" />
                                        <polyline points="30 6 30 14 38 14" />
                                        <line x1="16" y1="22" x2="32" y2="22" />
                                        <line x1="16" y1="28" x2="28" y2="28" />
                                        <path d="M28 32l4-4 4 4" />
                                    </svg>
                                ),
                            },
                            {
                                num: 2,
                                title: 'Upload Documents',
                                desc: 'Submit all required documents online',
                                icon: (
                                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="16 20 24 12 32 20" />
                                        <line x1="24" y1="12" x2="24" y2="34" />
                                        <path d="M10 36a14 14 0 0 0 28 0" />
                                    </svg>
                                ),
                            },
                            {
                                num: 3,
                                title: 'MSME Verification',
                                desc: 'Documents verified by MSME',
                                icon: (
                                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="24" cy="20" r="10" />
                                        <path d="M20 20l3 3 5-5" />
                                        <path d="M16 30l-4 10M32 30l4 10M20 40h8" />
                                    </svg>
                                ),
                            },
                            {
                                num: 4,
                                title: 'Stall Allocation',
                                desc: 'Stall will be allocated',
                                icon: (
                                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M8 20 L24 8 L40 20" />
                                        <rect x="14" y="28" width="8" height="12" />
                                        <rect x="26" y="22" width="12" height="18" />
                                        <line x1="8" y1="40" x2="40" y2="40" />
                                        <path d="M8 20 Q16 16 24 20 Q32 24 40 20" />
                                    </svg>
                                ),
                            },
                            {
                                num: 5,
                                title: 'Exhibit at IHWE',
                                desc: 'Participate in IHWE 2026',
                                icon: (
                                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="18" cy="16" r="6" />
                                        <circle cx="32" cy="16" r="6" />
                                        <path d="M6 40c0-7 5-12 12-12" />
                                        <path d="M42 40c0-7-5-12-12-12" />
                                        <path d="M20 40c0-5 2-8 4-8s4 3 4 8" />
                                    </svg>
                                ),
                            },
                            {
                                num: 6,
                                title: 'Claim Reimbursement',
                                desc: 'Get reimbursement after approval',
                                icon: (
                                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10 34 Q24 42 38 34" />
                                        <circle cx="24" cy="20" r="10" />
                                        <path d="M24 14v12M20 18h6a2 2 0 0 1 0 4h-4a2 2 0 0 0 0 4h6" />
                                    </svg>
                                ),
                            },
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 relative z-10 flex-1">

                                {/* Number badge */}
                                <div className="w-7 h-7 rounded-full bg-[#1e5c1e] text-white text-xs font-black flex items-center justify-center mb-1">
                                    {step.num}
                                </div>

                                {/* Circle with icon */}
                                <div className="w-24 h-24 rounded-full bg-[#f0f5ec] border border-[#d0e4c0] flex items-center justify-center">
                                    {step.icon}
                                </div>

                                {/* Title */}
                                <div className="text-sm font-bold text-gray-900 text-center leading-snug">
                                    {step.title}
                                </div>

                                {/* Desc */}
                                <div className="text-xs text-gray-500 text-center leading-snug max-w-[100px]">
                                    {step.desc}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default WhyPart;