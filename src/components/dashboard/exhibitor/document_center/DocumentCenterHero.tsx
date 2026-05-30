import React from "react";
import Hero from "@/assets/exhibitor/dchero2.png";

// ── Stat card ──────────────────────────────────────────────────────────────
type StatCardProps = {
    icon: React.ReactNode;
    count: number;
    label: string;
    countColor: string;
};
const StatCard = ({ icon, count, label, countColor }: StatCardProps) => (
    <div className="flex flex-row items-center justify-center border border-gray-100 hover:bg-gray-50 shadow-sm rounded-lg py-3 px-1 bg-white flex-1 hover:-translate-y-0.5 transition-all">
        <div className="mb-2">{icon}</div>
        <div className="text-center">
            <p className={`text-lg font-semibold leading-none ${countColor}`}>{count}</p>
            <p className="text-[9px] font-medium text-gray-500 mt-1 uppercase tracking-wider whitespace-nowrap">{label}</p>
        </div>
    </div>
);

// ── Icons (inline SVG, no deps) ────────────────────────────────────────────
const IconSubmitted = () => (
    <svg width="42" height="42" viewBox="0 0 38 38" fill="none">
        <rect width="38" height="38" rx="8" fill="#e6f4ee" />
        <rect x="11" y="9" width="13" height="17" rx="2" fill="white" stroke="#16a34a" strokeWidth="1.6" />
        <line x1="14" y1="15" x2="21" y2="15" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="14" y1="18" x2="19" y2="18" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="26" cy="27" r="6" fill="#16a34a" />
        <polyline points="23,27 25.2,29.2 29,25" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);

const IconReview = () => (
    <svg width="42" height="42" viewBox="0 0 38 38" fill="none">
        <rect width="38" height="38" rx="8" fill="#eff6ff" />
        <rect x="11" y="9" width="13" height="17" rx="2" fill="white" stroke="#2563eb" strokeWidth="1.6" />
        <line x1="14" y1="15" x2="21" y2="15" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="14" y1="18" x2="19" y2="18" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="26" cy="27" r="6" fill="#2563eb" />
        <circle cx="26" cy="25.5" r="2.2" stroke="white" strokeWidth="1.5" fill="none" />
        <line x1="27.6" y1="27.1" x2="29.5" y2="29" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const IconPending = () => (
    <svg width="42" height="42" viewBox="0 0 38 38" fill="none">
        <rect width="38" height="38" rx="8" fill="#fffbeb" />
        <rect x="11" y="9" width="13" height="17" rx="2" fill="white" stroke="#d97706" strokeWidth="1.6" />
        <line x1="14" y1="15" x2="21" y2="15" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="14" y1="18" x2="19" y2="18" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="26" cy="27" r="6" fill="#d97706" />
        <line x1="26" y1="24.5" x2="26" y2="27.2" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="26" y1="27.2" x2="27.8" y2="29" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

const IconRejected = () => (
    <svg width="42" height="42" viewBox="0 0 38 38" fill="none">
        <rect width="38" height="38" rx="8" fill="#fef2f2" />
        <rect x="11" y="9" width="13" height="17" rx="2" fill="white" stroke="#dc2626" strokeWidth="1.6" />
        <line x1="14" y1="15" x2="21" y2="15" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="14" y1="18" x2="19" y2="18" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="26" cy="27" r="6" fill="#dc2626" />
        <line x1="23.8" y1="24.8" x2="28.2" y2="29.2" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="28.2" y1="24.8" x2="23.8" y2="29.2" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

// ── Main Component ─────────────────────────────────────────────────────────
const DocumentCenterHero: React.FC = () => {
    return (
        <div className="w-full">


            <div className="flex w-full items-center gap-0">
                {/* ── LEFT: Text ── */}
                <div className="flex flex-row w-[55%]">
                    <div>
                        {/* Breadcrumb */}
                        <p className="text-sm text-gray-500 ">
                            Home <span className="mx-1 ">›</span> Documents Center
                        </p>
                        <h1 className="text-2xl font-semibold text-[#09152A] tracking-tight mt-4">Documents Center</h1>
                        <div className="w-16 h-[3px] bg-emerald-600 rounded-full mt-2 mb-2" />
                        <p className="text-sm text-[#414755] leading-relaxed mt-5 ">
                            Upload, review and manage all required documents
                            for a smooth and successful participation in IHIWE 2026.
                        </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <img src={Hero} alt="" className="h-[200px] w-[280px]" />
                    </div>
                </div>




                {/* ── RIGHT: Summary Panel ── */}
                <div className="flex flex-col w-[45%] bg-white border border-gray-200 rounded-lg py-2 px-3 shadow-sm">
                    {/* Title */}
                    <p className="text-xs font-semibold text-[#19174D] tracking-[0.12em] uppercase mb-2">
                        Documents Summary
                    </p>

                    {/* 4 Stat Cards in a row */}
                    <div className="flex w-full gap-2 mb-4">
                        <StatCard icon={<IconSubmitted />} count={12} label="Submitted" countColor="text-emerald-700" />
                        <StatCard icon={<IconReview />} count={2} label="Under Review" countColor="text-blue-600" />
                        <StatCard icon={<IconPending />} count={1} label="Pending" countColor="text-amber-500" />
                        <StatCard icon={<IconRejected />} count={0} label="Rejected" countColor="text-red-500" />
                    </div>

                    {/* Guidelines row */}
                    <button className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-1.5 hover:bg-emerald-50 hover:border-emerald-300 transition-all group">
                        <div className="flex items-center gap-2 text-[13px] font-medium text-gray-700 group-hover:text-emerald-700">
                            {/* File icon */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="8" y1="13" x2="16" y2="13" />
                                <line x1="8" y1="17" x2="12" y2="17" />
                            </svg>
                            View Upload Guidelines
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentCenterHero;