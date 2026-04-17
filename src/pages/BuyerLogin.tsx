import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Lock, Mail, ArrowRight, ShieldCheck, Phone, CheckCircle2,
    Building2, ChevronLeft, Eye, EyeOff, Key, Sparkles,
    Shield, IdCard as IdCardIcon, QrCode, User, Send, LogIn, Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL, settingsApi, SERVER_URL } from '@/lib/api';
import Swal from 'sweetalert2';

const BuyerLogin = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [registrationId, setRegistrationId] = useState('');
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
            const res = await fetch(`${API_URL}/buyer-registration/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    emailAddress: email.trim(),
                    registrationId: registrationId.trim()
                })
            });
            const data = await res.json();

            if (data.success) {

                localStorage.setItem('buyer_session', JSON.stringify(data.data));
                toast.success('Welcome back!', {
                    description: 'Login successful. Redirecting to dashboard...'
                });


                setTimeout(() => {
                    window.location.href = '/buyer-dashboard';
                }, 1500);
            } else {
                showAlert('error', 'Login Failed', data.message || 'Check your details and try again.');
            }
        } catch (error) {
            showAlert('error', 'Connection Error', 'Please check your internet connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] font-inter">

            <div className="pt-20 lg:pt-24"></div>

            <section className="pb-20 relative overflow-hidden">

                <div className="absolute top-0 right-0 w-96 h-96 bg-[#23471d]/5 rounded-full blur-[120px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d26019]/5 rounded-full blur-[120px] -ml-48 -mb-48" />

                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid lg:grid-cols-2 gap-12 items-start"
                        >

                            <div className="space-y-8">
                                <div>
                                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#23471d] transition-all font-bold uppercase text-[10px] tracking-widest group">
                                        <ChevronLeft size={14} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                                        <span>Back to Home</span>
                                    </Link>
                                </div>

                                <div className="flex items-center gap-6">
                                    <img
                                        src={settings?.logo ? `${SERVER_URL}${settings.logo}` : "/logo.png"}
                                        alt="IHWE Logo"
                                        className="h-24 w-auto object-contain"
                                    />
                                    <div className="h-16 w-px bg-slate-200" />
                                    <div>
                                        <h2 className="text-3xl font-inter font-bold text-slate-900">
                                            Buyer <span className="text-[#23471d]">Portal</span>
                                        </h2>
                                        <p className="text-[#d26019] font-bold tracking-[0.2em] uppercase text-xs">Official Login</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        Welcome to the 9th International Health & Wellness Expo Buyer Portal.
                                        Access your personalized dashboard to manage meetings, view your badge, and track sourcing matches.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { icon: Shield, title: "Secure Access", desc: "Private dashboard session" },
                                            { icon: IdCardIcon, title: "Badge Download", desc: "Get your entry pass" },
                                            { icon: QrCode, title: "Sourcing Matches", desc: "Find relevant exhibitors" },
                                            { icon: Sparkles, title: "Networking", desc: "Connect with exhibitors" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 bg-white p-4 border-2 border-[#23471d]/20 transition-all shadow-sm">
                                                <div className="w-10 h-10 bg-[#23471d]/5 flex items-center justify-center text-[#23471d]">
                                                    <item.icon size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{item.title}</p>
                                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE: Login Form */}
                            <div className="bg-white border border-slate-200 p-8 md:p-10 shadow-xl relative min-h-[500px] flex flex-col justify-center">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#23471d]/10 to-transparent -rotate-45" />

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center lg:text-left">
                                        <h3 className="text-3xl font-inter font-bold text-slate-900 mb-2">Welcome Back Buyer!</h3>
                                        <p className="text-slate-500 text-sm">Please sign in with your registration details</p>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-6">
                                        <div className="space-y-4">
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
                                                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 focus:outline-none focus:border-[#23471d] transition-all text-sm placeholder:text-slate-300"
                                                        placeholder="Enter your registered email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold uppercase tracking-widest text-[#23471d]">Registration ID</label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                                                        <ShieldCheck size={18} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={registrationId}
                                                        onChange={(e) => setRegistrationId(e.target.value)}
                                                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 focus:outline-none focus:border-[#23471d] transition-all text-sm placeholder:text-slate-300"
                                                        placeholder="IHWE/2026/BYR-XXX"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#23471d] hover:bg-[#1a3a14] text-white font-bold py-5 px-6 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg hover:shadow-[#23471d]/20 mt-8 disabled:opacity-50"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn size={18} />}
                                            <span>Login Now</span>
                                        </button>
                                    </form>
                                </motion.div>

                                <p className="text-center text-[10px] text-slate-400 mt-10 pt-6 border-t border-slate-100 uppercase tracking-[0.2em] font-bold">
                                    © {new Date().getFullYear()} <span className="text-[#23471d]">IHWE</span> Buyer Services
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BuyerLogin;
