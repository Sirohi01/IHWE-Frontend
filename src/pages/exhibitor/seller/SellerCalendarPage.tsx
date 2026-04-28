import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorCalendar from '@/components/dashboard/exhibitor/ExhibitorCalendar';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function SellerCalendarPage() {
    const { data } = useExhibitorCtx();

    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId="sl-calendar" 
                defaultTitle="Meeting Calendar" 
                defaultSubtitle="Your confirmed B2B meeting schedule"
                type="seller" 
            />
            <ExhibitorCalendar data={data} />
        </div>
    );
}
