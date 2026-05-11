import { useLocation } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import EPromotion from '@/components/dashboard/exhibitor/EPromotion';
//import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorEPromotion() {
    const { data } = useExhibitorCtx();
    const location = useLocation();
    const isSeller = location.pathname.includes('/seller-portal');

    return (
        <div className="space-y-6">
            

            <EPromotion data={data} />
        </div>
    );
}