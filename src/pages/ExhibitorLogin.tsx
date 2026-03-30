import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Phone, CheckCircle2, Building2, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '@/lib/api';

const ExhibitorLogin = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loginMode, setLoginMode] = useState<'email' | 'mobile'>('email');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [exhibitorId, setExhibitorId] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

            if (data.success && (data.requiresOtp || loginMode === 'mobile')) {
                setExhibitorId(data.exhibitorId);
                setStep(2);
                toast.success('Verification Started!', { 
                    description: loginMode === 'email' 
                        ? 'OTP sent to your registered mobile and email.' 
                        : 'OTP sent to your mobile number.' 
                });
            } else {
                toast.error('Authentication Failed', { description: data.message || 'Invalid credentials provided.' });
            }
        } catch (error) {
            toast.error('Network Error', { description: 'Please check your connection and try again.' });
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
                toast.success('Secure Login Successful!', { description: 'Redirecting to your dashboard...' });
                setTimeout(() => navigate('/exhibitor-dashboard'), 1000);
            } else {
                toast.error('Verification Failed', { description: data.message || 'Invalid OTP entered.' });
            }
        } catch (error) {
            toast.error('Network Error', { description: 'Please check your connection and try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex select-none overflow-hidden font-['Plus_Jakarta_Sans']">

            {/* LEFT SIDE: BRANDING PANEL */}
            <div className="hidden lg:flex w-[45%] bg-[#1a3516] flex-col relative overflow-hidden shrink-0">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-[#23471d] blur-[100px] opacity-60"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#d26019] blur-[150px] opacity-20"></div>

                <div className="relative z-10 p-16 flex flex-col h-full justify-between">
                    <div>
                        <Link to="/" className="inline-block hover:-translate-x-2 transition-transform">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                                <ChevronLeft className="text-white" />
                            </div>
                        </Link>

                        <div className="mt-16 space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                <ShieldCheck size={16} className="text-[#d26019]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d1fae5]">Encrypted Portal Connection</span>
                            </div>
                            <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tighter">
                                Manage Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d1fae5] to-[#4ade80]">Global Health</span><br />
                                Presence.
                            </h1>
                            <p className="text-lg font-medium text-white/50 max-w-md mt-6 leading-relaxed">
                                Access your secure exhibitor dashboard to track registrations, download official invoices, and manage stall infrastructure in real-time.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <Building2 size={24} className="text-[#d1fae5] mb-4" />
                                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Verify</p>
                                <p className="text-lg font-black text-white">Stall Details</p>
                            </div>
                            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <CheckCircle2 size={24} className="text-[#d26019] mb-4" />
                                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Download</p>
                                <p className="text-lg font-black text-white">Tax Invoices</p>
                            </div>
                        </div>
                        <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">© 2026 Namo Gange Trust Foundation. All Systems Secure.</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: AUTHENTICATION FORM */}
            <div className="w-full lg:w-[55%] bg-white flex flex-col justify-center relative items-center p-6 sm:p-12 lg:p-24">

                <div className="w-full max-w-md relative z-10">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="space-y-8"
                            >
                                <div className="text-center lg:text-left">
                                    <div className="lg:hidden w-16 h-16 bg-[#23471d] rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-[#23471d]/20 mb-6">
                                        <ShieldCheck size={32} className="text-[#d1fae5]" />
                                    </div>
                                    <h2 className="text-4xl font-black tracking-tighter text-slate-900">Sign In</h2>
                                    <p className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-widest">Authentication Level 1</p>
                                </div>

                                {/* Login Selection */}
                                <div className="flex p-1 bg-slate-100 rounded-2xl">
                                    <button
                                        onClick={() => setLoginMode('email')}
                                        className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${loginMode === 'email' ? 'bg-white text-[#23471d] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Email & Pass
                                    </button>
                                    <button
                                        onClick={() => setLoginMode('mobile')}
                                        className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${loginMode === 'mobile' ? 'bg-white text-[#23471d] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Mobile OTP
                                    </button>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-6">
                                    {loginMode === 'email' ? (
                                        <>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#23471d] ml-1">Access Email</label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-[#23471d] transition-colors" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="block w-full pl-11 pr-4 py-4 border-2 border-slate-100 rounded-2xl text-sm font-bold bg-slate-50 focus:bg-white focus:border-[#23471d] outline-none transition-all placeholder:text-slate-300"
                                                        placeholder="exhibitor@company.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between ml-1">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#23471d]">Secure Passcode</label>
                                                    <span className="text-[10px] font-bold text-slate-400 cursor-help hover:text-slate-600 transition-colors">Check your Welcome Email</span>
                                                </div>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-[#23471d] transition-colors" />
                                                    </div>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="block w-full pl-11 pr-12 py-4 border-2 border-slate-100 rounded-2xl text-sm font-bold bg-slate-50 focus:bg-white focus:border-[#23471d] outline-none transition-all placeholder:text-slate-300 tracking-wider"
                                                        placeholder="••••••••"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#23471d] transition-colors focus:outline-none"
                                                    >
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#23471d] ml-1">Mobile Number</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Phone className="h-4 w-4 text-slate-400 group-focus-within:text-[#23471d] transition-colors" />
                                                </div>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    className="block w-full pl-11 pr-4 py-4 border-2 border-slate-100 rounded-2xl text-sm font-bold bg-slate-50 focus:bg-white focus:border-[#23471d] outline-none transition-all placeholder:text-slate-300"
                                                    placeholder="+91 99999 99999"
                                                />
                                            </div>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 italic ml-1">OTP will be sent via WhatsApp & Email</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-between items-center py-4 px-6 rounded-2xl shadow-[0_10px_40px_rgba(35,71,29,0.15)] hover:shadow-[0_10px_40px_rgba(35,71,29,0.3)] text-xs font-black uppercase tracking-widest text-white bg-[#23471d] hover:bg-[#1a3516] focus:outline-none focus:ring-4 focus:ring-[#23471d]/20 disabled:opacity-50 transition-all hover:-translate-y-1"
                                    >
                                        <span>{loading ? 'Processing...' : (loginMode === 'email' ? 'Proceed to Step 2' : 'Get Login OTP')}</span>
                                        {!loading && <ArrowRight size={18} />}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="space-y-8"
                            >
                                <div className="text-center">
                                    <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-green-100 ring-offset-4">
                                        <Phone size={40} className="text-green-600" />
                                    </div>
                                    <h2 className="text-3xl font-black tracking-tighter text-slate-900">2-Step Verification</h2>
                                    <p className="mt-4 text-sm font-bold text-slate-500 max-w-xs mx-auto leading-relaxed">
                                        A 6-digit one-time password has been sent to your registered Email & Mobile.
                                    </p>
                                </div>

                                <form onSubmit={handleVerifyOtp} className="space-y-6 pt-4">
                                    <div className="space-y-2 text-center">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Enter Security Code</label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={6}
                                            value={otp}
                                            autoFocus
                                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                            className="block w-full px-4 py-5 text-center tracking-[1em] border-2 border-slate-100 rounded-3xl text-3xl font-black text-[#23471d] bg-slate-50 focus:bg-white focus:border-[#d26019] focus:ring-4 focus:ring-[#d26019]/10 outline-none transition-all"
                                            placeholder="000000"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || otp.length !== 6}
                                        className="w-full flex justify-center items-center py-4 px-6 rounded-2xl shadow-[0_10px_40px_rgba(210,96,25,0.2)] hover:shadow-[0_10px_40px_rgba(210,96,25,0.4)] text-xs font-black uppercase tracking-widest text-white bg-[#d26019] hover:bg-[#b54f15] focus:outline-none focus:ring-4 focus:ring-[#d26019]/20 disabled:opacity-50 transition-all hover:-translate-y-1 disabled:hover:translate-y-0"
                                    >
                                        {loading ? 'Verifying Key...' : 'Grant Access'}
                                    </button>

                                    <div className="text-center pt-2">
                                        <button
                                            type="button"
                                            onClick={() => { setStep(1); setOtp(''); }}
                                            className="text-[10px] font-black text-slate-400 hover:text-slate-700 uppercase tracking-widest transition-colors flex items-center justify-center gap-1 mx-auto"
                                        >
                                            <ChevronLeft size={14} /> Back to Sign In
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ExhibitorLogin;
