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
import { useAuth } from '@/context/SellerAuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [step, setStep] = useState(1);
  const [loginMode, setLoginMode] = useState('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [sellerId, setSellerId] = useState('');
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

  const showAlert = () => {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = loginMode === 'email' ? 'login' : 'send-mobile-otp';
      const body = loginMode === 'email'
        ? { email: email.trim(), password: password.trim() }
        : { mobile: mobile.trim() };

      const res = await fetch(`${API_URL}/seller-auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (data.success) {
        if (data.requiresOtp || loginMode === 'mobile') {
          setSellerId(data.sellerId);
          setStep(2);
          toast.success('Wait! One more step.', {
            description: loginMode === 'email'
              ? 'We sent a code to your registered email.'
              : 'We sent an OTP to your mobile.'
          });
        } else if (data.token) {
          localStorage.setItem('sellerToken', data.token);
          toast.success('Welcome back!');
          login(data.seller);
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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/seller-auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sellerId, otp })
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('sellerToken', data.token);
        toast.success('Welcome!', { description: 'Opening your dashboard...' });
        login(data.seller);
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
                      Seller <span className="text-[#23471d]">Portal</span>
                    </h2>
                    <p className="text-[#d26019] font-bold tracking-[0.2em] uppercase text-xs">Official Login</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Welcome to the 9th International Health & Wellness Expo Seller Portal.
                    Manage your profile, access your badge, and connect with exhibitors globally.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: Shield, title: "Secure Entry", desc: "OTP protected login" },
                      { icon: IdCardIcon, title: "Seller Badge", desc: "Download your badge" },
                      { icon: QrCode, title: "QR Access", desc: "Scan for quick check-in" },
                      { icon: Sparkles, title: "Networking", desc: "Meet global exhibitors" }
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

              <div className="bg-white border border-slate-200 p-8 md:p-10 shadow-xl relative min-h-[500px] flex flex-col justify-center">
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
                      <div className="text-center lg:text-left">
                        <h3 className="text-3xl font-inter font-bold text-slate-900 mb-2">Seller Login</h3>
                        <p className="text-slate-500 text-sm">Please sign in to your seller account</p>
                      </div>

                      <div className="flex p-1.5 bg-slate-100 rounded-xl border border-slate-200">
                        <button
                          onClick={() => setLoginMode('email')}
                          className={`flex-1 py-3 px-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all 
                                                        ${loginMode === 'email' ? 'bg-white text-[#23471d] shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          Use Email
                        </button>
                        <button
                          onClick={() => setLoginMode('mobile')}
                          className={`flex-1 py-3 px-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all 
                                                        ${loginMode === 'mobile' ? 'bg-white text-[#23471d] shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          Use Mobile
                        </button>
                      </div>

                      <form onSubmit={handleLogin} className="space-y-6">
                        {loginMode === 'email' ? (
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
                                  className="w-full pl-12 pr-12 py-4 bg-white border-2 border-slate-100 focus:outline-none focus:border-[#23471d] transition-all text-sm placeholder:text-slate-300"
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
                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 focus:outline-none focus:border-[#23471d] transition-all text-sm placeholder:text-slate-300"
                                placeholder="Enter mobile number"
                              />
                            </div>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-[#23471d] hover:bg-[#1a3a14] text-white font-bold py-5 px-6 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg hover:shadow-[#23471d]/20 mt-8 disabled:opacity-50"
                        >
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (loginMode === 'email' ? <LogIn size={18} /> : <Send size={18} />)}
                          <span>{loginMode === 'email' ? 'Login Now' : 'Send Verification OTP'}</span>
                        </button>
                      </form>
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
                          className="block w-full px-4 py-6 text-center tracking-[0.5em] text-4xl font-bold text-[#23471d] bg-slate-50 border-b-4 border-[#23471d]/20 focus:border-[#23471d] outline-none transition-all placeholder:text-slate-200"
                          placeholder="000000"
                        />

                        <button
                          type="submit"
                          disabled={loading || otp.length !== 6}
                          className="w-full bg-[#d26019] hover:bg-[#b04d12] text-white font-bold py-5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
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

                <p className="text-center text-[10px] text-slate-400 mt-10 pt-6 border-t border-slate-100 uppercase tracking-[0.2em] font-bold">
                  © {new Date().getFullYear()} <span className="text-[#23471d]">IHWE</span> Seller Services
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

