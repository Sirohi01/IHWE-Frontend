import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/BuyerAuthContext";
import {
    Star,
    User,
    Home,
    Users,
    Briefcase,
    Lightbulb,
    Video,
    FileText,
    Calendar,
    ArrowRight,
    ShieldAlert,
    Clock,
    Globe,
    TrendingUp,
    ExternalLink,
    ChevronDown,
    X,
    Check,
    Upload,
    PenTool,
    MapPin,
    Award
} from "lucide-react";
import Swal from 'sweetalert2';
import { cn } from "@/lib/utils";

// ── Components ──────────────────────────────────────────────────────────────────

const StarRating = ({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) => {
    return (
        <div className="flex flex-col gap-0.5 min-w-[120px] print:min-w-0 text-left print:flex-row print:items-center print:gap-1 print:py-0.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight print:text-[8pt] print:text-black print:normal-case print:font-bold leading-tight mb-0.5 print:mb-0 print:w-32 shrink-0">{label}:</span>
            <div className="flex gap-1 star-row print:gap-1 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        className={cn(
                            "transition-all duration-200 transform print:transform-none",
                            star <= value ? 'scale-110' : 'hover:scale-105'
                        )}
                    >
                        <Star
                            size={16}
                            fill={star <= value ? "#d26019" : "none"}
                            style={{ color: star <= value ? "#d26019" : "#cbd5e1" }}
                            className={cn(
                                "print:hidden",
                                star <= value ? "text-[#d26019]" : "text-slate-200"
                            )}
                        />
                        <span className="hidden print:inline text-[13pt] leading-none text-black">
                            {star <= value ? '★' : '☆'}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const FeedbackSection = ({ title, icon: Icon, children, id }: { title: string, icon: any, children: React.ReactNode, id: string }) => (
    <div id={id} className="bg-white rounded-xl border border-slate-200 shadow-sm mb-5 scroll-mt-24 print:border-none print:shadow-none print:mb-0.5 text-left relative overflow-visible print:bg-[#f8f9fa] print:rounded-lg">
        <div className="bg-slate-50/80 px-4 py-2 border-b border-slate-200 flex items-center gap-2.5 print:bg-transparent print:border-none print:pt-1 print:pb-0 print:px-4">
            <div className="bg-white p-1 rounded-md shadow-sm border border-slate-100 print:hidden text-[#23471d]">
                <Icon size={14} />
            </div>
            <div className="w-full print:pb-0.5">
                <h3 className="text-[12px] font-black text-[#23471d] uppercase tracking-wide print:text-[9pt] print:text-black print:font-black print:uppercase m-0 p-0 border-none w-full">
                    {title}
                </h3>
            </div>
        </div>
        <div className="p-4 print:pt-0.5 print:px-4 print:pb-0.5">
            {children}
        </div>
    </div>
);

const RadioOption = ({ label, value, current, onChange, name }: { label: string, value: string, current: string, onChange: (v: string | any) => void, name: string }) => (
    <label className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer print:p-0 print:border-none print:shadow-none text-left",
        current === value
            ? 'bg-[#23471d]/5 border-[#23471d] print:bg-transparent'
            : 'border-slate-100 hover:border-slate-200 shadow-sm'
    )}>
        <input
            type="radio"
            name={name}
            checked={current === value}
            onChange={() => onChange(value)}
            className="w-4 h-4 print:hidden accent-[#23471d] focus:ring-0 focus:ring-offset-0"
        />
        {current === value && <span className="hidden print:inline text-black font-bold text-[11pt]">●</span>}
        {current !== value && <span className="hidden print:inline text-slate-300 text-[11pt]">○</span>}
        <span className="text-[12px] font-medium text-slate-700 print:text-[10pt] print:text-black leading-tight flex-1">{label}</span>
    </label>
);

const PrintField = ({ label, value, fullWidth = false }: { label: string, value: string, fullWidth?: boolean }) => (
    <div className={cn(
        "hidden print:flex items-start gap-1 py-0.5 border-none",
        fullWidth ? "col-span-2" : ""
    )}>
        <span className="text-[8pt] text-[#555] font-bold min-w-[130px] shrink-0 leading-tight whitespace-nowrap">{label}:</span>
        <span className="text-[9pt] text-black font-bold flex-1 break-words whitespace-normal leading-tight pb-0">{value || '-'}</span>
    </div>
);

const DropdownWithOther = ({
    label,
    options,
    value,
    onChange,
    otherValue,
    onOtherChange,
    placeholder = "Select"
}: {
    label: string,
    options: string[],
    value: string,
    onChange: (v: string) => void,
    otherValue?: string,
    onOtherChange?: (v: string) => void,
    placeholder?: string
}) => (
    <>
        <div className="space-y-1 print:hidden text-left mb-4">
            <label className="reg-label">{label}</label>
            <div className="flex flex-col gap-1.5 relative">
                <div className="relative flex-1">
                    <select
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        className="reg-input h-10 text-[13px] appearance-none pr-8 cursor-pointer focus:ring-0 focus:border-[#23471d]"
                    >
                        <option value="">{placeholder}</option>
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                {value === 'Other' && onOtherChange && (
                    <input
                        placeholder="Specify..."
                        className="reg-input h-10 text-[13px] border-[#23471d] focus:ring-0 outline-none"
                        value={otherValue}
                        onChange={e => onOtherChange(e.target.value)}
                    />
                )}
            </div>
        </div>
        <PrintField label={label} value={value === 'Other' ? (otherValue || '') : value} />
    </>
);

const MultiSelectDropdown = ({
    label,
    options,
    selected,
    toggle,
    otherValue,
    onOtherChange,
    placeholder = "Select multiple"
}: {
    label: string,
    options: string[],
    selected: string[],
    toggle: (v: string) => void,
    otherValue?: string,
    onOtherChange?: (v: string) => void,
    placeholder?: string
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isOtherSelected = selected.includes("Other");

    return (
        <>
            <div className="space-y-1 relative text-left print:hidden mb-4" ref={containerRef}>
                <label className="reg-label">{label}</label>
                <div className="flex flex-col gap-1.5 overflow-visible">
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "reg-input h-auto min-h-[40px] py-2 flex flex-wrap gap-1.5 items-center cursor-pointer pr-10 relative",
                            isOpen ? "border-[#23471d] shadow-sm" : "border-slate-200"
                        )}
                    >
                        {selected.length === 0 ? (
                            <span className="text-slate-400 text-[13px] ml-1">{placeholder}</span>
                        ) : (
                            <div className="flex flex-wrap gap-1.5">
                                {selected.map(item => (
                                    <span key={item} className="bg-[#23471d]/10 text-[#23471d] text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1.5">
                                        {item}
                                        <X size={12} onClick={(e) => { e.stopPropagation(); toggle(item); }} className="hover:text-red-500" />
                                    </span>
                                ))}
                            </div>
                        )}
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                            <ChevronDown size={14} className={cn("text-slate-500 transition-transform duration-200", isOpen && "rotate-180")} />
                        </span>
                    </div>

                    {isOtherSelected && onOtherChange && (
                        <input
                            placeholder="Please specify..."
                            className="reg-input h-10 text-[13px] border-[#23471d] focus:ring-0 outline-none"
                            value={otherValue}
                            onChange={e => onOtherChange(e.target.value)}
                        />
                    )}
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute z-[100] w-full mt-1 bg-white border border-slate-200 shadow-xl rounded-lg max-h-56 overflow-y-auto"
                        >
                            {options.map(opt => (
                                <div
                                    key={opt}
                                    onClick={(e) => { e.stopPropagation(); toggle(opt); }}
                                    className={cn(
                                        "px-4 py-2.5 text-[13px] cursor-pointer hover:bg-slate-50 flex items-center gap-3 transition-colors border-l-4",
                                        selected.includes(opt) ? "text-[#23471d] font-bold bg-[#23471d]/5 border-[#23471d]" : "text-slate-600 border-transparent"
                                    )}
                                >
                                    <div className={cn(
                                        "w-4 h-4 rounded border flex items-center justify-center",
                                        selected.includes(opt) ? "bg-[#23471d] border-[#23471d]" : "border-slate-300 bg-white"
                                    )}>
                                        {selected.includes(opt) && <Check size={12} className="text-white" />}
                                    </div>
                                    {opt}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <PrintField label={label} value={selected.join(", ") + (isOtherSelected && otherValue ? ` (${otherValue})` : '')} />
        </>
    );
};

const FileInputButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <div className="flex-1 print:hidden">
        <input type="file" id={id} className="hidden" />
        <label htmlFor={id} className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-slate-600 font-bold text-[11px] cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 transition-all">
            <Icon size={14} />
            {label}
        </label>
    </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────

export default function BuyerFeedbackForm() {
    const { currentBuyer } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        buyerId: "",
        companyName: "",
        businessType: "",
        otherBusinessType: "",
        designation: "",
        mobileNumber: "",
        whatsappNumber: "",
        emailId: "",
        country: "India",
        otherCountryName: "",
        city: "",

        overallRating: "",
        expoValue: "",
        participateAgain: "",

        relevantExhibitors: "",
        meetingsConducted: "",
        meetingQuality: "",
        suppliersShortlisted: "",

        estimatedBusiness: "",
        otherEstimatedBusiness: "",
        lookingForward: [] as string[],
        otherLookingForward: "",

        hostedExperience: "",
        hotelTravelSupport: "",
        localAssistance: "",
        rmSupport: "",

        regProcess: 0,
        meetingScheduling: 0,
        loungeExperience: 0,
        conferenceSessions: 0,
        organizerSupport: 0,
        exhibitorQuality: 0,

        biggestChallenge: "",
        otherChallenge: "",
        challengeExplanation: "",

        futureEngagement: [] as string[],
        otherFutureEngagement: "",
        priorityAccess: "",
        dedicatedSupport: "",

        improvements: "",
        testimonialPermission: "No",

        isDeclared: false,
        digitalSignature: "",
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (currentBuyer) {
            setForm(prev => ({
                ...prev,
                fullName: currentBuyer.fullName || currentBuyer.name || "",
                buyerId: currentBuyer.uniqueId || currentBuyer.id || "",
                companyName: currentBuyer.companyName || "",
                designation: currentBuyer.designation || "",
                mobileNumber: currentBuyer.mobile || "",
                whatsappNumber: currentBuyer.whatsapp || currentBuyer.mobile || "",
                emailId: currentBuyer.email || "",
                country: currentBuyer.country || "India",
                city: currentBuyer.city || ""
            }));
        }
    }, [currentBuyer]);

    const handleRating = (key: string, val: number) => setForm(prev => ({ ...prev, [key]: val }));
    const handleValue = (key: string, val: any) => setForm(prev => ({ ...prev, [key]: val }));
    const toggleArray = (key: 'lookingForward' | 'futureEngagement', val: string) => {
        setForm(prev => ({
            ...prev,
            [key]: prev[key].includes(val) ? prev[key].filter(v => v !== val) : [...prev[key], val]
        }));
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const [y, m, d] = dateStr.split('-');
        return `${d}-${m}-${y}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.isDeclared) {
            Swal.fire({ icon: 'warning', title: 'Action Required', text: 'Please confirm the final declaration.', confirmButtonColor: '#23471d' });
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            Swal.fire({ icon: 'success', title: 'Feedback Recorded', text: 'Thank you for your valuable feedback!', confirmButtonColor: '#23471d' });
        }, 1500);
    };

    const progress = Math.round((Object.values(form).filter(v =>
        (typeof v === 'string' && v !== "") ||
        (typeof v === 'number' && v !== 0) ||
        (Array.isArray(v) && v.length > 0) ||
        (typeof v === 'boolean' && v === true)
    ).length / Object.keys(form).length) * 100);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4 print:space-y-0 text-left">

            {/* Print-Only Professional Header (Brochure Style) - Commented out to use image instead
            <div className="hidden print:block w-full print:mb-0 mb-3 relative overflow-hidden">
                <div className="flex relative print:h-auto print:min-h-[130px]">
                    <div className="flex-1 flex px-6 py-4 items-center z-10 bg-white">
                        <div className="flex flex-col justify-center pr-6 border-r border-slate-300">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-[50px] h-[50px]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <path d="M50 90 C75 75 85 50 85 35 C85 20 70 10 50 25 C30 10 15 20 15 35 C15 50 25 75 50 90" fill="#0072bc" />
                                        <path d="M50 80 C65 65 75 45 75 35 C75 25 65 15 50 30 C35 15 25 25 25 35 C25 45 35 65 50 80" fill="#8bc34a" />
                                        <circle cx="50" cy="40" r="10" fill="white" />
                                        <path d="M38 55 Q50 70 62 55" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-[26pt] font-black text-[#002b49] leading-[0.8] tracking-tighter">IHWE</h1>
                                    <p className="text-[8pt] font-bold text-slate-800 leading-tight">International<br />Health & Wellness Expo</p>
                                </div>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-[22pt] font-black text-[#002b49] leading-none">9</span>
                                    <sup className="text-[10pt] font-black text-[#002b49] -top-[10px]">th</sup>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10pt] font-black text-[#b48a3c] leading-none uppercase tracking-wide">GLOBAL EDITION</span>
                                    <p className="text-[6.5pt] font-bold text-black leading-tight mt-0.5">India's Leading Global Platform for<br />Healthcare, AYUSH & Wellness</p>
                                </div>
                            </div>
                        </div>

                        <div className="pl-6 flex flex-col justify-center">
                            <div className="text-[28pt] font-black text-[#002b49] leading-[0.9] tracking-tight">BUYER</div>
                            <div className="text-[20pt] font-black text-[#b48a3c] leading-[0.9] tracking-tight mb-2">FEEDBACK FORM</div>

                            <div className="flex items-center gap-1 mb-2">
                                <div className="h-[0.5pt] w-12 bg-[#b48a3c]" />
                                <div className="w-1.5 h-1.5 rotate-45 border-[0.5pt] border-[#b48a3c]" />
                                <div className="h-[0.5pt] w-12 bg-[#b48a3c]" />
                            </div>

                            <p className="text-[8.5pt] font-bold text-slate-800 leading-tight">Your Feedback. Our Strength.<br />Building Stronger Global Partnerships.</p>
                        </div>
                    </div>

                    <div className="w-[40%] relative print:h-[140px] h-[180px] print:mt-0 print:mr-0 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-[#002b49] overflow-hidden print:rounded-none"
                            style={{ borderBottomLeftRadius: '200px', borderTopLeftRadius: '200px' }}
                        >                            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-90 print:object-fill print:h-full0" alt="Expo Venue" />
                        </div>
                        <div className="absolute top-[20px] right-4 print:top-[10px] print:right-2 bg-[#002b49] text-white py-2 pl-4 pr-6 rounded-l-2xl shadow-lg border-l-[4px] border-[#002b49] flex flex-col gap-2">
                            <div className="flex items-start gap-2">
                                <Calendar className="text-[#b48a3c] mt-0.5" size={16} />
                                <div>
                                    <p className="text-[11pt] font-black leading-none mb-0.5">21 – 23</p>
                                    <p className="text-[6pt] uppercase tracking-widest text-white/90">AUGUST 2026</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="text-[#b48a3c] mt-0.5" size={16} />
                                <div>
                                    <p className="text-[7pt] font-black leading-tight uppercase tracking-wider mb-0.5">PRAGATI MAIDAN</p>
                                    <p className="text-[6pt] uppercase tracking-widest text-white/90">NEW DELHI, INDIA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[15px] relative z-20 print:mb-0 -mb-[8px] pointer-events-none print:hidden">
                    <svg viewBox="0 0 1000 15" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,15 Q200,-5 500,8 T1000,15 L1000,15 L0,15 Z" fill="#002b49" />
                        <path d="M0,14 Q200,-6 500,7 T1000,14" fill="none" stroke="#b48a3c" strokeWidth="2" />
                    </svg>
                </div>

                <div className="bg-[#002b49] py-2 px-6 grid grid-cols-4 gap-2 text-white relative z-20">
                    <div className="flex flex-col justify-center border-r border-white/20 px-2">
                        <div className="flex items-center gap-2 mb-0.5">
                            <Globe className="text-[#b48a3c]" size={20} strokeWidth={1.5} />
                            <div>
                                <p className="text-[12pt] font-black leading-none">1500+</p>
                                <p className="text-[6pt] font-bold uppercase tracking-wider">EXHIBITORS</p>
                            </div>
                        </div>
                        <p className="text-[5pt] text-white/70 pl-8 leading-tight">Across Successful Editions</p>
                    </div>
                    <div className="flex flex-col justify-center border-r border-white/20 px-2">
                        <div className="flex items-center gap-2 mb-0.5">
                            <Users className="text-[#b48a3c]" size={20} strokeWidth={1.5} />
                            <div>
                                <p className="text-[12pt] font-black leading-none">15000+</p>
                                <p className="text-[6pt] font-bold uppercase tracking-wider">TRADE VISITORS</p>
                            </div>
                        </div>
                        <p className="text-[5pt] text-white/70 pl-8 leading-tight">From 30+ Countries</p>
                    </div>
                    <div className="flex flex-col justify-center border-r border-white/20 px-2">
                        <div className="flex items-center gap-2 mb-0.5">
                            <Award className="text-[#b48a3c]" size={20} strokeWidth={1.5} />
                            <div>
                                <p className="text-[12pt] font-black leading-none">10+</p>
                                <p className="text-[6pt] font-bold uppercase tracking-wider">YEARS</p>
                            </div>
                        </div>
                        <p className="text-[5pt] text-white/70 pl-8 leading-tight">Legacy of Trust & Growth</p>
                    </div>
                    <div className="flex flex-col justify-center px-2">
                        <div className="flex items-center gap-2 mb-0.5">
                            <TrendingUp className="text-[#b48a3c]" size={20} strokeWidth={1.5} />
                            <div>
                                <p className="text-[12pt] font-black leading-none">₹500Cr+</p>
                                <p className="text-[6pt] font-bold uppercase tracking-wider">BUSINESS OPPS</p>
                            </div>
                        </div>
                        <p className="text-[5pt] text-white/70 pl-8 leading-tight">Generated Over the Years</p>
                    </div>
                </div>
            </div> */}

            {/* New Image Header for Print */}
            <div className="hidden print:block w-full">
                <img loading="lazy" decoding="async" src="/feedbackform_header.webp"
                    className="w-full h-[120px] object-cover block"
                    alt="IHWE Header"
                />
            </div>


            {/* Top Bar / Print Header */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm print:hidden">
                <div className="print:w-full">
                    <h2 className="text-[22px] font-black text-slate-900 uppercase tracking-tight mb-1 print:text-[22pt] print:mb-1 print:font-bold">BUYER FEEDBACK REPORT</h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest print:text-[11pt] print:text-slate-700 print:tracking-normal print:font-semibold">International Health & Wellness Expo 2026</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 print:hidden">
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Completion Progress</p>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-32 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#16a34a] transition-all duration-500" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="text-sm font-black text-slate-900">{progress}%</span>
                        </div>
                    </div>
                    <button type="button" onClick={() => window.print()} className="h-11 px-6 bg-[#23471d] hover:bg-[#1a3516] text-white rounded-sm flex items-center gap-2.5 transition-all shadow-md">
                        <Calendar size={18} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Download Report</span>
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="print:space-y-0 text-left">
                <FeedbackSection id="section-1" title="Section 1 – Buyer Basic Details" icon={User}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:grid-cols-2 print:gap-x-12 print:gap-y-0.5">
                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Full Name</label>
                            <input readOnly value={form.fullName} className="reg-input bg-slate-50 h-10 text-[13px] focus:ring-0 outline-none" />
                        </div>
                        <PrintField label="Full Name" value={form.fullName} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Buyer ID</label>
                            <input readOnly value={form.buyerId} className="reg-input bg-slate-50 h-10 text-[13px] uppercase focus:ring-0 outline-none" />
                        </div>
                        <PrintField label="Buyer ID" value={form.buyerId} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Company Name</label>
                            <input readOnly value={form.companyName} className="reg-input bg-slate-50 h-10 text-[13px] focus:ring-0 outline-none" />
                        </div>
                        <PrintField label="Company Name" value={form.companyName} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Designation</label>
                            <input value={form.designation} onChange={e => handleValue('designation', e.target.value)} className="reg-input h-10 text-[13px] focus:ring-0 outline-none" />
                        </div>
                        <PrintField label="Designation" value={form.designation} />

                        <DropdownWithOther
                            label="Business Type"
                            options={["Importer", "Distributor", "Wholesaler", "Retail Chain", "Hospital Procurement", "Government Buyer", "Institutional Buyer", "Franchise Partner", "Investor", "International Buyer", "Other"]}
                            value={form.businessType}
                            onChange={v => handleValue('businessType', v)}
                            otherValue={form.otherBusinessType}
                            onOtherChange={v => handleValue('otherBusinessType', v)}
                        />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Mobile (with Country Code)</label>
                            <input value={form.mobileNumber} onChange={e => handleValue('mobileNumber', e.target.value)} className="reg-input h-10 text-[13px] focus:ring-0 outline-none" />
                        </div>
                        <PrintField label="Mobile Number" value={form.mobileNumber} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">WhatsApp Number</label>
                            <input value={form.whatsappNumber} onChange={e => handleValue('whatsappNumber', e.target.value)} className="reg-input h-10 text-[13px] focus:ring-0 outline-none" />
                        </div>
                        <PrintField label="WhatsApp" value={form.whatsappNumber} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Official Email ID</label>
                            <input value={form.emailId} onChange={e => handleValue('emailId', e.target.value)} className="reg-input h-10 text-[13px] lowercase focus:ring-0 outline-none" />
                        </div>
                        <PrintField label="Official Email" value={form.emailId} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">City</label>
                            <input value={form.city} onChange={e => handleValue('city', e.target.value)} className="reg-input h-10 text-[13px] focus:ring-0 outline-none" />
                        </div>
                        <PrintField label="Location (City)" value={form.city} />

                        <div className="space-y-1 lg:col-span-2 print:col-span-1">
                            <label className="reg-label print:hidden">Country</label>
                            <div className="flex items-center gap-3 print:hidden">
                                <div className="flex gap-2">
                                    <RadioOption name="country" label="India" value="India" current={form.country} onChange={v => handleValue('country', v)} />
                                    <RadioOption name="country" label="Other Country" value="Other" current={form.country} onChange={v => handleValue('country', v)} />
                                </div>
                                {form.country === 'Other' && (
                                    <input placeholder="Enter Country" className="reg-input h-10 text-[13px] w-40 border-[#23471d] focus:ring-0 outline-none" value={form.otherCountryName} onChange={e => handleValue('otherCountryName', e.target.value)} />
                                )}
                            </div>
                            <PrintField label="Country" value={form.country === 'Other' ? form.otherCountryName : form.country} />
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-2" title="Section 2 – Overall Experience" icon={Star}>
                    <div className="grid grid-cols-3 gap-1.5 print:grid-cols-2 print:gap-x-10 print:gap-y-0.5">
                        <DropdownWithOther label="Experience at the Expo?" options={["Excellent", "Very Good", "Good", "Average", "Poor"]} value={form.overallRating} onChange={v => handleValue('overallRating', v)} />
                        <DropdownWithOther label="Valuable for Objectives?" options={["Extremely Valuable", "Valuable", "Moderately Valuable", "Slightly Valuable", "Not Valuable"]} value={form.expoValue} onChange={v => handleValue('expoValue', v)} />
                        <DropdownWithOther label="Participate Again?" options={["Definitely Yes", "Probably Yes", "Maybe", "Probably No", "No"]} value={form.participateAgain} onChange={v => handleValue('participateAgain', v)} />
                    </div>
                </FeedbackSection>
                <FeedbackSection id="section-3" title="Section 3 – Match Quality" icon={Globe}>
                    <div className="grid grid-cols-4 gap-1.5 print:grid-cols-2 print:gap-x-10 print:gap-y-0.5">
                        <DropdownWithOther label="Relevant exhibitors found?" options={["Yes – Highly Relevant", "Yes – Moderately Relevant", "Limited Relevance", "No"]} value={form.relevantExhibitors} onChange={v => handleValue('relevantExhibitors', v)} />
                        <DropdownWithOther label="Total Meetings Conducted" options={["1–5", "5–10", "10–20", "20+"]} value={form.meetingsConducted} onChange={v => handleValue('meetingsConducted', v)} />
                        <DropdownWithOther label="Quality of B2B Meetings" options={["Excellent", "Good", "Average", "Poor"]} value={form.meetingQuality} onChange={v => handleValue('meetingQuality', v)} />
                        <DropdownWithOther label="Serious Suppliers Shortlisted" options={["1–5", "5–10", "10+"]} value={form.suppliersShortlisted} onChange={v => handleValue('suppliersShortlisted', v)} />
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-4" title="Section 4 – Business Potential" icon={Briefcase}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 print:grid-cols-2 print:gap-x-12 print:gap-y-0.5">
                        <DropdownWithOther
                            label="Estimated Business Value"
                            options={["Below USD 10,000", "USD 10,000 – USD 50,000", "USD 50,000 – USD 200,000", "USD 200,000+"]}
                            value={form.estimatedBusiness}
                            onChange={v => handleValue('estimatedBusiness', v)}
                        />
                        <MultiSelectDropdown
                            label="Looking Forward To"
                            options={["Purchase Order Placement", "Distributor Appointment", "Franchise Finalization", "Strategic Partnership", "Government Procurement", "OEM Partnership", "Investment Opportunity", "Hospital Supply Agreement"]}
                            selected={form.lookingForward}
                            toggle={v => toggleArray('lookingForward', v)}
                        />
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-5" title="Section 5 – Hosted Experience" icon={Home}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:grid-cols-2 print:gap-x-12 print:gap-y-0.5 text-left">
                        {[
                            { title: "Program Experience", name: "hostedExperience" },
                            { title: "Hotel & Travel Support", name: "hotelTravelSupport" },
                            { title: "Local Assistance", name: "localAssistance" },
                            { title: "RM Support", name: "rmSupport" }
                        ].map(q => (
                            <DropdownWithOther key={q.name} label={q.title} options={["Excellent", "Good", "Average", "Poor", "N/A"]} value={(form as any)[q.name]} onChange={v => handleValue(q.name, v)} />
                        ))}
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-6" title="Section 6 – Event Management Rating" icon={Clock}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-4 gap-x-4 print:grid-cols-2 print:gap-y-0.5 print:gap-x-12">
                        <StarRating label="Registration Process" value={form.regProcess} onChange={v => handleRating('regProcess', v)} />
                        <StarRating label="Meeting Scheduling" value={form.meetingScheduling} onChange={v => handleRating('meetingScheduling', v)} />
                        <StarRating label="Lounge Experience" value={form.loungeExperience} onChange={v => handleRating('loungeExperience', v)} />
                        <StarRating label="Conference Sessions" value={form.conferenceSessions} onChange={v => handleRating('conferenceSessions', v)} />
                        <StarRating label="Organizer Support" value={form.organizerSupport} onChange={v => handleRating('organizerSupport', v)} />
                        <StarRating label="Exhibitor Quality" value={form.exhibitorQuality} onChange={v => handleRating('exhibitorQuality', v)} />
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-7" title="Section 7 – Challenges Faced" icon={ShieldAlert}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 print:grid-cols-2 print:gap-x-12 print:gap-y-0.5 items-start">
                        <DropdownWithOther
                            label="Biggest issue?"
                            options={["Low Quality Supplier Match", "Limited Buyer Meetings", "Poor Scheduling", "Venue Management", "Travel Support", "Communication Gap", "Product Quality Concerns", "Documentation Issues", "Other"]}
                            value={form.biggestChallenge}
                            onChange={v => handleValue('biggestChallenge', v)}
                            otherValue={form.otherChallenge}
                            onOtherChange={v => handleValue('otherChallenge', v)}
                        />
                        <div className="space-y-1">
                            <label className="reg-label print:hidden">Explain briefly</label>
                            <textarea value={form.challengeExplanation} onChange={e => handleValue('challengeExplanation', e.target.value)} className="reg-input min-h-[45px] pt-2 text-[13px] print:hidden focus:ring-0 outline-none resize-none" placeholder="Provide details..." />
                            <PrintField label="Explanation" value={form.challengeExplanation} />
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-8" title="Section 8 – Future Opportunities" icon={Lightbulb}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 print:grid-cols-2 print:gap-x-12 print:gap-y-0.5 items-start">
                        <div className="print:col-span-2">
                            <MultiSelectDropdown
                                label="Interested in future as:"
                                options={["Hosted Buyer", "Strategic Buyer", "Investor", "Franchise Partner", "Conference Speaker", "Government Partner", "International Delegate"]}
                                selected={form.futureEngagement}
                                toggle={v => toggleArray('futureEngagement', v)}
                            />
                        </div>
                        <div className="space-y-2 print:hidden">
                            <label className="reg-label uppercase">Priority Access?</label>
                            <div className="flex gap-5"><RadioOption name="priorityAccess" label="Yes" value="Yes" current={form.priorityAccess} onChange={v => handleValue('priorityAccess', v)} /><RadioOption name="priorityAccess" label="No" value="No" current={form.priorityAccess} onChange={v => handleValue('priorityAccess', v)} /></div>
                        </div>
                        <PrintField label="Priority Access" value={form.priorityAccess} />

                        <div className="space-y-2 print:hidden">
                            <label className="reg-label uppercase">Dedicated Support?</label>
                            <div className="flex gap-5"><RadioOption name="dedicatedSupport" label="Yes" value="Yes" current={form.dedicatedSupport} onChange={v => handleValue('dedicatedSupport', v)} /><RadioOption name="dedicatedSupport" label="No" value="No" current={form.dedicatedSupport} onChange={v => handleValue('dedicatedSupport', v)} /></div>
                        </div>
                        <PrintField label="Dedicated Support" value={form.dedicatedSupport} />
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-9" title="Section 9 – Suggestions & Improvements" icon={Video}>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 print:grid-cols-2 print:gap-x-12 print:gap-y-0.5">
                        <div className="space-y-1">
                            <label className="reg-label uppercase print:hidden">Improvements for next edition?</label>
                            <textarea value={form.improvements} onChange={e => handleValue('improvements', e.target.value)} className="reg-input min-h-[50px] pt-3 print:hidden focus:ring-0 outline-none resize-none" placeholder="Your suggestions..." />
                            <PrintField label="Suggestions" value={form.improvements} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end mb-4">
                            <div className="space-y-2 print:hidden">
                                <p className="reg-label uppercase mb-2">Testimonial Permission?</p>
                                <div className="flex gap-4">
                                    <RadioOption name="testPerm" label="Yes" value="Yes" current={form.testimonialPermission} onChange={v => handleValue('testimonialPermission', v)} />
                                    <RadioOption name="testPerm" label="No" value="No" current={form.testimonialPermission} onChange={v => handleValue('testimonialPermission', v)} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <FileInputButton id="up-testimonial" label="Upload Testimonial" icon={FileText} />
                                <FileInputButton id="up-video" label="Upload Video Feedback" icon={Video} />
                            </div>
                        </div>

                        {/* Google Review Section */}
                        <div className="bg-[#23471d]/5 border border-[#23471d]/10 rounded-xl p-6 flex flex-col items-center text-center print:hidden mb-4">
                            <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-tight">Write a Review on Google</h3>
                            <p className="text-[11px] text-slate-500 mb-4 tracking-tight">Enjoyed your experience? Please share your feedback on Google!</p>
                            <a href="https://g.page/r/CWvrp1X7bjTDEBM/review" target="_blank" rel="noopener noreferrer" className="h-10 px-6 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                                <ExternalLink size={12} className="text-[#d26019]" /> Google Review Link
                            </a>
                        </div>

                        <PrintField label="Testimonial Consent" value={form.testimonialPermission} />
                    </div>
                </FeedbackSection>

                <div className="bg-white border-2 border-[#23471d]/5 rounded-2xl p-6 flex flex-col gap-6 mb-12 shadow-lg">
                    <div className="flex items-center gap-4">
                        <input type="checkbox" id="f-dec" checked={form.isDeclared} onChange={e => setForm(f => ({ ...f, isDeclared: e.target.checked }))} className="mt-1 w-5.5 h-5.5 border-[#23471d] accent-[#23471d] focus:ring-0 cursor-pointer" />
                        <label htmlFor="f-dec" className="text-[13px] font-bold text-slate-700 cursor-pointer flex-1 italic leading-relaxed">
                            "I confirm that the feedback provided above is true and based on my business experience."
                        </label>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-50 pt-8 print:border-none print:pt-2 print:hidden">
                        <div className="flex-1 min-w-[250px] flex items-center gap-5">
                            <div className="flex-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest print:text-[8pt] print:font-bold print:text-slate-600 print:mb-0.5">AUTHORIZED DIGITAL SIGNATURE</p>
                                <div className="flex flex-col gap-2">
                                    <input className="bg-transparent border-b-2 border-slate-100 w-full text-[20px] font-signature italic outline-none focus:border-[#23471d] h-11 print:hidden" placeholder="Type Digital Signature" value={form.digitalSignature} onChange={e => handleValue('digitalSignature', e.target.value)} />
                                    <FileInputButton id="up-signature" label="Upload Digital Signature" icon={PenTool} />
                                </div>
                                <div className="hidden print:block text-[14pt] font-signature border-b-[1pt] border-black min-w-[250px] max-w-[300px] py-0.5"> {form.digitalSignature || ''}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-[120px] text-right print:text-left print:items-end">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest print:text-[8pt] print:font-bold print:text-slate-600">DOCUMENT DATE</p>
                            <span className="text-[14px] font-bold text-slate-700 print:text-[10pt] print:text-black">{form.date}</span>
                        </div>
                        <div className="print:hidden"><button type="submit" className="h-12 px-14 bg-[#23471d] hover:bg-[#1a3516] text-white text-[12px] font-black uppercase tracking-widest rounded shadow-xl flex items-center gap-2.5 transition-all active:scale-95">Submit Official Feedback <ArrowRight size={20} /></button></div>
                    </div>
                    {/* Mandatory Signature & Date - Reordered for Visibility */}
                    <div className="hidden print:flex px-6 justify-between items-start mb-2 print:mt-0 print:mb-0">
                        <div className="flex flex-col">
                            <div className="text-[18pt] font-signature border-b-[1pt] border-black min-w-[250px] max-w-[300px]"> {form.digitalSignature || ''}</div>
                            <p className="text-[8pt] font-bold text-slate-600 uppercase tracking-widest mt-2">AUTHORIZED DIGITAL SIGNATURE</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[11pt] font-bold text-black border-b-[1pt] border-black min-w-[120px] text-right">{formatDate(form.date)}</span>
                            <p className="text-[8pt] font-bold text-slate-600 uppercase tracking-widest mt-2">DOCUMENT DATE</p>
                        </div>
                    </div>
                </div>
            </form>

            {/* Print Footer Template */}
            <div className="hidden print:block print-footer relative print:mt-1 mt-3 pt-2 print:pb-0 pb-1 overflow-hidden">
                <div className="px-6 flex justify-between items-start relative z-10">
                    <div className="flex-1">
                        <h4 className="text-[15pt] font-signature text-[#b48a3c] mb-2 leading-none">Thank You!</h4>
                        <p className="text-[8pt] font-bold text-[#555] mb-9 max-w-[450px]">Your valuable feedback will help us improve and create better experiences for you in the future.</p>
                    </div>

                    {/* <div className="opacity-10 absolute -bottom-4 right-6 pointer-events-none">
                        <svg viewBox="0 0 100 100" className="w-[120px] h-[120px]">
                            <path d="M50 90 C75 75 85 50 85 35 C85 20 70 10 50 25 C30 10 15 20 15 35 C15 50 25 75 50 90" fill="#0072bc" />
                            <path d="M50 80 C65 65 75 45 75 35 C75 25 65 15 50 30 C35 15 25 25 25 35 C25 45 35 65 50 80" fill="#8bc34a" />
                        </svg>
                    </div> */}
                </div>

                <div className="absolute bottom-0 left-0 w-full">
                    <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="w-full h-[15px] block">
                        <path d="M0,20 L0,10 Q200,-5 500,5 T1000,10 L1000,20 Z" fill="#002b49" />
                        <path d="M0,9 Q200,-6 500,4 T1000,9" fill="none" stroke="#b48a3c" strokeWidth="2" />
                    </svg>
                    <div className="h-[25px] bg-[#002b49] text-white flex items-center justify-center gap-3 w-full">
                        <div className="w-1 h-1 bg-[#b48a3c] rounded-full" />
                        <p className="text-[7pt] font-black uppercase tracking-[0.2em]">One Platform. Endless <span className="text-[#b48a3c]">Global Opportunities.</span></p>
                        <div className="w-1 h-1 bg-[#b48a3c] rounded-full" />
                    </div>
                </div>
            </div>

            {/* New Image Footer for Print */}
            {/* <div className="hidden print:block w-full print-footer h-[5px]">
                <img loading="lazy" decoding="async" src="/feedbackform_fooder.webp"
                    className="w-full h-auto block"
                    alt="IHWE Footer"
                />
            </div> */}


            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
                .font-signature { font-family: 'Dancing+Script', cursive !important; }
                @media print {
                    @page { size: A4; margin: 0; }
                    body { margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    html, body { 
                        background: white !important;
                    font-family: Arial, sans-serif !important;
                        width: 210mm !important;
                        height: 297mm !important;
                        margin: 0 !important; 
                        padding: 0 !important; 
                        overflow: hidden !important;
                        background: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    main, #root, #root > div { 
                        padding: 0 !important; 
                        margin: 0 !important; 
                        width: 100% !important; 
                    }
                    .flex { display: flex !important; }
                    img { width: 100% !important; height: auto !important; display: block !important; }
                    * { border-color: transparent !important; }
                    form { padding: 0 !important; margin: 0 !important; width: 100% !important; }
                    
                    /* Custom Print Layout Adjustments */
                    .bg-white { background-color: white !important; }
                    .print\\:hidden { display: none !important; }
                    h2 { font-weight: bold !important; text-align: left !important; }
                    h3 { border: none !important; color: black !important; margin: 0 !important; padding: 0 !important; font-size: 10pt !important; }
                    .grid { display: grid !important; }
                    .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl { box-shadow: none !important; }
                    .icons { display: none !important; }
                    .star-row span { color: #000 !important; font-size: 12pt !important; }
                    
                    /* Tighten spacing to fit on one page without scale */
                    .space-y-4 { margin-top: 0 !important; }
                    .mb-5 { margin-bottom: 0.2mm !important; }
                    .p-4 { padding: 0.2mm 5mm !important; }
                    .rounded-xl, .rounded-lg { border-radius: 0 !important; }
                    
                    /* Shrink font sizes to fit data */
                    h2 { font-size: 16pt !important; }
                    h3 { font-size: 8.5pt !important; margin: 0 !important; }
                    .text-\[9pt\] { font-size: 8pt !important; }
                    .text-\[8pt\] { font-size: 7.5pt !important; }
                    .text-black { color: black !important; }
                    span, p, label { font-size: 8pt !important; line-height: 1.1 !important; }
                    .star-row span { font-size: 10pt !important; }
                    
                    /* Background Colors in Print */
                    .bg-\\[\\#002b49\\] { background-color: #002b49 !important; }
                    .text-white { color: white !important; }
                    .text-\\[\\#b48a3c\\] { color: #b48a3c !important; }
                    
                    /* Pinned Footer */
                    .print-footer {
                        position: absolute !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding-bottom: 0 !important;
                        background-color: #f1f7fd !important;
                        min-height: 80px !important;
                    }
                }
            `}} />
        </motion.div>
    );
}
