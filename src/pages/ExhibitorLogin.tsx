import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Lock, Mail, ArrowRight, ShieldCheck, Phone, CheckCircle2,
    Building2, ChevronLeft, Eye, EyeOff, Key, Sparkles,
    Shield, Store, Send, LogIn, Loader2, Smartphone, UserPlus, Headset,
    Users, CalendarDays, BarChart3, User
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL, settingsApi, SERVER_URL } from '@/lib/api';
import Swal from 'sweetalert2';

const ExhibitorLogin = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState<any>(null);
    const [step, setStep] = useState(1);
    const [loginMode, setLoginMode] = useState<'email' | 'mobile'>('email');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [exhibitorId, setExhibitorId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await settingsApi.get();
                if (data) setSettings(data);
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };
        fetchSettings();
    }, []);

    const showAlert = (icon: any, title: string, text: string) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            confirmButtonColor: '#23471d',
            background: '#f8f9fa',
            customClass: {
                title: 'text-xl font-bold font-inter',
                popup: 'rounded-xl',
                confirmButton: 'py-2 px-6 text-base font-semibold'
            }
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = loginMode === 'email' ? 'send-email-otp' : 'send-mobile-otp';
            const body = loginMode === 'email'
                ? { email: email.trim() }
                : { mobile: mobile.trim() };

            const res = await fetch(`${API_URL}/exhibitor-auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            if (data.success) {
                setExhibitorId(data.exhibitorId);
                setStep(2);
                toast.success('Wait! One more step.', {
                    description: loginMode === 'email'
                        ? 'We sent a code to your registered email.'
                        : 'We sent an OTP to your mobile.'
                });
            } else {
                showAlert('error', 'Login Failed', data.message || 'Check your details and try again.');
            }
        } catch (error) {
            showAlert('error', 'Connection Error', 'Please check your internet connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/exhibitor-auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ exhibitorId, otp })
            });
            const data = await res.json();

            if (data.success && data.token) {
                localStorage.setItem('exhibitorToken', data.token);
                toast.success('Welcome!', { description: 'Opening your dashboard...' });
                setTimeout(() => navigate('/exhibitor-dashboard'), 1000);
            } else {
                toast.error('Wrong Code', { description: data.message || 'Please enter the correct 6-digit code.' });
            }
        } catch (error) {
            toast.error('Connection Error', { description: 'Please check your internet.' });
        } finally {
            setLoading(false);
        }
    };

    const features = [
        {
            icon: <Store size={14} />,
            title: "Booth Management",
            desc: "Update booth info, staff, and documents."
        },
        {
            icon: <Users size={14} />,
            title: "Lead Tracking",
            desc: "Capture, manage & follow up leads."
        },
        {
            icon: <CalendarDays size={14} />,
            title: "Scheduler",
            desc: "Manage meetings appointments."
        },
        {
            icon: <BarChart3 size={14} />,
            title: "Insights",
            desc: "Track engagement and growth."
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
                        <div className="grid lg:grid-cols-2 items-stretch rounded-2xl shadow-2xl overflow-hidden bg-white border border-slate-100 min-h-[550px] lg:min-h-[550px]">
                            {/* LEFT SIDE: Brand & Info */}
                            <div className="w-full flex flex-col">
                                <div
                                    className="flex-1 px-8 py-2 relative overflow-hidden flex flex-col bg-cover bg-center"
                                    style={{
                                        backgroundImage: "url('/exhibitor-login-booth.webp')",
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
                                                IHWE EXHIBITOR
                                            </h2>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600 mt-2">
                                                SHOWCASE. CONNECT. SUCCEED.
                                            </p>
                                            <div className="w-12 h-1 bg-[#357a38] mt-2"></div>
                                        </div>

                                        <div className="mt-2 mb-2">
                                            <p className="text-[#357a38] text-xl mb-1 italic" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                                                Welcome!
                                            </p>
                                            <h1 className="text-[28px] md:text-[30px] font-black text-slate-900 leading-[1.1] mt-2 mb-8">
                                                Your brand & booth.<br />
                                                <span className="text-[#357a38]">Your impact.</span>
                                            </h1>
                                            <p className="text-gray-700 text-[14px] leading-relaxed max-w-[280px]">
                                                Manage your booth, products, leads, and meetings – all in one powerful platform.
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
                            <div className="px-8 relative flex flex-col justify-center h-full">
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

                                                    {/* Icon circle */}
                                                    <div className="w-20 mt-3 h-20 mx-auto bg-gradient-to-tr from-[#23471d]/10 to-[#d26019]/10 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100 text-[#23471d]">
                                                        <Store size={36} strokeWidth={1.5} />
                                                    </div>


                                                    {/* Title */}
                                                    <h3 className="text-[1.75rem] font-semibold text-slate-900 tracking-tight leading-none mb-2">
                                                        Exhibitor Login
                                                    </h3>

                                                    {/* Subtitle */}
                                                    <p className="text-[13.5px] text-slate-500 leading-relaxed">
                                                        Sign in to your exhibitor portal to continue
                                                    </p>

                                                </div>

                                                <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200 relative">

                                                    {/* Sliding background */}
                                                    <div
                                                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-md border border-slate-200 shadow-sm transition-transform duration-200 ease-in-out ${loginMode === 'mobile' ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'
                                                            }`}
                                                    />

                                                    <button
                                                        onClick={() => setLoginMode('email')}
                                                        className={`flex-1 relative z-10 py-2 px-2 rounded-md flex items-center justify-center gap-1.5 transition-colors duration-200 text-[11px] font-semibold uppercase tracking-wide
      ${loginMode === 'email' ? 'text-[#23471d]' : 'text-slate-400 hover:text-slate-500'}`}
                                                    >
                                                        <Mail size={14} strokeWidth={2} />
                                                        Email
                                                    </button>

                                                    <button
                                                        onClick={() => setLoginMode('mobile')}
                                                        className={`flex-1 relative z-10 py-2 px-2 rounded-md flex items-center justify-center gap-1.5 transition-colors duration-200 text-[11px] font-semibold uppercase tracking-wide
      ${loginMode === 'mobile' ? 'text-[#23471d]' : 'text-slate-400 hover:text-slate-500'}`}
                                                    >
                                                        <Smartphone size={14} strokeWidth={2} />
                                                        Mobile
                                                    </button>

                                                </div>
                                                <form onSubmit={handleLogin} className="space-y-4">
                                                    {loginMode === 'email' ? (
                                                        <div className="space-y-1.5">
                                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                                                            <div className="relative group">
                                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                                                                    <Mail size={16} />
                                                                </div>
                                                                <input
                                                                    type="email"
                                                                    required
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 transition-all placeholder:text-slate-400 text-[13px] text-slate-800 shadow-sm"
                                                                    placeholder="Enter registered email"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-1.5">
                                                            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Mobile Number</label>
                                                            <div className="relative group">
                                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                                                                    <Phone size={16} />
                                                                </div>
                                                                <input
                                                                    type="tel"
                                                                    required
                                                                    value={mobile}
                                                                    onChange={(e) => setMobile(e.target.value)}
                                                                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 transition-all placeholder:text-slate-400 text-[13px] text-slate-800 shadow-sm"
                                                                    placeholder="Enter mobile number"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="w-full bg-gradient-to-r from-[#23471d] to-[#2d5a25] hover:from-[#1a3a14] hover:to-[#23471d] text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] shadow-lg hover:shadow-[#23471d]/30 hover:-translate-y-0.5 disabled:opacity-50"
                                                    >
                                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={16} />}
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
                                                        to="/book-a-stand"
                                                        className="w-full py-2.5 px-4 rounded-lg border border-[#23471d] text-[#23471d] hover:bg-[#23471d] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] font-bold"
                                                    >
                                                        <UserPlus size={14} />
                                                        <span>Register as Exhibitor</span>
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
                                                    <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-[#23471d]/10 to-[#d26019]/10 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100 text-[#23471d]">
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
                                                        value={otp}
                                                        autoFocus
                                                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                                        className="block w-full px-4 py-3 text-center tracking-[0.5em] text-2xl font-bold text-[#23471d] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 transition-all placeholder:text-slate-400 shadow-sm"
                                                        placeholder="000000"
                                                    />

                                                    <button
                                                        type="submit"
                                                        disabled={loading || otp.length !== 6}
                                                        className="w-full bg-gradient-to-r from-[#23471d] to-[#2d5a25] hover:from-[#1a3a14] hover:to-[#23471d] text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] shadow-lg hover:shadow-[#23471d]/30 hover:-translate-y-0.5 disabled:opacity-50"
                                                    >
                                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 size={16} />}
                                                        <span>Verify & Access Dashboard</span>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => { setStep(1); setOtp(''); }}
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

            </section>
        </div>
    );
};

export default ExhibitorLogin;
