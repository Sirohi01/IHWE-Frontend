import React, { useState, useEffect } from 'react'
import { api } from '../../lib/api';
import SectionContainer from "@/components/layout/SectionContainer";

const WhatPar = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchTestimonials = async () => {
        try {
            const res = await api.get('/api/bsm-testimonials/testimonials');
            if (res.data.success) {
                setTestimonials(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching BSM testimonials:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    useEffect(() => {
        if (testimonials.length > 2) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % (testimonials.length));
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [testimonials.length]);

    // Slider logic: Translate by 50% for 2 items view
    const getTransform = () => {
        if (testimonials.length <= 2) return 'translateX(0%)';
        // If we are at the last item, we shouldn't translate past the end
        const maxIndex = testimonials.length - 2;
        const index = Math.min(currentIndex, maxIndex);
        return `translateX(-${index * 50}%)`;
    };

    return (
        <div className="bg-[#FAF9F2] py-6 font-['Barlow',sans-serif]">
            <SectionContainer className="flex justify-between w-full gap-4">

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
                    {/* Title */}
                    <div className="text-[15px] font-extrabold text-[#d4a832] uppercase tracking-[0.8px] text-center mb-[22px] relative z-10">
                        Buyer–Seller Meet 2026 Impact
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-[1fr_1px_1fr_1px_1fr_1px_1fr] items-start relative z-10">
                        {[
                            { icon: '/bsmeet/bsm1.png', num: '600+', label: 'Pre-scheduled\nMeetings' },
                            { icon: '/bsmeet/bsm2.png', num: '1000+', label: 'Verified\nBuyers' },
                            { icon: '/bsmeet/bsm3.png', num: '100+', label: 'Exhibiting\nBrands' },
                            { icon: '/bsmeet/bsm4.png', num: 'Global', label: 'World Wide\nParticipation' },
                        ].map((item, i) => (
                            <React.Fragment key={i}>
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
                <div className="w-[60%] bg-[#2A4924] rounded-[14px] p-4 pb-5 flex flex-col gap-4 border border-[#e8e8e8] min-w-0 shadow-sm relative overflow-hidden">
                    <div className="text-lg font-bold text-[#d4a832] uppercase tracking-[0.5px] text-center">
                        What Participants Say
                    </div>
                    <div className="flex-1 overflow-hidden flex items-center relative">
                        {loading ? (
                            <div className="w-full h-40 flex items-center justify-center text-[#d4a832] font-bold uppercase tracking-widest text-xs">
                                Loading Testimonials...
                            </div>
                        ) : (
                            <div className="flex transition-transform duration-700 ease-in-out w-full" style={{ transform: getTransform() }}>
                                {testimonials.map((t, i) => (
                                    <div key={t._id || i} className="min-w-[50%] px-2 box-border">
                                        <div className="bg-[#fcfdfa] border border-[#e4e4e4] rounded-[10px] p-4 flex flex-col justify-between gap-3 h-full hover:shadow-md transition-shadow duration-300">
                                            <div>
                                                <div className="text-3xl text-[#3a7a30] leading-[0.8] font-['Georgia',serif] font-medium opacity-70">&#10077;</div>
                                                <div className="text-[13px] md:text-sm text-[#444] leading-[1.6] mt-2 font-medium">{t.text}</div>
                                            </div>
                                            <div className="flex items-end justify-between gap-2 mt-2 pt-3 border-t border-gray-100">
                                                <div className="flex flex-col">
                                                    <div className="text-[13px] font-bold text-[#2a4d30] leading-[1.2]">— {t.name}</div>
                                                    <div className="text-[11px] font-medium text-gray-500 leading-[1.2] mt-0.5">{t.designation}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {!loading && testimonials.length > 2 && (
                        <div className="flex justify-center gap-2 mt-1">
                            {Array.from({ length: testimonials.length - 1 }).map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`h-2.5 rounded-full cursor-pointer transition-all duration-500 ${currentIndex === i ? 'bg-[#3a7a30] w-6' : 'bg-[#ccc] w-2.5 hover:bg-[#a0b898]'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </SectionContainer>
        </div>
    )
}

export default WhatPar;