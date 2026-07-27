import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { IoStar } from "react-icons/io5";
import {
    Star,
    MessageCircle,
    Save,
    Send,
    CheckCircle2,
    Circle,
    Users,
    Handshake,
    Eye,
    Megaphone,
    Network,
    Mic,
    Rocket,
    Image as ImageIcon,
    Video,
    PenLine,
    ExternalLink,
    Upload,
    Gift,
    Headphones,
    Phone,
    Mail,
    MessagesSquare,
    MessagesSquareIcon,
    LucideMessagesSquare,
    Check
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { cn } from "@/lib/utils";
import { API_URL, socialMediaApi } from "@/lib/api";
import { PrintFeedbackReport } from "./PrintFeedbackReport";
import gift from "@/assets/exhibitor/gift.png"
import exhibor_feedback from "@/assets/exhibitor/exhibitor_feedback.png"
// ── Static Reference Data ──────────────────────────────────────────────────

const OVERALL_LABELS = ["Poor", "Average", "Good", "Very Good", "Excellent"];
const RECOMMEND_LABELS = ["Not Likely", "Unlikely", "Neutral", "Likely", "Strongly Recommend"];

const PARTICIPATE_OPTIONS = [
    { label: "Yes, Definitely", value: "Definitely Yes" },
    { label: "Maybe", value: "Maybe" },
    { label: "No", value: "Definitely No" },
];

const LEADS_OPTIONS = ["0 - 10", "10 - 25", "25 - 50", "50+"];

const BUSINESS_GENERATED_OPTIONS = [
    "No Business",
    "₹50,000 – ₹2 Lakh",
    "₹2 Lakh – ₹5 Lakh",
    "₹5 Lakh – ₹10 Lakh",
    "₹10 Lakh +",
];

const VALUABLE_PART_OPTIONS = [
    { label: "Buyer Meetings", icon: Handshake },
    { label: "Visitor Footfall", icon: Eye },
    { label: "Branding & Promotion", icon: Megaphone },
    { label: "Networking", icon: Network },
    { label: "Conference / Seminars", icon: Mic },
    { label: "Product Launch", icon: Rocket },
];

const HASHTAGS = ["#IHWE2026", "#HealthWellnessExpo", "#IHWEGlobal"];

// ── Small UI Primitives ─────────────────────────────────────────────────────

const SectionHeader = ({ number, title, subtitle }: { number: number, title: string, subtitle: string }) => (
    <div className="bg-blue-50 p-2 rounded-tl-lg rounded-tr-lg">
        <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-[#23471d] text-white text-[10px] font-semibold flex items-center justify-center shrink-0 mt-1">
                {number}
            </div>
            <div>

            <h3 className="text-xs font-bold ">{title}</h3>
        <p className="text-[10px]">{subtitle}</p>
            </div>
        </div>
    </div>
);

const StarRatingLarge = ({ value, onChange, label, sublabels }: { value: number, onChange: (v: number) => void, label: React.ReactNode, sublabels: string[] }) => (
    <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold  leading-snug min-h-[36px]">{label}</p>
        <div className="flex gap-1.5 gap-2 pr-4">
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    className="transition-transform hover:scale-110"
                >
                <IoStar
    size={25}
    fill={star <= value ? "#f5a623" : "#e2e8f0"}
    color={star <= value ? "#f5a623" : "#475569"}
    strokeWidth={1.5}
/>
                </button>
            ))}
        </div>
        {value > 0 && (
            <p className="text-[10px] font-semibold text-green-700">{sublabels[value - 1]}</p>
        )}
    </div>
);

const ParticipatePills = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold  leading-snug min-h-[36px]">Will you participate again<br />in IHWE?</p>
        <div className="flex flex-wrap gap-2">
            {PARTICIPATE_OPTIONS.map(opt => {
                const active = value === opt.value;
                return (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange(opt.value)}
                        className={cn(
                            "h-8 px-2 rounded-lg border text-[10px] font-semibold flex items-center gap-1.5 transition-all",
                            active
                                ? "bg-[#23471d]/5 border-[#23471d] text-[#23471d]"
                                : "bg-white border-slate-300  hover:border-slate-300"
                        )}
                    >
                        {active ? <CheckCircle2 size={15} className="text-[#23471d]" /> : <Circle size={15} className="text-slate-300" />}
                        {opt.label}
                    </button>
                );
            })}
        </div>
    </div>
);

const RadioCardRow = ({ label, icon: Icon, selected, onSelect, iconText }: { label: string, icon?: any, iconText?: string, selected: boolean, onSelect: () => void }) => (
    <button
        type="button"
        onClick={onSelect}
        className={cn(
            "w-full flex items-center gap-2 px-2 py-1 rounded-lg border text-left transition-all",
            selected ? "border-[#23471d] bg-[#23471d]/5" : "border-slate-300 hover:border-slate-300"
        )}
    >
        <span className={cn(
            "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
            selected ? "border-[#23471d]" : "border-slate-300"
        )}>
            {selected && <span className="w-2 h-2 rounded-full bg-[#23471d]" />}
        </span>
        {Icon && <Icon size={15} className=" shrink-0" />}
        {iconText && <span className="text-xs font-semibold  shrink-0 w-3.5 text-center">{iconText}</span>}
        <span className="text-[10px] font-medium ">{label}</span>
    </button>
);

const CheckboxCardRow = ({ label, icon: Icon, checked, onToggle }: { label: string, icon: any, checked: boolean, onToggle: () => void }) => (
    <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-2.5 py-1 text-left group"
    >
        <span className={cn(
            "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all",
            checked ? "bg-[#23471d] border-[#23471d]" : "border-slate-300 bg-white group-hover:border-slate-300"
        )}>
            {checked && <Check size={11} className="text-white" strokeWidth={3} />}
        </span>
        <Icon size={15} className=" shrink-0" />
        <span className="text-[10px] font-medium ">{label}</span>
    </button>
);

const TestimonialButton = ({ id, label, sublabel, icon: Icon, onChange, accept, isUploaded, isUploading, onClick }: {
    id: string, label: string, sublabel: string, icon: any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    accept?: string, isUploaded?: boolean, isUploading?: boolean, onClick?: () => void
}) => {
    const content = (
        <div className={cn(
            "flex flex-col items-center justify-center gap-1.5 h-full p-2 rounded-xl border transition-all text-center px-2",
            isUploaded ? "border-emerald-400 bg-emerald-50" : "border-slate-300 bg-white hover:border-slate-300 hover:bg-slate-50",
            isUploading && "opacity-60"
        )}>
            <Icon size={16} className={isUploaded ? "text-emerald-500" : ""} strokeWidth={1.75} />
            <p className="text-[10px] font-semibold  leading-tight">
                {isUploading ? "Uploading..." : isUploaded ? "Uploaded ✓" : label}
            </p>
            <p className="text-[10px]  font-medium leading-tight text-slate-600">{sublabel}</p>
        </div>
    );

    if (onClick) {
        return <button type="button" onClick={onClick} className="w-full">{content}</button>;
    }

    return (
        <div className="w-full">
            <input type="file" id={id} className="hidden" onChange={onChange} accept={accept} disabled={isUploading} />
            <label htmlFor={id} className="cursor-pointer block">{content}</label>
        </div>
    );
};

// ── Main Component ─────────────────────────────────────────────────────────

export default function ExhibitorFeedbackFormNew() {
    const { data: ctxData } = useExhibitorCtx();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);
    const [submittedFeedback, setSubmittedFeedback] = useState<any>(null);
    const [feedbackRecord, setFeedbackRecord] = useState<any>(null);
    const [uploading, setUploading] = useState<Record<string, boolean>>({});
    const [socialLinks, setSocialLinks] = useState({
        facebook: "https://www.facebook.com/namogangewellness.event",
        instagram: "https://www.instagram.com/namogangewellness.event",
        twitter: "https://x.com/namogange_event",
        linkedin: "https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGQd71l_pPnagAAAZ2kbf2IiqRDmOu1kmpcNKUdIxGeWN9KdSSjmqMhKk7O8txbgGoR7cpo-0TM3sKRTSCAa2ZlTQ2NWn1EShl9NCmyyUAoevgPnCXRyVyZkm5xk1TYfrSpmBM=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fnamo-gange-wellness-event",
        youtube: "https://www.youtube.com/@Namogangewellness",
        whatsappNumber: "8076750278",
        whatsappMessage: "hiji kya haal h "
    });

    const DRAFT_KEY = 'exhibitor_feedback_draft';

    const [form, setForm] = useState({
        // Basic details (unchanged, kept for API compatibility)
        exhibitorName: "",
        companyName: "",
        stallNumber: "",
        hallNumber: "",
        productCategory: "",
        contactPerson: "",
        mobileNumber: "",
        emailId: "",
        country: "India",

        // Section 1 — Quick Event Rating
        overallRating: "",
        recommendOthers: 0,
        participateAgain: "",

        // Legacy detailed ratings — kept in state for backward API compatibility, not shown in this UI
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

        // Section 2 — Business Outcome
        businessLeads: "",
        businessGenerated: "",
        mostValuablePart: [] as string[],
        mostValuablePartOther: "",

        // Section 3 — Feedback & Testimonial
        likedMost: "",
        improvements: "",
        specialSuggestions: "",
        testimonialPermission: "No",
        testimonialFile: "",
        videoFeedbackFile: "",
        audioFeedbackFile: "",
        writtenReview: "",

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

    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const data = await socialMediaApi.get();
                if (data) {
                    setSocialLinks(prev => ({
                        ...prev,
                        facebook: data.facebook || prev.facebook,
                        instagram: data.instagram || prev.instagram,
                        twitter: data.twitter || prev.twitter,
                        linkedin: data.linkedin || prev.linkedin,
                        youtube: data.youtube || prev.youtube,
                        whatsappNumber: data.whatsappNumber || prev.whatsappNumber,
                        whatsappMessage: data.whatsappMessage || prev.whatsappMessage,
                    }));
                }
            } catch (error) {
                console.error("Failed to load social links:", error);
            }
        };

        fetchSocialLinks();
    }, []);

    const getRegParam = () => {
        const selectedRegId = localStorage.getItem('selectedRegId');
        return selectedRegId ? `?regId=${selectedRegId}` : '';
    };

    const loadExistingFeedback = async () => {
        setIsLoadingFeedback(true);

        // Check localStorage for a locally-saved draft first
        let localDraft: any = null;
        try {
            const stored = localStorage.getItem('exhibitor_feedback_draft');
            if (stored) localDraft = JSON.parse(stored);
        } catch {
            localDraft = null;
        }

        try {
            const token = localStorage.getItem('exhibitorToken');
            const response = await fetch(`${API_URL}/exhibitor-feedback/my${getRegParam()}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();

            if (result.success && result.data) {
                setFeedbackRecord(result.data);

                if (result.data.status === 'submitted') {
                    setSubmittedFeedback(result.data);
                    localStorage.setItem('feedback_submitted', 'true');
                    const savedData = result.data.responses && Object.keys(result.data.responses).length
                        ? result.data.responses
                        : result.data;
                    const mergedData = { ...savedData };
                    if (localDraft) {
                        Object.entries(localDraft).forEach(([key, value]) => {
                            const shouldPreserveDraft = value !== undefined && value !== null && !(typeof value === 'string' && value === '');
                            if (shouldPreserveDraft) {
                                mergedData[key] = value;
                            }
                        });
                    }
                    setForm(prev => ({ ...prev, ...mergedData }));
                } else {
                    // Not submitted yet — prefer local draft if one exists
                    setSubmittedFeedback(null);
                    localStorage.removeItem('feedback_submitted');
                    if (localDraft) {
                        setForm(prev => ({ ...prev, ...localDraft }));
                    }
                }
            } else {
                setSubmittedFeedback(null);
                setFeedbackRecord(null);
                if (localDraft) {
                    setForm(prev => ({ ...prev, ...localDraft }));
                }
            }
        } catch (error) {
            console.error('[Feedback] Failed to load feedback', error);
            // API failed entirely — fall back to whatever draft we have locally
            if (localDraft) {
                setForm(prev => ({ ...prev, ...localDraft }));
            }
        } finally {
            setIsLoadingFeedback(false);
        }
    };

    useEffect(() => {
        loadExistingFeedback();
    }, []);

    const handleRating = (key: string, val: number) => setForm(prev => ({ ...prev, [key]: val }));
    const handleValue = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));
    const toggleValuablePart = (opt: string) => setForm(prev => ({
        ...prev,
        mostValuablePart: prev.mostValuablePart.includes(opt)
            ? prev.mostValuablePart.filter(o => o !== opt)
            : [...prev.mostValuablePart, opt]
    }));

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
                setForm(prev => {
                    const updated = { ...prev, [key]: data.url };
                    localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
                    return updated;
                });
                Swal.fire({ icon: 'success', title: 'Uploaded', text: 'File uploaded successfully', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
            } else {
                throw new Error(data.message || 'Failed to upload');
            }
        } catch (error: any) {
            Swal.fire({ icon: 'error', title: 'Upload Failed', text: error.message, confirmButtonColor: '#23471d' });
        } finally {
            setUploading(prev => ({ ...prev, [key]: false }));
            e.target.value = '';
        }
    };

    const handleWriteReview = async () => {
        const { value } = await Swal.fire({
            title: 'Write Your Review',
            input: 'textarea',
            inputValue: form.writtenReview,
            inputPlaceholder: 'Share a few words about your experience at IHWE 2026...',
            showCancelButton: true,
            confirmButtonColor: '#23471d',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Save Review'
        });
        if (typeof value === 'string') {
            handleValue('writtenReview', value);
        }
    };

    const handleSaveDraft = () => {
        try {
            localStorage.setItem('exhibitor_feedback_draft', JSON.stringify(form));
            Swal.fire({ icon: 'success', title: 'Draft Saved', text: 'Your progress has been saved on this device.', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
        } catch {
            Swal.fire({ icon: 'error', title: 'Could Not Save Draft', confirmButtonColor: '#23471d' });
        }
    };

    const handleSubmitReferral = (e: React.FormEvent) => {
        e.preventDefault();
        const form2 = e.target as HTMLFormElement;
        const companyName = (form2.elements.namedItem('refCompany') as HTMLInputElement)?.value;
        if (!companyName) {
            Swal.fire({ icon: 'warning', title: 'Company name required', confirmButtonColor: '#23471d' });
            return;
        }
        Swal.fire({ icon: 'success', title: 'Referral Sent', text: 'Thanks! Our team will reach out to them shortly.', confirmButtonColor: '#23471d' });
        form2.reset();
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
            const selectedRegId = localStorage.getItem('selectedRegId') || (ctxData as any)?._id || (ctxData as any)?.registrationId || '';
            const response = await fetch(`${API_URL}/exhibitor-feedback/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...currentForm,
                    ...(selectedRegId ? {
                        regId: selectedRegId,
                        selectedRegId,
                        exhibitorId: selectedRegId,
                        registrationId: selectedRegId
                    } : {})
                })
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Feedback submission failed');
            }
            setFeedbackRecord(result.data);
            setSubmittedFeedback(result.data);
            localStorage.setItem('feedback_submitted', 'true');
            localStorage.removeItem('exhibitor_feedback_draft');
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

    const progress = Math.round((Object.values(form).filter(v => v !== "" && v !== 0 && v !== false && !(Array.isArray(v) && v.length === 0)).length / Object.keys(form).length) * 100);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full px-2 lg:px-6 space-y-3 text-left bg-white">

            {/* Header */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <img src={exhibor_feedback} className="w-5 h-5 object-cover"/>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold ">Exhibitor Feedback</h2>
                        <p className="text-[10px]  font-medium">Your feedback helps us improve and create a better experience for future editions.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                    <button type="button" onClick={handleSaveDraft} className="h-8 px-4 bg-white border border-slate-300 hover:bg-slate-50  rounded-lg flex items-center gap-2 transition-all font-semibold text-[12px]">
                        <Save size={14} /> Save Draft
                    </button>
                    <button type="submit" form="exhibitor-feedback-form" disabled={isSubmitting || isLoadingFeedback || !!submittedFeedback} className="h-8 px-4 bg-[#23471d] hover:bg-[#1a3516] disabled:bg-slate-300 text-white rounded-lg flex items-center gap-2 transition-all font-semibold text-[12px]">
                        <Send size={14} /> {isSubmitting ? 'Submitting...' : submittedFeedback ? 'Submitted Feedback' : 'Submit Feedback'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-2 items-start">

                {/* Main Column */}
                <form id="exhibitor-feedback-form" onSubmit={handleSubmit} className="flex flex-col gap-2">

                    {/* Section 1 */}
                    <div className="bg-blue-50 rounded-lg border border-slate-300 shadow-sm">
                        <SectionHeader number={1} title="Quick Event Rating" subtitle="Tell us about your overall experience in just a few clicks." />
                        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-300 p-2 rounded-lg border-t border-slate-300 bg-white">
                            <div className="sm:pr-3 pb-3 sm:pb-0">
                                <StarRatingLarge
                                    label={<>How was your overall experience<br />at IHWE 2026?</>}
                                    value={OVERALL_LABELS.indexOf(form.overallRating) + 1}
                                    onChange={(v) => handleValue('overallRating', OVERALL_LABELS[v - 1])}
                                    sublabels={OVERALL_LABELS}
                                />
                            </div>
                            <div className="sm:px-2 py-1 sm:py-0">
                                <ParticipatePills value={form.participateAgain} onChange={(v) => handleValue('participateAgain', v)} />
                            </div>
                            <div className="sm:pl-3 pt-2 sm:pt-0">
                                <StarRatingLarge
                                    label={<>Would you recommend IHWE<br />to others?</>}
                                    value={form.recommendOthers}
                                    onChange={(v) => handleRating('recommendOthers', v)}
                                    sublabels={RECOMMEND_LABELS}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-blue-50 rounded-lg border border-slate-300 shadow-sm ">
                        <SectionHeader number={2} title="Business Outcome" subtitle="Help us understand the business impact of your participation." />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-0 p-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300 rounded-lg border-t border-slate-300 bg-white">
                            <div className="space-y-2.5 sm:pr-3">
                                <p className="text-xs font-semibold ">How many business leads<br />did you receive?</p>
                                <div className="flex flex-col gap-1">
                                    {LEADS_OPTIONS.map(opt => (
                                        <RadioCardRow key={opt} label={opt} icon={Users} selected={form.businessLeads === opt} onSelect={() => handleValue('businessLeads', opt)} />
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2.5 sm:px-2">
                                <p className="text-xs font-semibold ">Approximate business<br />generated from IHWE 2026?</p>
                                <div className="flex flex-col gap-1">
                                    {BUSINESS_GENERATED_OPTIONS.map(opt => (
                                        <RadioCardRow key={opt} label={opt} iconText="₹" selected={form.businessGenerated === opt} onSelect={() => handleValue('businessGenerated', opt)} />
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1 sm:pl-3">
                                <p className="text-xs font-semibold ">What was the most valuable<br />part of IHWE for you? <span className="text-[11px] font-medium text-slate-600">(Select all that apply)</span></p>
                                <div className="flex flex-col gap-0.5">
                                    {VALUABLE_PART_OPTIONS.map(opt => (
                                        <CheckboxCardRow key={opt.label} label={opt.label} icon={opt.icon} checked={form.mostValuablePart.includes(opt.label)} onToggle={() => toggleValuablePart(opt.label)} />
                                    ))}
                                </div>
                                <input
                                    value={form.mostValuablePartOther}
                                    onChange={e => handleValue('mostValuablePartOther', e.target.value)}
                                    placeholder="Other (Please specify)"
                                    className="w-full h-6 px-2 text-[10px] border border-slate-300 rounded-lg outline-none focus:border-[#23471d] mt-1 placeholder:text-slate-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-blue-50 rounded-lg border border-slate-300 shadow-sm ">
                        <SectionHeader number={3} title="Your Feedback & Testimonial" subtitle="Your suggestions and experience inspire us to do better." />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 rounded-lg border-t border-slate-300 bg-white">
                            <div className="space-y-1.5">
                                <p className="text-xs font-semibold ">What did you like most about IHWE?</p>
                                <textarea
                                    value={form.likedMost}
                                    maxLength={500}
                                    onChange={e => handleValue('likedMost', e.target.value)}
                                    placeholder="Write your feedback here..."
                                    rows={4}
                                    className="w-full p-2 text-[10px] border border-slate-300 rounded-lg outline-none focus:border-[#23471d] resize-none placeholder:text-slate-600"
                                />
                                <p className="text-[11px]  font-medium">{form.likedMost.length}/500 characters</p>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-xs font-semibold ">Share your testimonial <span className=" font-medium text-slate-600">(Optional)</span></p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    <TestimonialButton
                                        id="up-photo"
                                        label="Upload Photo"
                                        sublabel="JPG, PNG"
                                        icon={ImageIcon}
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'testimonialFile')}
                                        isUploading={uploading['testimonialFile']}
                                        isUploaded={!!form.testimonialFile}
                                    />
                                    <TestimonialButton
                                        id="up-video"
                                        label="Upload Video"
                                        sublabel="MP4, MOV"
                                        icon={Video}
                                        accept="video/*"
                                        onChange={(e) => handleFileUpload(e, 'videoFeedbackFile')}
                                        isUploading={uploading['videoFeedbackFile']}
                                        isUploaded={!!form.videoFeedbackFile}
                                    />
                                    <TestimonialButton
                                        id="up-audio"
                                        label="Record Audio"
                                        sublabel="Max 2 min"
                                        icon={Mic}
                                        accept="audio/*"
                                        onChange={(e) => handleFileUpload(e, 'audioFeedbackFile')}
                                        isUploading={uploading['audioFeedbackFile']}
                                        isUploaded={!!form.audioFeedbackFile}
                                    />
                                    <TestimonialButton
                                        id="up-review"
                                        label="Write Review"
                                        sublabel="Text Review"
                                        icon={PenLine}
                                        onClick={handleWriteReview}
                                        isUploaded={!!form.writtenReview}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer progress bar */}
                    <div className="bg-blue-50 rounded-lg border border-slate-300 shadow-sm px-2 py-1 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 w-full">
                            <span className="text-[10px] font-semibold  whitespace-nowrap">Your Progress</span>
                            <div className="flex-1 h-2 bg-slate-300 rounded-full overflow-hidden max-w-xs">
                                <div className="h-full bg-[#23471d] rounded-full transition-all" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="text-[10px] font-semibold  whitespace-nowrap">{progress}% Completed</span>
                        </div>
                        <div className="flex items-end justify-end gap-2.5 shrink-0 flex-1">
                            <button type="button" onClick={handleSaveDraft} className="h-6 px-4 bg-white border border-slate-300 hover:bg-slate-50  rounded-lg flex items-center gap-2 transition-all font-semibold text-[10px]">
                                <Save size={14} /> Save Draft
                            </button>
                            <button type="submit" disabled={isSubmitting || isLoadingFeedback || !!submittedFeedback} className="h-6 px-4 bg-[#23471d] hover:bg-[#1a3516] disabled:bg-slate-300 text-white rounded-lg flex items-center gap-2 transition-all font-semibold text-[10px]">
                                <Send size={12} /> {isSubmitting ? 'Submitting...' : submittedFeedback ? 'Submitted Feedback' : 'Submit Feedback'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Sidebar */}
                <div className="flex flex-col gap-2">

                    {/* Google review */}
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-2">
                        <h3 className="text-xs font-semibold ">Loved your experience?</h3>
                        <p className="text-[12px]  font-medium mt-0.5">Help us grow by posting a review on Google.</p>
                        <div className="flex items-center gap-2 mt-2">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-8 h-8"
                                xmlns="http://www.w3.org/2000/svg"
                            ><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            <div className="flex gap-0.5 px-4 gap-2 flex-1">
                                {[1, 2, 3, 4, 5].map(s => <IoStar key={s} size={25} fill="#f5a623" className="text-[#f5a623]" />)}
                            </div>
                        </div>
                        <a href="https://g.page/r/CWvrp1X7bjTDEBM/review" target="_blank" rel="noopener noreferrer" className="mt-2 h-6 w-full bg-[#23471d] hover:bg-[#1a3516] text-white text-[10px] font-semibold rounded-lg flex items-center justify-center gap-2 transition-all">
                            Write a Review on Google <ExternalLink size={13} />
                        </a>
                    </div>

                    {/* Social share */}
                    <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-2">
                        <h3 className="text-xs font-semibold ">Share Your Experience</h3>
                        <p className="text-[12px]  font-medium mt-0.5">Follow us and tag IHWE 2026 on social media.</p>
                        <div className="flex items-center gap-2 mt-2">
                            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center transition-transform hover:scale-110">
                                <FaFacebookF size={13} />
                            </a>
                            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 text-white flex items-center justify-center transition-transform hover:scale-110">
                                <FaInstagram size={14} />
                            </a>
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center transition-transform hover:scale-110">
                                <FaLinkedinIn size={13} />
                            </a>
                            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" title="YouTube" className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center transition-transform hover:scale-110">
                                <FaYoutube size={14} />
                            </a>
                            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="X / Twitter" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform hover:scale-110">
                                <FaXTwitter size={13} />
                            </a>
                        </div>
                        <p className="text-[11px]  font-medium mt-2">Use these hashtags when you post</p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {HASHTAGS.map(tag => (
                                <span key={tag} className="bg-blue-100 text-blue-700 text-[11px] font-semibold px-2 py-1 rounded-md">{tag}</span>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => window.open(`https://wa.me/${socialLinks.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(socialLinks.whatsappMessage)}`, "_blank")}
                            className="mt-2 h-6 w-full border border-blue-600 hover:bg-slate-50 text-blue-600 text-[10px] font-semibold rounded-lg flex items-center justify-center gap-2 transition-all"
                        >
                            <Upload size={14} /> Chat with us on WhatsApp
                        </button>
                    </div>

                    {/* Referral */}
                    <div className="border border-slate-300 rounded-lg p-2 relative overflow-hidden bg-violet-50">
                        <Gift size={72} className="absolute -right-3 -bottom-3 text-white/10 rotate-12" />
                        <h3 className="text-[12px] font-bold relative text-violet-900">Refer &amp; Earn 10% Referral Bonus!</h3>
                        <p className="text-[10px]  font-medium mt-0.5 relative w-[85%]">Know a company interested in exhibiting? Refer them and earn rewards.</p>
                        <div className="flex">

                            <form onSubmit={handleSubmitReferral} className="relative mt-1 flex flex-col gap-2">
                                <div>
                                    <label className="text-[10px] font-semibold uppercase tracking-wide">Company Name</label>
                                    <input name="refCompany" placeholder="Enter company name" className="w-full h-6 mt-1 px-2.5 text-[10px] rounded-md bg-white/95 placeholder: border border-slate-300" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-semibold  uppercase tracking-wide">Contact Person</label>
                                    <input name="refContact" placeholder="Enter contact person" className="w-full h-6 mt-1 px-2.5 text-[10px] rounded-md bg-white/95 placeholder: border border-slate-300" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-semibold  uppercase tracking-wide">Mobile Number</label>
                                    <input name="refMobile" placeholder="Enter mobile number" className="w-full h-6 mt-1 px-2.5 text-[10px] rounded-md bg-white/95 placeholder: border border-slate-300" />
                                </div>
                                <button type="submit" className="h-6 w-full text-white bg-violet-700 text-[10px] font-semibold rounded-lg flex items-center justify-center gap-2 mt-1 hover:bg-violet-500 transition-all">
                                    Submit Referral <Send size={13} />
                                </button>
                            </form>
                            <div className="w-25 h-20">
                            <img src={gift} width={120} height={40} className="w-full h-full" />
                            </div>
                        </div>

                    </div>

                    {/* Need assistance */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <Headphones size={17} className="text-emerald-700" />
                            </div>
                            <div>
                                <h3 className="text-[12px] font-semibold ">Need Assistance?</h3>
                                <p className="text-[10px]  font-medium">Our support team is here to help you.</p>
                            </div>
                        </div>
                        <div className="flex gap-1.5 mt-2 justify-between p-2 bg-white border border-slate-300 rounded-xl tracking-wider font-bold">
                            <a href="tel:+919654900525" className="flex items-center gap-2 text-[10px] font-semibold   hover:text-[#23471d]">
                                <Phone size={13} className="text-green-700" /> +91-96549 00525
                            </a>
                            <div className="border-r border-slate-300 w-1"></div>
                            <a href="mailto:info@ihwe.com" className="flex items-center gap-2 text-[10px] font-semibold  hover:text-[#23471d]">
                                <Mail size={13} className="text-green-700" /> info@ihwe.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden print report — retained for print/export functionality */}
            <div id="print-report" className="hidden print:block print:bg-white">
                <PrintFeedbackReport form={form} />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { size: A4; margin: 10mm; }
                    * {
                        background-color: transparent !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    html, body, #print-report {
                        background-color: #ffffff !important;
                    }
                    #print-report .bg-blue-50 { background-color: #eff6ff !important; }
                    #print-report .bg-blue-100 { background-color: #dbeafe !important; }
                    #print-report .bg-blue-300 { background-color: #93c5fd !important; }
                    #print-report .bg-blue-400 { background-color: #60a5fa !important; }
                    #print-report .bg-blue-500 { background-color: #3b82f6 !important; }
                    #print-report .bg-blue-600 { background-color: #2563eb !important; }
                    #print-report .bg-blue-800 { background-color: #1e40af !important; }
                    #print-report .bg-green-50 { background-color: #f0fdf4 !important; }
                    #print-report .bg-green-200 { background-color: #bbf7d0 !important; }
                    #print-report .bg-purple-50 { background-color: #faf5ff !important; }
                    #print-report .bg-slate-50 { background-color: #f8fafc !important; }
                    #print-report .bg-white { background-color: #ffffff !important; }
                    body > *:not(#root) { display: none !important; }
                }
            `}} />
        </motion.div>
    );
}