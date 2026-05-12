import React from 'react';
import { CheckCircle2, UserSquare, Target, PiggyBank } from 'lucide-react';

const CombineGrid = () => {
    return (
        <div className="px-16 w-full grid grid-cols-3 gap-6 font-['Barlow',sans-serif] mt-6">
            {/* WHO CAN APPLY */}
            <div className="bg-white rounded-2xl border border-[#e0e8d8] overflow-hidden shadow-sm flex flex-col relative group">
                <div className="h-32 w-full overflow-hidden relative">
                    <img src="/msmepmsscheme/msme_exhibition_stalls_grid.png" className="w-full h-full object-cover opacity-60 saturate-0 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-500" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#052411]/80 to-white z-10" />
                    <div className="absolute top-3 left-4 z-20 flex items-center gap-2 text-[#c5df4c]">
                        <UserSquare size={22} strokeWidth={2} />
                        <h3 className="text-sm font-bold text-white tracking-widest uppercase">Who Can Apply?</h3>
                    </div>
                </div>
                <div className="p-5 bg-white flex-1 -mt-16 relative z-30 rounded-t-2xl">
                    <div className="space-y-3">
                        {[
                            "MSMEs with valid Udyam Registration",
                            "Manufacturers / Service Providers",
                            "Startups registered under MSME category",
                            "Businesses in Health, Wellness, Ayurveda, Organic, Pharma, Nutraceuticals and related sectors"
                        ].map((text, i) => (
                            <div key={i} className="flex items-start gap-3 group/item">
                                <CheckCircle2 size={14} className="text-green-700 mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform" strokeWidth={2.5} />
                                <p className="text-[12px] font-medium text-gray-700 leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* WHY PARTICIPATE */}
            <div className="bg-white rounded-2xl border border-[#e0e8d8] overflow-hidden shadow-sm flex flex-col relative group">
                <div className="h-32 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#0c3019]" />
                    <div className="absolute top-3 left-4 z-20 flex items-center gap-2 text-[#c5df4c]">
                        <Target size={22} strokeWidth={2} />
                        <h3 className="text-sm font-bold text-white tracking-widest uppercase">Why Participate Under PMS?</h3>
                    </div>
                </div>
                <div className="p-5 bg-white flex-1 -mt-16 relative z-30 rounded-t-2xl flex flex-col">
                    <div className="space-y-3 flex-1">
                        {[
                            "Encourages MSMEs to participate in exhibitions",
                            "Helps in exploring new markets & technologies",
                            "Strengthens competitiveness and innovation",
                            "Supports sustainable growth and development",
                            "Increases access to national & international buyers"
                        ].map((text, i) => (
                            <div key={i} className="flex items-start gap-3 group/item">
                                <CheckCircle2 size={14} className="text-green-700 mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform" strokeWidth={2.5} />
                                <p className="text-[12px] font-medium text-gray-700 leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="absolute right-4 bottom-4 w-20 h-20 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
                        <img src="/msmepmsscheme/whypms.png" className="w-full h-full object-contain" alt="" />
                    </div>
                </div>
            </div>

            {/* BENEFITS OF PMS SCHEME */}
            <div className="bg-white rounded-2xl border border-[#e0e8d8] overflow-hidden shadow-sm flex flex-col relative group">
                <div className="h-32 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0b3a1c] to-[#061c0e]" />
                    <div className="absolute top-3 left-4 z-20 flex items-center gap-2 text-[#c5df4c]">
                        <PiggyBank size={22} strokeWidth={2} />
                        <h3 className="text-sm font-bold text-white tracking-widest uppercase">Benefits of PMS Scheme</h3>
                    </div>
                </div>
                <div className="p-5 bg-white flex-1 -mt-16 relative z-30 rounded-t-2xl">
                    <div className="space-y-3">
                        {[
                            { t: "Up to ₹1.5 Lakh* Reimbursement", i: "/msmepmsscheme/reimbursement.png" },
                            { t: "Reduced Cost, Lower Financial Burden", i: "/msmepmsscheme/reducedCost.png" },
                            { t: "Business Growth, Expand Your Network", i: "/msmepmsscheme/businessgrowth.png" },
                            { t: "Market Exposure, Showcase Globally", i: "/msmepmsscheme/marketexposure.png" },
                            { t: "Government Support, Ministry Backed", i: "/msmepmsscheme/govsupport.png" },
                            { t: "Brand Visibility, Enhance Recognition", i: "/msmepmsscheme/brandvisibility.png" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 group/item hover:bg-slate-50 p-1 rounded-lg transition-colors">
                                <div className="w-6 h-6 rounded-full bg-[#f0f7ec] flex items-center justify-center shrink-0">
                                    <img src={item.i} className="w-3.5 h-3.5 object-contain" alt="" />
                                </div>
                                <p className="text-[11px] font-bold text-gray-800 leading-tight">{item.t}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[8px] text-gray-400 mt-2 italic">*Subsidy amount may vary as per MSME guidelines.</p>
                </div>
            </div>
        </div>
    );
};

export default CombineGrid;
