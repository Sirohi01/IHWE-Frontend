import React from "react";

// ── Quick Action Button ────────────────────────────────────────────────────
const QuickAction = ({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) => (
    <button className="flex flex-col items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors group">
        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
            {icon}
        </div>
        <span className="text-xs text-gray-600 whitespace-nowrap font-medium">{label}</span>
    </button>
);

// ── Hero Illustration (two people handshaking with globe) ──────────────────
const HeroIllustration = () => (
    <svg width="340" height="160" viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Globe background */}
        <ellipse cx="170" cy="78" rx="72" ry="68" fill="#dbeafe" opacity="0.5" />
        <ellipse cx="170" cy="78" rx="72" ry="68" stroke="#93c5fd" strokeWidth="1" fill="none" />
        {/* Globe grid lines */}
        <ellipse cx="170" cy="78" rx="40" ry="68" stroke="#93c5fd" strokeWidth="0.8" fill="none" opacity="0.6" />
        <ellipse cx="170" cy="78" rx="72" ry="30" stroke="#93c5fd" strokeWidth="0.8" fill="none" opacity="0.6" />
        <ellipse cx="170" cy="78" rx="72" ry="55" stroke="#93c5fd" strokeWidth="0.8" fill="none" opacity="0.4" />
        <line x1="98" y1="78" x2="242" y2="78" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />
        <line x1="170" y1="10" x2="170" y2="146" stroke="#93c5fd" strokeWidth="0.8" opacity="0.5" />
        {/* Continents hint */}
        <path d="M130 55 Q140 48 155 52 Q165 50 168 58 Q172 65 165 70 Q155 72 148 68 Q138 66 130 55Z" fill="#60a5fa" opacity="0.35" />
        <path d="M175 60 Q182 55 192 58 Q200 62 198 70 Q194 76 186 74 Q178 72 175 60Z" fill="#60a5fa" opacity="0.3" />
        <path d="M145 85 Q150 80 158 83 Q164 87 162 95 Q158 100 152 98 Q145 94 145 85Z" fill="#60a5fa" opacity="0.25" />

        {/* Floating user icons */}
        {/* Top center */}
        <circle cx="170" cy="14" r="11" fill="white" stroke="#e5e7eb" strokeWidth="1" />
        <circle cx="170" cy="11" r="4" fill="#9ca3af" />
        <path d="M163 20 Q163 16 170 16 Q177 16 177 20" fill="#9ca3af" />
        {/* Right side */}
        <circle cx="232" cy="72" r="13" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="1.2" />
        <circle cx="232" cy="69" r="4.5" fill="#16a34a" />
        <path d="M224.5 79 Q224.5 74 232 74 Q239.5 74 239.5 79" fill="#16a34a" />
        {/* Left side */}
        <circle cx="106" cy="95" r="13" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="1.2" />
        <circle cx="106" cy="92" r="4.5" fill="#16a34a" />
        <path d="M98.5 102 Q98.5 97 106 97 Q113.5 97 113.5 102" fill="#16a34a" />

        {/* Woman (left person) - green blazer */}
        {/* Body */}
        <rect x="88" y="72" width="52" height="75" rx="6" fill="#16a34a" />
        {/* Neck */}
        <rect x="109" y="62" width="10" height="14" rx="5" fill="#f5c5a0" />
        {/* Head */}
        <ellipse cx="114" cy="54" rx="18" ry="20" fill="#f5c5a0" />
        {/* Hair */}
        <ellipse cx="114" cy="40" rx="18" ry="10" fill="#1a0a00" />
        <path d="M96 50 Q92 62 95 72 Q102 58 96 50Z" fill="#1a0a00" />
        <path d="M132 50 Q133 58 130 66 L126 58 Z" fill="#1a0a00" />
        {/* Face features */}
        <circle cx="108" cy="56" r="2" fill="#8b5e3c" opacity="0.6" />
        <circle cx="120" cy="56" r="2" fill="#8b5e3c" opacity="0.6" />
        <path d="M110 63 Q114 66 118 63" stroke="#8b5e3c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* White shirt */}
        <rect x="105" y="74" width="18" height="12" rx="2" fill="white" opacity="0.9" />
        {/* Arms */}
        <path d="M88 80 Q74 90 82 105" stroke="#16a34a" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M140 80 Q148 90 142 100" stroke="#16a34a" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Hand reaching right */}
        <ellipse cx="143" cy="102" rx="8" ry="5" fill="#f5c5a0" transform="rotate(-20 143 102)" />

        {/* Man (right person) - navy suit */}
        {/* Body */}
        <rect x="200" y="72" width="52" height="75" rx="6" fill="#1e3a5f" />
        {/* Neck */}
        <rect x="221" y="62" width="10" height="14" rx="5" fill="#d4a574" />
        {/* Head */}
        <ellipse cx="226" cy="54" rx="18" ry="20" fill="#d4a574" />
        {/* Hair */}
        <ellipse cx="226" cy="38" rx="17" ry="9" fill="#2d1a0e" />
        <path d="M208 48 Q206 58 210 68 Q216 56 208 48Z" fill="#2d1a0e" />
        {/* Beard */}
        <path d="M212 66 Q218 72 226 72 Q234 72 240 66 Q236 76 226 77 Q216 76 212 66Z" fill="#4a2c0a" opacity="0.5" />
        {/* Face features */}
        <circle cx="220" cy="56" r="2" fill="#7a4a2a" opacity="0.6" />
        <circle cx="232" cy="56" r="2" fill="#7a4a2a" opacity="0.6" />
        <path d="M222 64 Q226 67 230 64" stroke="#7a4a2a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* Tie */}
        <path d="M224 74 L222 90 L226 94 L230 90 L228 74Z" fill="#dc2626" />
        {/* White shirt */}
        <rect x="217" y="74" width="18" height="10" rx="2" fill="white" opacity="0.9" />
        {/* Arms */}
        <path d="M252" y1="80" stroke="#1e3a5f" />
        <path d="M200 80 Q192 90 196 100" stroke="#1e3a5f" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M252 80 Q264 90 256 105" stroke="#1e3a5f" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Handshake hands */}
        <ellipse cx="168" cy="105" rx="18" ry="7" fill="#e8b88a" transform="rotate(-10 168 105)" />
        <ellipse cx="172" cy="108" rx="18" ry="7" fill="#d4a574" transform="rotate(10 172 108)" />
        {/* Fingers */}
        <rect x="152" y="100" width="6" height="10" rx="3" fill="#f5c5a0" transform="rotate(-15 155 105)" />
        <rect x="158" y="99" width="6" height="11" rx="3" fill="#f5c5a0" transform="rotate(-8 161 104)" />
        <rect x="164" y="98" width="6" height="11" rx="3" fill="#f5c5a0" transform="rotate(0 167 103)" />
        <rect x="180" y="100" width="6" height="10" rx="3" fill="#d4a574" transform="rotate(15 183 105)" />
        <rect x="174" y="99" width="6" height="11" rx="3" fill="#d4a574" transform="rotate(8 177 104)" />

        {/* Leaves bottom left */}
        <path d="M60 148 Q45 120 65 105 Q72 122 60 148Z" fill="#22c55e" opacity="0.8" />
        <path d="M60 148 Q78 124 88 115 Q84 132 60 148Z" fill="#16a34a" opacity="0.75" />
        <line x1="60" y1="148" x2="80" y2="112" stroke="#14532d" strokeWidth="1" strokeLinecap="round" />
        <path d="M44 155 Q35 135 50 122 Q54 138 44 155Z" fill="#4ade80" opacity="0.6" />

        {/* Leaves bottom right */}
        <path d="M280 148 Q295 120 275 105 Q268 122 280 148Z" fill="#22c55e" opacity="0.8" />
        <path d="M280 148 Q262 124 252 115 Q256 132 280 148Z" fill="#16a34a" opacity="0.75" />
        <line x1="280" y1="148" x2="260" y2="112" stroke="#14532d" strokeWidth="1" strokeLinecap="round" />

        {/* Diamond decorations */}
        <path d="M76 75 L80 70 L84 75 L80 80Z" fill="#16a34a" opacity="0.4" />
        <path d="M256 85 L260 80 L264 85 L260 90Z" fill="#16a34a" opacity="0.4" />
    </svg>
);

// ── Main Component ─────────────────────────────────────────────────────────
const BuyerContactsHero: React.FC = () => {
    return (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-8 py-5 flex items-center gap-6">

            {/* LEFT: Title + Description */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                    {/* Icon box */}
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <circle cx="9" cy="7" r="3.5" fill="#16a34a" />
                            <path d="M2 20 Q2 14 9 14 Q16 14 16 20" fill="#16a34a" />
                            <circle cx="17" cy="8" r="2.5" fill="#16a34a" opacity="0.7" />
                            <path d="M15 20 Q15.5 16 19 16 Q22 16 22 19.5" stroke="#16a34a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Buyer Contacts</h1>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                    Manage all the buyer leads, inquiries and communications in one place.
                </p>
            </div>

            {/* CENTER: Illustration */}
            <div className="flex-shrink-0 flex items-center justify-center">
                <HeroIllustration />
            </div>

            {/* RIGHT: Quick Actions */}
            <div className="flex-shrink-0 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#facc15">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-800">Quick Actions</span>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center gap-1">
                    {/* Add Manually */}
                    <QuickAction
                        label="Add Manually"
                        icon={
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <circle cx="10" cy="8" r="3.5" fill="#16a34a" />
                                <path d="M3 19 Q3 13 10 13 Q17 13 17 19" fill="#16a34a" />
                                <line x1="20" y1="8" x2="20" y2="14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                                <line x1="17" y1="11" x2="23" y2="11" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        }
                    />

                    {/* Export Leads */}
                    <QuickAction
                        label="Export Leads"
                        icon={
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        }
                    />

                    {/* Send Email */}
                    <QuickAction
                        label="Send Email"
                        icon={
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path d="M22 2L11 13" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        }
                    />

                    {/* View Analytics */}
                    <QuickAction
                        label="View Analytics"
                        icon={
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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