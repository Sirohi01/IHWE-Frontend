import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { STATUS_CONFIG } from '@/components/dashboard/exhibitor/types';
import ExhibitorOverview from '@/components/dashboard/exhibitor/home/ExhibitorOverview';
import ExhibitorModuleGrid from '@/components/dashboard/exhibitor/home/ExhibitorModuleGrid';
import HeroSection from '@/components/dashboard/exhibitor/home/HeroSection';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';
import { useState } from 'react';
import ExhibotorTopbar from "@/components/dashboard/exhibitor/ExhibotorTopbar";
import WelcomeHeader from '@/components/dashboard/exhibitor/home/WelcomeHeader';
import StatCards from '@/components/dashboard/exhibitor/home/StatCards';
import DashboardWidgets from '@/components/dashboard/exhibitor/home/DashboardWidgets';
import DashboardBottom from '@/components/dashboard/exhibitor/home/DashboardBottom';
import ReferralPopup from '@/components/dashboard/exhibitor/home/ReferralPopup';

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
    const [showFeedbackBanner] = useState(isPostExpo && !localStorage.getItem('feedback_submitted'));
    const [isReferralPopupOpen, setIsReferralPopupOpen] = useState(true);

    return (
        <>
            <ReferralPopup isOpen={isReferralPopupOpen} onClose={() => setIsReferralPopupOpen(false)} />
            {/* <ExhibotorTopbar /> */}
            <div className="space-y-2 px-8 pt-1 pb-4">
                <WelcomeHeader />
                <StatCards />
                <AnimatePresence>
                    {showFeedbackBanner && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="bg-white overflow-hidden relative"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#d26019]" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ marginTop: '-10px' }} className="relative z-10">
                    <HeroSection onRegisterVisit={() => { }} forceNewTab={true} hideStats={true} />
                </div>
                <DashboardWidgets />
                <DashboardBottom />
                <div className="bg-white shadow-sm">
                    {/* <ExhibitorModuleGrid data={data} cur={cur} paid={paid} total={total} balance={balance} paidPct={paidPct} setActiveTab={setActiveTab} /> */}
                </div>
                {/* <ExhibitorOverview data={data} cur={cur} status={status} paidPct={paidPct} paid={paid} total={total} balance={balance} setActiveTab={setActiveTab} /> */}
            </div>
        </>
    );
}
