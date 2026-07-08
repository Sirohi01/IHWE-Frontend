import React from 'react';
import {
    Store, Hammer, Presentation, Zap, Truck, FileText, Plane,
    Leaf, Pill, Activity, FlaskRound, Hospital,
    Dumbbell, Sparkles, Brain, Microscope, Globe
} from 'lucide-react';

const ExpensesIndustries = () => {
    const expenses = [
        { icon: Store, label: <>Stall Booking<br />Charges</> },
        { icon: Hammer, label: <>Stall Construction<br />Charges</> },
        { icon: Presentation, label: <>Display /<br />Showcase Materials</> },
        { icon: Zap, label: <>Electricity<br />Connection Charges</> },
        { icon: Truck, label: <>Freight /<br />Logistic Expenses</> },
        { icon: FileText, label: <>Advertisement in<br />Exhibition Directory</> },
        { icon: Plane, label: <>Travel & Lodging<br />Expenses</> }
    ];

    const industries = [
        { icon: Leaf, label: <>Ayush &<br />Herbal</> },
        { icon: Pill, label: <>Pharmaceuticals<br />& Drugs</> },
        { icon: Activity, label: <>Medical<br />Devices</> },
        { icon: FlaskRound, label: <>Nutraceuticals<br />& Supplements</> },
        { icon: Hospital, label: <>Hospital &<br />Diagnostics</> },
        { icon: Dumbbell, label: <>Fitness &<br />Wellness</> },
        { icon: Sparkles, label: <>Beauty &<br />Personal Care</> },
        { icon: Brain, label: <>Mental Health &<br />Well-being</> },
        { icon: Microscope, label: <>Health Tech &<br />Digital Health</> },
        { icon: Globe, label: <>Medical Tourism &<br />Wellness Travel</> }
    ];

    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6 font-['Barlow',sans-serif] mt-4 mb-4">

            {/* ── LEFT CARD: WHAT EXPENSES ARE ELIGIBLE ── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 flex flex-col relative group transition-all duration-300 hover:shadow-md">
                <div className="mb-6">
                    <h3 className="text-[14px] font-black text-[#051d40] uppercase tracking-wide">What Expenses Are Eligible</h3>
                    <h3 className="text-[14px] font-black text-[#051d40] uppercase tracking-wide -mt-1">For Reimbursement?</h3>
                    <p className="text-[11px] text-slate-600 font-medium mt-2 leading-tight">
                        Reimbursement is provided for the<br />following eligible heads:
                    </p>
                </div>

                {/* Horizontal Flex row of icons with separators, becomes wrapping grid on small screens */}
                <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 md:flex items-stretch justify-between gap-y-4 md:gap-y-0 mb-4">
                    {expenses.map((item, i) => (
                        <React.Fragment key={i}>
                            <div className="flex-1 flex flex-col items-center text-center group/item px-1">
                                <div className="w-12 h-12 mb-2.5 text-[#166534] flex items-center justify-center transition-transform duration-300 group-hover/item:-translate-y-1 shrink-0">
                                    <item.icon strokeWidth={1.5} size={32} />
                                </div>
                                <span className="text-[10px] font-bold text-[#051d40] leading-tight tracking-tight min-h-[24px] flex items-start justify-center text-center w-full">
                                    {item.label}
                                </span>
                            </div>

                            {/* Segment Bar Separator */}
                            {i < expenses.length - 1 && (
                                <div className="hidden md:block w-[1.5px] bg-[#e2e8f0] self-stretch h-[60px] mt-2 opacity-70" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Bottom Fine Print */}
                <div className="text-center mt-auto">
                    <p className="text-[9px] text-slate-400 font-bold italic tracking-tight">
                        *Actual reimbursement is subject to ceilings as per MSME norms.
                    </p>
                </div>
            </div>

            {/* ── RIGHT CARD: INDUSTRIES WE SERVE ── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md flex">
                {/* Background Blended Right */}
                <div className="absolute top-0 right-0 w-full sm:w-[45%] h-full pointer-events-none z-0 opacity-10 sm:opacity-90">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-10" />
                    <img loading="lazy" decoding="async" src="/msmepmsscheme/industries_bg.png"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        alt=""
                    />
                </div>

                <div className="relative z-20 p-6 flex-1 pr-4 sm:pr-[28%] flex flex-col">
                    {/* Header */}
                    <div className="mb-6">
                        <h3 className="text-[14px] font-black text-[#051d40] uppercase tracking-wide">Industries We Serve</h3>
                    </div>

                    {/* Responsive Grid, 2 cols small, 3 cols medium, 5 cols large */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-y-6 gap-x-2 items-start flex-1">
                        {industries.map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center group/item px-1 relative">
                                <div className="w-11 h-11 mb-2 text-[#1d4ed8] flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 shrink-0">
                                    <item.icon strokeWidth={1.5} size={28} />
                                </div>
                                <span className="text-[10px] font-bold text-[#051d40] leading-tight tracking-tight min-h-[24px] flex items-start justify-center text-center w-full">
                                    {item.label}
                                </span>

                                {/* Segment Bar Separator between columns - Shown only on large desktop when grid width is fixed 5-cols */}
                                {(i + 1) % 5 !== 0 && (
                                    <div className="hidden md:block absolute top-2 -right-[1px] h-[55px] w-[1.5px] bg-[#e2e8f0] opacity-70 pointer-events-none" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ExpensesIndustries;
