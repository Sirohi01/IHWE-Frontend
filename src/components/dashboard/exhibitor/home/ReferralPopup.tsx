import { useState } from 'react';
import { X, Gift, Building2, User, Phone, Mail, Tag, PenLine, ShieldCheck, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import exbanImg from '@/assets/exban.webp';
import extopImg from '@/assets/extop.webp';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { api, otpApi } from '@/lib/api';

export default function ReferralPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [step, setStep] = useState(1); // 1 = form, 2 = success
    const [loading, setLoading] = useState(false);
    
    // Field States
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        mobileNumber: '',
        emailId: '',
        category: '',
        remarks: ''
    });

    const [otpData, setOtpData] = useState({ mobileOtp: '', emailOtp: '' });

    // OTP Flow States
    const [mobileState, setMobileState] = useState<'idle' | 'sent' | 'verified'>('idle');
    const [emailState, setEmailState] = useState<'idle' | 'sent' | 'verified'>('idle');
    
    const [mobileLoading, setMobileLoading] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtpData({ ...otpData, [e.target.name]: e.target.value });
    };

    // --- MOBILE OTP ---
    const sendMobileOtp = async () => {
        if (!formData.contactPerson) {
            toast.error("Please enter Contact Person first");
            return;
        }
        if (formData.mobileNumber.length < 10) {
            toast.error("Enter a valid 10-digit mobile number");
            return;
        }
        setMobileLoading(true);
        try {
            const data = await otpApi.request(formData.mobileNumber, 'phone', formData.contactPerson, 'EXHIBITOR');
            if (data.success) {
                toast.success("Mobile OTP sent!");
                setMobileState('sent');
            } else {
                throw new Error(data.message || "Failed to send OTP");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to send Mobile OTP");
        } finally {
            setMobileLoading(false);
        }
    };

    const verifyMobileOtp = async () => {
        if (!otpData.mobileOtp || otpData.mobileOtp.length !== 6) {
            toast.error("Enter 6-digit Mobile OTP");
            return;
        }
        setMobileLoading(true);
        try {
            const data = await otpApi.verify(formData.mobileNumber, otpData.mobileOtp, 'phone');
            if (data.success) {
                toast.success("Mobile Number Verified!");
                setMobileState('verified');
            } else {
                throw new Error(data.message || "Invalid Mobile OTP");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to verify Mobile OTP");
        } finally {
            setMobileLoading(false);
        }
    };

    // --- EMAIL OTP ---
    const sendEmailOtp = async () => {
        if (!formData.contactPerson) {
            toast.error("Please enter Contact Person first");
            return;
        }
        if (!formData.emailId || !formData.emailId.includes('@')) {
            toast.error("Enter a valid email address");
            return;
        }
        setEmailLoading(true);
        try {
            const data = await otpApi.request(formData.emailId, 'email', formData.contactPerson, 'EXHIBITOR');
            if (data.success) {
                toast.success("Email OTP sent!");
                setEmailState('sent');
            } else {
                throw new Error(data.message || "Failed to send OTP");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to send Email OTP");
        } finally {
            setEmailLoading(false);
        }
    };

    const verifyEmailOtp = async () => {
        if (!otpData.emailOtp || otpData.emailOtp.length !== 6) {
            toast.error("Enter 6-digit Email OTP");
            return;
        }
        setEmailLoading(true);
        try {
            const data = await otpApi.verify(formData.emailId, otpData.emailOtp, 'email');
            if (data.success) {
                toast.success("Email Verified!");
                setEmailState('verified');
            } else {
                throw new Error(data.message || "Invalid Email OTP");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to verify Email OTP");
        } finally {
            setEmailLoading(false);
        }
    };

    // --- FINAL SUBMIT ---
    const submitReferral = async () => {
        if (!formData.companyName || !formData.contactPerson || !formData.mobileNumber) {
            toast.error("Please fill all required fields");
            return;
        }
        if (mobileState !== 'verified') {
            toast.error("Please verify Mobile Number first");
            return;
        }
        if (formData.emailId && emailState !== 'verified') {
            toast.error("Please verify Email ID first");
            return;
        }

        setLoading(true);
        try {
            const submitRes = await api.post('/api/referrals', formData);
            const submitData = submitRes.data;
            if (submitData.success) {
                toast.success("Referral submitted successfully!");
                setStep(2); // Success step
                setTimeout(() => {
                    handleClose();
                }, 3000);
            } else {
                throw new Error(submitData.message || "Failed to submit");
            }
        } catch (error: any) {
            toast.error(error.message || "Submission failed");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setFormData({ companyName: '', contactPerson: '', mobileNumber: '', emailId: '', category: '', remarks: '' });
        setOtpData({ mobileOtp: '', emailOtp: '' });
        setMobileState('idle');
        setEmailState('idle');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-[650px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[480px] font-inter"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-2.5 right-2.5 z-10 w-6 h-6 flex items-center justify-center bg-black text-white rounded-full hover:bg-red-600 shadow-md transition-colors"
                        >
                            <X size={12} />
                        </button>

                        {/* Main Content Area */}
                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                            {/* Left Side: Image */}
                            <div className="hidden md:flex w-[46%] shrink-0 relative bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
                                <img loading="lazy" decoding="async" src="/logo.png" alt="Logo" className="absolute top-3 left-3 z-10 h-8 w-auto drop-shadow-md" />
                                <img loading="lazy" decoding="async" src={exbanImg}
                                    alt="Refer and Earn"
                                    className="w-full h-full object-fill object-center"
                                />
                            </div>

                            {/* Right Side */}
                            <div className="w-full md:w-[54%] flex flex-col bg-white">
                                <img loading="lazy" decoding="async" src={extopImg} alt="Earn 10% Referral Bonus" className="w-[88%] mx-auto h-auto object-contain shrink-0 mt-0.5" />

                                <div className="px-3 pb-2 pt-1 flex flex-col gap-1.5 flex-1 font-inter overflow-hidden">
                                    {step === 1 ? (
                                        <div className="flex flex-col gap-1.5 h-full">
                                            <div className="grid grid-cols-2 gap-1.5">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-black mb-0.5">Company Name <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <Building2 size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                                        <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Enter Company Name" className="w-full pl-6 pr-2 py-1 text-[11px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-black mb-0.5">Contact Person <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <User size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                                        <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} placeholder="Enter Contact Person" className="w-full pl-6 pr-2 py-1 text-[11px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* MOBILE NUMBER FIELD with Inline OTP */}
                                            <div>
                                                <label className="block text-[10px] font-bold text-black mb-0.5">Mobile Number <span className="text-red-500">*</span></label>
                                                {mobileState === 'sent' ? (
                                                    <div className="flex gap-1.5">
                                                        <input type="text" name="mobileOtp" value={otpData.mobileOtp} onChange={handleOtpChange} placeholder="Enter Mobile OTP" className="flex-1 px-3 py-1 text-[11px] text-center tracking-widest border border-green-300 bg-green-50 rounded-lg focus:ring-1 focus:ring-green-600 outline-none" maxLength={6} />
                                                        <button onClick={verifyMobileOtp} disabled={mobileLoading} className="bg-green-700 text-white px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-green-800 transition-colors w-[60px] flex justify-center items-center shrink-0">
                                                            {mobileLoading ? <Loader2 size={12} className="animate-spin" /> : 'Verify'}
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-1.5">
                                                        <div className={`flex-1 flex border ${mobileState === 'verified' ? 'border-green-500 bg-green-50/30' : 'border-gray-200'} rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-green-600/30 focus-within:border-green-600`}>
                                                            <div className="bg-gray-50 px-1.5 flex items-center border-r border-gray-200 gap-1">
                                                                <Phone size={11} className="text-green-700" />
                                                                <span className="text-[11px] font-semibold text-gray-700">+91</span>
                                                            </div>
                                                            <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="Mobile Number" disabled={mobileState === 'verified'} className="w-full px-2 py-1 text-[11px] outline-none bg-transparent" maxLength={10} />
                                                        </div>
                                                        {mobileState === 'verified' ? (
                                                            <div className="w-[60px] bg-green-100 text-green-700 border border-green-200 rounded-lg flex items-center justify-center shrink-0">
                                                                <CheckCircle2 size={14} />
                                                            </div>
                                                        ) : (
                                                            <button onClick={sendMobileOtp} disabled={mobileLoading} className="bg-gray-800 text-white px-2 py-1 rounded-lg text-[10px] font-bold hover:bg-gray-900 transition-colors w-[60px] flex justify-center items-center shrink-0">
                                                                {mobileLoading ? <Loader2 size={12} className="animate-spin" /> : 'Get OTP'}
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* EMAIL ID FIELD with Inline OTP */}
                                            <div>
                                                <label className="block text-[10px] font-bold text-black mb-0.5">Email ID</label>
                                                {emailState === 'sent' ? (
                                                    <div className="flex gap-1.5">
                                                        <input type="text" name="emailOtp" value={otpData.emailOtp} onChange={handleOtpChange} placeholder="Enter Email OTP" className="flex-1 px-3 py-1 text-[11px] text-center tracking-widest border border-green-300 bg-green-50 rounded-lg focus:ring-1 focus:ring-green-600 outline-none" maxLength={6} />
                                                        <button onClick={verifyEmailOtp} disabled={emailLoading} className="bg-green-700 text-white px-3 py-1 rounded-lg text-[10px] font-bold hover:bg-green-800 transition-colors w-[60px] flex justify-center items-center shrink-0">
                                                            {emailLoading ? <Loader2 size={12} className="animate-spin" /> : 'Verify'}
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-1.5">
                                                        <div className={`flex-1 relative ${emailState === 'verified' ? 'bg-green-50/30 border-green-500' : 'border-gray-200'}`}>
                                                            <Mail size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                                            <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} placeholder="Enter Email Address" disabled={emailState === 'verified'} className={`w-full pl-6 pr-2 py-1 text-[11px] border ${emailState === 'verified' ? 'border-green-500' : 'border-gray-200'} rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none bg-transparent`} />
                                                        </div>
                                                        {emailState === 'verified' ? (
                                                            <div className="w-[60px] bg-green-100 text-green-700 border border-green-200 rounded-lg flex items-center justify-center shrink-0">
                                                                <CheckCircle2 size={14} />
                                                            </div>
                                                        ) : (
                                                            <button onClick={sendEmailOtp} disabled={emailLoading || !formData.emailId} className="bg-gray-800 text-white px-2 py-1 rounded-lg text-[10px] font-bold hover:bg-gray-900 transition-colors w-[60px] flex justify-center items-center shrink-0 disabled:opacity-50">
                                                                {emailLoading ? <Loader2 size={12} className="animate-spin" /> : 'Get OTP'}
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-black mb-0.5">Product / Service Category</label>
                                                <div className="relative">
                                                    <Tag size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full pl-6 pr-5 py-1 text-[11px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none appearance-none text-black">
                                                        <option value="">Select Category</option>
                                                        <option value="nutrition">Nutrition & Superfoods</option>
                                                        <option value="equipment">Healthcare Equipment</option>
                                                        <option value="wellness">Wellness Services</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-end mb-0.5">
                                                    <label className="block text-[10px] font-bold text-black">Remarks <span className="text-gray-400 font-normal">(Optional)</span></label>
                                                    <span className="text-[9px] text-gray-400">{formData.remarks.length}/300</span>
                                                </div>
                                                <div className="relative">
                                                    <PenLine size={11} className="absolute left-2 top-2 text-green-700 pointer-events-none" />
                                                    <textarea rows={1} name="remarks" value={formData.remarks} onChange={handleInputChange} maxLength={300} placeholder="Write your comments here..." className="w-full pl-6 pr-2 py-1 text-[11px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none resize-none" />
                                                </div>
                                            </div>

                                            <div className="bg-[#fff9e6] border border-[#f5ebcc] rounded-lg px-2 py-1 flex gap-1.5 items-center mt-auto">
                                                <div className="bg-green-700 rounded-full p-0.5 shrink-0">
                                                    <ShieldCheck size={11} className="text-white" />
                                                </div>
                                                <p className="text-[9px] text-gray-900 font-bold leading-tight">
                                                    Bonus applicable only on <span className="font-bold text-green-800">new clients</span>, after <span className="font-bold text-green-800">payment realization</span> &amp; <span className="font-bold text-green-800">verification</span>.
                                                </p>
                                            </div>

                                            <div className="flex justify-start items-center gap-2 mt-1 pt-1.5 border-t border-gray-100">
                                                <button onClick={handleClose} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors shrink-0">
                                                    <span className="text-[10px] font-bold">Cancel</span>
                                                </button>
                                                <button onClick={submitReferral} disabled={loading || mobileState !== 'verified'} className="flex-1 bg-gradient-to-r from-[#011e08] to-[#327808] hover:from-[#2a6807] hover:to-[#013e09] text-white py-1.5 px-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed">

                                                    {loading ? <Loader2 size={14} className="animate-spin" /> : (
                                                        <>
                                                            <span className="text-[11px] font-bold tracking-wide">SUBMIT REFERRAL</span>
                                                            <ArrowRight size={14} />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                                    <CheckCircle2 size={32} className="text-green-600" />
                                                </div>
                                            </motion.div>
                                            <h3 className="text-lg font-bold text-gray-900 text-center">Referral Submitted!</h3>
                                            <p className="text-xs text-gray-500 text-center px-4">Thank you! Your referral has been recorded successfully. A confirmation message has been sent to your mobile.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-[#13291a] py-2 px-5 flex items-center justify-start shrink-0 w-full">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck size={11} className="text-[#f5c300]" />
                                <span className="text-[9px] font-bold text-white tracking-widest">YOUR TRUST. OUR PROMISE.</span>
                            </div>
                            <div className="h-3 w-[1px] bg-white/30 mx-5"></div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#f5c300]" /><span className="text-[9px] font-bold text-white tracking-widest">SECURE</span></div>
                                <div className="h-3 w-[1px] bg-white/30"></div>
                                <div className="flex items-center gap-1"><ShieldCheck size={12} className="text-[#f5c300]" /><span className="text-[9px] font-bold text-white tracking-widest">TRANSPARENT</span></div>
                                <div className="h-3 w-[1px] bg-white/30"></div>
                                <div className="flex items-center gap-1">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5c300]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                    <span className="text-[9px] font-bold text-white tracking-widest">VERIFIED</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}