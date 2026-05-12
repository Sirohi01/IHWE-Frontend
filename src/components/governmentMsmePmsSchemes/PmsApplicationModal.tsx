import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Upload, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { msmePmsSchemeApi, verifyApi } from "@/lib/api";

interface Props {
    open: boolean;
    onClose: () => void;
}

const emptyForm = {
    companyName: "", contactPerson: "", mobileNumber: "",
    emailId: "", udyamNumber: "", gstNumber: "", category: "", companyBrief: "",
};

const PmsApplicationModal: React.FC<Props> = ({ open, onClose }) => {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState(emptyForm);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // OTP state
    const [emailOtp, setEmailOtp] = useState("");
    const [phoneOtp, setPhoneOtp] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [phoneOtpSent, setPhoneOtpSent] = useState(false);
    const [verifyingEmail, setVerifyingEmail] = useState(false);
    const [verifyingPhone, setVerifyingPhone] = useState(false);
    const [sendingEmailOtp, setSendingEmailOtp] = useState(false);
    const [sendingPhoneOtp, setSendingPhoneOtp] = useState(false);
    const [emailTimer, setEmailTimer] = useState(0);
    const [phoneTimer, setPhoneTimer] = useState(0);

    // Timers
    useEffect(() => {
        if (emailTimer <= 0) return;
        const t = setInterval(() => setEmailTimer(p => p - 1), 1000);
        return () => clearInterval(t);
    }, [emailTimer]);
    useEffect(() => {
        if (phoneTimer <= 0) return;
        const t = setInterval(() => setPhoneTimer(p => p - 1), 1000);
        return () => clearInterval(t);
    }, [phoneTimer]);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const reset = () => {
        setFormData(emptyForm);
        setSelectedFiles([]);
        setEmailOtp(""); setPhoneOtp("");
        setEmailVerified(false); setPhoneVerified(false);
        setEmailOtpSent(false); setPhoneOtpSent(false);
        setEmailTimer(0); setPhoneTimer(0);
    };

    const handleClose = () => { reset(); onClose(); };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "emailId") { setEmailVerified(false); setEmailOtpSent(false); }
        if (name === "mobileNumber") { setPhoneVerified(false); setPhoneOtpSent(false); }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // OTP handlers
    const sendEmailOtp = async () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
            toast({ title: "Validation Error", description: "Enter a valid email first.", variant: "destructive" }); return;
        }
        setSendingEmailOtp(true);
        try {
            const res = await verifyApi.sendEmailOtp(formData.emailId);
            if (res.success) { setEmailOtpSent(true); setEmailTimer(60); toast({ title: "OTP Sent", description: "Email OTP sent!" }); }
            else toast({ title: "Error", description: res.message || "Failed to send OTP.", variant: "destructive" });
        } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
        finally { setSendingEmailOtp(false); }
    };

    const confirmEmailOtp = async () => {
        if (!emailOtp) return;
        setVerifyingEmail(true);
        try {
            const res = await verifyApi.verifyEmailOtp(formData.emailId, emailOtp);
            if (res.success) { setEmailVerified(true); setEmailOtpSent(false); toast({ title: "Verified", description: "Email verified!" }); }
            else toast({ title: "Error", description: res.message || "Invalid OTP.", variant: "destructive" });
        } finally { setVerifyingEmail(false); }
    };

    const sendPhoneOtp = async () => {
        if (!/^[0-9]{10,15}$/.test(formData.mobileNumber.replace(/[^0-9]/g, ""))) {
            toast({ title: "Validation Error", description: "Enter a valid mobile number first.", variant: "destructive" }); return;
        }
        setSendingPhoneOtp(true);
        try {
            const res = await verifyApi.sendPhoneOtp(formData.mobileNumber);
            if (res.success) { setPhoneOtpSent(true); setPhoneTimer(60); toast({ title: "OTP Sent", description: "WhatsApp OTP sent!" }); }
            else toast({ title: "Error", description: res.message || "Failed to send OTP.", variant: "destructive" });
        } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
        finally { setSendingPhoneOtp(false); }
    };

    const confirmPhoneOtp = async () => {
        if (!phoneOtp) return;
        setVerifyingPhone(true);
        try {
            const res = await verifyApi.verifyPhoneOtp(formData.mobileNumber, phoneOtp);
            if (res.success) { setPhoneVerified(true); setPhoneOtpSent(false); toast({ title: "Verified", description: "Mobile verified!" }); }
            else toast({ title: "Error", description: res.message || "Invalid OTP.", variant: "destructive" });
        } finally { setVerifyingPhone(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailVerified || !phoneVerified) {
            toast({ title: "Verification Required", description: "Please verify both email and mobile number.", variant: "destructive" }); return;
        }
        setIsSubmitting(true);
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([k, v]) => data.append(k, v));
            selectedFiles.forEach(f => data.append("documents", f));
            const res = await msmePmsSchemeApi.submit(data);
            if (res.success) {
                toast({ title: "Success", description: "Application submitted successfully!" });
                reset(); onClose();
            } else {
                toast({ title: "Error", description: res.message || "Submission failed.", variant: "destructive" });
            }
        } catch (e) {
            toast({ title: "Error", description: "An error occurred. Please try again.", variant: "destructive" });
        } finally { setIsSubmitting(false); }
    };

    if (!open) return null;

    const iClass = "h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3";
    const lClass = "text-[9px] font-black text-slate-600 uppercase tracking-tight";

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto z-10">
                {/* Header */}
                <div className="sticky top-0 z-20 bg-gradient-to-r from-[#064420] to-[#0a5a2a] px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <div>
                        <h2 className="text-lg font-black text-white uppercase tracking-wide">Apply for PMS Scheme – IHWE 2026</h2>
                        <p className="text-[10px] text-white/70 uppercase tracking-widest mt-0.5 font-bold">
                            9th Edition · International Health & Wellness Expo 2026
                        </p>
                    </div>
                    <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Left sidebar */}
                    {/* <div className="lg:col-span-3 bg-[#f9fafb] border-r border-slate-100 p-6 flex flex-col gap-4">
                        <div>
                            <h3 className="text-[15px] font-black text-[#1a3615] leading-tight mb-1">Claim Your Subsidy</h3>
                            <div className="flex gap-1.5 mb-3">
                                <div className="w-6 h-[2px] bg-[#1a3615]" /><div className="w-12 h-[2px] bg-orange-200" />
                            </div>
                            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                                Grow your business at IHWE 2026 with financial support under the MSME PMS Scheme.
                            </p>
                        </div>

                        <div className="bg-[#fdf8f1] rounded-xl p-4 border border-orange-100">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 bg-[#1a3615] rounded-full flex items-center justify-center text-yellow-400 text-[8px] font-black">!</div>
                                <span className="text-[9px] font-black text-[#1a3615] uppercase tracking-wider">Important Note</span>
                            </div>
                            <p className="text-[10px] text-slate-700 font-bold leading-relaxed">
                                Final subsidy approval and amount is subject to MSME PMS scheme guidelines and ministry approval.
                            </p>
                        </div>

                        <div className="bg-[#0b1d09] rounded-xl p-4 flex flex-col items-center text-center mt-auto">
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mb-2 text-yellow-400">
                                <Phone size={15} />
                            </div>
                            <h4 className="text-[13px] font-black text-white mb-0.5">Need Help?</h4>
                            <p className="text-[9px] text-white/50 font-bold mb-3 uppercase tracking-tighter">Our team is here to assist</p>
                            <p className="text-[12px] font-black text-white">+91 9654900525</p>
                            <p className="text-[11px] font-bold text-white/60 mb-3">info@ihwe.in</p>
                            <Link to="/contact" onClick={handleClose} className="w-full">
                                <Button variant="outline" className="w-full border-yellow-400/50 text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-[#1a3615] font-black text-[8px] uppercase tracking-[0.2em] h-7 rounded-md transition-all">
                                    CONTACT US
                                </Button>
                            </Link>
                        </div>
                    </div> */}

                    {/* Form */}
                    <div className="lg:col-span-12 p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Row 1 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div className="space-y-1">
                                    <label className={lClass}>Company / Org. Name <span className="text-red-500">*</span></label>
                                    <Input name="companyName" value={formData.companyName} onChange={handleInput} required className={iClass} placeholder="Company name" />
                                </div>
                                <div className="space-y-1">
                                    <label className={lClass}>Contact Person <span className="text-red-500">*</span></label>
                                    <Input name="contactPerson" value={formData.contactPerson} onChange={handleInput} required className={iClass} placeholder="Full name" />
                                </div>
                                {/* Mobile + OTP */}
                                <div className="space-y-1">
                                    <label className={lClass}>Mobile Number <span className="text-red-500">*</span></label>
                                    <div className="relative flex items-center">
                                        <Input name="mobileNumber" value={formData.mobileNumber} onChange={handleInput} required type="tel"
                                            disabled={phoneVerified || phoneOtpSent}
                                            className={`${iClass} pr-20 ${phoneVerified ? "bg-green-50 border-green-200 text-green-700" : ""}`}
                                            placeholder="Mobile number" />
                                        {!phoneVerified && (
                                            <button type="button" onClick={sendPhoneOtp} disabled={sendingPhoneOtp || !formData.mobileNumber || phoneTimer > 0}
                                                className="absolute right-1 px-2 py-1 bg-[#1a3615] text-white text-[8px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#0a2008] disabled:bg-slate-200 transition-all">
                                                {sendingPhoneOtp ? "..." : phoneTimer > 0 ? `${phoneTimer}s` : phoneOtpSent ? "Resend" : "Send OTP"}
                                            </button>
                                        )}
                                        {phoneVerified && <CheckCircle2 size={13} className="absolute right-2 text-green-500" />}
                                    </div>
                                </div>
                                {/* Email + OTP */}
                                <div className="space-y-1">
                                    <label className={lClass}>Email ID <span className="text-red-500">*</span></label>
                                    <div className="relative flex items-center">
                                        <Input name="emailId" value={formData.emailId} onChange={handleInput} required type="email"
                                            disabled={emailVerified || emailOtpSent}
                                            className={`${iClass} pr-20 ${emailVerified ? "bg-green-50 border-green-200 text-green-700" : ""}`}
                                            placeholder="Email address" />
                                        {!emailVerified && (
                                            <button type="button" onClick={sendEmailOtp} disabled={sendingEmailOtp || !formData.emailId || emailTimer > 0}
                                                className="absolute right-1 px-2 py-1 bg-[#1a3615] text-white text-[8px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#0a2008] disabled:bg-slate-200 transition-all">
                                                {sendingEmailOtp ? "..." : emailTimer > 0 ? `${emailTimer}s` : emailOtpSent ? "Resend" : "Send OTP"}
                                            </button>
                                        )}
                                        {emailVerified && <CheckCircle2 size={13} className="absolute right-2 text-green-500" />}
                                    </div>
                                </div>
                            </div>

                            {/* OTP inputs */}
                            {((phoneOtpSent && !phoneVerified) || (emailOtpSent && !emailVerified)) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-orange-50/30 border border-orange-100 rounded-md">
                                    {phoneOtpSent && !phoneVerified && (
                                        <div className="space-y-1">
                                            <label className={lClass}>WhatsApp OTP <span className="text-red-500">*</span></label>
                                            <div className="flex gap-2">
                                                <Input value={phoneOtp} onChange={e => setPhoneOtp(e.target.value)} placeholder="Enter OTP" maxLength={6}
                                                    className="h-8 border-slate-200 rounded-md text-[11px] font-bold px-3 text-center tracking-widest" />
                                                <Button type="button" onClick={confirmPhoneOtp} disabled={verifyingPhone || !phoneOtp}
                                                    className="h-8 bg-[#1a3615] text-white text-[10px] font-bold uppercase rounded-md px-4 shrink-0">
                                                    {verifyingPhone ? "..." : "Verify"}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    {emailOtpSent && !emailVerified && (
                                        <div className="space-y-1">
                                            <label className={lClass}>Email OTP <span className="text-red-500">*</span></label>
                                            <div className="flex gap-2">
                                                <Input value={emailOtp} onChange={e => setEmailOtp(e.target.value)} placeholder="Enter OTP" maxLength={6}
                                                    className="h-8 border-slate-200 rounded-md text-[11px] font-bold px-3 text-center tracking-widest" />
                                                <Button type="button" onClick={confirmEmailOtp} disabled={verifyingEmail || !emailOtp}
                                                    className="h-8 bg-[#1a3615] text-white text-[10px] font-bold uppercase rounded-md px-4 shrink-0">
                                                    {verifyingEmail ? "..." : "Verify"}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Row 2 */}
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                                <div className="space-y-1">
                                    <label className={lClass}>Udyam Reg. Number <span className="text-red-500">*</span></label>
                                    <Input name="udyamNumber" value={formData.udyamNumber} onChange={handleInput} required className={iClass} placeholder="Udyam number" />
                                </div>
                                <div className="space-y-1">
                                    <label className={lClass}>GST Number</label>
                                    <Input name="gstNumber" value={formData.gstNumber} onChange={handleInput} className={iClass} placeholder="GST number" />
                                </div>
                                <div className="lg:col-span-2 space-y-1">
                                    <label className={lClass}>Product / Service Category <span className="text-red-500">*</span></label>
                                    <Select required value={formData.category} onValueChange={v => setFormData(p => ({ ...p, category: v }))}>
                                        <SelectTrigger className={iClass}><SelectValue placeholder="Select category" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ayurveda">Ayurveda & Herbal</SelectItem>
                                            <SelectItem value="wellness">Wellness & Fitness</SelectItem>
                                            <SelectItem value="organic">Organic Food</SelectItem>
                                            <SelectItem value="pharma">Pharma & Nutraceuticals</SelectItem>
                                            <SelectItem value="personal">Personal Care</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Row 3: Brief + Upload */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-1 flex flex-col">
                                    <label className={lClass}>Brief About Your Company / Products <span className="text-red-500">*</span></label>
                                    <Textarea name="companyBrief" value={formData.companyBrief} onChange={handleInput} required
                                        className="flex-1 min-h-[90px] bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-medium p-3" placeholder="Write here..." />
                                </div>
                                <div className="space-y-1 flex flex-col">
                                    <label className={lClass}>Upload Documents <span className="text-red-500">*</span></label>
                                    <input type="file" ref={fileInputRef} onChange={e => e.target.files && setSelectedFiles(Array.from(e.target.files))}
                                        className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" />
                                    <div onClick={() => fileInputRef.current?.click()}
                                        onDragOver={e => e.preventDefault()}
                                        onDrop={e => { e.preventDefault(); e.dataTransfer.files && setSelectedFiles(Array.from(e.dataTransfer.files)); }}
                                        className="flex-1 border border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center bg-[#f9fafb] hover:bg-slate-50 cursor-pointer group p-3 min-h-[90px]">
                                        <Upload size={18} className="text-slate-400 mb-1 group-hover:text-[#1a3615] transition-colors" />
                                        <p className="text-[10px] font-black text-slate-700">
                                            {selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : "Drag & drop or click to browse"}
                                        </p>
                                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">PDF, JPG, PNG · Max 10MB each</p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1 border-t border-slate-100">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox id="modal-terms" required className="w-3.5 h-3.5 border-slate-300" />
                                    <span className="text-[10px] font-bold text-slate-500">
                                        I agree to the <Link to="/terms-of-service" onClick={handleClose} className="text-[#1a3615] underline">Terms & Conditions</Link> and <Link to="/privacy-policy" onClick={handleClose} className="text-[#1a3615] underline">Privacy Policy</Link>
                                    </span>
                                </label>
                                <Button type="submit" disabled={isSubmitting}
                                    className="sm:ml-auto h-10 px-8 bg-[#1a3615] hover:bg-[#0d2209] text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-md shadow-lg flex items-center gap-2">
                                    {isSubmitting ? "PROCESSING..." : <><span>SUBMIT APPLICATION</span><ArrowRight size={13} /></>}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PmsApplicationModal;
