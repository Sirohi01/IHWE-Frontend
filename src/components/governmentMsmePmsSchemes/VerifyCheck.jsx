import React from 'react';
import { ExternalLink, Download, Settings, ShieldCheck, BadgeCheck, FileText, UserPlus, ArrowRight, CheckCircle } from 'lucide-react';

const VerifyCheck = () => {
    const accessCards = [
        {
            title: "HOW PMS SCHEME WORKS?",
            desc: "Step-by-step process to understand how the scheme helps you.",
            btn: "VIEW PROCESS",
            icon: Settings,
            color: "green",
            link: "#how-works",
            img: "/mpscheme/qa1.jpg"
        },
        {
            title: "VERIFY EVENT LISTING",
            desc: "Check if IHWE 2026 is officially listed on MSME Portal.",
            btn: "VERIFY LISTING",
            icon: BadgeCheck,
            color: "blue",
            link: "https://my.msme.gov.in",
            img: "/mpscheme/qa2.jpg"
        },
        {
            title: "VERIFY PMS SCHEME",
            desc: "Cross-check PMS Scheme details and benefits on official MSME website.",
            btn: "VERIFY SCHEME",
            icon: ShieldCheck,
            color: "purple",
            link: "https://msme.gov.in",
            img: "/mpscheme/qa3.jpg"
        },
        {
            title: "VIEW APPROVAL LETTER",
            desc: "Download the official approval letter issued for IHWE 2026 under PMS Scheme.",
            btn: "VIEW LETTER",
            icon: FileText,
            color: "orange",
            link: "#",
            img: "/mpscheme/qa4.jpg"
        },
        {
            title: "NEW MSME REGISTRATION",
            desc: "Not registered yet? Register as an MSME and become eligible.",
            btn: "REGISTER NOW",
            icon: UserPlus,
            color: "rose",
            link: "https://udyamregistration.gov.in",
            img: "/mpscheme/qa5.jpg"
        }
    ];

    const colorMap = {
        green: { border: "border-green-200", text: "text-[#1e5c1e]", iconBg: "bg-green-50", iconText: "text-green-800", btnHover: "hover:bg-green-50" },
        blue: { border: "border-blue-200", text: "text-[#003566]", iconBg: "bg-blue-50", iconText: "text-[#003566]", btnHover: "hover:bg-blue-50" },
        purple: { border: "border-indigo-200", text: "text-[#3c096c]", iconBg: "bg-indigo-50", iconText: "text-[#3c096c]", btnHover: "hover:bg-indigo-50" },
        orange: { border: "border-orange-200", text: "text-[#d9480f]", iconBg: "bg-orange-50", iconText: "text-[#d9480f]", btnHover: "hover:bg-orange-50" },
        rose: { border: "border-red-200", text: "text-[#c1121f]", iconBg: "bg-red-50", iconText: "text-[#c1121f]", btnHover: "hover:bg-red-50" },
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-8 space-y-8 font-['Barlow',sans-serif]">

            {/* ── QUICK ACCESS ROW ── */}
            <div>
                <div className="flex items-center justify-center gap-4 mb-6">
                    {/* Decorative leaf-arrow left */}
                    <div className="flex items-center gap-1 text-green-700 opacity-80">
                        <div className="w-2 h-[2px] bg-current rotate-[30deg] translate-y-[3px]" />
                        <div className="w-4 h-[2px] bg-current" />
                        <div className="w-2 h-[2px] bg-current -rotate-[30deg] -translate-y-[3px]" />
                    </div>

                    <h2 className="text-[17px] font-black text-[#051d40] tracking-[0.05em] uppercase">
                        Quick Access – Everything You Need
                    </h2>

                    {/* Decorative leaf-arrow right */}
                    <div className="flex items-center gap-1 text-green-700 opacity-80">
                        <div className="w-2 h-[2px] bg-current rotate-[30deg] translate-y-[3px]" />
                        <div className="w-4 h-[2px] bg-current" />
                        <div className="w-2 h-[2px] bg-current -rotate-[30deg] -translate-y-[3px]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                    {accessCards.map((card, i) => {
                        const clr = colorMap[card.color];
                        return (
                            <div key={i} className={`bg-white rounded-2xl border ${clr.border} shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>

                                {/* TOP IMAGE WITH OVERLAPPING ICON */}
                                <div className="w-full h-[120px] relative bg-gray-100 overflow-hidden border-b border-gray-100">
                                    {/* Background Image */}
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        className="w-full h-full object-cover object-center opacity-90 saturate-[0.85]"
                                        onError={(e) => { e.target.src = "https://placehold.co/300x200?text=Image"; }}
                                    />
                                    {/* White Overlap Mask Area */}
                                    <div className="absolute top-0 left-0 w-[85px] h-[85px] bg-white/90 backdrop-blur-[2px] rounded-br-[3.5rem] shadow-[4px_4px_15px_rgba(0,0,0,0.08)] flex items-start justify-start p-2 z-10">
                                        <div className={`w-14 h-14 rounded-full ${clr.iconBg} flex items-center justify-center shadow-sm`}>
                                            <card.icon className={clr.iconText} size={26} strokeWidth={2} />
                                        </div>
                                    </div>
                                </div>

                                {/* BOTTOM CONTENT */}
                                <div className="p-4 flex-1 flex flex-col items-center text-center bg-white">
                                    <h3 className={`text-[12px] font-black leading-snug mb-3 uppercase tracking-tight ${clr.text}`}>
                                        {card.title}
                                    </h3>

                                    <p className="text-[12px] text-gray-600 font-medium leading-relaxed flex-1 min-h-[44px] mb-4 px-1">
                                        {card.desc}
                                    </p>

                                    <a
                                        href={card.link}
                                        target={card.link.startsWith('http') ? "_blank" : undefined}
                                        rel="noreferrer"
                                        className={`w-full py-2 border border-current rounded-lg text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-200 ${clr.text} ${clr.btnHover} bg-white`}
                                    >
                                        {card.btn} <ArrowRight size={14} strokeWidth={2} />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── SUBSIDY + ELIGIBILITY ROW ── */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* ── LEFT: SUBSIDY STRUCTURE ── */}
                <div className="w-full lg:w-[30%] xl:w-[25%] bg-[#f0f4f9] border border-[#e2e8f0] rounded-2xl p-4 shadow-sm flex flex-col font-['Barlow',sans-serif]">
                    <h3 className="text-[14px] font-black text-[#051d40] uppercase tracking-wide">Subsidy Structure</h3>
                    <p className="text-[10px] text-slate-600 font-medium mt-0.5">Get financial support up to</p>
                    <h2 className="text-[24px] font-black text-[#1e5c1e] leading-none mt-1.5 mb-4">₹1,50,000*</h2>

                    <div className="flex gap-2.5 mb-4">
                        {/* Sub-Card 1 */}
                        <div className="flex-1 bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-2.5 flex items-center gap-2">
                            <div className="shrink-0 w-8 h-8 text-[#1e5c1e] opacity-90 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="text-[12px] font-black text-[#d97706] leading-tight uppercase">Up To 80%</div>
                                <p className="text-[8px] font-bold text-slate-700 leading-snug uppercase mt-0.5">For General Category <br />of MSMEs</p>
                            </div>
                        </div>

                        {/* Sub-Card 2 */}
                        <div className="flex-1 bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-2.5 flex items-center gap-2">
                            <div className="shrink-0 w-8 h-8 text-[#1e5c1e] opacity-90 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="text-[12px] font-black text-[#16a34a] leading-tight uppercase">Up To 100%</div>
                                <p className="text-[8px] font-bold text-slate-700 leading-snug uppercase mt-0.5">For Special Category <br />of MSMEs</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom checks */}
                    <div className="space-y-2.5 mt-auto">
                        <div className="flex items-start gap-2">
                            <CheckCircle size={12} className="text-[#1e5c1e] mt-0.5 shrink-0" strokeWidth={3} />
                            <span className="text-[10px] font-bold text-slate-700 leading-tight">Maximum reimbursement: ₹1.5 Lakhs</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle size={12} className="text-[#1e5c1e] mt-0.5 shrink-0" strokeWidth={3} />
                            <span className="text-[10px] font-bold text-slate-700 leading-[1.4]">Reimbursement is processed after successful <br />participation & approval by MSME.</span>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: ELIGIBILITY CRITERIA ── */}
                <div className="flex-1 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm flex relative overflow-hidden font-['Barlow',sans-serif]">

                    <div className="p-4 flex flex-col flex-1 z-10 relative pr-4 lg:pr-[28%]">
                        <h3 className="text-[14px] font-black text-[#051d40] uppercase tracking-wide mb-3">Eligibility Criteria – 80% to 100% Subsidy</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 mb-4">
                            {/* Left Column */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-black text-[#d9480f] uppercase tracking-wider mb-1">You Get Up To 80% If:</h4>
                                {[
                                    <>You are a registered MSME with<br />valid Udyam Certificate</>,
                                    <>First-time or limited participation<br />in international / national exhibitions</>,
                                    <>You belong to the general<br />category of businesses</>,
                                    <>You are eligible under PMS Scheme<br />guidelines</>,
                                    <>Stall booked under an approved<br />event like IHWE 2026</>
                                ].map((text, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <div className="shrink-0 w-4 h-4 rounded-full border border-[#d9480f] flex items-center justify-center mt-0.5">
                                            <CheckCircle size={11} className="text-[#d9480f]" strokeWidth={3} />
                                        </div>
                                        <span className="text-[10.5px] font-bold text-slate-700 leading-tight">{text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="space-y-3 border-l border-slate-100 pl-4">
                                <h4 className="text-sm font-black text-[#166534] uppercase tracking-wider mb-1">You Can Get Up To 100% If You Belong To:</h4>
                                {[
                                    "Women Entrepreneurs",
                                    "SC / ST Entrepreneurs",
                                    "Startups recognized by DPIIT / MSME",
                                    "Businesses from North-East Region",
                                    <>Businesses from Aspirational Districts /<br />Backward Areas</>,
                                    <>First-time participants in international<br />exhibitions with valid criteria</>
                                ].map((text, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <div className="shrink-0 w-4 h-4 rounded-full border border-[#166534] flex items-center justify-center mt-0.5">
                                            <CheckCircle size={11} className="text-[#166534]" strokeWidth={3} />
                                        </div>
                                        <span className="text-[10.5px] font-bold text-slate-700 leading-tight">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info Bottom Strip */}
                        <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-md p-2 flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#166534] text-white flex items-center justify-center text-[10px] font-bold shrink-0">i</div>
                            <p className="text-[10px] font-bold text-slate-700 leading-none">
                                Final subsidy % is subject to approval by MSME as per their norms and documentation.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT FEATURED GRAPHIC BOX - HIDDEN ON MOBILE TO SAVE SPACE */}
                    <div className="hidden lg:block absolute top-0 right-[-5%] bottom-0 w-[35%] overflow-hidden">
                        {/* Diagonal Clip/Mask container */}
                        <div
                            className="absolute inset-0 bg-cover bg-center z-0 border-l-[6px] border-[#22c55e]"
                            style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80")',
                                clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                            }}
                        >
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>

                        {/* Floating Money Bag image overlap for depth */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 translate-x-4">
                            <div className="relative w-[80%] h-[80%] rounded-3xl overflow-hidden border-[4px] border-[#22c55e] shadow-2xl rotate-[-3deg]">
                                <img
                                    src="/msmepmsscheme/mony-bag.png"
                                    className="w-full h-full object-cover rotate-[3deg] scale-110"
                                    alt=""
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                {/* Green tint overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent mix-blend-overlay" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VerifyCheck;