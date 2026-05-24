import { CalendarDays, MapPin, CheckCircle2 } from "lucide-react";
import ExEventCountdown from "../ExEventCountdown";
import { useExhibitorCtx } from "@/context/ExhibitorContext";

const WelcomeHeader = () => {
    const { data } = useExhibitorCtx();
    const companyName = data?.companyName || data?.exhibitorName || data?.fullName || "Exhibitor";

    return (

        <div
            className="bg-white flex justify-between items-stretch gap-5 "
        >
            {/* ── Left ── */}
            <div className="flex flex-col justify-center pr-5">
                <p className="text-xs text-gray-500 mb-1.5 tracking-wide">Welcome back,</p>
                <div className="flex items-center gap-2 mb-2.5">
                    <h2
                        className="text-[20px] font-semibold text-gray-900 leading-tight"
                        style={{
                            textShadow: '0 1px 0 rgba(255,255,255,0.9), 0 2px 4px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)'
                        }}
                    >
                        {companyName}.
                    </h2>
                    <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                            background: 'linear-gradient(135deg,#34d399,#10b981)',
                            boxShadow: '0 2px 6px rgba(16,185,129,0.4), 0 1px 0 rgba(255,255,255,0.3) inset'
                        }}
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                    Here's what's happening with your participation in IHWE 2026.
                </p>
            </div>

            {/* timer banner  */}
            <div
                className="flex-none  bg-white border border-gray-200 rounded-xl px-4 py-1 flex flex-col justify-center gap-2"
                style={{
                    boxShadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 2px 8px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.05)',
                    transform: 'perspective(800px) rotateY(-0.5deg) rotateX(1deg)',
                }}
            >
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                    Event starts in
                </p>
                <ExEventCountdown />
            </div>

            {/* ── Center Card ── */}
            <div
                className="flex-none w-[220px] bg-white border border-gray-200 rounded-xl px-4 py-1 flex flex-col justify-center"
                style={{
                    boxShadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 2px 8px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.05)',
                    transform: 'perspective(800px) rotateY(-1deg) rotateX(1deg)',
                }}
            >
                {/* Date Row */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
                    <div className="w-[32px] h-[32px] rounded-lg bg-[#eef2fb] flex items-center justify-center flex-shrink-0">
                        <CalendarDays size={17} className="text-[#1a3a7c]" />
                    </div>
                    <div>
                        <p
                            className="text-[13px] font-medium text-[#1a3a7c] leading-snug"
                            style={{ textShadow: '0 1px 2px rgba(26,58,124,0.15)' }}
                        >
                            21 – 23 AUGUST 2026
                        </p>
                    </div>
                </div>

                {/* Location Row */}
                <div className="flex items-center gap-2.5 pt-2">
                    <div className="w-[32px] h-[32px] rounded-lg bg-[#eef2fb] flex items-center justify-center flex-shrink-0">
                        <MapPin size={17} className="text-[#1a3a7c]" />
                    </div>
                    <div>
                        <p
                            className="text-[13px] font-medium text-[#1a3a7c] leading-snug"
                            style={{ textShadow: '0 1px 2px rgba(26,58,124,0.15)' }}
                        >
                            PRAGATI MAIDAN,<br />NEW DELHI, INDIA
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Right Banner ── */}
            <div
                className="flex-none w-[260px] rounded-xl overflow-hidden relative flex items-center px-5 py-1"
                style={{
                    background: '#0f2b6e',
                    transform: 'perspective(800px) rotateY(1deg) rotateX(1deg)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15), 0 12px 32px rgba(15,43,110,0.25), 0 1px 0 rgba(255,255,255,0.15) inset',
                }}
            >
                {/* Blobs */}
                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-blue-500/20" />
                <div className="absolute -bottom-8 -left-5 w-28 h-28 rounded-full bg-blue-500/10" />

                {/* Cross */}
                <div
                    className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-lg flex items-center justify-center"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="7" y="2" width="4" height="14" rx="1.5" fill="#1a3a7c" />
                        <rect x="2" y="7" width="14" height="4" rx="1.5" fill="#1a3a7c" />
                    </svg>
                </div>

                {/* Building */}
                <div className="absolute right-0 inset-y-0 w-28 opacity-35 z-[1]">
                    {/* your building SVG */}
                </div>

                {/* Text */}
                <div className="relative z-[2] max-w-[150px]">
                    <p className="text-[11px] text-white/75 mb-1 leading-relaxed">
                        Be a part of the world's leading platform for
                    </p>
                    <p
                        className="text-[15px] font-medium text-white leading-snug"
                        style={{ textShadow: '0 1px 0 rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.4)' }}
                    >
                        Healthcare &amp; Wellness Innovation!
                    </p>
                </div>
            </div>

        </div>

    );
};

export default WelcomeHeader;