import React from "react";

const WhyPart = () => {
    const benefits = [
        {
            label: 'Significant reduction\nin exhibition cost',
            icon: (
                <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M28 8L16 16v14c0 10 6 16 12 18 6-2 12-8 12-18V16Z" />
                    <circle cx="28" cy="26" r="6" />
                    <path d="M28 20v12M22 26h12" />
                </svg>
            ),
        },
        {
            label: 'Access to national &\nInternational buyers',
            icon: (
                <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="28" cy="28" r="18" />
                    <ellipse cx="28" cy="28" rx="8" ry="18" />
                    <line x1="10" y1="28" x2="46" y2="28" />
                    <path d="M13 18 Q28 22 43 18" />
                    <path d="M13 38 Q28 34 43 38" />
                    <path d="M28 10 Q22 16 22 28 Q22 40 28 46" />
                </svg>
            ),
        },
        {
            label: 'Government-supported\ncredibility',
            icon: (
                <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="48" x2="48" y2="48" />
                    <rect x="14" y="28" width="6" height="20" />
                    <rect x="25" y="22" width="6" height="26" />
                    <rect x="36" y="32" width="6" height="16" />
                    <path d="M10 26 L28 12 L46 26" />
                    <line x1="22" y1="12" x2="22" y2="18" />
                    <rect x="18" y="6" width="8" height="6" rx="1" />
                </svg>
            ),
        },
        {
            label: 'Increase brand\nvisibility',
            icon: (
                <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M28 10L18 18v12c0 8 4 14 10 16 6-2 10-8 10-16V18Z" />
                    <path d="M22 28l4 4 8-8" />
                </svg>
            ),
        },
        {
            label: 'Expand your\nbusiness network',
            icon: (
                <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="20" cy="18" r="6" />
                    <circle cx="36" cy="18" r="6" />
                    <circle cx="28" cy="32" r="6" />
                    <path d="M8 42c0-6 5-10 12-10" />
                    <path d="M48 42c0-6-5-10-12-10" />
                    <path d="M20 42c0-5 4-8 8-8s8 3 8 8" />
                </svg>
            ),
        },
        {
            label: 'Boost sales &\ndistribution',
            icon: (
                <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="22" cy="18" r="6" />
                    <circle cx="36" cy="14" r="5" />
                    <path d="M10 42c0-6 5-10 12-10" />
                    <path d="M36 42c0-5-4-9-10-9" />
                    <path d="M36 42c0-5 4-8 8-8" />
                    <polyline points="38 6 44 12 38 18" />
                    <line x1="30" y1="12" x2="44" y2="12" />
                </svg>
            ),
        },
    ];

    return (
        <div className="px-14">

            {/* ── SECTION ONE: WHY PARTICIPATE ── */}
            <div className='bg-white px-4 py-2 border border-[#e0e8d8] rounded-2xl mt-4'>                {/* Heading */}
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
                            <div className="flex-1 flex flex-col items-center gap-3 px-4 py-2 text-center">
                                <div className="flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <p className="text-sm text-gray-600 leading-snug whitespace-pre-line">
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

        </div>
    );
};

export default WhyPart;