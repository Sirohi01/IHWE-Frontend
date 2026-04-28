import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
    Star, 
    User, 
    Home, 
    Users, 
    LifeBuoy, 
    Megaphone, 
    PieChart, 
    Lightbulb, 
    Video, 
    FileText, 
    Calendar,
    Target,
    MessageCircle,
    ExternalLink,
    TrendingUp,
    ArrowRight,
    ChevronDown,
    Check,
    X,
    Printer,
    PenTool,
    ShieldCheck,
    Settings,
    Gem,
    AlertCircle,
    ClipboardCheck,
    Building,
    MapPin,
    Smile,
    Award
} from "lucide-react";
import Swal from 'sweetalert2';
import { cn } from "@/lib/utils";

// ── Components ──────────────────────────────────────────────────────────────────

const StarRating = ({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) => {
    return (
        <div className="flex flex-col gap-0.5 min-w-[120px] print:min-w-0 text-left print:flex-row print:items-start print:gap-2 print:py-0.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight print:text-[8.5pt] print:text-slate-500 print:normal-case print:font-bold mb-0.5 print:mb-0 print:w-36">{label}:</span>
            <div className="flex gap-1 star-row print:gap-0.5 items-center">
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
                        <span className="hidden print:inline text-[13pt] leading-none" style={{ color: star <= value ? "#000" : "#ddd" }}>
                            {star <= value ? '★' : '☆'}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const FeedbackSection = ({ title, icon: Icon, children, id }: { title: string, icon: any, children: React.ReactNode, id: string }) => (
    <div id={id} className="bg-white rounded-xl border border-slate-200 shadow-sm mb-5 scroll-mt-24 print:border-none print:shadow-none print:mb-2 text-left relative overflow-visible print:bg-transparent">
        <div className="bg-slate-50/80 px-4 py-2 border-b border-slate-200 flex items-center gap-2.5 print:bg-transparent print:border-b-[0.5pt] print:border-slate-300 print:py-1 print:px-0 rounded-t-xl print:rounded-none mb-1.5 print:mb-1">
            <div className="bg-white p-1 rounded-md shadow-sm border border-slate-100 print:hidden text-[#23471d]">
                <Icon size={14} />
            </div>
            <h3 className="text-[12px] font-black text-[#23471d] uppercase tracking-wide print:text-[10pt] print:text-black print:font-bold">
                {title}
            </h3>
        </div>
        <div className="p-4 print:p-0 print:pt-0">
            {children}
        </div>
    </div>
);

const RadioOption = ({ label, value, current, onChange, name }: { label: string, value: string, current: string, onChange: (v: any) => void, name: string }) => (
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
        "hidden print:flex items-start gap-2 py-0.5 border-none",
        fullWidth ? "col-span-2" : ""
    )}>
        <span className="text-[8.5pt] text-slate-500 min-w-[150px] shrink-0 font-bold leading-relaxed">{label}:</span>
        <span className="text-[9.5pt] text-slate-900 font-medium flex-1 break-words whitespace-normal leading-snug">{value || '-'}</span>
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
                {(value === 'Other' || value === 'Other Challenge') && onOtherChange && (
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
    placeholder = "Select multiple"
}: {
    label: string,
    options: string[],
    selected: string[],
    toggle: (v: string) => void,
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

    return (
        <>
            <div className="space-y-1 relative text-left print:hidden mb-4" ref={containerRef}>
                <label className="reg-label">{label}</label>
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
            <PrintField label={label} value={selected.join(", ")} />
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

export default function VisitorFeedbackForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        visitorId: "",
        companyName: "",
        designation: "",
        mobileNumber: "",
        emailId: "",
        city: "",
        state: "",
        country: "India",
        visitorType: "",
        
        overallExperience: "",
        eventUsefulness: "",
        visitAgain: "",
        
        registrationProcess: 0,
        entryManagement: 0,
        venueExperience: 0,
        supportTeam: 0,
        conferenceSessions: 0,
        productVariety: 0,
        exhibitorQuality: 0,
        networkingOpportunities: 0,
        
        relevantExhibitors: "",
        businessContacts: "",
        businessInterests: [] as string[],
        
        b2bMeetings: "Not Applicable",
        vipServices: "Not Applicable",
        travelSupport: "Not Applicable",
        
        challenge: "",
        otherChallenge: "",
        improvements: "",
        newSectors: "",
        
        updatesConsent: "",
        futureRoles: [] as string[],
        contactPermission: "",
        
        testimonialPermission: "",
        isDeclared: false,
        digitalSignature: "",
        date: new Date().toISOString().split('T')[0]
    });

    const handleRating = (key: string, val: number) => setForm(prev => ({ ...prev, [key]: val }));
    const handleValue = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));
    const toggleMulti = (key: 'businessInterests' | 'futureRoles', val: string) => {
        setForm(prev => ({
            ...prev,
            [key]: prev[key].includes(val) 
                ? prev[key].filter(i => i !== val)
                : [...prev[key], val]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.isDeclared) {
            Swal.fire({ icon: 'warning', title: 'Declaration Required', text: 'Please confirm the final declaration.', confirmButtonColor: '#23471d' });
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            Swal.fire({ icon: 'success', title: 'Feedback Submitted', text: 'Thank you for your valuable feedback!', confirmButtonColor: '#23471d' });
        }, 1500);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4 print:space-y-0 text-left">
            
            {/* Top Bar / Print Header */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm print:shadow-none print:border-none print:p-0 print:mb-6 print:text-center print:border-b-2 print:border-black print:pb-4">
                <div className="print:w-full">
                    <h2 className="text-[22px] font-black text-slate-900 uppercase tracking-tight mb-1 print:text-[22pt] print:mb-1 print:font-bold">VISITOR FEEDBACK REPORT</h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest print:text-[11pt] print:text-slate-700 print:tracking-normal print:font-semibold">International Health & Wellness Expo 2026</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 print:hidden">
                    <button type="button" onClick={() => window.print()} className="h-11 px-6 bg-[#23471d] hover:bg-[#1a3516] text-white rounded-sm flex items-center gap-2.5 transition-all shadow-md">
                        <Printer size={18} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Download Report</span>
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="print:space-y-0 text-left">
                
                {/* SECTION 1 */}
                <FeedbackSection id="section-1" title="Section 1 – Visitor Basic Details" icon={User}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:grid-cols-2 print:gap-x-12 print:gap-y-0.5">
                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Full Name</label>
                            <input value={form.fullName} onChange={e => handleValue('fullName', e.target.value)} className="reg-input h-10 text-[13px] outline-none" />
                        </div>
                        <PrintField label="Full Name" value={form.fullName} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Visitor ID</label>
                            <input value={form.visitorId} onChange={e => handleValue('visitorId', e.target.value)} className="reg-input h-10 text-[13px] uppercase outline-none" />
                        </div>
                        <PrintField label="Visitor ID" value={form.visitorId} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Company / Organization</label>
                            <input value={form.companyName} onChange={e => handleValue('companyName', e.target.value)} className="reg-input h-10 text-[13px] outline-none" />
                        </div>
                        <PrintField label="Organization" value={form.companyName} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Designation</label>
                            <input value={form.designation} onChange={e => handleValue('designation', e.target.value)} className="reg-input h-10 text-[13px] outline-none" />
                        </div>
                        <PrintField label="Designation" value={form.designation} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Mobile Number</label>
                            <input value={form.mobileNumber} onChange={e => handleValue('mobileNumber', e.target.value)} className="reg-input h-10 text-[13px] outline-none" />
                        </div>
                        <PrintField label="Mobile Number" value={form.mobileNumber} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Email ID</label>
                            <input value={form.emailId} onChange={e => handleValue('emailId', e.target.value)} className="reg-input h-10 text-[13px] lowercase outline-none" />
                        </div>
                        <PrintField label="Email ID" value={form.emailId} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">City</label>
                            <input value={form.city} onChange={e => handleValue('city', e.target.value)} className="reg-input h-10 text-[13px]" />
                        </div>
                        <PrintField label="City" value={form.city} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">State</label>
                            <input value={form.state} onChange={e => handleValue('state', e.target.value)} className="reg-input h-10 text-[13px]" />
                        </div>
                        <PrintField label="State" value={form.state} />

                        <div className="space-y-1 lg:col-span-1 print:col-span-1">
                            <label className="reg-label print:hidden">Country</label>
                            <div className="flex items-center gap-3 print:hidden">
                                <div className="flex gap-2">
                                    <RadioOption name="country" label="India" value="India" current={form.country} onChange={v => handleValue('country', v)} />
                                    <RadioOption name="country" label="Other" value="Other" current={form.country} onChange={v => handleValue('country', v)} />
                                </div>
                            </div>
                            <PrintField label="Country" value={form.country} />
                        </div>

                        <DropdownWithOther 
                            label="Visitor Type" 
                            options={["General Visitor", "Business Visitor", "Corporate Visitor", "International Visitor", "Hosted Buyer", "Delegate", "VIP Visitor", "Government Visitor", "Investor"]} 
                            value={form.visitorType} 
                            onChange={v => handleValue('visitorType', v)} 
                        />
                    </div>
                </FeedbackSection>

                {/* SECTION 2 */}
                <FeedbackSection id="section-2" title="Section 2 – Visit Experience" icon={Smile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-1 print:gap-1 text-left">
                        <DropdownWithOther 
                            label="Overall experience?" 
                            options={["Excellent", "Very Good", "Good", "Average", "Poor"]} 
                            value={form.overallExperience} 
                            onChange={v => handleValue('overallExperience', v)} 
                        />
                        <DropdownWithOther 
                            label="Event usefulness?" 
                            options={["Extremely Useful", "Useful", "Average", "Slightly Useful", "Not Useful"]} 
                            value={form.eventUsefulness} 
                            onChange={v => handleValue('eventUsefulness', v)} 
                        />
                        <DropdownWithOther 
                            label="Visit again next year?" 
                            options={["Definitely Yes", "Probably Yes", "Maybe", "Probably No", "No"]} 
                            value={form.visitAgain} 
                            onChange={v => handleValue('visitAgain', v)} 
                        />
                    </div>
                </FeedbackSection>

                {/* SECTION 3 */}
                <FeedbackSection id="section-3" title="Section 3 – Event Quality Rating" icon={Star}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-12 print:grid-cols-2 print:gap-y-0.5 print:gap-x-12">
                        <StarRating label="Registration" value={form.registrationProcess} onChange={v => handleRating('registrationProcess', v)} />
                        <StarRating label="Entry Management" value={form.entryManagement} onChange={v => handleRating('entryManagement', v)} />
                        <StarRating label="Venue Experience" value={form.venueExperience} onChange={v => handleRating('venueExperience', v)} />
                        <StarRating label="Support Team" value={form.supportTeam} onChange={v => handleRating('supportTeam', v)} />
                        <StarRating label="Sessions" value={form.conferenceSessions} onChange={v => handleRating('conferenceSessions', v)} />
                        <StarRating label="Product Variety" value={form.productVariety} onChange={v => handleRating('productVariety', v)} />
                        <StarRating label="Exhibitor Quality" value={form.exhibitorQuality} onChange={v => handleRating('exhibitorQuality', v)} />
                        <StarRating label="Networking" value={form.networkingOpportunities} onChange={v => handleRating('networkingOpportunities', v)} />
                    </div>
                </FeedbackSection>

                {/* SECTION 4 & 5 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4 print:grid-cols-1">
                    <FeedbackSection id="section-4" title="Section 4 – Business Outcome" icon={PieChart}>
                        <DropdownWithOther 
                            label="Found relevant exhibitors?" 
                            options={["Yes – Highly Relevant", "Yes – Somewhat Relevant", "Limited Relevance", "No"]} 
                            value={form.relevantExhibitors} 
                            onChange={v => handleValue('relevantExhibitors', v)} 
                        />
                        <DropdownWithOther 
                            label="Business Contacts Made" 
                            options={["1–5", "5–10", "10–20", "20+"]} 
                            value={form.businessContacts} 
                            onChange={v => handleValue('businessContacts', v)} 
                        />
                        <MultiSelectDropdown 
                            label="Interested in" 
                            options={["Future Business Meetings", "Distributor Opportunities", "Franchise Opportunities", "Investment Opportunities", "Hospital Procurement", "International Partnerships", "Product Sourcing", "Knowledge Sessions"]} 
                            selected={form.businessInterests}
                            toggle={v => toggleMulti('businessInterests', v)}
                        />
                    </FeedbackSection>

                    <FeedbackSection id="section-5" title="Section 5 – VIP Experience" icon={Gem}>
                        <div className="space-y-1">
                            <DropdownWithOther 
                                label="Rate B2B Meetings" 
                                options={["Excellent", "Good", "Average", "Poor", "Not Applicable"]} 
                                value={form.b2bMeetings} 
                                onChange={v => handleValue('b2bMeetings', v)} 
                            />
                            <DropdownWithOther 
                                label="Rate VIP Services" 
                                options={["Excellent", "Good", "Average", "Poor", "Not Applicable"]} 
                                value={form.vipServices} 
                                onChange={v => handleValue('vipServices', v)} 
                            />
                            <DropdownWithOther 
                                label="Hotel / Travel Support" 
                                options={["Excellent", "Good", "Average", "Poor", "Not Applicable"]} 
                                value={form.travelSupport} 
                                onChange={v => handleValue('travelSupport', v)} 
                            />
                        </div>
                    </FeedbackSection>
                </div>

                {/* SECTION 6 & 7 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4 print:grid-cols-1">
                    <FeedbackSection id="section-6" title="Section 6 – Improvements" icon={AlertCircle}>
                        <DropdownWithOther 
                            label="Biggest Challenge" 
                            options={["Registration Delay", "Entry Queue", "Navigation Difficulty", "Low Quality Exhibitors", "Limited Business Opportunities", "Conference Management", "Networking Support", "Travel Support", "Other Challenge"]} 
                            value={form.challenge} 
                            onChange={v => handleValue('challenge', v)} 
                            otherValue={form.otherChallenge}
                            onOtherChange={v => handleValue('otherChallenge', v)}
                        />
                         <div className="space-y-1">
                            <label className="reg-label print:hidden">Explain challenge briefly</label>
                            <textarea value={form.improvements} onChange={e => handleValue('improvements', e.target.value)} className="reg-input min-h-[50px] pt-3 print:hidden focus:ring-0 outline-none resize-none" placeholder="Details..." />
                            <PrintField label="Challenge Details" value={form.improvements} />
                        </div>
                    </FeedbackSection>

                    <FeedbackSection id="section-7" title="Section 7 – Suggestions" icon={Lightbulb}>
                        <div className="space-y-1 mb-4">
                            <label className="reg-label print:hidden">Improvements for next year?</label>
                            <textarea value={form.improvements} onChange={e => handleValue('improvements', e.target.value)} className="reg-input min-h-[50px] pt-3 print:hidden focus:ring-0 outline-none resize-none" placeholder="Your ideas..." />
                            <PrintField label="Improvements" value={form.improvements} />
                        </div>
                        <div className="space-y-1">
                            <label className="reg-label print:hidden">New sectors to add?</label>
                            <textarea value={form.newSectors} onChange={e => handleValue('newSectors', e.target.value)} className="reg-input min-h-[50px] pt-3 print:hidden focus:ring-0 outline-none resize-none" placeholder="Sectors..." />
                            <PrintField label="New Sectors" value={form.newSectors} />
                        </div>
                    </FeedbackSection>
                </div>

                {/* SECTION 8 & 9 */}
                <FeedbackSection id="section-8" title="Section 8 & 9 – Engagement & Media" icon={Award}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-1">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="reg-label uppercase mb-2">Updates for next edition?</p>
                                <div className="flex gap-4 print:hidden">
                                    <RadioOption name="update" label="Yes" value="Yes" current={form.updatesConsent} onChange={v => handleValue('updatesConsent', v)} />
                                    <RadioOption name="update" label="No" value="No" current={form.updatesConsent} onChange={v => handleValue('updatesConsent', v)} />
                                </div>
                                <PrintField label="Update Consent" value={form.updatesConsent} />
                            </div>
                            <MultiSelectDropdown 
                                label="Interested in becoming" 
                                options={["Exhibitor", "Sponsor", "Hosted Buyer", "Speaker", "Delegate", "Partner", "Investor", "Media Partner"]} 
                                selected={form.futureRoles}
                                toggle={v => toggleMulti('futureRoles', v)}
                            />
                            <div className="space-y-1">
                                <p className="reg-label uppercase mb-2">Team contact you?</p>
                                <div className="flex gap-4 print:hidden">
                                    <RadioOption name="contact" label="Yes" value="Yes" current={form.contactPermission} onChange={v => handleValue('contactPermission', v)} />
                                    <RadioOption name="contact" label="No" value="No" current={form.contactPermission} onChange={v => handleValue('contactPermission', v)} />
                                </div>
                                <PrintField label="Contact Permission" value={form.contactPermission} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="reg-label uppercase mb-2">Use as Testimonial?</p>
                                <div className="flex gap-4 print:hidden">
                                    <RadioOption name="testPerm" label="Yes" value="Yes" current={form.testimonialPermission} onChange={v => handleValue('testimonialPermission', v)} />
                                    <RadioOption name="testPerm" label="No" value="No" current={form.testimonialPermission} onChange={v => handleValue('testimonialPermission', v)} />
                                </div>
                                <PrintField label="Testimonial Consent" value={form.testimonialPermission} />
                            </div>
                            <div className="flex flex-col gap-2 pt-2">
                                <FileInputButton id="up-test-written" label="Written Testimonial" icon={FileText} />
                                <FileInputButton id="up-test-video" label="Video Testimonial" icon={Video} />
                            </div>
                        </div>
                    </div>
                </FeedbackSection>

                {/* FINAL SECTION */}
                <div className="bg-white border-2 border-[#23471d]/5 rounded-2xl p-6 flex flex-col gap-6 mb-12 shadow-lg print:shadow-none print:border-none print:p-0 print:mb-0 print:mt-4">
                    <div className="flex items-start gap-4">
                        <input 
                            type="checkbox" 
                            id="f-dec" 
                            checked={form.isDeclared} 
                            onChange={e => setForm(f => ({ ...f, isDeclared: e.target.checked }))} 
                            className="mt-1 w-5.5 h-5.5 border-[#23471d] accent-[#23471d] print:hidden focus:ring-0 cursor-pointer" 
                        />
                        <label htmlFor="f-dec" className="text-[13px] font-bold text-slate-700 cursor-pointer flex-1 italic leading-relaxed print:text-[11pt] print:text-black">
                            "I confirm that the feedback provided above is true and based on my experience at the Expo."
                        </label>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-8 border-t border-slate-50 pt-8 print:border-none print:pt-4">
                        <div className="flex-1 min-w-[250px] flex items-center gap-5">
                            <div className="flex-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest print:text-[9.5pt] print:text-slate-600 print:mb-1">Visitor Digital Signature</p>
                                <div className="flex flex-col gap-2">
                                    <input className="bg-transparent border-b-2 border-slate-100 w-full text-[20px] font-signature italic outline-none focus:border-[#23471d] h-11 print:hidden" placeholder="Type Digital Signature" value={form.digitalSignature} onChange={e => handleValue('digitalSignature', e.target.value)} />
                                    <FileInputButton id="up-signature" label="Upload Signature" icon={PenTool} />
                                </div>
                                <div className="hidden print:block text-[18pt] font-signature border-b-2 border-black min-w-[300px] py-1"> {form.digitalSignature || '________________'}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 min-w-[120px] text-right print:text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest print:text-[9.5pt] print:text-slate-600">Document Date</p>
                            <span className="text-[14px] font-bold text-slate-700 print:text-[12pt] print:text-black">{form.date}</span>
                        </div>
                        <div className="print:hidden">
                            <button type="submit" className="h-12 px-14 bg-[#23471d] hover:bg-[#1a3516] text-white text-[12px] font-black uppercase tracking-widest rounded shadow-xl flex items-center gap-2.5 transition-all active:scale-95">
                                Submit Feedback <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

            </form>

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
                .font-signature { font-family: 'Dancing+Script', cursive !important; }
                @media print {
                    @page { size: A4; margin: 0mm; }
                    body { padding: 10mm; }
                    html, body { 
                        background: white !important; 
                        font-family: Arial, sans-serif !important;
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                    }
                    * { border-color: transparent !important; }
                    .max-w-6xl, #root, .w-full, form, div { background: transparent !important; }
                    .max-w-6xl { max-width: 100% !important; padding: 0 !important; }
                    h2 { color: black !important; font-weight: bold !important; text-align: center !important; }
                    h3 { border-bottom: 0.5pt solid #ccc !important; width: 100% !important; padding-bottom: 2pt !important; margin-bottom: 4pt !important; color: black !important; }
                    .grid { display: grid !important; }
                    .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl { box-shadow: none !important; }
                    .print\\:hidden, .icons { display: none !important; }
                }
            `}} />
        </motion.div>
    );
}
