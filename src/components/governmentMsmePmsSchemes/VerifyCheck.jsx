import React from 'react'
import { ExternalLink, Download } from 'lucide-react'

const VerifyCheck = () => {
    return (
        <div className=" px-16" >
            {/* section one  */}
            <div className='bg-white px-4 py-2 border border-[#e0e8d8] rounded-2xl'>
                {/* ── HEADING ── */}
                <div className="text-center mb-2">
                    <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wide">
                        Verify | Check | Trust
                    </h2>
                    <p className="text-base font-medium text-gray-900 mt-1">
                        100% Transparency. 100% Government Verified.
                    </p>
                    <div className="w-10 h-0.5 bg-green-800 mx-auto mt-1 rounded-full" />
                </div>

                {/* ── 3 CARDS ── */}
                <div className="grid grid-cols-3 gap-4 mb-4">

                    {/* Card 1 */}
                    <div className="bg-[#f7f9f5] w-full border border-[#e0e8d8] rounded-xl p-6 flex flex-col gap-3">
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
                        <button className="mt-auto mx-auto w-[70%] border border-[#1e5c1e] bg-white text-[#1e5c1e] hover:text-white rounded-lg py-1.5 text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:bg-green-900 transition">
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
                        <button className="mt-auto mx-auto w-[70%] border border-[#1e5c1e] bg-white text-[#1e5c1e] hover:text-white rounded-lg py-1.5 text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:bg-green-900 transition">
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
                        <button className="mt-auto mx-auto w-[70%] border border-[#1e5c1e] bg-white text-[#1e5c1e] hover:text-white rounded-lg py-1.5 text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:bg-green-900 transition">
                            Download Approval Letter
                            <Download size={15} strokeWidth={2} />
                        </button>
                    </div>

                </div>

                {/* ── FOOTER BAR ── */}
                <div className="bg-[#f7f9f5] border border-[#e0e8d8] rounded-xl px-7 py-1 flex items-center gap-6">

                    {/* MSME Logo */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        <img src="/mpscheme/msmeLogo.png" alt="MSME" className="w-16 h-16 object-contain" />
                        <div className="leading-tight">
                            <div className="text-xs text-medium text-gray-800 uppercase ">Ministry of</div>
                            <div className="text-lg font-medium text-gray-900">MSME</div>
                            <div className="text-[11px] font-medium text-gray-800 uppercase">Government of India</div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-12 bg-gray-400 shrink-0" />

                    {/* Description */}
                    <p className="text-sm text-gray-700 leading-relaxed flex-1">
                        IHWE 2026 is an approved event under the PMS (Procurement and Marketing Support) Scheme of the Ministry of Micro, Small & Medium Enterprises, Government of India.
                    </p>
                    <div className="w-px h-12 bg-gray-400 shrink-0" />

                    {/* Verified Badge */}
                    <div className="flex items-center gap-2 shrink-0">
                        <img src="/mpscheme/right.png" alt="MSME" className="w-16 h-16 object-contain" />


                        <div>
                            <div className="text-lg font-medium text-[#1e5c1e]">MSME</div>
                            <div className="text-[14px] font-medium text-[#1e5c1e] uppercase tracking-wide">Verified Event</div>
                        </div>
                    </div>

                </div>
            </div>

            {/* section two */}
            <div className='flex justify-between gap-6 mt-4  '>

                {/* ── LEFT: SUBSIDY STRUCTURE ── */}
                <div className='w-[38%] flex flex-col gap-2 bg-white border border-[#e0e8d8] rounded-2xl px-4 py-2'>

                    <div className='px-2' >
                        <h2 className='text-lg font-medium text-gray-900 uppercase tracking-wide '>
                            Subsidy Structure
                        </h2>
                        <p className='text-sm text-gray-600'>Get financial support up to</p>
                        <div className='text-lg font-medium text-[#1e5c1e]'>₹1,50,000*</div>
                    </div>

                    {/* Up To 80% Card */}
                    <div className='flex items-center gap-4 bg-[#fdf6ec] border border-[#f0dfc0] rounded-xl px-5 py-3'>
                        <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="#e07b20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className='shrink-0'>
                            <circle cx="28" cy="18" r="8" />
                            <path d="M14 42c0-8 6-14 14-14s14 6 14 14" />
                            <path d="M20 10 Q16 6 18 2 Q22 6 20 10" />
                            <path d="M36 10 Q40 6 38 2 Q34 6 36 10" />
                        </svg>
                        <div>
                            <div className='text-sm font-semibold text-gray-700'>
                                Up To <span className='text-lg font-medium text-[#e07b20]'>80%</span>
                            </div>
                            <div className='text-sm text-gray-600 leading-snug'>For General Category<br />of MSMEs</div>
                        </div>
                    </div>

                    {/* Up To 100% Card */}
                    <div className='flex items-center gap-4 bg-[#f3f8f0] border border-[#c8e0b8] rounded-xl px-5 py-3'>
                        <svg width="48" height="48" viewBox="0 0 56 56" fill="none" stroke="#1e5c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className='shrink-0'>
                            <circle cx="28" cy="16" r="8" />
                            <path d="M14 40c0-8 6-13 14-13s14 5 14 13" />
                            <polygon points="28,30 30,36 36,36 31,40 33,46 28,42 23,46 25,40 20,36 26,36" />
                        </svg>
                        <div>
                            <div className='text-sm font-semibold text-gray-700'>
                                Up To <span className='text-lg font-medium text-[#1e5c1e]'>100%</span>
                            </div>
                            <div className='text-sm text-gray-600 leading-snug'>For Special Category<br />of MSMEs</div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className='flex flex-col gap-2 mt-1'>
                        <div className='flex items-start gap-2 text-xs text-gray-600'>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e5c1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='shrink-0 mt-0.5'>
                                <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
                            </svg>
                            Maximum reimbursement: ₹1.5 Lakhs
                        </div>
                        <div className='flex items-start gap-2 text-xs text-gray-600'>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e5c1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='shrink-0 mt-0.5'>
                                <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
                            </svg>
                            Reimbursement is processed after successful participation & approval by MSME.
                        </div>
                    </div>

                </div>

                {/* ── RIGHT: ELIGIBILITY CRITERIA ── */}
                <div className='w-[62%] flex flex-col gap-4 bg-white border border-[#e0e8d8] rounded-2xl p-4'>

                    <h2 className='text-lg font-medium text-gray-900 uppercase tracking-wide'>
                        Eligibility Criteria – 80% to 100% Subsidy
                    </h2>

                    <div className='flex gap-6 flex-1'>

                        {/* 80% Column */}
                        <div className='flex-1 flex flex-col gap-3'>
                            <div className='text-sm font-medium text-[#e07b20] uppercase tracking-wide'>
                                You Get Up To 80% If:
                            </div>
                            {[
                                'You are a registered MSME with valid Udyam Certificate',
                                'First-time or limited participation in international / national exhibitions',
                                'You belong to the general category of businesses',
                                'You are eligible under PMS Scheme guidelines',
                                'Stall booked under an approved event like IHWE 2026',
                            ].map((item, i) => (
                                <div key={i} className='flex items-start gap-2 text-sm text-gray-700'>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e07b20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='shrink-0 mt-0.5'>
                                        <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
                                    </svg>
                                    <span className='leading-snug'>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Vertical Divider */}
                        <div className='w-px bg-gray-200 shrink-0' />

                        {/* 100% Column */}
                        <div className='flex-1 flex flex-col gap-3'>
                            <div className='text-sm font-medium text-[#1e5c1e] uppercase tracking-wide'>
                                You Can Get Up To 100% If You Belong To:
                            </div>
                            {[
                                'Women Entrepreneurs',
                                'SC / ST Entrepreneurs',
                                'Startups recognized by DPIIT / MSME',
                                'Businesses from North-East Region',
                                'Businesses from Aspirational Districts / Backward Areas',
                                'First-time participants in international exhibitions with valid criteria',
                            ].map((item, i) => (
                                <div key={i} className='flex items-start gap-2 text-sm text-gray-700'>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e5c1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='shrink-0 mt-0.5'>
                                        <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
                                    </svg>
                                    <span className='leading-snug'>{item}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Info Note */}
                    <div className='flex items-start gap-2 bg-[#f3f8f0] border border-[#c8e0b8] rounded-lg px-4 py-3 mt-2'>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e5c1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='shrink-0 mt-0.5'>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p className='text-xs text-gray-600 leading-relaxed'>
                            Final subsidy % is subject to approval by MSME as per their norms and documentation.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default VerifyCheck