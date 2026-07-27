import React from 'react';
import { cn } from "@/lib/utils";
import { 
    User, Store, Tag, Mail, Building, MapPin, Phone, Globe, 
    Star, Home, Users, Award, Handshake, BarChart, 
    LifeBuoy, Megaphone, PieChart, Lightbulb, MessageCircle, 
    Calendar, CheckCircle, Target, FileText
} from "lucide-react";
import { API_URL } from "@/lib/api";

const PrintSection = ({ num, title, children, className }: any) => (
    <div className={cn("border border-blue-100 rounded-xl p-2 mb-2 relative overflow-hidden", className)}>
        <div className="flex items-center gap-3 mb-2 border-b border-blue-50 pb-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {num}
            </div>
            <h3 className="text-blue-900 font-bold text-[14px] m-0 uppercase tracking-wide">
                {title}
            </h3>
        </div>
        <div>
            {children}
        </div>
    </div>
);

const PrintField = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-2">
        {Icon && <Icon size={14} className="text-blue-500 shrink-0 mt-0.5" />}
        <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-semibold">{label}</span>
            <span className="text-[12px] text-slate-800 font-medium">{value || '-'}</span>
        </div>
    </div>
);

const PrintStars = ({ value, label, icon: Icon }: any) => (
    <div className="flex flex-col items-center gap-1">
        {Icon && <Icon size={18} className="text-blue-600 mb-1" />}
        <span className="text-[10px] text-slate-600 font-semibold text-center leading-tight mb-1">{label}</span>
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <Star
                    key={star}
                    size={12}
                    fill={star <= value ? "#1d4ed8" : "none"}
                    className={star <= value ? "text-blue-700" : "text-slate-200"}
                />
            ))}
        </div>
    </div>
);

export const PrintFeedbackReport = ({ form }: { form: any }) => {
    return (
        <div className="hidden print:block w-full max-w-[210mm] mx-auto bg-white text-slate-800 font-sans p-0 relative" style={{ minHeight: '297mm' }}>
            
            {/* Header Graphic */}
            <div className="absolute top-0 right-0 w-64 h-24 bg-blue-50 opacity-50 rounded-bl-full -z-10" />
            <div className="absolute top-0 right-0 w-48 h-16 bg-blue-100 opacity-60 rounded-bl-full -z-10" />
            <div className="absolute top-0 right-0 w-32 h-10 bg-blue-600 opacity-80 rounded-bl-full -z-10" />

            {/* Title */}
            <div className="text-center pt-4 pb-3">
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-1" style={{ color: '#1e3a8a' }}>EXHIBITOR FEEDBACK REPORT</h1>
                <div className="flex items-center justify-center gap-2">
                    <div className="h-px bg-slate-300 w-16" />
                    <div className="w-2 h-2 bg-blue-800 rotate-45" />
                    <div className="h-px bg-slate-300 w-16" />
                </div>
            </div>

            {/* 1. BASIC DETAILS */}
            <PrintSection num="1" title="BASIC DETAILS" className="bg-blue-50">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <PrintField icon={User} label="Contact Person" value={form.contactPerson} />
                    <PrintField icon={Building} label="Company Name" value={form.exhibitorName || form.companyName} />
                    <PrintField icon={Store} label="Stall Number" value={form.stallNumber} />
                    <PrintField icon={MapPin} label="Hall Number" value={form.hallNumber} />
                    <PrintField icon={Tag} label="Product Category" value={form.productCategory} />
                    <PrintField icon={Phone} label="Mobile Number" value={form.mobileNumber} />
                    <PrintField icon={Mail} label="Email ID" value={form.emailId} />
                    <PrintField icon={Globe} label="Country" value={form.country} />
                </div>
            </PrintSection>

            {/* 2. OVERALL EXPERIENCE */}
            <PrintSection num="2" title="OVERALL EXPERIENCE" className="bg-green-50 border-green-200">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[11px] text-green-700 font-semibold mb-1">Overall experience at the expo:</span>
                        <span className="text-[16px] font-bold text-green-800">{form.overallRating || '-'}</span>
                    </div>
                    <div className="w-px h-10 bg-green-200" />
                    <div className="flex flex-col">
                        <span className="text-[11px] text-green-700 font-semibold mb-1">Participate again next year?</span>
                        <span className="text-[16px] font-bold text-green-800">{form.participateAgain || '-'}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                        <CheckCircle size={24} className="text-green-700" />
                    </div>
                </div>
            </PrintSection>

            {/* 3. STALL & VENUE EXPERIENCE */}
            <PrintSection num="3" title="STALL & VENUE EXPERIENCE">
                <div className="grid grid-cols-4 gap-y-4 gap-x-4 px-4 py-2">
                    <PrintStars icon={MapPin} label="Stall Location" value={form.stallLocation} />
                    <PrintStars icon={Store} label="Stall Construction" value={form.stallConstruction} />
                    <PrintStars icon={Building} label="Venue Facilities" value={form.venueFacilities} />
                    <PrintStars icon={LifeBuoy} label="Housekeeping" value={form.housekeeping} />
                    <PrintStars icon={Lightbulb} label="Electricity/Internet" value={form.electricitySupport} />
                    <PrintStars icon={Target} label="Security Arrangements" value={form.securityArrangements} />
                </div>
            </PrintSection>

            {/* 4. VISITOR QUALITY */}
            <PrintSection num="4" title="VISITOR QUALITY">
                <div className="grid grid-cols-4 gap-4 px-2">
                    <PrintField icon={Users} label="Visitor Footfall" value={form.visitorFootfall} />
                    <PrintField icon={Award} label="Visitor Quality" value={form.visitorQuality} />
                    <PrintField icon={Handshake} label="Buyer Meetings" value={form.buyerMeetings} />
                    <PrintField icon={BarChart} label="Serious Business Leads" value={form.seriousLeads} />
                </div>
            </PrintSection>

            {/* 5. ORGANIZER SUPPORT */}
            <PrintSection num="5" title="ORGANIZER SUPPORT">
                <div className="grid grid-cols-4 gap-y-5 gap-x-2 px-2 py-2">
                    <PrintStars icon={MessageCircle} label="Pre-Event Communication" value={form.preEventComm} />
                    <PrintStars icon={FileText} label="Registration Process" value={form.registrationProcess} />
                    <PrintStars icon={PieChart} label="Payment Support" value={form.paymentSupport} />
                    <PrintStars icon={Users} label="Onsite Coordination" value={form.onsiteCoordination} />
                    <PrintStars icon={Target} label="Problem Resolution Speed" value={form.problemResolution} />
                    <PrintStars icon={User} label="Relationship Manager Support" value={form.rmSupport} />
                    <PrintStars icon={Phone} label="Help Desk Services" value={form.helpDeskService} />
                    <PrintStars icon={Megaphone} label="Marketing Support" value={form.marketingSupport} />
                    <PrintStars icon={Mail} label="Post-Event Communication" value={form.postEventComm} />
                </div>
            </PrintSection>

            {/* 6. SPONSORSHIP & BRANDING */}
            <PrintSection num="6" title="SPONSORSHIP & BRANDING" className="bg-purple-50 border-purple-200">
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <span className="text-[12px] text-purple-800 font-semibold">Did sponsorship / branding help your business visibility?</span>
                        <span className="text-[14px] font-bold text-purple-900">{form.brandingEffectiveness || '-'}</span>
                    </div>
                    <Target size={32} className="text-purple-600" />
                </div>
            </PrintSection>

            {/* 7. ROI EVALUATION */}
            <PrintSection num="7" title="ROI EVALUATION" className="bg-blue-50">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2 flex-1">
                        <div className="flex items-center">
                            <span className="text-[11px] text-blue-800 font-semibold w-48">Business Expectations</span>
                            <span className="text-[12px] font-medium text-slate-800">{form.meetExpectations || '-'}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-[11px] text-blue-800 font-semibold w-48">Estimated Business Generated</span>
                            <span className="text-[12px] font-medium text-slate-800">{form.estimatedBusiness || '-'}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-[11px] text-blue-800 font-semibold w-48">Interested in Sponsorship for Next Edition?</span>
                            <span className="text-[12px] font-medium text-slate-800">{form.interestNextEdition || '-'}</span>
                        </div>
                    </div>
                    {/* Graph SVG placeholder */}
                    <div className="w-32 h-20 bg-blue-100 rounded-lg flex items-end p-2 gap-1 relative overflow-hidden">
                        <div className="w-4 bg-blue-300 h-[30%] rounded-t-sm" />
                        <div className="w-4 bg-blue-400 h-[50%] rounded-t-sm" />
                        <div className="w-4 bg-blue-500 h-[70%] rounded-t-sm" />
                        <div className="w-4 bg-blue-600 h-[90%] rounded-t-sm" />
                        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center text-white text-[10px] font-bold">₹</div>
                    </div>
                </div>
            </PrintSection>

            {/* 8. SUGGESTIONS & IMPROVEMENTS */}
            <PrintSection num="8" title="SUGGESTIONS & IMPROVEMENTS">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-4 items-start">
                        <BarChart size={20} className="text-blue-500 shrink-0 mt-1" />
                        <div className="flex gap-2 w-full border-b border-blue-50 pb-2">
                            <span className="text-[11px] text-blue-800 font-semibold w-24 shrink-0">Improvements</span>
                            <p className="text-[11px] text-slate-700 m-0">{form.improvements || '-'}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <MessageCircle size={20} className="text-blue-500 shrink-0 mt-1" />
                        <div className="flex gap-2 w-full">
                            <span className="text-[11px] text-blue-800 font-semibold w-24 shrink-0">Suggestions</span>
                            <p className="text-[11px] text-slate-700 m-0">{form.specialSuggestions || '-'}</p>
                        </div>
                    </div>
                </div>
            </PrintSection>

            {/* 9. TESTIMONIAL & SIGNATURE */}
            <PrintSection num="9" title="TESTIMONIAL & SIGNATURE" className="bg-slate-50">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <span className="text-[11px] text-purple-800 font-semibold">Testimonial Consent</span>
                        <span className="text-[12px] font-bold text-purple-900">{form.testimonialPermission || '-'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex-1 max-w-[40%] flex items-start gap-2">
                            <span className="text-4xl text-purple-500 font-serif leading-none">"</span>
                            <p className="text-[10px] font-bold text-slate-700 italic">
                                I confirm that the feedback provided above is true and based on my business experience.
                            </p>
                            <span className="text-4xl text-purple-500 font-serif leading-none self-end">"</span>
                        </div>
                        
                        <div className="flex flex-col items-center flex-1">
                            <span className="text-[10px] font-bold text-blue-800 mb-2">Authorized Digital Signature</span>
                            {form.digitalSignatureFile ? (
                                <img src={`${API_URL.replace('/api', '')}${form.digitalSignatureFile}`} alt="Signature" className="h-12 object-contain" crossOrigin="anonymous" />
                            ) : (
                                <div className="text-[20px] font-signature italic h-12 flex items-end pb-1 border-b border-black min-w-[200px] justify-center">
                                    {form.digitalSignature || '________________'}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-center flex-1">
                            <span className="text-[10px] font-bold text-blue-800 mb-2">Document Date</span>
                            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center mb-1">
                                <Calendar size={20} className="text-blue-600" />
                            </div>
                            <span className="text-[12px] font-bold text-slate-800">{form.date || '-'}</span>
                        </div>
                    </div>
                </div>
            </PrintSection>

            {/* Footer */}
            <div className="bg-blue-50 rounded-full py-2 flex items-center justify-center gap-2 mt-4 mx-8">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1e3a8a" className="text-blue-900"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span className="text-[12px] font-bold text-blue-900">Thank you for your valuable feedback!</span>
            </div>

        </div>
    );
};
