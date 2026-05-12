import React from "react";
import { FileText, ChevronRight } from "lucide-react";

const WhyPart = ({ onApplyClick }) => {
    const steps = [
        { num: 1, title: 'Apply Online', desc: 'Fill the PMS application form', img: '/mpscheme/how1.png' },
        { num: 2, title: 'Upload Docs', desc: 'Submit required docs online', img: '/mpscheme/how2.png' },
        { num: 3, title: 'Verification', desc: 'Docs verified by MSME', img: '/mpscheme/how3.png' },
        { num: 4, title: 'Stall Allocated', desc: 'Stall allocation notification', img: '/mpscheme/how4.png' },
        { num: 5, title: 'Exhibit at IHWE', desc: 'Participate in IHWE 2026', img: '/mpscheme/how5.png' },
        { num: 6, title: 'Claim Refund', desc: 'Get reimbursement', img: '/mpscheme/how6.png' },
    ];

    return (
        <div className="px-16 w-full mt-6 font-['Barlow',sans-serif]">
            
            <div className="flex gap-6" id="how-works">
                
                {/* HOW IT WORKS */}
                <div className="flex-1 bg-white border border-[#e0e8d8] rounded-2xl p-5 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">How It Works?</h2>
                        <div className="h-[1px] bg-gray-200 flex-1 ml-4"></div>
                    </div>

                    <div className="relative flex items-center justify-between px-2">
                        {/* Connecting Dashed Line */}
                        <div className="absolute top-[30px] left-[8%] right-[8%] h-[1px] border-t border-dashed border-gray-300 pointer-events-none z-0" />

                        {steps.map((s, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center w-[15%] group">
                                <div className="relative mb-3">
                                    <div className="w-14 h-14 rounded-full bg-[#f8fbf6] border border-[#dce6d5] shadow-sm flex items-center justify-center group-hover:border-green-700 transition-colors duration-300">
                                        <img src={s.img} alt="" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-green-800 text-white text-[10px] font-bold flex items-center justify-center shadow-md border border-white">
                                        {s.num}
                                    </div>
                                </div>
                                <h4 className="text-[11px] font-bold text-gray-800 leading-tight mb-1">{s.title}</h4>
                                <p className="text-[9px] text-gray-500 font-medium leading-tight px-1">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DOCUMENTS REQUIRED */}
                <div className="w-[28%] bg-white border border-[#e0e8d8] rounded-2xl p-5 shadow-sm">
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4">Documents Required</h2>
                    <div className="flex flex-col gap-2.5">
                        {[
                            'Udyam Registration Certificate',
                            'PAN Card & GST Certificate',
                            'Company Profile',
                            'Product / Service Details',
                            'Bank Account Details',
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="shrink-0 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                                    <FileText size={12} className="text-green-800" />
                                </div>
                                <span className="text-[11px] font-bold text-gray-700 tracking-tight">{doc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM CTA BANNER */}
            <div className="mt-8 mb-8 relative rounded-3xl bg-[#0c3019] border border-[#1a4a2b] overflow-hidden flex items-center justify-between px-8 py-6 shadow-xl" style={{ background: 'linear-gradient(135deg, #0b3118 0%, #05160b 100%)' }}>
                
                {/* Abstract green graphic blobs in BG */}
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-green-700/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute right-10 top-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-6 relative z-10">
                    {/* Trophy/Badge Image provided in mpscheme directory */}
                    <div className="relative w-20 h-20 flex-shrink-0 transform -translate-y-2">
                        <img src="/mpscheme/trofi1.png" className="w-full h-full object-contain drop-shadow-2xl scale-125" alt="Success" />
                    </div>
                    <div>
                        <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase mb-1 flex items-center gap-2">
                            Don't Miss This <span className="text-[#f3b71b]">Government-Supported Opportunity!</span>
                        </h2>
                        <p className="text-[12px] text-gray-300 font-medium max-w-xl">
                            Exhibit at IHWE 2026 and take your business to the next level with financial support under the MSME PMS Scheme.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10 shrink-0">
                    <button
                        onClick={onApplyClick}
                        className="bg-[#f3b71b] hover:bg-[#eab000] text-[#0c3019] px-6 py-2.5 rounded-lg font-black text-[11px] tracking-widest uppercase flex items-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                        Apply Now <ChevronRight size={14} strokeWidth={3} />
                    </button>
                    <button
                        onClick={() => window.open('/book-a-stand', '_blank')}
                        className="border-2 border-white text-white hover:bg-white/10 px-6 py-2.5 rounded-lg font-black text-[11px] tracking-widest uppercase flex items-center gap-2 transition-all"
                    >
                        Book Stall
                    </button>
                </div>
            </div>

        </div>
    );
};

export default WhyPart;