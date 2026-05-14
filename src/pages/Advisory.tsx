import { useState } from "react";

const AdvisoryForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        designation: "",
        organization: "",
        industry: "",
        email: "",
        phone: "",
        linkedin: "",
        areasOfExpertise: "",
        yearsOfExperience: "",
        professionalSummary: "",
        whyRecommend: "",
        contribution: "",
        nominatorName: "",
        nominatorDesignation: "",
        nominatorOrg: "",
        nominatorEmail: "",
        nominatorPhone: "",
        relationship: "",
    });

    const [charCount, setCharCount] = useState({
        professionalSummary: 0,
        whyRecommend: 0,
        contribution: 0,
    });

    const [confirmed, setConfirmed] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name in charCount) {
            setCharCount((prev) => ({ ...prev, [name]: value.length }));
        }
    };

    const requiredStar = <span className="text-red-600">*</span>;

    return (
        <div className="w-[1350px] mx-auto bg-[#f5f5f5] font-sans">
            {/* ── BANNER ── */}
            <div className="w-[1350px] h-[400px] bg-[#e8f5e9] relative overflow-hidden flex items-start flex-shrink-0">
                {/* Green diagonal background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] via-[#a5d6a7] to-[#81c784]" />

                {/* Top-right dark green triangle */}
                <div
                    className="absolute top-0 right-0 w-0 h-0 border-solid border-r-[420px] border-b-[420px] border-transparent border-r-[#1a5c2a]"
                />

                {/* Yellow diagonal stripe */}
                <div className="absolute top-[60px] -right-[30px] w-[500px] h-[55px] bg-[#f5a623] -rotate-[15deg] opacity-85" />

                {/* Second yellow stripe */}
                <div className="absolute top-[120px] -right-[60px] w-[500px] h-[30px] bg-[#f5a623] -rotate-[15deg] opacity-50" />

                {/* Globe SVG */}
                <div className="absolute right-[320px] top-5 w-[340px] h-[340px] opacity-35">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#2e7d32" strokeWidth="1.5" />
                        <ellipse cx="100" cy="100" rx="40" ry="90" fill="none" stroke="#2e7d32" strokeWidth="1.5" />
                        <ellipse cx="100" cy="100" rx="75" ry="90" fill="none" stroke="#2e7d32" strokeWidth="1" />
                        <line x1="10" y1="100" x2="190" y2="100" stroke="#2e7d32" strokeWidth="1" />
                        <line x1="10" y1="65" x2="190" y2="65" stroke="#2e7d32" strokeWidth="0.8" />
                        <line x1="10" y1="135" x2="190" y2="135" stroke="#2e7d32" strokeWidth="0.8" />
                    </svg>
                </div>

                {/* Meditation silhouette */}
                <div className="absolute right-[400px] bottom-0 w-[200px] h-[280px]">
                    <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="18" r="10" fill="#1a5c2a" />
                        <ellipse cx="50" cy="50" rx="18" ry="22" fill="#1a5c2a" />
                        <path d="M32 45 Q10 55 5 75" stroke="#1a5c2a" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M68 45 Q90 55 95 75" stroke="#1a5c2a" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M35 70 Q25 95 15 110 Q30 115 50 110" stroke="#1a5c2a" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M65 70 Q75 95 85 110 Q70 115 50 110" stroke="#1a5c2a" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <ellipse cx="50" cy="130" rx="35" ry="6" fill="#2e7d32" opacity="0.3" />
                    </svg>
                </div>

                {/* Hexagon icons */}
                <div className="absolute top-5 right-[60px]">
                    <svg width="80" height="90" viewBox="0 0 80 90">
                        <polygon points="40,5 75,22 75,67 40,84 5,67 5,22" fill="none" stroke="#2e7d32" strokeWidth="2" />
                        <text x="40" y="52" textAnchor="middle" fontSize="24" fill="#2e7d32">♥</text>
                    </svg>
                </div>
                <div className="absolute top-[90px] right-[130px]">
                    <svg width="70" height="80" viewBox="0 0 70 80">
                        <polygon points="35,5 65,20 65,60 35,75 5,60 5,20" fill="none" stroke="#2e7d32" strokeWidth="2" />
                        <circle cx="35" cy="28" r="8" fill="none" stroke="#2e7d32" strokeWidth="2" />
                        <path d="M20 55 Q20 42 35 42 Q50 42 50 55" fill="none" stroke="#2e7d32" strokeWidth="2" />
                    </svg>
                </div>
                <div className="absolute top-[160px] right-[50px]">
                    <svg width="70" height="80" viewBox="0 0 70 80">
                        <polygon points="35,5 65,20 65,60 35,75 5,60 5,20" fill="none" stroke="#2e7d32" strokeWidth="2" />
                        <text x="35" y="47" textAnchor="middle" fontSize="22" fill="#2e7d32">🌿</text>
                    </svg>
                </div>

                {/* Leaves decorations */}
                <div className="absolute bottom-0 right-[200px] text-[60px] opacity-60">🌿</div>
                <div className="absolute bottom-[30px] right-[140px] text-[40px] opacity-50 -rotate-[30deg]">🍃</div>

                {/* Logo area */}
                <div className="absolute top-[28px] left-9 flex items-center gap-3.5">
                    <div className="w-20 h-20 rounded-full bg-[#1a5c2a] flex items-center justify-center shrink-0 border-3 border-[#f5a623]">
                        <span className="text-white text-[42px] font-black leading-none font-serif">9</span>
                    </div>
                    <div>
                        <div className="text-[#1a5c2a] text-[15px] font-bold tracking-[1.5px] leading-tight uppercase">INTERNATIONAL</div>
                        <div className="text-[#1a5c2a] text-[15px] font-bold tracking-[1.5px] leading-tight uppercase">HEALTH & WELLNESS</div>
                        <div className="text-[#f5a623] text-2xl font-black tracking-wider leading-[1.1] uppercase">EXPO 2026</div>
                    </div>
                </div>

                {/* Tagline */}
                <div className="absolute bottom-7 left-9 text-[#1a5c2a] text-base font-semibold tracking-wide">
                    Global Platform. &nbsp; Limitless Possibilities.
                </div>

                {/* City skyline */}
                <div className="absolute bottom-0 inset-x-0 h-[120px] opacity-10">
                    <svg viewBox="0 0 1350 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,120 L0,80 L40,80 L40,60 L60,60 L60,40 L80,40 L80,60 L100,60 L100,50 L110,50 L110,30 L120,30 L120,20 L130,20 L130,30 L140,30 L140,50 L150,50 L150,40 L170,40 L170,60 L190,60 L190,70 L220,70 L220,50 L240,50 L240,30 L250,30 L250,50 L260,50 L260,70 L300,70 L300,55 L310,55 L310,35 L320,35 L320,55 L340,55 L340,65 L380,65 L380,45 L390,45 L390,25 L400,25 L400,45 L420,45 L420,60 L460,60 L460,40 L475,40 L475,20 L485,20 L485,40 L500,40 L500,55 L540,55 L540,70 L580,70 L580,50 L600,50 L600,35 L610,35 L610,50 L630,50 L630,65 L670,65 L670,50 L690,50 L690,30 L700,30 L700,50 L720,50 L720,60 L760,60 L760,45 L780,45 L780,65 L820,65 L820,50 L840,50 L840,30 L850,30 L850,50 L870,50 L870,60 L910,60 L910,45 L920,45 L920,25 L930,25 L930,45 L950,45 L950,55 L990,55 L990,70 L1030,70 L1030,55 L1050,55 L1050,35 L1060,35 L1060,55 L1080,55 L1080,65 L1120,65 L1120,50 L1140,50 L1140,30 L1150,30 L1150,50 L1170,50 L1170,60 L1210,60 L1210,45 L1230,45 L1230,65 L1270,65 L1270,75 L1350,75 L1350,120 Z" fill="#1a5c2a" />
                    </svg>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="w-[1350px] bg-white box-border px-9 py-4 pb-6">
                <div className="flex gap-12 items-start">
                    {/* LEFT SIDEBAR */}
                    <div className="w-[400px] shrink-0 pr-8 border-r border-gray-100">
                        <div className="mb-8">
                            <div className="text-[24px] font-black text-[#1a5c2a] leading-tight uppercase tracking-tight">
                                ADVISORY BOARD MEMBERS
                            </div>
                            <div className="text-[18px] font-bold text-gray-800 uppercase tracking-wide mt-1">
                                NOMINATION FORM
                            </div>
                            <div className="w-12 h-1 bg-[#1a5c2a] my-4" />
                            <div className="text-[13.5px] text-gray-600 font-medium leading-relaxed">
                                Nominate an exceptional leader to join the Advisory Board of the
                                International Health & Wellness Expo 2026 and help shape the
                                future of global health & wellness.
                            </div>
                        </div>

                        {/* WHY NOMINATE Box */}
                        <div className="bg-[#fcfdfc] border border-gray-100 rounded-2xl p-6 shadow-sm mb-10">
                            <div className="text-sm font-extrabold text-[#1a5c2a] uppercase tracking-wider mb-2">
                                WHY NOMINATE?
                            </div>
                            <div className="w-8 h-[2px] bg-[#1a5c2a] mb-6" />

                            {[
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#1a5c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    ),
                                    title: "Shape the Future",
                                    desc: "Contribute to strategic direction and innovation in health & wellness."
                                },
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#1a5c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                        </svg>
                                    ),
                                    title: "Global Impact",
                                    desc: "Be part of a global platform driving positive change."
                                },
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#1a5c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8z" /><path d="M10 12h.01" /><path d="M14 12h.01" /><path d="M6 12h.01" />
                                        </svg>
                                    ),
                                    title: "Network & Collaborate",
                                    desc: "Connect with industry leaders and changemakers worldwide."
                                },
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#1a5c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    ),
                                    title: "Recognition",
                                    desc: "Celebrate excellence and leadership in the health & wellness ecosystem."
                                },
                            ].map((item, i, arr) => (
                                <div key={i}>
                                    <div className="flex gap-3 items-start mb-0 last:mb-0">
                                        <div className="w-[54px] h-[54px] rounded-full border-2 border-[#1a5c2a] flex items-center justify-center shrink-0 bg-white shadow-sm">
                                            {item.icon}
                                        </div>
                                        <div className="pt-1">
                                            <div className="text-[15px] font-bold text-[#1a5c2a] mb-1.5">{item.title}</div>
                                            <div className="text-[13px] text-gray-500 font-medium leading-relaxed">{item.desc}</div>
                                        </div>
                                    </div>
                                    {i < arr.length - 1 && <div className="border-b border-dashed border-gray-100 mb-7" />}
                                </div>
                            ))}
                        </div>

                        {/* NEED HELP box */}
                        <div className="bg-[#144a21] rounded-xl p-5 text-white mt-8 relative overflow-hidden shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                                    </svg>
                                </div>
                                <span className="text-base font-black tracking-wider uppercase">NEED HELP?</span>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-3 text-[13px] font-semibold">
                                    <span className="text-lg">✉️</span>
                                    <span className="hover:underline cursor-pointer">support@ihwe.in</span>
                                </div>
                                <div className="flex items-center gap-3 text-[13px] font-semibold">
                                    <span className="text-lg">📞</span>
                                    <span>+91 98765 43210</span>
                                </div>
                            </div>

                            <div className="border-t border-white/20 pt-4 text-[13px] font-bold opacity-100 flex justify-between items-end">
                                <span>We're here to assist you!</span>
                                <div className="text-2xl opacity-30 rotate-12">🌿</div>
                            </div>

                            {/* Corner leaf accent */}
                            <div className="absolute -bottom-4 -right-4 text-[100px] opacity-10 pointer-events-none">🌿</div>
                        </div>
                    </div>

                    {/* RIGHT FORM */}
                    <div className="flex-1">
                        {/* ── SECTION 01 ── */}
                        <div className="flex items-center gap-2.5 bg-[#1a5c2a] text-white py-1.5 px-3 rounded-t-md text-[13px] font-bold tracking-wider uppercase">
                            <div className="bg-white text-[#1a5c2a] rounded-[4px] w-5.5 h-5.5 flex items-center justify-center font-black text-xs shrink-0">01</div>
                            <span className="text-base">👤</span>
                            <span>NOMINEE INFORMATION</span>
                            <div className="flex-1 h-[1px] bg-white/30 ml-2" />
                        </div>
                        <div className="border border-gray-300 border-t-0 rounded-b-md p-3 px-4 bg-white mb-3">
                            <div className="grid grid-cols-4 gap-3 mb-2.5">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Full Name of Nominee {requiredStar}</label>
                                    <input name="fullName" placeholder="Enter full name" value={formData.fullName} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Designation / Title {requiredStar}</label>
                                    <input name="designation" placeholder="Enter designation" value={formData.designation} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Organization / Institution {requiredStar}</label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-2.5 text-sm text-gray-400">🏢</span>
                                        <input name="organization" placeholder="Enter organization" value={formData.organization} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md pl-8 pr-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Industry / Sector {requiredStar}</label>
                                    <select name="industry" value={formData.industry} onChange={handleChange} className={`w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm outline-none bg-white font-sans ${formData.industry ? 'text-gray-700' : 'text-gray-400'}`}>
                                        <option value="">Select industry / sector</option>
                                        <option>Healthcare</option>
                                        <option>Wellness & Fitness</option>
                                        <option>Pharmaceuticals</option>
                                        <option>Nutrition</option>
                                        <option>Technology</option>
                                        <option>Research & Academia</option>
                                        <option>Government & Policy</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3 mb-2.5">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Email Address {requiredStar}</label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-2.5 text-sm text-gray-400">✉️</span>
                                        <input name="email" type="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md pl-8 pr-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Phone Number {requiredStar}</label>
                                    <div className="flex gap-1.5">
                                        <div className="flex items-center gap-1 border border-gray-300 rounded-md px-1.5 bg-white shrink-0">
                                            <span className="text-base">📞</span>
                                            <span className="text-sm">🇮🇳</span>
                                            <select className="border-none outline-none text-xs text-gray-700 bg-transparent cursor-pointer">
                                                <option>+91</option>
                                                <option>+1</option>
                                                <option>+44</option>
                                            </select>
                                        </div>
                                        <input name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans flex-1" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 col-span-2">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">LinkedIn Profile (if available)</label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-2.5 text-sm text-gray-400">🔗</span>
                                        <input name="linkedin" placeholder="https://www.linkedin.com/in/yourprofile" value={formData.linkedin} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md pl-8 pr-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── SECTION 02 ── */}
                        <div className="flex items-center gap-2.5 bg-[#1a5c2a] text-white py-1.5 px-3 rounded-t-md text-[13px] font-bold tracking-wider uppercase">
                            <div className="bg-white text-[#1a5c2a] rounded-[4px] w-5.5 h-5.5 flex items-center justify-center font-black text-xs shrink-0">02</div>
                            <span className="text-base">💼</span>
                            <span>NOMINEE'S EXPERTISE & BACKGROUND</span>
                            <div className="flex-1 h-[1px] bg-white/30 ml-2" />
                        </div>
                        <div className="border border-gray-300 border-t-0 rounded-b-md p-3 px-4 bg-white mb-3">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Areas of Expertise {requiredStar}</label>
                                    <select name="areasOfExpertise" value={formData.areasOfExpertise} onChange={handleChange} className={`h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm outline-none bg-white font-sans ${formData.areasOfExpertise ? 'text-gray-700' : 'text-gray-400'}`}>
                                        <option value="">Select one or more areas</option>
                                        <option>Clinical Medicine</option>
                                        <option>Public Health</option>
                                        <option>Nutrition & Dietetics</option>
                                        <option>Mental Health</option>
                                        <option>Health Technology</option>
                                        <option>Yoga & Alternative Medicine</option>
                                        <option>Research & Innovation</option>
                                        <option>Health Policy</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Years of Experience {requiredStar}</label>
                                    <input name="yearsOfExperience" placeholder="Enter total years" value={formData.yearsOfExperience} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Professional Summary {requiredStar} <span className="text-[11px] text-gray-500 cursor-pointer">ℹ</span></label>
                                    <div className="relative">
                                        <textarea name="professionalSummary" placeholder="Brief background & achievements" value={formData.professionalSummary} onChange={handleChange} maxLength={1000} className="h-[38px] w-full border border-gray-300 rounded-md py-1.5 px-3 text-sm text-gray-700 outline-none bg-white font-sans resize-none" />
                                        <div className="absolute right-2.5 bottom-1 text-[10px] text-gray-400">{charCount.professionalSummary} / 1000</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── SECTION 03 ── */}
                        <div className="flex items-center gap-2.5 bg-[#1a5c2a] text-white py-1.5 px-3 rounded-t-md text-[13px] font-bold tracking-wider uppercase">
                            <div className="bg-white text-[#1a5c2a] rounded-[4px] w-5.5 h-5.5 flex items-center justify-center font-black text-xs shrink-0">03</div>
                            <span className="text-base">🎯</span>
                            <span>NOMINATION DETAILS</span>
                            <div className="flex-1 h-[1px] bg-white/30 ml-2" />
                        </div>
                        <div className="border border-gray-300 border-t-0 rounded-b-md p-3 px-4 bg-white mb-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Why do you recommend this nominee? {requiredStar} <span className="text-[11px] text-gray-500 cursor-pointer">ℹ</span></label>
                                    <div className="relative">
                                        <textarea name="whyRecommend" placeholder="Share your reasons..." value={formData.whyRecommend} onChange={handleChange} maxLength={1000} rows={3} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 outline-none bg-white font-sans resize-none" />
                                        <div className="absolute right-2.5 bottom-1.5 text-[10px] text-gray-400">{charCount.whyRecommend} / 1000</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">How will they contribute to Expo 2026? {requiredStar} <span className="text-[11px] text-gray-500 cursor-pointer">ℹ</span></label>
                                    <div className="relative">
                                        <textarea name="contribution" placeholder="Potential impact & value" value={formData.contribution} onChange={handleChange} maxLength={1000} rows={3} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 outline-none bg-white font-sans resize-none" />
                                        <div className="absolute right-2.5 bottom-1.5 text-[10px] text-gray-400">{charCount.contribution} / 1000</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── SECTION 04 ── */}
                        <div className="flex items-center gap-2.5 bg-[#1a5c2a] text-white py-1.5 px-3 rounded-t-md text-[13px] font-bold tracking-wider uppercase">
                            <div className="bg-white text-[#1a5c2a] rounded-[4px] w-5.5 h-5.5 flex items-center justify-center font-black text-xs shrink-0">04</div>
                            <span className="text-base">👤</span>
                            <span>NOMINATOR INFORMATION</span>
                            <div className="flex-1 h-[1px] bg-white/30 ml-2" />
                        </div>
                        <div className="border border-gray-300 border-t-0 rounded-b-md p-3 px-4 bg-white mb-3">
                            <div className="grid grid-cols-4 gap-3 mb-2.5">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Your Full Name {requiredStar}</label>
                                    <input name="nominatorName" placeholder="Enter your full name" value={formData.nominatorName} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Designation / Title {requiredStar}</label>
                                    <input name="nominatorDesignation" placeholder="Enter designation" value={formData.nominatorDesignation} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Organization / Institution {requiredStar}</label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-2.5 text-sm text-gray-400">🏢</span>
                                        <input name="nominatorOrg" placeholder="Enter organization" value={formData.nominatorOrg} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md pl-8 pr-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Email Address {requiredStar}</label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-2.5 text-sm text-gray-400">✉️</span>
                                        <input name="nominatorEmail" type="email" placeholder="Enter email address" value={formData.nominatorEmail} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md pl-8 pr-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                <div className="flex flex-col gap-1 col-span-2">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Phone Number {requiredStar}</label>
                                    <div className="flex gap-1.5">
                                        <div className="flex items-center gap-1 border border-gray-300 rounded-md px-1.5 bg-white shrink-0">
                                            <span className="text-base">📞</span>
                                            <span className="text-sm">🇮🇳</span>
                                            <select className="border-none outline-none text-xs text-gray-700 bg-transparent cursor-pointer">
                                                <option>+91</option>
                                                <option>+1</option>
                                                <option>+44</option>
                                            </select>
                                        </div>
                                        <input name="nominatorPhone" placeholder="Enter phone number" value={formData.nominatorPhone} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans flex-1" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 col-span-2">
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Relationship with Nominee {requiredStar}</label>
                                    <select name="relationship" value={formData.relationship} onChange={handleChange} className={`w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm outline-none bg-white font-sans ${formData.relationship ? 'text-gray-700' : 'text-gray-400'}`}>
                                        <option value="">Select relationship</option>
                                        <option>Colleague</option>
                                        <option>Supervisor / Manager</option>
                                        <option>Mentor</option>
                                        <option>Peer</option>
                                        <option>Industry Associate</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* ── SECTION 05 ── */}
                        <div className="flex items-center gap-2.5 bg-[#1a5c2a] text-white py-1.5 px-3 rounded-t-md text-[13px] font-bold tracking-wider uppercase">
                            <div className="bg-white text-[#1a5c2a] rounded-[4px] w-5.5 h-5.5 flex items-center justify-center font-black text-xs shrink-0">05</div>
                            <span className="text-base">📎</span>
                            <span>ADDITIONAL INFORMATION</span>
                            <div className="flex-1 h-[1px] bg-white/30 ml-2" />
                        </div>
                        <div className="border border-gray-300 border-t-0 rounded-b-md p-3 px-4 bg-white mb-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Upload Nominee's CV / Profile <span className="text-gray-500 font-normal">(Optional)</span></label>
                                    <p className="text-xs text-gray-400 m-0">PDF, DOC, or DOCX (Max. 5MB)</p>
                                </div>
                                <div className="border border-dashed border-gray-300 rounded-lg py-3 px-6 flex items-center gap-3 cursor-pointer bg-gray-50 min-w-[300px] justify-center">
                                    <span className="text-xl">☁️</span>
                                    <div>
                                        <div className="text-[13px] font-semibold text-[#1a5c2a]">Click to upload</div>
                                        <div className="text-[11px] text-gray-400">or drag and drop file here</div>
                                    </div>
                                </div>
                            </div>

                            {/* Consent checkbox */}
                            <div className="flex items-start gap-2.5 mt-2">
                                <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="w-4 h-4 mt-0.5 accent-[#1a5c2a] shrink-0 cursor-pointer" />
                                <label className="text-[13px] text-gray-600 leading-normal cursor-pointer" onClick={() => setConfirmed(!confirmed)}>
                                    I confirm that the information provided is accurate and I have the nominee's consent to submit this nomination. {requiredStar}
                                </label>
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="flex justify-center mt-1">
                            <button className="w-[300px] bg-[#1a5c2a] hover:bg-[#144a21] text-white border-none rounded-lg py-3 text-sm font-bold tracking-wider cursor-pointer flex items-center justify-center gap-2.5 uppercase font-sans mb-2 shadow-sm transition-colors">
                                <span className="text-sm">✈️</span>
                                SUBMIT NOMINATION
                            </button>
                        </div>

                        {/* Security note */}
                        <p className="text-center text-[12px] text-gray-400 m-0">
                            🔒 Your information is secure and will be used only for IHWE Expo 2026 Advisory Board selection.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvisoryForm;