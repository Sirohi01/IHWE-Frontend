import React, { useState } from 'react';
import {
    Mail, LogIn, UserPlus,
    Calendar, Users, Sparkles, Bell, HelpCircle,
    CheckCircle2, Building2, Smartphone, ShieldCheck, Store, ArrowRight,
    Leaf, Headset, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DelegatesImage from '../assets/DelegateLogi.jpeg';
import persons from '../assets/logo4.png'
import Swal from 'sweetalert2';



const DelegatesLogin = () => {
    const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
    const [isLoading, setIsLoading] = useState(false);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [otpSent, setOtpSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        mobile: '',
        otp: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!otpSent) {
            // VALIDATION
            if (loginMethod === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    setError('Please enter a valid email address.');
                    return;
                }
            } else {
                if (formData.mobile.length !== 10) {
                    setError('Please enter a valid 10-digit mobile number.');
                    return;
                }
            }

            setIsLoading(true);
            // Simulate OTP sending
            setTimeout(() => {
                setIsLoading(false);
                setOtpSent(true);
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Sent!',
                    text: `A verification code has been sent to your ${loginMethod}.`,
                    timer: 2000,
                    showConfirmButton: false,
                    position: 'top-end',
                    toast: true,
                    timerProgressBar: true,
                });
            }, 1000);
        } else {
            // OTP VALIDATION
            if (formData.otp.length !== 6) {
                setError('Please enter a valid 6-digit OTP.');
                return;
            }

            setIsLoading(true);
            // Simulate Final Login
            setTimeout(() => {
                console.log("Form Data Submitted:", formData);
                setIsLoading(false);
                // Reset form after successful simulation
                setFormData({ email: '', mobile: '', otp: '' });
                setOtpSent(false);

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome to IHWE 2026 Delegates Portal.',
                    confirmButtonColor: '#2f7d32',
                    customClass: {
                        popup: 'rounded-[24px]',
                        confirmButton: 'rounded-xl px-8 py-2.5 text-sm font-bold uppercase tracking-wider'
                    }
                });
            }, 1500);
        }
    };

    return (
        <div className="h-screen bg-[#f3f4f6] flex items-center justify-center p-2 overflow-hidden">
            <div className="w-[80%] max-w-[1200px] h-[88vh] bg-white rounded-[22px] shadow-[0_8px_26px_rgba(0,0,0,0.05)] overflow-hidden flex">

                {/* LEFT */}
                <div className="relative w-[56%] bg-[#f8fbf7] overflow-hidden border-r border-[#edf1ed] pl-4 py-3">

                    {/* BACKGROUND IMAGE */}
                    <div
                        className="absolute inset-0 bg-no-repeat"
                        style={{
                            backgroundImage: `url(${DelegatesImage})`,
                            backgroundSize: "70%",
                            backgroundPosition: "right bottom"
                        }}
                    />

                    {/* LIGHT OVERLAY */}
                    <div className="absolute inset-0 bg-white/5"></div>

                    {/* CONTENT */}
                    <div className="relative z-10 h-full flex flex-col px-7 pt-5 pb-5">

                        {/* LOGO */}
                        <img
                            src="/logo.png"
                            alt="logo"
                            className="h-[72px] w-fit object-contain mb-8"
                        />

                        {/* TITLE */}
                        <div>
                            <h1 className="text-[30px] leading-[35px] font-black text-[#1f5f2c] tracking-[-0.5px]">
                                IHWE DELEGATE PORTAL
                            </h1>

                            <p className="mt-2 text-[10px] font-bold tracking-[2.5px] uppercase text-[#5d6470]">
                                YOUR EVENT. YOUR EXPERIENCE.
                            </p>

                            <div className="w-12 h-[3px] rounded-full bg-[#2f7d32] mt-4"></div>
                        </div>

                        {/* WELCOME TEXT */}
                        <div className="mt-8 max-w-[320px]">

                            <h3
                                className="text-[34px] leading-none text-[#3d7c29]"
                                style={{ fontFamily: "'Dancing Script', cursive" }}
                            >
                                Welcome!
                            </h3>

                            <h2 className="mt-2 text-[40px] leading-[48px] font-black tracking-[-2px] text-[#0e2c1d]">
                                Let’s make
                                <br />
                                wellness happen
                            </h2>

                            <p className="mt-4 text-[13px] leading-[24px] text-[#5f6368] font-medium">
                                Log in to access your agenda, sessions,
                                exhibitors, networking opportunities
                                and more.
                            </p>
                        </div>

                        {/* BOTTOM FEATURES */}
                        <div className="mt-auto">

                            <div className="bg-[#0d4a1a] rounded-[18px] px-5 py-4 shadow-xl">

                                <div className="grid grid-cols-4 gap-4">

                                    {[
                                        {
                                            icon: Calendar,
                                            title: "Personalized Schedule",
                                            desc: "Access your agenda and never miss a session."
                                        },
                                        {
                                            icon: Users,
                                            title: "Network & Connect",
                                            desc: "Connect with speakers, attendees & professionals."
                                        },
                                        {
                                            icon: Building2,
                                            title: "Explore & Discover",
                                            desc: "Browse exhibitors and discover new solutions."
                                        },
                                        {
                                            icon: Bell,
                                            title: "Stay Updated",
                                            desc: "Get real-time notifications and event updates."
                                        }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3">

                                            {/* ICON */}
                                            <div className="min-w-[34px] h-[34px] rounded-full bg-[#4c9337] flex items-center justify-center shadow-md">
                                                <item.icon className="w-3.5 h-3.5 text-white" />
                                            </div>

                                            {/* TEXT */}
                                            <div>
                                                <h4 className="text-white text-[9px] font-bold leading-[13px]">
                                                    {item.title}
                                                </h4>

                                                <p className="mt-1 text-[#d6ead4] text-[8px] leading-[12px]">
                                                    {item.desc}
                                                </p>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>                {/* RIGHT */}
                <div className="w-[44%] bg-white flex items-center justify-center px-6 py-6">

                    <div className="w-full max-w-[380px] scale-[0.98] origin-center">

                        {/* TOP ICON */}
                        <div className="flex justify-center mb-3">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-[64px] h-[64px] rounded-full bg-[#f0f9ef] flex items-center justify-center border border-[#e2f2e0] shadow-sm"
                            >
                                <img
                                    src={persons}
                                    alt="persons"
                                    className="w-[90px] h-[90px] object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* TITLE */}
                        <div className="text-center mb-4">
                            <h2 className="text-[24px] font-black text-[#0e2c1d] tracking-tight leading-tight">
                                Delegates Login
                            </h2>
                            <p className="mt-1 text-[11px] text-[#64748b] font-medium max-w-[280px] mx-auto leading-relaxed">
                                Enter your details to receive a secure OTP
                            </p>
                        </div>

                        {/* TABS */}
                        <div className="w-full bg-[#f8fafc] rounded-xl p-1.5 flex mb-4 border border-[#e2e8f0] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                            <button
                                type="button"
                                onClick={() => { setLoginMethod('email'); setOtpSent(false); setError(null); }}
                                className={`flex-1 h-[36px] rounded-lg text-[10px] font-bold transition-all duration-300 ${loginMethod === 'email' ? 'bg-white shadow-md text-[#2f7d32] border border-[#e2e8f0]' : 'text-[#94a3b8] hover:text-[#64748b]'}`}
                            >
                                EMAIL LOGIN
                            </button>

                            <button
                                type="button"
                                onClick={() => { setLoginMethod('mobile'); setOtpSent(false); setError(null); }}
                                className={`flex-1 h-[36px] rounded-lg text-[10px] font-bold transition-all duration-300 ${loginMethod === 'mobile' ? 'bg-white shadow-md text-[#2f7d32] border border-[#e2e8f0]' : 'text-[#94a3b8] hover:text-[#64748b]'}`}
                            >
                                MOBILE LOGIN
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <AnimatePresence mode="wait">
                                {loginMethod === 'email' ? (
                                    <motion.div
                                        key="email"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-end gap-2">
                                            {/* EMAIL ADDRESS */}
                                            <div className="flex-1">
                                                <label className="block mb-1.5 text-[9px] font-bold uppercase tracking-wider text-[#334155]">
                                                    Email Address
                                                </label>
                                                <div className="relative group">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94a3b8] group-focus-within:text-[#2f7d32] transition-colors" />
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder="e.g. name@company.com"
                                                        className="w-full h-[40px] border border-[#e2e8f0] rounded-xl pl-11 pr-4 text-[11px] bg-[#fdfdfd] outline-none focus:border-[#2f7d32] focus:ring-4 focus:ring-[#2f7d32]/5 transition-all placeholder:text-[#cbd5e1] font-medium"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {otpSent && (
                                                <motion.div
                                                    initial={{ opacity: 0, width: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, width: 'auto', scale: 1 }}
                                                    className="w-[120px]"
                                                >
                                                    <label className="block mb-1.5 text-[9px] font-bold uppercase tracking-wider text-[#2f7d32]">
                                                        Enter OTP
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        maxLength={6}
                                                        placeholder="••••••"
                                                        className="w-full h-[40px] border border-[#2f7d32]/30 border-2 rounded-xl text-center tracking-[0.2em] text-[13px] bg-[#f0f9ef]/30 outline-none focus:border-[#2f7d32] focus:ring-4 focus:ring-[#2f7d32]/5 font-black transition-all"
                                                        value={formData.otp}
                                                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="mobile"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-end gap-2">
                                            {/* MOBILE NUMBER */}
                                            <div className="flex-1">
                                                <label className="block mb-1.5 text-[9px] font-bold uppercase tracking-wider text-[#334155]">
                                                    Mobile Number
                                                </label>
                                                <div className="relative group">
                                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94a3b8] group-focus-within:text-[#2f7d32] transition-colors" />
                                                    <input
                                                        type="tel"
                                                        required
                                                        maxLength={10}
                                                        placeholder="Enter your 10-digit mobile"
                                                        className="w-full h-[40px] border border-[#e2e8f0] rounded-xl pl-11 pr-4 text-[11px] bg-[#fdfdfd] outline-none focus:border-[#2f7d32] focus:ring-4 focus:ring-[#2f7d32]/5 transition-all placeholder:text-[#cbd5e1] font-medium"
                                                        value={formData.mobile}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/[^0-9]/g, '');
                                                            if (value.length <= 10) {
                                                                setFormData({ ...formData, mobile: value });
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {otpSent && (
                                                <motion.div
                                                    initial={{ opacity: 0, width: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, width: 'auto', scale: 1 }}
                                                    className="w-[120px]"
                                                >
                                                    <label className="block mb-1.5 text-[9px] font-bold uppercase tracking-wider text-[#2f7d32]">
                                                        Enter OTP
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        maxLength={6}
                                                        placeholder="••••••"
                                                        className="w-full h-[40px] border border-[#2f7d32]/30 border-2 rounded-xl text-center tracking-[0.2em] text-[13px] bg-[#f0f9ef]/30 outline-none focus:border-[#2f7d32] focus:ring-4 focus:ring-[#2f7d32]/5 font-black transition-all"
                                                        value={formData.otp}
                                                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* OPTIONS */}
                            <div className="flex items-center justify-between px-1">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer appearance-none w-3.5 h-3.5 border border-[#cbd5e1] rounded bg-white checked:bg-[#2f7d32] checked:border-[#2f7d32] transition-all cursor-pointer"
                                        />
                                        <CheckCircle2 className="absolute w-2.5 h-2.5 text-white scale-0 peer-checked:scale-100 transition-transform left-[2px] pointer-events-none" />
                                    </div>
                                    <span className="text-[10px] text-[#64748b] font-semibold group-hover:text-[#334155] transition-colors">
                                        Keep me logged in
                                    </span>
                                </label>

                                {otpSent && (
                                    <button
                                        type="button"
                                        onClick={() => setOtpSent(false)}
                                        className="text-[#2f7d32] text-[10px] font-bold hover:text-[#256528] transition-colors"
                                    >
                                        Resend OTP?
                                    </button>
                                )}
                            </div>

                            {/* PRIMARY BUTTON */}
                            {/* ERROR MESSAGE */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 flex items-center gap-3"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                                            <X className="w-3 h-3 text-white" />
                                        </div>
                                        <p className="text-[10px] text-red-600 font-bold leading-tight">{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="relative w-full h-[37px] rounded-xl bg-gradient-to-r from-[#2f7d32] to-[#3d8c40] text-white text-[12px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(47,125,50,0.15)] hover:shadow-[0_6px_16px_rgba(47,125,50,0.25)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:translate-y-0"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-3 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span className="uppercase tracking-widest">{!otpSent ? 'Get Verification Code' : 'Verify & Continue'}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </>
                                )}
                            </button>

                            {/* DIVIDER */}
                            <div className="flex items-center gap-3 py-0.5">
                                <div className="flex-1 h-px bg-[#f1f5f9]" />
                                <span className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-[0.1em]">
                                    OR
                                </span>
                                <div className="flex-1 h-px bg-[#f1f5f9]" />
                            </div>

                            {/* SECONDARY ACTION */}
                            <button className="w-full h-[40px] rounded-xl border-2 border-[#f1f5f9] text-[#1e293b] text-[10px] font-extrabold hover:bg-[#f8fafc] hover:border-[#e2e8f0] transition-all flex items-center justify-center gap-2">
                                <UserPlus className="w-3.5 h-3.5 text-[#2f7d32]" />
                                <span>NEW EXHIBITOR? REGISTER NOW</span>
                            </button>

                            {/* BOTTOM INFO CARDS */}
                            <div className="grid grid-cols-1 gap-2 pt-1">
                                {/* HELP */}
                                <div className="bg-[#f8fafc] rounded-xl px-2.5 py-2 flex items-center gap-3 border border-[#f1f5f9] transition-all hover:border-[#2f7d32]/20">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#f1f5f9]">
                                        <Headset className="w-3.5 h-3.5 text-[#2f7d32]" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black text-[#1e293b]">24/7 Support</h4>
                                        <div className="flex items-center gap-1.5 text-[10px] text-[#64748b] font-bold">
                                            <a href="tel:+919654900525" className="hover:text-[#2f7d32] transition-colors">+91-9654900525</a>
                                            <span className="text-[#cbd5e1] font-normal">|</span>
                                            <a href="info@healthwellnessexpo.com" className="hover:text-[#2f7d32] transition-colors">info@healthwellnessexpo.com</a>
                                        </div>
                                    </div>
                                </div>

                                {/* SECURE */}
                                <div className="bg-[#f0f9ef]/50 rounded-xl px-2.5 py-2 flex items-center gap-3 border border-[#e2f2e0]">
                                    <div className="w-8 h-8 rounded-full bg-[#2f7d32] flex items-center justify-center shadow-md">
                                        <ShieldCheck className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black text-[#2f7d32]">Secure Authentication</h4>
                                        <p className="text-[8px] text-[#5d7d5d] font-medium">Your data is encrypted with bank-grade security.</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DelegatesLogin;
