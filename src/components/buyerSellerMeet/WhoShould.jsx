// import React from 'react'

// const WhoShould = () => {
//     return (
//         <div className="relative w-full h-[600px] overflow-hidden py-10 px-14 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bsmeet/whoShould.png')", backgroundColor: '#f5f8f0', fontFamily: "'Barlow', sans-serif" }}>
//             <h1 className='text-5xl text-white text-center'>Who Should Participate?</h1>

//         </div>
//     )
// }

// export default WhoShould

import React from 'react'

const buyers = [
    { label: "Distributors & Wholesalers" },
    { label: "Retail Chains & Stores" },
    { label: "Importers & Exporters" },
    { label: "Hospitals & Wellness Centers" },
    { label: "E-commerce & Online Platforms" },
    { label: "Pharmacies & Drug Stores" },
    { label: "Departmental Stores" },
    { label: "Institutional & Government Buyers" },
    { label: "Investors & Business Consultants" },
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
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="6" cy="6" r="3" stroke="#b8861a" strokeWidth="1.3" />
                <path d="M1 16c0-3 2-5 5-5" stroke="#b8861a" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="13" cy="7" r="4" stroke="#b8861a" strokeWidth="1.3" />
                <path d="M13 5v2.5l1.5 1.5" stroke="#b8861a" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Verified & Quality Buyers",
        desc: "Connect with serious & genuine buyers.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="7" r="3.5" stroke="#b8861a" strokeWidth="1.3" />
                <path d="M3 17c0-3.5 2.5-6 6-6s6 2.5 6 6" stroke="#b8861a" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M9 9l-2 1.5v2c0 1 0.8 2 2 2.2 1.2-.2 2-1.2 2-2.2v-2L9 9z" stroke="#b8861a" strokeWidth="1.1" />
                <path d="M7.8 13l1 1 1.5-1.5" stroke="#b8861a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Faster Deal Closures",
        desc: "Shorten the sales cycle and boost ROI.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L2 5v4c0 4 3 7 7 8 4-1 7-4 7-8V5L9 2z" stroke="#b8861a" strokeWidth="1.3" />
                <path d="M6 9l2 2 4-4" stroke="#b8861a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Market Expansion",
        desc: "Explore new geographies & channels.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="#b8861a" strokeWidth="1.3" />
                <ellipse cx="9" cy="9" rx="3.5" ry="7" stroke="#b8861a" strokeWidth="1.1" />
                <line x1="2" y1="9" x2="16" y2="9" stroke="#b8861a" strokeWidth="1.1" />
                <path d="M3.5 6h11M3.5 12h11" stroke="#b8861a" strokeWidth="0.9" strokeDasharray="2 1.5" />
            </svg>
        ),
    },
    {
        title: "Strong Networking",
        desc: "Build long-term relationships with industry leaders.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="5.5" cy="5" r="2.5" stroke="#b8861a" strokeWidth="1.3" />
                <circle cx="12.5" cy="5" r="2.5" stroke="#b8861a" strokeWidth="1.3" />
                <path d="M1 15c0-2.5 2-4 4.5-4" stroke="#b8861a" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M17 15c0-2.5-2-4-4.5-4" stroke="#b8861a" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="9" cy="12" r="2.5" stroke="#b8861a" strokeWidth="1.3" />
                <path d="M6 17c0-1.5 1.3-3 3-3s3 1.5 3 3" stroke="#b8861a" strokeWidth="1.3" strokeLinecap="round" />
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
        // <div
        //     className="relative w-full overflow-hidden"
        //     style={{
        //         background: '#1a3d20',
        //         fontFamily: "'Barlow', sans-serif",
        //         display: 'grid',
        //         gridTemplateColumns: '1fr 1px 0.85fr 1px 0.85fr',
        //         gap: '0 18px',
        //         alignItems: 'start',
        //         padding: '28px 24px',
        //     }}
        // >
        <div className=" relative w-full overflow-hidden py-10 px-14 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bsmeet/whoShould.png')", backgroundColor: '#f5f8f0', fontFamily: "'Barlow', sans-serif" }}>
            <div className='flex justify-between flex-row'>
                {/* ── LEFT: WHO SHOULD + BUYERS ── */}
                <div>
                    <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '24px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
                        WHO SHOULD PARTICIPATE?
                    </h2>

                    <div style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden' }}>
                        {/* Card Header */}
                        <div style={{ background: '#6a8c3a', padding: '8px 14px', textAlign: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            BUYERS
                        </div>
                        <div style={{ padding: '12px 14px' }}>
                            {buyers.map((b, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', fontSize: '11.5px', color: '#1a3d20', fontWeight: 600 }}>
                                    <BuyerIcon />
                                    {b.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── MIDDLE: PHOTO + SELLERS ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    {/* Sellers Card */}
                    <div style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ background: '#b8861a', padding: '8px 14px', textAlign: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            SELLERS
                        </div>
                        <div style={{ padding: '10px 14px' }}>
                            {sellers.map((s, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '3.5px 0', fontSize: '11.5px', color: '#1a3d20', fontWeight: 600 }}>
                                    <StarIcon />
                                    {s}
                                </div>
                            ))}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '3.5px 0', fontSize: '11px', color: '#888', fontStyle: 'italic' }}>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#aaa" strokeWidth="1.1" /><path d="M4 6.5h5M6.5 4v5" stroke="#aaa" strokeWidth="1.1" strokeLinecap="round" /></svg>
                                ...and many more
                            </div>
                        </div>
                    </div>
                </div>



                {/* ── RIGHT: KEY BENEFITS ── */}
                <div>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
                        KEY BENEFITS
                    </h3>
                    {benefits.map((b, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #b8861a', background: 'rgba(184,134,26,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {b.icon}
                            </div>
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{b.title}</div>
                                <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, marginTop: '2px' }}>{b.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WhoShould