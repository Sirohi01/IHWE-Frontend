import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Phone, CheckCircle2, Building2, ChevronLeft, Eye, EyeOff, Key } from 'lucide-react';
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
                toast.success('Wait! One more step.', { 
                    description: loginMode === 'email' 
                        ? 'We sent a code to your mobile and email.' 
                        : 'We sent an OTP to your mobile.' 
                });
            } else {
                toast.error('Login Failed', { description: data.message || 'Check your details and try again.' });
            }
        } catch (error) {
            toast.error('Connection Error', { description: 'Please check your internet.' });
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
        <div className="min-h-screen bg-[#f8f9fc] flex flex-col lg:flex-row select-none overflow-x-hidden font-['Plus_Jakarta_Sans']">

            {/* 📸 LEFT SIDE: CLEAR EXHIBITOR BRANDING (Desktop Only) */}
            <div className="hidden lg:flex w-[40%] bg-white flex-col relative overflow-hidden border-r border-slate-100">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full -ml-32 -mb-32 blur-[80px]"></div>
                
                <div className="relative z-10 p-16 flex flex-col h-full">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold">
                        <ChevronLeft size={18} strokeWidth={2.5} />
                        <span className="text-[11px] uppercase tracking-widest">Back to Website</span>
                    </Link>

                    <div className="mt-auto mb-auto space-y-8">
                        <div className="w-20 h-20 bg-blue-600 rounded-[2.2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-500/20">
                            <Building2 size={36} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                Exhibitor<br />
                                <span className="text-blue-600">Access Portal.</span>
                            </h1>
                            <p className="text-lg font-medium text-slate-500 max-w-sm leading-relaxed">
                                Welcome to your private dashboard. Here you can check your stall booking, download invoices, and manage your event details easily.
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto pt-10 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                <ShieldCheck size={20} />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Secure Payment<br />& Invoicing</p>
                        </div>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2026 IHWE</p>
                    </div>
                </div>
            </div>

            {/* 🔑 RIGHT SIDE: LOGIN FORM (Fully Responsive) */}
            <div className="flex-1 flex flex-col bg-slate-50/30">
                
                {/* Mobile Identity Header */}
                <div className="lg:hidden p-6 sm:p-10 flex items-center justify-between bg-white border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-900 leading-none">Exhibitor Login</h2>
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Official Portal</p>
                        </div>
                    </div>
                    <Link to="/" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <ArrowRight size={18} className="rotate-180" />
                    </Link>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative overflow-y-auto">
                    
                    <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-blue-200/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="w-full max-w-[420px] relative z-10">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.04)] space-y-10"
                                >
                                    <div className="text-center lg:text-left space-y-2">
                                        <h3 className="text-4xl font-black tracking-tight text-slate-900">Sign In</h3>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Exhibitor Login Only</p>
                                    </div>

                                    <div className="flex p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
                                        <button
                                            onClick={() => setLoginMode('email')}
                                            className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all 
                                                ${loginMode === 'email' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            Use Email
                                        </button>
                                        <button
                                            onClick={() => setLoginMode('mobile')}
                                            className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all 
                                                ${loginMode === 'mobile' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            Use Mobile
                                        </button>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-6">
                                        {loginMode === 'email' ? (
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                                    <div className="relative group">
                                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                                                            <Mail size={18} strokeWidth={2.5} />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            required
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="block w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] font-bold focus:outline-none focus:bg-white focus:border-blue-400 transition-all placeholder:text-slate-200"
                                                            placeholder="example@email.com"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                                    <div className="relative group">
                                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                                                            <Lock size={18} strokeWidth={2.5} />
                                                        </div>
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            required
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className="block w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] font-bold focus:outline-none focus:bg-white focus:border-blue-400 transition-all placeholder:text-slate-200 tracking-wider"
                                                            placeholder="Enter password"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-blue-600 transition-colors"
                                                        >
                                                            {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                                                        <Phone size={18} strokeWidth={2.5} />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={mobile}
                                                        onChange={(e) => setMobile(e.target.value)}
                                                        className="block w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] font-bold focus:outline-none focus:bg-white focus:border-blue-400 transition-all placeholder:text-slate-200"
                                                        placeholder="+91 00000 00000"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex justify-between items-center py-5 px-8 rounded-2xl shadow-[0_15px_35px_rgba(37,99,235,0.1)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.2)] text-[11px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-slate-900 transform active:scale-95 transition-all disabled:opacity-50"
                                        >
                                            <span>{loading ? 'Wait...' : (loginMode === 'email' ? 'Login Now' : 'Send Code')}</span>
                                            <ArrowRight size={18} strokeWidth={2.5} />
                                        </button>
                                    </form>

                                    <div className="text-center pt-2">
                                        <p className="text-[10px] font-bold text-slate-300 leading-normal uppercase tracking-widest">
                                            Login for official <br />
                                            <span className="text-slate-400 underline underline-offset-4 decoration-blue-200">Exhibitors Only</span>
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-10 sm:p-12 rounded-[3.5rem] border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.05)] text-center space-y-10"
                                >
                                    <div className="space-y-6">
                                        <div className="mx-auto w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 shadow-inner">
                                            <Key size={32} strokeWidth={2.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-4xl font-black tracking-tight text-slate-900">Enter Code</h3>
                                            <p className="text-sm font-bold text-slate-400 max-w-[240px] mx-auto leading-relaxed">
                                                Please enter the 6-digit code we sent you.
                                            </p>
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
                                            className="block w-full px-4 py-8 text-center tracking-[0.8em] text-4xl font-black text-blue-600 bg-slate-50 border-b-4 border-blue-100 focus:border-blue-600 outline-none transition-all placeholder:text-slate-100"
                                            placeholder="000000"
                                        />

                                        <button
                                            type="submit"
                                            disabled={loading || otp.length !== 6}
                                            className="w-full py-5 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.1)] text-[11px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-black transition-all transform active:scale-95"
                                        >
                                            {loading ? 'Checking...' : 'Verify & Login'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => { setStep(1); setOtp(''); }}
                                            className="text-[10px] font-black text-slate-300 hover:text-blue-600 uppercase tracking-widest transition-all"
                                        >
                                            Go Back
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExhibitorLogin;
