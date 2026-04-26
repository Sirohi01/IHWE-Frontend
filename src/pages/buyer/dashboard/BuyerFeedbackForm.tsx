import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    Upload
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Swal from 'sweetalert2';
import { cn } from "@/lib/utils";

// ── Components ──────────────────────────────────────────────────────────────────

const StarRating = ({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) => {
    return (
        <div className="flex flex-col gap-2 min-w-[140px] print:min-w-0 print:gap-0.5 text-left">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight print:text-[8px]">{label}</span>
            <div className="flex gap-1.5 star-row print:gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        className={cn(
                            "transition-all duration-200 transform print:transform-none print:m-0 print:p-0",
                            star <= value ? 'scale-110' : 'hover:scale-105'
                        )}
                    >
                        <Star 
                            size={20} 
                            fill={star <= value ? "#d26019" : "none"} 
                            style={{ color: star <= value ? "#d26019" : "#cbd5e1" }}
                            className={cn(
                                "print:hidden",
                                star <= value ? "text-[#d26019]" : "text-slate-200"
                            )} 
                        />
                        <span className="hidden print:inline text-[12px]" style={{ color: star <= value ? "#d26019" : "#ccc" }}>
                            {star <= value ? '★' : '☆'}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const FeedbackSection = ({ title, icon: Icon, children, id }: { title: string, icon: any, children: React.ReactNode, id: string }) => (
    <div id={id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-5 scroll-mt-24 print:border-slate-300 print:mb-2.5 print:rounded-lg">
        <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex items-center gap-3 print:bg-slate-50 print:py-1 print:px-3 rounded-t-xl print:rounded-none">
            <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100 print:hidden text-[#23471d]">
                <Icon size={16} />
            </div>
            <h3 className="text-[13px] font-black text-[#23471d] uppercase tracking-tight print:text-[10px]">
                {title}
            </h3>
        </div>
        <div className="p-5 print:p-2.5">
            {children}
        </div>
    </div>
);

const RadioOption = ({ label, value, current, onChange, name }: { label: string, value: string, current: string, onChange: (v: string | any) => void, name: string }) => (
    <label className={cn(
        "flex items-center gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer print:p-1 print:gap-1.5 print:rounded-md text-left",
        current === value 
            ? 'bg-[#23471d]/5 border-[#23471d] ring-4 ring-[#23471d]/5 print:bg-slate-50 print:border-slate-500 print:ring-0' 
            : 'border-slate-200 hover:border-slate-300 print:border-slate-200'
    )}>
        <input 
            type="radio" 
            name={name} 
            checked={current === value} 
            onChange={() => onChange(value)} 
            className="w-3.5 h-3.5 print:w-3 print:h-3 accent-[#23471d]" 
        />
        <span className="text-[12px] font-medium text-slate-700 print:text-[8px] line-clamp-1">{label}</span>
    </label>
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
        lookingForward: [] as string[],
        
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
        challengeExplanation: "",
        
        futureEngagement: [] as string[],
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
            [key]: prev[key].includes(val) 
                ? prev[key].filter(v => v !== val)
                : [...prev[key], val]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.isDeclared) {
            Swal.fire({ icon: 'warning', title: 'Action Required', text: 'Please confirm the final declaration.', confirmButtonColor: '#23471d' });
            return;
        }
        setIsSubmitting(true);
        
        // Smart CRM Triggers logic would happen here in API call
        // example: if participateAgain === 'Definitely Yes' -> Add 'Repeat Buyer Lead' tag
        
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-6 print:space-y-0 text-left">
            
            {/* Top Bar */}
            <div className="bg-white rounded-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm print:shadow-none print:border-none print:p-0 print:mb-2">
                <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1 print:text-[14px]">Buyer Feedback Form</h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest print:text-[9px]">International Health & Wellness Expo 2026</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 print:hidden">
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Completion</p>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-slate-900">{progress}%</span>
                            <TrendingUp size={14} className="text-[#16a34a]" />
                        </div>
                    </div>
                    <button type="button" onClick={() => window.print()} className="h-11 px-6 bg-[#23471d] hover:bg-[#1a3516] text-white rounded-sm flex items-center gap-2 transition-all shadow-md">
                        <Calendar size={18} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Download Copy</span>
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="print:space-y-0">
                <FeedbackSection id="section-1" title="Section 1 – Buyer Basic Details" icon={User}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 print:grid-cols-2 print:gap-x-8 print:gap-y-2">
                        <div className="space-y-2 print:space-y-0.5">
                            <label className="reg-label">Full Name</label>
                            <input readOnly value={form.fullName} className="reg-input bg-slate-50" />
                        </div>
                        <div className="space-y-2 print:space-y-0.5">
                            <label className="reg-label">Buyer ID</label>
                            <input readOnly value={form.buyerId} className="reg-input bg-slate-50 uppercase" />
                        </div>
                        <div className="space-y-2 print:space-y-0.5">
                            <label className="reg-label">Company Name</label>
                            <input readOnly value={form.companyName} className="reg-input bg-slate-50" />
                        </div>
                        <div className="space-y-2 print:space-y-0.5">
                            <label className="reg-label">Designation</label>
                            <input value={form.designation} onChange={e => handleValue('designation', e.target.value)} className="reg-input" />
                        </div>
                        <div className="space-y-2 lg:col-span-4 print:col-span-2">
                            <label className="reg-label mb-2 block">Business Type</label>
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 print:grid-cols-5 print:gap-1">
                                {["Importer", "Distributor", "Wholesaler", "Retail Chain", "Hospital Procurement", "Government Buyer", "Institutional Buyer", "Franchise Partner", "Investor", "International Buyer"].map(type => (
                                    <RadioOption key={type} name="businessType" label={type} value={type} current={form.businessType} onChange={v => handleValue('businessType', v)} />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2 print:space-y-0.5">
                            <label className="reg-label">Mobile Number (with Country Code)</label>
                            <input value={form.mobileNumber} onChange={e => handleValue('mobileNumber', e.target.value)} className="reg-input" />
                        </div>
                        <div className="space-y-2 print:space-y-0.5">
                            <label className="reg-label">WhatsApp Number</label>
                            <input value={form.whatsappNumber} onChange={e => handleValue('whatsappNumber', e.target.value)} className="reg-input" />
                        </div>
                        <div className="space-y-2 print:space-y-0.5">
                            <label className="reg-label">Official Email ID</label>
                            <input value={form.emailId} onChange={e => handleValue('emailId', e.target.value)} className="reg-input lowercase" />
                        </div>
                        <div className="space-y-2 print:space-y-0.5">
                            <label className="reg-label">City</label>
                            <input value={form.city} onChange={e => handleValue('city', e.target.value)} className="reg-input" />
                        </div>
                        <div className="space-y-2 print:space-y-0.5 flex flex-col justify-end lg:col-span-4">
                            <label className="reg-label mb-2 block">Country</label>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex gap-4">
                                    <RadioOption name="country" label="India" value="India" current={form.country} onChange={v => handleValue('country', v)} />
                                    <RadioOption name="country" label="Other Country" value="Other" current={form.country} onChange={v => handleValue('country', v)} />
                                </div>
                                {form.country === 'Other' && (
                                    <input 
                                        placeholder="Enter Country Name" 
                                        className="reg-input w-48 h-10 px-3 bg-white" 
                                        value={form.otherCountryName} 
                                        onChange={e => handleValue('otherCountryName', e.target.value)} 
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-2" title="Section 2 – Overall Experience" icon={Star}>
                    <div className="space-y-8 print:space-y-2">
                        <div>
                            <p className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight border-l-4 border-[#d26019] pl-3 print:mb-1 print:text-[9px]">How would you rate your overall experience at the Expo?</p>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 print:grid-cols-5 print:gap-1">
                                {["Excellent", "Very Good", "Good", "Average", "Poor"].map(opt => <RadioOption key={opt} name="overallRating" label={opt} value={opt} current={form.overallRating} onChange={v => handleValue('overallRating', v)} />)}
                            </div>
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight border-l-4 border-[#d26019] pl-3 print:mb-1 print:text-[9px]">Was the Expo valuable for your business objectives?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 print:grid-cols-5 print:gap-1">
                                {["Extremely Valuable", "Valuable", "Moderately Valuable", "Slightly Valuable", "Not Valuable"].map(opt => <RadioOption key={opt} name="expoValue" label={opt} value={opt} current={form.expoValue} onChange={v => handleValue('expoValue', v)} />)}
                            </div>
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight border-l-4 border-[#d26019] pl-3 print:mb-1 print:text-[9px]">Would you like to participate again next year?</p>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 print:grid-cols-5 print:gap-1">
                                {["Definitely Yes", "Probably Yes", "Maybe", "Probably No", "No"].map(opt => <RadioOption key={opt} name="participateAgain" label={opt} value={opt} current={form.participateAgain} onChange={v => handleValue('participateAgain', v)} />)}
                            </div>
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-3" title="Section 3 – Buyer Match Quality" icon={Globe}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 print:grid-cols-2 print:gap-x-4 print:gap-y-2">
                        <div className="space-y-3 print:space-y-1">
                            <p className="text-[12px] font-bold text-slate-600 uppercase tracking-tight print:text-[8px]">Did you find relevant exhibitors for your requirements?</p>
                            <div className="grid grid-cols-2 gap-2.5 print:gap-1 text-left">
                                {["Yes – Highly Relevant", "Yes – Moderately Relevant", "Limited Relevance", "No"].map(opt => <RadioOption key={opt} name="relevantExhibitors" label={opt} value={opt} current={form.relevantExhibitors} onChange={v => handleValue('relevantExhibitors', v)} />)}
                            </div>
                        </div>
                        <div className="space-y-3 print:space-y-1">
                            <p className="text-[12px] font-bold text-slate-600 uppercase tracking-tight print:text-[8px]">Number of Business Meetings Conducted</p>
                            <div className="grid grid-cols-2 gap-2.5 print:gap-1">
                                {["1–5", "5–10", "10–20", "20+"].map(opt => <RadioOption key={opt} name="meetingsConducted" label={opt} value={opt} current={form.meetingsConducted} onChange={v => handleValue('meetingsConducted', v)} />)}
                            </div>
                        </div>
                        <div className="space-y-3 print:space-y-1">
                            <p className="text-[12px] font-bold text-slate-600 uppercase tracking-tight print:text-[8px]">Quality of B2B Meetings</p>
                            <div className="grid grid-cols-2 gap-2.5 print:gap-1">
                                {["Excellent", "Good", "Average", "Poor"].map(opt => <RadioOption key={opt} name="meetingQuality" label={opt} value={opt} current={form.meetingQuality} onChange={v => handleValue('meetingQuality', v)} />)}
                            </div>
                        </div>
                        <div className="space-y-3 print:space-y-1">
                            <p className="text-[12px] font-bold text-slate-600 uppercase tracking-tight print:text-[8px]">Number of Serious Suppliers Shortlisted</p>
                            <div className="grid grid-cols-3 gap-2.5 print:gap-1">
                                {["1–5", "5–10", "10+"].map(opt => <RadioOption key={opt} name="suppliersShortlisted" label={opt} value={opt} current={form.suppliersShortlisted} onChange={v => handleValue('suppliersShortlisted', v)} />)}
                            </div>
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-4" title="Section 4 – Business Conversion Potential" icon={Briefcase}>
                    <div className="space-y-8 print:space-y-2">
                        <div>
                            <p className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight border-l-4 border-[#d26019] pl-3 print:mb-1 print:text-[9px]">Estimated Business Value Under Discussion</p>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 print:grid-cols-4 print:gap-1">
                                {[
                                    "Below USD 10,000", 
                                    "USD 10,000 – USD 50,000", 
                                    "USD 50,000 – USD 200,000", 
                                    "USD 200,000+"
                                ].map(opt => <RadioOption key={opt} name="estimatedBusiness" label={opt} value={opt} current={form.estimatedBusiness} onChange={v => handleValue('estimatedBusiness', v)} />)}
                            </div>
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight border-l-4 border-[#d26019] pl-3 print:mb-1 print:text-[9px]">Looking Forward To</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 print:grid-cols-4 print:gap-1">
                                {[
                                    "Purchase Order Placement", 
                                    "Distributor Appointment", 
                                    "Franchise Finalization", 
                                    "Strategic Partnership", 
                                    "Government Procurement", 
                                    "OEM Partnership", 
                                    "Investment Opportunity", 
                                    "Hospital Supply Agreement"
                                ].map(opt => (
                                    <label key={opt} className={cn(
                                        "flex items-center gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer print:p-1 print:gap-1.5 print:rounded-md",
                                        form.lookingForward.includes(opt) ? 'bg-[#23471d]/5 border-[#23471d]' : 'border-slate-200'
                                    )}>
                                        <Checkbox checked={form.lookingForward.includes(opt)} onCheckedChange={() => toggleArray('lookingForward', opt)} className="w-3.5 h-3.5" />
                                        <span className="text-[11px] font-medium text-slate-700 print:text-[8px]">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-5" title="Section 5 – Hosted Buyer Experience" icon={Home}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 print:grid-cols-2 print:gap-x-4 print:gap-y-2">
                        {[
                            { title: "Hosted Buyer Program Experience", name: "hostedExperience" },
                            { title: "Hotel & Travel Support", name: "hotelTravelSupport" },
                            { title: "Airport Pickup & Local Assistance", name: "localAssistance" },
                            { title: "Relationship Manager Support", name: "rmSupport" }
                        ].map((q, idx) => (
                            <div key={idx} className="space-y-3 print:space-y-1">
                                <p className="text-[12px] font-bold text-slate-600 uppercase tracking-tight print:text-[8px]">{q.title}</p>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 print:gap-0.5">
                                    {["Excellent", "Good", "Average", "Poor", "Not Applicable"].map(opt => (
                                        <RadioOption key={opt} name={q.name} label={opt} value={opt} current={(form as any)[q.name]} onChange={v => handleValue(q.name, v)} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-6" title="Section 6 – Event Management Rating" icon={Clock}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 print:grid-cols-3 print:gap-y-3 print:gap-x-4">
                        <StarRating label="Registration Process" value={form.regProcess} onChange={v => handleRating('regProcess', v)} />
                        <StarRating label="Meeting Scheduling" value={form.meetingScheduling} onChange={v => handleRating('meetingScheduling', v)} />
                        <StarRating label="Buyer Lounge Experience" value={form.loungeExperience} onChange={v => handleRating('loungeExperience', v)} />
                        <StarRating label="Conference Sessions" value={form.conferenceSessions} onChange={v => handleRating('conferenceSessions', v)} />
                        <StarRating label="Organizer Support" value={form.organizerSupport} onChange={v => handleRating('organizerSupport', v)} />
                        <StarRating label="Quality of Exhibitors" value={form.exhibitorQuality} onChange={v => handleRating('exhibitorQuality', v)} />
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-7" title="Section 7 – Challenges Faced" icon={ShieldAlert}>
                    <div className="space-y-6 print:space-y-2">
                        <div>
                            <p className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight border-l-4 border-[#d26019] pl-3 print:mb-1 print:text-[9px]">What was the biggest issue during your participation?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 print:grid-cols-4 print:gap-1">
                                {[
                                    "Low Quality Supplier Match", 
                                    "Limited Buyer Meetings", 
                                    "Poor Scheduling", 
                                    "Venue Management", 
                                    "Travel Support", 
                                    "Communication Gap", 
                                    "Product Quality Concerns", 
                                    "Documentation Issues", 
                                    "Other"
                                ].map(opt => <RadioOption key={opt} name="biggestChallenge" label={opt} value={opt} current={form.biggestChallenge} onChange={v => handleValue('biggestChallenge', v)} />)}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="reg-label">Please explain briefly</label>
                            <textarea value={form.challengeExplanation} onChange={e => handleValue('challengeExplanation', e.target.value)} className="reg-input min-h-[80px] pt-3" />
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-8" title="Section 8 – Future Opportunities" icon={Lightbulb}>
                    <div className="space-y-8 print:space-y-4 text-left">
                        <div>
                            <p className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight border-l-4 border-[#d26019] pl-3 print:mb-1 print:text-[9px]">Interested in future engagement as</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 print:grid-cols-4 print:gap-1">
                                {[
                                    "Hosted Buyer", 
                                    "Strategic Buyer", 
                                    "Investor", 
                                    "Franchise Partner", 
                                    "Conference Speaker", 
                                    "Government Procurement Partner", 
                                    "International Delegate"
                                ].map(opt => (
                                    <label key={opt} className={cn(
                                        "flex items-center gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer",
                                        form.futureEngagement.includes(opt) ? 'bg-[#23471d]/5 border-[#23471d]' : 'border-slate-200'
                                    )}>
                                        <Checkbox checked={form.futureEngagement.includes(opt)} onCheckedChange={() => toggleArray('futureEngagement', opt)} className="w-3.5 h-3.5" />
                                        <span className="text-[11px] font-medium text-slate-700 print:text-[8px]">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <p className="text-[12px] font-bold text-slate-800 tracking-tight print:text-[9px]">Would you like priority access for next edition?</p>
                                <div className="flex gap-4">
                                    {["Yes", "No"].map(opt => <RadioOption key={opt} name="priorityAccess" label={opt} value={opt} current={form.priorityAccess} onChange={v => handleValue('priorityAccess', v)} />)}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-[12px] font-bold text-slate-800 tracking-tight print:text-[9px]">Need Dedicated Support for Next Edition?</p>
                                <div className="flex gap-4">
                                    {["Yes", "No"].map(opt => <RadioOption key={opt} name="dedicatedSupport" label={opt} value={opt} current={form.dedicatedSupport} onChange={v => handleValue('dedicatedSupport', v)} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-9" title="Section 9 – Suggestions & Testimonials" icon={Video}>
                    <div className="space-y-8 print:space-y-2">
                        <div className="space-y-2">
                            <label className="reg-label">What improvements would you suggest for next edition?</label>
                            <textarea value={form.improvements} onChange={e => handleValue('improvements', e.target.value)} className="reg-input min-h-[80px] pt-3" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <div className="space-y-3">
                                <p className="text-[12px] font-bold text-slate-800 tracking-tight border-l-4 border-[#d26019] pl-3 print:text-[9px]">Can we use your feedback as testimonial?</p>
                                <div className="flex gap-4">
                                    {["Yes", "No"].map(opt => <RadioOption key={opt} name="testimonialPermission" label={opt} value={opt} current={form.testimonialPermission} onChange={v => handleValue('testimonialPermission', v)} />)}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <button type="button" className="flex-1 min-w-[140px] px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center gap-2 hover:border-[#23471d] transition-all group">
                                    <FileText size={18} className="text-slate-400 group-hover:text-[#23471d]" />
                                    <span className="text-[9px] font-black uppercase text-slate-400 group-hover:text-[#23471d]">Upload Written Testimonial</span>
                                </button>
                                <button type="button" className="flex-1 min-w-[140px] px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center gap-2 hover:border-[#23471d] transition-all group">
                                    <Video size={18} className="text-slate-400 group-hover:text-[#23471d]" />
                                    <span className="text-[9px] font-black uppercase text-slate-400 group-hover:text-[#23471d]">Upload Video Feedback</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center print:hidden">
                            <div className="flex items-center gap-2 mb-2">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#fab005" className="text-[#fab005]" />)}
                            </div>
                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">Love the Expo? Rate us on Google</h3>
                            <p className="text-[11px] text-slate-500 max-w-sm mb-6">Your reviews help us bring better exhibitors and bigger opportunities every year.</p>
                            <a 
                                href="https://g.page/r/CWvrp1X7bjTDEBM/review" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="h-12 px-8 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
                            >
                                <ExternalLink size={16} className="text-[#d26019] group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Google Review Portal</span>
                            </a>
                        </div>
                    </div>
                </FeedbackSection>

                <div className="bg-white border-2 border-[#23471d]/10 rounded-2xl p-8 flex flex-col gap-8 mb-12 shadow-lg print:shadow-none print:border-none print:p-0 print:mb-2 text-left">
                    <div className="flex items-start gap-4">
                        <Checkbox id="f-dec" checked={form.isDeclared} onCheckedChange={v => setForm(f => ({ ...f, isDeclared: !!v }))} className="mt-1 w-5 h-5 border-[#23471d] print:w-3 print:h-3 shrink-0" />
                        <label htmlFor="f-dec" className="text-[14px] font-bold text-slate-700 cursor-pointer print:text-[10px] leading-relaxed flex-1">
                            "I confirm the above feedback is true and based on my business experience."
                        </label>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-8 border-t border-slate-50 pt-8 print:border-none print:pt-1">
                        <div className="flex-1 min-w-[150px] flex items-center gap-3">
                            <input 
                                className="bg-transparent border-b-2 border-slate-100 flex-1 text-[22px] font-signature italic outline-none focus:border-[#d26019] transition-all h-12 print:hidden" 
                                placeholder="Type Digital Signature" 
                                value={form.digitalSignature} 
                                onChange={e => handleValue('digitalSignature', e.target.value)} 
                            />
                            <span className="hidden print:inline text-[13px] font-signature border-b border-slate-300 min-w-[180px] py-1">{form.digitalSignature}</span>
                            <div className="print:hidden">
                                <label className="text-[10px] bg-slate-50 px-3 py-2 rounded-lg cursor-pointer border border-slate-200 font-black text-slate-500 uppercase flex items-center gap-2 hover:bg-slate-100 transition-all">
                                    <FileText size={14} className="text-[#23471d]" /> Upload Sign
                                    <input type="file" className="hidden" accept="image/*" />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 min-w-[150px]">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submission Date</p>
                            <div className="flex items-center gap-2 h-12">
                                <Calendar className="text-slate-400 print:hidden" size={16} />
                                <span className="text-[14px] font-bold text-slate-700">{form.date}</span>
                            </div>
                        </div>

                        <div className="print:hidden">
                            <button type="submit" disabled={isSubmitting} className="h-12 px-12 bg-[#23471d] hover:bg-[#1a3516] text-white text-[12px] font-black uppercase tracking-widest rounded-sm shadow-xl transition-all flex items-center gap-3">
                                {isSubmitting ? "Processing..." : "Submit Feedback"}
                                <ArrowRight size={18} />
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
                    @page { size: A4; margin: 5mm; }
                    body { 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                        background: white !important; 
                        font-size: 8px !important; 
                    }
                    .max-w-6xl { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
                    .mb-5 { margin-bottom: 4px !important; }
                    .p-5 { padding: 4px !important; }
                    .reg-input { height: 18px !important; font-size: 8px !important; border: 1px solid #ddd !important; padding: 0 6px !important; }
                    textarea.reg-input { height: 35px !important; }
                    .reg-label { font-size: 7px !important; margin-bottom: 1px !important; }
                    
                    svg { display: none !important; }
                    .star-row { gap: 3px !important; min-height: 14px; }
                    .flex-col { flex-direction: row !important; }
                    .h-10, .px-1, .py-4, button, .print\\:hidden { display: none !important; }
                    
                    .bg-white { background: white !important; }
                    h3 { font-size: 10px !important; margin-bottom: 0px !important; padding: 2px 0 !important; }
                    .bg-slate-50\\/80 { border-radius: 6px 6px 0 0 !important; }
                }
            `}} />
        </motion.div>
    );
}
