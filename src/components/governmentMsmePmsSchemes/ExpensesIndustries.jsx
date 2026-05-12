import React from 'react';
import { Store, Plane, Box, ShieldQuestion, Briefcase, Sparkles, Heart, Microscope, PlaneTakeoff, Pill, HeartPulse, Activity, Leaf } from 'lucide-react';

const ExpensesIndustries = () => {
    const expenses = [
        { icon: Store, label: "Stall Rent / Space Charges", desc: "Reimbursement on booking cost" },
        { icon: Box, label: "Built-up Booth Charges", desc: "Cost of constructing standard stalls" },
        { icon: Plane, label: "Economy Airfare", desc: "Travel assistance for participation" },
        { icon: ShieldQuestion, label: "Contingency Expenses", desc: "Misc expenses subject to approval" }
    ];

    const industries = [
        { icon: Leaf, l1: "Ayush &", l2: "Herbal" },
        { icon: Pill, l1: "Pharmaceuticals", l2: "& Drugs" },
        { icon: HeartPulse, l1: "Medical", l2: "Devices" },
        { icon: Activity, l1: "Nutraceuticals", l2: "& Supplements" },
        { icon: Briefcase, l1: "Hospital &", l2: "Diagnostics" },
        { icon: Sparkles, l1: "Beauty &", l2: "Personal Care" },
        { icon: Heart, l1: "Mental Health", l2: "& Well-being" },
        { icon: Microscope, l1: "Health Tech &", l2: "Digital Health" },
        { icon: PlaneTakeoff, l1: "Medical Tourism", l2: "& Travel" },
    ];

    return (
        <div className="px-16 w-full grid grid-cols-1 gap-6 font-['Barlow',sans-serif] mt-6">
            
            {/* WHAT EXPENSES ARE ELIGIBLE */}
            <div className="bg-white border border-[#e0e8d8] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-6 bg-green-800 rounded-full" />
                    <h2 className="text-sm font-bold text-gray-800 tracking-widest uppercase">What Expenses are Eligible for Reimbursement?</h2>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {expenses.map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center bg-[#fbfdf9] border border-[#e0ecd4] rounded-xl p-4 group hover:shadow-md transition-all">
                            <div className="w-14 h-14 rounded-full bg-white border-2 border-[#d6e5c6] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-green-800">
                                <item.icon strokeWidth={1.5} size={28} />
                            </div>
                            <h4 className="text-[12px] font-bold text-gray-800 mb-1 uppercase tracking-tight">{item.label}</h4>
                            <p className="text-[10px] text-gray-500 font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* INDUSTRIES WE SERVE */}
            <div className="bg-[#f0f4ec] border border-[#dce6d5] rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e5c1e 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
                
                <div className="relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="w-4 h-[2px] bg-green-800 opacity-50" />
                        <h2 className="text-sm font-bold text-gray-800 tracking-widest uppercase">Industries We Serve</h2>
                        <div className="w-4 h-[2px] bg-green-800 opacity-50" />
                    </div>

                    <div className="grid grid-cols-9 gap-2">
                        {industries.map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 text-green-800 group-hover:bg-green-800 group-hover:text-white transition-all duration-300">
                                    <item.icon strokeWidth={1.5} size={22} />
                                </div>
                                <div className="flex flex-col min-h-[24px] justify-center">
                                    <span className="text-[9px] font-bold text-gray-700 leading-tight uppercase tracking-tighter group-hover:text-green-900">{item.l1}</span>
                                    <span className="text-[9px] font-bold text-gray-700 leading-tight uppercase tracking-tighter group-hover:text-green-900">{item.l2}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpensesIndustries;
