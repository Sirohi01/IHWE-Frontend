import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { STATUS_CONFIG } from '@/components/dashboard/exhibitor/types';
import ExhibitorOverview from '@/components/dashboard/exhibitor2/home/ExhibitorOverview';
import ExhibitorModuleGrid from '@/components/dashboard/exhibitor2/home/ExhibitorModuleGrid';
import HeroSection from '@/components/dashboard/exhibitor2/home/HeroSection';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X } from 'lucide-react';
import { useState } from 'react';
import ExhibotorTopbar from "@/components/dashboard/exhibitor2/ExhibotorTopbar";
import ExEventCountdown from '@/components/dashboard/exhibitor2/ExEventCountdown';
import WelcomeHeader from '@/components/dashboard/exhibitor2/home/WelcomeHeader';

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
        <>
            <ExhibotorTopbar />
            <div className="space-y-2 px-8 py-4">
                <WelcomeHeader />
                <AnimatePresence>
                    {showFeedbackBanner && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="bg-white overflow-hidden relative"
                        >
                            {/* Left accent bar */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#d26019]" />

                            {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 py-1.5 pl-7">

                               
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                                        <MessageSquareText size={20} className="text-[#d26019]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[13px] font-semibold text-gray-900 leading-snug">
                                            Your feedback matters
                                        </p>
                                        <p className="text-[12px] text-gray-500 truncate">
                                            Share your experience at IHWE 2026 to help us improve.
                                        </p>
                                    </div>
                                </div>

                       
                                <div className="flex items-center justify-center w-full md:w-auto flex-shrink-0 pb-1 md:pb-0">
                                    <ExEventCountdown />
                                </div>

                            </div> */}
                        </motion.div>
                    )}
                </AnimatePresence>

                <HeroSection onRegisterVisit={() => { }} forceNewTab={true} hideStats={true} />

                <div className="bg-white shadow-sm">
                    <ExhibitorModuleGrid data={data} cur={cur} paid={paid} total={total} balance={balance} paidPct={paidPct} setActiveTab={setActiveTab} />
                </div>
                <ExhibitorOverview data={data} cur={cur} status={status} paidPct={paidPct} paid={paid} total={total} balance={balance} setActiveTab={setActiveTab} />
            </div>
        </>
    );
}
