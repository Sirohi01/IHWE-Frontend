import React from 'react';
import { CheckCircle, User2, Target, Briefcase } from 'lucide-react';

const CombineGrid = () => {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-['Barlow',sans-serif] mt-4 mb-4">

            {/* ── CARD 1: WHO CAN APPLY? ── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm relative overflow-hidden min-h-[240px] group transition-all duration-300 hover:shadow-md">
                {/* BG Image Blended Right */}
                <div className="absolute top-0 right-0 w-full sm:w-[50%] h-full pointer-events-none z-0 opacity-10 sm:opacity-90">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 sm:via-white/70 to-transparent z-10" />
                    <img
                        src="/msmepmsscheme/combine_handshake.png"
                        className="w-full h-full object-cover object-center saturate-[0.9] transition-transform duration-700 group-hover:scale-100"
                        alt=""
                    />
                </div>

                <div className="relative z-20 p-5 h-full flex flex-col pr-5 sm:pr-[35%]">
                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-white border-2 border-[#166534] flex items-center justify-center shadow-sm shrink-0">
                            <User2 size={16} className="text-[#166534]" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-[13px] font-black text-[#051d40] uppercase tracking-wide">Who Can Apply?</h3>
                    </div>

                    {/* LIST CONTENT */}
                    <div className="space-y-2.5 flex-1">
                        {[
                            "MSMEs with valid Udyam Registration",
                            "Manufacturers / Service Providers",
                            <>Startups registered under<br />MSME category</>,
                            <>Businesses in Health, Wellness,<br />Ayurveda, Organic, Pharma,<br />Nutraceuticals and related sectors</>
                        ].map((text, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                                <CheckCircle size={13} className="text-[#166534] mt-0.5 shrink-0 opacity-80" strokeWidth={2.5} />
                                <span className="text-[11px] font-bold text-slate-700 leading-snug">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── CARD 2: WHY PARTICIPATE ── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm relative overflow-hidden min-h-[240px] group transition-all duration-300 hover:shadow-md">
                {/* BG Image Blended Right */}
                <div className="absolute top-0 right-0 w-full sm:w-[50%] h-full pointer-events-none z-0 opacity-10 sm:opacity-90">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                    <img
                        src="/msmepmsscheme/combine_bullseye.png"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-100"
                        alt=""
                    />
                </div>

                <div className="relative z-20 p-5 h-full flex flex-col pr-5 sm:pr-[30%]">
                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-white border-2 border-[#1d4ed8] flex items-center justify-center shadow-sm shrink-0">
                            <Target size={16} className="text-[#1d4ed8]" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-[13px] font-black text-[#051d40] uppercase tracking-wide">Why Participate Under PMS Scheme?</h3>
                    </div>

                    {/* LIST CONTENT */}
                    <div className="space-y-2.5 flex-1">
                        {[
                            "Encourages MSMEs to participate in exhibitions",
                            "Helps in exploring new markets & technologies",
                            "Strengthens competitiveness and innovation",
                            "Supports sustainable growth and development",
                            <>Increases access to national &<br />international buyers</>
                        ].map((text, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                                <CheckCircle size={13} className="text-[#166534] mt-0.5 shrink-0 opacity-80" strokeWidth={2.5} />
                                <span className="text-[11px] font-bold text-slate-700 leading-snug">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── CARD 3: BENEFITS ── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm relative overflow-hidden min-h-[240px] group transition-all duration-300 hover:shadow-md">
                {/* BG Image Blended Right */}
                <div className="absolute top-0 right-0 w-full sm:w-[50%] h-full pointer-events-none z-0 opacity-10 sm:opacity-95">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-10" />
                    <img
                        src="/msmepmsscheme/combine_moneyplant.png"
                        className="w-full h-full object-cover object-center saturate-[1.1] transition-transform duration-700 group-hover:scale-100"
                        alt=""
                    />
                </div>

                <div className="relative z-20 p-5 h-full flex flex-col pr-5 sm:pr-[30%]">
                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-white border-2 border-[#15803d] flex items-center justify-center shadow-sm shrink-0">
                            <Briefcase size={16} className="text-[#15803d]" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-[13px] font-black text-[#15803d] uppercase tracking-wide">Benefits of PMS Scheme</h3>
                    </div>

                    {/* LIST CONTENT - Unique Mini Icons */}
                    <div className="space-y-2 flex-1">
                        {[
                            { t: "Up to ₹1.5 Lakh* Reimbursement", i: "/msmepmsscheme/reimbursement.png" },
                            { t: "Reduced Cost, Lower Financial Burden", i: "/msmepmsscheme/reducedCost.png" },
                            { t: "Business Growth, Expand Your Network", i: "/msmepmsscheme/businessgrowth.png" },
                            { t: "Market Exposure, Showcase Globally", i: "/msmepmsscheme/marketexposure.png" },
                            { t: "Government Support, Ministry Backed", i: "/msmepmsscheme/govsupport.png" },
                            { t: "Brand Visibility, Enhance Recognition", i: "/msmepmsscheme/brandvisibility.png" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                {/* <img src={item.i} className="w-8 h-8 object-contain shrink-0" alt="" /> */}
                                <CheckCircle size={13} className="text-[#166534] mt-0.5 shrink-0 opacity-80" strokeWidth={2.5} />
                                <span className="text-[11px] font-bold text-slate-700 leading-tight">{item.t}</span>
                            </div>
                        ))}
                    </div>

                    {/* Small print bottom disclaimer */}
                    <div className="mt-3">
                        <p className="text-[9px] text-slate-500 font-bold uppercase leading-tight tracking-tight">
                            *Subsidy amount may vary as per MSME<br />guidelines, category and approval.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CombineGrid;
