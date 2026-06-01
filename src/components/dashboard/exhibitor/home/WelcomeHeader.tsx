import { CalendarDays, MapPin, CheckCircle2 } from "lucide-react";
import ExEventCountdown from "../ExEventCountdown";
import { useExhibitorCtx } from "@/context/ExhibitorContext";

const WelcomeHeader = () => {
    const { data } = useExhibitorCtx();
    const companyName = data?.companyName || data?.exhibitorName || data?.fullName || "Exhibitor";

    return (

        <div className="flex flex-col lg:flex-row justify-between lg:items-stretch gap-3 lg:gap-5">
            {/* ── Left ── */}
            <div className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
                <p className="text-xs text-black mb-1.5 tracking-wide">Welcome back,</p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 mb-0.5">
                    <h2
                        className="text-[20px] font-semibold text-gray-900 leading-tight"
                        style={{
                            textShadow: '0 1px 0 rgba(255,255,255,0.9), 0 2px 4px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)'
                        }}
                    >
                        {companyName}.
                    </h2>
                    <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, #02a344, #027D34)',
                            boxShadow: '0 2px 6px rgba(2,125,52,0.4), 0 1px 0 rgba(255,255,255,0.3) inset'
                        }}
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                </div>
                {data?.contact1 && (data?.contact1?.firstName || data?.contact1?.lastName) && (
                    <div className="flex items-center gap-1 mt-1 mb-1">
                        <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            {data.contact1.title ? `${data.contact1.title} ` : ''}{data.contact1.firstName} {data.contact1.lastName}
                        </span>
                        {data?.contact1?.designation && (
                            <span className="text-[10px] text-gray-400 font-medium ml-1">
                                ({data.contact1.designation})
                            </span>
                        )}
                    </div>
                )}
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                    Here's what's happening with your participation in IHWE 2026.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 w-full lg:w-auto mt-2 lg:mt-0">
                {/* ── Center Card ── */}
                <div
                    className="flex-1 lg:flex-none w-full lg:w-auto lg:min-w-[160px] bg-white border border-gray-200 rounded-md px-3 py-1 flex flex-col justify-center self-center z-10"
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.18) 0px 2px 4px',
                    }}
                >
                    {/* Date Row */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
                            <CalendarDays size={14} className="text-[#313677]" />
                        </div>
                        <div>
                            <p
                                className="text-[10px] font-medium text-[#313677] leading-snug"
                                style={{ textShadow: '0 1px 2px rgba(49,54,119,0.15)' }}
                            >
                                21 – 23 AUGUST 2026
                            </p>
                        </div>
                    </div>

                    {/* Location Row */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
                            <MapPin size={14} className="text-[#313677]" />
                        </div>
                        <div>
                            <p
                                className="text-[10px] font-medium text-[#313677] leading-snug"
                                style={{ textShadow: '0 1px 2px rgba(49,54,119,0.15)' }}
                            >
                                PRAGATI MAIDAN,<br />NEW DELHI, INDIA
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Right Banner ── */}
                <div
                    className="flex-none w-full lg:w-[420px] min-h-[60px] rounded-md overflow-hidden relative flex flex-col sm:flex-row justify-center sm:justify-start items-center px-5 py-2 lg:py-1 text-center sm:text-left"
                    style={{
                        backgroundImage: "url('/exhibition/topright.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >

                    {/* Building */}
                    <div className="absolute right-0 inset-y-0 w-28 opacity-35 z-[1]">
                        {/* your building SVG */}
                    </div>

                    {/* Text */}
                    <div className="relative z-[2] max-w-full sm:max-w-[150px]">
                        <p className="text-[11px] text-white/75 mb-0.5 leading-relaxed">
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

        </div>

    );
};

export default WelcomeHeader;