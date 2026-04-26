import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { STATUS_CONFIG } from '@/components/dashboard/exhibitor/types';
import ExhibitorOverview from '@/components/dashboard/exhibitor/ExhibitorOverview';
import ExhibitorModuleGrid from '@/components/dashboard/exhibitor2/ExhibitorModuleGrid';
import HeroSection from '@/components/home/HeroSection';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X } from 'lucide-react';
import { useState } from 'react';

export default function ExhibitorDashboardHome() {
    const { data } = useExhibitorCtx();
    const navigate = useNavigate();
    const setActiveTab = (tab: string) => navigate(`/exhibitor-dashboard/${tab === 'dashboard' ? '' : tab}`);

    const cur = data.participation?.currency === 'USD' ? '$' : '₹';
    const status = STATUS_CONFIG[data.status] || STATUS_CONFIG.pending;
    const paid = data.amountPaid || 0;
    const total = data.participation?.total || 0;
    const balance = data.balanceAmount || 0;
    const paidPct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;

    const isPostExpo = new Date() > new Date('2026-04-20'); // Post-expo phase
    const [showFeedbackBanner, setShowFeedbackBanner] = useState(isPostExpo && !localStorage.getItem('feedback_submitted'));

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {showFeedbackBanner && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gradient-to-r from-[#d26019] to-[#b05015] text-white p-4 rounded-[4px] shadow-lg relative overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <MessageSquareText className="text-white" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-black uppercase tracking-tight text-[14px]">Your Feedback Matters!</h4>
                                    <p className="text-[11px] font-medium opacity-90">Please share your experience at IHWE 2026 to help us improve.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => setActiveTab('feedback')}
                                    className="bg-white text-[#d26019] px-6 py-2 rounded-full font-black text-[11px] uppercase tracking-widest shadow-sm hover:bg-slate-100 transition-colors"
                                >
                                    Fill Feedback Form
                                </button>
                                <button 
                                    onClick={() => setShowFeedbackBanner(false)}
                                    className="text-white/70 hover:text-white p-1"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                        {/* Decorative circle */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    </motion.div>
                )}
            </AnimatePresence>

            <HeroSection onRegisterVisit={() => {}} forceNewTab={true} hideStats={true} />
            <div className="bg-white shadow-sm">
                <ExhibitorModuleGrid data={data} cur={cur} paid={paid} total={total} balance={balance} paidPct={paidPct} setActiveTab={setActiveTab} />
            </div>
            <ExhibitorOverview data={data} cur={cur} status={status} paidPct={paidPct} paid={paid} total={total} balance={balance} setActiveTab={setActiveTab} />
        </div>
    );
}
