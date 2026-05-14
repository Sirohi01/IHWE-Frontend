import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Lock, Mail, ArrowRight, ShieldCheck, Phone, CheckCircle2,
    Eye, EyeOff, Key, Sparkles, Shield, Headset,
    Store, Users, CalendarDays, BarChart3, UserPlus, Loader2, LogIn
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
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [exhibitorId, setExhibitorId] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

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

            const res = await fetch(`${API_URL}/exhibitor-auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            if (data.success) {
                if (data.requiresOtp || loginMode === 'mobile') {
                    setExhibitorId(data.exhibitorId);
                    setStep(2);
                    toast.success('Wait! One more step.', {
                        description: loginMode === 'email'
                            ? 'We sent a code to your mobile and email.'
                            : 'We sent an OTP to your mobile.'
                    });
                } else if (data.token) {
                    localStorage.setItem('exhibitorToken', data.token);
                    toast.success('Welcome back!');
                    navigate('/exhibitor-dashboard');
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

    return (
        <div className="min-h-screen bg-[#f3f4f6] font-inter flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1100px] w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row mt-4">

                {/* LEFT SIDE: Brand & Info */}
                <div className="w-full lg:w-[50%] flex flex-col">
                    <div
                        className="flex-1 p-8 md:p-10 relative overflow-hidden flex flex-col"
                        style={{
                            backgroundImage: "url('/exhibitor-login-booth.png')",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }}
                    >
                        <div className="relative z-10 flex-1 flex flex-col">
                            <div className="mb-6">
                                <img
                                    src={settings?.logo ? `${SERVER_URL}${settings.logo}` : "/logo.png"}
                                    alt="IHWE Logo"
                                    className="h-24 w-auto object-contain -ml-2"
                                />
                            </div>

                            <div className="mb-4">
                                <h2 className="text-slate-800 text-[20px] font-black uppercase tracking-tight leading-none mb-1">
                                    <span className="text-[#357a38]">IHWE </span>
                                    EXHIBITOR PORTAL
                                </h2>
                                <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.15em]">
                                    SHOWCASE. CONNECT. SUCCEED.
                                </p>
                                <div className="w-12 h-1 bg-[#357a38] mt-2"></div>
                            </div>

                            <div className="mb-2">
                                <p className="text-[#357a38] text-xl mb-1 italic" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                                    Welcome!
                                </p>
                                <h1 className="text-[28px] md:text-[32px] font-black text-slate-900 leading-[1.1] mb-2">
                                    Your brand.<br />
                                    Your booth.<br />
                                    <span className="text-[#357a38]">Your impact.</span>
                                </h1>
                                <p className="text-slate-600 text-[12px] leading-relaxed max-w-[280px]">
                                    Manage your booth, products, leads, and meetings – all in one powerful platform.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Dark Green Bar */}
                    <div className="bg-[#24541e] p-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-1.5">
                                <Store className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="text-white text-[10px] font-bold leading-tight mb-0.5">Booth Management</h4>
                            <p className="text-white/80 text-[9px] leading-tight">Update booth info,<br />staff, and documents.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-1.5">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="text-white text-[10px] font-bold leading-tight mb-0.5">Lead & Visitor Tracking</h4>
                            <p className="text-white/80 text-[9px] leading-tight">Capture, manage &<br />follow up with leads.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-1.5">
                                <CalendarDays className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="text-white text-[10px] font-bold leading-tight mb-0.5">Meeting Scheduler</h4>
                            <p className="text-white/80 text-[9px] leading-tight">Manage meetings<br />and appointments.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-1.5">
                                <BarChart3 className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="text-white text-[10px] font-bold leading-tight mb-0.5">Performance Insights</h4>
                            <p className="text-white/80 text-[9px] leading-tight">Track engagement<br />and growth.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Login Form */}
                <div className="w-full lg:w-[50%] p-6 md:p-8 flex flex-col justify-center bg-white relative">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="login-step"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="w-full max-w-[420px] mx-auto"
                            >                                <div className="text-center mb-6">
                                    <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Store className="w-6 h-6 text-[#357a38]" />
                                    </div>
                                    <h2 className="text-[22px] font-black text-slate-800 mb-1">Exhibitor Login</h2>
                                    <p className="text-slate-500 text-[12px]">Please enter your credentials to continue</p>
                                </div>

                                <div className="flex bg-slate-100 p-1 rounded-md mb-6 max-w-[240px] mx-auto border border-slate-200">
                                    <button type="button" onClick={() => setLoginMode('email')} className={`flex-1 text-[10px] font-bold py-1.5 uppercase rounded-sm transition-all ${loginMode === 'email' ? 'bg-white text-[#357a38] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Email</button>
                                    <button type="button" onClick={() => setLoginMode('mobile')} className={`flex-1 text-[10px] font-bold py-1.5 uppercase rounded-sm transition-all ${loginMode === 'mobile' ? 'bg-white text-[#357a38] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Mobile</button>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-4">
                                    {loginMode === 'email' ? (
                                        <>
                                            <div className="space-y-1.5">
                                                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-800">Email Address</label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#357a38] transition-colors">
                                                        <Mail size={16} />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#357a38] focus:border-[#357a38] transition-all text-[13px] placeholder:text-slate-400"
                                                        placeholder="Enter your registered email"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-800">Password</label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#357a38] transition-colors">
                                                        <Lock size={16} />
                                                    </div>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#357a38] focus:border-[#357a38] transition-all text-[13px] placeholder:text-slate-400"
                                                        placeholder="Enter your password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#357a38] transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-1.5">
                                            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-800">Mobile Number</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#357a38] transition-colors">
                                                    <Phone size={16} />
                                                </div>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#357a38] focus:border-[#357a38] transition-all text-[13px] placeholder:text-slate-400"
                                                    placeholder="Enter your registered mobile"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-1">
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={keepLoggedIn}
                                                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                                                className="w-3.5 h-3.5 rounded border-slate-300 text-[#357a38] focus:ring-[#357a38]"
                                            />
                                            <span className="text-[12px] text-slate-600 font-medium">Keep me logged in</span>
                                        </label>
                                        <a href="#" className="text-[10px] font-bold text-[#357a38] hover:text-[#1a3615] transition-colors ml-auto">
                                            Forgot Password?
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#357a38] hover:bg-[#2e6b31] text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide text-[11px] shadow-sm mt-4 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                            <>
                                                <LogIn size={16} />
                                                <span>{loginMode === 'email' ? 'LOGIN' : 'GET OTP'}</span>
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-6 relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-slate-700 font-bold text-[11px]">New to IHWE Expo?</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/book-a-stand')}
                                    className="w-full mt-4 bg-white border border-[#357a38] text-[#357a38] hover:bg-[#f0fdf4] font-bold py-2.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide text-[11px]"
                                >
                                    <UserPlus size={16} />
                                    <span>REGISTER AS EXHIBITOR</span>
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="otp-step"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="w-full max-w-[420px] mx-auto text-center"
                            >
                                <div className="space-y-3">
                                    <div className="w-12 h-12 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto text-[#357a38]">
                                        <Key size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-inter font-black text-[#1a3615]">Verify Code</h3>
                                        <p className="text-slate-500 text-[12px] mt-1">Enter the 6-digit verification code sent to your {loginMode === 'email' ? 'email' : 'mobile'}.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleVerifyOtp} className="space-y-6 mt-6">
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        value={otp}
                                        autoFocus
                                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="block w-full px-4 py-3 text-center tracking-[0.5em] text-2xl font-bold text-[#1a3615] bg-slate-50 border-b-2 border-slate-300 focus:border-[#357a38] outline-none transition-all placeholder:text-slate-300 rounded-t-lg"
                                        placeholder="000000"
                                    />

                                    <button
                                        type="submit"
                                        disabled={loading || otp.length !== 6}
                                        className="w-full bg-[#357a38] hover:bg-[#2e6b31] text-white font-bold py-2.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-[11px]"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 size={16} />}
                                        <span>Verify & Access Dashboard</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => { setStep(1); setOtp(''); }}
                                        className="text-[12px] font-bold text-slate-500 hover:text-[#2e7d32] transition-all underline underline-offset-4"
                                    >
                                        Incorrect details? Go Back
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer Infos */}
                    <div className="w-full max-w-[420px] mx-auto mt-6 space-y-3">
                        <div className="flex items-center gap-3 py-1">
                            <div className="w-8 h-8 rounded-full bg-[#f0fdf4] flex items-center justify-center shrink-0">
                                <Headset className="w-4 h-4 text-[#357a38]" />
                            </div>
                            <div>
                                <h4 className="text-[11px] font-bold text-slate-800">Need Help?</h4>
                                <p className="text-[10px] text-slate-500 mt-0.5">
                                    Email: exhibitor.support@ihwe.in <span className="mx-1 text-slate-300">|</span> Phone: +91-9654900525
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#f0fdf4] rounded-lg p-3 flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#357a38] flex items-center justify-center shrink-0 mt-0.5">
                                <ShieldCheck className="w-3 h-3 text-white" />
                            </div>
                            <div>
                                <h4 className="text-[11px] font-bold text-[#357a38]">Secure Portal</h4>
                                <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                                    Your data is safe with us. We use industry-standard<br />security to protect your information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExhibitorLogin;
