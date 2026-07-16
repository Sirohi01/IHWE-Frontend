import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorMSME from '@/components/dashboard/exhibitor/ExhibitorMSME';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorMSMEPage() {
    const { data } = useExhibitorCtx();
    return (
        <div className="space-y-6">
            <DashboardHero
                pageId="ex-msme"
                defaultTitle="MSME & PSM Claim"
                defaultSubtitle="Manage your MSME certification and claim government subsidies"
                type="exhibitor"
            />
            <ExhibitorMSME data={data} />
        </div>
    );
}
