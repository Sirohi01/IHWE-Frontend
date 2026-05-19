import React from 'react'
import SectionContainer from "@/components/layout/SectionContainer";

const buyerIcons = {
    "Distributors & Wholesalers": (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="7" cy="6" r="3" stroke="#6a8c3a" strokeWidth="1.5" />
            <path d="M1 18c0-3.5 2.5-5.5 6-5.5S13 14.5 13 18" stroke="#6a8c3a" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="6" r="2.5" stroke="#6a8c3a" strokeWidth="1.4" />
            <path d="M13 18c0-2.5 1.5-4 3-4s3 1.5 3 4" stroke="#6a8c3a" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    ),
    "Retail Chains & Stores": (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="2" y="9" width="18" height="11" rx="1.5" stroke="#6a8c3a" strokeWidth="1.5" />
            <path d="M2 9l2-6h14l2 6" stroke="#6a8c3a" strokeWidth="1.5" strokeLinejoin="round" />
            <rect x="8" y="13" width="6" height="7" rx="1" stroke="#6a8c3a" strokeWidth="1.3" />
        </svg>
    ),
    "Importers & Exporters": (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#6a8c3a" strokeWidth="1.5" />
            <ellipse cx="11" cy="11" rx="4" ry="8" stroke="#6a8c3a" strokeWidth="1.2" />
            <line x1="3" y1="11" x2="19" y2="11" stroke="#6a8c3a" strokeWidth="1.2" />
            <path d="M7 4.5h8M7 17.5h8" stroke="#6a8c3a" strokeWidth="1" strokeDasharray="2 1.5" />
        </svg>
    ),
    "Hospitals & Wellness Centers": (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="5" width="16" height="15" rx="1.5" stroke="#6a8c3a" strokeWidth="1.5" />
            <path d="M7 5V3h8v2" stroke="#6a8c3a" strokeWidth="1.4" />
            <line x1="11" y1="9" x2="11" y2="16" stroke="#6a8c3a" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="7.5" y1="12.5" x2="14.5" y2="12.5" stroke="#6a8c3a" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    ),
    "E-commerce & Online Platforms": (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3 4h2l2.5 9h9l2-6H7" stroke="#6a8c3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9.5" cy="17.5" r="1.5" stroke="#6a8c3a" strokeWidth="1.3" />
            <circle cx="15.5" cy="17.5" r="1.5" stroke="#6a8c3a" strokeWidth="1.3" />
        </svg>
    ),
    "Pharmacies & Drug Stores": (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="7" width="16" height="11" rx="2" stroke="#6a8c3a" strokeWidth="1.5" />
            <path d="M3 11h16" stroke="#6a8c3a" strokeWidth="1.4" />
            <path d="M7 4h8" stroke="#6a8c3a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8.5 14.5h2.5M10.5 13v3" stroke="#6a8c3a" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
    ),
    "Departmental Stores": (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="4" width="16" height="16" rx="1.5" stroke="#6a8c3a" strokeWidth="1.5" />
            <line x1="3" y1="9" x2="19" y2="9" stroke="#6a8c3a" strokeWidth="1.2" />
            <line x1="3" y1="14" x2="19" y2="14" stroke="#6a8c3a" strokeWidth="1.2" />
            <line x1="11" y1="4" x2="11" y2="20" stroke="#6a8c3a" strokeWidth="1.2" />
        </svg>
    ),
    "Institutional & Government Buyers": (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2L3 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6L11 2z" stroke="#6a8c3a" strokeWidth="1.5" />
            <line x1="7" y1="11" x2="15" y2="11" stroke="#6a8c3a" strokeWidth="1.3" />
            <line x1="11" y1="7" x2="11" y2="15" stroke="#6a8c3a" strokeWidth="1.3" />
        </svg>
    ),
    "Investors & Business Consultants": (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="2" y="7" width="18" height="13" rx="2" stroke="#6a8c3a" strokeWidth="1.5" />
            <path d="M7 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#6a8c3a" strokeWidth="1.4" />
            <line x1="2" y1="13" x2="20" y2="13" stroke="#6a8c3a" strokeWidth="1.3" />
            <line x1="11" y1="11" x2="11" y2="15" stroke="#6a8c3a" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    ),
}

const buyers = [
    "Distributors & Wholesalers",
    "Retail Chains & Stores",
    "Importers & Exporters",
    "Hospitals & Wellness Centers",
    "E-commerce & Online Platforms",
    "Pharmacies & Drug Stores",
    "Departmental Stores",
    "Institutional & Government Buyers",
    "Investors & Business Consultants",
]


const sellers = [
    "Health & Wellness Brands",
    "Ayurvedic & Herbal Companies",
    "Nutraceutical & Supplement Brands",
    "Organic Product Manufacturers",
    "Medical Equipment Companies",
    "Cosmetic & Personal Care Brands",
    "Food & Beverage Companies",
    "Spa & Wellness Service Providers",
    "Fitness & Nutrition Brands",
    "Startups & Innovators",
    "Contract Manufacturers",
    "Packaging & Raw Material Suppliers",
]

const benefits = [
    {
        title: "Pre-scheduled Meetings",
        desc: "Meet the right buyers at the right time.",
        icon: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="9" cy="10" r="4.5" stroke="#c8941a" strokeWidth="1.8" />
                <path d="M2 24c0-4.5 3-7 7-7" stroke="#c8941a" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="22" cy="13" r="6.5" stroke="#c8941a" strokeWidth="1.8" />
                <path d="M22 9.5v4l3 2" stroke="#c8941a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="22" y1="7.5" x2="22" y2="8.5" stroke="#c8941a" strokeWidth="1.3" strokeLinecap="round" />
                <line x1="22" y1="17.5" x2="22" y2="18.5" stroke="#c8941a" strokeWidth="1.3" strokeLinecap="round" />
                <line x1="16.5" y1="13" x2="17.5" y2="13" stroke="#c8941a" strokeWidth="1.3" strokeLinecap="round" />
                <line x1="26.5" y1="13" x2="27.5" y2="13" stroke="#c8941a" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Verified & Quality Buyers",
        desc: "Connect with serious & genuine buyers.",
        icon: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="13" stroke="#c8941a" strokeWidth="1.4" strokeDasharray="3 2" />
                <path d="M15 4v3M15 23v3M4 15h3M23 15h3M7.2 7.2l2.1 2.1M20.7 20.7l2.1 2.1M7.2 22.8l2.1-2.1M20.7 9.3l2.1-2.1" stroke="#c8941a" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="15" cy="15" r="5" stroke="#c8941a" strokeWidth="1.6" />
                <path d="M12 15l2.2 2.5 4-4.5" stroke="#c8941a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Faster Deal Closures",
        desc: "Shorten the sales cycle and boost ROI.",
        icon: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M15 2L3 7v8c0 7 5 12.5 12 14 7-1.5 12-7 12-14V7L15 2z" stroke="#c8941a" strokeWidth="1.8" />
                <path d="M15 7L8 10.5v6c0 4.5 3.2 8 7 9 3.8-1 7-4.5 7-9v-6L15 7z" stroke="#c8941a" strokeWidth="1.2" opacity="0.55" />
                <path d="M10.5 15.5l3.5 3.5 6-7" stroke="#c8941a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Market Expansion",
        desc: "Explore new geographies & channels.",
        icon: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="6" cy="10" r="4" stroke="#c8941a" strokeWidth="1.7" />
                <path d="M1 24c0-4 2.5-6 5-6" stroke="#c8941a" strokeWidth="1.7" strokeLinecap="round" />
                <circle cx="24" cy="10" r="4" stroke="#c8941a" strokeWidth="1.7" />
                <path d="M29 24c0-4-2.5-6-5-6" stroke="#c8941a" strokeWidth="1.7" strokeLinecap="round" />
                <circle cx="15" cy="9" r="4.5" stroke="#c8941a" strokeWidth="1.8" />
                <path d="M8 26c0-4.5 3-7 7-7s7 2.5 7 7" stroke="#c8941a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Strong Networking",
        desc: "Build long-term relationships with industry leaders.",
        icon: (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="5" cy="9" r="3.5" stroke="#c8941a" strokeWidth="1.6" />
                <path d="M1 20c0-3 1.8-4.5 4-4.5" stroke="#c8941a" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="25" cy="9" r="3.5" stroke="#c8941a" strokeWidth="1.6" />
                <path d="M29 20c0-3-1.8-4.5-4-4.5" stroke="#c8941a" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="15" cy="7" r="4" stroke="#c8941a" strokeWidth="1.7" />
                <circle cx="15" cy="20" r="4" stroke="#c8941a" strokeWidth="1.7" />
                <path d="M10 28c0-3 2-5 5-5s5 2 5 5" stroke="#c8941a" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="9" y1="11" x2="12" y2="16" stroke="#c8941a" strokeWidth="1.1" strokeDasharray="1.5 1.5" />
                <line x1="21" y1="11" x2="18" y2="16" stroke="#c8941a" strokeWidth="1.1" strokeDasharray="1.5 1.5" />
                <line x1="15" y1="11" x2="15" y2="16" stroke="#c8941a" strokeWidth="1.1" strokeDasharray="1.5 1.5" />
            </svg>
        ),
    },
]

const StarIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
        <path d="M6.5 1l1.2 3.8H11L8.1 7l1.1 3.5L6.5 8.3 3.8 10.5 4.9 7 2 4.8h3.3z" stroke="#b8861a" strokeWidth="1.1" />
    </svg>
)

const BuyerIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="5" cy="4" r="2" stroke="#6a8c3a" strokeWidth="1.2" />
        <path d="M1 12c0-2.5 1.8-4 4-4" stroke="#6a8c3a" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="10" cy="4" r="2" stroke="#6a8c3a" strokeWidth="1.2" />
        <path d="M7 12c0-2.5 1.8-4 3-4" stroke="#6a8c3a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
)

const WhoShould = () => {
    return (

        <div className=" relative w-full overflow-hidden py-8  bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bsmeet/whoShould.png')", backgroundColor: '#f5f8f0', fontFamily: "'Barlow', sans-serif" }}>
            <div className={`flex justify-between flex-row ${SectionContainer}`}>
                {/* ── LEFT: WHO SHOULD + BUYERS ── */}
                <div>
                    <h2 className='text-lg font-normal uppercase ' style={{ color: '#fff', letterSpacing: '0.5px', marginBottom: '14px' }}>
                        WHO SHOULD PARTICIPATE?
                    </h2>

                    <div >

                        {/* ── HEADER with diagonal right-side cut ── */}
                        <div className="py-2 text-center text-sm font-medium rounded-t-md bg-[#6a8c3a] text-white uppercase tracking-[1px] [clip-path:polygon(0_0,82%_0,100%_100%,0_100%)]">
                            BUYERS
                        </div>

                        {/* ── BODY ── */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '0 0px 10px 10px',
                            padding: '10px 14px',
                        }}>
                            {buyers.map((label, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '7px 0',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#1a3d20',
                                    borderBottom: i < buyers.length - 1 ? '0.5px solid #e8f0e0' : 'none',
                                }}>
                                    <div style={{ flexShrink: 0, width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {buyerIcons[label]}
                                    </div>
                                    {label}
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
                {/* ── RIGHT: KEY BENEFITS ── */}
                <div className='flex gap-3'>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                        {/* Sellers Card */}
                        <div className="bg-white rounded-[10px_30px_10px_10px] overflow-hidden">
                            <div className="bg-[#b8861a] py-2.5 px-4 text-center font-['Barlow_Condensed',sans-serif] text-sm font-medium text-white uppercase tracking-[1px]">
                                SELLERS
                            </div>
                            <div className="py-2.5 px-3.5">
                                {sellers.map((s, i) => (
                                    <div key={i} className="flex items-center gap-2 py-[5px] text-sm text-[#1a3d20] font-medium">
                                        <StarIcon />
                                        {s}
                                    </div>
                                ))}
                                {/* <div className="flex items-center gap-2 py-[3.5px] text-[11px] text-[#888] italic">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#aaa" strokeWidth="1.1" /><path d="M4 6.5h5M6.5 4v5" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round" /></svg>
                                    ...and many more
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="font-['Barlow',sans-serif]">

                        {/* Heading with side lines */}
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="flex-1 h-[1.5px] bg-white/40" />
                            <h3 className="font-['Barlow_Condensed',sans-serif] text-lg font-medium text-white uppercase tracking-[2px] whitespace-nowrap m-0">
                                KEY BENEFITS
                            </h3>
                            <div className="flex-1 h-[1.5px] bg-white/40" />
                        </div>

                        {/* Benefit rows */}
                        {benefits.map((b, i) => (
                            <div key={i} className={`flex items-start gap-3 py-1.5 ${i < benefits.length - 1 ? 'mb-[18px]' : 'mb-0'}`}>
                                {/* Golden icon circle */}
                                <div className="w-[50px] h-[50px] rounded-full border-[2.5px] border-[#c8941a] bg-[rgba(180,130,20,0.2)] flex items-center justify-center shrink-0">
                                    {b.icon}
                                </div>
                                <div className="pt-1">
                                    <div className="text-sm font-medium text-white leading-[1.3] mb-1">
                                        {b.title}
                                    </div>
                                    <div className="text-[11px] text-white/60 leading-[1.55]">
                                        {b.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WhoShould