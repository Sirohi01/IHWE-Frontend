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

// ── Hero Illustration (matches screenshot closely) ─────────────────────────
const HeroIllustration = () => (
    <svg width="280" height="190" viewBox="0 0 280 190" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Light bg blobs */}
        <ellipse cx="145" cy="105" rx="105" ry="72" fill="#e8f5ee" opacity="0.7" />
        <ellipse cx="100" cy="140" rx="60" ry="32" fill="#d1ead9" opacity="0.45" />
        {/* Dashed circle top-right */}
        <circle cx="210" cy="48" r="28" stroke="#b6d9c4" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />

        {/* ── Folder ── */}
        {/* Tab */}
        <path d="M72 75 Q72 66 80 66 H112 L122 75 Z" fill="#0b4f2e" />
        {/* Body */}
        <rect x="72" y="75" width="128" height="88" rx="7" fill="#0f6840" />
        {/* Lighter inner area */}
        <rect x="72" y="88" width="128" height="75" rx="0" fill="#0f6840" />

        {/* ── White paper 1 (back) ── */}
        <rect x="88" y="62" width="52" height="72" rx="4" fill="white" opacity="0.97" />
        <rect x="94" y="72" width="40" height="4" rx="2" fill="#d1d5db" />
        <rect x="94" y="80" width="32" height="4" rx="2" fill="#d1d5db" />
        <rect x="94" y="88" width="36" height="4" rx="2" fill="#d1d5db" />
        <rect x="94" y="96" width="24" height="4" rx="2" fill="#e5e7eb" />

        {/* ── White paper 2 (front, slightly offset) ── */}
        <rect x="108" y="56" width="52" height="72" rx="4" fill="white" opacity="0.93" />
        <rect x="114" y="66" width="40" height="4" rx="2" fill="#d1d5db" />
        <rect x="114" y="74" width="32" height="4" rx="2" fill="#d1d5db" />
        <rect x="114" y="82" width="36" height="4" rx="2" fill="#d1d5db" />

        {/* ── Cloud upload ── */}
        <ellipse cx="188" cy="142" rx="24" ry="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.4" />
        <ellipse cx="174" cy="148" rx="15" ry="11" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
        <ellipse cx="200" cy="148" rx="14" ry="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
        <ellipse cx="188" cy="144" rx="20" ry="14" fill="white" stroke="#94a3b8" strokeWidth="1.2" />
        {/* Up arrow */}
        <line x1="188" y1="154" x2="188" y2="140" stroke="#0f6840" strokeWidth="2.2" strokeLinecap="round" />
        <polyline points="182,146 188,140 194,146" stroke="#0f6840" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* ── Shield ── */}
        <path d="M90 142 Q90 126 104 122 Q118 126 118 142 Q118 156 104 162 Q90 156 90 142Z" fill="#0f6840" />
        <path d="M97 142 l5 5 l10 -10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* ── Leaf ── */}
        <path d="M44 170 Q32 144 52 126 Q58 144 44 170Z" fill="#22c55e" opacity="0.75" />
        <path d="M44 170 Q58 146 70 136 Q66 152 44 170Z" fill="#16a34a" opacity="0.7" />
        <line x1="44" y1="170" x2="60" y2="134" stroke="#14532d" strokeWidth="1.2" strokeLinecap="round" />

        {/* Dots */}
        <circle cx="224" cy="72" r="3.5" fill="#4ade80" opacity="0.5" />
        <circle cx="236" cy="60" r="2.2" fill="#4ade80" opacity="0.35" />
        <circle cx="230" cy="84" r="1.8" fill="#4ade80" opacity="0.4" />
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
                        {/* <HeroIllustration /> */}
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
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-emerald-700">
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