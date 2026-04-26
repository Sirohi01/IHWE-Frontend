import { useLocation } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorBSM from '@/components/dashboard/exhibitor/ExhibitorBSM';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorBSMPage() {
    const { data } = useExhibitorCtx();
    const location = useLocation();
    const isSeller = location.pathname.includes('/seller-portal');

    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId={isSeller ? "sl-bsm" : "ex-bsm"} 
                defaultTitle="BSM Management" 
                defaultSubtitle="Schedule and manage your Business Matching meetings"
                type={isSeller ? "seller" : "exhibitor"} 
            />
            <ExhibitorBSM data={data} />
        </div>
    );
}
