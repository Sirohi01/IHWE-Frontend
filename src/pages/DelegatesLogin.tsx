import React, { useState } from 'react';
import {
    Mail, LogIn, UserPlus,
    Calendar, Users, Sparkles, Bell, HelpCircle,
    CheckCircle2, Building2, Smartphone, ShieldCheck, Store, ArrowRight,
    Leaf, Headset, X, ChevronLeft, Key, Send, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import DelegatesImage from '../assets/DelegateLogin.webp';
import Swal from 'sweetalert2';

const DelegatesLogin = () => {
    const [step, setStep] = useState(1);
    const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        mobile: '',
        otp: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (step === 1) {
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
                setStep(2);
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
        }
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

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
            setStep(1);

            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome to IHWE 2026 Delegates Portal.',
                confirmButtonColor: '#23471d',
                customClass: {
                    popup: 'rounded-xl',
                    confirmButton: 'rounded-xl px-8 py-2.5 text-sm font-bold uppercase tracking-wider'
                }
            });
        }, 1500);
    };

    const features = [
        {
            icon: <Calendar size={14} />,
            title: "Personalized Schedule",
            desc: "Access your agenda and never miss a session."
        },
        {
            icon: <Users size={14} />,
            title: "Network & Connect",
            desc: "Connect with speakers, attendees & professionals."
        },
        {
            icon: <Building2 size={14} />,
            title: "Explore & Discover",
            desc: "Browse exhibitors and discover solutions."
        },
        {
            icon: <Bell size={14} />,
            title: "Stay Updated",
            desc: "Get real-time alerts and event updates."
        }
    ];

    return (
        <div className="min-h-screen bg-[#f9fafb] font-inter flex flex-col justify-center relative">

            {/* ── Animated Background ── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

                <style>{`
    @keyframes floatLeaf {
      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
      33%       { transform: translateY(-22px) rotate(14deg); opacity: 1; }
      66%       { transform: translateY(-10px) rotate(-8deg); opacity: 0.8; }
    }
    @keyframes drift1 {
      0%, 100% { transform: translate(0px, 0px) scale(1); }
      33%       { transform: translate(20px, -15px) scale(1.05); }
      66%       { transform: translate(-10px, 10px) scale(0.97); }
    }
    @keyframes drift2 {
      0%, 100% { transform: translate(0px, 0px) scale(1); }
      33%       { transform: translate(-18px, 12px) scale(1.04); }
      66%       { transform: translate(12px, -8px) scale(0.98); }
    }
    .leaf-float { animation: floatLeaf 5s ease-in-out infinite; }
    .blob-drift1 { animation: drift1 10s ease-in-out infinite; }
    .blob-drift2 { animation: drift2 13s ease-in-out infinite reverse; }
    .blob-drift3 { animation: drift1 8s ease-in-out infinite reverse; }
  `}</style>

                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0f7ea] via-[#e8f5d8] to-[#f4faf0]" />

                {/* Blobs */}
                <div className="blob-drift1 absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#c5e89a]/25" />
                <div className="blob-drift2 absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#8dc44f]/20" />
                <div className="blob-drift3 absolute top-10 right-20 w-48 h-48 rounded-full bg-[#d6ffb7]/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#a8d96c]/15 animate-pulse" />

                {/* Floating Leaves */}
                {[
                    { top: "8%", left: "8%", delay: "0s" },
                    { top: "15%", right: "10%", delay: "1.5s" },
                    { top: "55%", left: "5%", delay: "2.5s" },
                    { bottom: "20%", right: "8%", delay: "0.8s" },
                    { bottom: "35%", left: "15%", delay: "3.5s" },
                    { top: "70%", right: "22%", delay: "1.2s" },
                    { top: "35%", left: "45%", delay: "4s" },
                    { top: "80%", left: "35%", delay: "2s" },
                ].map((leaf, i) => (
                    <div
                        key={i}
                        className="leaf-float absolute w-7 h-7 opacity-40"
                        style={{
                            top: leaf.top,
                            left: (leaf as any).left,
                            right: (leaf as any).right,
                            bottom: (leaf as any).bottom,
                            animationDelay: leaf.delay,
                        }}
                    >
                        <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
                            <path
                                d="M18 3 C10 8,4 16,8 26 C12 34,26 32,30 22 C34 12,26 4,18 3Z"
                                fill="#4a8c28"
                            />
                            <line x1="18" y1="5" x2="18" y2="28" stroke="#3a7020" strokeWidth="1.2" />
                        </svg>
                    </div>
                ))}

            </div>
            <section className="py-4 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto mb-2">
                        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2 bg-white text-slate-700 hover:text-white hover:bg-[#23471d] rounded-full shadow-md border border-slate-200 transition-all duration-300 font-bold uppercase text-[11px] tracking-widest group w-fit">
                            <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch rounded-2xl shadow-2xl overflow-hidden bg-white border border-slate-100 min-h-fit lg:min-h-[550px]">
                            {/* LEFT SIDE: Brand & Info */}
                            <div className="w-full flex flex-col">
                                <div
                                    className="w-full h-auto lg:flex-1 px-8 py-8 lg:py-2 relative overflow-hidden flex flex-col bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${DelegatesImage})`,
                                        backgroundRepeat: "no-repeat"
                                    }}
                                >
                                    {/* Decorative soft blob top-right */}
                                    <div
                                        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-40 pointer-events-none"
                                        style={{
                                            background: "radial-gradient(circle, #b8e0a0 0%, transparent 70%)",
                                            transform: "translate(30%, -30%)",
                                        }}
                                    />
                                    {/* Decorative blob bottom-left */}
                                    <div
                                        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-30 pointer-events-none"
                                        style={{
                                            background: "radial-gradient(circle, #7dc465 0%, transparent 70%)",
                                            transform: "translate(-30%, 30%)",
                                        }}
                                    />
                                    <div className="relative z-10 flex-1 flex flex-col">
                                        <div className="mt-8 mb-8">
                                            <img
                                                src="/logo.png"
                                                alt="IHWE Logo"
                                                className="h-20 w-auto object-contain -ml-2"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <h2 className="text-[20px] font-black text-slate-800 uppercase tracking-tight leading-none mb-1">
                                                IHWE DELEGATE
                                            </h2>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600 mt-2">
                                                YOUR EVENT. YOUR EXPERIENCE.
                                            </p>
                                            <div className="w-12 h-1 bg-[#357a38] mt-2"></div>
                                        </div>

                                        <div className="mt-2 mb-2">
                                            <p
                                                className="text-[#357a38] text-xl mb-1 italic font-bold"
                                                style={{
                                                    fontFamily: "'Playfair Display', serif",
                                                    fontStyle: "italic",
                                                    textShadow: "0 2px 4px #fff, 0 -2px 4px #fff, 2px 0px 4px #fff, -2px 0px 4px #fff, 0 0 10px #fff, 0 0 15px #fff"
                                                }}
                                            >
                                                Welcome!
                                            </p>
                                            <h1
                                                className="text-[28px] md:text-[24px] font-black text-slate-950 leading-[1.1] mt-2 mb-6"
                                                style={{
                                                    textShadow: "0 2px 4px #fff, 0 -2px 4px #fff, 2px 0px 4px #fff, -2px 0px 4px #fff, 0 0 10px #fff, 0 0 15px #fff"
                                                }}
                                            >
                                                Let’s make<br />
                                                wellness happen
                                            </h1>
                                            <p
                                                className="text-slate-950 text-[14px] leading-relaxed max-w-[280px] font-semibold"
                                                style={{
                                                    textShadow: "0 2px 4px #fff, 0 -2px 4px #fff, 2px 0px 4px #fff, -2px 0px 4px #fff, 0 0 10px #fff, 0 0 15px #fff"
                                                }}
                                            >
                                                Log in to access your agenda, sessions, exhibitors, networking and more.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Dark Green Bar */}
                                <div className="bg-[#24541e] p-4 grid grid-cols-2 lg:grid-cols-4 gap-3 text-center">
                                    {features.map((item, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white mb-1.5">
                                                {item.icon}
                                            </div>
                                            <h4 className="text-white text-[10px] font-bold leading-tight mb-0.5">
                                                {item.title}
                                            </h4>
                                            <p className="text-white/80 text-[9px] leading-tight">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* right side  */}
                            <div className="w-full px-6 py-12 lg:px-8 lg:py-4 relative flex flex-col justify-center min-h-[500px] lg:min-h-fit">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#23471d]/10 to-transparent -rotate-45" />

                                <AnimatePresence mode="wait">
                                    {step === 1 ? (
                                        <motion.div
                                            key="login-step"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-4"
                                        >
                                            <div className="space-y-4">
                                                <div className="text-center">
                                                    {/* TOP ICON */}
                                                    <div className="w-20 mt-3 h-20 mx-auto bg-gradient-to-tr from-[#23471d]/10 to-[#d26019]/10 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100 text-[#23471d]">
                                                        <Users size={36} strokeWidth={1.5} />
                                                    </div>

                                                    {/* TITLE */}
                                                    <h3 className="text-[1.75rem] font-semibold text-slate-900 tracking-tight leading-none mb-2">
                                                        Delegates Login
                                                    </h3>
                                                    <p className="text-[13.5px] text-slate-500 leading-relaxed">
                                                        Enter your details to receive a secure OTP
                                                    </p>
                                                </div>

                                                <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200 relative">
                                                    {/* Sliding background */}
                                                    <div
                                                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-md border border-slate-200 shadow-sm transition-transform duration-200 ease-in-out ${loginMethod === 'mobile' ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'}`}
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => { setLoginMethod('email'); setError(null); }}
                                                        className={`flex-1 relative z-10 py-2 px-2 rounded-md flex items-center justify-center gap-1.5 transition-colors duration-200 text-[11px] font-semibold uppercase tracking-wide ${loginMethod === 'email' ? 'text-[#23471d]' : 'text-slate-400 hover:text-slate-500'}`}
                                                    >
                                                        <Mail size={14} strokeWidth={2} />
                                                        Email
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => { setLoginMethod('mobile'); setError(null); }}
                                                        className={`flex-1 relative z-10 py-2 px-2 rounded-md flex items-center justify-center gap-1.5 transition-colors duration-200 text-[11px] font-semibold uppercase tracking-wide ${loginMethod === 'mobile' ? 'text-[#23471d]' : 'text-slate-400 hover:text-slate-500'}`}
                                                    >
                                                        <Smartphone size={14} strokeWidth={2} />
                                                        Mobile
                                                    </button>
                                                </div>

                                                <form onSubmit={handleSubmit} className="space-y-4">
                                                    {loginMethod === 'email' ? (
                                                        <div className="space-y-1.5">
                                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                                                            <div className="relative group">
                                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                                                                    <Mail size={16} />
                                                                </div>
                                                                <input
                                                                    type="email"
                                                                    required
                                                                    placeholder="Enter registered email"
                                                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 transition-all placeholder:text-slate-400 text-[13px] text-slate-800 shadow-sm"
                                                                    value={formData.email}
                                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-1.5">
                                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Mobile Number</label>
                                                            <div className="relative group">
                                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                                                                    <Smartphone size={16} />
                                                                </div>
                                                                <input
                                                                    type="tel"
                                                                    required
                                                                    maxLength={10}
                                                                    placeholder="Enter mobile number"
                                                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 transition-all placeholder:text-slate-400 text-[13px] text-slate-800 shadow-sm"
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
                                                    )}

                                                    <button
                                                        type="submit"
                                                        disabled={isLoading}
                                                        className="w-full bg-gradient-to-r from-[#23471d] to-[#2d5a25] hover:from-[#1a3a14] hover:to-[#23471d] text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] shadow-lg hover:shadow-[#23471d]/30 hover:-translate-y-0.5 disabled:opacity-50"
                                                    >
                                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={16} />}
                                                        <span>Send Verification OTP</span>
                                                    </button>
                                                </form>

                                                <div className="mt-4">
                                                    <div className="relative py-1">
                                                        <div className="absolute inset-0 flex items-center">
                                                            <div className="w-full border-t border-slate-100"></div>
                                                        </div>
                                                        <div className="relative flex justify-center text-[10px]">
                                                            <span className="px-2 bg-white text-slate-400 font-medium">New to IHWE Expo?</span>
                                                        </div>
                                                    </div>

                                                    <Link
                                                        to="/delegate-registration"
                                                        className="w-full py-2.5 px-4 rounded-lg border border-[#23471d] text-[#23471d] hover:bg-[#23471d] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] font-bold"
                                                    >
                                                        <UserPlus size={14} />
                                                        <span>Register as Delegate</span>
                                                    </Link>
                                                </div>

                                                <div className="mt-6 pt-6 pb-8 border-t border-slate-100">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-[#23471d]/10 rounded-full flex items-center justify-center text-[#23471d] flex-shrink-0">
                                                            <Headset size={20} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900 text-[15px] mb-1">Need Help?</h4>
                                                            <div className="text-[12px] text-slate-500 font-medium flex items-center gap-2 whitespace-nowrap">
                                                                <span>Email: <a href="mailto:info@ihwe.in" className="text-blue-600 hover:underline">info@ihwe.in</a></span>
                                                                <span className="text-slate-300">|</span>
                                                                <span>Phone: <a href="tel:+919654900525" className="text-blue-600 hover:underline">+91 9654900525</a></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="otp-step"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex flex-col h-full justify-between"
                                        >
                                            <div className="space-y-6">
                                                <div className="text-center">
                                                    {/* Icon circle */}
                                                    <div className="w-20 mt-3 h-20 mx-auto bg-gradient-to-tr from-[#23471d]/10 to-[#d26019]/10 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100 text-[#23471d]">
                                                        <Key size={36} strokeWidth={1.5} />
                                                    </div>

                                                    <h3 className="text-[1.75rem] font-semibold text-slate-900 tracking-tight leading-none mb-2">Verify Code</h3>
                                                    <p className="text-[13.5px] text-slate-500 leading-relaxed">Enter the 6-digit verification code sent to your registered contact.</p>
                                                </div>

                                                <form onSubmit={handleVerifyOtp} className="space-y-6">
                                                    <input
                                                        type="text"
                                                        required
                                                        maxLength={6}
                                                        placeholder="000000"
                                                        className="block w-full px-4 py-3 text-center tracking-[0.5em] text-2xl font-bold text-[#23471d] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 transition-all placeholder:text-slate-400 shadow-sm"
                                                        value={formData.otp}
                                                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                                    />

                                                    <button
                                                        type="submit"
                                                        disabled={isLoading || formData.otp.length !== 6}
                                                        className="w-full bg-gradient-to-r from-[#23471d] to-[#2d5a25] hover:from-[#1a3a14] hover:to-[#23471d] text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] shadow-lg hover:shadow-[#23471d]/30 hover:-translate-y-0.5 disabled:opacity-50"
                                                    >
                                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 size={16} />}
                                                        <span>Verify & Access Dashboard</span>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => { setStep(1); setFormData({ ...formData, otp: '' }); }}
                                                        className="text-[10px] font-bold text-slate-400 hover:text-[#23471d] uppercase tracking-widest transition-all underline underline-offset-4 w-full text-center"
                                                    >
                                                        Incorrect details? Go Back
                                                    </button>
                                                </form>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default DelegatesLogin;
