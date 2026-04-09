import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Phone, Send, CheckCircle, Loader2, Download, 
  User, Lock, Sparkles, LogIn, Eye, EyeOff, Shield, Camera,
  IdCard as IdCardIcon, QrCode, MapPin, Calendar
} from "lucide-react";
import { settingsApi, heroBackgroundApi, SERVER_URL } from "@/lib/api";
import Swal from "sweetalert2";

const DownloadBadge = () => {
  const [settings, setSettings] = useState<any>(null);
  const [heroData, setHeroData] = useState<any>(null);
  const [credentials, setCredentials] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await heroBackgroundApi.getByPage("Visit / Download Badge");
        if (data) setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    };
    fetchHero();
  }, []);

  const showAlert = (icon: any, title: string, text: string) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: '#23471d',
      background: '#f8f9fa',
      customClass: {
        title: 'text-xl font-bold font-serif',
        popup: 'rounded-xl',
        confirmButton: 'py-2 px-6 text-base font-semibold'
      }
    });
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials) {
      showAlert('warning', 'Missing Information', 'Please enter your registered Email or Mobile Number');
      return;
    }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500)); // Mock API delay
    setIsLoading(false);
    setShowOtp(true);
    showAlert('success', 'OTP Sent', `A verification code has been sent to ${credentials}`);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      showAlert('warning', 'Missing OTP', 'Please enter the verification code');
      return;
    }
    setIsChecking(true);
    await new Promise(r => setTimeout(r, 1500)); // Mock verification
    setIsChecking(false);
    setIsSuccess(true);
    await Swal.fire({
      icon: "success",
      title: "Authenticated!",
      text: "Your badge is ready for download",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const downloadBadge = () => {
    if (!badgeRef.current) return;
    
    // In a real app we'd use html-to-image or similar
    // For now, we'll simulate the download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'IHWE_Entry_Badge.png';
    document.body.appendChild(link);
    // link.click(); // Prevent actual download for user
    document.body.removeChild(link);
    
    showAlert('success', 'Download Started', 'Your badge image is being saved.');
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen font-inter">
      {/* ── HERO SECTION - Standardized 16:4 Sleek Style ── */}
      <section
        className="hero-background-standard"
        style={{ 
          backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : "/src/assets/idcard.jpg"})`
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-[#f9fafb]"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />

        <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
            {heroData?.title || "Entry Pass"}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
            {heroData?.heading || "Download Badge"}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {heroData?.shortDescription || "Access your digital entry pass for the 9th International Expo."}
          </p>
        </div>
      </section>

      <section className="mt-8 md:-mt-20 pb-20 relative overflow-hidden z-20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#23471d]/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d26019]/5 rounded-full blur-[120px] -ml-48 -mb-48" />

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div 
                  key="login-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Left Side: Brand & Info */}
                  <div className="space-y-8" data-aos="fade-right">
                    <div className="flex items-center gap-6">
                      <img 
                        src={settings?.logo ? `${SERVER_URL}${settings.logo}` : "/logo.png"} 
                        alt="IHWE Logo" 
                        className="h-24 w-auto object-contain"
                      />
                      <div className="h-16 w-px bg-slate-200" />
                      <div>
                        <h2 className="text-3xl font-serif font-bold text-slate-900">
                          Digital <span className="text-[#23471d]">Entry</span>
                        </h2>
                        <p className="text-[#d26019] font-bold tracking-[0.2em] uppercase text-xs">Access Portal</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-slate-600 text-lg leading-relaxed">
                        To maintain a paperless and sustainable event, we've moved all entry badges to digital format. 
                        Simply login to view and download your unique QR-enabled pass.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { icon: Shield, title: "Secure Access", desc: "OTP protected login" },
                          { icon: IdCardIcon, title: "Virtual Badge", desc: "Always on your phone" },
                          { icon: QrCode, title: "Quick Entry", desc: "Scan and proceed" },
                          { icon: Sparkles, title: "Sustainable", desc: "Eco-friendly pass" }
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

                  {/* Right Side: Login Form */}
                  <div className="bg-white border border-slate-200 p-8 md:p-10 shadow-xl relative" data-aos="fade-left">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#23471d]/10 to-transparent -rotate-45" />
                    
                    <div className="mb-10 text-center lg:text-left">
                      <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">Welcome Back!</h3>
                      <p className="text-slate-500 text-sm">Sign in to download your interior design expo badge</p>
                    </div>

                    <form className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#23471d] mb-3">Email or Mobile Number</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                            <User size={18} />
                          </div>
                          <input 
                            type="text" 
                            disabled={showOtp}
                            value={credentials}
                            onChange={(e) => setCredentials(e.target.value)}
                            placeholder="Enter registered credentials" 
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 focus:outline-none focus:border-[#23471d] transition-all text-sm placeholder:text-slate-300"
                          />
                        </div>
                      </div>

                      {showOtp && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-6 pt-2"
                        >
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#23471d] mb-3">One-Time Password (OTP)</label>
                            <div className="relative group">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                                <Lock size={18} />
                              </div>
                              <input 
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit code" 
                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 focus:outline-none focus:border-[#23471d] transition-all text-sm tracking-[0.5em] font-bold"
                              />
                            </div>
                            <p className="text-[10px] text-slate-400 mt-3 text-center">Didn't receive code? <button type="button" className="text-[#d26019] font-bold underline">Resend</button></p>
                          </div>
                        </motion.div>
                      )}

                      {!showOtp ? (
                        <button 
                          onClick={handleSendOtp}
                          disabled={isLoading}
                          className="w-full bg-[#23471d] hover:bg-[#1a3a14] text-white font-bold py-5 px-6 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg hover:shadow-[#23471d]/20 mt-8"
                        >
                          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send size={16} />}
                          <span>Send Verification OTP</span>
                        </button>
                      ) : (
                        <button 
                          onClick={handleLogin}
                          disabled={isChecking}
                          className="w-full bg-[#d26019] hover:bg-[#b04d12] text-white font-bold py-5 px-6 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg hover:shadow-[#d26019]/20 mt-8"
                        >
                          {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn size={16} />}
                          <span>Sign in to Dashboard</span>
                        </button>
                      )}

                      <div className="mt-10 p-5 bg-slate-50 border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#23471d]/5 rounded-full -mr-8 -mt-8" />
                        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mb-4">
                          🔐 Demo Verification
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
                          <div className="bg-white px-4 py-2.5 border border-slate-200">
                            <span className="text-slate-400">Mobile: </span>
                            <span className="font-bold text-[#23471d]">Random</span>
                          </div>
                          <div className="bg-white px-4 py-2.5 border border-slate-200">
                            <span className="text-slate-400">OTP: </span>
                            <span className="font-bold text-[#23471d]">Any 6 digits</span>
                          </div>
                        </div>
                      </div>
                    </form>

                    <p className="text-center text-[10px] text-slate-900 mt-10 pt-6 border-t border-slate-100 uppercase tracking-[0.2em] font-bold">
                      © {new Date().getFullYear()} <span className="text-[#23471d]">International Health & Wellness</span> <span className="text-[#d26019]">Expo</span>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="badge-section"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="text-center mb-10" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="h-px w-8 bg-[#23471d]" />
                      <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#23471d]">Your Pass is Ready</span>
                      <div className="h-px w-8 bg-[#23471d]" />
                    </div>
                    <h2 className="text-4xl font-serif text-slate-900">
                      Exhibition <span className="text-[#23471d]">Badge</span>
                    </h2>
                  </div>

                  {/* VIRTUAL ID CARD */}
                  <div 
                    ref={badgeRef}
                    className="relative w-full max-w-[400px] aspect-[1/1.58] bg-white shadow-2xl overflow-hidden border border-slate-100 group mb-10"
                    data-aos="zoom-in"
                  >
                    {/* Header with Pattern */}
                    <div className="h-40 bg-[#23471d] relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                      <img 
                        src={settings?.logo ? `${SERVER_URL}${settings.logo}` : "/logo.png"} 
                        alt="Logo" 
                        className="h-20 w-auto object-contain brightness-0 invert relative z-10 mb-2"
                      />
                      <p className="text-[10px] text-white/60 font-bold uppercase tracking-[0.3em] relative z-10">Entry Pass 2026</p>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col items-center text-center">
                      <div className="w-28 h-28 bg-slate-100 rounded-full mb-6 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative">
                        <User className="w-12 h-12 text-slate-300" />
                        <div className="absolute bottom-0 inset-x-0 bg-[#23471d] py-1 text-[8px] text-white font-bold">VISITOR</div>
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">Rajesh Kumar</h3>
                      <p className="text-[#d26019] font-bold text-xs uppercase tracking-widest mb-8">Design Solutions Inc.</p>

                      <div className="grid grid-cols-2 gap-8 w-full mb-10">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-2 text-[#23471d]">
                            <Calendar size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Date</span>
                          </div>
                          <p className="text-xs font-bold text-slate-800">21-23 Aug 2026</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-2 text-[#23471d]">
                            <MapPin size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Venue</span>
                          </div>
                          <p className="text-xs font-bold text-slate-800">Yashobhoomi, Delhi</p>
                        </div>
                      </div>

                      <div className="w-32 h-32 bg-white p-2 border-2 border-slate-50 flex items-center justify-center shadow-inner relative group/qr">
                        <QrCode className="w-24 h-24 text-slate-800" />
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center opacity-0 group-hover/qr:opacity-100 transition-opacity">
                          <p className="text-[8px] font-bold text-[#23471d]">SCAN TO VERIFY</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Accent */}
                    <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-[#23471d] via-[#d26019] to-[#23471d]" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up">
                    <button 
                      onClick={downloadBadge}
                      className="flex items-center justify-center gap-3 bg-[#23471d] text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-[#1a3a14] transition-all shadow-xl hover:shadow-[#23471d]/20"
                    >
                      <Download size={18} />
                      Download Image Pass
                    </button>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="flex items-center justify-center gap-3 bg-red-600 text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg hover:shadow-red-600/20"
                    >
                      Logout
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 mt-10 max-w-sm text-center italic">
                    Note: Please carry this digital badge on your mobile or print it for entry at the registration counter.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadBadge;
