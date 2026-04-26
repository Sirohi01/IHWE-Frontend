import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    ArrowRight
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Swal from 'sweetalert2';
import { cn } from "@/lib/utils";

// ── Components ──────────────────────────────────────────────────────────────────

const StarRating = ({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) => {
    return (
        <div className="flex flex-col gap-2 min-w-[140px] print:min-w-0 print:gap-0.5">
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
                        {/* Desktop SVG - Hidden in Print if needed, but we use strict colors */}
                        <Star 
                            size={20} 
                            fill={star <= value ? "#d26019" : "none"} 
                            style={{ color: star <= value ? "#d26019" : "#cbd5e1" }}
                            className={cn(
                                "print:hidden",
                                star <= value ? "text-[#d26019]" : "text-slate-200"
                            )} 
                        />
                        {/* Print Star (Reliable Character) */}
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

const RadioOption = ({ label, value, current, onChange, name }: { label: string, value: string, current: string, onChange: (v: string) => void, name: string }) => (
    <label className={cn(
        "flex items-center gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer print:p-1 print:gap-1.5 print:rounded-md",
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

export default function ExhibitorFeedbackForm() {
    const { data: ctxData } = useExhibitorCtx();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        brandingEffectiveness: "",
        meetExpectations: "",
        estimatedBusiness: "",
        interestNextEdition: "",
        improvements: "",
        specialSuggestions: "",
        testimonialPermission: "No",
        isDeclared: false,
        digitalSignature: "",
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (ctxData) {
            setForm(prev => ({
                ...prev,
                exhibitorName: ctxData.exhibitorName || "",
                companyName: ctxData.companyName || "",
                stallNumber: ctxData.participation?.stallFor || "",
                contactPerson: `${ctxData.contact1?.title || ''} ${ctxData.contact1?.firstName || ''} ${ctxData.contact1?.lastName || ''}`.trim(),
                mobileNumber: ctxData.contact1?.mobile || "",
                emailId: ctxData.contact1?.email || "",
                country: ctxData.country || "India",
                productCategory: ctxData.primaryCategory || ctxData.industrySector || ""
            }));
        }
    }, [ctxData]);

    const handleRating = (key: string, val: number) => setForm(prev => ({ ...prev, [key]: val }));
    const handleValue = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

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
            localStorage.setItem('feedback_submitted', 'true');
        }, 1500);
    };

    const progress = Math.round((Object.values(form).filter(v => v !== "" && v !== 0 && v !== false).length / Object.keys(form).length) * 100);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-6 print:space-y-0">
            
            {/* Top Bar */}
            <div className="bg-white rounded-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm print:shadow-none print:border-none print:p-0 print:mb-2 text-left">
                <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1 print:text-[14px]">Exhibitor Feedback Form</h2>
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
                <FeedbackSection id="section-1" title="Section 1 – Basic Details" icon={User}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 print:grid-cols-2 print:gap-x-8 print:gap-y-2">
                        {[
                            { label: "Exhibitor Name", value: form.exhibitorName, readOnly: true },
                            { label: "Company Name", value: form.companyName, readOnly: true },
                            { label: "Stall Number", value: form.stallNumber, key: 'stallNumber' },
                            { label: "Hall Number", value: form.hallNumber, key: 'hallNumber' },
                            { label: "Product Category", value: form.productCategory, key: 'productCategory' },
                            { label: "Contact Person", value: form.contactPerson, key: 'contactPerson' },
                            { label: "Mobile Number", value: form.mobileNumber, key: 'mobileNumber' },
                            { label: "Email ID", value: form.emailId, key: 'emailId', lower: true }
                        ].map((field, idx) => (
                            <div key={idx} className="space-y-2 print:space-y-0.5">
                                <label className="reg-label">{field.label}</label>
                                <input 
                                    readOnly={field.readOnly} 
                                    value={field.value} 
                                    onChange={e => field.key && handleValue(field.key, e.target.value)}
                                    className={cn("reg-input", field.readOnly && "bg-slate-50", field.lower && "lowercase")} 
                                />
                            </div>
                        ))}
                        <div className="space-y-2 lg:col-span-4 print:col-span-2 print:space-y-0.5">
                            <label className="reg-label">Country</label>
                            <div className="flex gap-4 pt-1 print:gap-4 print:pt-0">
                                <RadioOption name="country" label="India" value="India" current={form.country} onChange={v => handleValue('country', v)} />
                                <RadioOption name="country" label="Other Country" value="Other" current={form.country} onChange={v => handleValue('country', v)} />
                            </div>
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-2" title="Section 2 – Overall Experience Rating" icon={Star}>
                    <div className="space-y-6 print:space-y-2">
                        <div>
                            <p className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight border-l-4 border-[#d26019] pl-3 print:mb-1 print:text-[9px]">How would you rate your overall experience at the Expo?</p>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 print:grid-cols-5 print:gap-1">
                                {["Excellent", "Very Good", "Good", "Average", "Poor"].map(opt => <RadioOption key={opt} name="overallRating" label={opt} value={opt} current={form.overallRating} onChange={v => handleValue('overallRating', v)} />)}
                            </div>
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-slate-800 mb-4 tracking-tight border-l-4 border-[#d26019] pl-3 print:mb-1 print:text-[9px]">Would you like to participate again in the next edition?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 print:grid-cols-5 print:gap-1">
                                {["Definitely Yes", "Probably Yes", "Maybe", "Probably No", "Definitely No"].map(opt => <RadioOption key={opt} name="participateAgain" label={opt} value={opt} current={form.participateAgain} onChange={v => handleValue('participateAgain', v)} />)}
                            </div>
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-3" title="Section 3 – Stall & Venue Experience" icon={Home}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 print:grid-cols-3 print:gap-y-3 print:gap-x-4">
                        <StarRating label="Stall Location" value={form.stallLocation} onChange={v => handleRating('stallLocation', v)} />
                        <StarRating label="Construction & Setup" value={form.stallConstruction} onChange={v => handleRating('stallConstruction', v)} />
                        <StarRating label="Venue Facilities" value={form.venueFacilities} onChange={v => handleRating('venueFacilities', v)} />
                        <StarRating label="Housekeeping" value={form.housekeeping} onChange={v => handleRating('housekeeping', v)} />
                        <StarRating label="Electricity/Internet" value={form.electricitySupport} onChange={v => handleRating('electricitySupport', v)} />
                        <StarRating label="Security" value={form.securityArrangements} onChange={v => handleRating('securityArrangements', v)} />
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-4" title="Section 4 – Visitor Quality" icon={Users}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 print:grid-cols-2 print:gap-x-4 print:gap-y-2">
                        {[
                            { title: "Visitor Footfall", name: "visitorFootfall", opts: ["Excellent", "Good", "Average", "Low"] },
                            { title: "Visitor Quality", name: "visitorQuality", opts: ["Excellent", "Good", "Average", "Poor"] },
                            { title: "Buyer Meetings", name: "buyerMeetings", opts: ["Very Useful", "Useful", "Average", "Not Useful"] },
                            { title: "Serious Business Leads", name: "seriousLeads", opts: ["1–10", "10–25", "25–50", "50+"] }
                        ].map((q, idx) => (
                            <div key={idx} className="space-y-3 print:space-y-1">
                                <p className="text-[12px] font-bold text-slate-600 uppercase tracking-tight print:text-[8px]">{q.title}</p>
                                <div className="grid grid-cols-2 gap-2.5 print:gap-1">
                                    {q.opts.map(opt => <RadioOption key={opt} name={q.name} label={opt} value={opt} current={(form as any)[q.name]} onChange={v => handleValue(q.name, v)} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-5" title="Section 5 – Organizer Support" icon={LifeBuoy}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 print:grid-cols-3 print:gap-y-3 print:gap-x-4">
                        <StarRating label="Pre-Event Comm" value={form.preEventComm} onChange={v => handleRating('preEventComm', v)} />
                        <StarRating label="Registration" value={form.registrationProcess} onChange={v => handleRating('registrationProcess', v)} />
                        <StarRating label="Payment Support" value={form.paymentSupport} onChange={v => handleRating('paymentSupport', v)} />
                        <StarRating label="Coordination" value={form.onsiteCoordination} onChange={v => handleRating('onsiteCoordination', v)} />
                        <StarRating label="Problem Speed" value={form.problemResolution} onChange={v => handleRating('problemResolution', v)} />
                        <StarRating label="RM Support" value={form.rmSupport} onChange={v => handleRating('rmSupport', v)} />
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-6" title="Section 6 – Sponsorship & Branding" icon={Megaphone}>
                    <div className="space-y-3 print:space-y-1">
                        <p className="text-[12px] font-bold text-slate-800 tracking-tight print:text-[9px]">Did sponsorship / branding help your business visibility?</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 print:grid-cols-5 print:gap-1">
                            {["Yes, Highly Effective", "Moderately Effective", "Slightly Effective", "Not Effective", "Not Applicable"].map(opt => <RadioOption key={opt} name="brandingEffectiveness" label={opt} value={opt} current={form.brandingEffectiveness} onChange={v => handleValue('brandingEffectiveness', v)} />)}
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-7" title="Section 7 – ROI Evaluation" icon={PieChart}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 print:grid-cols-2 print:gap-x-4 print:gap-y-2">
                        <div className="space-y-3 print:space-y-1">
                            <p className="text-[12px] font-bold text-slate-600 uppercase tracking-tight print:text-[8px]">Business Expectations</p>
                            <div className="grid grid-cols-2 gap-2.5 print:gap-1">
                                {["Exceeded Expectations", "Met Expectations", "Partially Met", "Did Not Meet"].map(opt => <RadioOption key={opt} name="meetExpectations" label={opt} value={opt} current={form.meetExpectations} onChange={v => handleValue('meetExpectations', v)} />)}
                            </div>
                        </div>
                        <div className="space-y-3 print:space-y-1">
                            <p className="text-[12px] font-bold text-slate-600 uppercase tracking-tight print:text-[8px]">Estimated Business</p>
                            <div className="grid grid-cols-2 gap-2.5 print:gap-1">
                                {["Below ₹1 Lakh", "₹1–5 Lakhs", "₹5–10 Lakhs", "₹10 Lakhs+", "Under Discussion"].map(opt => <RadioOption key={opt} name="estimatedBusiness" label={opt} value={opt} current={form.estimatedBusiness} onChange={v => handleValue('estimatedBusiness', v)} />)}
                            </div>
                        </div>
                        <div className="lg:col-span-2 print:col-span-2 space-y-3 print:space-y-1">
                            <p className="text-[12px] font-bold text-slate-800 tracking-tight print:text-[9px]">Interested in sponsorship for next edition?</p>
                            <div className="flex gap-4">
                                {["Yes", "No", "Maybe"].map(opt => <RadioOption key={opt} name="interestNextEdition" label={opt} value={opt} current={form.interestNextEdition} onChange={v => handleValue('interestNextEdition', v)} />)}
                            </div>
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-8" title="Section 8 – Suggestions & Improvements" icon={Lightbulb}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-2">
                        <div className="space-y-2">
                            <label className="reg-label">Improvements for next edition?</label>
                            <textarea value={form.improvements} onChange={e => handleValue('improvements', e.target.value)} className="reg-input min-h-[60px] print:min-h-[30px] print:text-[8px]" />
                        </div>
                        <div className="space-y-2">
                            <label className="reg-label">Special suggestions?</label>
                            <textarea value={form.specialSuggestions} onChange={e => handleValue('specialSuggestions', e.target.value)} className="reg-input min-h-[60px] print:min-h-[30px] print:text-[8px]" />
                        </div>
                    </div>
                </FeedbackSection>

                <FeedbackSection id="section-9" title="Section 9 – Testimonial Permission" icon={Video}>
                    <div className="space-y-4 print:space-y-1.5">
                        <p className="text-[12px] font-bold text-slate-800 tracking-tight print:text-[9px]">Use feedback as testimonial for promotion?</p>
                        <div className="flex gap-4">
                            {["Yes", "No"].map(opt => <RadioOption key={opt} name="testimonialPermission" label={opt} value={opt} current={form.testimonialPermission} onChange={v => handleValue('testimonialPermission', v)} />)}
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center text-center print:hidden">
                            <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-tight">Write a Review on Google</h3>
                            <a href="https://g.page/r/CWvrp1X7bjTDEBM/review" target="_blank" rel="noopener noreferrer" className="mt-4 h-10 px-6 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                                <ExternalLink size={12} className="text-[#d26019]" /> Google Review Link
                            </a>
                        </div>
                    </div>
                </FeedbackSection>

                <div className="bg-white border-2 border-[#23471d]/10 rounded-2xl p-4 flex flex-col gap-4 mb-12 shadow-lg print:shadow-none print:border-none print:p-0 print:mb-2 text-left">
                    <div className="flex items-center gap-4">
                        <Checkbox id="f-dec" checked={form.isDeclared} onCheckedChange={v => setForm(f => ({ ...f, isDeclared: !!v }))} className="w-5 h-5 border-[#23471d] print:w-3 print:h-3 shrink-0" />
                        <label htmlFor="f-dec" className="text-[14px] font-bold text-slate-700 cursor-pointer print:text-[10px] leading-tight">
                            I confirm the above feedback is true and based on my event experience.
                        </label>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 border-t border-slate-50 pt-4 print:border-none print:pt-1">
                        <div className="relative group flex items-center gap-2">
                            <Calendar className="text-slate-400 print:hidden" size={14} />
                            <input 
                                type="date"
                                className="bg-slate-50 h-10 pl-3 pr-3 border border-slate-200 rounded text-[12px] font-bold text-slate-700 outline-none hover:border-[#d26019] transition-all w-40 print:hidden" 
                                value={form.date} 
                                onChange={e => handleValue('date', e.target.value)}
                            />
                            <span className="hidden print:inline text-[9px] font-bold">Date: {form.date}</span>
                        </div>

                        <div className="flex-1 min-w-[150px] flex items-center gap-3">
                            <input 
                                className="bg-transparent border-b border-slate-200 flex-1 text-[18px] font-signature italic outline-none focus:border-[#d26019] transition-all h-10 print:hidden" 
                                placeholder="Type Digital Signature" 
                                value={form.digitalSignature} 
                                onChange={e => handleValue('digitalSignature', e.target.value)} 
                            />
                            <span className="hidden print:inline text-[11px] font-signature border-b border-slate-300 min-w-[120px]">Sign: {form.digitalSignature}</span>
                            <div className="print:hidden">
                                <label className="text-[9px] bg-slate-50 px-2 py-1.5 rounded cursor-pointer border border-slate-200 font-bold text-slate-500 uppercase flex items-center gap-1">
                                    <FileText size={10} /> Upload
                                    <input type="file" className="hidden" accept="image/*" />
                                </label>
                            </div>
                        </div>

                        <div className="print:hidden">
                            <button type="submit" disabled={isSubmitting} className="h-10 px-8 bg-[#23471d] hover:bg-[#1a3516] text-white text-[11px] font-black uppercase rounded shadow-md flex items-center gap-2">
                                {isSubmitting ? "Wait..." : "Submit Feedback"}
                                <ArrowRight size={14} />
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
                    @page { size: A4; margin: 4mm; }
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
                    textarea.reg-input { height: 26px !important; }
                    .reg-label { font-size: 7px !important; margin-bottom: 1px !important; }
                    
                    svg { display: none !important; }
                    .star-row { gap: 3px !important; min-height: 14px; }
                    .flex-col { flex-direction: row !important; }
                    .gap-y-10 { gap-y: 2px !important; }
                    .h-10, .px-1, .py-4, button, .print\\:hidden { display: none !important; }
                    
                    .bg-white { background: white !important; }
                    h3 { font-size: 9px !important; margin-bottom: 0px !important; padding: 1px 0 !important; }
                    
                    /* Correct Header Highlight Overflow */
                    .bg-slate-50\\/80 { border-radius: 6px 6px 0 0 !important; }
                }
            `}} />
        </motion.div>
    );
}
