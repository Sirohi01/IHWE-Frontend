import { motion } from 'framer-motion';
import { User, FileText, TrendingUp, Building2 } from 'lucide-react';

interface MobileNavProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
}

export default function ExhibitorMobileNav({ activeTab, setActiveTab }: MobileNavProps) {
    return (
        <div className="lg:hidden fixed bottom-6 inset-x-4 z-[100] print:hidden">
            <nav className="bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] flex items-center justify-around px-2 py-3">
                {[
                    { id: 'dashboard', label: 'Overview', icon: TrendingUp },
                    { id: 'profile',   label: 'Profile',  icon: User },
                    { id: 'invoices',  label: 'Invoices', icon: FileText },
                    { id: 'my-event', label: 'Event', icon: Building2 },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all duration-300 relative
                            ${activeTab === tab.id 
                                ? 'text-white' 
                                : 'text-white/40 hover:text-white/60'
                            }`}
                    >
                        <tab.icon size={18} strokeWidth={2.5} className={activeTab === tab.id ? 'text-emerald-400' : 'inherit'} />
                        <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
                        {activeTab === tab.id && (
                            <motion.div 
                                layoutId="activeTabMobile" 
                                className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-400" 
                            />
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
}
