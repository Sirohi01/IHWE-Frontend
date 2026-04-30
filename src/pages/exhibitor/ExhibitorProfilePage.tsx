import { useLocation } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorProfile from '@/components/dashboard/exhibitor/ExhibitorProfile';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorProfilePage() {
    const { data, setData } = useExhibitorCtx();
    const location = useLocation();
    const isSeller = location.pathname.includes('/seller-portal');
    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId={isSeller ? "sl-profile" : "ex-profile"}
                defaultTitle="Exhibitor Profile" 
                defaultSubtitle="Manage your company details and brand identity"
                type={isSeller ? "seller" : "exhibitor"} 
            />
            <ExhibitorProfile data={data} setData={setData} />
        </div>
    );
}
