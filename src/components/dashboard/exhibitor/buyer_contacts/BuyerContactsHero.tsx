import React from "react";
import Hero from "@/assets/exhibitor/buyercon.png";
// ── Quick Action Button ────────────────────────────────────────────────────

const QuickAction = ({
    icon,
    label,
    bgColor,
    borderColor,
}: {
    icon: React.ReactNode;
    label: string;
    bgColor: string;
    borderColor: string;
}) => (
    <div
        className="flex flex-col  items-center gap-2 px-2 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
        style={{ backgroundColor: bgColor, border: `1.5px solid ${borderColor}` }}
    >
        <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: bgColor, border: `1.5px solid ${borderColor}` }}
        >
            {icon}
        </div>
        <span className="text-[10px] text-gray-700 whitespace-nowrap font-medium">{label}</span>
    </div>
);


// ── Main Component ─────────────────────────────────────────────────────────
const BuyerContactsHero: React.FC = () => {
    return (
        <div className="w-full bg-[#F9FAFE] py-2 gap-4 flex items-center justify-between">
            <div className="flex w-[66%] flex-row justify-between">
                {/* LEFT: Title + Description */}
                <div className="flex-1 min-w-0 pl-4">
                    <div className="flex items-center gap-3 mb-2">
                        {/* Icon box */}
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                                <circle cx="9" cy="7" r="3.5" fill="#16a34a" />
                                <path d="M2 20 Q2 14 9 14 Q16 14 16 20" fill="#16a34a" />
                                <circle cx="17" cy="8" r="2.5" fill="#16a34a" opacity="0.7" />
                                <path d="M15 20 Q15.5 16 19 16 Q22 16 22 19.5" stroke="#16a34a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-semibold text-[#0A0C3B]">Buyer Contacts</h1>
                    </div>
                    <p className="text-[13px] text-[#19174D] leading-relaxed">
                        Manage all the buyer leads, inquiries and communications in one place.
                    </p>
                </div>
                {/* CENTER: Illustration */}
                <div className="flex-shrink-0 flex items-center justify-center">
                    <img loading="lazy" decoding="async" src={Hero} alt="" className="h-[135px] w-[310px] object-contain" />
                </div>
            </div>

            {/* RIGHT: Quick Actions */}
            <div className="w-[33%] inline-flex flex-col bg-white border border-gray-200 rounded-xl px-3 py-2 gap-4 shadow-sm">

                {/* Header */}
                <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-800">Quick Actions</span>
                </div>

                {/* Buttons Row */}
                <div className="flex flex-row justify-between ">

                    <QuickAction
                        bgColor="#dcfce7"
                        borderColor="#86efac"
                        label="Add Manually"
                        icon={
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <circle cx="10" cy="8" r="3.5" fill="#16a34a" />
                                <path d="M3 19 Q3 13 10 13 Q17 13 17 19" fill="#16a34a" />
                                <line x1="20" y1="8" x2="20" y2="14" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" />
                                <line x1="17" y1="11" x2="23" y2="11" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" />
                            </svg>
                        }
                    />

                    <QuickAction
                        bgColor="#dbeafe"
                        borderColor="#93c5fd"
                        label="Export Leads"
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        }
                    />

                    <QuickAction
                        bgColor="#ede9fe"
                        borderColor="#c4b5fd"
                        label="Send Email"
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M22 2L11 13" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    />

                    <QuickAction
                        bgColor="#fef9c3"
                        borderColor="#fde68a"
                        label="View Analytics"
                        icon={
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect x="2" y="14" width="4" height="8" rx="1" fill="#f59e0b" />
                                <rect x="8" y="9" width="4" height="13" rx="1" fill="#f59e0b" />
                                <rect x="14" y="5" width="4" height="17" rx="1" fill="#f59e0b" />
                                <rect x="20" y="2" width="4" height="20" rx="1" fill="#f59e0b" opacity="0.5" />
                            </svg>
                        }
                    />

                </div>
            </div>
        </div>
    );
};

export default BuyerContactsHero;