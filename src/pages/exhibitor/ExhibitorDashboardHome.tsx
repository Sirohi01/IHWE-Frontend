import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { STATUS_CONFIG } from '@/components/dashboard/exhibitor/types';
import ExhibitorOverview from '@/components/dashboard/exhibitor/home/ExhibitorOverview';
import ExhibitorModuleGrid from '@/components/dashboard/exhibitor/home/ExhibitorModuleGrid';
import ExhibitorHeroSlider from '@/components/dashboard/exhibitor/home/ExhibitorHeroSlider';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';
import { useState, useEffect } from 'react';
import ExhibotorTopbar from "@/components/dashboard/exhibitor/ExhibotorTopbar";
import WelcomeHeader from '@/components/dashboard/exhibitor/home/WelcomeHeader';
import StatCards from '@/components/dashboard/exhibitor/home/StatCards';
import DashboardWidgets from '@/components/dashboard/exhibitor/home/DashboardWidgets';
import DashboardBottom from '@/components/dashboard/exhibitor/home/DashboardBottom';
import ReferralPopup from '@/components/dashboard/exhibitor/home/ReferralPopup';
import SellerPopup from '@/components/dashboard/exhibitor/home/SellerPopup';
import PaymentReminderPopup from '@/components/dashboard/exhibitor/home/PaymentReminderPopup';

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
    const [isPaymentReminderOpen, setIsPaymentReminderOpen] = useState(false);
    const [isReferralPopupOpen, setIsReferralPopupOpen] = useState(false);
    const [isSellerPopupOpen, setIsSellerPopupOpen] = useState(false);

    // Payment Reminder takes priority: always try it shortly after load. It fetches the real
    // Accounts-side balance itself and closes silently if nothing's actually due — we can't
    // pre-filter on data.balanceAmount here since that field only reflects the online booking
    // flow and stays 0 for exhibitors invoiced directly through Accounts. The Referral popup's
    // own 15s timer only starts once the reminder has been dismissed (or closed itself).
    useEffect(() => {
        const timer = setTimeout(() => setIsPaymentReminderOpen(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handlePaymentReminderClose = () => {
        setIsPaymentReminderOpen(false);
        setTimeout(() => setIsReferralPopupOpen(true), 15000);
    };

    const handleReferralClose = () => {
        setIsReferralPopupOpen(false);
        // After closing Referral, wait 20 seconds for Seller Popup
        setTimeout(() => {
            setIsSellerPopupOpen(true);
        }, 20000);
    };

    const handleSellerClose = () => {
        setIsSellerPopupOpen(false);
        // After closing Seller, wait 2 minutes (120000ms) to show Referral again
        setTimeout(() => {
            setIsReferralPopupOpen(true);
        }, 120000);
    };

    return (
        <>
            <PaymentReminderPopup isOpen={isPaymentReminderOpen} onClose={handlePaymentReminderClose} />
            <ReferralPopup isOpen={isReferralPopupOpen} onClose={handleReferralClose} />
            <SellerPopup isOpen={isSellerPopupOpen} onClose={handleSellerClose} />
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
                    <ExhibitorHeroSlider />
                    <div className="mt-1 h-4 w-full bg-[#1a3a7c]" />
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
