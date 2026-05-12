import React from 'react';
import { CheckCircle2, TrendingUp, Globe, Landmark } from 'lucide-react';

const MPSchemeHero = ({ onApplyClick }) => {
    return (
        <div
            className="w-full relative flex items-stretch px-16 bg-[url('/mpscheme/bg2.png')] bg-cover bg-center bg-no-repeat min-h-[440px] font-['Barlow',sans-serif]"
        >
            {/* White fade overlay */}
            {/* <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#fff_0%,#fff_38%,rgba(255,255,255,0.7)_55%,transparent_70%)]" /> */}

            {/* ── LEFT CONTENT ── */}
            <div className="relative z-10 flex flex-col gap-[10px] max-w-[560px] justify-center">

                {/* Govt Badge */}
                <div className="inline-flex items-center bg-[#2e6b2e] text-white text-sm font-medium uppercase tracking-[0.8px] px-3 py-1.5 rounded w-fit">
                    Government Supported Scheme
                </div>

                {/* Main Title */}
                <div className="text-4xl font-medium text-[#111] leading-none uppercase">
                    MSME PMS Scheme
                </div>

                <div className="text-lg font-medium text-[#1a1a1a]">
                    Exhibit with Up To
                </div>

                <div className="text-3xl font-medium text-[#1e5c1e] leading-none">
                    ₹1,50,000
                </div>

                <div className="text-2xl font-medium text-[#1a1a1a]">
                    Financial Assistance*
                </div>

                <div className="text-sm text-gray-800 leading-[1.6] max-w-[480px]">
                    Exhibit at International Health & Wellness Expo 2026 with financial support from Ministry of MSME, Government of India.
                </div>

                {/* Features Row */}
                <div className="flex flex-nowrap items-center bg-white border border-[#ddd] rounded-lg py-[10px] px-4 w-fit mt-1.5 gap-0">
                    {/* Reduce Cost */}
                    <div className="flex items-center whitespace-nowrap gap-1.5 text-base font-medium text-[#1a3d20] pr-[14px] border-r border-[#ddd]">
                        <CheckCircle2 size={26} color="#2e7a2e" strokeWidth={1.8} />
                        Reduce Cost
                    </div>
                    {/* Increase Reach */}
                    <div className="flex items-center whitespace-nowrap gap-1.5 text-base font-medium text-[#1a3d20] px-[14px] border-r border-[#ddd]">
                        <TrendingUp size={26} color="#2e7a2e" strokeWidth={1.8} />
                        Increase Reach
                    </div>
                    {/* Grow Globally */}
                    <div className="flex items-center whitespace-nowrap gap-1.5 text-base font-medium text-[#1a3d20] px-[14px] border-r border-[#ddd]">
                        <Globe size={26} color="#2e7a2e" strokeWidth={1.8} />
                        Grow Globally
                    </div>
                    {/* Government Backed */}
                    <div className="flex items-center whitespace-nowrap gap-1.5 text-base font-medium text-[#1a3d20] pl-[14px]">
                        <Landmark size={26} color="#2e7a2e" strokeWidth={1.8} />
                        Government Backed
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="text-sm font-medium text-gray-800 mt-2 italic">
                    *Subsidy amount may vary as per MSME guidelines, category and approval.
                </div>
            </div>

            {/* ── GOLD BADGE IMAGE ── */}
            <img
                src="/mpscheme/heror1.png"
                alt="80% to 100% Subsidy Available"
                className="absolute bottom-14 right-[80px] w-32 h-32 object-contain z-11"
            />

            {/* ── BOTTOM RIGHT BUTTONS ── */}
            <div className="absolute bottom-8 right-11 z-10 flex gap-[14px] items-center">
                <button
                    onClick={onApplyClick}
                    className="bg-green-800 text-white flex items-center gap-2 px-5 py-2 text-sm font-medium uppercase rounded-lg font-normal shadow hover:bg-green-900 transition"
                >
                    Apply for PMS Scheme →
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 border-2 border-gray-800 rounded-lg py-2 px-6 text-sm font-medium uppercase tracking-[0.8px] flex items-center gap-1.5 whitespace-nowrap">
                    Book Your Stall →
                </button>
            </div>
        </div>
    );
};

export default MPSchemeHero;