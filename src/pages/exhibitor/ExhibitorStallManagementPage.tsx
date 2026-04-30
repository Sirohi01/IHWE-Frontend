import { useLocation } from 'react-router-dom';
import StallProductManager from "@/components/dashboard/exhibitor/StallProductManager";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import DashboardHero from "@/components/dashboard/DashboardHero";

export default function ExhibitorStallManagementPage() {
    const { data } = useExhibitorCtx();
    const location = useLocation();
    const isSeller = location.pathname.includes('/seller-portal');
    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId={isSeller ? "sl-stall" : "ex-stall"}
                defaultTitle="Stall Information" 
                defaultSubtitle="Manage your presence and team on the floor"
                type={isSeller ? "seller" : "exhibitor"} 
            />
            <StallProductManager data={data} mode="exhibitor" />
        </div>
    );
}
