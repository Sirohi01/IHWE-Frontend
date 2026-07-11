import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
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
    PenTool
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Swal from 'sweetalert2';
import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/api";

// ── Components ──────────────────────────────────────────────────────────────────

const StarRating = ({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) => {
    return (
        <div className="flex flex-col gap-0.5 min-w-[120px] print:min-w-0 text-left print:flex-row print:items-start print:gap-2 print:py-0.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight print:text-[8.5pt] print:text-slate-500 print:normal-case print:font-bold leading-tight mb-0.5 print:mb-0 print:w-36">{label}:</span>
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

const FeedbackSection = ({ step, title, icon: Icon, children, id, className }: { step?: string, title: string, icon: any, children: React.ReactNode, id: string, className?: string }) => (
    <div id={id} className={cn("bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-left relative overflow-visible print:border-none print:shadow-none print:mb-2 print:bg-transparent flex flex-col print:break-inside-avoid print:p-0", className)}>
        <div className="flex items-center gap-3 mb-4 print:border-b-[1pt] print:border-black print:pb-1 print:mb-1.5">
            {step && (
                <div className="bg-[#23471d] text-white text-[13px] font-bold px-2 py-1 rounded print:hidden">
                    {step}
                </div>
            )}
            <div className="text-[#23471d] print:hidden">
                <Icon size={20} strokeWidth={2.5} />
            </div>
            <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-wide print:text-[11pt] print:text-black">
                {title}
            </h3>
        </div>
        <div className="print:p-0 flex-1">
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
        "hidden print:flex items-end gap-2 py-0.5 border-b-[0.5pt] border-slate-300",
        fullWidth ? "col-span-2" : ""
    )}>
        <span className="text-[8pt] text-slate-500 min-w-[140px] shrink-0 font-bold uppercase leading-tight">{label}:</span>
        <span className="text-[9pt] text-black font-semibold flex-1 pb-0.5 leading-tight">{value || '-'}</span>
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
        <div className="print:hidden text-left h-full flex flex-col justify-between gap-1">
            <label className="reg-label">{label}</label>
            <div className="flex flex-col gap-1.5 relative">
                <div className="relative flex-1">
                    <select
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        className="reg-input h-8 text-[12px] appearance-none pr-8 cursor-pointer focus:ring-0 focus:border-[#23471d]"
                    >
                        <option value="">{placeholder}</option>
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                {value === 'Other' && onOtherChange && (
                    <input
                        placeholder="Specify..."
                        className="reg-input h-8 text-[12px] border-[#23471d] focus:ring-0 outline-none"
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
            <div className="space-y-1 relative text-left print:hidden" ref={containerRef}>
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
                            className="reg-input h-8 text-[12px] border-[#23471d] focus:ring-0 outline-none"
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

const FileInputButton = ({ id, label, icon: Icon, onChange, isUploaded, isUploading, accept, subLabel }: { id: string, label: string, icon: any, onChange?: (e: any) => void, isUploaded?: boolean, isUploading?: boolean, accept?: string, subLabel?: string }) => (
    <div className="flex-1 print:hidden w-full">
        <input type="file" id={id} className="hidden" onChange={onChange} accept={accept} disabled={isUploading} />
        <label htmlFor={id} className={cn(
            "flex flex-col items-center justify-center gap-1 py-2 px-4 border border-slate-200 bg-slate-50 rounded-xl transition-all",
            isUploading ? "opacity-70 cursor-not-allowed" :
                isUploaded ? "border-emerald-500 bg-emerald-50 text-emerald-700 cursor-pointer" :
                    "text-slate-600 cursor-pointer hover:bg-slate-100 hover:border-slate-300"
        )}>
            <div className="flex items-center justify-center gap-2 w-full">
                <Icon size={20} className={isUploaded ? "text-emerald-500" : "text-[#23471d]"} />
                <div className="text-left">
                    <p className="font-bold text-[13px] text-slate-800">{isUploading ? "Uploading..." : isUploaded ? "File Uploaded ✓" : label}</p>
                    {subLabel && <p className="text-[11px] text-slate-500 font-medium">{subLabel}</p>}
                </div>
            </div>
        </label>
    </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ExhibitorFeedbackForm() {
    const { data: ctxData } = useExhibitorCtx();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);
    const [submittedFeedback, setSubmittedFeedback] = useState<any>(null);
    const [uploading, setUploading] = useState<Record<string, boolean>>({});

    const [form, setForm] = useState({
        exhibitorName: "",
        companyName: "",
        stallNumber: "",
        hallNumber: "",
        productCategory: "",
        contactPerson: "",
        mobileNumber: "",
        emailId: "",
        country: "India",
        overallRating: "",
        participateAgain: "",
        stallLocation: 0,
        stallConstruction: 0,
        venueFacilities: 0,
        housekeeping: 0,
        electricitySupport: 0,
        securityArrangements: 0,
        visitorFootfall: "",
        visitorQuality: "",
        buyerMeetings: "",
        seriousLeads: "",
        preEventComm: 0,
        registrationProcess: 0,
        paymentSupport: 0,
        onsiteCoordination: 0,
        problemResolution: 0,
        rmSupport: 0,
        helpDeskService: 0,
        marketingSupport: 0,
        postEventComm: 0,
        brandingEffectiveness: "",
        meetExpectations: "",
        estimatedBusiness: "",
        interestNextEdition: "",
        improvements: "",
        specialSuggestions: "",
        testimonialPermission: "No",
        testimonialFile: "",
        videoFeedbackFile: "",
        isDeclared: false,
        digitalSignature: "",
        digitalSignatureFile: "",
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (ctxData) {
            setForm(prev => ({
                ...prev,
                exhibitorName: ctxData.exhibitorName || "",
                companyName: ctxData.companyName || "",
                stallNumber: ctxData.participation?.stallFor || "",
                contactPerson: `${ctxData.contact1?.firstName || ''} ${ctxData.contact1?.lastName || ''}`.trim(),
                mobileNumber: ctxData.contact1?.mobile || "",
                emailId: ctxData.contact1?.email || "",
                country: ctxData.country || "India",
                productCategory: ctxData.primaryCategory || ctxData.industrySector || ""
            }));
        }
    }, [ctxData]);

    const getRegParam = () => {
        const selectedRegId = localStorage.getItem('selectedRegId');
        return selectedRegId ? `?regId=${selectedRegId}` : '';
    };

    const loadExistingFeedback = async () => {
        setIsLoadingFeedback(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const response = await fetch(`${API_URL}/exhibitor-feedback/my${getRegParam()}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();
            if (result.success && result.data) {
                setSubmittedFeedback(result.data);
                if (result.data.responses) {
                    setForm(prev => ({ ...prev, ...result.data.responses }));
                }
                localStorage.setItem('feedback_submitted', 'true');
            } else {
                setSubmittedFeedback(null);
            }
        } catch (error) {
            console.error('[Feedback] Failed to load feedback', error);
        } finally {
            setIsLoadingFeedback(false);
        }
    };

    useEffect(() => {
        loadExistingFeedback();
    }, []);

    const handleRating = (key: string, val: number) => setForm(prev => ({ ...prev, [key]: val }));
    const handleValue = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(prev => ({ ...prev, [key]: true }));
        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/exhibitor-feedback/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setForm(prev => ({ ...prev, [key]: data.url }));
                Swal.fire({ icon: 'success', title: 'Uploaded', text: 'File uploaded successfully', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
            } else {
                throw new Error(data.message || 'Failed to upload');
            }
        } catch (error: any) {
            Swal.fire({ icon: 'error', title: 'Upload Failed', text: error.message, confirmButtonColor: '#23471d' });
        } finally {
            setUploading(prev => ({ ...prev, [key]: false }));
            // clear input
            e.target.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submittedFeedback) {
            Swal.fire({ icon: 'info', title: 'Already Submitted', text: 'Your feedback has already been recorded.', confirmButtonColor: '#23471d' });
            return;
        }
        let currentForm = { ...form };
        if (!currentForm.isDeclared) {
            const result = await Swal.fire({
                title: 'Action Required',
                text: 'Please confirm that the feedback provided is true and based on your business experience.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#23471d',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I confirm'
            });

            if (result.isConfirmed) {
                setForm(f => ({ ...f, isDeclared: true }));
                currentForm.isDeclared = true;
            } else {
                return;
            }
        }
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const selectedRegId = localStorage.getItem('selectedRegId');
            const response = await fetch(`${API_URL}/exhibitor-feedback/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...currentForm,
                    ...(selectedRegId && { regId: selectedRegId })
                })
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Feedback submission failed');
            }
            setSubmittedFeedback(result.data);
            localStorage.setItem('feedback_submitted', 'true');
            Swal.fire({ icon: 'success', title: 'Feedback Recorded', text: 'Thank you for your valuable feedback!', confirmButtonColor: '#23471d' });
        } catch (error: any) {
            const alreadySubmitted = error.message === 'Feedback already submitted';
            if (alreadySubmitted) {
                await loadExistingFeedback();
            }
            Swal.fire({
                icon: alreadySubmitted ? 'info' : 'error',
                title: alreadySubmitted ? 'Already Submitted' : 'Submission Failed',
                text: alreadySubmitted ? 'Your feedback has already been recorded.' : error.message,
                confirmButtonColor: '#23471d'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = Math.round((Object.values(form).filter(v => v !== "" && v !== 0 && v !== false).length / Object.keys(form).length) * 100);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full px-8 space-y-2 print:space-y-0 text-left print:px-0 mt-1">

            {/* Top Bar / Print Header */}
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-2 flex flex-col md:flex-row print:flex-row items-center justify-between gap-4 shadow-sm print:shadow-none print:border-none print:p-0 print:mb-4 print:border-b-[1pt] print:border-black print:pb-2">

                {/* Left: Logo & Main Title */}
                <div className="flex items-center gap-3 flex-1">
                    <img src="/ihwe_logo.png" alt="IHWE" className="w-8 h-8 object-contain print:w-8 print:h-8" onError={(e) => e.currentTarget.style.display = 'none'} />
                    <h2 className="text-[18px] md:text-[22px] font-medium text-slate-900 uppercase tracking-tight print:text-[18pt] print:tracking-widest">EXHIBITOR FEEDBACK REPORT</h2>
                </div>

                {/* Center: Subtitle & Status */}
                <div className="text-center flex-1 print:hidden">
                    <p className="text-[13px] text-slate-500 font-medium">Your feedback helps us build a better experience</p>
                    {isLoadingFeedback && (
                        <p className="mt-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest print:hidden">Checking submission status...</p>
                    )}
                    {!isLoadingFeedback && submittedFeedback && (
                        <p className="mt-1 text-[11px] font-black text-[#23471d] uppercase tracking-widest print:hidden">
                            Feedback already submitted on {new Date(submittedFeedback.createdAt).toLocaleDateString()}
                        </p>
                    )}
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center justify-end gap-3 print:hidden flex-1">
                    <button type="button" onClick={() => window.print()} className="h-8 px-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center gap-2 transition-all font-bold text-[11px] uppercase tracking-wide">
                        <Printer size={14} /> Print Copy
                    </button>
                </div>
            </div>

            {/* Google Review Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4 shadow-sm print:hidden">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                    </div>
                    <div>
                        <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-tight mb-1">Write a Review on Google</h3>
                        <p className="text-[12px] text-slate-500 font-medium">Enjoyed your experience? Please share your feedback on Google!</p>
                    </div>
                </div>
                <a href="https://g.page/r/CWvrp1X7bjTDEBM/review" target="_blank" rel="noopener noreferrer" className="h-10 px-6 bg-white border border-slate-200 text-[#23471d] font-bold text-[11px] uppercase tracking-widest rounded-lg shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                    Google Review Link <ExternalLink size={14} />
                </a>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 print:gap-0">
                <FeedbackSection id="section-1" step="01" title="BASIC DETAILS" icon={User}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:grid-cols-2 print:gap-x-12 print:gap-y-0.5">
                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Full Name</label>
                            <input readOnly value={form.contactPerson} className="reg-input bg-slate-50 h-8 text-[12px] focus:ring-0 outline-none w-full" />
                        </div>
                        <PrintField label="Contact Person" value={form.contactPerson} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Company Name</label>
                            <input readOnly value={form.exhibitorName || form.companyName} className="reg-input bg-slate-50 h-8 text-[12px] focus:ring-0 outline-none w-full" />
                        </div>
                        <PrintField label="Company Name" value={form.exhibitorName || form.companyName} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Stall Number</label>
                            <input value={form.stallNumber} onChange={e => handleValue('stallNumber', e.target.value)} className="reg-input h-8 text-[12px] focus:ring-0 outline-none w-full" />
                        </div>
                        <PrintField label="Stall Number" value={form.stallNumber} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Hall Number</label>
                            <input value={form.hallNumber} onChange={e => handleValue('hallNumber', e.target.value)} className="reg-input h-8 text-[12px] focus:ring-0 outline-none w-full" />
                        </div>
                        <PrintField label="Hall Number" value={form.hallNumber} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Product Category</label>
                            <input value={form.productCategory} onChange={e => handleValue('productCategory', e.target.value)} className="reg-input h-8 text-[12px] focus:ring-0 outline-none w-full" />
                        </div>
                        <PrintField label="Product Category" value={form.productCategory} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Mobile Number</label>
                            <input value={form.mobileNumber} onChange={e => handleValue('mobileNumber', e.target.value)} className="reg-input h-8 text-[12px] focus:ring-0 outline-none w-full" />
                        </div>
                        <PrintField label="Mobile Number" value={form.mobileNumber} />

                        <div className="space-y-1 print:hidden">
                            <label className="reg-label">Email ID</label>
                            <input value={form.emailId} onChange={e => handleValue('emailId', e.target.value)} className="reg-input h-8 text-[12px] lowercase focus:ring-0 outline-none w-full" />
                        </div>
                        <PrintField label="Email ID" value={form.emailId} />

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
                    </div>
                </FeedbackSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    <FeedbackSection id="section-2" step="02" title="OVERALL EXPERIENCE" className="!mb-0" icon={Star}>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 print:grid-cols-2 print:gap-x-12 print:gap-y-0.5">
                            <DropdownWithOther label="Overall experience at the Expo?" options={["Excellent", "Very Good", "Good", "Average", "Poor"]} value={form.overallRating} onChange={v => handleValue('overallRating', v)} />
                            <DropdownWithOther label="Participate again next year?" options={["Definitely Yes", "Probably Yes", "Maybe", "Probably No", "Definitely No"]} value={form.participateAgain} onChange={v => handleValue('participateAgain', v)} />
                        </div>
                    </FeedbackSection>

                    <FeedbackSection id="section-3" step="03" title="STALL & VENUE EXPERIENCE" className="!mb-0" icon={Home}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-4 print:grid-cols-3 print:gap-y-0.5 print:gap-x-8">
                            <StarRating label="Stall Location" value={form.stallLocation} onChange={v => handleRating('stallLocation', v)} />
                            <StarRating label="Stall Construction" value={form.stallConstruction} onChange={v => handleRating('stallConstruction', v)} />
                            <StarRating label="Venue Facilities" value={form.venueFacilities} onChange={v => handleRating('venueFacilities', v)} />
                            <StarRating label="Housekeeping" value={form.housekeeping} onChange={v => handleRating('housekeeping', v)} />
                            <StarRating label="Electricity/Internet" value={form.electricitySupport} onChange={v => handleRating('electricitySupport', v)} />
                            <StarRating label="Security Arrangements" value={form.securityArrangements} onChange={v => handleRating('securityArrangements', v)} />
                        </div>
                    </FeedbackSection>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    <FeedbackSection id="section-4" step="04" title="VISITOR QUALITY" className="!mb-0" icon={Users}>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 print:grid-cols-1 print:gap-1 text-left">
                            <DropdownWithOther label="Visitor Footfall" options={["Excellent", "Good", "Average", "Low"]} value={form.visitorFootfall} onChange={v => handleValue('visitorFootfall', v)} />
                            <DropdownWithOther label="Visitor Quality" options={["Excellent", "Good", "Average", "Poor"]} value={form.visitorQuality} onChange={v => handleValue('visitorQuality', v)} />
                            <DropdownWithOther label="Buyer Meetings" options={["Very Useful", "Useful", "Average", "Not Useful"]} value={form.buyerMeetings} onChange={v => handleValue('buyerMeetings', v)} />
                            <DropdownWithOther label="Serious Business Leads" options={["1–10", "10–25", "25–50", "50+"]} value={form.seriousLeads} onChange={v => handleValue('seriousLeads', v)} />
                        </div>
                    </FeedbackSection>

                    <FeedbackSection id="section-5" step="05" title="ORGANIZER SUPPORT" className="!mb-0" icon={LifeBuoy}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-4 print:grid-cols-3 print:gap-y-3 print:gap-x-4">
                            <StarRating label="Pre-Event Communication" value={form.preEventComm} onChange={v => handleRating('preEventComm', v)} />
                            <StarRating label="Registration Process" value={form.registrationProcess} onChange={v => handleRating('registrationProcess', v)} />
                            <StarRating label="Payment Support" value={form.paymentSupport} onChange={v => handleRating('paymentSupport', v)} />
                            <StarRating label="Onsite Coordination" value={form.onsiteCoordination} onChange={v => handleRating('onsiteCoordination', v)} />
                            <StarRating label="Problem Resolution Speed" value={form.problemResolution} onChange={v => handleRating('problemResolution', v)} />
                            <StarRating label="Relationship Manager Support" value={form.rmSupport} onChange={v => handleRating('rmSupport', v)} />
                            <StarRating label="Help Desk Service" value={form.helpDeskService} onChange={v => handleRating('helpDeskService', v)} />
                            <StarRating label="Marketing Support" value={form.marketingSupport} onChange={v => handleRating('marketingSupport', v)} />
                            <StarRating label="Post-Event Communication" value={form.postEventComm} onChange={v => handleRating('postEventComm', v)} />
                        </div>
                    </FeedbackSection>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    <FeedbackSection id="section-6" step="06" title="SPONSORSHIP & BRANDING" className="!mb-0" icon={Megaphone}>
                        <div className="grid grid-cols-2 print:grid-cols-1">
                            <DropdownWithOther label="Did sponsorship / branding help your business visibility?" options={["Yes, Highly Effective", "Moderately Effective", "Slightly Effective", "Not Effective", "Not Applicable"]} value={form.brandingEffectiveness} onChange={v => handleValue('brandingEffectiveness', v)} />
                        </div>
                    </FeedbackSection>

                    <FeedbackSection id="section-7" step="07" title="ROI EVALUATION" className="!mb-0" icon={PieChart}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 print:grid-cols-1 print:gap-1">
                            <DropdownWithOther label="Business Expectations" options={["Exceeded Expectations", "Met Expectations", "Partially Met", "Did Not Meet"]} value={form.meetExpectations} onChange={v => handleValue('meetExpectations', v)} />
                            <DropdownWithOther label="Estimated Business Generated" options={["Below ₹1 Lakh", "₹1–5 Lakhs", "₹5–10 Lakhs", "₹10 Lakhs+", "Under Discussion"]} value={form.estimatedBusiness} onChange={v => handleValue('estimatedBusiness', v)} />
                            <DropdownWithOther label="Interested in sponsorship for next edition?" options={["Yes", "No", "Maybe"]} value={form.interestNextEdition} onChange={v => handleValue('interestNextEdition', v)} />
                        </div>
                    </FeedbackSection>
                </div>

                <FeedbackSection id="section-8" step="08" title="SUGGESTIONS & IMPROVEMENTS" icon={Lightbulb}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="reg-label print:hidden">Improvements for next edition?</label>
                            <textarea value={form.improvements} onChange={e => handleValue('improvements', e.target.value)} className="reg-input min-h-[50px] pt-3 print:hidden focus:ring-0 outline-none resize-none" placeholder="Your suggestions..." />
                            <PrintField label="Improvements" value={form.improvements} />
                        </div>
                        <div className="space-y-1">
                            <label className="reg-label print:hidden">Special Suggestions?</label>
                            <textarea value={form.specialSuggestions} onChange={e => handleValue('specialSuggestions', e.target.value)} className="reg-input min-h-[50px] pt-3 print:hidden focus:ring-0 outline-none resize-none" placeholder="Special suggestions..." />
                            <PrintField label="Suggestions" value={form.specialSuggestions} />
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-9" step="09" title="TESTIMONIAL PERMISSION" icon={Video}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div className="print:hidden flex items-center gap-4 h-full">
                            <p className="reg-label uppercase mb-0 whitespace-nowrap">Use as Testimonial?</p>
                            <div className="flex gap-4 flex-1">
                                <RadioOption name="testPerm" label="Yes" value="Yes" current={form.testimonialPermission} onChange={v => handleValue('testimonialPermission', v)} />
                                <RadioOption name="testPerm" label="No" value="No" current={form.testimonialPermission} onChange={v => handleValue('testimonialPermission', v)} />
                            </div>
                        </div>
                        <PrintField label="Testimonial Consent" value={form.testimonialPermission} />

                        <FileInputButton id="up-testimonial" label="Upload Testimonial" icon={FileText} accept=".pdf,.doc,.docx,.txt" onChange={(e) => handleFileUpload(e, 'testimonialFile')} isUploading={uploading['testimonialFile']} isUploaded={!!form.testimonialFile} />
                        <FileInputButton id="up-video" label="Upload Video Feedback" icon={Video} accept="video/*" onChange={(e) => handleFileUpload(e, 'videoFeedbackFile')} isUploading={uploading['videoFeedbackFile']} isUploaded={!!form.videoFeedbackFile} />
                    </div>
                </FeedbackSection>

                <div className="bg-white border-2 border-[#23471d]/5 rounded-2xl p-4 flex flex-col gap-3 mb-4 shadow-lg print:shadow-none print:border-none print:p-0 print:mb-0 print:mt-4 print:break-inside-avoid">
                    <div className="flex items-start gap-3"><input type="checkbox" id="f-dec" checked={form.isDeclared} onChange={e => setForm(f => ({ ...f, isDeclared: e.target.checked }))} className="mt-1 w-5.5 h-5.5 border-[#23471d] accent-[#23471d] print:hidden focus:ring-0 cursor-pointer" /><label htmlFor="f-dec" className="text-[13px] font-bold text-slate-700 cursor-pointer flex-1 italic leading-relaxed print:text-[11pt] print:text-black">"I confirm that the feedback provided above is true and based on my business experience."</label></div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-50 pt-4 print:border-none print:pt-4">
                        <div className="flex-1 min-w-[250px] flex items-center gap-4">
                            <div className="flex-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest print:text-[9.5pt] print:text-slate-600 print:mb-1">Authorized Digital Signature</p>
                                <div className="flex flex-col gap-2">
                                    {form.digitalSignatureFile ? (
                                        <div className="border-b-2 border-slate-100 py-1 print:border-black">
                                            <img src={`${API_URL.replace('/api', '')}${form.digitalSignatureFile}`} alt="Digital Signature" className="h-12 object-contain print:h-16 print:mb-1" crossOrigin="anonymous" />
                                        </div>
                                    ) : (
                                        <>
                                            <input className="bg-transparent border-b-2 border-slate-100 w-full text-[20px] font-signature italic outline-none focus:border-[#23471d] h-11 print:hidden" placeholder="Type Digital Signature" value={form.digitalSignature} onChange={e => handleValue('digitalSignature', e.target.value)} disabled={!!form.digitalSignatureFile} />
                                            <div className="hidden print:block text-[18pt] font-signature border-b-2 border-black min-w-[300px] py-1"> {form.digitalSignature || '________________'}</div>
                                        </>
                                    )}
                                    <div className="print:hidden">
                                        <FileInputButton id="up-signature" label={form.digitalSignatureFile ? "Change Signature" : "Upload Digital Signature"} icon={PenTool} accept="image/*" onChange={(e) => handleFileUpload(e, 'digitalSignatureFile')} isUploading={uploading['digitalSignatureFile']} isUploaded={!!form.digitalSignatureFile} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 min-w-[120px] text-right print:text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest print:text-[9.5pt] print:text-slate-600">Document Date</p><span className="text-[14px] font-bold text-slate-700 print:text-[12pt] print:text-black">{form.date}</span></div>
                        <div className="print:hidden"><button type="submit" disabled={isSubmitting || isLoadingFeedback || !!submittedFeedback} className="h-10 px-8 bg-[#23471d] hover:bg-[#1a3516] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-[12px] font-black uppercase tracking-widest rounded shadow-xl flex items-center gap-2.5 transition-all active:scale-95">{isSubmitting ? 'Submitting...' : submittedFeedback ? 'Feedback Submitted' : 'Submit Official Feedback'} <ArrowRight size={18} /></button></div>
                    </div>
                </div>
            </form>

            <style dangerouslySetInnerHTML={{
                __html: `
                .reg-input { border: 1px solid #e2e8f0; border-radius: 8px; padding-left: 12px; }
                .reg-label { font-size: 11px; font-weight: 700; color: #475569; padding-bottom: 4px; display: inline-block; }
                `
            }} />
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
                .font-signature { font-family: 'Dancing+Script', cursive !important; }
                @media print {
                    @page { size: A4; margin: 15mm; }
                    body { padding: 0; margin: 0; }
                    html, body { 
                        background: white !important; 
                        font-family: Arial, sans-serif !important;
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                    }
                    .max-w-6xl, #root, .w-full, form, div { background: transparent !important; }
                    .max-w-6xl { max-width: 100% !important; padding: 0 !important; }
                    h2 { color: black !important; font-weight: bold !important; text-align: center !important; }
                    h3 { color: black !important; margin: 0 !important; padding: 0 !important; border: none !important; }
                    .grid { display: grid !important; }
                    .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl { box-shadow: none !important; }
                    .print\\:hidden, .icons { display: none !important; }
                }
            `}} />
        </motion.div>
    );
}
