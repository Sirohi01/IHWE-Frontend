import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Lock, Mail, ArrowRight, ShieldCheck, Phone, CheckCircle2,
    Building2, ChevronLeft, Eye, EyeOff, Key, Sparkles,
    Shield, IdCard as IdCardIcon, QrCode, User, Send, LogIn, Loader2, Smartphone, UserPlus, Headset
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL, settingsApi, SERVER_URL } from '@/lib/api';
import Swal from 'sweetalert2';
import { useAuth } from '@/context/BuyerAuthContext';

const BuyerLogin = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState<any>(null);
    const [step, setStep] = useState(1);
    const [loginMode, setLoginMode] = useState<'email' | 'mobile'>('email');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [buyerId, setBuyerId] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

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
            const endpoint = loginMode === 'email' ? 'login' : 'send-mobile-otp';
            const body = loginMode === 'email'
                ? { email: email.trim(), password: password.trim() }
                : { mobile: mobile.trim() };

            const res = await fetch(`${API_URL}/buyer-auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            if (data.success) {
                if (data.requiresOtp || loginMode === 'mobile') {
                    setBuyerId(data.buyerId);
                    setStep(2);
                    toast.success('Wait! One more step.', {
                        description: loginMode === 'email'
                            ? 'We sent a code to your registered email.'
                            : 'We sent an OTP to your mobile.'
                    });
                } else if (data.token) {
                    localStorage.setItem('buyerToken', data.token);
                    toast.success('Welcome back!');
                    login(data.buyer);
                }
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
            const res = await fetch(`${API_URL}/buyer-auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ buyerId, otp })
            });
            const data = await res.json();

            if (data.success && data.token) {
                localStorage.setItem('buyerToken', data.token);
                toast.success('Welcome!', { description: 'Opening your dashboard...' });
                login(data.buyer);
            } else {
                toast.error('Wrong Code', { description: data.message || 'Please enter the correct 6-digit code.' });
            }
        } catch (error) {
            toast.error('Connection Error', { description: 'Please check your internet.' });
        } finally {
            setLoading(false);
        }
    };

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
                    <div className="max-w-6xl mx-auto mb-2">
                        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2 bg-white text-slate-700 hover:text-white hover:bg-[#23471d] rounded-full shadow-md border border-slate-200 transition-all duration-300 font-bold uppercase text-[11px] tracking-widest group w-fit">
                            <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 items-stretch rounded-2xl shadow-2xl overflow-hidden bg-white border border-slate-100 min-h-[700px] lg:min-h-[700px]">
                            {/* left side  */}
                            <div className="hidden lg:flex items-center justify-center bg-slate-50 border-r border-slate-100 h-full w-full">
                                <img src="/buyerLogin1.png" alt="Buyer Login" className="w-full h-full object-fit" />
                            </div>

                            {/* right side  */}
                            <div className="px-8  relative flex flex-col justify-center h-full">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#23471d]/10 to-transparent -rotate-45" />

                                <AnimatePresence mode="wait">
                                    {step === 1 ? (
                                        <motion.div
                                            key="login-step"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >

                                            <div className="text-center">

                                                {/* Icon circle */}
                                                <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-[#23471d]/10 to-[#d26019]/10 rounded-full flex items-center justify-center mb-2 shadow-sm border border-slate-100 text-[#23471d]">
                                                    <User size={36} strokeWidth={1.5} />
                                                </div>


                                                {/* Title */}
                                                <h3 className="text-[1.75rem] font-semibold text-slate-900 tracking-tight leading-none mb-2">
                                                    Welcome back
                                                </h3>

                                                {/* Subtitle */}
                                                <p className="text-[13.5px] text-slate-500 leading-relaxed">
                                                    Sign in to your buyer account to continue
                                                </p>

                                            </div>

                                            <div className="flex p-1.5 bg-slate-100 rounded-xl border border-slate-200 relative">

                                                {/* Sliding background */}
                                                <div
                                                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-lg border border-slate-200 shadow-sm transition-transform duration-200 ease-in-out ${loginMode === 'mobile' ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'
                                                        }`}
                                                />

                                                <button
                                                    onClick={() => setLoginMode('email')}
                                                    className={`flex-1 relative z-10 py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors duration-200 text-[11px] font-semibold uppercase tracking-wide
      ${loginMode === 'email' ? 'text-[#23471d]' : 'text-slate-400 hover:text-slate-500'}`}
                                                >
                                                    <Mail size={14} strokeWidth={2} />
                                                    Email
                                                </button>

                                                <button
                                                    onClick={() => setLoginMode('mobile')}
                                                    className={`flex-1 relative z-10 py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors duration-200 text-[11px] font-semibold uppercase tracking-wide
      ${loginMode === 'mobile' ? 'text-[#23471d]' : 'text-slate-400 hover:text-slate-500'}`}
                                                >
                                                    <Smartphone size={14} strokeWidth={2} />
                                                    Mobile
                                                </button>

                                            </div>
                                            <form onSubmit={handleLogin} className="space-y-6">
                                                {loginMode === 'email' ? (
                                                    <div className="space-y-2">
                                                        <div className="space-y-2">
                                                            <label className="block text-xs font-bold uppercase tracking-widest text-[#23471d]">Email Address</label>
                                                            <div className="relative group">
                                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                                                                    <Mail size={18} />
                                                                </div>
                                                                <input
                                                                    type="email"
                                                                    required
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 transition-all text-sm placeholder:text-slate-400 text-slate-800 shadow-sm"
                                                                    placeholder="Enter your email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-xs font-bold uppercase tracking-widest text-[#23471d]">Password / Registration ID</label>
                                                            <div className="relative group">
                                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                                                                    <Lock size={18} />
                                                                </div>
                                                                <input
                                                                    type={showPassword ? "text" : "password"}
                                                                    required
                                                                    value={password}
                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                    className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 transition-all text-sm placeholder:text-slate-400 text-slate-800 shadow-sm"
                                                                    placeholder="Enter password or Reg ID"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-[#23471d] transition-colors"
                                                                >
                                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <label className="block text-xs font-bold uppercase tracking-widest text-[#23471d]">Mobile Number</label>
                                                        <div className="relative group">
                                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                                                                <Phone size={18} />
                                                            </div>
                                                            <input
                                                                type="tel"
                                                                required
                                                                value={mobile}
                                                                onChange={(e) => setMobile(e.target.value)}
                                                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 transition-all text-sm placeholder:text-slate-400 text-slate-800 shadow-sm"
                                                                placeholder="Enter mobile number"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full bg-gradient-to-r from-[#23471d] to-[#2d5a25] hover:from-[#1a3a14] hover:to-[#23471d] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-xl hover:shadow-[#23471d]/30 hover:-translate-y-0.5 mt-2 disabled:opacity-50 disabled:hover:translate-y-0"
                                                >
                                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (loginMode === 'email' ? <LogIn size={18} /> : <Send size={18} />)}
                                                    <span>{loginMode === 'email' ? 'Login Now' : 'Send Verification OTP'}</span>
                                                </button>
                                            </form>

                                            <div className="space-y-2">
                                                <div className="relative">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <div className="w-full border-t border-slate-200"></div>
                                                    </div>
                                                    <div className="relative flex justify-center text-sm">
                                                        <span className="px-3 bg-white text-slate-700 font-bold">New to IHWE Expo?</span>
                                                    </div>
                                                </div>

                                                <Link
                                                    to="/buyer-registration"
                                                    className="w-full bg-white text-[#23471d] hover:text-white font-bold py-3 px-6 rounded-xl border border-[#23471d] hover:bg-gradient-to-r from-[#23471d] to-[#2d5a25] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                                                >
                                                    <UserPlus size={18} />
                                                    <span>Register as Buyer</span>
                                                </Link>

                                                <div className="flex items-center gap-4 pt-2">
                                                    <div className="w-12 h-12 bg-[#23471d]/10 rounded-full flex items-center justify-center text-[#23471d] flex-shrink-0">
                                                        <Headset size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-sm mb-1">Need Help?</h4>
                                                        <div className="text-[11.5px] text-slate-500 font-medium flex flex-wrap gap-x-2">
                                                            <span>Email: info@ihwe.in</span>
                                                            <span className="text-slate-300 hidden sm:inline">|</span>
                                                            <span className="w-full sm:w-auto">Phone: +91 9654900525</span>
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
                                            className="space-y-10 text-center"
                                        >
                                            <div className="space-y-4">
                                                <div className="mx-auto w-20 h-20 bg-[#23471d]/5 rounded-3xl flex items-center justify-center text-[#23471d] shadow-sm">
                                                    <Key size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="text-3xl font-inter font-bold text-slate-900">Verify Code</h3>
                                                    <p className="text-slate-500 text-sm mt-2">Enter the 6-digit verification code sent to your registered contact.</p>
                                                </div>
                                            </div>

                                            <form onSubmit={handleVerifyOtp} className="space-y-8">
                                                <input
                                                    type="text"
                                                    required
                                                    maxLength={6}
                                                    value={otp}
                                                    autoFocus
                                                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                                    className="block w-full px-4 py-6 text-center tracking-[0.5em] text-4xl font-bold text-[#23471d] bg-white border-2 border-slate-200 rounded-2xl focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 outline-none transition-all placeholder:text-slate-200 shadow-inner"
                                                    placeholder="000000"
                                                />

                                                <button
                                                    type="submit"
                                                    disabled={loading || otp.length !== 6}
                                                    className="w-full bg-gradient-to-r from-[#d26019] to-[#b04d12] hover:from-[#b04d12] hover:to-[#8e3e0e] text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-[#d26019]/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50 disabled:hover:translate-y-0"
                                                >
                                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 size={18} />}
                                                    <span>Verify & Access Dashboard</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => { setStep(1); setOtp(''); }}
                                                    className="text-[10px] font-bold text-slate-400 hover:text-[#23471d] uppercase tracking-widest transition-all underline underline-offset-4"
                                                >
                                                    Incorrect details? Go Back
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* <p className="text-center text-[10px] text-slate-400 mt-10 pt-6 border-t border-slate-100 uppercase tracking-[0.2em] font-bold">
                                    © {new Date().getFullYear()} <span className="text-[#23471d]">IHWE</span> Buyer Services
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default BuyerLogin;
