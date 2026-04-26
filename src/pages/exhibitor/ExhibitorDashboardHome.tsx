import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { STATUS_CONFIG } from '@/components/dashboard/exhibitor/types';
import ExhibitorOverview from '@/components/dashboard/exhibitor/ExhibitorOverview';
import ExhibitorModuleGrid from '@/components/dashboard/exhibitor2/ExhibitorModuleGrid';
import HeroSection from '@/components/home/HeroSection';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div className="space-y-4">
            <HeroSection onRegisterVisit={() => {}} forceNewTab={true} hideStats={true} />
            {!data.isSeller && (
                <div className="bg-gradient-to-r from-[#d26019] to-[#b34d10] text-white p-6 rounded-sm shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-center md:text-left">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-xl">🚀</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold uppercase tracking-tight">Expand Your Global Trade Footprint</h2>
                            <p className="text-xs text-white/80 max-w-lg">Unlock premium seller features including advanced B2B matchmaking, global product directory, and marketing toolkit.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/exhibitor-dashboard/become-seller')}
                        className="bg-white text-[#d26019] px-8 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg active:scale-95 whitespace-nowrap"
                    >
                        Become a Seller
                    </button>
                </div>
            )}
            <div className="bg-white shadow-sm">
                <ExhibitorModuleGrid data={data} cur={cur} paid={paid} total={total} balance={balance} paidPct={paidPct} setActiveTab={setActiveTab} />
            </div>
            <ExhibitorOverview data={data} cur={cur} status={status} paidPct={paidPct} paid={paid} total={total} balance={balance} setActiveTab={setActiveTab} />
        </div>
    );
}
