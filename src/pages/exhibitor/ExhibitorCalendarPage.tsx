import { useExhibitorCtx } from '../ExhibitorDashboard';
import ExhibitorCalendar from '@/components/dashboard/exhibitor/ExhibitorCalendar';

export default function ExhibitorCalendarPage() {
    const { data } = useExhibitorCtx();
    return <ExhibitorCalendar data={data} />;
}
