import { useExhibitorCtx } from '@/context/ExhibitorContext';
import StallExtras from '@/components/dashboard/exhibitor/StallExtras';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorAccessoriesPage() {
    const { data } = useExhibitorCtx();
    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId="ex-accessories" 
                defaultTitle="Stall Accessories" 
                defaultSubtitle="Order additional furniture, lights, and power sockets"
                type="exhibitor" 
            />
            <StallExtras data={data} />
        </div>
    );
}
