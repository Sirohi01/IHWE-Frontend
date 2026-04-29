import { useLocation } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import MarketingToolkit from '@/components/dashboard/exhibitor2/MarketingToolkit';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorMarketingPage() {
    const { data } = useExhibitorCtx();
    const location = useLocation();
    const isSeller = location.pathname.includes('/seller-portal');
    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId={isSeller ? "sl-marketing" : "ex-marketing"}
                defaultTitle="Marketing Toolkit" 
                defaultSubtitle="Promote your presence and invite your clients to IHWE 2026"
                type={isSeller ? "seller" : "exhibitor"} 
            />
            <MarketingToolkit data={data} />
        </div>
    );
}
