import React, { useState, useEffect } from 'react'

const testimonials = [
    { text: 'We connected with 15+ serious buyers in one day – highly effective platform.', author: '– Director,\nHerbal Wellness Pvt. Ltd.', img: '/bsmeet/slider1.png' },
    { text: 'The pre-scheduled meetings saved time and gave us quality business opportunities.', author: '– Business Head,\nOrganic India', img: '/bsmeet/slider2.png' },
    { text: 'A well-organized event that helped us expand our reach globally and meet the right partners.', author: '– CEO,\nGlobal Wellness', img: '/bsmeet/slider1.png' },
    { text: 'Excellent matchmaking! We closed several deals during the expo itself.', author: '– VP Sales,\nNutriLife', img: '/bsmeet/slider2.png' },
]

const WhatPar = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalPages = Math.ceil(testimonials.length / 2);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalPages);
        }, 3000); // 3 seconds per slide
        return () => clearInterval(timer);
    }, [totalPages]);

    return (
        <div className="bg-[#FAF9F2] py-8 px-16 font-['Barlow',sans-serif]">
            <div className='flex justify-between w-full gap-4'>

                {/* ── LEFT: IMPACT BOX ── */}
                <div
                    className="w-[40%] rounded-[14px] pt-6 px-7 pb-7 relative flex-1"
                    style={{
                        backgroundImage: "url('/bsmeet/world-map.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#1e4020',
                    }}
                >
                    {/* World Map Background */}
                    {/* <img
                        src="/bsmeet/world-map.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none"
                    /> */}

                    {/* Title */}
                    <div className="text-[15px] font-extrabold text-[#d4a832] uppercase tracking-[0.8px] text-center mb-[22px] relative z-10">
                        Buyer–Seller Meet 2026 Impact
                    </div>

                    {/* Stats Row — 4 columns with dashed dividers */}
                    <div className="grid grid-cols-[1fr_1px_1fr_1px_1fr_1px_1fr] items-start relative z-10">
                        {[
                            { icon: '/bsmeet/bsm1.png', num: '600+', label: 'Pre-scheduled\nMeetings' },
                            { icon: '/bsmeet/bsm2.png', num: '1000+', label: 'Verified\nBuyers' },
                            { icon: '/bsmeet/bsm3.png', num: '100+', label: 'Exhibiting\nBrands' },
                            { icon: '/bsmeet/bsm4.png', num: '', label: 'Global\nParticipation' },
                        ].map((item, i) => (
                            <React.Fragment key={i}>
                                {/* Dashed divider before every item except first */}
                                {i > 0 && (
                                    <div className="border-l-[1.5px] border-dashed border-white/30 self-stretch mx-1" />
                                )}
                                <div className="flex flex-col items-center gap-2 px-1.5">
                                    <img src={item.icon} alt="" className="w-[70px] h-[70px] object-contain" />
                                    <div className="text-[28px] font-extrabold text-[#d4a832] leading-none">
                                        {item.num}
                                    </div>
                                    <div className="text-[12px] text-[#cde0c5] text-center leading-[1.45] whitespace-pre-line">
                                        {item.label}
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* ── MIDDLE: TESTIMONIALS ── */}
                <div className="w-[60%] bg-white rounded-[14px] p-3 pb-5 flex flex-col gap-3.5 border border-[#e8e8e8] min-w-0">
                    <div className="text-lg font-medium text-[#1a3d20] uppercase tracking-[0.5px] text-center">
                        What Participants Say
                    </div>
                    <div className="flex-1 overflow-hidden flex items-center">
                        <div className="flex transition-transform duration-500 ease-in-out w-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {testimonials.map((t, i) => (
                                <div key={i} className="min-w-[33%] px-[5px] box-border">
                                    <div className="border border-[#e4e4e4] rounded-[10px] pt-3.5 px-3 pb-3 flex flex-col justify-between gap-2.5 h-full">
                                        <div>
                                            <div className="text-xl text-[#3a7a30] leading-[0.8] font-['Georgia',serif] font-medium">&#10077;</div>
                                            <div className="text-sm text-[#333] leading-[1.55] mt-1.5">{t.text}</div>
                                        </div>
                                        <div className="flex items-end justify-between gap-2">
                                            <div className="text-sm font-medium text-[#555] leading-[1.5] italic whitespace-pre-line">{t.author}</div>
                                            {/* <img src={t.img} alt="" style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'fit', border: '2px solid #f0e8d0', flexShrink: 0 }} /> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-1.5">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors duration-300 ${currentIndex === i ? 'bg-[#3a7a30]' : 'bg-[#ccc]'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: FORM ── */}
                {/* <div style={{ flex: 1, background: '#1e4020', borderRadius: '14px', padding: '22px 18px 20px', display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center', lineHeight: 1.3 }}>
                        Join the Buyer–Seller Meet
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {['Full Name*', 'Company Name*', 'Email*', 'Mobile Number*'].map((p, i) => (
                            <input key={i} type="text" placeholder={p} style={{ background: '#fff', border: 'none', borderRadius: '6px', padding: '10px 12px', fontSize: '11.5px', color: '#333', outline: 'none', width: '100%', fontFamily: 'inherit' }} />
                        ))}
                        <select style={{ background: '#fff', border: 'none', borderRadius: '6px', padding: '10px 12px', fontSize: '11.5px', color: '#888', outline: 'none', width: '100%', fontFamily: 'inherit', gridColumn: '1' }}>
                            <option value="" disabled selected>I am a* (Buyer / Seller)</option>
                            <option>Buyer</option>
                            <option>Seller</option>
                        </select>
                        <input type="text" placeholder="Product Interest*" style={{ background: '#fff', border: 'none', borderRadius: '6px', padding: '10px 12px', fontSize: '11.5px', color: '#333', outline: 'none', width: '100%', fontFamily: 'inherit' }} />
                    </div>
                    <button style={{ background: '#c99a2e', border: 'none', borderRadius: '6px', padding: '13px', fontSize: '13px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}>
                        Submit Registration
                    </button>
                    <div style={{ fontSize: '10px', color: '#aacca5', textAlign: 'center', lineHeight: 1.4 }}>
                        🔒 Your information is safe with us and will never be shared.
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default WhatPar