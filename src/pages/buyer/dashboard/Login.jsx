import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck, Box, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { buyerApi } from '@/lib/buyer/api';
import { useAuth } from '@/context/BuyerAuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [regId, setRegId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !regId) {
      toast.error("Please fill in both fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await buyerApi.login(email, regId);
      if (response.data.success) {
        toast.success("Login Successful!");
        login(response.data.data);
      }
    } catch (error) {
      console.error("Login error:", error);
      const msg = error.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center p-4">
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        
        {/* Left Side: Visual/Branding */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-primary-green text-white overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight">
                IHWE<span className="text-emerald-400">.</span>
              </span>
            </div>
            
            <h1 className="text-5xl font-black leading-tight mb-6">
              Exclusive <br />
              <span className="text-emerald-400">Buyer</span> Portal.
            </h1>
            <p className="text-emerald-50/70 text-lg leading-relaxed max-w-sm">
              Access your personalized dashboard to manage meetings, view your badge, and track sourcing matches.
            </p>
          </div>

          <div className="relative z-10 pt-12 border-t border-white/10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-primary-green bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                  {i}
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-emerald-100/60 uppercase tracking-widest">
              Joined by 2000+ Global Buyers
            </p>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-80 h-80 bg-emerald-300/10 rounded-full blur-[80px]"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-3">Welcome back!</h2>
              <p className="text-slate-500 font-medium">Please enter your registration details to continue.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-primary-green transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green/5 transition-all font-medium text-slate-700"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Registration ID</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-slate-300 group-focus-within:text-primary-green transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    value={regId}
                    onChange={(e) => setRegId(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green/5 transition-all font-medium text-slate-700"
                    placeholder="IHWE/2026/BYR-XXX"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={isLoading}
                  className="w-full bg-primary-green hover:bg-emerald-900 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-xl shadow-primary-green/20 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Access Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-12 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
              <p className="text-xs font-bold text-slate-500 leading-relaxed text-center">
                Can't find your Registration ID? Check your confirmation email from IHWE Team or <span className="text-primary-green hover:underline cursor-pointer">Contact Support</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
