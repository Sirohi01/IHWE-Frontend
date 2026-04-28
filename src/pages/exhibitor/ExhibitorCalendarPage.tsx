import { useLocation } from 'react-router-dom';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorCalendar from '@/components/dashboard/exhibitor/ExhibitorCalendar';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorCalendarPage() {
    const { data } = useExhibitorCtx();
    const location = useLocation();
    const isSeller = location.pathname.includes('/seller-portal');
    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId={isSeller ? "sl-calendar" : "ex-calendar"}
                defaultTitle="Meeting Calendar" 
                defaultSubtitle="Your personalized schedule for IHWE 2026"
                type={isSeller ? "seller" : "exhibitor"} 
            />
            <ExhibitorCalendar data={data} />
        </div>
    );
}
