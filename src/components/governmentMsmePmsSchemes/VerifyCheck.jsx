import React from 'react'
import { ExternalLink, Download } from 'lucide-react'

const VerifyCheck = () => {
    return (
        <div className="py-4 px-14" >

            {/* ── HEADING ── */}
            <div className="text-center mb-3">
                <h2 className="text-xl font-medium text-gray-900 uppercase tracking-wide">
                    Verify. Check. Trust.
                </h2>
                <p className="text-lg font-medium text-gray-900 mt-1">
                    100% Transparency. 100% Government Verified.
                </p>
                <div className="w-10 h-0.5 bg-green-800 mx-auto mt-1 rounded-full" />
            </div>

            {/* ── 3 CARDS ── */}
            <div className="grid grid-cols-3 gap-4 mb-4">

                {/* Card 1 */}
                <div className="bg-[#f7f9f5] border border-[#e0e8d8] rounded-xl p-6 flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                        <svg width="64" height="64" viewBox="0 0 56 56" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                            <rect x="6" y="8" width="44" height="30" rx="3" />
                            <line x1="6" y1="44" x2="50" y2="44" />
                            <line x1="22" y1="38" x2="34" y2="38" />
                            <circle cx="28" cy="23" r="9" fill="#e8f5e0" stroke="#1e5c1e" />
                            <polyline points="23 23 27 27 34 19" stroke="#1e5c1e" strokeWidth="2" />
                        </svg>
                        <div>
                            <h3 className="text-base font-semibold text-green-900 mb-1">1. Verify Event Listing</h3>
                            <p className="text-[13px] font-medium text-gray-500 leading-relaxed">Check IHWE 2026 is officially listed on MSME Portal.</p>
                        </div>
                    </div>
                    <button className="mt-auto w-full border border-[#1e5c1e] bg-white text-[#1e5c1e] hover:text-white rounded-lg py-1 text-xs font-medium  uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:bg-green-900 transition">
                        Verify on MSME Website
                        <ExternalLink size={15} strokeWidth={2} />
                    </button>
                </div>

                {/* Card 2 */}
                <div className="bg-[#f7f9f5] border border-[#e0e8d8] rounded-xl p-6 flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                        <svg width="64" height="64" viewBox="0 0 56 56" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                            <path d="M28 6L10 14v16c0 12 8 20 18 22 10-2 18-10 18-22V14Z" />
                            <line x1="28" y1="22" x2="28" y2="34" />
                            <line x1="22" y1="28" x2="34" y2="28" />
                        </svg>
                        <div>
                            <h3 className="text-base font-semibold text-green-900 mb-1">2. Verify PMS Scheme</h3>
                            <p className="text-[13px] font-medium text-gray-500 leading-relaxed">Cross-check PMS Scheme details, benefits & subsidy structure on MSME official website.</p>
                        </div>
                    </div>
                    <button className="mt-auto w-full border border-[#1e5c1e] bg-white text-[#1e5c1e] hover:text-white rounded-lg py-1 text-xs font-medium  uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:bg-green-900 transition">
                        View PMS Scheme
                        <ExternalLink size={15} strokeWidth={2} />
                    </button>
                </div>

                {/* Card 3 */}
                <div className="bg-[#f7f9f5] border border-[#e0e8d8] rounded-xl p-6 flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                        <svg width="64" height="64" viewBox="0 0 56 56" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                            <path d="M16 6h16l10 10v30a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                            <polyline points="32 6 32 16 42 16" />
                            <line x1="20" y1="26" x2="36" y2="26" />
                            <line x1="20" y1="32" x2="36" y2="32" />
                            <circle cx="28" cy="42" r="6" fill="#e8f5e0" stroke="#1e5c1e" />
                            <polyline points="25 42 28 45 32 39" strokeWidth="1.8" />
                        </svg>
                        <div>
                            <h3 className="text-base font-semibold text-green-900 mb-1">3. View Approval Letter</h3>
                            <p className="text-[13px] font-normal text-gray-500 leading-relaxed">Download the official approval letter issued for IHWE 2026 under MSME PMS Scheme.</p>
                        </div>
                    </div>
                    <button className="mt-auto w-full border border-[#1e5c1e] bg-white text-[#1e5c1e] hover:text-white rounded-lg py-1 text-xs font-medium  uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:bg-green-900 transition">
                        Download Approval Letter
                        <Download size={15} strokeWidth={2} />
                    </button>
                </div>

            </div>

            {/* ── FOOTER BAR ── */}
            <div className="bg-[#f7f9f5] border border-[#e0e8d8] rounded-xl px-7 py-4 flex items-center gap-6">

                {/* MSME Logo */}
                <div className="flex items-center gap-2.5 shrink-0">
                    <img src="/mpscheme/msmeLogo.png" alt="MSME" className="w-12 h-12 object-contain" />
                    <div className="leading-tight">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wide">Ministry of</div>
                        <div className="text-2xl font-black text-gray-900">MSME</div>
                        <div className="text-[9px] text-gray-400 uppercase tracking-wide">Government of India</div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-px h-12 bg-gray-300 shrink-0" />

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed flex-1">
                    IHWE 2026 is an approved event under the PMS (Procurement and Marketing Support) Scheme of the Ministry of Micro, Small & Medium Enterprises, Government of India.
                </p>

                {/* Verified Badge */}
                <div className="flex items-center gap-2.5 shrink-0">
                    <div className="w-11 h-11 bg-[#1e5c1e] rounded-full flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6Z" />
                            <polyline points="9 12 11 14 15 10" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-base font-black text-[#1e5c1e]">MSME</div>
                        <div className="text-[11px] font-bold text-[#1e5c1e] uppercase tracking-wide">Verified Event</div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default VerifyCheck