import { motion } from 'framer-motion';
import { LogOut, User, FileText, TrendingUp, Building2, ShieldCheck } from 'lucide-react';
import { SERVER_URL } from '@/lib/api';

interface HeaderProps {
    logo: string | null;
    data: any;
    activeTab: string;
    setActiveTab: (tab: any) => void;
    handleLogout: () => void;
}

export default function ExhibitorHeader({ logo, data, activeTab, setActiveTab, handleLogout }: HeaderProps) {
    return (
        <div className="fixed top-0 inset-x-0 z-[100] px-4 pt-4 print:hidden pointer-events-none">
            <header className="max-w-[1600px] mx-auto bg-white/70 backdrop-blur-2xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[2.5rem] flex items-center justify-between px-6 py-2.5 pointer-events-auto transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                
                {/* Brand Only */}
                <div className="flex items-center group">
                    <div className="h-14 flex items-center group-hover:scale-105 transition-all duration-500">
                        {logo ? (
                            <img loading="lazy" decoding="async" src={`${SERVER_URL}${logo}`} className="h-full w-auto object-contain pr-4" alt="Logo" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1a3516] to-[#3a7a2e] flex items-center justify-center shadow-xl shadow-green-900/10">
                                <ShieldCheck size={24} className="text-white" strokeWidth={2.5} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Desktop */}
                <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-3xl bg-slate-100/40">
                    {[
                        { id: 'dashboard', label: 'Overview', icon: TrendingUp },
                        { id: 'profile',   label: 'Profile',  icon: User },
                        { id: 'invoices',  label: 'Invoices', icon: FileText },
                        { id: 'my-event', label: 'My Event', icon: Building2 },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 relative overflow-hidden group
                                ${activeTab === tab.id 
                                    ? 'bg-white text-slate-900 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                                }`}
                        >
                            <tab.icon size={13} strokeWidth={2.5} className={activeTab === tab.id ? 'text-[#23471d]' : 'text-slate-400'} />
                            <span>{tab.label}</span>
                            {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#23471d]" />}
                        </button>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 h-10 px-4 bg-slate-50 border border-slate-100 rounded-2xl mr-2">
                         <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                            <User size={12} strokeWidth={3} />
                         </div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{data.contact1?.firstName}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
                    >
                        <LogOut size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </header>
        </div>
    );
}
