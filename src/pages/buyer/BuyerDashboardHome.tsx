import { useBuyerCtx } from '@/context/BuyerContext';
import BuyerOverview from '@/components/dashboard/buyer/BuyerOverview';
import BuyerModuleGrid from '@/components/dashboard/buyer/BuyerModuleGrid';
import HeroSection from '@/components/home/HeroSection';
import { useNavigate } from 'react-router-dom';

export default function BuyerDashboardHome() {
    const { data } = useBuyerCtx();
    const navigate = useNavigate();
    const setActiveTab = (tab: string) => navigate(`/buyer-dashboard/${tab === 'dashboard' ? '' : tab}`);

    const cur = '₹'; 
    const status = { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' };
    const paid = Number(data.registrationFee) || 0;
    const total = Number(data.registrationFee) || 0;
    const balance = data.paymentStatus === 'Completed' ? 0 : total;
    const paidPct = data.paymentStatus === 'Completed' ? 100 : 0;

    return (
        <div className="space-y-4">
            <HeroSection onRegisterVisit={() => {}} forceNewTab={true} hideStats={true} />
            <div className="bg-white shadow-sm">
                <BuyerModuleGrid 
                    data={data} 
                    cur={cur} 
                    paid={paid} 
                    total={total} 
                    balance={balance} 
                    paidPct={paidPct} 
                    setActiveTab={setActiveTab} 
                />
            </div>
            <BuyerOverview data={data} cur={cur} status={status} paidPct={paidPct} paid={paid} total={total} balance={balance} setActiveTab={setActiveTab} />
        </div>
    );
}
